import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "data", "subscribers.json");

async function loadSubscribers() {
  try {
    const data = await fs.readFile(SUBSCRIBERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function GET() {
  try {
    const subscribers = await loadSubscribers();
    const count = subscribers.length;

    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error("Error fetching subscriber count:", error);
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}
