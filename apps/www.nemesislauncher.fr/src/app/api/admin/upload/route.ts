import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import fs from "fs/promises";
import path from "path";

const JWT_SECRET = new TextEncoder().encode(
  process.env["JWT_SECRET"] || "nemesis-admin-secret-key-change-in-production"
);

const UPLOADS_DIR = path.join(process.cwd(), "public", "downloads");

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

// Ensure uploads directory exists
async function ensureUploadsDir() {
  try {
    await fs.access(UPLOADS_DIR);
  } catch {
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
  }
}

// POST - Upload a file
export async function POST(request: NextRequest) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const platform = formData.get("platform") as string | null;
    const version = formData.get("version") as string | null;

    if (!file) {
      return NextResponse.json({ error: "Fichier requis" }, { status: 400 });
    }

    if (!platform || !["windows", "mac", "linux"].includes(platform)) {
      return NextResponse.json({ error: "Plateforme invalide" }, { status: 400 });
    }

    if (!version) {
      return NextResponse.json({ error: "Version requise" }, { status: 400 });
    }

    // Validate file extension
    const allowedExtensions: Record<string, string[]> = {
      windows: [".exe", ".msi"],
      mac: [".dmg", ".pkg", ".zip"],
      linux: [".AppImage", ".deb", ".rpm", ".tar.gz"],
    };

    const ext = path.extname(file.name).toLowerCase();
    if (!allowedExtensions[platform]?.some(e => file.name.toLowerCase().endsWith(e))) {
      return NextResponse.json(
        { error: `Extension non autorisée pour ${platform}` },
        { status: 400 }
      );
    }

    await ensureUploadsDir();

    // Create version directory
    const versionDir = path.join(UPLOADS_DIR, version);
    try {
      await fs.access(versionDir);
    } catch {
      await fs.mkdir(versionDir, { recursive: true });
    }

    // Generate filename
    const filename = `NemesisLauncher-${version}-${platform}${ext}`;
    const filePath = path.join(versionDir, filename);

    // Write file
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    // Calculate size
    const stats = await fs.stat(filePath);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(1);

    // Return download URL
    const downloadUrl = `/downloads/${version}/${filename}`;

    return NextResponse.json({
      success: true,
      url: downloadUrl,
      size: `${sizeMB} MB`,
      filename,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'upload" },
      { status: 500 }
    );
  }
}

// GET - List uploaded files
export async function GET(request: NextRequest) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    await ensureUploadsDir();
    
    const versions = await fs.readdir(UPLOADS_DIR);
    const files: Array<{ version: string; files: string[] }> = [];

    for (const version of versions) {
      const versionPath = path.join(UPLOADS_DIR, version);
      const stat = await fs.stat(versionPath);
      
      if (stat.isDirectory()) {
        const versionFiles = await fs.readdir(versionPath);
        files.push({ version, files: versionFiles });
      }
    }

    return NextResponse.json({ files });
  } catch (error) {
    return NextResponse.json({ files: [] });
  }
}

// DELETE - Delete a file
export async function DELETE(request: NextRequest) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const version = searchParams.get("version");
    const filename = searchParams.get("filename");

    if (!version || !filename) {
      return NextResponse.json(
        { error: "Version et filename requis" },
        { status: 400 }
      );
    }

    const filePath = path.join(UPLOADS_DIR, version, filename);
    await fs.unlink(filePath);

    // Try to remove version directory if empty
    try {
      const versionDir = path.join(UPLOADS_DIR, version);
      const remaining = await fs.readdir(versionDir);
      if (remaining.length === 0) {
        await fs.rmdir(versionDir);
      }
    } catch {
      // Ignore if directory not empty or doesn't exist
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la suppression" },
      { status: 500 }
    );
  }
}
