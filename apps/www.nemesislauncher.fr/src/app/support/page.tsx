"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { 
  ArrowLeft, 
  MessageSquare, 
  Mail, 
  HelpCircle, 
  Bug, 
  Lightbulb, 
  FileText,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Users
} from "lucide-react";

const contactOptions = [
  {
    icon: MessageSquare,
    title: "Discord",
    description: "Le moyen le plus rapide pour obtenir de l'aide de la communauté et de l'équipe.",
    action: "Rejoindre Discord",
    href: "https://discord.nemesislauncher.fr",
    color: "bg-[#5865F2] hover:bg-[#4752c4] border-[#4752c4]",
    external: true,
    responseTime: "Quelques minutes",
  },
  {
    icon: Mail,
    title: "Email",
    description: "Pour les demandes officielles, partenariats ou questions privées.",
    action: "Envoyer un email",
    href: "mailto:support@nemesislauncher.fr",
    color: "bg-nemesis-500 hover:bg-nemesis-600 border-nemesis-600",
    external: false,
    responseTime: "24-48 heures",
  },
];

const supportCategories = [
  {
    icon: HelpCircle,
    title: "Questions générales",
    description: "Comment télécharger le launcher, configuration requise, compte Microsoft...",
    href: "#faq",
  },
  {
    icon: Bug,
    title: "Signaler un bug",
    description: "Vous avez trouvé un problème ? Aidez-nous à améliorer le launcher.",
    href: "https://discord.nemesislauncher.fr",
  },
  {
    icon: Lightbulb,
    title: "Suggestions",
    description: "Une idée de fonctionnalité ? Partagez-la avec nous !",
    href: "https://discord.nemesislauncher.fr",
  },
  {
    icon: FileText,
    title: "Documentation",
    description: "Guides d'utilisation, tutoriels et ressources techniques.",
    href: "/docs",
  },
];

const faqItems = [
  {
    question: "Comment télécharger Nemesis Launcher ?",
    answer: "Nemesis Launcher est actuellement en développement. Inscrivez-vous à la newsletter ou rejoignez notre Discord pour être informé dès sa sortie.",
  },
  {
    question: "Ai-je besoin d'un compte Microsoft ?",
    answer: "Oui, un compte Microsoft avec Minecraft Java Edition est requis pour utiliser Nemesis Launcher. C'est ce qui garantit que vous possédez légalement le jeu.",
  },
  {
    question: "Le launcher est-il gratuit ?",
    answer: "Oui, Nemesis Launcher est entièrement gratuit ! Seuls les cosmétiques optionnels dans la boutique (prévue) seront payants.",
  },
  {
    question: "Sur quels systèmes d'exploitation fonctionne le launcher ?",
    answer: "Nemesis Launcher sera disponible sur Windows, macOS et Linux lors de sa sortie.",
  },
  {
    question: "Comment devenir beta testeur ?",
    answer: "Rejoignez notre Discord et surveillez les annonces ! Nous sélectionnerons les premiers testeurs parmi notre communauté.",
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer: "Absolument. Nous utilisons l'authentification Microsoft officielle et ne stockons jamais vos mots de passe. Consultez notre politique de confidentialité pour plus de détails.",
  },
];

const statusItems = [
  {
    label: "Launcher",
    status: "development",
    statusLabel: "En développement",
    color: "text-minecraft-gold",
  },
  {
    label: "Site web",
    status: "online",
    statusLabel: "En ligne",
    color: "text-minecraft-emerald",
  },
  {
    label: "API",
    status: "development",
    statusLabel: "En développement",
    color: "text-minecraft-gold",
  },
  {
    label: "Serveur Minecraft",
    status: "planned",
    statusLabel: "Prévu",
    color: "text-dark-400",
  },
];

export default function SupportPage() {
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
              <HelpCircle className="w-4 h-4 text-nemesis-400" />
              <span className="text-nemesis-400 text-sm font-bold">Centre d'aide</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Besoin d'<span className="text-nemesis-400">aide</span> ?
            </h1>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              Notre équipe et notre communauté sont là pour vous aider. 
              Trouvez des réponses ou contactez-nous directement.
            </p>
          </motion.div>

          {/* Contact Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            {contactOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.title}
                  className="bg-dark-900 border-4 border-dark-700 p-6"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-dark-800 border-2 border-dark-700 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-nemesis-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{option.title}</h3>
                      <div className="flex items-center gap-2 text-dark-400 text-sm">
                        <Clock className="w-3 h-3" />
                        <span>Réponse en {option.responseTime}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-dark-300 mb-4">{option.description}</p>
                  <Link
                    href={option.href}
                    target={option.external ? "_blank" : undefined}
                    className={`inline-flex items-center gap-2 px-4 py-2 ${option.color} border-4 font-bold transition-colors`}
                  >
                    {option.action}
                    {option.external && <ExternalLink className="w-4 h-4" />}
                  </Link>
                </div>
              );
            })}
          </motion.div>

          {/* Support Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-black mb-6">
              Comment pouvons-nous <span className="text-nemesis-400">vous aider</span> ?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {supportCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Link
                    key={category.title}
                    href={category.href}
                    target={category.href.startsWith("http") ? "_blank" : undefined}
                    className="bg-dark-900 border-4 border-dark-700 p-4 hover:border-nemesis-400/30 transition-colors group"
                  >
                    <Icon className="w-8 h-8 text-nemesis-400 mb-3" />
                    <h3 className="font-bold mb-1 group-hover:text-nemesis-400 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-dark-400 text-sm">{category.description}</p>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-12"
          >
            <div className="bg-dark-900 border-4 border-dark-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">État des services</h2>
                <Link 
                  href="/status"
                  className="text-nemesis-400 text-sm hover:underline flex items-center gap-1"
                >
                  Voir plus <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statusItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-3 bg-dark-800 border-2 border-dark-700">
                    <div className={`w-2 h-2 rounded-full ${
                      item.status === "online" ? "bg-minecraft-emerald" :
                      item.status === "development" ? "bg-minecraft-gold" :
                      "bg-dark-500"
                    }`} />
                    <div>
                      <div className="text-sm font-semibold">{item.label}</div>
                      <div className={`text-xs ${item.color}`}>{item.statusLabel}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            id="faq"
          >
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-nemesis-400" />
              <h2 className="text-2xl font-black">
                Questions <span className="text-nemesis-400">fréquentes</span>
              </h2>
            </div>
            
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + index * 0.05 }}
                  className="bg-dark-900 border-4 border-dark-700 p-4"
                >
                  <h3 className="font-bold mb-2 flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-nemesis-400 flex-shrink-0 mt-0.5" />
                    {item.question}
                  </h3>
                  <p className="text-dark-300 pl-7">{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <div className="bg-dark-900 border-4 border-dark-700 p-8 text-center">
              <Users className="w-12 h-12 text-nemesis-400 mx-auto mb-4" />
              <h3 className="text-2xl font-black mb-2">
                Rejoignez notre <span className="text-nemesis-400">communauté</span>
              </h3>
              <p className="text-dark-400 mb-6 max-w-md mx-auto">
                Plus de 500 membres actifs sur Discord ! Discutez, partagez et obtenez de l'aide instantanément.
              </p>
              <Link
                href="https://discord.nemesislauncher.fr"
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#5865F2] hover:bg-[#4752c4] border-4 border-[#4752c4] font-bold transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                Rejoindre le Discord
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
