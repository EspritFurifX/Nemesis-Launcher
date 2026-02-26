"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Download, 
  Monitor, 
  Apple, 
  Terminal,
  CheckCircle,
  Clock,
  Shield,
  Zap,
  ArrowLeft,
  Loader2
} from "lucide-react";
import { DownloadCardSkeleton } from "@/components/Skeleton";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Types pour les releases
interface Release {
  version: string;
  date: string;
  changelog: string[];
  downloads: {
    windows?: { url: string; size: string };
    mac?: { url: string; size: string };
    linux?: { url: string; size: string };
  };
}

const platforms = [
  {
    id: "windows",
    name: "Windows",
    icon: Monitor,
    color: "bg-minecraft-diamond",
    extension: ".exe",
    requirements: "Windows 10/11 (64-bit)",
  },
  {
    id: "mac",
    name: "macOS",
    icon: Apple,
    color: "bg-dark-600",
    extension: ".dmg",
    requirements: "macOS 11+ (Intel & Apple Silicon)",
  },
  {
    id: "linux",
    name: "Linux",
    icon: Terminal,
    color: "bg-minecraft-grass",
    extension: ".AppImage",
    requirements: "Ubuntu 20.04+, Fedora 34+",
  },
];

const features = [
  { icon: Shield, text: "Authentification Microsoft sécurisée" },
  { icon: Zap, text: "Téléchargement ultra-rapide" },
  { icon: CheckCircle, text: "Mises à jour automatiques" },
];

export default function DownloadPage() {
  const [loading, setLoading] = useState(true);
  const [release, setRelease] = useState<Release | null>(null);

  useEffect(() => {
    fetchRelease();
  }, []);

  const fetchRelease = async () => {
    try {
      const res = await fetch("/api/releases");
      const data = await res.json();
      if (data.available && data.release) {
        setRelease(data.release);
      }
    } catch (err) {
      console.error("Error fetching release:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-dark-950">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.jpg"
              alt="Nemesis Launcher"
              width={100}
              height={100}
              className="shadow-minecraft-lg"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 text-shadow-minecraft">
            <span className="text-white">Télécharger </span>
            <span className="text-nemesis-400">Nemesis</span>
          </h1>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto">
            Choisissez votre plateforme et commencez à jouer en quelques clics.
          </p>
        </motion.div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <DownloadCardSkeleton />
            <DownloadCardSkeleton />
            <DownloadCardSkeleton />
          </div>
        )}

        {/* Status Banner */}
        {!loading && !release && (
          <motion.div
            className="mb-12 p-6 bg-minecraft-gold/10 border-4 border-minecraft-gold/30 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <Clock className="w-6 h-6 text-minecraft-gold" />
              <span className="text-xl font-bold text-minecraft-gold">
                Bientôt disponible
              </span>
            </div>
            <p className="text-dark-300">
              Le launcher est en cours de développement. 
              <Link href="/#newsletter" className="text-nemesis-400 hover:underline ml-1 font-bold">
                Inscrivez-vous
              </Link>
              {" "}pour être notifié dès la sortie !
            </p>
          </motion.div>
        )}

        {!loading && release && (
          <motion.div
            className="mb-12 p-4 bg-nemesis-500/10 border-4 border-nemesis-500/30 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-3">
              <CheckCircle className="w-5 h-5 text-nemesis-400" />
              <span className="text-nemesis-400 font-bold">
                Version {release.version} disponible
              </span>
              <span className="text-dark-400">
                — {release.date}
              </span>
            </div>
          </motion.div>
        )}

        {/* Download Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {platforms.map((platform, index) => {
            const download = release?.downloads[platform.id as keyof typeof release.downloads];
            const isAvailable = !!download;

            return (
              <motion.div
                key={platform.id}
                className={`relative p-6 bg-dark-900 border-4 ${
                  isAvailable ? "border-dark-700 hover:border-nemesis-500" : "border-dark-800"
                } transition-all`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                {/* Platform Icon */}
                <div className={`w-16 h-16 ${platform.color} shadow-minecraft flex items-center justify-center mb-4 mx-auto`}>
                  <platform.icon className="w-8 h-8 text-white" />
                </div>

                {/* Platform Name */}
                <h3 className="text-xl font-bold text-center mb-2">{platform.name}</h3>
                <p className="text-sm text-dark-400 text-center mb-4">
                  {platform.requirements}
                </p>

                {/* Download Button */}
                {isAvailable ? (
                  <a
                    href={download.url}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Télécharger
                    <span className="text-sm opacity-75">({download.size})</span>
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full px-6 py-3 bg-dark-800 border-2 border-dark-700 text-dark-500 font-bold cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Clock className="w-5 h-5" />
                    Bientôt
                  </button>
                )}

                {/* File extension badge */}
                <div className="absolute top-4 right-4 px-2 py-1 bg-dark-800 border border-dark-700 text-xs text-dark-400 font-mono">
                  {platform.extension}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Features */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 text-dark-300">
              <div className="w-8 h-8 bg-nemesis-500/20 flex items-center justify-center">
                <feature.icon className="w-4 h-4 text-nemesis-400" />
              </div>
              <span className="font-bold">{feature.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Changelog Section (only if release exists) */}
        {release && (
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              Nouveautés v{release.version}
            </h2>
            <div className="p-6 bg-dark-900 border-4 border-dark-700">
              <ul className="space-y-2">
                {release.changelog.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-dark-300">
                    <span className="text-nemesis-400 mt-1">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {/* System Requirements */}
        <motion.div
          className="mt-16 p-6 bg-dark-900/50 border-2 border-dark-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-lg font-bold mb-4 text-center">Configuration minimale</h3>
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-dark-400">
            <div className="text-center">
              <div className="font-bold text-white mb-1">Processeur</div>
              Intel Core i3 / AMD Ryzen 3
            </div>
            <div className="text-center">
              <div className="font-bold text-white mb-1">Mémoire</div>
              4 GB RAM minimum
            </div>
            <div className="text-center">
              <div className="font-bold text-white mb-1">Stockage</div>
              500 MB d'espace disponible
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
