import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useUpdate } from "../hooks/useUpdate";

export function HomePage() {
  const navigate = useNavigate();
  const { user, minecraftProfile, logout } = useAuth();
  const { updateInfo, progress, status, checkForUpdate, downloadUpdate, installUpdate } = useUpdate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800/50 p-4 flex flex-col">
        <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg mb-6">
          {minecraftProfile?.skins?.[0]?.url ? (
            <img 
              src={`https://mc-heads.net/avatar/${minecraftProfile.id}/48`}
              alt="Avatar"
              className="w-12 h-12 rounded-lg"
            />
          ) : (
            <div className="w-12 h-12 bg-slate-600 rounded-lg" />
          )}
          <div className="overflow-hidden">
            <p className="font-medium truncate">{minecraftProfile?.name || "Player"}</p>
            <p className="text-xs text-slate-400 truncate">{user?.minecraftUuid}</p>
          </div>
        </div>

        <nav className="flex-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-emerald-500/10 text-emerald-400 rounded-lg mb-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </button>
          <button 
            onClick={() => navigate("/settings")}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-700/50 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-8">Welcome, {minecraftProfile?.name}!</h1>

        {/* Update Card */}
        <div className="bg-slate-800/50 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Updates</h2>
          
          {status === "idle" && (
            <button
              onClick={checkForUpdate}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            >
              Check for Updates
            </button>
          )}

          {status === "checking" && (
            <p className="text-slate-400">Checking for updates...</p>
          )}

          {status === "available" && updateInfo?.updateAvailable && (
            <div>
              <p className="text-emerald-400 mb-3">
                Version {updateInfo.version} is available!
              </p>
              <button
                onClick={downloadUpdate}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors"
              >
                Download Update
              </button>
            </div>
          )}

          {status === "downloading" && progress && (
            <div>
              <p className="text-slate-400 mb-2">Downloading update...</p>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all" 
                  style={{ width: `${progress.percent}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                {Math.round(progress.percent)}% - {Math.round(progress.bytesPerSecond / 1024)} KB/s
              </p>
            </div>
          )}

          {status === "downloaded" && (
            <div>
              <p className="text-emerald-400 mb-3">Update downloaded!</p>
              <button
                onClick={installUpdate}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors"
              >
                Install & Restart
              </button>
            </div>
          )}

          {status === "not-available" && (
            <p className="text-slate-400">You're running the latest version.</p>
          )}
        </div>

        {/* Play Card */}
        <div className="bg-gradient-to-r from-emerald-600/20 to-emerald-400/10 rounded-xl p-8 border border-emerald-500/20">
          <h2 className="text-2xl font-bold mb-2">Ready to Play</h2>
          <p className="text-slate-400 mb-6">Launch Minecraft with your Nemesis profile</p>
          <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-emerald-600/20">
            PLAY
          </button>
        </div>
      </main>
    </div>
  );
}
