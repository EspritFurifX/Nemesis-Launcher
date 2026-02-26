"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Heart, Target, Users, Sparkles, Gamepad2, Shield, Rocket } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "Créé par des passionnés de Minecraft pour des passionnés. Chaque fonctionnalité est pensée avec amour.",
    color: "text-minecraft-redstone",
  },
  {
    icon: Shield,
    title: "Sécurité",
    description: "La sécurité de vos données est notre priorité. Authentification Microsoft, chiffrement de bout en bout.",
    color: "text-nemesis-400",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "Nous repoussons constamment les limites pour offrir la meilleure expérience de jeu possible.",
    color: "text-minecraft-gold",
  },
  {
    icon: Users,
    title: "Communauté",
    description: "Une communauté au cœur du projet. Vos retours façonnent directement l'évolution du launcher.",
    color: "text-minecraft-emerald",
  },
];

const milestones = [
  {
    date: "2024",
    title: "Création par Nakmox",
    description: "Naissance de Nemesis Launcher. Le projet est lancé et ouvert au public.",
  },
  {
    date: "2024-2026",
    title: "Launcher opérationnel",
    description: "Nemesis Launcher fonctionne et reste accessible aux joueurs. Communauté active.",
  },
  {
    date: "Déc. 2025",
    title: "Reprise par Antoine",
    description: "Antoine reprend le projet et entame une refonte complète du launcher.",
  },
  {
    date: "2026",
    title: "Nouvelle version",
    description: "Sortie de la nouvelle version entièrement repensée de Nemesis Launcher.",
  },
];

const team = [
  {
    name: "Nakmox",
    role: "Fondateur original",
    avatar: "👑",
    description: "Créateur original de Nemesis Launcher. A posé les fondations du projet en 2024.",
  },
  {
    name: "Antoine",
    role: "Lead Developer & Propriétaire",
    avatar: "👨‍💻",
    description: "A repris le projet en décembre 2025 et réalisé la refonte complète du launcher. Propriétaire actuel.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-dark-950">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-dark-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-nemesis-400/10 border-2 border-nemesis-400/30 mb-6">
              <Target className="w-4 h-4 text-nemesis-400" />
              <span className="text-nemesis-400 text-sm font-bold">Notre Mission</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-6">
              À propos de <span className="text-nemesis-400">Nemesis</span>
            </h1>
            
            <p className="text-xl text-dark-300 leading-relaxed">
              Nemesis Launcher est né d'une vision simple : offrir aux joueurs de Minecraft 
              un launcher <span className="text-white font-semibold">moderne</span>, 
              <span className="text-white font-semibold"> performant</span> et 
              <span className="text-white font-semibold"> sécurisé</span>, 
              avec une expérience utilisateur exceptionnelle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-dark-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-black text-center mb-12"
          >
            Nos <span className="text-nemesis-400">Valeurs</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-900 border-4 border-dark-700 p-6 text-center hover:border-nemesis-400/30 transition-colors"
                >
                  <div className={`w-14 h-14 mx-auto mb-4 bg-dark-800 border-2 border-dark-700 flex items-center justify-center ${value.color}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-dark-400 text-sm">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-black mb-6">
                Notre <span className="text-nemesis-400">Histoire</span>
              </h2>
              
              <div className="space-y-4 text-dark-300">
                <p>
                  Tout a commencé par une frustration : les launchers Minecraft existants 
                  étaient soit obsolètes, soit trop compliqués, soit peu sécurisés.
                </p>
                <p>
                  Nemesis Launcher est né de cette volonté de faire mieux. Un launcher 
                  qui combine le meilleur de la technologie moderne avec une interface 
                  intuitive inspirée de l'univers Minecraft.
                </p>
                <p>
                  Aujourd'hui, nous travaillons dur pour créer l'expérience de jeu 
                  ultime, avec des fonctionnalités innovantes comme la gestion avancée 
                  des mods, les cosmétiques exclusifs et une communauté engagée.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-dark-800 border-2 border-dark-700">
                  <Shield className="w-4 h-4 text-nemesis-400" />
                  <span className="text-sm">100% Sécurisé</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-dark-800 border-2 border-dark-700">
                  <Gamepad2 className="w-4 h-4 text-nemesis-400" />
                  <span className="text-sm">Par des joueurs</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-dark-800 border-2 border-dark-700">
                  <Rocket className="w-4 h-4 text-nemesis-400" />
                  <span className="text-sm">En évolution constante</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-dark-900 border-4 border-dark-700 p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-dark-800 border-2 border-dark-700 p-4 text-center">
                    <div className="text-3xl font-black text-nemesis-400">2024</div>
                    <div className="text-xs text-dark-400 mt-1">Année de création</div>
                  </div>
                  <div className="bg-dark-800 border-2 border-dark-700 p-4 text-center">
                    <div className="text-3xl font-black text-minecraft-emerald">100%</div>
                    <div className="text-xs text-dark-400 mt-1">Gratuit</div>
                  </div>
                  <div className="bg-dark-800 border-2 border-dark-700 p-4 text-center">
                    <div className="text-3xl font-black text-minecraft-gold">∞</div>
                    <div className="text-xs text-dark-400 mt-1">Possibilités</div>
                  </div>
                  <div className="bg-dark-800 border-2 border-dark-700 p-4 text-center">
                    <div className="text-3xl font-black text-minecraft-redstone">24/7</div>
                    <div className="text-xs text-dark-400 mt-1">Disponibilité</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-dark-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-black text-center mb-12"
          >
            Notre <span className="text-nemesis-400">Parcours</span>
          </motion.h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-dark-700 transform md:-translate-x-1/2" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center gap-4 md:gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"} pl-8 md:pl-0`}>
                    <div className="bg-dark-900 border-4 border-dark-700 p-4">
                      <div className="text-nemesis-400 font-bold text-sm mb-1">{milestone.date}</div>
                      <h3 className="font-bold mb-1">{milestone.title}</h3>
                      <p className="text-dark-400 text-sm">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-nemesis-400 border-4 border-dark-950 transform md:-translate-x-1/2" />
                  
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-black text-center mb-4"
          >
            L'<span className="text-nemesis-400">Équipe</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-dark-400 text-center mb-12 max-w-xl mx-auto"
          >
            Les personnes passionnées derrière Nemesis Launcher
          </motion.p>

          <div className="flex justify-center gap-6 flex-wrap">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-900 border-4 border-dark-700 p-6 text-center max-w-sm hover:border-nemesis-400/30 transition-colors"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-dark-800 border-4 border-dark-700 flex items-center justify-center text-4xl">
                  {member.avatar}
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-nemesis-400 text-sm font-semibold mb-2">{member.role}</p>
                <p className="text-dark-400 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Join CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-dark-400 mb-4">
              Envie de rejoindre l'aventure ? On cherche des passionnés !
            </p>
            <Link 
              href="/support"
              className="inline-flex items-center gap-2 px-6 py-3 bg-nemesis-500 hover:bg-nemesis-600 border-4 border-nemesis-600 font-bold transition-colors"
            >
              Nous contacter
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
