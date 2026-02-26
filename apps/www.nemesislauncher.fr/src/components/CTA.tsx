"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-nemesis-500/10 to-dark-950" />
      <div className="absolute inset-0 bg-block-pattern opacity-30" />
      
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-nemesis-500/20 rounded-full blur-[150px]" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-dark-900/80 backdrop-blur border-4 border-nemesis-500/30 p-8 sm:p-12 lg:p-16 shadow-minecraft-lg text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Logo */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Image
              src="/logo.jpg"
              alt="Nemesis Launcher"
              width={100}
              height={100}
              className="mx-auto shadow-minecraft-lg"
            />
          </motion.div>

          {/* Title */}
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-white">Prêt à rejoindre </span>
            <span className="text-nemesis-400">Nemesis</span>
            <span className="text-white"> ?</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-xl text-dark-300 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Téléchargez le launcher nouvelle génération et commencez à jouer dès aujourd'hui.
            C'est gratuit, sécurisé et ultra-rapide.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link
              href="/download"
              className="btn-primary text-lg px-8 py-4 animate-pulse-glow flex items-center gap-3 group"
            >
              <FontAwesomeIcon icon={faDownload} className="w-5 h-5" />
              Télécharger maintenant
              <FontAwesomeIcon 
                icon={faArrowRight} 
                className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
              />
            </Link>
            <Link
              href="#features"
              className="btn-secondary text-lg px-8 py-4"
            >
              En savoir plus
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="mt-10 pt-8 border-t-2 border-dark-700 flex flex-wrap items-center justify-center gap-6 text-sm text-dark-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-minecraft-grass" />
              <span>100% Gratuit</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-minecraft-diamond" />
              <span>Sans publicité</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-nemesis-400" />
              <span>Mises à jour régulières</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
