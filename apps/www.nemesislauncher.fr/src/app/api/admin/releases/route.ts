import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import fs from "fs/promises";
import path from "path";

const JWT_SECRET = new TextEncoder().encode(
  process.env["JWT_SECRET"] || "nemesis-admin-secret-key-change-in-production"
);

const RELEASES_FILE = path.join(process.cwd(), "data", "releases.json");

// Types
interface Download {
  url: string;
  size: string;
  filename: string;
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

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data");
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Load releases
async function loadReleases(): Promise<Release[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(RELEASES_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Save releases
async function saveReleases(releases: Release[]) {
  await ensureDataDir();
  await fs.writeFile(RELEASES_FILE, JSON.stringify(releases, null, 2));
}

// Verify admin token
async function verifyAdmin(request: NextRequest): Promise<boolean> {
  try {
    const token = request.cookies.get("admin_token")?.value;
    if (!token) return false;
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

// GET - Liste des releases
export async function GET(request: NextRequest) {
  const isAdmin = await verifyAdmin(request);
  const releases = await loadReleases();

  // Si pas admin, ne retourner que les releases publiées
  if (!isAdmin) {
    const published = releases.filter(r => r.published);
    return NextResponse.json({ releases: published });
  }

  return NextResponse.json({ releases });
}

// POST - Créer une release
export async function POST(request: NextRequest) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { version, changelog, downloads, published = false } = body;

    if (!version) {
      return NextResponse.json(
        { error: "Version requise" },
        { status: 400 }
      );
    }

    const releases = await loadReleases();

    // Check if version already exists
    if (releases.some(r => r.version === version)) {
      return NextResponse.json(
        { error: "Cette version existe déjà" },
        { status: 400 }
      );
    }

    const newRelease: Release = {
      id: `release_${Date.now()}`,
      version,
      date: new Date().toLocaleDateString("fr-FR"),
      changelog: changelog || [],
      downloads: downloads || {},
      published,
      createdAt: new Date().toISOString(),
    };

    releases.unshift(newRelease); // Add to beginning
    await saveReleases(releases);

    return NextResponse.json({ 
      success: true, 
      release: newRelease 
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

// PUT - Modifier une release
export async function PUT(request: NextRequest) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID requis" },
        { status: 400 }
      );
    }

    const releases = await loadReleases();
    const index = releases.findIndex(r => r.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: "Release non trouvée" },
        { status: 404 }
      );
    }

    releases[index] = { ...releases[index], ...updates };
    await saveReleases(releases);

    return NextResponse.json({ 
      success: true, 
      release: releases[index] 
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer une release
export async function DELETE(request: NextRequest) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID requis" },
        { status: 400 }
      );
    }

    const releases = await loadReleases();
    const filtered = releases.filter(r => r.id !== id);

    if (filtered.length === releases.length) {
      return NextResponse.json(
        { error: "Release non trouvée" },
        { status: 404 }
      );
    }

    await saveReleases(filtered);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
