import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken, securityHeaders } from "@/lib/security";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("admin_token")?.value;
    
    if (!token) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401, headers: securityHeaders }
      );
    }
    
    const payload = await verifyAdminToken(token);
    
    if (!payload || payload.role !== "admin") {
      return NextResponse.json(
        { authenticated: false },
        { status: 401, headers: securityHeaders }
      );
    }
    
    return NextResponse.json({
      authenticated: true,
      user: {
        username: payload.username,
        role: payload.role,
      }
    }, { headers: securityHeaders });
  } catch {
    return NextResponse.json(
      { authenticated: false },
      { status: 401, headers: securityHeaders }
    );
  }
}
