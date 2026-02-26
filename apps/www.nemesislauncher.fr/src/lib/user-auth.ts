/**
 * Utilitaires d'authentification utilisateur via Microsoft/Xbox
 * Pour les comptes utilisateurs Nemesis (achats cosmétiques)
 */

import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env["JWT_SECRET"] || "nemesis-user-secret-key-change-in-production"
);

// Microsoft OAuth Configuration
const MICROSOFT_CLIENT_ID = process.env["MICROSOFT_CLIENT_ID"] || "";
const MICROSOFT_CLIENT_SECRET = process.env["MICROSOFT_CLIENT_SECRET"] || "";
const MICROSOFT_REDIRECT_URI = process.env["MICROSOFT_REDIRECT_URI"] || "https://nemesislauncher.fr/api/auth/callback";

// URLs Microsoft OAuth - MSA endpoints (live.com) pour Minecraft auth
// Note: Azure AD v2 (microsoftonline.com) ne fonctionne PAS avec Minecraft API
export const MICROSOFT_AUTH_URL = "https://login.live.com/oauth20_authorize.srf";
export const MICROSOFT_TOKEN_URL = "https://login.live.com/oauth20_token.srf";
export const XBOX_AUTH_URL = "https://user.auth.xboxlive.com/user/authenticate";
export const XBOX_XSTS_URL = "https://xsts.auth.xboxlive.com/xsts/authorize";
export const MINECRAFT_AUTH_URL = "https://api.minecraftservices.com/authentication/login_with_xbox";
export const MINECRAFT_PROFILE_URL = "https://api.minecraftservices.com/minecraft/profile";

/**
 * Vérifie si l'authentification OAuth Microsoft est correctement configurée
 */
export function isOAuthConfigured(): boolean {
  return Boolean(MICROSOFT_CLIENT_ID && MICROSOFT_CLIENT_ID.length > 10);
}

/**
 * Retourne des informations sur la configuration OAuth (pour debug)
 */
export function getOAuthConfigStatus(): { configured: boolean; clientIdSet: boolean; redirectUriSet: boolean } {
  return {
    configured: isOAuthConfigured(),
    clientIdSet: Boolean(MICROSOFT_CLIENT_ID),
    redirectUriSet: Boolean(MICROSOFT_REDIRECT_URI),
  };
}

// ============================================
// Interfaces
// ============================================

export interface User {
  id: string;
  minecraftUuid: string;
  minecraftUsername: string;
  xboxGamertag: string;
  avatar?: string;
  createdAt: string;
  lastLogin: string;
  balance: number; // Crédits pour achats cosmétiques
  purchases: Purchase[];
}

export interface Purchase {
  id: string;
  itemId: string;
  itemName: string;
  price: number;
  purchasedAt: string;
}

export interface MinecraftProfile {
  id: string; // UUID
  name: string; // Username
  skins?: { url: string }[];
}

export interface UserTokenPayload {
  userId: string;
  minecraftUuid: string;
  minecraftUsername: string;
  iat: number;
}

// ============================================
// PKCE Utilities
// ============================================

function generateRandomString(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let result = "";
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    result += chars[array[i]! % chars.length];
  }
  return result;
}

async function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return crypto.subtle.digest("SHA-256", data);
}

function base64URLEncode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let str = "";
  for (const byte of bytes) {
    str += String.fromCharCode(byte);
  }
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function generatePKCE(): Promise<{ verifier: string; challenge: string }> {
  const verifier = generateRandomString(64);
  const challengeBuffer = await sha256(verifier);
  const challenge = base64URLEncode(challengeBuffer);
  return { verifier, challenge };
}

// ============================================
// Microsoft OAuth Flow
// ============================================

/**
 * Génère l'URL de connexion Microsoft
 * @throws Error si le client_id n'est pas configuré
 */
export function getMicrosoftAuthUrl(state: string, codeChallenge: string): string {
  if (!isOAuthConfigured()) {
    throw new Error("MICROSOFT_CLIENT_ID n'est pas configuré. Veuillez définir cette variable d'environnement.");
  }
  
  const params = new URLSearchParams({
    client_id: MICROSOFT_CLIENT_ID,
    response_type: "code",
    redirect_uri: MICROSOFT_REDIRECT_URI,
    scope: "XboxLive.signin offline_access",
    state: state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });
  
  return `${MICROSOFT_AUTH_URL}?${params}`;
}

/**
 * Échange le code d'autorisation contre un token Microsoft
 * Note: Pour Minecraft auth, on utilise PKCE sans client_secret (public client)
 */
export async function exchangeMicrosoftCode(code: string, codeVerifier: string): Promise<string | null> {
  try {
    // IMPORTANT: Ne pas envoyer client_secret pour les apps Minecraft
    // Minecraft requiert un "public client" avec PKCE uniquement
    const body: Record<string, string> = {
      client_id: MICROSOFT_CLIENT_ID,
      code: code,
      grant_type: "authorization_code",
      redirect_uri: MICROSOFT_REDIRECT_URI,
      code_verifier: codeVerifier,
    };
    
    const response = await fetch(MICROSOFT_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(body),
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error("Token exchange failed:", errorData);
      return null;
    }
    
    const data = await response.json();
    return data.access_token || null;
  } catch (err) {
    console.error("Token exchange error:", err);
    return null;
  }
}

/**
 * Authentification Xbox Live avec le token Microsoft
 */
export async function authenticateXbox(microsoftToken: string): Promise<{ token: string; userHash: string } | null> {
  try {
    const response = await fetch(XBOX_AUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        Properties: {
          AuthMethod: "RPS",
          SiteName: "user.auth.xboxlive.com",
          RpsTicket: `d=${microsoftToken}`,
        },
        RelyingParty: "http://auth.xboxlive.com",
        TokenType: "JWT",
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("[XBOX] Auth failed:", response.status, errorText);
      return null;
    }
    
    const data = await response.json();
    return {
      token: data.Token,
      userHash: data.DisplayClaims?.xui?.[0]?.uhs || "",
    };
  } catch (err) {
    console.error("[XBOX] Auth error:", err);
    return null;
  }
}

/**
 * Obtenir le token XSTS pour Minecraft
 */
export async function getXSTSToken(xboxToken: string): Promise<{ token: string; userHash: string } | null> {
  try {
    const response = await fetch(XBOX_XSTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        Properties: {
          SandboxId: "RETAIL",
          UserTokens: [xboxToken],
        },
        RelyingParty: "rp://api.minecraftservices.com/",
        TokenType: "JWT",
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      // XErr 2148916233 = Compte Xbox non créé
      // XErr 2148916238 = Compte mineur sans autorisation parentale
      console.error("XSTS Error:", error);
      return null;
    }
    
    const data = await response.json();
    return {
      token: data.Token,
      userHash: data.DisplayClaims?.xui?.[0]?.uhs || "",
    };
  } catch {
    return null;
  }
}

/**
 * Authentification Minecraft avec XSTS
 */
export async function authenticateMinecraft(xstsToken: string, userHash: string): Promise<string | null> {
  try {
    const response = await fetch(MINECRAFT_AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        identityToken: `XBL3.0 x=${userHash};${xstsToken}`,
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("[MINECRAFT] Auth failed:", response.status, errorText);
      return null;
    }
    
    const data = await response.json();
    return data.access_token || null;
  } catch (err) {
    console.error("[MINECRAFT] Auth error:", err);
    return null;
  }
}

/**
 * Récupère le profil Minecraft (vérifie la possession du jeu)
 */
export async function getMinecraftProfile(minecraftToken: string): Promise<MinecraftProfile | null> {
  try {
    const response = await fetch(MINECRAFT_PROFILE_URL, {
      headers: { Authorization: `Bearer ${minecraftToken}` },
    });
    
    // 404 = Pas de profil = Le joueur ne possède pas Minecraft
    if (response.status === 404) {
      return null;
    }
    
    if (!response.ok) return null;
    
    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      skins: data.skins,
    };
  } catch {
    return null;
  }
}

// ============================================
// User JWT Management
// ============================================

/**
 * Crée un token JWT pour l'utilisateur
 */
export async function createUserToken(user: { userId: string; minecraftUuid: string; minecraftUsername: string }): Promise<string> {
  return new SignJWT({
    userId: user.userId,
    minecraftUuid: user.minecraftUuid,
    minecraftUsername: user.minecraftUsername,
    iat: Date.now(),
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d") // 7 jours pour les utilisateurs
    .sign(JWT_SECRET);
}

/**
 * Vérifie un token JWT utilisateur
 */
export async function verifyUserToken(token: string): Promise<UserTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as UserTokenPayload;
  } catch {
    return null;
  }
}

// ============================================
// Full Authentication Flow
// ============================================

export interface AuthResult {
  success: boolean;
  profile?: MinecraftProfile;
  xboxGamertag?: string;
  error?: string;
  errorCode?: "NO_MINECRAFT" | "XBOX_ERROR" | "AUTH_ERROR";
}

/**
 * Flow complet d'authentification Microsoft → Xbox → Minecraft
 */
export async function fullAuthenticationFlow(
  code: string, 
  codeVerifier: string
): Promise<AuthResult> {
  // 1. Échanger le code Microsoft
  console.log("[AUTH] Step 1: Exchanging Microsoft code...");
  const microsoftToken = await exchangeMicrosoftCode(code, codeVerifier);
  if (!microsoftToken) {
    console.error("[AUTH] Step 1 FAILED: No Microsoft token");
    return { success: false, error: "Échec de l'authentification Microsoft", errorCode: "AUTH_ERROR" };
  }
  console.log("[AUTH] Step 1 OK: Got Microsoft token");
  
  // 2. Authentification Xbox Live
  console.log("[AUTH] Step 2: Xbox Live authentication...");
  const xboxResult = await authenticateXbox(microsoftToken);
  if (!xboxResult) {
    console.error("[AUTH] Step 2 FAILED: Xbox Live auth failed");
    return { success: false, error: "Échec de l'authentification Xbox Live", errorCode: "XBOX_ERROR" };
  }
  console.log("[AUTH] Step 2 OK: Got Xbox token, userHash:", xboxResult.userHash);
  
  // 3. Obtenir le token XSTS
  console.log("[AUTH] Step 3: Getting XSTS token...");
  const xstsResult = await getXSTSToken(xboxResult.token);
  if (!xstsResult) {
    console.error("[AUTH] Step 3 FAILED: XSTS auth failed");
    return { success: false, error: "Échec de l'authentification XSTS", errorCode: "XBOX_ERROR" };
  }
  console.log("[AUTH] Step 3 OK: Got XSTS token");
  
  // 4. Authentification Minecraft
  console.log("[AUTH] Step 4: Minecraft authentication...");
  const minecraftToken = await authenticateMinecraft(xstsResult.token, xstsResult.userHash);
  if (!minecraftToken) {
    console.error("[AUTH] Step 4 FAILED: Minecraft auth failed");
    return { success: false, error: "Échec de l'authentification Minecraft", errorCode: "AUTH_ERROR" };
  }
  console.log("[AUTH] Step 4 OK: Got Minecraft token");
  
  // 5. Récupérer le profil Minecraft (vérifier la possession)
  console.log("[AUTH] Step 5: Getting Minecraft profile...");
  const profile = await getMinecraftProfile(minecraftToken);
  if (!profile) {
    console.error("[AUTH] Step 5 FAILED: No Minecraft profile (user doesn't own the game?)");
    return { 
      success: false, 
      error: "Vous devez posséder Minecraft pour créer un compte Nemesis", 
      errorCode: "NO_MINECRAFT" 
    };
  }
  console.log("[AUTH] Step 5 OK: Got profile:", profile.name);
  
  return {
    success: true,
    profile,
    xboxGamertag: xboxResult.userHash, // En pratique, récupérer le gamertag séparément
  };
}
