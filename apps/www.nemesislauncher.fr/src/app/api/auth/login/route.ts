/**
 * API Route: Initiation de l'authentification Microsoft/Xbox
 * GET /api/auth/login - Redirige vers Microsoft OAuth
 */

import { NextRequest, NextResponse } from "next/server";
import { getMicrosoftAuthUrl, generatePKCE, isOAuthConfigured } from "@/lib/user-auth";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    // Vérifier que OAuth est configuré
    if (!isOAuthConfigured()) {
      console.error("Microsoft OAuth not configured: MICROSOFT_CLIENT_ID is missing");
      return NextResponse.redirect(
        new URL("/login?error=oauth_not_configured&message=" + encodeURIComponent("L'authentification Microsoft n'est pas encore configurée. Contactez l'administrateur."), request.url)
      );
    }
    
    // Générer PKCE
    const { verifier, challenge } = await generatePKCE();
    
    // Générer un state pour protection CSRF
    const state = crypto.randomUUID();
    
    // Stocker le verifier et state dans des cookies sécurisés
    const cookieStore = await cookies();
    
    cookieStore.set("pkce_verifier", verifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // lax pour permettre le redirect OAuth
      maxAge: 60 * 10, // 10 minutes
      path: "/",
    });
    
    cookieStore.set("oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 10,
      path: "/",
    });
    
    // Rediriger vers Microsoft
    const authUrl = getMicrosoftAuthUrl(state, challenge);
    
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error("Auth init error:", error);
    const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
    return NextResponse.redirect(
      new URL("/login?error=init_failed&message=" + encodeURIComponent(errorMessage), request.url)
    );
  }
}
