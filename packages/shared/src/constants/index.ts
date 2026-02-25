// ===================================
// MICROSOFT AUTH ENDPOINTS
// ===================================

export const MICROSOFT_AUTH = {
  AUTHORITY: "https://login.microsoftonline.com/consumers",
  AUTH_ENDPOINT: "https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize",
  TOKEN_ENDPOINT: "https://login.microsoftonline.com/consumers/oauth2/v2.0/token",
  SCOPES: ["XboxLive.signin", "offline_access"],
} as const;

// ===================================
// XBOX LIVE ENDPOINTS
// ===================================

export const XBOX_LIVE = {
  USER_AUTH: "https://user.auth.xboxlive.com/user/authenticate",
  XSTS_AUTH: "https://xsts.auth.xboxlive.com/xsts/authorize",
  RELYING_PARTY: "rp://api.minecraftservices.com/",
} as const;

// ===================================
// MINECRAFT SERVICES ENDPOINTS
// ===================================

export const MINECRAFT_SERVICES = {
  BASE_URL: "https://api.minecraftservices.com",
  LOGIN: "/authentication/login_with_xbox",
  PROFILE: "/minecraft/profile",
  ENTITLEMENTS: "/entitlements/mcstore",
  OWNERSHIP: "/minecraft/profile/namechange",
} as const;

// ===================================
// API ROUTES
// ===================================

export const API_ROUTES = {
  // Auth
  AUTH_LOGIN: "/api/v1/auth/login",
  AUTH_CALLBACK: "/api/v1/auth/callback",
  AUTH_REFRESH: "/api/v1/auth/refresh",
  AUTH_LOGOUT: "/api/v1/auth/logout",
  AUTH_SESSION: "/api/v1/auth/session",
  
  // User
  USER_PROFILE: "/api/v1/user/profile",
  USER_ENTITLEMENTS: "/api/v1/user/entitlements",
  
  // Releases / CDN
  CDN_LATEST: "/api/v1/cdn/latest",
  CDN_RELEASES: "/api/v1/cdn/releases",
  CDN_DOWNLOAD: "/api/v1/cdn/download",
  CDN_CHECK_UPDATE: "/api/v1/cdn/check-update",
  
  // Health
  HEALTH: "/api/v1/health",
} as const;

// ===================================
// ERROR CODES
// ===================================

export const ERROR_CODES = {
  // Auth errors
  AUTH_FAILED: "AUTH_FAILED",
  AUTH_EXPIRED: "AUTH_EXPIRED",
  AUTH_INVALID_TOKEN: "AUTH_INVALID_TOKEN",
  AUTH_NO_MINECRAFT: "AUTH_NO_MINECRAFT",
  AUTH_NO_ENTITLEMENT: "AUTH_NO_ENTITLEMENT",
  NO_MINECRAFT: "NO_MINECRAFT", // Alias for clarity
  INVALID_TOKEN: "INVALID_TOKEN",
  INVALID_STATE: "INVALID_STATE",
  INVALID_REQUEST: "INVALID_REQUEST",

  // User errors
  USER_NOT_FOUND: "USER_NOT_FOUND",
  USER_BANNED: "USER_BANNED",

  // CDN errors
  CDN_VERSION_NOT_FOUND: "CDN_VERSION_NOT_FOUND",
  CDN_CHECKSUM_MISMATCH: "CDN_CHECKSUM_MISMATCH",
  CDN_DOWNLOAD_FAILED: "CDN_DOWNLOAD_FAILED",

  // General errors
  INTERNAL_ERROR: "INTERNAL_ERROR",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  RATE_LIMIT: "RATE_LIMIT",
} as const;

// ===================================
// APP CONFIG
// ===================================

export const APP_CONFIG = {
  NAME: "Nemesis Launcher",
  VERSION: "1.0.0",
  DESCRIPTION: "High-performance Minecraft Launcher",
  
  // Ports
  API_PORT: 4000,
  WEB_PORT: 3000,
  DESKTOP_OAUTH_PORT: 45678,
  
  // Paths
  CDN_PATH: "./storage/cdn",
  RELEASES_PATH: "./storage/cdn/releases",
  
  // Update
  UPDATE_CHECK_INTERVAL: 60 * 60 * 1000, // 1 hour
  
  // Security
  TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days
  REFRESH_TOKEN_EXPIRY: 30 * 24 * 60 * 60 * 1000, // 30 days
} as const;
