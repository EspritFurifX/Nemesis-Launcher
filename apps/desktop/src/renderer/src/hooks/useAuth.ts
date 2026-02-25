import { useState, useEffect, useCallback } from "react";
import type { User, MinecraftProfile } from "@nemesis/shared";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  minecraftProfile: MinecraftProfile | null;
  error: string | null;
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
      const result = await window.electron.auth.getSession();
      
      if (result.success) {
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
      const result = await window.electron.auth.login();
      
      if (result.success) {
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
