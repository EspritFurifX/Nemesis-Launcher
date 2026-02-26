"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Settings, LogOut, Download, Shield, Bell, Home } from "lucide-react";

interface UserProfile {
  id: string;
  minecraftUuid: string;
  minecraftUsername: string;
  createdAt: string;
  lastLogin: string;
}

export default function AppPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const checkAuth = async () => {
      const token = localStorage.getItem("nemesis_token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/session`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.data.user);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login?redirect=web`;
  };

  const handleLogout = () => {
    localStorage.removeItem("nemesis_token");
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-nemesis-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Page de connexion
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="card p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-nemesis-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-3xl">N</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Némésis Launcher</h1>
          <p className="text-dark-400 mb-8">
            Connectez-vous avec votre compte Microsoft pour accéder à votre espace.
          </p>
          <button onClick={handleLogin} className="btn-primary w-full flex items-center justify-center gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" />
            </svg>
            Connexion avec Microsoft
          </button>
          <p className="text-dark-500 text-sm mt-6">
            En vous connectant, vous acceptez nos{" "}
            <Link href="/terms" className="text-nemesis-400 hover:underline">
              conditions d'utilisation
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-900 border-r border-dark-700 p-4 flex flex-col">
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 bg-nemesis-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">N</span>
          </div>
          <span className="font-bold text-lg">Némésis</span>
        </div>

        <nav className="flex-1 space-y-1">
          {[
            { id: "dashboard", icon: Home, label: "Tableau de bord" },
            { id: "profile", icon: User, label: "Profil" },
            { id: "downloads", icon: Download, label: "Téléchargements" },
            { id: "security", icon: Shield, label: "Sécurité" },
            { id: "notifications", icon: Bell, label: "Notifications" },
            { id: "settings", icon: Settings, label: "Paramètres" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === item.id
                  ? "bg-nemesis-500/10 text-nemesis-400"
                  : "text-dark-400 hover:bg-dark-800 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition"
        >
          <LogOut className="w-5 h-5" />
          Déconnexion
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">
              {activeTab === "dashboard" && "Tableau de bord"}
              {activeTab === "profile" && "Mon Profil"}
              {activeTab === "downloads" && "Téléchargements"}
              {activeTab === "security" && "Sécurité"}
              {activeTab === "notifications" && "Notifications"}
              {activeTab === "settings" && "Paramètres"}
            </h1>
            <p className="text-dark-400">Bienvenue, {user.minecraftUsername}</p>
          </div>
          <div className="flex items-center gap-4">
            <Image
              src={`https://mc-heads.net/avatar/${user.minecraftUuid}/48`}
              alt={user.minecraftUsername}
              width={48}
              height={48}
              className="rounded-lg"
            />
          </div>
        </header>

        {/* Dashboard Content */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <div className="card p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-nemesis-500/10 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-nemesis-400" />
                </div>
                <div>
                  <p className="text-dark-400 text-sm">Compte</p>
                  <p className="text-xl font-bold">{user.minecraftUsername}</p>
                </div>
              </div>
              <p className="text-dark-500 text-sm">
                UUID: {user.minecraftUuid.slice(0, 8)}...
              </p>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Download className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-dark-400 text-sm">Version</p>
                  <p className="text-xl font-bold">1.0.0</p>
                </div>
              </div>
              <Link href="/downloads" className="text-nemesis-400 text-sm hover:underline">
                Voir les mises à jour →
              </Link>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-dark-400 text-sm">Statut</p>
                  <p className="text-xl font-bold text-green-400">Vérifié</p>
                </div>
              </div>
              <p className="text-dark-500 text-sm">
                Compte Minecraft actif
              </p>
            </div>

            {/* Recent Activity */}
            <div className="card p-6 md:col-span-2 lg:col-span-3">
              <h3 className="text-lg font-semibold mb-4">Activité récente</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-dark-900/50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white">Connexion réussie</p>
                    <p className="text-dark-500 text-sm">
                      {new Date(user.lastLogin).toLocaleString("fr-FR")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-dark-900/50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white">Compte créé</p>
                    <p className="text-dark-500 text-sm">
                      {new Date(user.createdAt).toLocaleString("fr-FR")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile Content */}
        {activeTab === "profile" && (
          <div className="max-w-2xl">
            <div className="card p-6 mb-6">
              <div className="flex items-center gap-6 mb-6">
                <Image
                  src={`https://mc-heads.net/avatar/${user.minecraftUuid}/96`}
                  alt={user.minecraftUsername}
                  width={96}
                  height={96}
                  className="rounded-xl"
                />
                <div>
                  <h2 className="text-2xl font-bold">{user.minecraftUsername}</h2>
                  <p className="text-dark-400">Joueur Minecraft</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-dark-500 text-sm mb-1">UUID Minecraft</p>
                  <p className="font-mono text-sm bg-dark-900 p-2 rounded">{user.minecraftUuid}</p>
                </div>
                <div>
                  <p className="text-dark-500 text-sm mb-1">Membre depuis</p>
                  <p className="text-white">{new Date(user.createdAt).toLocaleDateString("fr-FR")}</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Skin Minecraft</h3>
              <div className="flex items-center gap-6">
                <Image
                  src={`https://mc-heads.net/body/${user.minecraftUuid}/128`}
                  alt="Skin"
                  width={64}
                  height={128}
                  className="pixelated"
                />
                <div className="flex-1">
                  <p className="text-dark-400 mb-4">
                    Votre skin est synchronisé avec votre compte Microsoft/Minecraft.
                  </p>
                  <a
                    href="https://www.minecraft.net/profile/skin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary inline-block"
                  >
                    Modifier sur minecraft.net
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Downloads Content */}
        {activeTab === "downloads" && (
          <div className="max-w-2xl">
            <div className="card p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Télécharger Némésis Launcher</h3>
              <div className="space-y-4">
                {[
                  { os: "Windows", icon: "🪟", file: "Nemesis-Launcher-Setup.exe" },
                  { os: "macOS", icon: "🍎", file: "Nemesis-Launcher.dmg" },
                  { os: "Linux", icon: "🐧", file: "Nemesis-Launcher.AppImage" },
                ].map((item) => (
                  <div
                    key={item.os}
                    className="flex items-center justify-between p-4 bg-dark-900/50 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p className="font-semibold">{item.os}</p>
                        <p className="text-dark-500 text-sm">{item.file}</p>
                      </div>
                    </div>
                    <a
                      href={`https://cdn.nemesislauncher.fr/releases/${item.file}`}
                      className="btn-primary"
                    >
                      Télécharger
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings Content */}
        {activeTab === "settings" && (
          <div className="max-w-2xl">
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Paramètres du compte</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-dark-400 text-sm mb-2">Langue</label>
                  <select className="input">
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div>
                  <label className="block text-dark-400 text-sm mb-2">Thème</label>
                  <select className="input">
                    <option value="dark">Sombre</option>
                    <option value="light">Clair</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-4 bg-dark-900/50 rounded-lg">
                  <div>
                    <p className="font-semibold">Notifications par email</p>
                    <p className="text-dark-500 text-sm">Recevez des alertes par email</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 accent-nemesis-500" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Content */}
        {activeTab === "security" && (
          <div className="max-w-2xl">
            <div className="card p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Sessions actives</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-dark-900/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="font-semibold">Session actuelle</p>
                      <p className="text-dark-500 text-sm">Web • France</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
                    Active
                  </span>
                </div>
              </div>
            </div>
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Zone de danger</h3>
              <button className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition">
                Déconnecter toutes les sessions
              </button>
            </div>
          </div>
        )}

        {/* Notifications Content */}
        {activeTab === "notifications" && (
          <div className="max-w-2xl">
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Notifications</h3>
              <div className="text-center py-8">
                <Bell className="w-12 h-12 text-dark-500 mx-auto mb-4" />
                <p className="text-dark-400">Aucune notification pour le moment</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
