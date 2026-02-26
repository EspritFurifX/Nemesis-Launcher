import { NextRequest, NextResponse } from "next/server";
import { 
  getAuditLogs, 
  securityHeaders,
  isAdminAuthenticated,
} from "@/lib/security";

export async function GET(request: NextRequest) {
  // Vérifier l'authentification (double vérification après middleware)
  const authenticated = await isAdminAuthenticated(request);
  if (!authenticated) {
    return NextResponse.json(
      { error: "Non autorisé" },
      { status: 401, headers: securityHeaders }
    );
  }
  
  const { searchParams } = new URL(request.url);
  const limit = Math.min(parseInt(searchParams.get("limit") || "100"), 500);
  
  const logs = getAuditLogs(limit);
  
  return NextResponse.json({ logs }, { headers: securityHeaders });
}
