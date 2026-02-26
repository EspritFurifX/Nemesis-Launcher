import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Icon, Icons } from "../components/Icon";

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();
  const [accounts, setAccounts] = useState<Array<{ id: string; email: string; name: string; active: boolean }>>([]);

  const handleLogin = async () => {
    const success = await login();
    if (success) {
      navigate("/home");
    }
  };

  const handleSwitchAccount = (id: string) => {
    setAccounts(accounts.map(acc => ({
      ...acc,
      active: acc.id === id
    })));
  };

  const handleRemoveAccount = (id: string) => {
    setAccounts(accounts.filter(acc => acc.id !== id));
  };

  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          {/* Logo */}
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-nemesis-400 to-nemesis-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Icon name={Icons.gamepad} size="2xl" className="text-white" />
            </div>
            <h1 className="text-4xl font-black text-white">Némésis</h1>
            <p className="text-slate-400 mt-2">Launcher</p>
          </div>

          {/* Accounts List */}
          {accounts.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-slate-400 font-semibold">Comptes</p>
              {accounts.map((account) => (
                <div
                  key={account.id}
                  onClick={() => handleSwitchAccount(account.id)}
                  className={`p-4 rounded-lg cursor-pointer transition-all group ${
                    account.active
                      ? "bg-gradient-to-r from-nemesis-500/30 to-nemesis-600/20 border border-nemesis-500/50"
                      : "bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800/80"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 bg-gradient-to-br from-nemesis-400 to-nemesis-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">
                          {account.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm truncate">{account.name}</p>
                        <p className="text-slate-400 text-xs truncate">{account.email}</p>
                      </div>
                    </div>
                    {account.active && (
                      <span className="text-xs font-semibold text-nemesis-300">Actif</span>
                    )}
                    {!account.active && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveAccount(account.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Icon name={Icons.error} className="text-red-400" size="sm" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
              <Icon name={Icons.error} className="text-red-400 flex-shrink-0 mt-0.5" size="sm" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-nemesis-500 to-nemesis-600 hover:from-nemesis-600 hover:to-nemesis-700 disabled:from-slate-700 disabled:to-slate-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                Connexion...
              </>
            ) : (
              <>
                <svg viewBox="0 0 21 21" className="w-5 h-5" fill="currentColor">
                  <rect x="1" y="1" width="9" height="9" />
                  <rect x="11" y="1" width="9" height="9" />
                  <rect x="1" y="11" width="9" height="9" />
                  <rect x="11" y="11" width="9" height="9" />
                </svg>
                Microsoft/Xbox
              </>
            )}
          </button>

          {/* Additional Account */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full py-2 text-sm text-slate-400 hover:text-slate-300 border border-slate-700/50 hover:border-slate-600 rounded-lg transition-all"
          >
            + Ajouter un compte
          </button>
        </div>
      </div>
    </div>
  );
}
