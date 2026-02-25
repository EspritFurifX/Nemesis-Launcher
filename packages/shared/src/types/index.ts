// ===================================
// USER & AUTH TYPES
// ===================================

export interface MicrosoftTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  xboxToken?: string;
  minecraftToken?: string;
}

export interface MinecraftProfile {
  id: string; // UUID
  name: string; // Username
  skins?: MinecraftSkin[];
  capes?: MinecraftCape[];
}

export interface MinecraftSkin {
  id: string;
  state: "ACTIVE" | "INACTIVE";
  url: string;
  variant: "CLASSIC" | "SLIM";
}

export interface MinecraftCape {
  id: string;
  state: "ACTIVE" | "INACTIVE";
  url: string;
  alias: string;
}

export interface User {
  id: string;
  minecraftUuid: string;
  minecraftUsername: string;
  email?: string;
  createdAt: Date;
  lastLogin: Date;
}

export interface AuthSession {
  user: User;
  tokens: MicrosoftTokens;
  minecraftProfile: MinecraftProfile;
  isValid: boolean;
}

// ===================================
// ENTITLEMENTS
// ===================================

export interface MinecraftEntitlement {
  ownsMinecraft: boolean;
  hasGamePass: boolean;
  productType?: "PRODUCT_MINECRAFT" | "GAME_MINECRAFT";
}

// ===================================
// API RESPONSES
// ===================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  timestamp: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export type AuthCallbackResponse = ApiResponse<{
  user: User;
  accessToken: string;
  refreshToken: string;
}>;

export type ProfileResponse = ApiResponse<{
  user: User;
  minecraftProfile: MinecraftProfile;
}>;

export type EntitlementResponse = ApiResponse<{
  entitlement: MinecraftEntitlement;
}>;

// ===================================
// RELEASE / UPDATE TYPES
// ===================================

export interface ReleaseInfo {
  version: string;
  releaseDate: string;
  releaseNotes?: string;
  files: ReleaseFile[];
  minimumSystemVersion?: string;
}

export interface ReleaseFile {
  url: string;
  sha512: string;
  size: number;
  platform: "darwin" | "win32" | "linux";
  arch: "x64" | "arm64";
  filename: string;
}

export interface UpdateCheckResponse {
  updateAvailable: boolean;
  currentVersion: string;
  latestVersion?: string;
  releaseInfo?: ReleaseInfo;
  downloadUrl?: string;
}

export interface LatestYml {
  version: string;
  files: LatestYmlFile[];
  path: string;
  sha512: string;
  releaseDate: string;
}

export interface LatestYmlFile {
  url: string;
  sha512: string;
  size: number;
}

// ===================================
// IPC CHANNELS (Electron)
// ===================================

export const IPC_CHANNELS = {
  // Auth
  AUTH_LOGIN: "auth:login",
  AUTH_LOGOUT: "auth:logout",
  AUTH_GET_SESSION: "auth:get-session",
  AUTH_REFRESH: "auth:refresh",
  AUTH_CALLBACK: "auth:callback",
  AUTH_GET_MC_TOKEN: "auth:get-mc-token",

  // Update
  UPDATE_CHECK: "update:check",
  UPDATE_DOWNLOAD: "update:download",
  UPDATE_INSTALL: "update:install",
  UPDATE_PROGRESS: "update:progress",

  // Game
  GAME_LAUNCH: "game:launch",
  GAME_PROGRESS: "game:progress",
  GAME_STATUS: "game:status",

  // Store
  STORE_GET: "store:get",
  STORE_SET: "store:set",
  STORE_DELETE: "store:delete",

  // System
  SYSTEM_INFO: "system:info",
  WINDOW_MINIMIZE: "window:minimize",
  WINDOW_MAXIMIZE: "window:maximize",
  WINDOW_CLOSE: "window:close",
} as const;

export type IpcChannel = typeof IPC_CHANNELS[keyof typeof IPC_CHANNELS];
