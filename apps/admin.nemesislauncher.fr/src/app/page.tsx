"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Users,
  Download,
  Server,
  Activity,
  Settings,
  LogOut,
  Home,
  FileText,
  Shield,
  BarChart3,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";

interface AdminUser {
  username: string;
  role: "admin" | "moderator";
}

// Simulated stats
const stats = [
  { label: "Utilisateurs", value: "12,847", change: "+12%", icon: Users },
  { label: "Téléchargements", value: "45,231", change: "+28%", icon: Download },
  { label: "Serveurs actifs", value: "156", change: "+5%", icon: Server },
  { label: "Sessions actives", value: "2,341", change: "+18%", icon: Activity },
];

const recentUsers = [
  { username: "PlayerOne", date: "Il y a 2 min", status: "online" },
  { username: "MinecrAfter", date: "Il y a 5 min", status: "online" },
  { username: "BlockMaster", date: "Il y a 12 min", status: "offline" },
  { username: "CraftKing", date: "Il y a 25 min", status: "online" },
  { username: "DiamondHunter", date: "Il y a 1h", status: "offline" },
];

export default function AdminPage() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation - In production, this would call the API
    if (email === "admin@nemesislauncher.fr" && password === "admin") {
      setUser({ username: "Admin", role: "admin" });
      setError("");
    } else {
      setError("Identifiants incorrects");
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Login Page
  if (!user) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Image
              src="/logo.jpg"
              alt="Némésis Launcher"
              width={80}
              height={80}
              className="rounded-2xl mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-white">Administration</h1>
            <p className="text-dark-400">Némésis Launcher</p>
          </div>

          <div className="bg-dark-900 border border-dark-700 rounded-2xl p-8">
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder:text-dark-500 focus:outline-none focus:border-nemesis-500"
                  placeholder="admin@nemesislauncher.fr"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder:text-dark-500 focus:outline-none focus:border-nemesis-500"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-nemesis-500 hover:bg-nemesis-600 text-white rounded-lg font-medium transition"
              >
                Se connecter
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-dark-700 text-center">
              <p className="text-dark-500 text-sm">
                Accès réservé aux administrateurs
              </p>
            </div>
          </div>

          <p className="text-center text-dark-600 text-xs mt-6">
            Demo: admin@nemesislauncher.fr / admin
          </p>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-dark-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-900 border-r border-dark-700 p-4 flex flex-col">
        <div className="flex items-center gap-3 mb-8 px-2">
          <Image
            src="/logo.jpg"
            alt="Némésis"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <div>
            <span className="font-bold text-lg text-white">Admin</span>
            <p className="text-xs text-dark-400">Némésis Launcher</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {[
            { id: "dashboard", icon: Home, label: "Tableau de bord" },
            { id: "users", icon: Users, label: "Utilisateurs" },
            { id: "downloads", icon: Download, label: "Téléchargements" },
            { id: "servers", icon: Server, label: "Serveurs" },
            { id: "content", icon: FileText, label: "Contenu" },
            { id: "analytics", icon: BarChart3, label: "Statistiques" },
            { id: "security", icon: Shield, label: "Sécurité" },
            { id: "settings", icon: Settings, label: "Paramètres" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition ${
                activeTab === item.id
                  ? "bg-nemesis-500/20 text-nemesis-400"
                  : "text-dark-400 hover:bg-dark-800 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-4 border-t border-dark-700 mt-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-dark-400 hover:bg-dark-800 hover:text-red-400 transition"
          >
            <LogOut className="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 bg-dark-900/50 border-b border-dark-700 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-sm text-white placeholder:text-dark-500 focus:outline-none focus:border-nemesis-500 w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-dark-400 hover:text-white transition">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-nemesis-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-800 rounded-lg">
              <div className="w-8 h-8 bg-nemesis-500/20 rounded-full flex items-center justify-center">
                <span className="text-nemesis-400 font-medium text-sm">A</span>
              </div>
              <span className="text-sm text-white">{user.username}</span>
              <ChevronDown className="w-4 h-4 text-dark-400" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Tableau de bord</h1>
            <p className="text-dark-400">Vue d&apos;ensemble de Némésis Launcher</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-dark-900 border border-dark-700 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-nemesis-500/20 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-nemesis-400" />
                  </div>
                  <span className="text-green-400 text-sm font-medium">
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-dark-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-dark-900 border border-dark-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Utilisateurs récents
              </h3>
              <div className="space-y-3">
                {recentUsers.map((u, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2 border-b border-dark-800 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-dark-800 rounded-full flex items-center justify-center">
                        <span className="text-dark-400 text-sm">
                          {u.username[0]}
                        </span>
                      </div>
                      <span className="text-white">{u.username}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-dark-500 text-sm">{u.date}</span>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          u.status === "online" ? "bg-green-500" : "bg-dark-600"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-dark-900 border border-dark-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Actions rapides
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Nouvelle annonce", icon: FileText },
                  { label: "Gérer les bans", icon: Shield },
                  { label: "Voir les logs", icon: Activity },
                  { label: "Paramètres CDN", icon: Server },
                ].map((action, i) => (
                  <button
                    key={i}
                    className="flex items-center gap-3 p-4 bg-dark-800 hover:bg-dark-700 rounded-lg transition"
                  >
                    <action.icon className="w-5 h-5 text-nemesis-400" />
                    <span className="text-sm text-white">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
