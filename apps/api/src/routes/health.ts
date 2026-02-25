import type { FastifyInstance } from "fastify";
import { prisma } from "@nemesis/database";

export async function healthRoutes(server: FastifyInstance) {
  
  // ===================================
  // GET /health - Health check
  // ===================================
  server.get("/health", async (request, reply) => {
    const checks: Record<string, { status: string; latency?: number }> = {};
    
    // Database check
    const dbStart = Date.now();
    try {
      await prisma.$queryRaw`SELECT 1`;
      checks.database = { status: "healthy", latency: Date.now() - dbStart };
    } catch (error) {
      checks.database = { status: "unhealthy" };
    }
    
    const allHealthy = Object.values(checks).every(c => c.status === "healthy");
    
    return reply.status(allHealthy ? 200 : 503).send({
      success: allHealthy,
      data: {
        status: allHealthy ? "healthy" : "degraded",
        checks,
        uptime: process.uptime(),
        timestamp: Date.now(),
      },
      timestamp: Date.now(),
    });
  });

  // ===================================
  // GET /ready - Readiness probe
  // ===================================
  server.get("/ready", async (request, reply) => {
    return reply.send({
      success: true,
      data: { ready: true },
      timestamp: Date.now(),
    });
  });
}
