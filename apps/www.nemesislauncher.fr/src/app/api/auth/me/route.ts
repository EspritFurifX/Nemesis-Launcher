/**
 * API Route: Profil utilisateur
 * GET /api/auth/me - Récupère le profil de l'utilisateur connecté
 * DELETE /api/auth/me - Déconnexion
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyUserToken, User } from "@/lib/user-auth";
import { securityHeaders, logAuditEvent, getClientIP } from "@/lib/security";
import fs from "fs/promises";
import path from "path";

const USERS_FILE = path.join(process.cwd(), "data", "users.json");

async function loadUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("user_token")?.value;
    
    if (!token) {
      return NextResponse.json(
        { authenticated: false },
        { status: 200, headers: securityHeaders }
      );
    }
    
    const payload = await verifyUserToken(token);
    
    if (!payload) {
      return NextResponse.json(
        { authenticated: false },
        { status: 200, headers: securityHeaders }
      );
    }
    
    // Récupérer les données complètes de l'utilisateur
    const users = await loadUsers();
    const user = users.find(u => u.id === payload.userId);
    
    if (!user) {
      return NextResponse.json(
        { authenticated: false },
        { status: 200, headers: securityHeaders }
      );
    }
    
    // Retourner les données publiques
    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        minecraftUsername: user.minecraftUsername,
        minecraftUuid: user.minecraftUuid,
        avatar: user.avatar,
        balance: user.balance,
        purchaseCount: user.purchases.length,
        memberSince: user.createdAt,
      },
    }, { headers: securityHeaders });
    
  } catch {
    return NextResponse.json(
      { authenticated: false },
      { status: 200, headers: securityHeaders }
    );
  }
}

// Déconnexion
export async function DELETE(request: NextRequest) {
  const ip = getClientIP(request);
  
  try {
    const token = request.cookies.get("user_token")?.value;
    
    if (token) {
      const payload = await verifyUserToken(token);
      if (payload) {
        logAuditEvent("USER_LOGOUT", ip, { 
          userId: payload.userId,
          minecraft: payload.minecraftUsername 
        });
      }
    }
    
    const response = NextResponse.json(
      { success: true },
      { headers: securityHeaders }
    );
    
    response.cookies.delete("user_token");
    
    return response;
    
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500, headers: securityHeaders }
    );
  }
}
