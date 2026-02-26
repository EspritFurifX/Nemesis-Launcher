"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation, faSquare } from "@fortawesome/free-solid-svg-icons";
import {
  LogOut,
  Users,
  Package,
  Download,
  Settings,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  CheckCircle,
  Clock,
  FileDown,
  Send,
  Loader2,
  RefreshCw,
  Home,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { StatCardSkeleton, ReleaseCardSkeleton, SubscriberRowSkeleton, AuditLogSkeleton } from "@/components/Skeleton";

// Types
interface Release {
  id: string;
  version: string;
  date: string;
  changelog: string[];
  downloads: {
    windows?: { url: string; size: string };
    mac?: { url: string; size: string };
    linux?: { url: string; size: string };
  };
  published: boolean;
  createdAt: string;
}

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  notified: boolean;
}

interface Stats {
  total: number;
  notified: number;
  pending: number;
}

interface AuditLog {
  timestamp: string;
  action: string;
  ip: string;
  details?: Record<string, unknown>;
}

type Tab = "releases" | "subscribers" | "security" | "settings";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("releases");
  
  // Releases state
  const [releases, setReleases] = useState<Release[]>([]);
  const [showReleaseModal, setShowReleaseModal] = useState(false);
  const [editingRelease, setEditingRelease] = useState<Release | null>(null);
  
  // Subscribers state
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, notified: 0, pending: 0 });
  
  // Security state
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [csrfToken, setCsrfToken] = useState<string>("");

  // Check auth on mount
  useEffect(() => {
    checkAuth();
    // Get CSRF token from cookie
    const csrfCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrf_token="));
    if (csrfCookie) {
      setCsrfToken(csrfCookie.split("=")[1] || "");
    }
  }, []);

  // Load data when tab changes
  useEffect(() => {
    if (activeTab === "releases") loadReleases();
    if (activeTab === "subscribers") loadSubscribers();
    if (activeTab === "security") loadAuditLogs();
  }, [activeTab]);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/verify");
      if (!res.ok) {
        router.push("/admin");
        return;
      }
      setLoading(false);
      loadReleases();
    } catch {
      router.push("/admin");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  };

  const loadReleases = async () => {
    try {
      const res = await fetch("/api/admin/releases");
      const data = await res.json();
      setReleases(data.releases || []);
    } catch (err) {
      console.error("Error loading releases:", err);
    }
  };

  const loadSubscribers = async () => {
    try {
      const res = await fetch("/api/admin/subscribers");
      const data = await res.json();
      setSubscribers(data.subscribers || []);
      setStats(data.stats || { total: 0, notified: 0, pending: 0 });
    } catch (err) {
      console.error("Error loading subscribers:", err);
    }
  };

  const loadAuditLogs = async () => {
    try {
      const res = await fetch("/api/admin/audit?limit=100");
      const data = await res.json();
      setAuditLogs(data.logs || []);
    } catch (err) {
      console.error("Error loading audit logs:", err);
    }
  };

  // Helper pour les requêtes avec CSRF
  const fetchWithCSRF = async (url: string, options: RequestInit = {}) => {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
    });
  };

  const togglePublish = async (release: Release) => {
    try {
      await fetchWithCSRF("/api/admin/releases", {
        method: "PUT",
        body: JSON.stringify({ id: release.id, published: !release.published }),
      });
      loadReleases();
    } catch (err) {
      console.error("Error toggling publish:", err);
    }
  };

  const deleteRelease = async (id: string) => {
    if (!confirm("Supprimer cette release ?")) return;
    try {
      await fetchWithCSRF(`/api/admin/releases?id=${id}`, { method: "DELETE" });
      loadReleases();
    } catch (err) {
      console.error("Error deleting release:", err);
    }
  };

  const deleteSubscriber = async (id: string) => {
    if (!confirm("Supprimer cet abonné ?")) return;
    try {
      await fetchWithCSRF(`/api/admin/subscribers?id=${id}`, { method: "DELETE" });
      loadSubscribers();
    } catch (err) {
      console.error("Error deleting subscriber:", err);
    }
  };

  const exportSubscribers = async () => {
    try {
      const res = await fetchWithCSRF("/api/admin/subscribers", {
        method: "POST",
        body: JSON.stringify({ action: "export" }),
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `subscribers_${Date.now()}.csv`;
      a.click();
    } catch (err) {
      console.error("Error exporting:", err);
    }
  };

  const markAllNotified = async () => {
    if (!confirm("Marquer tous les abonnés comme notifiés ?")) return;
    try {
      await fetchWithCSRF("/api/admin/subscribers", {
        method: "POST",
        body: JSON.stringify({ action: "mark_notified" }),
      });
      loadSubscribers();
    } catch (err) {
      console.error("Error marking notified:", err);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-dark-950">
        {/* Header Skeleton */}
        <header className="bg-dark-900 border-b-4 border-dark-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-dark-700 shadow-minecraft animate-pulse" />
                <div>
                  <div className="h-6 w-32 bg-dark-700 rounded animate-pulse" />
                  <div className="h-3 w-24 bg-dark-800 rounded animate-pulse mt-1" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Skeleton */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </div>

          {/* Tabs Skeleton */}
          <div className="flex gap-2 mb-6">
            <div className="h-10 w-24 bg-dark-800 rounded animate-pulse" />
            <div className="h-10 w-24 bg-dark-800 rounded animate-pulse" />
            <div className="h-10 w-24 bg-dark-800 rounded animate-pulse" />
          </div>

          {/* Content Skeleton */}
          <div className="bg-dark-900 border-4 border-dark-700 p-6">
            <ReleaseCardSkeleton />
            <div className="mt-4">
              <ReleaseCardSkeleton />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-dark-950">
      {/* Header */}
      <header className="bg-dark-900 border-b-4 border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/logo.jpg"
                alt="Nemesis"
                width={40}
                height={40}
                className="shadow-minecraft"
              />
              <div>
                <h1 className="text-xl font-black">NEMESIS <span className="text-nemesis-400">Admin</span></h1>
                <p className="text-xs text-dark-400">Panneau d'administration</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="p-2 bg-dark-800 border-2 border-dark-700 text-dark-400 hover:text-white hover:bg-dark-700 transition-all"
              >
                <Home className="w-5 h-5" />
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-minecraft-redstone/20 border-2 border-minecraft-redstone/30 text-minecraft-redstone hover:bg-minecraft-redstone/30 transition-all font-bold"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab("releases")}
            className={`flex items-center gap-2 px-4 py-2 border-2 font-bold transition-all ${
              activeTab === "releases"
                ? "bg-nemesis-500 border-nemesis-400 text-white"
                : "bg-dark-800 border-dark-700 text-dark-400 hover:text-white"
            }`}
          >
            <Package className="w-4 h-4" />
            Releases
          </button>
          <button
            onClick={() => setActiveTab("subscribers")}
            className={`flex items-center gap-2 px-4 py-2 border-2 font-bold transition-all ${
              activeTab === "subscribers"
                ? "bg-nemesis-500 border-nemesis-400 text-white"
                : "bg-dark-800 border-dark-700 text-dark-400 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            Abonnés
            {stats.pending > 0 && (
              <span className="px-2 py-0.5 bg-minecraft-gold text-dark-900 text-xs font-bold">
                {stats.pending}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-2 px-4 py-2 border-2 font-bold transition-all ${
              activeTab === "security"
                ? "bg-nemesis-500 border-nemesis-400 text-white"
                : "bg-dark-800 border-dark-700 text-dark-400 hover:text-white"
            }`}
          >
            <Shield className="w-4 h-4" />
            Sécurité
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-4 py-2 border-2 font-bold transition-all ${
              activeTab === "settings"
                ? "bg-nemesis-500 border-nemesis-400 text-white"
                : "bg-dark-800 border-dark-700 text-dark-400 hover:text-white"
            }`}
          >
            <Settings className="w-4 h-4" />
            Paramètres
          </button>
        </div>

        {/* Releases Tab */}
        {activeTab === "releases" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Gestion des Releases</h2>
              <div className="flex gap-2">
                <button
                  onClick={loadReleases}
                  className="p-2 bg-dark-800 border-2 border-dark-700 text-dark-400 hover:text-white transition-all"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    setEditingRelease(null);
                    setShowReleaseModal(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-nemesis-500 border-2 border-nemesis-400 text-white font-bold hover:bg-nemesis-600 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Nouvelle Release
                </button>
              </div>
            </div>

            {releases.length === 0 ? (
              <div className="p-8 bg-dark-900 border-4 border-dark-700 text-center">
                <Package className="w-12 h-12 text-dark-600 mx-auto mb-4" />
                <p className="text-dark-400">Aucune release pour le moment</p>
                <p className="text-sm text-dark-500 mt-2">
                  Créez votre première release pour la rendre disponible au téléchargement
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {releases.map((release) => (
                  <div
                    key={release.id}
                    className={`p-4 bg-dark-900 border-4 ${
                      release.published ? "border-nemesis-500/30" : "border-dark-700"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xl font-bold">v{release.version}</span>
                          {release.published ? (
                            <span className="flex items-center gap-1 px-2 py-1 bg-nemesis-500/20 text-nemesis-400 text-xs font-bold">
                              <Eye className="w-3 h-3" />
                              Publié
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 px-2 py-1 bg-dark-700 text-dark-400 text-xs font-bold">
                              <EyeOff className="w-3 h-3" />
                              Brouillon
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-dark-400">
                          Créé le {release.date}
                        </p>
                        {release.changelog.length > 0 && (
                          <ul className="mt-3 space-y-1">
                            {release.changelog.slice(0, 3).map((item, i) => (
                              <li key={i} className="text-sm text-dark-300 flex items-start gap-2">
                                <span className="text-nemesis-400">▸</span>
                                {item}
                              </li>
                            ))}
                            {release.changelog.length > 3 && (
                              <li className="text-sm text-dark-500">
                                +{release.changelog.length - 3} autres...
                              </li>
                            )}
                          </ul>
                        )}
                        {/* Downloads */}
                        <div className="flex gap-2 mt-3">
                          {release.downloads.windows && (
                            <span className="px-2 py-1 bg-minecraft-diamond/20 text-minecraft-diamond text-xs font-bold">
                              Windows
                            </span>
                          )}
                          {release.downloads.mac && (
                            <span className="px-2 py-1 bg-dark-600 text-dark-300 text-xs font-bold">
                              macOS
                            </span>
                          )}
                          {release.downloads.linux && (
                            <span className="px-2 py-1 bg-minecraft-grass/20 text-minecraft-grass text-xs font-bold">
                              Linux
                            </span>
                          )}
                          {!release.downloads.windows && !release.downloads.mac && !release.downloads.linux && (
                            <span className="text-xs text-dark-500">Aucun fichier uploadé</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => togglePublish(release)}
                          className={`p-2 border-2 transition-all ${
                            release.published
                              ? "bg-dark-800 border-dark-700 text-dark-400 hover:text-white"
                              : "bg-nemesis-500/20 border-nemesis-500/30 text-nemesis-400 hover:bg-nemesis-500/30"
                          }`}
                          title={release.published ? "Dépublier" : "Publier"}
                        >
                          {release.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => {
                            setEditingRelease(release);
                            setShowReleaseModal(true);
                          }}
                          className="p-2 bg-dark-800 border-2 border-dark-700 text-dark-400 hover:text-white transition-all"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteRelease(release.id)}
                          className="p-2 bg-minecraft-redstone/20 border-2 border-minecraft-redstone/30 text-minecraft-redstone hover:bg-minecraft-redstone/30 transition-all"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Subscribers Tab */}
        {activeTab === "subscribers" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Gestion des Abonnés</h2>
              <div className="flex gap-2">
                <button
                  onClick={loadSubscribers}
                  className="p-2 bg-dark-800 border-2 border-dark-700 text-dark-400 hover:text-white transition-all"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button
                  onClick={exportSubscribers}
                  className="flex items-center gap-2 px-4 py-2 bg-dark-800 border-2 border-dark-700 text-dark-400 hover:text-white font-bold transition-all"
                >
                  <FileDown className="w-4 h-4" />
                  Exporter CSV
                </button>
                <button
                  onClick={markAllNotified}
                  className="flex items-center gap-2 px-4 py-2 bg-minecraft-gold/20 border-2 border-minecraft-gold/30 text-minecraft-gold font-bold hover:bg-minecraft-gold/30 transition-all"
                >
                  <Send className="w-4 h-4" />
                  Marquer notifiés
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-dark-900 border-4 border-dark-700 text-center">
                <div className="text-3xl font-bold text-white">{stats.total}</div>
                <div className="text-sm text-dark-400">Total abonnés</div>
              </div>
              <div className="p-4 bg-dark-900 border-4 border-nemesis-500/30 text-center">
                <div className="text-3xl font-bold text-nemesis-400">{stats.notified}</div>
                <div className="text-sm text-dark-400">Notifiés</div>
              </div>
              <div className="p-4 bg-dark-900 border-4 border-minecraft-gold/30 text-center">
                <div className="text-3xl font-bold text-minecraft-gold">{stats.pending}</div>
                <div className="text-sm text-dark-400">En attente</div>
              </div>
            </div>

            {subscribers.length === 0 ? (
              <div className="p-8 bg-dark-900 border-4 border-dark-700 text-center">
                <Users className="w-12 h-12 text-dark-600 mx-auto mb-4" />
                <p className="text-dark-400">Aucun abonné pour le moment</p>
              </div>
            ) : (
              <div className="bg-dark-900 border-4 border-dark-700 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-dark-800 border-b-2 border-dark-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-bold text-dark-400">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-dark-400">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-dark-400">Statut</th>
                      <th className="px-4 py-3 text-right text-sm font-bold text-dark-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-700">
                    {subscribers.map((sub) => (
                      <tr key={sub.id} className="hover:bg-dark-800/50">
                        <td className="px-4 py-3 text-white font-mono text-sm">{sub.email}</td>
                        <td className="px-4 py-3 text-dark-400 text-sm">
                          {new Date(sub.subscribedAt).toLocaleDateString("fr-FR")}
                        </td>
                        <td className="px-4 py-3">
                          {sub.notified ? (
                            <span className="flex items-center gap-1 text-nemesis-400 text-sm">
                              <CheckCircle className="w-4 h-4" />
                              Notifié
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-minecraft-gold text-sm">
                              <Clock className="w-4 h-4" />
                              En attente
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => deleteSubscriber(sub.id)}
                            className="p-1 text-dark-500 hover:text-minecraft-redstone transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Sécurité & Audit</h2>
              <button
                onClick={loadAuditLogs}
                className="p-2 bg-dark-800 border-2 border-dark-700 text-dark-400 hover:text-white transition-all"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>

            {/* Security Status */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-dark-900 border-4 border-nemesis-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-nemesis-400" />
                  <span className="font-bold">HTTPS</span>
                </div>
                <p className="text-sm text-dark-400">Connexion chiffrée</p>
              </div>
              <div className="p-4 bg-dark-900 border-4 border-nemesis-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-nemesis-400" />
                  <span className="font-bold">CSRF</span>
                </div>
                <p className="text-sm text-dark-400">Protection active</p>
              </div>
              <div className="p-4 bg-dark-900 border-4 border-nemesis-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-nemesis-400" />
                  <span className="font-bold">Rate Limit</span>
                </div>
                <p className="text-sm text-dark-400">5 req / 15 min</p>
              </div>
              <div className="p-4 bg-dark-900 border-4 border-nemesis-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-nemesis-400" />
                  <span className="font-bold">Bcrypt</span>
                </div>
                <p className="text-sm text-dark-400">Hash sécurisé</p>
              </div>
            </div>

            {/* Audit Logs */}
            <div className="p-6 bg-dark-900 border-4 border-dark-700">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-nemesis-400" />
                Journal d'audit
              </h3>
              
              {auditLogs.length === 0 ? (
                <p className="text-dark-400 text-center py-8">
                  Aucune activité enregistrée
                </p>
              ) : (
                <div className="overflow-x-auto max-h-96 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-dark-900">
                      <tr className="border-b-2 border-dark-700">
                        <th className="text-left py-2 px-2 text-dark-400">Heure</th>
                        <th className="text-left py-2 px-2 text-dark-400">Action</th>
                        <th className="text-left py-2 px-2 text-dark-400">IP</th>
                        <th className="text-left py-2 px-2 text-dark-400">Détails</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auditLogs.map((log, i) => (
                        <tr key={i} className="border-b border-dark-800 hover:bg-dark-800/50">
                          <td className="py-2 px-2 font-mono text-xs text-dark-400">
                            {new Date(log.timestamp).toLocaleString("fr-FR")}
                          </td>
                          <td className="py-2 px-2">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold ${
                              log.action.includes("SUCCESS") 
                                ? "bg-nemesis-500/20 text-nemesis-400"
                                : log.action.includes("FAILED") || log.action.includes("BLOCKED")
                                ? "bg-minecraft-redstone/20 text-minecraft-redstone"
                                : "bg-dark-700 text-dark-300"
                            }`}>
                              {log.action.includes("SUCCESS") && <CheckCircle2 className="w-3 h-3" />}
                              {(log.action.includes("FAILED") || log.action.includes("BLOCKED")) && <XCircle className="w-3 h-3" />}
                              {log.action.includes("LIMITED") && <AlertTriangle className="w-3 h-3" />}
                              {log.action}
                            </span>
                          </td>
                          <td className="py-2 px-2 font-mono text-xs">{log.ip}</td>
                          <td className="py-2 px-2 text-xs text-dark-400 max-w-xs truncate">
                            {log.details ? JSON.stringify(log.details) : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Paramètres</h2>
            <div className="p-6 bg-dark-900 border-4 border-dark-700">
              <h3 className="font-bold mb-4">Informations</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-dark-700">
                  <span className="text-dark-400">Version Admin</span>
                  <span className="text-white font-mono">1.0.0</span>
                </div>
                <div className="flex justify-between py-2 border-b border-dark-700">
                  <span className="text-dark-400">Domaine</span>
                  <span className="text-nemesis-400 font-mono">nemesislauncher.fr</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-dark-400">Environnement</span>
                  <span className="text-minecraft-grass font-mono">development</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-dark-800 border-2 border-dark-700">
                <h4 className="font-bold text-minecraft-gold mb-2 flex items-center gap-2">
                  <FontAwesomeIcon icon={faTriangleExclamation} className="w-4 h-4" />
                  Checklist Lancement
                </h4>
                <ul className="space-y-2 text-sm text-dark-300">
                  <li className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faSquare} className="w-3 h-3 text-dark-500" />
                    Configurer les variables d'environnement (ADMIN_PASSWORD, JWT_SECRET)
                  </li>
                  <li className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faSquare} className="w-3 h-3 text-dark-500" />
                    Uploader les fichiers du launcher (Windows, Mac, Linux)
                  </li>
                  <li className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faSquare} className="w-3 h-3 text-dark-500" />
                    Créer et publier la première release
                  </li>
                  <li className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faSquare} className="w-3 h-3 text-dark-500" />
                    Envoyer les notifications aux abonnés
                  </li>
                  <li className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faSquare} className="w-3 h-3 text-dark-500" />
                    Configurer le domaine nemesislauncher.fr
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Release Modal */}
      {showReleaseModal && (
        <ReleaseModal
          release={editingRelease}
          onClose={() => setShowReleaseModal(false)}
          onSave={() => {
            setShowReleaseModal(false);
            loadReleases();
          }}
        />
      )}
    </main>
  );
}

// Release Modal Component
function ReleaseModal({
  release,
  onClose,
  onSave,
}: {
  release: Release | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const [version, setVersion] = useState(release?.version || "");
  const [changelog, setChangelog] = useState(release?.changelog.join("\n") || "");
  const [windowsUrl, setWindowsUrl] = useState(release?.downloads.windows?.url || "");
  const [windowsSize, setWindowsSize] = useState(release?.downloads.windows?.size || "");
  const [macUrl, setMacUrl] = useState(release?.downloads.mac?.url || "");
  const [macSize, setMacSize] = useState(release?.downloads.mac?.size || "");
  const [linuxUrl, setLinuxUrl] = useState(release?.downloads.linux?.url || "");
  const [linuxSize, setLinuxSize] = useState(release?.downloads.linux?.size || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const downloads: Record<string, { url: string; size: string }> = {};
    if (windowsUrl) downloads["windows"] = { url: windowsUrl, size: windowsSize };
    if (macUrl) downloads["mac"] = { url: macUrl, size: macSize };
    if (linuxUrl) downloads["linux"] = { url: linuxUrl, size: linuxSize };

    try {
      const method = release ? "PUT" : "POST";
      const body = {
        ...(release && { id: release.id }),
        version,
        changelog: changelog.split("\n").filter(Boolean),
        downloads,
      };

      const res = await fetch("/api/admin/releases", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        onSave();
      } else {
        const data = await res.json();
        alert(data.error || "Erreur");
      }
    } catch (err) {
      alert("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-2xl bg-dark-900 border-4 border-dark-700 max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b-2 border-dark-700 flex items-center justify-between">
          <h3 className="text-xl font-bold">
            {release ? `Modifier v${release.version}` : "Nouvelle Release"}
          </h3>
          <button onClick={onClose} className="text-dark-400 hover:text-white">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Version */}
          <div>
            <label className="block text-sm font-bold text-dark-400 mb-2">
              Version *
            </label>
            <input
              type="text"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="1.0.0"
              className="w-full px-4 py-3 bg-dark-800 border-2 border-dark-600 text-white focus:border-nemesis-500 focus:outline-none font-mono"
              required
            />
          </div>

          {/* Changelog */}
          <div>
            <label className="block text-sm font-bold text-dark-400 mb-2">
              Changelog (une ligne par item)
            </label>
            <textarea
              value={changelog}
              onChange={(e) => setChangelog(e.target.value)}
              placeholder="Ajout de la fonctionnalité X&#10;Correction du bug Y&#10;Amélioration de Z"
              rows={4}
              className="w-full px-4 py-3 bg-dark-800 border-2 border-dark-600 text-white focus:border-nemesis-500 focus:outline-none resize-none"
            />
          </div>

          {/* Downloads */}
          <div className="space-y-4">
            <h4 className="font-bold text-dark-300">Fichiers de téléchargement</h4>
            
            {/* Windows */}
            <div className="p-4 bg-dark-800 border-2 border-dark-700">
              <div className="flex items-center gap-2 mb-3 text-minecraft-diamond">
                <Download className="w-4 h-4" />
                <span className="font-bold">Windows</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="url"
                  value={windowsUrl}
                  onChange={(e) => setWindowsUrl(e.target.value)}
                  placeholder="URL du fichier .exe"
                  className="px-3 py-2 bg-dark-900 border-2 border-dark-600 text-white text-sm focus:border-nemesis-500 focus:outline-none"
                />
                <input
                  type="text"
                  value={windowsSize}
                  onChange={(e) => setWindowsSize(e.target.value)}
                  placeholder="Taille (ex: 85 MB)"
                  className="px-3 py-2 bg-dark-900 border-2 border-dark-600 text-white text-sm focus:border-nemesis-500 focus:outline-none"
                />
              </div>
            </div>

            {/* macOS */}
            <div className="p-4 bg-dark-800 border-2 border-dark-700">
              <div className="flex items-center gap-2 mb-3 text-dark-300">
                <Download className="w-4 h-4" />
                <span className="font-bold">macOS</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="url"
                  value={macUrl}
                  onChange={(e) => setMacUrl(e.target.value)}
                  placeholder="URL du fichier .dmg"
                  className="px-3 py-2 bg-dark-900 border-2 border-dark-600 text-white text-sm focus:border-nemesis-500 focus:outline-none"
                />
                <input
                  type="text"
                  value={macSize}
                  onChange={(e) => setMacSize(e.target.value)}
                  placeholder="Taille (ex: 90 MB)"
                  className="px-3 py-2 bg-dark-900 border-2 border-dark-600 text-white text-sm focus:border-nemesis-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Linux */}
            <div className="p-4 bg-dark-800 border-2 border-dark-700">
              <div className="flex items-center gap-2 mb-3 text-minecraft-grass">
                <Download className="w-4 h-4" />
                <span className="font-bold">Linux</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="url"
                  value={linuxUrl}
                  onChange={(e) => setLinuxUrl(e.target.value)}
                  placeholder="URL du fichier .AppImage"
                  className="px-3 py-2 bg-dark-900 border-2 border-dark-600 text-white text-sm focus:border-nemesis-500 focus:outline-none"
                />
                <input
                  type="text"
                  value={linuxSize}
                  onChange={(e) => setLinuxSize(e.target.value)}
                  placeholder="Taille (ex: 80 MB)"
                  className="px-3 py-2 bg-dark-900 border-2 border-dark-600 text-white text-sm focus:border-nemesis-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-dark-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-dark-800 border-2 border-dark-700 text-dark-400 font-bold hover:text-white transition-all"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  {release ? "Enregistrer" : "Créer"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
