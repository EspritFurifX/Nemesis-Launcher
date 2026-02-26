import crypto from "node:crypto";
import {
  MICROSOFT_AUTH,
  XBOX_LIVE,
  MINECRAFT_SERVICES,
  ERROR_CODES,
} from "@nemesis/shared";
import type { MinecraftProfile, MinecraftEntitlement } from "@nemesis/shared";

// ===================================
// CONFIGURATION
// ===================================

const CLIENT_ID = process.env['MICROSOFT_CLIENT_ID']!;
const REDIRECT_URI_DESKTOP = "http://127.0.0.1:45678/auth/callback";
const REDIRECT_URI_WEB = `${process.env['NEXT_PUBLIC_APP_URL'] || "http://localhost:3000"}/auth/callback`;

// PKCE Store (in production, use Redis with TTL)
const pkceStore = new Map<string, { verifier: string; expiresAt: number }>();

// Cleanup expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of pkceStore.entries()) {
    if (value.expiresAt < now) {
      pkceStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

// ===================================
// CUSTOM AUTH ERROR
// ===================================

export class AuthError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = "AuthError";
  }
}

// ===================================
// PKCE HELPERS
// ===================================

function generateCodeVerifier(): string {
  return crypto.randomBytes(32).toString("base64url");
}

function generateCodeChallenge(verifier: string): string {
  return crypto.createHash("sha256").update(verifier).digest("base64url");
}

function generateState(): string {
  return crypto.randomBytes(16).toString("hex");
}

// ===================================
// GET MICROSOFT AUTH URL (with PKCE)
// ===================================

export interface AuthUrlResult {
  authUrl: string;
  state: string;
}

export function getMicrosoftAuthUrl(type: "desktop" | "web" = "desktop"): AuthUrlResult {
  const redirectUri = type === "desktop" ? REDIRECT_URI_DESKTOP : REDIRECT_URI_WEB;
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);

  // Store PKCE verifier with 10 minute expiry
  pkceStore.set(state, {
    verifier: codeVerifier,
    expiresAt: Date.now() + 10 * 60 * 1000,
  });

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: MICROSOFT_AUTH.SCOPES.join(" "),
    response_mode: "query",
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  return {
    authUrl: `${MICROSOFT_AUTH.AUTH_ENDPOINT}?${params.toString()}`,
    state,
  };
}

// ===================================
// VALIDATE STATE AND GET VERIFIER
// ===================================

export function validateStateAndGetVerifier(state: string): string {
  const entry = pkceStore.get(state);
  
  if (!entry) {
    throw new AuthError(ERROR_CODES.AUTH_FAILED, "Invalid or expired state parameter");
  }
  
  if (entry.expiresAt < Date.now()) {
    pkceStore.delete(state);
    throw new AuthError(ERROR_CODES.AUTH_EXPIRED, "OAuth state expired. Please try again.");
  }
  
  // Delete after use (one-time use)
  pkceStore.delete(state);
  
  return entry.verifier;
}

// ===================================
// EXCHANGE CODE FOR TOKENS (with PKCE)
// ===================================

export interface MicrosoftTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export async function exchangeCodeForTokens(
  code: string,
  codeVerifier: string,
  type: "desktop" | "web" = "desktop"
): Promise<MicrosoftTokens> {
  const redirectUri = type === "desktop" ? REDIRECT_URI_DESKTOP : REDIRECT_URI_WEB;

  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    code,
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
  });

  const response = await fetch(MICROSOFT_AUTH.TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    const error: any = await response.json().catch(() => ({}));
    console.error("Microsoft token error:", error);
    throw new AuthError(
      ERROR_CODES.AUTH_FAILED,
      error['error_description'] || "Failed to exchange authorization code"
    );
  }

  const data: any = await response.json();

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
  };
}

// ===================================
// XBOX LIVE AUTH
// ===================================

interface XboxAuthResult {
  token: string;
  userHash: string;
}

export async function authenticateWithXboxLive(msAccessToken: string): Promise<XboxAuthResult> {
  // Step 1: Get Xbox Live User Token
  const xblResponse = await fetch(XBOX_LIVE.USER_AUTH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      Properties: {
        AuthMethod: "RPS",
        SiteName: "user.auth.xboxlive.com",
        RpsTicket: `d=${msAccessToken}`,
      },
      RelyingParty: "http://auth.xboxlive.com",
      TokenType: "JWT",
    }),
  });

  if (!xblResponse.ok) {
    const error: any = await xblResponse.json().catch(() => ({}));
    console.error("Xbox Live auth error:", error);
    throw new AuthError(ERROR_CODES.AUTH_FAILED, "Failed to authenticate with Xbox Live");
  }

  const xblData: any = await xblResponse.json();
  const xblToken = xblData.Token;
  const userHash = xblData.DisplayClaims?.xui?.[0]?.uhs;

  if (!xblToken || !userHash) {
    throw new AuthError(ERROR_CODES.AUTH_FAILED, "Invalid Xbox Live response");
  }

  // Step 2: Get XSTS Token
  const xstsResponse = await fetch(XBOX_LIVE.XSTS_AUTH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      Properties: {
        SandboxId: "RETAIL",
        UserTokens: [xblToken],
      },
      RelyingParty: XBOX_LIVE.RELYING_PARTY,
      TokenType: "JWT",
    }),
  });

  if (!xstsResponse.ok) {
    const error: any = await xstsResponse.json().catch(() => ({}));
    console.error("XSTS auth error:", error);

    // Handle specific Xbox errors
    if (error['XErr']) {
      switch (error['XErr']) {
        case 2148916233:
          throw new AuthError(
            ERROR_CODES.AUTH_FAILED,
            "This Microsoft account doesn't have an Xbox account. Please create one at xbox.com"
          );
        case 2148916235:
          throw new AuthError(
            ERROR_CODES.AUTH_FAILED,
            "Xbox Live is not available in your country/region"
          );
        case 2148916236:
        case 2148916237:
          throw new AuthError(
            ERROR_CODES.AUTH_FAILED,
            "Adult verification required. Please complete verification on Xbox.com"
          );
        case 2148916238:
          throw new AuthError(
            ERROR_CODES.AUTH_FAILED,
            "This account belongs to someone under 18. An adult must add this account to a Microsoft Family."
          );
      }
    }
    throw new AuthError(ERROR_CODES.AUTH_FAILED, `Xbox authentication failed: ${error['XErr'] || "unknown"}`);
  }

  const xstsData: any = await xstsResponse.json();

  return {
    token: xstsData.Token,
    userHash,
  };
}

// ===================================
// MINECRAFT AUTH
// ===================================

export interface MinecraftAuthResult {
  accessToken: string;
  expiresIn: number;
}

export async function authenticateWithMinecraft(
  xstsToken: string,
  userHash: string
): Promise<MinecraftAuthResult> {
  // Minecraft expects the identity token in format: XBL3.0 x=<userHash>;<xsts_token>
  const identityToken = `XBL3.0 x=${userHash};${xstsToken}`;

  const response = await fetch(`${MINECRAFT_SERVICES.BASE_URL}${MINECRAFT_SERVICES.LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      identityToken,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    console.error("[Minecraft Auth] Failed:", response.status, errorText);
    throw new AuthError(
      ERROR_CODES.AUTH_FAILED,
      `Failed to authenticate with Minecraft services: ${response.status}`
    );
  }

  const data: any = await response.json();

  return {
    accessToken: data.access_token,
    expiresIn: data.expires_in || 86400, // Default 24h
  };
}

// ===================================
// CHECK MINECRAFT OWNERSHIP
// ===================================

// Valid entitlements that grant access to Minecraft Java Edition
const VALID_MINECRAFT_ENTITLEMENTS = [
  "game_minecraft",
  "product_minecraft",
  "game_minecraft_bedrock", // Game Pass includes Java Edition now
];

export async function checkMinecraftOwnership(minecraftToken: string): Promise<MinecraftEntitlement> {
  const response = await fetch(`${MINECRAFT_SERVICES.BASE_URL}${MINECRAFT_SERVICES.ENTITLEMENTS}`, {
    headers: {
      Authorization: `Bearer ${minecraftToken}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    console.error("[Entitlements] Check failed:", response.status);
    throw new AuthError(
      ERROR_CODES.AUTH_FAILED,
      "Failed to verify Minecraft ownership"
    );
  }

  const data: any = await response.json();
  const items: Array<{ name: string; source?: string }> = data.items || [];

  // Log entitlements for debugging
  console.log("[Entitlements] Found:", items.map((i) => i.name).join(", ") || "none");

  // Check ownership types
  const ownedEntitlements = items.filter((item) =>
    VALID_MINECRAFT_ENTITLEMENTS.includes(item.name)
  );

  const ownsMinecraft = ownedEntitlements.length > 0;
  const hasGamePass = items.some((item) => item.source === "GAME_PASS");

  // Determine product type for profile purposes
  let productType: "PRODUCT_MINECRAFT" | "GAME_MINECRAFT" | undefined;
  if (ownsMinecraft) {
    productType = hasGamePass ? "GAME_MINECRAFT" : "PRODUCT_MINECRAFT";
  }

  return {
    ownsMinecraft,
    hasGamePass,
    productType,
  };
}

// ===================================
// GET MINECRAFT PROFILE
// ===================================

export async function getMinecraftProfile(minecraftToken: string): Promise<MinecraftProfile> {
  const response = await fetch(`${MINECRAFT_SERVICES.BASE_URL}${MINECRAFT_SERVICES.PROFILE}`, {
    headers: {
      Authorization: `Bearer ${minecraftToken}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new AuthError(
        ERROR_CODES.NO_MINECRAFT,
        "This account does not own Minecraft Java Edition"
      );
    }
    console.error("[Profile] Failed to get profile:", response.status);
    throw new AuthError(ERROR_CODES.AUTH_FAILED, "Failed to get Minecraft profile");
  }

  const data: any = await response.json();

  return {
    id: data.id,
    name: data.name,
    skins: data.skins?.map((skin: any) => ({
      id: skin.id,
      state: skin.state,
      url: skin.url,
      variant: skin.variant,
    })) || [],
    capes: data.capes?.map((cape: any) => ({
      id: cape.id,
      state: cape.state,
      url: cape.url,
      alias: cape.alias,
    })) || [],
  };
}

// ===================================
// REFRESH MICROSOFT TOKEN (PKCE - no client_secret)
// ===================================

export async function refreshMicrosoftToken(refreshToken: string): Promise<{
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}> {
  const response = await fetch(MICROSOFT_AUTH.TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
      scope: MICROSOFT_AUTH.SCOPES.join(" "),
    }),
  });

  if (!response.ok) {
    const errorData: any = await response.json().catch(() => ({}));
    console.error("[Refresh] Token refresh failed:", errorData);

    // If refresh token is expired or revoked, user needs to re-authenticate
    if (errorData['error'] === "invalid_grant") {
      throw new AuthError(
        ERROR_CODES.INVALID_TOKEN,
        "Session expired. Please sign in again."
      );
    }

    throw new AuthError(ERROR_CODES.AUTH_FAILED, "Failed to refresh session");
  }

  const data: any = await response.json();

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
  };
}

// ===================================
// COMPLETE AUTH FLOW - Orchestrates entire flow
// ===================================

export interface CompleteAuthResult {
  profile: MinecraftProfile;
  entitlement: MinecraftEntitlement;
  tokens: {
    minecraft: {
      accessToken: string;
      expiresAt: Date;
    };
    microsoft: {
      accessToken: string;
      refreshToken: string;
      expiresAt: Date;
    };
  };
}

export async function completeAuthFlow(
  code: string,
  state: string
): Promise<CompleteAuthResult> {
  // Step 1: Validate state and get code verifier (PKCE)
  const codeVerifier = validateStateAndGetVerifier(state);

  // Step 2: Exchange code for Microsoft tokens
  console.log("[Auth Flow] Exchanging authorization code...");
  const msTokens = await exchangeCodeForTokens(code, codeVerifier);

  // Step 3: Authenticate with Xbox Live
  console.log("[Auth Flow] Authenticating with Xbox Live...");
  const { token: xstsToken, userHash } = await authenticateWithXboxLive(msTokens.accessToken);

  // Step 4: Authenticate with Minecraft
  console.log("[Auth Flow] Authenticating with Minecraft...");
  const mcAuth = await authenticateWithMinecraft(xstsToken, userHash);

  // Step 5: Check Minecraft ownership
  console.log("[Auth Flow] Verifying Minecraft ownership...");
  const entitlement = await checkMinecraftOwnership(mcAuth.accessToken);

  if (!entitlement.ownsMinecraft) {
    throw new AuthError(
      ERROR_CODES.NO_MINECRAFT,
      "This Microsoft account does not own Minecraft Java Edition"
    );
  }

  // Step 6: Get Minecraft profile
  console.log("[Auth Flow] Fetching Minecraft profile...");
  const profile = await getMinecraftProfile(mcAuth.accessToken);

  console.log("[Auth Flow] Authentication complete for:", profile.name);

  // Calculate expiry times
  const now = new Date();
  const mcExpiresAt = new Date(now.getTime() + mcAuth.expiresIn * 1000);
  const msExpiresAt = new Date(now.getTime() + msTokens.expiresIn * 1000);

  return {
    profile,
    entitlement,
    tokens: {
      minecraft: {
        accessToken: mcAuth.accessToken,
        expiresAt: mcExpiresAt,
      },
      microsoft: {
        accessToken: msTokens.accessToken,
        refreshToken: msTokens.refreshToken,
        expiresAt: msExpiresAt,
      },
    },
  };
}
