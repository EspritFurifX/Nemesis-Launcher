"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faUserCheck, faGamepad, faRocket } from "@fortawesome/free-solid-svg-icons";

const steps = [
  {
    number: "01",
    icon: faDownload,
    title: "Téléchargez",
    description: "Téléchargez le launcher Nemesis pour Windows, macOS ou Linux. L'installation est rapide et simple.",
    color: "bg-minecraft-diamond",
    borderColor: "border-minecraft-diamond",
  },
  {
    number: "02",
    icon: faUserCheck,
    title: "Connectez-vous",
    description: "Authentifiez-vous avec votre compte Microsoft. Votre licence Minecraft est automatiquement vérifiée.",
    color: "bg-nemesis-500",
    borderColor: "border-nemesis-500",
  },
  {
    number: "03",
    icon: faGamepad,
    title: "Configurez",
    description: "Choisissez votre serveur, vos mods et vos paramètres. Tout est personnalisable selon vos préférences.",
    color: "bg-minecraft-gold",
    borderColor: "border-minecraft-gold",
  },
  {
    number: "04",
    icon: faRocket,
    title: "Jouez !",
    description: "Lancez Minecraft en un clic. Les mises à jour sont automatiques, profitez simplement du jeu.",
    color: "bg-minecraft-grass",
    borderColor: "border-minecraft-grass",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 relative overflow-hidden bg-block-pattern">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-900" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-dark-800 border-2 border-minecraft-grass/30 mb-4 shadow-minecraft">
            <FontAwesomeIcon icon={faRocket} className="w-4 h-4 text-minecraft-grass" />
            <span className="text-minecraft-grass font-bold uppercase tracking-wider text-sm">
              Comment ça marche
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            <span className="text-white">Prêt en </span>
            <span className="text-nemesis-400">4 étapes</span>
          </h2>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto">
            Du téléchargement au jeu, tout est fait pour être simple et rapide.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line (desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-dark-700 -translate-y-1/2 z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-minecraft-diamond via-nemesis-500 to-minecraft-grass"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                {/* Card */}
                <div className="bg-dark-900 border-4 border-dark-700 p-6 shadow-minecraft hover:border-nemesis-500/50 transition-colors group">
                  {/* Number badge */}
                  <div className={`absolute -top-4 -left-2 ${step.color} w-12 h-12 flex items-center justify-center shadow-minecraft`}>
                    <span className="text-white font-black text-lg">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className={`${step.color} w-14 h-14 flex items-center justify-center shadow-minecraft mb-4 mt-4 mx-auto`}>
                    <FontAwesomeIcon icon={step.icon} className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-center mb-3 text-white">
                    {step.title}
                  </h3>
                  <p className="text-dark-300 text-center text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (except last) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <div className="w-8 h-8 bg-dark-800 border-2 border-dark-600 rotate-45" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
