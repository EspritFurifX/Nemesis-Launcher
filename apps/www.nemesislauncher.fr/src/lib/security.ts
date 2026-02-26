/**
 * Utilitaires de sécurité pour Nemesis Launcher
 */

import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

// ============================================
// Configuration
// ============================================

const JWT_SECRET = new TextEncoder().encode(
  process.env["JWT_SECRET"] || "nemesis-admin-secret-key-change-in-production"
);

const CSRF_SECRET = process.env["CSRF_SECRET"] || "nemesis-csrf-secret-change-in-production";

// ============================================
// Rate Limiting (In-Memory)
// ============================================

interface RateLimitEntry {
  count: number;
  resetAt: number;
  blocked: boolean;
  blockedUntil?: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Nettoyer périodiquement les anciennes entrées (toutes les 5 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < now && (!entry.blocked || (entry.blockedUntil && entry.blockedUntil < now))) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitOptions {
  /** Nombre maximum de requêtes */
  maxRequests: number;
  /** Fenêtre de temps en secondes */
  windowSeconds: number;
  /** Durée du blocage en secondes après dépassement */
  blockDurationSeconds?: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  blocked: boolean;
}

/**
 * Vérifie et applique le rate limiting pour une clé donnée
 */
export function checkRateLimit(
  key: string, 
  options: RateLimitOptions
): RateLimitResult {
  const now = Date.now();
  const { maxRequests, windowSeconds, blockDurationSeconds = 60 } = options;
  
  let entry = rateLimitStore.get(key);
  
  // Vérifier si l'IP est bloquée
  if (entry?.blocked) {
    if (entry.blockedUntil && entry.blockedUntil > now) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: entry.blockedUntil,
        blocked: true,
      };
    }
    // Le blocage a expiré, réinitialiser
    entry = undefined;
  }
  
  // Réinitialiser si la fenêtre a expiré
  if (!entry || entry.resetAt < now) {
    entry = {
      count: 0,
      resetAt: now + windowSeconds * 1000,
      blocked: false,
    };
  }
  
  // Incrémenter le compteur
  entry.count++;
  
  // Vérifier si le limite est dépassée
  if (entry.count > maxRequests) {
    entry.blocked = true;
    entry.blockedUntil = now + blockDurationSeconds * 1000;
    rateLimitStore.set(key, entry);
    
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.blockedUntil,
      blocked: true,
    };
  }
  
  rateLimitStore.set(key, entry);
  
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetAt: entry.resetAt,
    blocked: false,
  };
}

/**
 * Récupère l'IP du client
 */
export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return (forwarded.split(",")[0] || "").trim();
  }
  
  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }
  
  return "unknown";
}

// ============================================
// CSRF Protection
// ============================================

/**
 * Génère un token CSRF
 */
export function generateCSRFToken(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2);
  const data = `${timestamp}-${random}`;
  
  // Simple signature avec le secret
  const signature = Buffer.from(
    `${data}|${CSRF_SECRET}`
  ).toString("base64").substring(0, 20);
  
  return `${data}.${signature}`;
}

/**
 * Vérifie un token CSRF
 */
export function verifyCSRFToken(token: string): boolean {
  try {
    const [data, signature] = token.split(".");
    if (!data || !signature) return false;
    
    // Vérifier la signature
    const expectedSignature = Buffer.from(
      `${data}|${CSRF_SECRET}`
    ).toString("base64").substring(0, 20);
    
    if (signature !== expectedSignature) return false;
    
    // Vérifier que le token n'est pas trop vieux (1 heure max)
    const [timestamp] = data.split("-");
    const tokenTime = parseInt(timestamp || "0", 36);
    const maxAge = 60 * 60 * 1000; // 1 heure
    
    return Date.now() - tokenTime < maxAge;
  } catch {
    return false;
  }
}

// ============================================
// Password Hashing
// ============================================

/**
 * Hash un mot de passe avec bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

/**
 * Vérifie un mot de passe contre son hash
 */
export async function verifyPassword(
  password: string, 
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ============================================
// JWT Token Management
// ============================================

export interface AdminTokenPayload {
  username: string;
  role: "admin";
  iat: number;
}

/**
 * Crée un token JWT admin
 */
export async function createAdminToken(username: string): Promise<string> {
  return new SignJWT({
    username,
    role: "admin",
    iat: Date.now(),
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(JWT_SECRET);
}

/**
 * Vérifie un token JWT admin
 */
export async function verifyAdminToken(token: string): Promise<AdminTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as AdminTokenPayload;
  } catch {
    return null;
  }
}

/**
 * Vérifie l'authentification admin depuis les cookies
 */
export async function isAdminAuthenticated(request: NextRequest): Promise<boolean> {
  try {
    const token = request.cookies.get("admin_token")?.value;
    if (!token) return false;
    
    const payload = await verifyAdminToken(token);
    return payload?.role === "admin";
  } catch {
    return false;
  }
}

// ============================================
// Security Headers
// ============================================

export const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

// ============================================
// Input Validation
// ============================================

/**
 * Nettoie une entrée pour éviter les injections
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "") // Supprimer les balises HTML basiques
    .trim()
    .substring(0, 1000); // Limiter la longueur
}

/**
 * Vérifie si une chaîne ressemble à une tentative d'injection
 */
export function detectInjection(input: string): boolean {
  const patterns = [
    /<script/i,
    /javascript:/i,
    /on\w+=/i,
    /data:/i,
    /vbscript:/i,
  ];
  
  return patterns.some(pattern => pattern.test(input));
}

// ============================================
// Audit Logging
// ============================================

export interface AuditLog {
  timestamp: string;
  action: string;
  ip: string;
  details?: Record<string, unknown>;
}

const auditLogs: AuditLog[] = [];
const MAX_AUDIT_LOGS = 1000;

/**
 * Ajoute une entrée dans le journal d'audit
 */
export function logAuditEvent(
  action: string, 
  ip: string, 
  details?: Record<string, unknown>
): void {
  const entry: AuditLog = {
    timestamp: new Date().toISOString(),
    action,
    ip,
    details,
  };
  
  auditLogs.unshift(entry);
  
  // Garder seulement les dernières entrées
  if (auditLogs.length > MAX_AUDIT_LOGS) {
    auditLogs.pop();
  }
  
  // Log console en développement
  if (process.env.NODE_ENV === "development") {
    console.log(`[AUDIT] ${action}`, entry);
  }
}

/**
 * Récupère les logs d'audit
 */
export function getAuditLogs(limit = 100): AuditLog[] {
  return auditLogs.slice(0, limit);
}
