import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import jwt from "@fastify/jwt";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";

import { authRoutes } from "./routes/auth.js";
import { userRoutes } from "./routes/user.js";
import { cdnRoutes } from "./routes/cdn.js";
import { healthRoutes } from "./routes/health.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || "info",
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  },
});

// ===================================
// PLUGINS
// ===================================

await server.register(cors, {
  origin: [
    "http://localhost:3000", // Web
    "http://localhost:45678", // Desktop OAuth
  ],
  credentials: true,
});

await server.register(helmet, {
  contentSecurityPolicy: false, // Disable in dev
});

await server.register(rateLimit, {
  max: 100,
  timeWindow: "1 minute",
});

await server.register(jwt, {
  secret: process.env.JWT_SECRET || "dev-secret-change-me",
});

// Static files pour le CDN local
const cdnPath = process.env.CDN_STORAGE_PATH 
  ? path.resolve(process.env.CDN_STORAGE_PATH)
  : path.resolve(__dirname, "../../../storage/cdn");

await server.register(fastifyStatic, {
  root: cdnPath,
  prefix: "/cdn/",
  decorateReply: false,
});

// ===================================
// ROUTES
// ===================================

await server.register(healthRoutes, { prefix: "/api/v1" });
await server.register(authRoutes, { prefix: "/api/v1/auth" });
await server.register(userRoutes, { prefix: "/api/v1/user" });
await server.register(cdnRoutes, { prefix: "/api/v1/cdn" });

// ===================================
// START SERVER
// ===================================

const port = parseInt(process.env.API_PORT || "4000");
const host = process.env.API_HOST || "localhost";

try {
  await server.listen({ port, host });
  console.log(`
🚀 Nemesis API running at http://${host}:${port}
📦 CDN available at http://${host}:${port}/cdn/
  `);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}

export { server };
