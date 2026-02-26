import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env["JWT_SECRET"] || "nemesis-admin-secret-key-change-in-production"
);

// Routes qui nécessitent une authentification admin
const protectedAdminRoutes = [
  "/admin/dashboard",
  "/api/admin/releases",
  "/api/admin/subscribers",
  "/api/admin/upload",
  "/api/admin/audit",
  "/api/admin/stats",
];

// Routes publiques (pas besoin d'auth)
const publicRoutes = [
  "/",
  "/download",
  "/privacy",
  "/cookies",
  "/terms",
  "/admin", // Page de login
  "/api/admin/login",
  "/api/newsletter",
  "/api/releases",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Headers de sécurité pour toutes les réponses
  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  
  // Vérifier si la route est protégée
  const isProtectedAdminRoute = protectedAdminRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  if (!isProtectedAdminRoute) {
    return response;
  }
  
  // Vérifier l'authentification pour les routes admin protégées
  const token = request.cookies.get("admin_token")?.value;
  
  if (!token) {
    // API routes: retourner 401
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }
    // Pages: rediriger vers login
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  
  try {
    // Vérifier le token
    await jwtVerify(token, JWT_SECRET);
    
    // Token valide, vérifier le CSRF pour les mutations
    const method = request.method;
    if (["POST", "PUT", "DELETE", "PATCH"].includes(method)) {
      const csrfHeader = request.headers.get("X-CSRF-Token");
      const csrfCookie = request.cookies.get("csrf_token")?.value;
      
      // Si pas de CSRF token pour une requête de mutation sur l'API
      if (pathname.startsWith("/api/") && (!csrfHeader || csrfHeader !== csrfCookie)) {
        return NextResponse.json(
          { error: "Token CSRF invalide" },
          { status: 403 }
        );
      }
    }
    
    return response;
    
  } catch {
    // Token invalide ou expiré
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Session expirée" },
        { status: 401 }
      );
    }
    
    // Supprimer le cookie invalide et rediriger
    const redirectResponse = NextResponse.redirect(new URL("/admin", request.url));
    redirectResponse.cookies.delete("admin_token");
    return redirectResponse;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
