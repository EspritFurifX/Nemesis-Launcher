import { useState, useEffect } from "react";

export interface Server {
  name: string;
  description: string;
  ip: string;
  port: number;
  players?: number;
  maxPlayers?: number;
  version: string;
  modpack?: string;
  icon?: string;
  gameMode: "survival" | "creative" | "pvp" | "skyblock";
  featured?: boolean;
}

export function useServers() {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadServers();
  }, []);

  const loadServers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Mock data - TODO: Replace with API call
      const mockServers: Server[] = [
        {
          name: "Survival",
          description: "Serveur Survie vanille amélioré",
          ip: "survie.nemesislauncher.fr",
          port: 25565,
          players: 12,
          maxPlayers: 100,
          version: "1.20.4",
          gameMode: "survival",
          icon: "🏗️",
          featured: true,
        },
        {
          name: "Creative World",
          description: "Monde créatif sans limite",
          ip: "creative.nemesislauncher.fr",
          port: 25566,
          players: 5,
          maxPlayers: 50,
          version: "1.20.4",
          gameMode: "creative",
          icon: "🎨",
          featured: false,
        },
        {
          name: "SkyBlock",
          description: "Le défi SkyBlock ultime",
          ip: "skyblock.nemesislauncher.fr",
          port: 25567,
          players: 28,
          maxPlayers: 200,
          version: "1.19.2",
          modpack: "SkyBlock+",
          gameMode: "skyblock",
          icon: "☁️",
          featured: true,
        },
        {
          name: "PvP Arena",
          description: "Combat classé et tournois",
          ip: "pvp.nemesislauncher.fr",
          port: 25568,
          players: 42,
          maxPlayers: 128,
          version: "1.20.4",
          gameMode: "pvp",
          icon: "⚔️",
          featured: true,
        },
      ];

      setServers(mockServers);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load servers");
    } finally {
      setLoading(false);
    }
  };

  const getFeaturedServers = () => servers.filter(s => s.featured);
  const getServersForGameMode = (mode: string) => servers.filter(s => s.gameMode === mode);

  return {
    servers,
    loading,
    error,
    loadServers,
    getFeaturedServers,
    getServersForGameMode,
  };
}
