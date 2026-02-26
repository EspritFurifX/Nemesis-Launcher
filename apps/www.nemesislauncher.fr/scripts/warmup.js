#!/usr/bin/env node
/**
 * Warmup script - Pre-compiles all pages by fetching them
 * Run after dev server starts
 */

const pages = [
  "/",
  "/about",
  "/download",
  "/login",
  "/account",
  "/support",
  "/roadmap",
  "/cgv",
  "/terms",
  "/privacy",
  "/cookies",
  "/admin",
];

const BASE_URL = process.env.BASE_URL || "http://localhost:3001";

async function warmup() {
  console.log("🔥 Warming up pages...\n");
  
  for (const page of pages) {
    try {
      const start = Date.now();
      await fetch(`${BASE_URL}${page}`);
      const duration = Date.now() - start;
      console.log(`  ✓ ${page} (${duration}ms)`);
    } catch (err) {
      console.log(`  ✗ ${page} - ${err.message}`);
    }
  }
  
  console.log("\n✨ Warmup complete!");
}

// Wait for server to be ready
async function waitForServer(maxAttempts = 30) {
  console.log(`⏳ Waiting for server at ${BASE_URL}...`);
  
  for (let i = 0; i < maxAttempts; i++) {
    try {
      await fetch(BASE_URL);
      console.log("✓ Server is ready!\n");
      return true;
    } catch {
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  
  console.log("✗ Server not responding");
  return false;
}

async function main() {
  const ready = await waitForServer();
  if (ready) {
    await warmup();
  }
}

main();
