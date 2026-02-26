import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const RELEASES_FILE = path.join(process.cwd(), "data", "releases.json");

interface Download {
  url: string;
  size: string;
  filename?: string;
}

interface Release {
  id: string;
  version: string;
  date: string;
  changelog: string[];
  downloads: {
    windows?: Download;
    mac?: Download;
    linux?: Download;
  };
  published: boolean;
  createdAt: string;
}

// Load releases
async function loadReleases(): Promise<Release[]> {
  try {
    const data = await fs.readFile(RELEASES_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// GET - Get latest published release
export async function GET() {
  try {
    const releases = await loadReleases();
    
    // Get only published releases, sorted by date (newest first)
    const published = releases
      .filter(r => r.published)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (published.length === 0) {
      return NextResponse.json({ 
        available: false,
        release: null 
      });
    }

    const latest = published[0];
    
    return NextResponse.json({
      available: true,
      release: {
        version: latest?.version,
        date: latest?.date,
        changelog: latest?.changelog,
        downloads: latest?.downloads,
      },
    });
  } catch (error) {
    console.error("Error loading releases:", error);
    return NextResponse.json({ 
      available: false, 
      release: null 
    });
  }
}
