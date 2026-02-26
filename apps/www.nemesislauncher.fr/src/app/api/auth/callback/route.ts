/**
 * API Route: Callback OAuth Microsoft
 * GET /api/auth/callback - Traite le retour de Microsoft OAuth
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { 
  fullAuthenticationFlow, 
  createUserToken,
  User,
} from "@/lib/user-auth";
import { logAuditEvent, getClientIP } from "@/lib/security";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

async function loadUsers(): Promise<User[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveUsers(users: User[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

export async function GET(request: NextRequest) {
  const ip = getClientIP(request);
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  
  // Check for OAuth errors
  if (error) {
    logAuditEvent("USER_AUTH_OAUTH_ERROR", ip, { error });
    return NextResponse.redirect(
      new URL(`/login?error=${error}`, request.url)
    );
  }
  
  if (!code || !state) {
    logAuditEvent("USER_AUTH_MISSING_PARAMS", ip);
    return NextResponse.redirect(
      new URL("/login?error=missing_params", request.url)
    );
  }
  
  // Vérifier le state
  const cookieStore = await cookies();
  const storedState = cookieStore.get("oauth_state")?.value;
  const codeVerifier = cookieStore.get("pkce_verifier")?.value;
  
  if (!storedState || storedState !== state) {
    logAuditEvent("USER_AUTH_INVALID_STATE", ip);
    return NextResponse.redirect(
      new URL("/login?error=invalid_state", request.url)
    );
  }
  
  if (!codeVerifier) {
    logAuditEvent("USER_AUTH_MISSING_VERIFIER", ip);
    return NextResponse.redirect(
      new URL("/login?error=session_expired", request.url)
    );
  }
  
  // Nettoyer les cookies OAuth
  cookieStore.delete("oauth_state");
  cookieStore.delete("pkce_verifier");
  
  try {
    // Effectuer le flow d'authentification complet
    const authResult = await fullAuthenticationFlow(code, codeVerifier);
    
    if (!authResult.success || !authResult.profile) {
      logAuditEvent("USER_AUTH_FAILED", ip, { 
        errorCode: authResult.errorCode,
        error: authResult.error 
      });
      
      const errorMessage = encodeURIComponent(authResult.error || "auth_failed");
      return NextResponse.redirect(
        new URL(`/login?error=${authResult.errorCode}&message=${errorMessage}`, request.url)
      );
    }
    
    // Charger ou créer l'utilisateur
    const users = await loadUsers();
    let user = users.find(u => u.minecraftUuid === authResult.profile!.id);
    
    if (!user) {
      // Créer un nouvel utilisateur
      user = {
        id: crypto.randomUUID(),
        minecraftUuid: authResult.profile.id,
        minecraftUsername: authResult.profile.name,
        xboxGamertag: authResult.xboxGamertag || "",
        avatar: authResult.profile.skins?.[0]?.url,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        balance: 0,
        purchases: [],
      };
      users.push(user);
      logAuditEvent("USER_CREATED", ip, { 
        userId: user.id, 
        minecraft: user.minecraftUsername 
      });
    } else {
      // Mettre à jour les informations
      user.minecraftUsername = authResult.profile.name;
      user.avatar = authResult.profile.skins?.[0]?.url || user.avatar;
      user.lastLogin = new Date().toISOString();
      logAuditEvent("USER_LOGIN", ip, { 
        userId: user.id, 
        minecraft: user.minecraftUsername 
      });
    }
    
    await saveUsers(users);
    
    // Créer le token JWT utilisateur
    const token = await createUserToken({
      userId: user.id,
      minecraftUuid: user.minecraftUuid,
      minecraftUsername: user.minecraftUsername,
    });
    
    // Créer la réponse avec redirection vers le profil
    const response = NextResponse.redirect(
      new URL("/account", request.url)
    );
    
    // Set le cookie d'authentification
    response.cookies.set("user_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: "/",
    });
    
    return response;
    
  } catch (error) {
    console.error("Auth callback error:", error);
    logAuditEvent("USER_AUTH_ERROR", ip, { error: String(error) });
    
    return NextResponse.redirect(
      new URL("/login?error=server_error", request.url)
    );
  }
}
