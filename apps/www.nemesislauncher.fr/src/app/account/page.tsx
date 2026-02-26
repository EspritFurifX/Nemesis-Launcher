"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  User,
  Loader2,
  LogOut,
  ShoppingBag,
  Coins,
  Calendar,
  Shield,
  ExternalLink,
  Package,
  Sparkles,
  Gift,
  Settings,
  ChevronRight,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProfileSkeleton, StatCardSkeleton } from "@/components/Skeleton";

interface UserProfile {
  id: string;
  minecraftUsername: string;
  minecraftUuid: string;
  avatar?: string;
  balance: number;
  purchaseCount: number;
  memberSince: string;
}

export default function AccountPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      if (!data.authenticated) {
        router.push("/login");
        return;
      }

      setUser(data.user);
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/me", { method: "DELETE" });
      router.push("/");
    } catch {
      // Force redirect
      router.push("/");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-dark-950">
        <Header />
        <section className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Profile Skeleton */}
            <ProfileSkeleton />
            
            {/* Stats Skeleton */}
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  if (!user) {
    return null;
  }

  // Avatar URL from Minecraft
  const avatarUrl = `https://mc-heads.net/avatar/${user.minecraftUuid}/128`;

  return (
    <main className="min-h-screen bg-dark-950">
      <Header />

      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-900 border-4 border-dark-700 p-6 mb-6"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <Image
                  src={avatarUrl}
                  alt={user.minecraftUsername}
                  width={128}
                  height={128}
                  className="shadow-minecraft border-4 border-dark-600"
                />
                <div className="absolute -bottom-2 -right-2 p-1 bg-nemesis-500 border-2 border-nemesis-400">
                  <Shield className="w-4 h-4" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-black mb-1">
                  {user.minecraftUsername}
                </h1>
                <p className="text-dark-400 font-mono text-sm mb-4">
                  {user.minecraftUuid}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-nemesis-400" />
                    <span className="text-dark-300">
                      Membre depuis{" "}
                      {new Date(user.memberSince).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <a
                  href={`https://namemc.com/profile/${user.minecraftUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-dark-800 border-2 border-dark-700 text-dark-300 hover:text-white hover:bg-dark-700 transition-all text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  NameMC
                </a>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-minecraft-redstone/10 border-2 border-minecraft-redstone/30 text-minecraft-redstone hover:bg-minecraft-redstone/20 transition-all text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-dark-900 border-4 border-dark-700 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-minecraft-gold/20 border-2 border-minecraft-gold/30">
                  <Coins className="w-6 h-6 text-minecraft-gold" />
                </div>
                <div>
                  <p className="text-dark-400 text-sm">Crédits</p>
                  <p className="text-2xl font-black text-minecraft-gold">
                    {user.balance}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-dark-900 border-4 border-dark-700 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-nemesis-500/20 border-2 border-nemesis-500/30">
                  <Package className="w-6 h-6 text-nemesis-400" />
                </div>
                <div>
                  <p className="text-dark-400 text-sm">Achats</p>
                  <p className="text-2xl font-black">{user.purchaseCount}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-dark-900 border-4 border-dark-700 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-minecraft-diamond/20 border-2 border-minecraft-diamond/30">
                  <Sparkles className="w-6 h-6 text-minecraft-diamond" />
                </div>
                <div>
                  <p className="text-dark-400 text-sm">Rang</p>
                  <p className="text-2xl font-black text-minecraft-diamond">
                    Joueur
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Menu Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Shop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="group bg-dark-900 border-4 border-dark-700 hover:border-nemesis-500/50 p-6 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="p-3 bg-nemesis-500/20 border-2 border-nemesis-500/30 inline-block mb-4">
                    <ShoppingBag className="w-8 h-8 text-nemesis-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Boutique</h3>
                  <p className="text-dark-400 text-sm">
                    Achetez des cosmétiques, capes et accessoires pour
                    personnaliser votre personnage in-game.
                  </p>
                </div>
                <ChevronRight className="w-6 h-6 text-dark-600 group-hover:text-nemesis-400 transition-colors" />
              </div>
              <div className="mt-4 pt-4 border-t border-dark-700">
                <span className="text-xs text-minecraft-gold font-bold bg-minecraft-gold/10 px-2 py-1">
                  BIENTÔT DISPONIBLE
                </span>
              </div>
            </motion.div>

            {/* Credits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="group bg-dark-900 border-4 border-dark-700 hover:border-minecraft-gold/50 p-6 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="p-3 bg-minecraft-gold/20 border-2 border-minecraft-gold/30 inline-block mb-4">
                    <Coins className="w-8 h-8 text-minecraft-gold" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Acheter des Crédits</h3>
                  <p className="text-dark-400 text-sm">
                    Rechargez votre compte en crédits pour effectuer des achats
                    dans la boutique.
                  </p>
                </div>
                <ChevronRight className="w-6 h-6 text-dark-600 group-hover:text-minecraft-gold transition-colors" />
              </div>
              <div className="mt-4 pt-4 border-t border-dark-700">
                <span className="text-xs text-minecraft-gold font-bold bg-minecraft-gold/10 px-2 py-1">
                  BIENTÔT DISPONIBLE
                </span>
              </div>
            </motion.div>

            {/* Inventory */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="group bg-dark-900 border-4 border-dark-700 hover:border-minecraft-diamond/50 p-6 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="p-3 bg-minecraft-diamond/20 border-2 border-minecraft-diamond/30 inline-block mb-4">
                    <Gift className="w-8 h-8 text-minecraft-diamond" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Mon Inventaire</h3>
                  <p className="text-dark-400 text-sm">
                    Gérez vos cosmétiques et équipez vos items préférés.
                  </p>
                </div>
                <ChevronRight className="w-6 h-6 text-dark-600 group-hover:text-minecraft-diamond transition-colors" />
              </div>
              <div className="mt-4 pt-4 border-t border-dark-700">
                <span className="text-xs text-dark-500">
                  {user.purchaseCount} items
                </span>
              </div>
            </motion.div>

            {/* Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="group bg-dark-900 border-4 border-dark-700 hover:border-dark-500 p-6 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="p-3 bg-dark-700 border-2 border-dark-600 inline-block mb-4">
                    <Settings className="w-8 h-8 text-dark-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Paramètres</h3>
                  <p className="text-dark-400 text-sm">
                    Gérez vos préférences, notifications et données personnelles.
                  </p>
                </div>
                <ChevronRight className="w-6 h-6 text-dark-600 group-hover:text-white transition-colors" />
              </div>
              <div className="mt-4 pt-4 border-t border-dark-700">
                <Link
                  href="/privacy"
                  className="text-xs text-nemesis-400 hover:underline"
                >
                  Politique de confidentialité →
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Link to Launcher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 p-6 bg-gradient-to-r from-nemesis-900/50 to-dark-900 border-4 border-nemesis-500/30"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">
                  Téléchargez Nemesis Launcher
                </h3>
                <p className="text-dark-400 text-sm">
                  Connectez-vous avec ce même compte dans le launcher pour
                  accéder à vos cosmétiques.
                </p>
              </div>
              <Link
                href="/download"
                className="px-6 py-3 bg-nemesis-500 border-4 border-nemesis-400 text-white font-black hover:bg-nemesis-600 transition-all whitespace-nowrap shadow-minecraft"
              >
                TÉLÉCHARGER
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
