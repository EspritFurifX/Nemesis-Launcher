import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface SystemInfo {
  platform: string;
  arch: string;
  version: string;
  electron: string;
  node: string;
  chrome: string;
}

export function SettingsPage() {
  const navigate = useNavigate();
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);

  useEffect(() => {
    window.electron.system.getInfo().then(setSystemInfo);
  }, []);

  return (
    <div className="h-full flex">
      {/* Back button */}
      <aside className="w-64 bg-slate-800/50 p-4">
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <nav>
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-slate-700/50 rounded-lg mb-2 text-left">
            General
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-700/50 rounded-lg mb-2 text-left">
            Java Settings
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-700/50 rounded-lg text-left">
            About
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        {/* General Settings */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">General</h2>
          <div className="bg-slate-800/50 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Close to Tray</h3>
                <p className="text-sm text-slate-400">Keep launcher running in system tray</p>
              </div>
              <button className="w-12 h-6 bg-slate-700 rounded-full relative">
                <span className="absolute left-1 top-1 w-4 h-4 bg-slate-500 rounded-full transition-transform" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Auto-start with System</h3>
                <p className="text-sm text-slate-400">Launch on system startup</p>
              </div>
              <button className="w-12 h-6 bg-slate-700 rounded-full relative">
                <span className="absolute left-1 top-1 w-4 h-4 bg-slate-500 rounded-full transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* System Info */}
        <section>
          <h2 className="text-xl font-semibold mb-4">System Information</h2>
          <div className="bg-slate-800/50 rounded-xl p-6">
            {systemInfo ? (
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm text-slate-400">Platform</dt>
                  <dd className="font-medium">{systemInfo.platform}</dd>
                </div>
                <div>
                  <dt className="text-sm text-slate-400">Architecture</dt>
                  <dd className="font-medium">{systemInfo.arch}</dd>
                </div>
                <div>
                  <dt className="text-sm text-slate-400">App Version</dt>
                  <dd className="font-medium">{systemInfo.version}</dd>
                </div>
                <div>
                  <dt className="text-sm text-slate-400">Electron</dt>
                  <dd className="font-medium">{systemInfo.electron}</dd>
                </div>
                <div>
                  <dt className="text-sm text-slate-400">Node.js</dt>
                  <dd className="font-medium">{systemInfo.node}</dd>
                </div>
                <div>
                  <dt className="text-sm text-slate-400">Chrome</dt>
                  <dd className="font-medium">{systemInfo.chrome}</dd>
                </div>
              </dl>
            ) : (
              <p className="text-slate-400">Loading...</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
