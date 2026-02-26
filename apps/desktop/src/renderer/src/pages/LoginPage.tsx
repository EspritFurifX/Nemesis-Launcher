import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();

  const handleLogin = async () => {
    const success = await login();
    if (success) {
      navigate("/home");
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="text-center mb-12">
        <div className="w-24 h-24 bg-emerald-500 rounded-2xl flex items-center justify-center text-4xl font-bold mb-6 mx-auto shadow-lg shadow-emerald-500/20">
          N
        </div>
        <h1 className="text-4xl font-bold mb-2">Némésis Launcher</h1>
        <p className="text-slate-400">Sign in with your Microsoft account to continue</p>
      </div>

      <button
        onClick={handleLogin}
        disabled={isLoading}
        className="flex items-center gap-3 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 px-8 py-4 rounded-xl transition-colors shadow-lg"
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
        ) : (
          <svg className="w-6 h-6" viewBox="0 0 21 21" fill="none">
            <rect width="10" height="10" fill="#F25022" />
            <rect x="11" width="10" height="10" fill="#7FBA00" />
            <rect y="11" width="10" height="10" fill="#00A4EF" />
            <rect x="11" y="11" width="10" height="10" fill="#FFB900" />
          </svg>
        )}
        <span className="font-medium">
          {isLoading ? "Signing in..." : "Sign in with Microsoft"}
        </span>
      </button>

      {error && (
        <div className="mt-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 max-w-md text-center">
          {error}
        </div>
      )}

      <p className="mt-8 text-xs text-slate-500">
        Only valid Minecraft accounts are accepted. No offline mode.
      </p>
    </div>
  );
}
