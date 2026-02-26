import type { FastifyInstance } from "fastify";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { ERROR_CODES, type ReleaseInfo, type UpdateCheckResponse } from "@nemesis/shared";

const checkUpdateSchema = z.object({
  currentVersion: z.string(),
  platform: z.enum(["darwin", "win32", "linux"]),
  arch: z.enum(["x64", "arm64"]).optional().default("x64"),
});

export async function cdnRoutes(server: FastifyInstance) {
  
  const cdnPath = process.env['CDN_STORAGE_PATH']
    ? path.resolve(process.env['CDN_STORAGE_PATH'])
    : path.resolve(process.cwd(), "../../storage/cdn");
  
  const releasesPath = path.join(cdnPath, "releases");

  // ===================================
  // GET /latest - Get latest release info
  // ===================================
  server.get("/latest", async (request, reply) => {
    try {
      const { platform = "darwin" } = request.query as { platform?: string };
      
      // Read latest.yml for the platform
      const latestYmlPath = path.join(releasesPath, `latest-${platform}.yml`);
      
      let latestYml: string;
      try {
        latestYml = await fs.readFile(latestYmlPath, "utf-8");
      } catch {
        // Fallback to generic latest.yml
        latestYml = await fs.readFile(path.join(releasesPath, "latest.yml"), "utf-8");
      }
      
      // Parse YAML (simple parsing for electron-builder format)
      const parsed = parseLatestYml(latestYml);
      
      return reply.send({
        success: true,
        data: parsed,
        timestamp: Date.now(),
      });
      
    } catch (error) {
      server.log.error(error);
      return reply.status(404).send({
        success: false,
        error: {
          code: ERROR_CODES.CDN_VERSION_NOT_FOUND,
          message: "No releases found",
        },
        timestamp: Date.now(),
      });
    }
  });

  // ===================================
  // POST /check-update - Check for updates
  // ===================================
  server.post("/check-update", async (request, reply) => {
    try {
      const { currentVersion, platform, arch } = checkUpdateSchema.parse(request.body);
      
      // Get latest version
      const latestYmlPath = path.join(releasesPath, `latest-${platform}.yml`);
      let latestYml: string;
      
      try {
        latestYml = await fs.readFile(latestYmlPath, "utf-8");
      } catch {
        latestYml = await fs.readFile(path.join(releasesPath, "latest.yml"), "utf-8");
      }
      
      const latest = parseLatestYml(latestYml);
      const updateAvailable = compareVersions(latest.version, currentVersion) > 0;
      
      const response: UpdateCheckResponse = {
        updateAvailable,
        currentVersion,
        latestVersion: latest.version,
      };
      
      if (updateAvailable) {
        response.releaseInfo = {
          version: latest.version,
          releaseDate: latest.releaseDate,
          files: [{
            url: `http://localhost:${process.env['API_PORT'] || 3333}/cdn/releases/${latest.path}`,
            sha512: latest.sha512,
            size: latest.files[0]?.size || 0,
            platform: platform as "darwin" | "win32" | "linux",
            arch: arch as "x64" | "arm64",
            filename: latest.path,
          }],
        };
        response.downloadUrl = response.releaseInfo.files[0]?.url;
      }
      
      return reply.send({
        success: true,
        data: response,
        timestamp: Date.now(),
      });
      
    } catch (error) {
      server.log.error(error);
      return reply.status(500).send({
        success: false,
        error: {
          code: ERROR_CODES.INTERNAL_ERROR,
          message: "Failed to check for updates",
        },
        timestamp: Date.now(),
      });
    }
  });

  // ===================================
  // GET /releases - List all releases
  // ===================================
  server.get("/releases", async (request, reply) => {
    try {
      const files = await fs.readdir(releasesPath);
      const releases: string[] = [];
      
      for (const file of files) {
        if (file.endsWith(".yml") || file.endsWith(".dmg") || 
            file.endsWith(".exe") || file.endsWith(".AppImage")) {
          releases.push(file);
        }
      }
      
      return reply.send({
        success: true,
        data: { releases },
        timestamp: Date.now(),
      });
      
    } catch (error) {
      return reply.send({
        success: true,
        data: { releases: [] },
        timestamp: Date.now(),
      });
    }
  });

  // ===================================
  // GET /download/:filename - Download a release
  // ===================================
  server.get("/download/:filename", async (request, reply) => {
    const { filename } = request.params as { filename: string };
    const filePath = path.join(releasesPath, filename);
    
    try {
      await fs.access(filePath);
      return reply.sendFile(filename, releasesPath);
    } catch {
      return reply.status(404).send({
        success: false,
        error: {
          code: ERROR_CODES.CDN_VERSION_NOT_FOUND,
          message: `File not found: ${filename}`,
        },
        timestamp: Date.now(),
      });
    }
  });

  // ===================================
  // POST /verify-checksum - Verify file checksum
  // ===================================
  server.post("/verify-checksum", async (request, reply) => {
    const { filename, sha512 } = request.body as { filename: string; sha512: string };
    const filePath = path.join(releasesPath, filename);
    
    try {
      const fileBuffer = await fs.readFile(filePath);
      const hash = crypto.createHash("sha512").update(fileBuffer).digest("base64");
      
      const isValid = hash === sha512;
      
      return reply.send({
        success: true,
        data: { 
          isValid,
          expected: sha512,
          actual: hash,
        },
        timestamp: Date.now(),
      });
      
    } catch (error) {
      return reply.status(404).send({
        success: false,
        error: {
          code: ERROR_CODES.CDN_VERSION_NOT_FOUND,
          message: `File not found: ${filename}`,
        },
        timestamp: Date.now(),
      });
    }
  });
}

// ===================================
// HELPER FUNCTIONS
// ===================================

function parseLatestYml(content: string): {
  version: string;
  path: string;
  sha512: string;
  releaseDate: string;
  files: { url: string; sha512: string; size: number }[];
} {
  const lines = content.split("\n");
  const result: Record<string, any> = { files: [] };
  let inFiles = false;
  let currentFile: Record<string, any> = {};
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    if (trimmed.startsWith("version:")) {
      result['version'] = trimmed.split(":")[1]?.trim().replace(/"/g, "") || "";
    } else if (trimmed.startsWith("path:")) {
      result['path'] = trimmed.split(":")[1]?.trim().replace(/"/g, "") || "";
    } else if (trimmed.startsWith("sha512:")) {
      if (inFiles) {
        currentFile['sha512'] = trimmed.split(":")[1]?.trim() || "";
      } else {
        result['sha512'] = trimmed.split(":")[1]?.trim() || "";
      }
    } else if (trimmed.startsWith("releaseDate:")) {
      result['releaseDate'] = trimmed.substring("releaseDate:".length).trim().replace(/"/g, "");
    } else if (trimmed === "files:") {
      inFiles = true;
    } else if (inFiles && trimmed.startsWith("- url:")) {
      if (Object.keys(currentFile).length > 0) {
        result['files'].push(currentFile);
      }
      currentFile = { url: trimmed.split(":")[1]?.trim().replace(/"/g, "") || "" };
    } else if (inFiles && trimmed.startsWith("size:")) {
      currentFile['size'] = parseInt(trimmed.split(":")[1]?.trim() || "0");
    }
  }
  
  if (Object.keys(currentFile).length > 0) {
    result['files'].push(currentFile);
  }
  
  return result as any;
}

function compareVersions(v1: string, v2: string): number {
  const parts1 = v1.split(".").map(Number);
  const parts2 = v2.split(".").map(Number);
  
  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const p1 = parts1[i] || 0;
    const p2 = parts2[i] || 0;
    if (p1 > p2) return 1;
    if (p1 < p2) return -1;
  }
  
  return 0;
}
