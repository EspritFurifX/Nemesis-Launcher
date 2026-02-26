"use client";

import { useState, useEffect } from "react";
import { Download, CheckCircle, Clock, HardDrive, Monitor, Apple, Terminal } from "lucide-react";

interface Release {
  version: string;
  date: string;
  changelog: string[];
  downloads: {
    windows: { url: string; size: string; sha512: string };
    macos: { url: string; size: string; sha512: string };
    linux: { url: string; size: string; sha512: string };
  };
}

const RELEASES: Release[] = [
  {
    version: "1.0.0",
    date: "2024-02-01",
    changelog: [
      "Première version stable",
      "Authentification Microsoft PKCE",
      "Support Windows, macOS et Linux",
      "Mises à jour automatiques",
      "Interface moderne et intuitive",
    ],
    downloads: {
      windows: {
        url: "/releases/Nemesis-Launcher-1.0.0-Setup.exe",
        size: "85 MB",
        sha512: "abc123...",
      },
      macos: {
        url: "/releases/Nemesis-Launcher-1.0.0.dmg",
        size: "92 MB",
        sha512: "def456...",
      },
      linux: {
        url: "/releases/Nemesis-Launcher-1.0.0.AppImage",
        size: "88 MB",
        sha512: "ghi789...",
      },
    },
  },
];

const PLATFORMS = [
  {
    id: "windows",
    name: "Windows",
    icon: Monitor,
    description: "Windows 10/11 (64-bit)",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "macos",
    name: "macOS",
    icon: Apple,
    description: "macOS 11+ (Intel & Apple Silicon)",
    color: "from-gray-500 to-gray-600",
  },
  {
    id: "linux",
    name: "Linux",
    icon: Terminal,
    description: "Ubuntu 20.04+, Fedora 34+",
    color: "from-orange-500 to-orange-600",
  },
];

export default function CdnPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("windows");
  const [detectedPlatform, setDetectedPlatform] = useState<string>("windows");

  useEffect(() => {
    // Détecter la plateforme
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("win")) {
      setDetectedPlatform("windows");
      setSelectedPlatform("windows");
    } else if (userAgent.includes("mac")) {
      setDetectedPlatform("macos");
      setSelectedPlatform("macos");
    } else if (userAgent.includes("linux")) {
      setDetectedPlatform("linux");
      setSelectedPlatform("linux");
    }
  }, []);

  const latestRelease = RELEASES[0];
  const currentDownload = latestRelease.downloads[selectedPlatform as keyof typeof latestRelease.downloads];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-dark-700 bg-dark-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-nemesis-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Téléchargements</h1>
                <p className="text-sm text-dark-400">cdn.nemesislauncher.fr</p>
              </div>
            </div>
            <nav className="flex items-center gap-4">
              <a href="https://nemesislauncher.fr" className="text-dark-400 hover:text-white transition">
                Site web
              </a>
              <a href="https://docs.nemesislauncher.fr" className="text-dark-400 hover:text-white transition">
                Documentation
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Download Section */}
      <section className="py-16 px-6 border-b border-dark-700">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-nemesis-500/10 border border-nemesis-500/30 rounded-full mb-6">
            <CheckCircle className="w-4 h-4 text-nemesis-400" />
            <span className="text-nemesis-400 text-sm font-medium">Version {latestRelease.version} disponible</span>
          </div>

          <h2 className="text-4xl font-bold mb-4">
            Télécharger <span className="gradient-text">Némésis Launcher</span>
          </h2>
          <p className="text-dark-400 text-lg mb-8">
            Le launcher Minecraft nouvelle génération. Gratuit et sécurisé.
          </p>

          {/* Platform Selector */}
          <div className="flex justify-center gap-4 mb-8">
            {PLATFORMS.map((platform) => (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                  selectedPlatform === platform.id
                    ? "border-nemesis-500 bg-nemesis-500/10"
                    : "border-dark-700 bg-dark-800/50 hover:border-dark-600"
                }`}
              >
                <platform.icon className={`w-8 h-8 mb-2 ${
                  selectedPlatform === platform.id ? "text-nemesis-400" : "text-dark-400"
                }`} />
                <span className={`font-semibold ${
                  selectedPlatform === platform.id ? "text-white" : "text-dark-300"
                }`}>
                  {platform.name}
                </span>
                <span className="text-xs text-dark-500">{platform.description}</span>
                {detectedPlatform === platform.id && (
                  <span className="text-xs text-nemesis-400 mt-1">Détecté</span>
                )}
              </button>
            ))}
          </div>

          {/* Download Button */}
          <a
            href={currentDownload.url}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-nemesis-500 to-nemesis-600 hover:from-nemesis-600 hover:to-nemesis-700 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-nemesis-500/25"
          >
            <Download className="w-6 h-6" />
            Télécharger pour {PLATFORMS.find(p => p.id === selectedPlatform)?.name}
          </a>

          <div className="flex items-center justify-center gap-6 mt-4 text-dark-500 text-sm">
            <span className="flex items-center gap-2">
              <HardDrive className="w-4 h-4" />
              {currentDownload.size}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {new Date(latestRelease.date).toLocaleDateString("fr-FR")}
            </span>
          </div>
        </div>
      </section>

      {/* Changelog */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="w-2 h-8 bg-nemesis-500 rounded-full"></span>
            Nouveautés de la version {latestRelease.version}
          </h3>

          <div className="card p-6">
            <ul className="space-y-3">
              {latestRelease.changelog.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-nemesis-400 mt-0.5 flex-shrink-0" />
                  <span className="text-dark-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* System Requirements */}
          <h3 className="text-2xl font-bold mt-16 mb-8 flex items-center gap-3">
            <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
            Configuration requise
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6">
              <Monitor className="w-8 h-8 text-blue-400 mb-4" />
              <h4 className="font-semibold mb-2">Windows</h4>
              <ul className="text-dark-400 text-sm space-y-1">
                <li>Windows 10/11 (64-bit)</li>
                <li>4 GB RAM minimum</li>
                <li>200 MB espace disque</li>
                <li>Connexion internet</li>
              </ul>
            </div>
            <div className="card p-6">
              <Apple className="w-8 h-8 text-gray-400 mb-4" />
              <h4 className="font-semibold mb-2">macOS</h4>
              <ul className="text-dark-400 text-sm space-y-1">
                <li>macOS 11 Big Sur+</li>
                <li>Intel ou Apple Silicon</li>
                <li>4 GB RAM minimum</li>
                <li>200 MB espace disque</li>
              </ul>
            </div>
            <div className="card p-6">
              <Terminal className="w-8 h-8 text-orange-400 mb-4" />
              <h4 className="font-semibold mb-2">Linux</h4>
              <ul className="text-dark-400 text-sm space-y-1">
                <li>Ubuntu 20.04+ / Fedora 34+</li>
                <li>4 GB RAM minimum</li>
                <li>200 MB espace disque</li>
                <li>GTK 3 / libfuse2</li>
              </ul>
            </div>
          </div>

          {/* Checksums */}
          <h3 className="text-2xl font-bold mt-16 mb-8 flex items-center gap-3">
            <span className="w-2 h-8 bg-yellow-500 rounded-full"></span>
            Vérification d'intégrité
          </h3>

          <div className="card p-6">
            <p className="text-dark-400 mb-4">
              Vérifiez l'intégrité du fichier téléchargé avec le hash SHA-512 :
            </p>
            <div className="bg-dark-900 p-4 rounded-lg">
              <p className="text-dark-500 text-sm mb-1">SHA-512 ({PLATFORMS.find(p => p.id === selectedPlatform)?.name})</p>
              <code className="text-nemesis-400 text-sm break-all">{currentDownload.sha512}</code>
            </div>
          </div>
        </div>
      </section>

      {/* All Releases */}
      <section className="py-16 px-6 bg-dark-900/50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-8">Toutes les versions</h3>
          <div className="space-y-4">
            {RELEASES.map((release) => (
              <div key={release.version} className="card p-6 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-lg">v{release.version}</span>
                    {release === latestRelease && (
                      <span className="px-2 py-0.5 bg-nemesis-500/20 text-nemesis-400 text-xs rounded-full">
                        Dernière
                      </span>
                    )}
                  </div>
                  <p className="text-dark-500 text-sm">
                    {new Date(release.date).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a href={release.downloads.windows.url} className="btn-secondary text-sm py-2">
                    Windows
                  </a>
                  <a href={release.downloads.macos.url} className="btn-secondary text-sm py-2">
                    macOS
                  </a>
                  <a href={release.downloads.linux.url} className="btn-secondary text-sm py-2">
                    Linux
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-700 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center text-dark-400">
          <p>© 2024 Némésis Launcher. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
