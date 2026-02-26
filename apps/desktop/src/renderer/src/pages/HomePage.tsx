import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useUpdate } from "../hooks/useUpdate";
import { useServers } from "../hooks/useServers";
import { ServerCard } from "../components/ServerCard";
import { Icon, Icons } from "../components/Icon";

export function HomePage() {
  const navigate = useNavigate();
  const { user, minecraftProfile, logout } = useAuth();
  const { updateInfo, progress, status, checkForUpdate, downloadUpdate, installUpdate } = useUpdate();
  const { getFeaturedServers, loading: serversLoading } = useServers();
  const [launchingServer, setLaunchingServer] = useState<string | null>(null);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handlePlayServer = async (server: any) => {
    setLaunchingServer(server.name);
    // TODO: Implement actual game launch
    console.log("Playing on:", server);
    setTimeout(() => setLaunchingServer(null), 2000);
  };

  const featuredServers = getFeaturedServers();

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-900/40 border-r-4 border-dark-700/50 flex flex-col">
        {/* Profile Section */}
        <div className="p-6 border-b-4 border-dark-700/50">
          <div className="flex items-center gap-3">
            {minecraftProfile?.skins?.[0]?.url ? (
              <img
                src={`https://mc-heads.net/avatar/${minecraftProfile.id}/48`}
                alt="Avatar"
                className="w-12 h-12 rounded-lg ring-2 ring-nemesis-400/50 border-2 border-nemesis-500/30"
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-nemesis-400 to-nemesis-500 rounded-lg border-2 border-nemesis-500" />
            )}
            <div className="overflow-hidden flex-1">
              <p className="font-semibold text-white truncate">{minecraftProfile?.name || "Player"}</p>
              <p className="text-xs text-dark-400 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <NavButton
            onClick={() => navigate("/home")}
            active={true}
            icon="🏠"
            label="Accueil"
          />
          <NavButton
            onClick={() => navigate("/servers")}
            icon="🌍"
            label="Serveurs"
          />
          <NavButton
            onClick={() => navigate("/settings")}
            icon="⚙️"
            label="Paramètres"
          />
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t-4 border-dark-700/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-minecraft-redstone/80 hover:bg-minecraft-redstone/10 rounded-lg transition-colors border-2 border-dark-700 hover:border-minecraft-redstone/30"
          >
            <Icon name={Icons.logout} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gradient-to-br from-dark-950 via-dark-900 to-dark-900">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-nemesis-400/10 to-blue-600/10 border-b-4 border-dark-700/50 px-8 py-8">
          <div className="max-w-5xl">
            <h1 className="text-4xl font-bold text-white mb-2">
              Bienvenue, {minecraftProfile?.name}! 👋
            </h1>
            <p className="text-dark-400">
              Choisissez un serveur et commencez votre aventure maintenant
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-5xl mx-auto p-8 space-y-8">
          {/* Updates Section */}
          {updateInfo?.updateAvailable && (
            <div className="bg-blue-600/10 border-4 border-blue-500/30 rounded-lg p-6 shadow-minecraft">
              <div className="flex items-start gap-4">
                <Icon name={Icons.update} size="lg" className="text-blue-400 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-400 mb-2">
                    Mise à jour disponible: v{updateInfo.version}
                  </h3>
                  <p className="text-sm text-dark-400 mb-4">
                    Une nouvelle version du launcher est disponible. Mettez à jour pour profiter des dernières fonctionnalités.
                  </p>
                  {status === "idle" && (
                    <button
                      onClick={checkForUpdate}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-semibold transition-colors border-2 border-blue-500"
                    >
                      Vérifier les mises à jour
                    </button>
                  )}
                  {status === "checking" && (
                    <div className="flex items-center gap-2 text-dark-400">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-400" />
                      Vérification en cours...
                    </div>
                  )}
                  {status === "available" && (
                    <button
                      onClick={downloadUpdate}
                      className="px-4 py-2 bg-nemesis-400 hover:bg-nemesis-500 rounded-lg text-sm font-semibold transition-colors border-2 border-nemesis-500 text-dark-950"
                    >
                      Télécharger
                    </button>
                  )}
                  {status === "downloading" && progress && (
                    <div className="space-y-2">
                      <div className="h-2 bg-dark-700 rounded-full overflow-hidden border border-dark-600">
                        <div
                          className="h-full bg-nemesis-400 transition-all"
                          style={{ width: `${progress.percent}%` }}
                        />
                      </div>
                      <p className="text-xs text-dark-500">
                        {Math.round(progress.percent)}% - {Math.round(progress.bytesPerSecond / 1024)} KB/s
                      </p>
                    </div>
                  )}
                  {status === "downloaded" && (
                    <button
                      onClick={installUpdate}
                      className="px-4 py-2 bg-nemesis-400 hover:bg-nemesis-500 rounded-lg text-sm font-semibold transition-colors border-2 border-nemesis-500 text-dark-950"
                    >
                      Installer & Redémarrer
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Featured Servers */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Serveurs en vedette</h2>
                <p className="text-sm text-dark-400">Les serveurs les plus populaires</p>
              </div>
              <button
                onClick={() => navigate("/servers")}
                className="text-nemesis-400 hover:text-nemesis-500 text-sm font-semibold flex items-center gap-1 transition-colors"
              >
                Voir tous →
              </button>
            </div>

            {serversLoading ? (
              <div className="flex items-center justify-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nemesis-400" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredServers.map((server) => (
                  <ServerCard
                    key={server.name}
                    server={server}
                    onPlay={handlePlayServer}
                    isLoading={launchingServer === server.name}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t-4 border-dark-700/50">
            <div className="bg-dark-850 rounded-lg p-4 text-center border-2 border-dark-700 hover:border-nemesis-400/30 transition-colors">
              <Icon name={Icons.server} size="lg" className="mx-auto mb-2 text-nemesis-400" />
              <p className="text-dark-400 text-sm mt-2">Serveurs actifs</p>
              <p className="text-2xl font-bold text-nemesis-400">{featuredServers.length}</p>
            </div>
            <div className="bg-dark-850 rounded-lg p-4 text-center border-2 border-dark-700 hover:border-blue-400/30 transition-colors">
              <Icon name={Icons.users} size="lg" className="mx-auto mb-2 text-blue-400" />
              <p className="text-dark-400 text-sm mt-2">Joueurs en ligne</p>
              <p className="text-2xl font-bold text-blue-400">
                {featuredServers.reduce((acc, s) => acc + (s.players || 0), 0)}
              </p>
            </div>
            <div className="bg-dark-850 rounded-lg p-4 text-center border-2 border-dark-700 hover:border-purple-400/30 transition-colors\">
              <Icon name={Icons.version} size="lg" className="mx-auto mb-2 text-purple-400" />
              <p className="text-dark-400 text-sm mt-2">Version du launcher</p>
              <p className="text-2xl font-bold text-purple-400">1.0.0</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

interface NavButtonProps {
  onClick: () => void;
  icon: string;
  label: string;
  active?: boolean;
}

function NavButton({ onClick, icon, label, active }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors border-2 ${
        active
          ? "bg-nemesis-400/20 text-nemesis-400 border-nemesis-400/50"
          : "text-dark-400 hover:bg-dark-700/50 hover:text-dark-300 border-transparent hover:border-dark-600"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}
