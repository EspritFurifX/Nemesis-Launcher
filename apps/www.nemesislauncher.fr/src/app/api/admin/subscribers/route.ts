import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import fs from "fs/promises";
import path from "path";

const JWT_SECRET = new TextEncoder().encode(
  process.env["JWT_SECRET"] || "nemesis-admin-secret-key-change-in-production"
);

const SUBSCRIBERS_FILE = path.join(process.cwd(), "data", "subscribers.json");

// Types
interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  notified: boolean;
  source: string;
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

// Load subscribers
async function loadSubscribers(): Promise<Subscriber[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(SUBSCRIBERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Save subscribers
async function saveSubscribers(subscribers: Subscriber[]) {
  await ensureDataDir();
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
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

// GET - Liste des abonnés
export async function GET(request: NextRequest) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const subscribers = await loadSubscribers();

  // Stats
  const stats = {
    total: subscribers.length,
    notified: subscribers.filter(s => s.notified).length,
    pending: subscribers.filter(s => !s.notified).length,
  };

  return NextResponse.json({ subscribers, stats });
}

// DELETE - Supprimer un abonné
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

    const subscribers = await loadSubscribers();
    const filtered = subscribers.filter(s => s.id !== id);

    if (filtered.length === subscribers.length) {
      return NextResponse.json(
        { error: "Abonné non trouvé" },
        { status: 404 }
      );
    }

    await saveSubscribers(filtered);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

// POST - Exporter en CSV
export async function POST(request: NextRequest) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { action } = await request.json();

    if (action === "export") {
      const subscribers = await loadSubscribers();
      
      // Générer CSV
      const headers = "Email,Date d'inscription,Notifié\n";
      const rows = subscribers.map(s => 
        `${s.email},${s.subscribedAt},${s.notified ? "Oui" : "Non"}`
      ).join("\n");

      const csv = headers + rows;

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="subscribers_${Date.now()}.csv"`,
        },
      });
    }

    if (action === "mark_notified") {
      const subscribers = await loadSubscribers();
      const updated = subscribers.map(s => ({ ...s, notified: true }));
      await saveSubscribers(updated);
      
      return NextResponse.json({ 
        success: true,
        message: `${updated.length} abonnés marqués comme notifiés`
      });
    }

    return NextResponse.json(
      { error: "Action non reconnue" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
