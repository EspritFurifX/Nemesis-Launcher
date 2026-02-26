import type { IpcMain } from "electron";
import type Store from "electron-store";
import { shell } from "electron";
import http from "http";
import { URL } from "url";
import * as keytar from "keytar";
import { IPC_CHANNELS, API_ROUTES } from "@nemesis/shared";

// ===================================
// CONFIGURATION
// ===================================

const API_URL = process.env.API_URL || "http://localhost:4000";
const OAUTH_PORT = parseInt(process.env.DESKTOP_OAUTH_PORT || "45678");
const KEYTAR_SERVICE = "nemesis-launcher";
const KEYTAR_ACCOUNT_REFRESH = "microsoft-refresh-token";
const KEYTAR_ACCOUNT_MC = "minecraft-access-token";

let oauthServer: http.Server | null = null;
let pendingAuthState: string | null = null; // Store PKCE state for validation

// ===================================
// SECURE TOKEN STORAGE (keytar)
// ===================================

async function storeSecureToken(account: string, token: string): Promise<void> {
  await keytar.setPassword(KEYTAR_SERVICE, account, token);
}

async function getSecureToken(account: string): Promise<string | null> {
  return keytar.getPassword(KEYTAR_SERVICE, account);
}

async function deleteSecureToken(account: string): Promise<void> {
  await keytar.deletePassword(KEYTAR_SERVICE, account).catch(() => {});
}

async function clearAllSecureTokens(): Promise<void> {
  await Promise.all([
    deleteSecureToken(KEYTAR_ACCOUNT_REFRESH),
    deleteSecureToken(KEYTAR_ACCOUNT_MC),
  ]);
}

// ===================================
// IPC HANDLERS
// ===================================

export function setupAuthHandlers(ipcMain: IpcMain, store: Store): void {
  // ===================================
  // LOGIN - Open Microsoft OAuth flow (PKCE)
  // ===================================
  ipcMain.handle(IPC_CHANNELS.AUTH_LOGIN, async () => {
    try {
      // 1. Get auth URL with PKCE state from API
      const response = await fetch(`${API_URL}${API_ROUTES.AUTH_LOGIN}?redirect=desktop`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error?.message || "Failed to get auth URL");
      }

      // Store state for PKCE validation
      pendingAuthState = data.data.state;

      // 2. Start local OAuth server to receive callback
      const authResult = await startOAuthServer();

      // 3. Open browser for Microsoft login
      shell.openExternal(data.data.authUrl);

      // 4. Wait for callback with code and state
      const { code, state } = await authResult;

      // 5. Validate state matches (PKCE security)
      if (state !== pendingAuthState) {
        throw new Error("State mismatch - possible CSRF attack");
      }

      // 6. Exchange code for tokens via API (API handles PKCE validation)
      const tokenResponse = await fetch(`${API_URL}${API_ROUTES.AUTH_CALLBACK}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, state }),
      });

      const tokenData = await tokenResponse.json();

      if (!tokenData.success) {
        throw new Error(tokenData.error?.message || "Authentication failed");
      }

      // 7. Store tokens securely
      // Sensitive tokens go to system keychain (keytar)
      await storeSecureToken(KEYTAR_ACCOUNT_REFRESH, tokenData.data.refreshToken);

      // Non-sensitive data goes to electron-store
      store.set("accessToken", tokenData.data.accessToken);
      store.set("user", tokenData.data.user);
      store.set("profile", tokenData.data.profile);
      store.set("entitlement", tokenData.data.entitlement);
      store.set("expiresAt", tokenData.data.expiresAt);

      console.log("[Auth] Login successful for:", tokenData.data.profile?.name);

      return {
        success: true,
        data: {
          user: tokenData.data.user,
          profile: tokenData.data.profile,
          entitlement: tokenData.data.entitlement,
        },
      };

    } catch (error) {
      console.error("[Auth] Login error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Authentication failed",
      };
    } finally {
      stopOAuthServer();
      pendingAuthState = null;
    }
  });

  // ===================================
  // LOGOUT - Clear all tokens
  // ===================================
  ipcMain.handle(IPC_CHANNELS.AUTH_LOGOUT, async () => {
    try {
      const accessToken = store.get("accessToken") as string;

      // Notify API of logout (best effort)
      if (accessToken) {
        await fetch(`${API_URL}${API_ROUTES.AUTH_LOGOUT}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}` },
        }).catch(() => {});
      }

      // Clear secure storage (keytar)
      await clearAllSecureTokens();

      // Clear electron-store
      store.delete("accessToken");
      store.delete("user");
      store.delete("profile");
      store.delete("entitlement");
      store.delete("expiresAt");

      console.log("[Auth] Logged out successfully");
      return { success: true };

    } catch (error) {
      console.error("[Auth] Logout error:", error);
      // Always succeed locally
      return { success: true };
    }
  });

  // ===================================
  // GET SESSION - Check current auth state
  // ===================================
  ipcMain.handle(IPC_CHANNELS.AUTH_GET_SESSION, async () => {
    try {
      const accessToken = store.get("accessToken") as string;
      const user = store.get("user");
      const profile = store.get("profile");

      if (!accessToken || !user) {
        return { success: false, error: "Not logged in" };
      }

      // Verify token with API
      const response = await fetch(`${API_URL}${API_ROUTES.AUTH_SESSION}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        // Try to refresh token
        const refreshed = await refreshTokens(store);
        if (!refreshed) {
          // Clear invalid session
          await clearAllSecureTokens();
          store.delete("accessToken");
          store.delete("user");
          store.delete("profile");
          return { success: false, error: "Session expired" };
        }
      }

      return {
        success: true,
        data: { user, profile },
      };

    } catch (error) {
      console.error("[Auth] Get session error:", error);
      return { success: false, error: "Failed to verify session" };
    }
  });

  // ===================================
  // REFRESH TOKEN - Refresh expired session
  // ===================================
  ipcMain.handle(IPC_CHANNELS.AUTH_REFRESH, async () => {
    const refreshed = await refreshTokens(store);
    return { success: refreshed };
  });

  // ===================================
  // GET MINECRAFT TOKEN - For game launch
  // ===================================
  ipcMain.handle(IPC_CHANNELS.AUTH_GET_MC_TOKEN, async () => {
    try {
      // Session must be valid first
      const accessToken = store.get("accessToken") as string;
      if (!accessToken) {
        return { success: false, error: "Not logged in" };
      }

      // Get cached MC token from keytar
      const mcToken = await getSecureToken(KEYTAR_ACCOUNT_MC);
      if (mcToken) {
        // TODO: Check if expired, refresh if needed
        return { success: true, data: { accessToken: mcToken } };
      }

      // Need to re-authenticate to get MC token
      return { success: false, error: "Minecraft token not available" };

    } catch (error) {
      return { success: false, error: "Failed to get Minecraft token" };
    }
  });
}

// ===================================
// OAUTH SERVER (Loopback for desktop)
// ===================================

interface OAuthResult {
  code: string;
  state: string;
}

function startOAuthServer(): Promise<OAuthResult> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      stopOAuthServer();
      reject(new Error("Authentication timed out after 5 minutes"));
    }, 5 * 60 * 1000);

    oauthServer = http.createServer((req, res) => {
      const url = new URL(req.url || "/", `http://localhost:${OAUTH_PORT}`);

      if (url.pathname === "/auth/callback") {
        const code = url.searchParams.get("code");
        const state = url.searchParams.get("state");
        const error = url.searchParams.get("error");
        const errorDescription = url.searchParams.get("error_description");

        // Handle OAuth error
        if (error) {
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.end(getErrorHtml(errorDescription || error));
          clearTimeout(timeoutId);
          reject(new Error(errorDescription || error));
          return;
        }

        // Handle success
        if (code && state) {
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.end(getSuccessHtml());
          clearTimeout(timeoutId);
          resolve({ code, state });
          return;
        }

        // Invalid callback
        res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
        res.end(getErrorHtml("Invalid callback - missing code or state"));
      } else {
        res.writeHead(404);
        res.end("Not found");
      }
    });

    oauthServer.on("error", (err) => {
      clearTimeout(timeoutId);
      reject(new Error(`OAuth server error: ${err.message}`));
    });

    oauthServer.listen(OAUTH_PORT, "127.0.0.1", () => {
      console.log(`[OAuth] Server listening on http://127.0.0.1:${OAUTH_PORT}`);
    });
  });
}

function stopOAuthServer(): void {
  if (oauthServer) {
    oauthServer.close();
    oauthServer = null;
    console.log("[OAuth] Server stopped");
  }
}

// ===================================
// TOKEN REFRESH
// ===================================

async function refreshTokens(store: Store): Promise<boolean> {
  try {
    const refreshToken = await getSecureToken(KEYTAR_ACCOUNT_REFRESH);
    if (!refreshToken) {
      console.log("[Auth] No refresh token available");
      return false;
    }

    const response = await fetch(`${API_URL}${API_ROUTES.AUTH_REFRESH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();

    if (data.success) {
      store.set("accessToken", data.data.accessToken);
      store.set("expiresAt", data.data.expiresAt);
      console.log("[Auth] Token refreshed successfully");
      return true;
    }

    console.log("[Auth] Token refresh failed:", data.error?.message);
    return false;

  } catch (error) {
    console.error("[Auth] Token refresh error:", error);
    return false;
  }
}

// ===================================
// HTML TEMPLATES FOR OAUTH CALLBACK
// ===================================

function getSuccessHtml(): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Némésis Launcher - Authentification</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
    .card {
      background: rgba(255,255,255,0.05);
      border-radius: 16px;
      padding: 48px;
      text-align: center;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.1);
    }
    .icon { font-size: 64px; margin-bottom: 24px; }
    h1 { font-size: 24px; margin-bottom: 12px; }
    p { color: rgba(255,255,255,0.7); }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">✅</div>
    <h1>Authentification réussie</h1>
    <p>Vous pouvez fermer cette fenêtre et retourner sur Némésis Launcher.</p>
  </div>
  <script>setTimeout(() => window.close(), 3000);</script>
</body>
</html>
  `.trim();
}

function getErrorHtml(message: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Némésis Launcher - Erreur</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
    .card {
      background: rgba(255,255,255,0.05);
      border-radius: 16px;
      padding: 48px;
      text-align: center;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.1);
      max-width: 400px;
    }
    .icon { font-size: 64px; margin-bottom: 24px; }
    h1 { font-size: 24px; margin-bottom: 12px; color: #ff6b6b; }
    p { color: rgba(255,255,255,0.7); }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">❌</div>
    <h1>Authentication Failed</h1>
    <p>${message}</p>
  </div>
</body>
</html>
  `.trim();
}
