import { NextRequest, NextResponse } from "next/server";
import { 
  checkRateLimit, 
  getClientIP, 
  createAdminToken,
  verifyPassword,
  hashPassword,
  logAuditEvent,
  generateCSRFToken,
  securityHeaders,
  sanitizeInput,
  detectInjection,
} from "@/lib/security";

// Configuration admin (à mettre dans .env en production)
const ADMIN_USERNAME = process.env["ADMIN_USERNAME"] || "admin";
// Hash du mot de passe par défaut (nemesis2026!)
// En production, mettre le hash directement dans une variable d'environnement
const ADMIN_PASSWORD_HASH = process.env["ADMIN_PASSWORD_HASH"] || 
  "$2b$12$/8PQDobh7rT.qqUMsQIIEeTyi/9f4j7DAVtjAaYU8oICJD8XhhjKK"; // nemesis2026!

export async function POST(request: NextRequest) {
  const ip = getClientIP(request);
  
  try {
    // 1. Rate Limiting - 5 tentatives par 15 minutes, blocage 30 minutes
    const rateLimitResult = checkRateLimit(`admin_login:${ip}`, {
      maxRequests: 5,
      windowSeconds: 15 * 60, // 15 minutes
      blockDurationSeconds: 30 * 60, // 30 minutes de blocage
    });
    
    if (!rateLimitResult.allowed) {
      logAuditEvent("LOGIN_RATE_LIMITED", ip);
      
      return NextResponse.json(
        { 
          error: rateLimitResult.blocked 
            ? "Trop de tentatives. Réessayez dans 30 minutes." 
            : "Trop de tentatives. Attendez un moment.",
          retryAfter: Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000),
        },
        { 
          status: 429,
          headers: {
            ...securityHeaders,
            "Retry-After": Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000).toString(),
          },
        }
      );
    }
    
    // 2. Parser et valider le body
    const body = await request.json();
    const username = sanitizeInput(String(body.username || ""));
    const password = String(body.password || "");
    
    // 3. Détection d'injection
    if (detectInjection(username)) {
      logAuditEvent("LOGIN_INJECTION_ATTEMPT", ip, { username });
      
      return NextResponse.json(
        { error: "Entrée non valide" },
        { status: 400, headers: securityHeaders }
      );
    }
    
    // 4. Validation des identifiants
    // Utiliser un temps constant pour éviter les timing attacks
    const usernameMatch = username === ADMIN_USERNAME;
    const passwordMatch = await verifyPassword(password, ADMIN_PASSWORD_HASH);
    
    if (!usernameMatch || !passwordMatch) {
      logAuditEvent("LOGIN_FAILED", ip, { username });
      
      // Délai aléatoire pour éviter les timing attacks
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));
      
      return NextResponse.json(
        { error: "Identifiants invalides" },
        { status: 401, headers: securityHeaders }
      );
    }
    
    // 5. Créer le token JWT et le CSRF token
    const token = await createAdminToken(username);
    const csrfToken = generateCSRFToken();
    
    logAuditEvent("LOGIN_SUCCESS", ip, { username });
    
    // 6. Créer la réponse avec les cookies sécurisés
    const response = NextResponse.json(
      { 
        success: true,
        message: "Connexion réussie",
        csrfToken, // Le client doit le stocker et l'envoyer avec chaque requête
      },
      { headers: securityHeaders }
    );
    
    // Cookie JWT HttpOnly
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 heures
      path: "/",
    });
    
    // Cookie CSRF (non HttpOnly car lu par JS)
    response.cookies.set("csrf_token", csrfToken, {
      httpOnly: false, // Doit être lisible par JS
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });
    
    return response;
    
  } catch (error) {
    logAuditEvent("LOGIN_ERROR", ip, { error: String(error) });
    
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500, headers: securityHeaders }
    );
  }
}

// Endpoint pour vérifier si la session est valide
export async function GET(request: NextRequest) {
  const ip = getClientIP(request);
  
  try {
    const token = request.cookies.get("admin_token")?.value;
    
    if (!token) {
      return NextResponse.json(
        { authenticated: false },
        { status: 200, headers: securityHeaders }
      );
    }
    
    // Import dynamique pour éviter le circular dependency
    const { verifyAdminToken } = await import("@/lib/security");
    const payload = await verifyAdminToken(token);
    
    if (!payload) {
      return NextResponse.json(
        { authenticated: false },
        { status: 200, headers: securityHeaders }
      );
    }
    
    return NextResponse.json(
      { 
        authenticated: true,
        username: payload.username,
      },
      { status: 200, headers: securityHeaders }
    );
    
  } catch {
    return NextResponse.json(
      { authenticated: false },
      { status: 200, headers: securityHeaders }
    );
  }
}
