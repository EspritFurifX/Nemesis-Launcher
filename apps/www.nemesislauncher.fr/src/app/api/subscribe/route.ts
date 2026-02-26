import { NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";

// Validation schema
const subscribeSchema = z.object({
  email: z.string().email("Adresse email invalide"),
});

const SUBSCRIBERS_FILE = path.join(process.cwd(), "data", "subscribers.json");

// Types
interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  notified: boolean;
  source: string;
  ipAddress?: string;
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

// Rate limiting simple (en mémoire)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) {
    return false;
  }

  entry.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    // Get IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Trop de tentatives. Veuillez réessayer dans une minute." },
        { status: 429 }
      );
    }

    // Parse and validate body
    const body = await request.json();
    const { email } = subscribeSchema.parse(body);

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Load existing subscribers
    const subscribers = await loadSubscribers();

    // Check if already subscribed
    const existing = subscribers.find(s => s.email === normalizedEmail);

    if (existing) {
      return NextResponse.json(
        { message: "Vous êtes déjà inscrit ! Vous serez notifié du lancement." },
        { status: 200 }
      );
    }

    // Create new subscriber
    const newSubscriber: Subscriber = {
      id: `sub_${Date.now()}`,
      email: normalizedEmail,
      subscribedAt: new Date().toISOString(),
      notified: false,
      source: "website",
      ipAddress: ip,
    };

    subscribers.push(newSubscriber);
    await saveSubscribers(subscribers);

    return NextResponse.json(
      {
        success: true,
        message: "Inscription réussie ! Vous recevrez un email lors du lancement.",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0]?.message || "Données invalides" },
        { status: 400 }
      );
    }

    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
