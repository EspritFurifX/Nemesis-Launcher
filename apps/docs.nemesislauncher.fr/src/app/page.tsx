"use client";

import { useState } from "react";
import Link from "next/link";
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
  Menu,
  X,
} from "lucide-react";

const DOCS_SECTIONS = [
  {
    title: "Démarrage",
    icon: Rocket,
    items: [
      { title: "Introduction", slug: "introduction" },
      { title: "Installation", slug: "installation" },
      { title: "Premier lancement", slug: "premier-lancement" },
      { title: "Configuration requise", slug: "configuration-requise" },
    ],
  },
  {
    title: "Guide d'utilisation",
    icon: BookOpen,
    items: [
      { title: "Connexion Microsoft", slug: "connexion-microsoft" },
      { title: "Lancer Minecraft", slug: "lancer-minecraft" },
      { title: "Gestion des profils", slug: "gestion-profils" },
      { title: "Paramètres", slug: "parametres" },
    ],
  },
  {
    title: "Fonctionnalités",
    icon: Settings,
    items: [
      { title: "Mises à jour automatiques", slug: "mises-a-jour" },
      { title: "Gestion de la mémoire", slug: "gestion-memoire" },
      { title: "Thèmes et apparence", slug: "themes" },
      { title: "Raccourcis clavier", slug: "raccourcis" },
    ],
  },
  {
    title: "Sécurité",
    icon: Shield,
    items: [
      { title: "Authentification PKCE", slug: "authentification-pkce" },
      { title: "Stockage sécurisé", slug: "stockage-securise" },
      { title: "Confidentialité", slug: "confidentialite" },
    ],
  },
  {
    title: "Développeurs",
    icon: Code,
    items: [
      { title: "API Reference", slug: "api-reference" },
      { title: "Contribuer", slug: "contribuer" },
      { title: "Architecture", slug: "architecture" },
      { title: "Build from source", slug: "build-source" },
    ],
  },
  {
    title: "Aide",
    icon: HelpCircle,
    items: [
      { title: "FAQ", slug: "faq" },
      { title: "Dépannage", slug: "depannage" },
      { title: "Contact support", slug: "contact" },
    ],
  },
];

const DOCS_CONTENT: Record<string, { title: string; content: string }> = {
  introduction: {
    title: "Introduction",
    content: `
# Bienvenue sur Némésis Launcher

Némésis Launcher est un launcher Minecraft moderne, sécurisé et performant. Conçu avec les dernières technologies, il offre une expérience utilisateur fluide et intuitive.

## Pourquoi Némésis ?

- **Sécurité** : Authentification Microsoft avec PKCE, stockage sécurisé des tokens
- **Performance** : Application légère et rapide, mises à jour incrémentales
- **Simplicité** : Interface moderne et intuitive
- **Gratuit** : Téléchargement et utilisation gratuits

## Fonctionnalités principales

1. **Authentification Microsoft** : Connexion sécurisée avec votre compte Microsoft
2. **Mises à jour automatiques** : Toujours à jour sans intervention manuelle
3. **Multi-plateforme** : Windows, macOS et Linux supportés
4. **Personnalisation** : Thèmes, paramètres de mémoire, etc.

## Prérequis

- Un compte Microsoft avec Minecraft Java Edition
- Windows 10+, macOS 11+ ou Linux (Ubuntu 20.04+)
- Connexion internet pour l'authentification
    `,
  },
  installation: {
    title: "Installation",
    content: `
# Installation

## Téléchargement

Rendez-vous sur [cdn.nemesislauncher.fr](https://cdn.nemesislauncher.fr) pour télécharger la dernière version.

## Windows

1. Téléchargez \`Nemesis-Launcher-Setup.exe\`
2. Exécutez l'installateur
3. Suivez les instructions à l'écran
4. Lancez Némésis Launcher depuis le menu Démarrer

## macOS

1. Téléchargez \`Nemesis-Launcher.dmg\`
2. Ouvrez le fichier DMG
3. Glissez l'application dans le dossier Applications
4. Lancez depuis le Launchpad ou Spotlight

> **Note** : Au premier lancement, macOS peut demander une confirmation de sécurité. Allez dans Préférences Système > Sécurité pour autoriser l'application.

## Linux

1. Téléchargez \`Nemesis-Launcher.AppImage\`
2. Rendez le fichier exécutable : \`chmod +x Nemesis-Launcher.AppImage\`
3. Exécutez : \`./Nemesis-Launcher.AppImage\`

### Dépendances Linux

\`\`\`bash
# Ubuntu/Debian
sudo apt install libfuse2 libgtk-3-0

# Fedora
sudo dnf install fuse-libs gtk3
\`\`\`
    `,
  },
  "connexion-microsoft": {
    title: "Connexion Microsoft",
    content: `
# Connexion avec Microsoft

Némésis Launcher utilise l'authentification officielle Microsoft/Xbox Live pour accéder à Minecraft.

## Processus de connexion

1. Cliquez sur "Se connecter avec Microsoft"
2. Une fenêtre de navigateur s'ouvre
3. Connectez-vous avec votre compte Microsoft
4. Autorisez l'accès à Xbox Live
5. Vous êtes automatiquement redirigé vers le launcher

## Sécurité

- Nous utilisons le protocole **OAuth2 avec PKCE** pour une sécurité maximale
- Vos identifiants ne transitent jamais par nos serveurs
- Les tokens sont stockés de manière sécurisée sur votre machine

## Résolution de problèmes

### "Ce compte ne possède pas Minecraft"

Assurez-vous que :
- Vous utilisez le bon compte Microsoft
- Minecraft Java Edition est bien associé à ce compte
- Vérifiez sur [minecraft.net/profile](https://minecraft.net/profile)

### La fenêtre de connexion ne s'ouvre pas

1. Vérifiez votre connexion internet
2. Désactivez temporairement votre antivirus/pare-feu
3. Essayez de relancer le launcher en administrateur
    `,
  },
  "authentification-pkce": {
    title: "Authentification PKCE",
    content: `
# Authentification PKCE

PKCE (Proof Key for Code Exchange) est une extension du protocole OAuth2 qui renforce la sécurité de l'authentification.

## Comment ça fonctionne ?

1. **Génération du Code Verifier** : Un code aléatoire de 32 bytes est généré
2. **Création du Code Challenge** : Hash SHA-256 du verifier, encodé en base64url
3. **Requête d'autorisation** : Le challenge est envoyé à Microsoft
4. **Échange du code** : Le verifier original est utilisé pour valider l'échange

## Avantages

- **Pas de secret client** : Idéal pour les applications desktop
- **Protection contre l'interception** : Le code ne peut pas être réutilisé sans le verifier
- **Recommandé par Microsoft** : Standard pour les applications publiques

## Implémentation

\`\`\`typescript
// Génération PKCE
function generateCodeVerifier(): string {
  return crypto.randomBytes(32).toString("base64url");
}

function generateCodeChallenge(verifier: string): string {
  return crypto
    .createHash("sha256")
    .update(verifier)
    .digest("base64url");
}
\`\`\`

## Flux complet

1. Microsoft OAuth2 → Access Token
2. Xbox Live User Auth → XBL Token
3. Xbox Live XSTS → XSTS Token
4. Minecraft Services → Minecraft Access Token
    `,
  },
  faq: {
    title: "FAQ",
    content: `
# Questions fréquentes

## Général

### Némésis Launcher est-il gratuit ?
Oui, Némésis Launcher est entièrement gratuit.

### Ai-je besoin d'un compte Minecraft ?
Oui, vous devez posséder Minecraft Java Edition sur votre compte Microsoft.

### Sur quelles plateformes est disponible Némésis ?
Windows 10/11, macOS 11+ et Linux (Ubuntu 20.04+, Fedora 34+).

## Technique

### Puis-je utiliser Némésis avec d'autres launchers ?
Oui, chaque launcher utilise son propre dossier de configuration.

### Où sont stockés les fichiers de jeu ?
Dans le dossier standard Minecraft de votre système d'exploitation.

### Comment mettre à jour le launcher ?
Les mises à jour sont automatiques. Le launcher vérifie et installe les nouvelles versions au démarrage.

## Sécurité

### Mes identifiants sont-ils en sécurité ?
Oui, nous utilisons PKCE et le stockage sécurisé du système d'exploitation (Keychain sur macOS, Credential Manager sur Windows).

### Le launcher est-il open source ?
Non, Némésis Launcher est un logiciel propriétaire. Le code source est visible sur GitHub pour la transparence, mais son utilisation, copie ou modification est interdite sans autorisation.

## Support

### Comment signaler un bug ?
Ouvrez une issue sur notre GitHub ou contactez-nous sur Discord.

### Où trouver de l'aide ?
- Documentation : docs.nemesislauncher.fr
- Discord : discord.nemesislauncher.fr
- Email : contact@nemesislauncher.fr
    `,
  },
};

export default function DocsPage() {
  const [currentDoc, setCurrentDoc] = useState("introduction");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const currentContent = DOCS_CONTENT[currentDoc] || DOCS_CONTENT.introduction;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-dark-700 bg-dark-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-dark-800 rounded-lg"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-nemesis-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold">Documentation</h1>
                  <p className="text-sm text-dark-400">Némésis Launcher</p>
                </div>
              </Link>
            </div>

            {/* Search */}
            <div className="hidden md:flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-sm w-64 focus:border-nemesis-500 focus:outline-none"
                />
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-4">
              <a href="https://nemesislauncher.fr" className="text-dark-400 hover:text-white transition">
                Site web
              </a>
              <a href="https://github.com/nemesis-launcher" className="text-dark-400 hover:text-white transition">
                GitHub
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`w-72 bg-dark-900 border-r border-dark-700 overflow-y-auto fixed lg:sticky top-16 h-[calc(100vh-4rem)] transition-transform z-40 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <nav className="p-4 space-y-6">
            {DOCS_SECTIONS.map((section) => (
              <div key={section.title}>
                <div className="flex items-center gap-2 px-4 py-2 text-dark-500 text-sm font-semibold uppercase tracking-wider">
                  <section.icon className="w-4 h-4" />
                  {section.title}
                </div>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <button
                      key={item.slug}
                      onClick={() => {
                        setCurrentDoc(item.slug);
                        setSidebarOpen(false);
                      }}
                      className={`w-full text-left sidebar-item flex items-center justify-between ${
                        currentDoc === item.slug ? "active" : ""
                      }`}
                    >
                      {item.title}
                      {currentDoc === item.slug && (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-8 lg:p-12 max-w-4xl">
          <article className="prose">
            <div dangerouslySetInnerHTML={{ __html: formatMarkdown(currentContent.content) }} />
          </article>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-dark-700">
            <a href="#" className="text-dark-400 hover:text-white transition">
              ← Page précédente
            </a>
            <a href="#" className="text-nemesis-400 hover:text-nemesis-300 transition">
              Page suivante →
            </a>
          </div>
        </main>

        {/* Table of Contents */}
        <aside className="hidden xl:block w-64 p-6 border-l border-dark-700">
          <h4 className="text-sm font-semibold text-dark-500 uppercase tracking-wider mb-4">
            Sur cette page
          </h4>
          <nav className="space-y-2 text-sm">
            {extractHeadings(currentContent.content).map((heading, index) => (
              <a
                key={index}
                href={`#${heading.slug}`}
                className={`block text-dark-400 hover:text-white transition ${
                  heading.level === 2 ? "" : "pl-4"
                }`}
              >
                {heading.text}
              </a>
            ))}
          </nav>
        </aside>
      </div>

      {/* Footer */}
      <footer className="border-t border-dark-700 py-6 px-6">
        <div className="max-w-7xl mx-auto text-center text-dark-500 text-sm">
          <p>© 2024 Némésis Launcher. Documentation sous licence CC BY 4.0.</p>
        </div>
      </footer>
    </div>
  );
}

// Helper functions
function formatMarkdown(content: string): string {
  return content
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/^\> (.*$)/gm, '<blockquote>$1</blockquote>')
    .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');
}

function extractHeadings(content: string): { level: number; text: string; slug: string }[] {
  const headings: { level: number; text: string; slug: string }[] = [];
  const regex = /^(#{2,3}) (.*)$/gm;
  let match;

  while ((match = regex.exec(content)) !== null) {
    headings.push({
      level: match[1].length,
      text: match[2],
      slug: match[2].toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    });
  }

  return headings;
}
