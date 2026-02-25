"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Zap,
  RefreshCw,
  Palette,
  Server,
  Lock,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Authentification Microsoft",
    description:
      "Connexion sécurisée via Microsoft OAuth 2.0 avec support PKCE. Vos identifiants ne transitent jamais par nos serveurs.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Lock,
    title: "Vérification des entitlements",
    description:
      "Seuls les propriétaires légitimes de Minecraft peuvent utiliser le launcher. Support du Game Pass inclus.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: RefreshCw,
    title: "Mises à jour automatiques",
    description:
      "Le launcher se met à jour automatiquement. Vous avez toujours la dernière version sans rien faire.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Performance optimisée",
    description:
      "Construit avec Electron et React pour une expérience fluide. Téléchargements parallèles et cache intelligent.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Palette,
    title: "Interface moderne",
    description:
      "Design sombre et élégant inspiré des standards actuels. Animations fluides et expérience utilisateur soignée.",
    gradient: "from-nemesis-500 to-nemesis-600",
  },
  {
    icon: Server,
    title: "Multi-serveurs",
    description:
      "Gérez plusieurs configurations de serveurs. Changez de serveur en un clic avec vos mods préférés.",
    gradient: "from-yellow-500 to-amber-500",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Fonctionnalités</span> puissantes
          </h2>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto">
            Tout ce dont vous avez besoin pour une expérience Minecraft parfaite.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative p-6 lg:p-8 rounded-2xl bg-dark-900/50 border border-dark-700/50 hover:border-nemesis-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Icon */}
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-5`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-dark-300 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-nemesis-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
