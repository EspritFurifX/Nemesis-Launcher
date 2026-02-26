"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Rocket,
  Shield,
  Download,
  Settings,
  Code,
  HelpCircle,
  ChevronRight,
  Search,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { DOCS_SECTIONS, DOCS_CONTENT, getAllDocSlugs } from "@/lib/docs-content";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket,
  BookOpen,
  Settings,
  Shield,
  Code,
  HelpCircle,
};

export default function DocsHomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredResults = searchQuery.length > 2 
    ? getAllDocSlugs().filter(slug => {
        const doc = DOCS_CONTENT[slug];
        return doc && (
          doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-dark-950">
      {/* Header */}
      <header className="border-b border-dark-700 bg-dark-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/logo.jpg"
                  alt="Némésis Launcher"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <div>
                  <h1 className="text-xl font-bold text-white">Documentation</h1>
                  <p className="text-sm text-dark-400">Némésis Launcher</p>
                </div>
              </Link>
            </div>

            <nav className="flex items-center gap-4">
              <a href="https://nemesislauncher.fr" className="text-dark-400 hover:text-white transition">
                Site web
              </a>
              <a href="https://cdn.nemesislauncher.fr" className="px-4 py-2 bg-nemesis-500 hover:bg-nemesis-600 text-white rounded-lg transition">
                Télécharger
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-b from-dark-900 to-dark-950">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Documentation <span className="text-nemesis-400">Némésis Launcher</span>
          </h1>
          <p className="text-xl text-dark-400 mb-10">
            Tout ce que vous devez savoir pour installer, configurer et utiliser Némésis Launcher.
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-dark-500" />
            <input
              type="text"
              placeholder="Rechercher dans la documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder:text-dark-500 focus:border-nemesis-500 focus:outline-none focus:ring-2 focus:ring-nemesis-500/20"
            />
            
            {/* Search Results */}
            {filteredResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-dark-800 border border-dark-700 rounded-xl overflow-hidden shadow-xl z-50">
                {filteredResults.slice(0, 5).map((slug) => {
                  const doc = DOCS_CONTENT[slug];
                  return (
                    <Link
                      key={slug}
                      href={`/${slug}`}
                      className="block px-4 py-3 hover:bg-dark-700 transition border-b border-dark-700 last:border-0"
                    >
                      <div className="font-medium text-white">{doc.title}</div>
                      <div className="text-sm text-dark-400 truncate">{doc.description}</div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 px-6 border-b border-dark-700">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <Link 
              href="/introduction"
              className="group p-6 bg-dark-900 rounded-xl border border-dark-700 hover:border-nemesis-500 transition"
            >
              <Rocket className="w-8 h-8 text-nemesis-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-nemesis-400 transition">
                Démarrage rapide
              </h3>
              <p className="text-dark-400 text-sm">
                Installez et configurez Némésis Launcher en quelques minutes.
              </p>
            </Link>

            <Link 
              href="/connexion-microsoft"
              className="group p-6 bg-dark-900 rounded-xl border border-dark-700 hover:border-nemesis-500 transition"
            >
              <Shield className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-nemesis-400 transition">
                Authentification
              </h3>
              <p className="text-dark-400 text-sm">
                Connectez-vous de manière sécurisée avec Microsoft.
              </p>
            </Link>

            <Link 
              href="/faq"
              className="group p-6 bg-dark-900 rounded-xl border border-dark-700 hover:border-nemesis-500 transition"
            >
              <HelpCircle className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-nemesis-400 transition">
                FAQ
              </h3>
              <p className="text-dark-400 text-sm">
                Trouvez rapidement des réponses à vos questions.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* All Sections */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Explorer la documentation</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DOCS_SECTIONS.map((section) => {
              const Icon = ICON_MAP[section.icon] || BookOpen;
              return (
                <div key={section.title} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-dark-800 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-nemesis-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                  </div>
                  
                  <ul className="space-y-2 pl-13">
                    {section.items.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/${item.slug}`}
                          className="flex items-center gap-2 text-dark-400 hover:text-white transition py-1 group"
                        >
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* External Links */}
      <section className="py-12 px-6 bg-dark-900 border-t border-dark-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-6">Liens utiles</h2>
          
          <div className="flex flex-wrap gap-4">
            <a 
              href="https://cdn.nemesislauncher.fr"
              className="flex items-center gap-2 px-4 py-2 bg-dark-800 rounded-lg text-dark-300 hover:text-white transition"
            >
              <Download className="w-4 h-4" />
              Télécharger
              <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://status.nemesislauncher.fr"
              className="flex items-center gap-2 px-4 py-2 bg-dark-800 rounded-lg text-dark-300 hover:text-white transition"
            >
              État des services
              <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://discord.nemesislauncher.fr"
              className="flex items-center gap-2 px-4 py-2 bg-dark-800 rounded-lg text-dark-300 hover:text-white transition"
            >
              Discord
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-700 py-6 px-6">
        <div className="max-w-7xl mx-auto text-center text-dark-500 text-sm">
          <p>© 2024-2026 Némésis Launcher. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
