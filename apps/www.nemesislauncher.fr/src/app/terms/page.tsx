"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faFileContract } from "@fortawesome/free-solid-svg-icons";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-32 pb-20">
        <motion.div 
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-dark-800 border-2 border-minecraft-diamond/30 mb-4 shadow-minecraft">
              <FontAwesomeIcon icon={faFileContract} className="w-4 h-4 text-minecraft-diamond" />
              <span className="text-minecraft-diamond font-bold uppercase tracking-wider text-sm">
                CGU
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Conditions d'utilisation</h1>
            <p className="text-dark-400 mb-8">
              Dernière mise à jour : 25 février 2026
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-dark-900 border-4 border-dark-700 p-6 mb-8">
            <p className="text-dark-300">
              En utilisant Nemesis Launcher et ses services associés, vous acceptez 
              les présentes conditions d'utilisation. Veuillez les lire attentivement.
            </p>
          </motion.div>

          <div className="space-y-8">
            {/* Acceptation */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-nemesis-400">
                1. Acceptation des conditions
              </h2>
              <p className="text-dark-300">
                En téléchargeant, installant ou utilisant Nemesis Launcher, vous acceptez 
                d'être lié par ces conditions. Si vous n'acceptez pas ces conditions, 
                vous ne devez pas utiliser le logiciel.
              </p>
            </section>

            {/* Description du service */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-nemesis-400">
                2. Description du service
              </h2>
              <p className="text-dark-300 mb-4">
                Nemesis Launcher est un lanceur tiers pour Minecraft Java Edition qui permet :
              </p>
              <ul className="list-disc list-inside text-dark-300 space-y-2">
                <li>L'installation et la gestion de clients Minecraft personnalisés</li>
                <li>La gestion des mods et resource packs</li>
                <li>L'authentification via Microsoft/Xbox</li>
                <li>L'achat de cosmétiques in-game (via notre boutique)</li>
              </ul>
            </section>

            {/* Compte utilisateur */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-nemesis-400">
                3. Compte utilisateur
              </h2>
              <div className="space-y-4">
                <div className="bg-dark-900/50 border-2 border-dark-800 p-4">
                  <h3 className="font-bold mb-2">3.1 Prérequis</h3>
                  <p className="text-dark-300 text-sm">
                    Vous devez posséder une licence valide de Minecraft Java Edition associée 
                    à un compte Microsoft pour utiliser Nemesis Launcher.
                  </p>
                </div>
                <div className="bg-dark-900/50 border-2 border-dark-800 p-4">
                  <h3 className="font-bold mb-2">3.2 Responsabilité</h3>
                  <p className="text-dark-300 text-sm">
                    Vous êtes responsable de la sécurité de votre compte et de toute activité 
                    effectuée sous votre compte.
                  </p>
                </div>
                <div className="bg-dark-900/50 border-2 border-dark-800 p-4">
                  <h3 className="font-bold mb-2">3.3 Mineurs</h3>
                  <p className="text-dark-300 text-sm">
                    Les utilisateurs de moins de 16 ans doivent avoir l'autorisation parentale 
                    pour créer un compte et effectuer des achats.
                  </p>
                </div>
              </div>
            </section>

            {/* Achats */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-nemesis-400">
                4. Achats et paiements
              </h2>
              <div className="space-y-3 text-dark-300">
                <p>
                  Les achats de cosmétiques et crédits sont définitifs et non remboursables, 
                  sauf dans les cas prévus par la loi ou en cas d'erreur technique de notre part.
                </p>
                <p>
                  Les prix sont affichés en euros (EUR) et incluent toutes les taxes applicables.
                </p>
                <p>
                  Nous nous réservons le droit de modifier les prix à tout moment.
                </p>
              </div>
            </section>

            {/* Propriété intellectuelle */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-nemesis-400">
                5. Propriété intellectuelle
              </h2>
              <div className="p-4 bg-minecraft-redstone/10 border-2 border-minecraft-redstone/30 mb-4">
                <p className="text-dark-300">
                  <strong>Minecraft</strong> est une marque déposée de Mojang Studios / Microsoft. 
                  Nemesis Launcher n'est pas affilié à Mojang ou Microsoft.
                </p>
              </div>
              <p className="text-dark-300">
                Le code source, le design et les assets de Nemesis Launcher restent notre 
                propriété exclusive. Toute reproduction non autorisée est interdite.
              </p>
            </section>

            {/* Comportement */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-nemesis-400">
                6. Règles de conduite
              </h2>
              <p className="text-dark-300 mb-4">
                En utilisant nos services, vous vous engagez à ne pas :
              </p>
              <ul className="list-disc list-inside text-dark-300 space-y-2">
                <li>Utiliser des clients modifiés pour tricher ou hacker</li>
                <li>Partager votre compte avec d'autres personnes</li>
                <li>Tenter de pirater ou d'exploiter nos systèmes</li>
                <li>Harceler ou nuire aux autres utilisateurs</li>
                <li>Revendre des comptes ou des cosmétiques</li>
              </ul>
            </section>

            {/* Limitation de responsabilité */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-nemesis-400">
                7. Limitation de responsabilité
              </h2>
              <p className="text-dark-300">
                Nemesis Launcher est fourni "tel quel" sans garantie d'aucune sorte. 
                Nous ne sommes pas responsables des dommages directs ou indirects 
                résultant de l'utilisation du logiciel.
              </p>
            </section>

            {/* Suspension */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-nemesis-400">
                8. Suspension et résiliation
              </h2>
              <p className="text-dark-300">
                Nous nous réservons le droit de suspendre ou de résilier votre compte 
                en cas de violation de ces conditions, sans préavis ni remboursement.
              </p>
            </section>

            {/* Modifications */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-nemesis-400">
                9. Modifications des conditions
              </h2>
              <p className="text-dark-300">
                Nous pouvons modifier ces conditions à tout moment. Les utilisateurs seront 
                informés des changements significatifs par email ou notification dans le launcher. 
                L'utilisation continue du service après modification vaut acceptation.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-nemesis-400">
                10. Contact
              </h2>
              <div className="bg-dark-900 border-4 border-dark-700 p-6">
                <p className="text-dark-300 mb-4">
                  Pour toute question concernant ces conditions :
                </p>
                <p className="text-dark-300 flex items-center gap-2">
                  <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                  <a href="mailto:contact@nemesislauncher.fr" className="text-nemesis-400 hover:underline">contact@nemesislauncher.fr</a>
                </p>
              </div>
            </section>

            {/* Droit applicable */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-nemesis-400">
                11. Droit applicable
              </h2>
              <p className="text-dark-300">
                Ces conditions sont régies par le droit français. En cas de litige, 
                les tribunaux français seront compétents.
              </p>
            </section>
          </div>

          {/* Links */}
          <motion.div variants={itemVariants} className="mt-12 p-4 bg-dark-900/50 border-2 border-dark-800">
            <p className="text-dark-400 text-sm">
              Voir également : {" "}
              <Link href="/privacy" className="text-nemesis-400 hover:underline">
                Politique de confidentialité
              </Link>
              {" "} | {" "}
              <Link href="/cookies" className="text-nemesis-400 hover:underline">
                Politique de cookies
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
