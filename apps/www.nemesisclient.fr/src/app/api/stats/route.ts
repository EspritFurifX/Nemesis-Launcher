import { NextResponse } from "next/server";
import { prisma } from "@nemesis/database";

export async function GET() {
  try {
    const count = await prisma.subscriber.count({
      where: {
        unsubscribedAt: null,
      },
    });

    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error("Error fetching subscriber count:", error);
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}
