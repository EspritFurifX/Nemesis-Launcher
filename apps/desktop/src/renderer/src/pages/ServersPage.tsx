import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ServerCard } from "../components/ServerCard";

interface Server {
  name: string;
  description: string;
  ip: string;
  port: number;
  players?: number;
  maxPlayers?: number;
  version: string;
  modpack?: string;
  gameMode: "survival" | "creative" | "pvp" | "skyblock";
}

export function ServersPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const [launching, setLaunching] = useState(false);

  useEffect(() => {
    loadServers();
  }, []);

  const loadServers = async () => {
    try {
      setLoading(true);
      // TODO: Fetch from API
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
        },
      ];
      setServers(mockServers);
    } catch (error) {
      console.error("Error loading servers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlay = async (server: Server) => {
    if (!user?.minecraftUuid) return;
    
    try {
      setLaunching(true);
      setSelectedServer(server);
      
      // TODO: Implement game launch
      console.log("Launching game on server:", server);
      
      // const result = await window.electron.ipcRenderer.invoke('game:launch', {
      //   accessToken: localStorage.getItem('minecraftToken'),
      //   uuid: user.minecraftUuid,
      //   name: user.minecraftUsername,
      //   version: '1.20.4',
      //   server: {
      //     ip: server.ip,
      //     port: server.port,
      //   },
      // });
    } catch (error) {
      console.error("Error launching game:", error);
    } finally {
      setLaunching(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-8 py-6 border-b border-slate-700/50">
        <h1 className="text-3xl font-bold">Serveurs</h1>
        <p className="text-slate-400 mt-1">Rejoignez un serveur et commencez l'aventure</p>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
            {servers.map((server) => (
              <ServerCard
                key={server.name}
                server={server}
                onPlay={handlePlay}
                isLoading={launching && selectedServer?.name === server.name}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
