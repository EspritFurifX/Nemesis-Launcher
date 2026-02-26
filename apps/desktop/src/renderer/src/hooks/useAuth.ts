import { useState, useEffect, useCallback } from "react";
import type { User, MinecraftProfile } from "@nemesis/shared";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  minecraftProfile: MinecraftProfile | null;
  error: string | null;
}

declare global {
  interface Window {
    electron?: {
      auth: {
        login: () => Promise<{ success: boolean; data?: { user: User; minecraftProfile: MinecraftProfile }; error?: string }>;
        logout: () => Promise<void>;
        getSession: () => Promise<{ success: boolean; data?: { user: User; minecraftProfile: MinecraftProfile }; error?: string }>;
        refresh: () => Promise<void>;
      };
    };
  }
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    minecraftProfile: null,
    error: null,
  });

  // Check session on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = useCallback(async () => {
    try {
      if (!window.electron?.auth) {
        setState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
          minecraftProfile: null,
          error: "Electron API not available",
        });
        return;
      }

      const result = await window.electron.auth.getSession();
      
      if (result.success && result.data) {
        setState({
          isAuthenticated: true,
          isLoading: false,
          user: result.data.user,
          minecraftProfile: result.data.minecraftProfile,
          error: null,
        });
      } else {
        setState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
          minecraftProfile: null,
          error: null,
        });
      }
    } catch (error) {
      setState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        minecraftProfile: null,
        error: null,
      });
    }
  }, []);

  const login = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      if (!window.electron?.auth) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: "Electron API not available",
        }));
        return false;
      }

      const result = await window.electron.auth.login();
      
      if (result.success && result.data) {
        setState({
          isAuthenticated: true,
          isLoading: false,
          user: result.data.user,
          minecraftProfile: result.data.minecraftProfile,
          error: null,
        });
        return true;
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: result.error || "Login failed",
        }));
        return false;
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Login failed",
      }));
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    if (!window.electron?.auth) return;
    
    await window.electron.auth.logout();
    setState({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      minecraftProfile: null,
      error: null,
    });
  }, []);

  return {
    ...state,
    login,
    logout,
    checkSession,
  };
}
