"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";
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
    title: "Auth Microsoft",
    description:
      "Connexion sécurisée via Microsoft OAuth 2.0 avec PKCE. Vos identifiants restent protégés.",
    color: "bg-minecraft-diamond",
    borderColor: "border-minecraft-diamond/30",
  },
  {
    icon: Lock,
    title: "Vérification Licence",
    description:
      "Seuls les propriétaires légitimes de Minecraft peuvent jouer. Support Game Pass inclus.",
    color: "bg-nemesis-500",
    borderColor: "border-nemesis-500/30",
  },
  {
    icon: RefreshCw,
    title: "Auto-Update",
    description:
      "Le launcher se met à jour automatiquement. Toujours la dernière version sans effort.",
    color: "bg-minecraft-gold",
    borderColor: "border-minecraft-gold/30",
  },
  {
    icon: Zap,
    title: "Performance",
    description:
      "Construit avec Electron et React. Téléchargements parallèles et cache intelligent.",
    color: "bg-minecraft-redstone",
    borderColor: "border-minecraft-redstone/30",
  },
  {
    icon: Palette,
    title: "Interface Moderne",
    description:
      "Design sombre et élégant. Animations fluides et expérience utilisateur soignée.",
    color: "bg-minecraft-grass",
    borderColor: "border-minecraft-grass/30",
  },
  {
    icon: Server,
    title: "Multi-Serveurs",
    description:
      "Gérez plusieurs configurations. Changez de serveur en un clic avec vos mods préférés.",
    color: "bg-minecraft-obsidian",
    borderColor: "border-purple-500/30",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 relative bg-block-pattern">
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
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-dark-800 border-2 border-nemesis-500/30 mb-4 shadow-minecraft">
            <FontAwesomeIcon icon={faShieldHalved} className="w-4 h-4 text-nemesis-400" />
            <span className="text-nemesis-400 font-bold uppercase tracking-wider text-sm">
              Fonctionnalités
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 text-shadow-minecraft">
            <span className="text-white">Tout ce qu'il </span>
            <span className="text-nemesis-400">vous faut</span>
          </h2>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto">
            Une expérience Minecraft parfaite, du téléchargement au jeu.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`group relative p-6 lg:p-8 bg-dark-800/80 border-2 ${feature.borderColor} shadow-minecraft hover:shadow-minecraft-lg transition-all duration-200`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              {/* Icon - Block style */}
              <div
                className={`inline-flex p-3 ${feature.color} shadow-minecraft mb-5`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-dark-300 leading-relaxed">
                {feature.description}
              </p>

              {/* Corner decoration */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-dark-600" />
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-dark-600" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
