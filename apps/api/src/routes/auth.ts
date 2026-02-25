import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { ERROR_CODES } from "@nemesis/shared";
import { prisma } from "@nemesis/database";
import {
  getMicrosoftAuthUrl,
  completeAuthFlow,
  refreshMicrosoftToken,
  AuthError,
} from "../services/microsoft-auth.js";

// Validation schemas
const callbackSchema = z.object({
  code: z.string().min(1, "Authorization code is required"),
  state: z.string().min(1, "State parameter is required"),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

// Helper to create API response
function apiResponse<T>(data: T, success = true) {
  return { success, data, timestamp: Date.now() };
}

function apiError(code: string, message: string, status = 400) {
  return {
    success: false,
    error: { code, message },
    timestamp: Date.now(),
    status,
  };
}

export async function authRoutes(server: FastifyInstance) {
  // ===================================
  // GET /login - Initiate OAuth flow with PKCE
  // ===================================
  server.get("/login", {
    schema: {
      querystring: z.object({
        redirect: z.string().optional(),
      }),
    },
  }, async (request, reply) => {
    const { redirect } = request.query as { redirect?: string };

    // Generate auth URL with PKCE state
    const { authUrl, state } = getMicrosoftAuthUrl(redirect || "desktop");

    return reply.send(apiResponse({
      authUrl,
      state, // Client should store this to validate callback
    }));
  });

  // ===================================
  // POST /callback - Handle OAuth callback (PKCE)
  // ===================================
  server.post("/callback", async (request, reply) => {
    try {
      const { code, state } = callbackSchema.parse(request.body);

      // Complete full auth flow (validates PKCE state internally)
      const authResult = await completeAuthFlow(code, state);

      // Create/update user in database
      const user = await prisma.user.upsert({
        where: { minecraftUuid: authResult.profile.id },
        update: {
          minecraftUsername: authResult.profile.name,
          lastLogin: new Date(),
        },
        create: {
          minecraftUuid: authResult.profile.id,
          minecraftUsername: authResult.profile.name,
        },
      });

      // Create session with encrypted tokens
      const session = await prisma.session.create({
        data: {
          userId: user.id,
          accessToken: authResult.tokens.minecraft.accessToken,
          refreshToken: authResult.tokens.microsoft.refreshToken,
          expiresAt: authResult.tokens.minecraft.expiresAt,
          ipAddress: request.ip,
          userAgent: request.headers["user-agent"],
        },
      });

      // Generate JWT for API auth
      const jwtToken = server.jwt.sign(
        { userId: user.id, sessionId: session.id },
        { expiresIn: "7d" }
      );

      return reply.send(apiResponse({
        user: {
          id: user.id,
          minecraftUuid: user.minecraftUuid,
          minecraftUsername: user.minecraftUsername,
          createdAt: user.createdAt,
          lastLogin: user.lastLogin,
        },
        profile: authResult.profile,
        entitlement: authResult.entitlement,
        accessToken: jwtToken,
        refreshToken: session.id,
        expiresAt: session.expiresAt,
      }));

    } catch (error) {
      server.log.error(error);

      // Handle AuthError specifically
      if (error instanceof AuthError) {
        const status = error.code === ERROR_CODES.NO_MINECRAFT ? 403 : 401;
        return reply.status(status).send(apiError(error.code, error.message, status));
      }

      // Handle Zod validation errors
      if (error instanceof z.ZodError) {
        const zodError = error as z.ZodError;
        return reply.status(400).send(apiError(
          ERROR_CODES.INVALID_REQUEST,
          zodError.errors[0]?.message || "Invalid request"
        ));
      }

      return reply.status(401).send(apiError(
        ERROR_CODES.AUTH_FAILED,
        error instanceof Error ? error.message : "Authentication failed"
      ));
    }
  });

  // ===================================
  // POST /refresh - Refresh session tokens
  // ===================================
  server.post("/refresh", async (request, reply) => {
    try {
      const { refreshToken } = refreshSchema.parse(request.body);

      // Find session by ID
      const session = await prisma.session.findUnique({
        where: { id: refreshToken },
        include: { user: true },
      });

      if (!session) {
        return reply.status(401).send(apiError(
          ERROR_CODES.INVALID_TOKEN,
          "Invalid session"
        ));
      }

      if (session.expiresAt < new Date()) {
        // Try to refresh Microsoft token
        try {
          const newTokens = await refreshMicrosoftToken(session.refreshToken);

          // Update session with new tokens
          await prisma.session.update({
            where: { id: session.id },
            data: {
              accessToken: newTokens.accessToken,
              refreshToken: newTokens.refreshToken,
              expiresAt: new Date(Date.now() + newTokens.expiresIn * 1000),
            },
          });
        } catch (refreshError) {
          // Microsoft token expired, need full re-auth
          await prisma.session.delete({ where: { id: session.id } }).catch(() => {});
          return reply.status(401).send(apiError(
            ERROR_CODES.AUTH_EXPIRED,
            "Session expired, please login again"
          ));
        }
      }

      // Generate new JWT
      const jwtToken = server.jwt.sign(
        { userId: session.user.id, sessionId: session.id },
        { expiresIn: "7d" }
      );

      // Extend session expiry
      const newExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      await prisma.session.update({
        where: { id: session.id },
        data: { expiresAt: newExpiry },
      });

      return reply.send(apiResponse({
        accessToken: jwtToken,
        expiresAt: newExpiry,
      }));

    } catch (error) {
      server.log.error(error);

      if (error instanceof AuthError) {
        return reply.status(401).send(apiError(error.code, error.message));
      }

      return reply.status(401).send(apiError(
        ERROR_CODES.AUTH_FAILED,
        "Failed to refresh token"
      ));
    }
  });

  // ===================================
  // POST /logout - Invalidate session
  // ===================================
  server.post("/logout", async (request, reply) => {
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader?.startsWith("Bearer ")) {
        return reply.send(apiResponse({ message: "Logged out" }));
      }

      const token = authHeader.substring(7);
      try {
        const decoded = server.jwt.verify(token) as { sessionId: string };
        await prisma.session.delete({ where: { id: decoded.sessionId } }).catch(() => {});
      } catch {
        // Token invalid, but logout successful anyway
      }

      return reply.send(apiResponse({ message: "Logged out successfully" }));
    } catch {
      return reply.send(apiResponse({ message: "Logged out" }));
    }
  });

  // ===================================
  // GET /session - Get current session info
  // ===================================
  server.get("/session", async (request, reply) => {
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader?.startsWith("Bearer ")) {
        return reply.status(401).send(apiError(
          ERROR_CODES.INVALID_TOKEN,
          "No token provided"
        ));
      }

      const token = authHeader.substring(7);
      const decoded = server.jwt.verify(token) as { userId: string; sessionId: string };

      const session = await prisma.session.findUnique({
        where: { id: decoded.sessionId },
        include: { user: true },
      });

      if (!session) {
        return reply.status(401).send(apiError(
          ERROR_CODES.INVALID_TOKEN,
          "Session not found"
        ));
      }

      if (session.expiresAt < new Date()) {
        return reply.status(401).send(apiError(
          ERROR_CODES.AUTH_EXPIRED,
          "Session expired"
        ));
      }

      return reply.send(apiResponse({
        user: {
          id: session.user.id,
          minecraftUuid: session.user.minecraftUuid,
          minecraftUsername: session.user.minecraftUsername,
          createdAt: session.user.createdAt,
          lastLogin: session.user.lastLogin,
        },
        expiresAt: session.expiresAt,
      }));

    } catch {
      return reply.status(401).send(apiError(
        ERROR_CODES.INVALID_TOKEN,
        "Invalid token"
      ));
    }
  });
}
