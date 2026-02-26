"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  Circle, 
  Rocket, 
  Sparkles, 
  Shield, 
  Users, 
  Palette, 
  Server,
  MessageSquare,
  Zap,
  Globe,
  Wrench
} from "lucide-react";

type Status = "completed" | "in-progress" | "planned";

interface RoadmapItem {
  title: string;
  description: string;
  status: Status;
  icon: React.ComponentType<{ className?: string }>;
}

interface RoadmapPhase {
  phase: string;
  title: string;
  period: string;
  status: Status;
  items: RoadmapItem[];
}

const roadmap: RoadmapPhase[] = [
  {
    phase: "Phase 1",
    title: "Fondations",
    period: "Q4 2024 - Q1 2025",
    status: "completed",
    items: [
      {
        title: "Architecture de base",
        description: "Structure du projet, configuration Electron, système de build",
        status: "completed",
        icon: Wrench,
      },
      {
        title: "Authentification Microsoft",
        description: "Connexion sécurisée via compte Microsoft/Xbox",
        status: "completed",
        icon: Shield,
      },
      {
        title: "Interface utilisateur",
        description: "Design moderne inspiré Minecraft avec thème sombre",
        status: "completed",
        icon: Palette,
      },
      {
        title: "Site web vitrine",
        description: "Site de présentation nemesislauncher.fr",
        status: "completed",
        icon: Globe,
      },
    ],
  },
  {
    phase: "Phase 2",
    title: "Fonctionnalités Core",
    period: "Q2 2025",
    status: "in-progress",
    items: [
      {
        title: "Lancement de Minecraft",
        description: "Téléchargement et lancement de toutes les versions",
        status: "in-progress",
        icon: Rocket,
      },
      {
        title: "Gestion des instances",
        description: "Création et gestion de profils de jeu multiples",
        status: "in-progress",
        icon: Server,
      },
      {
        title: "Support Forge/Fabric",
        description: "Installation automatique des mod loaders",
        status: "planned",
        icon: Zap,
      },
      {
        title: "Gestionnaire de mods",
        description: "Téléchargement et gestion des mods depuis CurseForge/Modrinth",
        status: "planned",
        icon: Sparkles,
      },
    ],
  },
  {
    phase: "Phase 3",
    title: "Beta Publique",
    period: "Q3 2025",
    status: "planned",
    items: [
      {
        title: "Programme Beta",
        description: "Ouverture de la beta aux premiers testeurs",
        status: "planned",
        icon: Users,
      },
      {
        title: "Système de cosmétiques",
        description: "Capes, skins personnalisés, particules exclusives",
        status: "planned",
        icon: Palette,
      },
      {
        title: "Serveur communautaire",
        description: "Serveur Minecraft officiel Nemesis",
        status: "planned",
        icon: Server,
      },
      {
        title: "Chat intégré",
        description: "Communication entre joueurs directement dans le launcher",
        status: "planned",
        icon: MessageSquare,
      },
    ],
  },
  {
    phase: "Phase 4",
    title: "Lancement & Au-delà",
    period: "Q4 2025+",
    status: "planned",
    items: [
      {
        title: "Version 1.0 stable",
        description: "Sortie officielle de Nemesis Launcher",
        status: "planned",
        icon: Rocket,
      },
      {
        title: "Boutique cosmétiques",
        description: "Marketplace pour acheter des contenus exclusifs",
        status: "planned",
        icon: Sparkles,
      },
      {
        title: "API publique",
        description: "API pour les développeurs et créateurs de contenu",
        status: "planned",
        icon: Wrench,
      },
      {
        title: "Applications mobiles",
        description: "App companion iOS/Android",
        status: "planned",
        icon: Globe,
      },
    ],
  },
];

const statusConfig: Record<Status, { icon: typeof CheckCircle; color: string; bg: string; label: string }> = {
  completed: {
    icon: CheckCircle,
    color: "text-minecraft-emerald",
    bg: "bg-minecraft-emerald/10 border-minecraft-emerald/30",
    label: "Terminé",
  },
  "in-progress": {
    icon: Clock,
    color: "text-minecraft-gold",
    bg: "bg-minecraft-gold/10 border-minecraft-gold/30",
    label: "En cours",
  },
  planned: {
    icon: Circle,
    color: "text-dark-400",
    bg: "bg-dark-800 border-dark-700",
    label: "Prévu",
  },
};

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-dark-950">
      <Header />

      <section className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-dark-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-nemesis-400/10 border-2 border-nemesis-400/30 mb-6">
              <Rocket className="w-4 h-4 text-nemesis-400" />
              <span className="text-nemesis-400 text-sm font-bold">En développement actif</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-4">
              <span className="text-nemesis-400">Roadmap</span> du projet
            </h1>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              Découvrez les fonctionnalités à venir et suivez l'évolution de Nemesis Launcher. 
              Cette roadmap est mise à jour régulièrement.
            </p>
          </motion.div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {Object.entries(statusConfig).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <div key={key} className="flex items-center gap-2 text-sm">
                  <Icon className={`w-4 h-4 ${config.color}`} />
                  <span className="text-dark-400">{config.label}</span>
                </div>
              );
            })}
          </motion.div>

          {/* Roadmap Phases */}
          <div className="space-y-8">
            {roadmap.map((phase, phaseIndex) => {
              const phaseConfig = statusConfig[phase.status];
              const PhaseIcon = phaseConfig.icon;

              return (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + phaseIndex * 0.1 }}
                  className="bg-dark-900 border-4 border-dark-700 overflow-hidden"
                >
                  {/* Phase Header */}
                  <div className={`p-4 border-b-4 border-dark-700 ${phase.status === "in-progress" ? "bg-minecraft-gold/5" : ""}`}>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`px-3 py-1 border-2 ${phaseConfig.bg}`}>
                          <span className={`text-sm font-bold ${phaseConfig.color}`}>{phase.phase}</span>
                        </div>
                        <div>
                          <h2 className="text-xl font-bold">{phase.title}</h2>
                          <p className="text-dark-400 text-sm">{phase.period}</p>
                        </div>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 border-2 ${phaseConfig.bg}`}>
                        <PhaseIcon className={`w-4 h-4 ${phaseConfig.color}`} />
                        <span className={`text-sm font-semibold ${phaseConfig.color}`}>{phaseConfig.label}</span>
                      </div>
                    </div>
                  </div>

                  {/* Phase Items */}
                  <div className="p-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      {phase.items.map((item, itemIndex) => {
                        const itemConfig = statusConfig[item.status];
                        const ItemStatusIcon = itemConfig.icon;
                        const ItemIcon = item.icon;

                        return (
                          <motion.div
                            key={item.title}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 + phaseIndex * 0.1 + itemIndex * 0.05 }}
                            className={`p-4 border-2 ${itemConfig.bg} relative`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-8 h-8 flex items-center justify-center ${item.status === "completed" ? "bg-minecraft-emerald/20" : "bg-dark-800"} border-2 border-dark-700 flex-shrink-0`}>
                                <ItemIcon className={`w-4 h-4 ${item.status === "completed" ? "text-minecraft-emerald" : "text-dark-400"}`} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-bold text-sm">{item.title}</h3>
                                  <ItemStatusIcon className={`w-3 h-3 ${itemConfig.color}`} />
                                </div>
                                <p className="text-dark-400 text-xs">{item.description}</p>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Feedback CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="bg-dark-900 border-4 border-dark-700 p-8">
              <h3 className="text-2xl font-black mb-2">
                Une idée de <span className="text-nemesis-400">fonctionnalité</span> ?
              </h3>
              <p className="text-dark-400 mb-6">
                Nous sommes à l'écoute de vos suggestions ! Rejoignez notre Discord pour partager vos idées.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="https://discord.nemesislauncher.fr"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#5865F2] hover:bg-[#4752c4] border-4 border-[#4752c4] font-bold transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                  Rejoindre Discord
                </Link>
                <Link
                  href="/support"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-dark-800 hover:bg-dark-700 border-4 border-dark-700 font-bold transition-colors"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center text-dark-500 text-sm mt-8"
          >
            * Cette roadmap est indicative et peut évoluer en fonction des priorités et des retours de la communauté.
          </motion.p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
