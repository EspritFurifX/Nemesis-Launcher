"use client";

import { memo, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const faqs = [
  {
    question: "Nemesis Launcher est-il gratuit ?",
    answer: "Oui, Nemesis Launcher est entièrement gratuit. Vous pouvez télécharger et utiliser le launcher sans aucun frais. Seuls les achats cosmétiques optionnels sont payants.",
  },
  {
    question: "Ai-je besoin d'un compte Minecraft pour utiliser Nemesis ?",
    answer: "Oui, vous devez posséder une licence Minecraft Java Edition valide. Le launcher vérifie automatiquement votre licence via votre compte Microsoft/Xbox. Les abonnés Xbox Game Pass avec Minecraft inclus peuvent également utiliser le launcher.",
  },
  {
    question: "Quelles plateformes sont supportées ?",
    answer: "Nemesis Launcher est disponible sur Windows 10/11 (64-bit), macOS 11+ (Intel et Apple Silicon), et Linux (Ubuntu 20.04+, Fedora 34+, et distributions compatibles).",
  },
  {
    question: "Comment installer des mods ?",
    answer: "Le launcher gère automatiquement les mods selon le serveur sélectionné. Vous pouvez également ajouter vos propres mods via le gestionnaire intégré. Les mods sont téléchargés et mis à jour automatiquement.",
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer: "Absolument. Nous utilisons l'authentification OAuth 2.0 avec PKCE via Microsoft. Vos identifiants ne sont jamais stockés sur nos serveurs. Toutes les communications sont chiffrées en HTTPS/TLS. Consultez notre politique de confidentialité pour plus de détails.",
  },
  {
    question: "Le launcher est-il compatible avec d'autres launchers ?",
    answer: "Oui, Nemesis peut coexister avec d'autres launchers Minecraft. Chaque launcher utilise son propre dossier de configuration, il n'y a donc pas de conflit.",
  },
  {
    question: "Comment signaler un bug ou suggérer une fonctionnalité ?",
    answer: "Vous pouvez nous contacter par email à contact@nemesislauncher.fr ou rejoindre notre communauté Discord pour discuter avec l'équipe et les autres joueurs.",
  },
  {
    question: "Le launcher met-il à jour Minecraft automatiquement ?",
    answer: "Oui, le launcher gère automatiquement les mises à jour de Minecraft et des mods. Vous recevrez une notification si une nouvelle version est disponible, et la mise à jour se fait en un clic.",
  },
];

const FAQItem = memo(function FAQItem({ 
  faq, 
  isOpen, 
  onToggle,
  index,
}: { 
  faq: typeof faqs[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      className="border-4 border-dark-700 bg-dark-900 shadow-minecraft overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.05 }}
    >
      <button
        onClick={onToggle}
        className="w-full p-5 flex items-center justify-between text-left hover:bg-dark-800/50 transition-colors"
      >
        <span className="font-bold text-white pr-4">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <FontAwesomeIcon 
            icon={faChevronDown} 
            className={`w-5 h-5 ${isOpen ? 'text-nemesis-400' : 'text-dark-400'}`} 
          />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-5 pb-5 pt-0">
              <div className="h-px bg-dark-700 mb-4" />
              <p className="text-dark-300 leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex(prev => prev === index ? null : index);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 to-dark-900" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-dark-800 border-2 border-minecraft-diamond/30 mb-4 shadow-minecraft">
            <FontAwesomeIcon icon={faCircleQuestion} className="w-4 h-4 text-minecraft-diamond" />
            <span className="text-minecraft-diamond font-bold uppercase tracking-wider text-sm">
              FAQ
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            <span className="text-white">Questions </span>
            <span className="text-nemesis-400">fréquentes</span>
          </h2>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto">
            Tout ce que vous devez savoir sur Nemesis Launcher.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          className="mt-12 text-center p-6 bg-dark-900 border-4 border-dark-700 shadow-minecraft"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-dark-300 mb-4">
            Vous n'avez pas trouvé la réponse à votre question ?
          </p>
          <a
            href="mailto:contact@nemesislauncher.fr"
            className="btn-secondary inline-flex items-center gap-2"
          >
            Contactez-nous
          </a>
        </motion.div>
      </div>
    </section>
  );
}
