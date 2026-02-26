"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Loader2, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Erreur de connexion");
      }
    } catch {
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/logo.jpg"
              alt="Nemesis"
              width={80}
              height={80}
              className="shadow-minecraft"
            />
          </div>
          <h1 className="text-2xl font-black text-white">
            NEMESIS <span className="text-nemesis-400">Admin</span>
          </h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-dark-900 border-4 border-dark-700 p-6">
          <div className="flex items-center justify-center gap-2 mb-6 pb-4 border-b-2 border-dark-700">
            <Lock className="w-5 h-5 text-nemesis-400" />
            <span className="font-bold text-dark-300">Connexion Admin</span>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-minecraft-redstone/10 border-2 border-minecraft-redstone/30 flex items-center gap-2 text-minecraft-redstone">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-bold">{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-dark-400 mb-2">
                Identifiant
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-dark-800 border-2 border-dark-600 text-white focus:border-nemesis-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-dark-400 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-dark-800 border-2 border-dark-600 text-white focus:border-nemesis-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 btn-primary flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Connexion...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Se connecter
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-dark-500">
          Accès réservé aux administrateurs
        </p>
      </div>
    </main>
  );
}
