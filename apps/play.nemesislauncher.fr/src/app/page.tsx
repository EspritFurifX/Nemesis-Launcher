"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Copy,
  Check,
  Gamepad2,
  Map,
  Sword,
  Shield,
  Crown,
  Sparkles,
  ExternalLink,
  MessageCircle,
  Zap,
} from "lucide-react";

const SERVER_IP = "play.nemesislauncher.fr";

const gameModes = [
  {
    name: "Survival",
    description: "Survie classique avec économie et claims",
    icon: Sword,
    players: "234",
    color: "green",
  },
  {
    name: "Créatif",
    description: "Plots créatifs avec WorldEdit",
    icon: Sparkles,
    players: "89",
    color: "blue",
  },
  {
    name: "Mini-jeux",
    description: "BedWars, SkyWars, et plus",
    icon: Gamepad2,
    players: "156",
    color: "purple",
  },
  {
    name: "Événements",
    description: "Événements communautaires hebdomadaires",
    icon: Crown,
    players: "45",
    color: "yellow",
  },
];

const features = [
  {
    title: "Anti-Cheat Performant",
    description: "Protection contre les cheaters avec notre système personnalisé",
    icon: Shield,
  },
  {
    title: "Carte Dynamique",
    description: "Explorez le monde avec notre carte en temps réel",
    icon: Map,
  },
  {
    title: "Économie Équilibrée",
    description: "Système économique réfléchi pour une expérience juste",
    icon: Zap,
  },
  {
    title: "Communauté Active",
    description: "Staff présent et communauté accueillante",
    icon: MessageCircle,
  },
];

const staff = [
  { name: "NemesisAdmin", role: "Fondateur", color: "red" },
  { name: "ModeratorX", role: "Admin", color: "orange" },
  { name: "HelperOne", role: "Modérateur", color: "green" },
  { name: "BuilderPro", role: "Buildeur", color: "blue" },
];

export default function PlayPage() {
  const [copied, setCopied] = useState(false);
  const [onlinePlayers, setOnlinePlayers] = useState(524);
  const [maxPlayers] = useState(1000);

  useEffect(() => {
    // Simulate player count fluctuation
    const interval = setInterval(() => {
      setOnlinePlayers((prev) => {
        const change = Math.floor(Math.random() * 10) - 5;
        return Math.max(400, Math.min(600, prev + change));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const copyIP = () => {
    navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-nemesis-500/20 via-transparent to-dark-950" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        <div className="relative max-w-6xl mx-auto px-6 py-8">
          {/* Nav */}
          <nav className="flex items-center justify-between mb-16">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.jpg"
                alt="Némésis"
                width={48}
                height={48}
                className="rounded-xl"
              />
              <div>
                <h1 className="text-xl font-bold text-white">Play</h1>
                <p className="text-sm text-dark-400">Serveur Minecraft</p>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <a
                href="https://nemesislauncher.fr"
                className="text-dark-400 hover:text-white transition"
              >
                Launcher
              </a>
              <a
                href="https://discord.gg/nemesis"
                className="flex items-center gap-2 px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] rounded-lg text-white text-sm transition"
              >
                <MessageCircle className="w-4 h-4" />
                Discord
              </a>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-sm mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Serveur en ligne
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Serveur Minecraft{" "}
              <span className="text-nemesis-400">Communautaire</span>
            </h2>

            <p className="text-xl text-dark-300 mb-8">
              Rejoignez la communauté Némésis ! Survival, créatif, mini-jeux et événements vous attendent.
            </p>

            {/* Server IP */}
            <div className="inline-flex flex-col items-center gap-4">
              <button
                onClick={copyIP}
                className="group flex items-center gap-3 px-6 py-4 bg-dark-800 hover:bg-dark-700 border border-dark-600 rounded-xl transition"
              >
                <span className="text-2xl font-mono font-bold text-white">
                  {SERVER_IP}
                </span>
                {copied ? (
                  <Check className="w-6 h-6 text-green-400" />
                ) : (
                  <Copy className="w-6 h-6 text-dark-400 group-hover:text-white transition" />
                )}
              </button>
              <p className="text-dark-500 text-sm">
                Cliquez pour copier l&apos;IP
              </p>
            </div>

            {/* Player Count */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <Users className="w-5 h-5 text-nemesis-400" />
              <span className="text-white font-semibold">{onlinePlayers}</span>
              <span className="text-dark-400">/ {maxPlayers} joueurs en ligne</span>
            </div>
          </div>
        </div>
      </header>

      {/* Game Modes */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-4">
            Modes de jeu
          </h3>
          <p className="text-dark-400 text-center mb-12 max-w-xl mx-auto">
            Choisissez votre aventure parmi nos différents modes de jeu
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {gameModes.map((mode) => (
              <div
                key={mode.name}
                className="bg-dark-900 border border-dark-700 rounded-xl p-6 hover:border-dark-600 transition group"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                    mode.color === "green"
                      ? "bg-green-500/20"
                      : mode.color === "blue"
                      ? "bg-blue-500/20"
                      : mode.color === "purple"
                      ? "bg-purple-500/20"
                      : "bg-yellow-500/20"
                  }`}
                >
                  <mode.icon
                    className={`w-7 h-7 ${
                      mode.color === "green"
                        ? "text-green-400"
                        : mode.color === "blue"
                        ? "text-blue-400"
                        : mode.color === "purple"
                        ? "text-purple-400"
                        : "text-yellow-400"
                    }`}
                  />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {mode.name}
                </h4>
                <p className="text-dark-400 text-sm mb-4">{mode.description}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-dark-500" />
                  <span className="text-dark-400">
                    {mode.players} joueurs
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-dark-900/50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-4">
            Pourquoi nous rejoindre ?
          </h3>
          <p className="text-dark-400 text-center mb-12 max-w-xl mx-auto">
            Une expérience Minecraft unique avec des fonctionnalités exclusives
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex gap-4 p-6 bg-dark-900 border border-dark-700 rounded-xl"
              >
                <div className="w-12 h-12 bg-nemesis-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-nemesis-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-dark-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Staff */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-4">
            Notre équipe
          </h3>
          <p className="text-dark-400 text-center mb-12 max-w-xl mx-auto">
            Une équipe passionnée à votre service
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {staff.map((member, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-3 bg-dark-900 border border-dark-700 rounded-xl"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    member.color === "red"
                      ? "bg-red-500/20"
                      : member.color === "orange"
                      ? "bg-orange-500/20"
                      : member.color === "green"
                      ? "bg-green-500/20"
                      : "bg-blue-500/20"
                  }`}
                >
                  <span
                    className={`font-bold ${
                      member.color === "red"
                        ? "text-red-400"
                        : member.color === "orange"
                        ? "text-orange-400"
                        : member.color === "green"
                        ? "text-green-400"
                        : "text-blue-400"
                    }`}
                  >
                    {member.name[0]}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium">{member.name}</p>
                  <p
                    className={`text-xs ${
                      member.color === "red"
                        ? "text-red-400"
                        : member.color === "orange"
                        ? "text-orange-400"
                        : member.color === "green"
                        ? "text-green-400"
                        : "text-blue-400"
                    }`}
                  >
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-nemesis-500/20 to-transparent border border-nemesis-500/30 rounded-2xl p-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Prêt à jouer ?
            </h3>
            <p className="text-dark-300 mb-8 max-w-lg mx-auto">
              Téléchargez Némésis Launcher et connectez-vous directement au serveur en un clic !
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://nemesislauncher.fr/download"
                className="flex items-center gap-2 px-8 py-4 bg-nemesis-500 hover:bg-nemesis-600 text-white rounded-xl font-medium transition"
              >
                Télécharger le Launcher
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={copyIP}
                className="flex items-center gap-2 px-8 py-4 bg-dark-800 hover:bg-dark-700 border border-dark-600 text-white rounded-xl font-medium transition"
              >
                {copied ? "IP Copiée !" : "Copier l'IP"}
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-700 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.jpg"
                alt="Némésis"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-dark-400">
                © 2026 Némésis Launcher
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-dark-500">
              <a href="https://nemesislauncher.fr/terms" className="hover:text-white transition">
                CGU
              </a>
              <a href="https://nemesislauncher.fr/support" className="hover:text-white transition">
                Support
              </a>
              <a href="https://discord.gg/nemesis" className="hover:text-white transition">
                Discord
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
