import type { FastifyInstance } from "fastify";
import { prisma } from "@nemesis/database";
import { ERROR_CODES } from "@nemesis/shared";

declare global {
  namespace FastifyInstance {
    interface FastifyRequest {
      userId?: string;
      sessionId?: string;
    }
  }
}

export async function userRoutes(server: FastifyInstance) {
  
  // Middleware pour vérifier l'auth
  server.addHook("preHandler", async (request, reply) => {
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader?.startsWith("Bearer ")) {
        return reply.status(401).send({
          success: false,
          error: { code: ERROR_CODES.AUTH_INVALID_TOKEN, message: "No token provided" },
          timestamp: Date.now(),
        });
      }
      
      const token = authHeader.substring(7);
      const decoded = server.jwt.verify(token) as { userId: string; sessionId: string };
      
      (request as any).userId = decoded.userId;
      (request as any).sessionId = decoded.sessionId;
      
    } catch (error) {
      return reply.status(401).send({
        success: false,
        error: { code: ERROR_CODES.AUTH_INVALID_TOKEN, message: "Invalid token" },
        timestamp: Date.now(),
      });
    }
  });

  // ===================================
  // GET /profile - Get user profile
  // ===================================
  server.get("/profile", async (request, reply) => {
    // @ts-ignore
    const userId = request.userId;
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!user) {
      return reply.status(404).send({
        success: false,
        error: { code: ERROR_CODES.USER_NOT_FOUND, message: "User not found" },
        timestamp: Date.now(),
      });
    }
    
    return reply.send({
      success: true,
      data: {
        user: {
          id: user.id,
          minecraftUuid: user.minecraftUuid,
          minecraftUsername: user.minecraftUsername,
          email: user.email,
          createdAt: user.createdAt,
          lastLogin: user.lastLogin,
        },
      },
      timestamp: Date.now(),
    });
  });

  // ===================================
  // GET /entitlements - Get user entitlements
  // ===================================
  server.get("/entitlements", async (request, reply) => {
    // @ts-ignore
    const sessionId = request.sessionId;
    
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });
    
    if (!session) {
      return reply.status(404).send({
        success: false,
        error: { code: ERROR_CODES.AUTH_EXPIRED, message: "Session not found" },
        timestamp: Date.now(),
      });
    }
    
    // In production, we would call Minecraft API to verify entitlements
    // For now, if they have a session, they own Minecraft (verified at login)
    return reply.send({
      success: true,
      data: {
        entitlement: {
          ownsMinecraft: true,
          hasGamePass: false, // Would need to check this from Xbox API
          productType: "PRODUCT_MINECRAFT",
        },
      },
      timestamp: Date.now(),
    });
  });
}
