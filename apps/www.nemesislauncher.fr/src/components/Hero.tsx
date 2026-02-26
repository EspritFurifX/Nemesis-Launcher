"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Pickaxe } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faBell } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

// Pre-generated particle positions for SSR consistency (avoid Math.random on render)
const PARTICLE_POSITIONS = [
  { left: 12, top: 8 }, { left: 85, top: 15 }, { left: 45, top: 22 },
  { left: 78, top: 35 }, { left: 23, top: 45 }, { left: 67, top: 55 },
  { left: 34, top: 68 }, { left: 91, top: 72 }, { left: 8, top: 82 },
  { left: 56, top: 88 }, { left: 42, top: 12 }, { left: 73, top: 42 },
];

// Minecraft block component - memoized
const MinecraftBlock = memo(function MinecraftBlock({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <motion.div
      className={`w-8 h-8 ${color} shadow-minecraft`}
      style={{ imageRendering: "pixelated" }}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
});

// Particle component - memoized
const Particle = memo(function Particle({ left, top, index }: { left: number; top: number; index: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-nemesis-400"
      style={{ left: `${left}%`, top: `${top}%` }}
      animate={{
        y: [0, -40, 0],
        opacity: [0.2, 1, 0.2],
      }}
      transition={{
        duration: 2.5 + (index % 3) * 0.5,
        repeat: Infinity,
        delay: index * 0.15,
      }}
    />
  );
});

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-block-pattern">
      {/* Background gradient with Minecraft colors */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-nemesis-500/10 via-transparent to-transparent" />
      
      {/* Floating Minecraft blocks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%]">
          <MinecraftBlock color="bg-minecraft-grass" delay={0} />
        </div>
        <div className="absolute top-40 right-[15%]">
          <MinecraftBlock color="bg-minecraft-diamond" delay={0.5} />
        </div>
        <div className="absolute top-60 left-[20%]">
          <MinecraftBlock color="bg-nemesis-500" delay={1} />
        </div>
        <div className="absolute bottom-40 right-[25%]">
          <MinecraftBlock color="bg-minecraft-gold" delay={1.5} />
        </div>
        <div className="absolute bottom-60 left-[30%]">
          <MinecraftBlock color="bg-minecraft-stone" delay={2} />
        </div>
      </div>

      {/* Pixel particles - optimized with pre-generated positions */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLE_POSITIONS.map((pos, i) => (
          <Particle key={i} left={pos.left} top={pos.top} index={i} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge - Minecraft style */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-dark-800 border-2 border-nemesis-500/50 mb-8 shadow-minecraft"
            whileHover={{ scale: 1.05 }}
          >
            <Pickaxe className="w-4 h-4 text-nemesis-400" />
            <span className="text-sm text-nemesis-300 font-bold uppercase tracking-wider">
              En développement
            </span>
          </motion.div>

          {/* Logo/Name */}
          <motion.div
            className="mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo Image */}
            <div className="mb-4 flex justify-center">
              <Image
                src="/logo.jpg"
                alt="Nemesis Launcher"
                width={150}
                height={150}
                className="shadow-minecraft-lg"
                priority
              />
            </div>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight">
              <span className="text-white text-shadow-minecraft">NEMESIS</span>
            </h1>
            <div className="text-2xl sm:text-3xl font-bold text-nemesis-400 uppercase tracking-[0.3em] mt-2">
              Launcher
            </div>
          </motion.div>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl text-dark-300 max-w-2xl mx-auto mb-10 text-balance">
            Le launcher <span className="text-nemesis-400 font-bold">Minecraft</span> nouvelle génération.
            <br />
            <span className="text-dark-400">Sécurisé. Rapide. Moderne.</span>
          </p>

          {/* CTA Buttons - Minecraft style */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="/download"
              className="btn-primary text-lg px-8 py-4 animate-pulse-glow flex items-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <FontAwesomeIcon icon={faDownload} className="w-5 h-5" /> Télécharger
            </motion.a>
            <motion.a
              href="#newsletter"
              className="btn-secondary text-lg px-8 py-4 flex items-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <FontAwesomeIcon icon={faBell} className="w-5 h-5" /> Être notifié
            </motion.a>
          </div>

          {/* Stats preview */}
          <div className="mt-16 flex items-center justify-center gap-8 text-dark-400">
            <div className="text-center">
              <div className="text-2xl font-bold text-nemesis-400">100%</div>
              <div className="text-sm">Gratuit</div>
            </div>
            <div className="w-px h-8 bg-dark-700" />
            <div className="text-center">
              <div className="text-2xl font-bold text-minecraft-diamond">MS Auth</div>
              <div className="text-sm">Sécurisé</div>
            </div>
            <div className="w-px h-8 bg-dark-700" />
            <div className="text-center">
              <div className="text-2xl font-bold text-minecraft-grass">Custom</div>
              <div className="text-sm">Clients</div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <a href="#features" className="text-dark-400 hover:text-nemesis-400 transition-colors">
            <ArrowDown className="w-6 h-6" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
