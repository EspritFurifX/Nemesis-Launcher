import Link from "next/link";
import Image from "next/image";
import { Server, HardDrive, Shield, Globe } from "lucide-react";

export const metadata = {
  title: "Némésis CDN - Content Delivery Network",
  description: "CDN pour les fichiers et releases de Némésis Launcher",
};

export default function CDNPage() {
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <Image
            src="/logo.jpg"
            alt="Némésis Launcher"
            width={80}
            height={80}
            className="rounded-2xl mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold text-white mb-4">
            Némésis <span className="text-nemesis-400">CDN</span>
          </h1>
          <p className="text-dark-400 text-lg">
            Content Delivery Network pour Némésis Launcher
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid gap-4 mb-8">
          <div className="bg-dark-900 border border-dark-700 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Statut</h3>
                <p className="text-green-400">Opérationnel</p>
              </div>
            </div>
          </div>

          <div className="bg-dark-900 border border-dark-700 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-nemesis-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <HardDrive className="w-6 h-6 text-nemesis-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Fonction</h3>
                <p className="text-dark-400">
                  Ce serveur héberge les fichiers de release et les assets du launcher Némésis.
                  Les téléchargements sont gérés automatiquement par l&apos;application.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-dark-900 border border-dark-700 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Endpoints</h3>
                <ul className="text-dark-400 space-y-1 text-sm font-mono">
                  <li><code className="text-nemesis-400">/releases/</code> - Fichiers de release</li>
                  <li><code className="text-nemesis-400">/latest.yml</code> - Info dernière version</li>
                  <li><code className="text-nemesis-400">/latest-*.yml</code> - Info par plateforme</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-dark-900 border border-dark-700 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Sécurité</h3>
                <p className="text-dark-400">
                  Tous les fichiers sont signés et vérifiés. Les checksums SHA512 sont disponibles
                  pour chaque release.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="https://nemesislauncher.fr/download"
            className="px-6 py-3 bg-nemesis-500 hover:bg-nemesis-600 text-white rounded-lg text-center transition font-medium"
          >
            Télécharger le launcher
          </Link>
          <Link
            href="https://status.nemesislauncher.fr"
            className="px-6 py-3 bg-dark-800 hover:bg-dark-700 text-white rounded-lg text-center transition font-medium border border-dark-600"
          >
            Statut des services
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-dark-500 text-sm">
          <p>© 2024-2026 Némésis Launcher. Tous droits réservés.</p>
        </div>
      </div>
    </div>
  );
}
