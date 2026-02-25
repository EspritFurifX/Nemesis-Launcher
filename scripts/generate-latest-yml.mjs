#!/usr/bin/env node
// ===========================================
// GENERATE LATEST.YML FOR LOCAL CDN
// ===========================================

import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CDN_DIR = path.resolve(__dirname, "../storage/cdn/releases");

const PLATFORMS = {
  darwin: [".dmg", ".zip"],
  win32: [".exe"],
  linux: [".AppImage"],
};

async function generateLatestYml() {
  console.log("Generating latest.yml files...\n");

  // Get all release files
  const files = await fs.readdir(CDN_DIR);
  const releaseFiles = files.filter(
    (f) => f.endsWith(".dmg") || f.endsWith(".exe") || f.endsWith(".AppImage") || f.endsWith(".zip")
  );

  if (releaseFiles.length === 0) {
    console.log("No release files found. Please build first.");
    return;
  }

  // Extract version from filename (assuming format: Name-Version-arch.ext)
  const versionMatch = releaseFiles[0]?.match(/-(\d+\.\d+\.\d+)-/);
  const version = versionMatch ? versionMatch[1] : "1.0.0";
  const releaseDate = new Date().toISOString();

  console.log(`Version: ${version}`);
  console.log(`Release Date: ${releaseDate}\n`);

  // Generate platform-specific yml files
  for (const [platform, extensions] of Object.entries(PLATFORMS)) {
    const platformFiles = releaseFiles.filter((f) =>
      extensions.some((ext) => f.endsWith(ext))
    );

    if (platformFiles.length === 0) continue;

    const mainFile = platformFiles[0];
    const filePath = path.join(CDN_DIR, mainFile);

    // Calculate SHA-512
    const fileBuffer = await fs.readFile(filePath);
    const sha512 = crypto.createHash("sha512").update(fileBuffer).digest("base64");
    const size = (await fs.stat(filePath)).size;

    const yml = `version: ${version}
files:
  - url: ${mainFile}
    sha512: ${sha512}
    size: ${size}
path: ${mainFile}
sha512: ${sha512}
releaseDate: '${releaseDate}'
`;

    // Write platform-specific file
    await fs.writeFile(path.join(CDN_DIR, `latest-${platform}.yml`), yml);
    console.log(`✓ Generated latest-${platform}.yml`);
    console.log(`  File: ${mainFile}`);
    console.log(`  Size: ${(size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  SHA-512: ${sha512.substring(0, 32)}...`);
    console.log("");
  }

  // Generate generic latest.yml (use darwin as default, or first available)
  const defaultPlatform = Object.keys(PLATFORMS).find((p) => {
    return releaseFiles.some((f) => PLATFORMS[p].some((ext) => f.endsWith(ext)));
  });

  if (defaultPlatform) {
    const srcYml = path.join(CDN_DIR, `latest-${defaultPlatform}.yml`);
    const destYml = path.join(CDN_DIR, "latest.yml");
    await fs.copyFile(srcYml, destYml);
    console.log(`✓ Copied latest-${defaultPlatform}.yml to latest.yml`);
  }

  console.log("\nDone!");
}

generateLatestYml().catch(console.error);
