"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Activity,
  Server,
  Database,
  Globe,
  Shield,
  Zap,
  RefreshCw,
  Bell,
} from "lucide-react";

type ServiceStatus = "operational" | "degraded" | "outage" | "maintenance";

interface Service {
  id: string;
  name: string;
  description: string;
  status: ServiceStatus;
  responseTime?: number;
  uptime: number;
  icon: typeof Server;
}

interface Incident {
  id: string;
  title: string;
  status: "investigating" | "identified" | "monitoring" | "resolved";
  severity: "minor" | "major" | "critical";
  createdAt: string;
  updatedAt: string;
  updates: {
    time: string;
    message: string;
    status: string;
  }[];
}

const SERVICES: Service[] = [
  {
    id: "api",
    name: "API Principale",
    description: "api.nemesislauncher.fr",
    status: "operational",
    responseTime: 45,
    uptime: 99.98,
    icon: Server,
  },
  {
    id: "auth",
    name: "Service d'authentification",
    description: "Microsoft OAuth / Xbox Live",
    status: "operational",
    responseTime: 120,
    uptime: 99.95,
    icon: Shield,
  },
  {
    id: "cdn",
    name: "CDN / Téléchargements",
    description: "cdn.nemesislauncher.fr",
    status: "operational",
    responseTime: 25,
    uptime: 99.99,
    icon: Globe,
  },
  {
    id: "database",
    name: "Base de données",
    description: "PostgreSQL Cloud",
    status: "operational",
    responseTime: 12,
    uptime: 99.97,
    icon: Database,
  },
  {
    id: "website",
    name: "Site Web",
    description: "nemesislauncher.fr",
    status: "operational",
    responseTime: 85,
    uptime: 99.99,
    icon: Globe,
  },
  {
    id: "updates",
    name: "Service de mises à jour",
    description: "Auto-update système",
    status: "operational",
    responseTime: 35,
    uptime: 99.96,
    icon: Zap,
  },
];

const INCIDENTS: Incident[] = [
  // Empty = no current incidents
];

const PAST_INCIDENTS: Incident[] = [
  {
    id: "inc-001",
    title: "Latence élevée sur l'API",
    status: "resolved",
    severity: "minor",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T11:45:00Z",
    updates: [
      { time: "2024-01-15T11:45:00Z", message: "Incident résolu. Performance normale rétablie.", status: "resolved" },
      { time: "2024-01-15T11:00:00Z", message: "Cause identifiée : pic de trafic. Mise à l'échelle en cours.", status: "identified" },
      { time: "2024-01-15T10:30:00Z", message: "Nous enquêtons sur une latence élevée de l'API.", status: "investigating" },
    ],
  },
];

const StatusIcon = ({ status }: { status: ServiceStatus }) => {
  switch (status) {
    case "operational":
      return <CheckCircle className="w-5 h-5 text-green-400" />;
    case "degraded":
      return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
    case "outage":
      return <XCircle className="w-5 h-5 text-red-400" />;
    case "maintenance":
      return <Clock className="w-5 h-5 text-blue-400" />;
  }
};

const StatusBadge = ({ status }: { status: ServiceStatus }) => {
  const classes = {
    operational: "status-operational",
    degraded: "status-degraded",
    outage: "status-outage",
    maintenance: "status-maintenance",
  };

  const labels = {
    operational: "Opérationnel",
    degraded: "Dégradé",
    outage: "Panne",
    maintenance: "Maintenance",
  };

  return (
    <span className={`px-3 py-1 text-sm font-medium rounded-full border ${classes[status]}`}>
      {labels[status]}
    </span>
  );
};

const getOverallStatus = (services: Service[]): ServiceStatus => {
  if (services.some((s) => s.status === "outage")) return "outage";
  if (services.some((s) => s.status === "degraded")) return "degraded";
  if (services.some((s) => s.status === "maintenance")) return "maintenance";
  return "operational";
};

export default function StatusPage() {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const overallStatus = getOverallStatus(SERVICES);

  const refresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-dark-700 bg-dark-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-nemesis-500 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Status</h1>
                <p className="text-sm text-dark-400">Némésis Launcher</p>
              </div>
            </div>
            <nav className="flex items-center gap-4">
              <button
                onClick={refresh}
                className="p-2 hover:bg-dark-800 rounded-lg transition"
                disabled={isRefreshing}
              >
                <RefreshCw className={`w-5 h-5 text-dark-400 ${isRefreshing ? "animate-spin" : ""}`} />
              </button>
              <a href="https://nemesislauncher.fr" className="text-dark-400 hover:text-white transition">
                Site web
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Overall Status Banner */}
      <section className={`py-12 px-6 border-b border-dark-700 ${
        overallStatus === "operational" ? "bg-green-500/5" :
        overallStatus === "degraded" ? "bg-yellow-500/5" :
        overallStatus === "outage" ? "bg-red-500/5" : "bg-blue-500/5"
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <StatusIcon status={overallStatus} />
            <h2 className="text-3xl font-bold">
              {overallStatus === "operational" && "Tous les systèmes sont opérationnels"}
              {overallStatus === "degraded" && "Certains systèmes sont dégradés"}
              {overallStatus === "outage" && "Panne en cours"}
              {overallStatus === "maintenance" && "Maintenance en cours"}
            </h2>
          </div>
          <p className="text-dark-400">
            Dernière mise à jour : {lastUpdated.toLocaleString("fr-FR")}
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Current Incidents */}
        {INCIDENTS.length > 0 && (
          <section className="mb-12">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="w-2 h-6 bg-red-500 rounded-full"></span>
              Incidents en cours
            </h3>
            <div className="space-y-4">
              {INCIDENTS.map((incident) => (
                <div key={incident.id} className="card p-6 border-l-4 border-l-red-500">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-lg">{incident.title}</h4>
                      <p className="text-dark-500 text-sm">
                        {new Date(incident.createdAt).toLocaleString("fr-FR")}
                      </p>
                    </div>
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      incident.severity === "critical" ? "bg-red-500/20 text-red-400" :
                      incident.severity === "major" ? "bg-orange-500/20 text-orange-400" :
                      "bg-yellow-500/20 text-yellow-400"
                    }`}>
                      {incident.severity}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {incident.updates.map((update, index) => (
                      <div key={index} className="flex gap-4">
                        <span className="text-dark-500 text-sm whitespace-nowrap">
                          {new Date(update.time).toLocaleTimeString("fr-FR")}
                        </span>
                        <p className="text-dark-300">{update.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Services Status */}
        <section className="mb-12">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <span className="w-2 h-6 bg-nemesis-500 rounded-full"></span>
            État des services
          </h3>
          <div className="space-y-4">
            {SERVICES.map((service) => (
              <div key={service.id} className="card p-4 hover:border-dark-600 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-dark-900 rounded-lg flex items-center justify-center">
                      <service.icon className="w-5 h-5 text-dark-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{service.name}</h4>
                      <p className="text-dark-500 text-sm">{service.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    {service.responseTime && (
                      <div className="text-right hidden sm:block">
                        <p className="text-dark-500 text-xs">Temps de réponse</p>
                        <p className="text-white font-mono">{service.responseTime}ms</p>
                      </div>
                    )}
                    <div className="text-right hidden sm:block">
                      <p className="text-dark-500 text-xs">Uptime (30j)</p>
                      <p className="text-green-400 font-mono">{service.uptime}%</p>
                    </div>
                    <StatusBadge status={service.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Uptime History */}
        <section className="mb-12">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
            Historique de disponibilité (90 jours)
          </h3>
          <div className="card p-6">
            <div className="flex items-center gap-1">
              {Array.from({ length: 90 }, (_, i) => {
                // Simulate uptime data
                const isUp = Math.random() > 0.02;
                return (
                  <div
                    key={i}
                    className={`flex-1 h-8 rounded-sm ${
                      isUp ? "bg-green-500" : "bg-red-500"
                    }`}
                    title={`Jour ${90 - i}: ${isUp ? "Opérationnel" : "Incident"}`}
                  />
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-dark-500 text-sm">
              <span>90 jours</span>
              <span>Aujourd'hui</span>
            </div>
          </div>
        </section>

        {/* Past Incidents */}
        <section>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <span className="w-2 h-6 bg-dark-500 rounded-full"></span>
            Historique des incidents
          </h3>
          {PAST_INCIDENTS.length === 0 ? (
            <div className="card p-8 text-center">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <p className="text-dark-400">Aucun incident récent à signaler</p>
            </div>
          ) : (
            <div className="space-y-4">
              {PAST_INCIDENTS.map((incident) => (
                <div key={incident.id} className="card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold">{incident.title}</h4>
                      <p className="text-dark-500 text-sm">
                        {new Date(incident.createdAt).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                    <span className="px-3 py-1 text-sm bg-green-500/20 text-green-400 rounded-full">
                      Résolu
                    </span>
                  </div>
                  <details className="group">
                    <summary className="cursor-pointer text-dark-400 hover:text-white transition">
                      Voir les détails
                    </summary>
                    <div className="mt-4 pl-4 border-l-2 border-dark-700 space-y-3">
                      {incident.updates.map((update, index) => (
                        <div key={index}>
                          <p className="text-dark-500 text-sm">
                            {new Date(update.time).toLocaleString("fr-FR")}
                          </p>
                          <p className="text-dark-300">{update.message}</p>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Subscribe */}
        <section className="mt-12">
          <div className="card p-6 text-center">
            <Bell className="w-8 h-8 text-nemesis-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Restez informé</h3>
            <p className="text-dark-400 mb-4">
              Recevez des notifications en cas d'incident ou de maintenance.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="https://discord.nemesislauncher.fr"
                className="px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-lg transition"
              >
                Discord
              </a>
              <a
                href="https://twitter.com/nemesislauncher"
                className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition"
              >
                Twitter/X
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-700 py-8 px-6">
        <div className="max-w-4xl mx-auto text-center text-dark-400">
          <p>© 2024 Némésis Launcher. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
