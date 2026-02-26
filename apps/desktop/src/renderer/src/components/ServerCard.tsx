import type { Server } from "../hooks/useServers";
import { Icon, Icons } from "./Icon";

interface ServerCardProps {
  server: Server;
  onPlay?: (server: Server) => void;
  isLoading?: boolean;
}

const gameModIcons: Record<"survival" | "creative" | "pvp" | "skyblock", typeof Icons[keyof typeof Icons]> = {
  survival: Icons.build,
  creative: Icons.palette,
  pvp: Icons.sword,
  skyblock: Icons.cloud,
};

export function ServerCard({ server, onPlay, isLoading }: ServerCardProps) {
  const gameIcon = gameModIcons[server.gameMode];
  
  return (
    <div className="bg-dark-850 rounded-lg overflow-hidden hover:bg-dark-800 transition-colors group border-2 border-dark-700 hover:border-nemesis-400/30 shadow-minecraft">
      {/* Server Header */}
      <div className="h-24 bg-gradient-to-br from-nemesis-400/20 to-blue-600/20 flex items-center justify-center text-4xl border-b-2 border-dark-700">
        <Icon name={gameIcon} size="xl" className="text-nemesis-400" />
      </div>

      {/* Server Info */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-white truncate">{server.name}</h3>
          <p className="text-sm text-dark-400 line-clamp-2">{server.description}</p>
        </div>

        {/* Details Grid */}
        <div className="space-y-1.5 mb-4 text-xs">
          <div className="flex justify-between">
            <span className="text-dark-400">Version:</span>
            <span className="text-dark-200 font-mono">{server.version}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-dark-400">Mode:</span>
            <span className="text-nemesis-400 capitalize font-semibold">{server.gameMode}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-dark-400">Joueurs:</span>
            <span className="text-dark-200">
              {server.players ?? 0}/{server.maxPlayers ?? "--"}
            </span>
          </div>
          {server.modpack && (
            <div className="flex justify-between">
              <span className="text-dark-400">Modpack:</span>
              <span className="text-blue-300">{server.modpack}</span>
            </div>
          )}
        </div>

        {/* Server Status Bar */}
        <div className="mb-4 h-1 bg-dark-700 rounded-full overflow-hidden border border-dark-600">
          <div
            className="h-full bg-gradient-to-r from-nemesis-400 to-blue-500 transition-all"
            style={{
              width: `${((server.players ?? 0) / (server.maxPlayers ?? 1)) * 100}%`,
            }}
          />
        </div>

        {/* Play Button */}
        <button
          onClick={() => onPlay?.(server)}
          disabled={isLoading}
          className="w-full py-2 bg-[#107C10] hover:bg-[#0e6b0e] disabled:bg-dark-700 disabled:cursor-not-allowed border-2 border-[#0e6b0e] rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 text-white hover:scale-[1.02] active:scale-[0.98] disabled:scale-100"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-white" />
              Lancement...
            </>
          ) : (
            "REJOINDRE"
          )}
        </button>
      </div>
    </div>
  );
}
