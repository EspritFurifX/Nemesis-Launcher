import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@nemesis/database";

// Validation schema
const subscribeSchema = z.object({
  email: z.string().email("Adresse email invalide"),
});

// Rate limiting simple (en mémoire - pour prod utiliser Redis)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // 5 inscriptions max
const RATE_WINDOW = 60 * 1000; // par minute

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

    // Check if already subscribed
    const existing = await prisma.subscriber.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Vous êtes déjà inscrit ! Vous serez notifié du lancement." },
        { status: 200 }
      );
    }

    // Create subscriber
    await prisma.subscriber.create({
      data: {
        email: normalizedEmail,
        source: "website",
        ipAddress: ip,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Inscription réussie ! Vous recevrez un email lors du lancement.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0]?.message || "Données invalides" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
