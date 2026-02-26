"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faGear, faChartBar, faBullhorn, faCookieBite, faGlobe, faEnvelope } from "@fortawesome/free-solid-svg-icons";

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

export default function CookiesPage() {
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
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-dark-800 border-2 border-minecraft-gold/30 mb-4 shadow-minecraft">
              <FontAwesomeIcon icon={faCookieBite} className="w-4 h-4 text-minecraft-gold" />
              <span className="text-minecraft-gold font-bold uppercase tracking-wider text-sm">
                Cookies
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Politique de cookies</h1>
            <p className="text-dark-400 mb-8">
              Dernière mise à jour : 25 février 2026
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-dark-900 border-4 border-dark-700 p-6 mb-8">
            <p className="text-dark-300">
              Cette politique explique comment Nemesis Launcher utilise les cookies et 
              technologies similaires sur notre site web nemesislauncher.fr.
            </p>
          </motion.div>

          <div className="space-y-8">
            {/* Qu'est-ce qu'un cookie */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-nemesis-400">
                1. Qu'est-ce qu'un cookie ?
              </h2>
              <p className="text-dark-300">
                Un cookie est un petit fichier texte stocké sur votre appareil (ordinateur, 
                smartphone, tablette) lorsque vous visitez un site web. Il permet au site 
                de mémoriser vos actions et préférences pendant une période donnée.
              </p>
            </section>

            {/* Types de cookies */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-nemesis-400">
                2. Types de cookies utilisés
              </h2>
              
              <div className="space-y-4">
                {/* Cookies nécessaires */}
                <div className="bg-dark-900/50 border-2 border-nemesis-500/50 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-nemesis-400 flex items-center gap-2">
                      <FontAwesomeIcon icon={faLock} className="w-4 h-4" />
                      Cookies strictement nécessaires
                    </h3>
                    <span className="text-xs bg-nemesis-500/20 text-nemesis-400 px-2 py-1 rounded">
                      OBLIGATOIRES
                    </span>
                  </div>
                  <p className="text-dark-300 text-sm mb-2">
                    Ces cookies sont essentiels au fonctionnement du site. Sans eux, le site 
                    ne peut pas fonctionner correctement.
                  </p>
                  <table className="w-full text-sm mt-2">
                    <thead>
                      <tr className="border-b border-dark-700">
                        <th className="text-left py-2 text-dark-400">Cookie</th>
                        <th className="text-left py-2 text-dark-400">Durée</th>
                        <th className="text-left py-2 text-dark-400">Finalité</th>
                      </tr>
                    </thead>
                    <tbody className="text-dark-300">
                      <tr className="border-b border-dark-800">
                        <td className="py-2 font-mono text-xs">cookie_consent</td>
                        <td className="py-2">1 an</td>
                        <td className="py-2">Mémorise vos préférences cookies</td>
                      </tr>
                      <tr className="border-b border-dark-800">
                        <td className="py-2 font-mono text-xs">session_token</td>
                        <td className="py-2">Session</td>
                        <td className="py-2">Connexion sécurisée</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-mono text-xs">csrf_token</td>
                        <td className="py-2">Session</td>
                        <td className="py-2">Protection contre les attaques CSRF</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Cookies fonctionnels */}
                <div className="bg-dark-900/50 border-2 border-dark-800 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold flex items-center gap-2">
                      <FontAwesomeIcon icon={faGear} className="w-4 h-4" />
                      Cookies fonctionnels
                    </h3>
                    <span className="text-xs bg-dark-700 text-dark-300 px-2 py-1 rounded">
                      OPTIONNELS
                    </span>
                  </div>
                  <p className="text-dark-300 text-sm mb-2">
                    Ces cookies améliorent votre expérience en mémorisant vos choix.
                  </p>
                  <table className="w-full text-sm mt-2">
                    <thead>
                      <tr className="border-b border-dark-700">
                        <th className="text-left py-2 text-dark-400">Cookie</th>
                        <th className="text-left py-2 text-dark-400">Durée</th>
                        <th className="text-left py-2 text-dark-400">Finalité</th>
                      </tr>
                    </thead>
                    <tbody className="text-dark-300">
                      <tr className="border-b border-dark-800">
                        <td className="py-2 font-mono text-xs">theme</td>
                        <td className="py-2">1 an</td>
                        <td className="py-2">Préférence de thème</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-mono text-xs">language</td>
                        <td className="py-2">1 an</td>
                        <td className="py-2">Préférence de langue</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Cookies analytiques */}
                <div className="bg-dark-900/50 border-2 border-dark-800 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold flex items-center gap-2">
                      <FontAwesomeIcon icon={faChartBar} className="w-4 h-4" />
                      Cookies analytiques
                    </h3>
                    <span className="text-xs bg-dark-700 text-dark-300 px-2 py-1 rounded">
                      OPTIONNELS
                    </span>
                  </div>
                  <p className="text-dark-300 text-sm mb-2">
                    Ces cookies nous aident à comprendre comment les visiteurs utilisent notre site.
                  </p>
                  <table className="w-full text-sm mt-2">
                    <thead>
                      <tr className="border-b border-dark-700">
                        <th className="text-left py-2 text-dark-400">Cookie</th>
                        <th className="text-left py-2 text-dark-400">Durée</th>
                        <th className="text-left py-2 text-dark-400">Finalité</th>
                      </tr>
                    </thead>
                    <tbody className="text-dark-300">
                      <tr className="border-b border-dark-800">
                        <td className="py-2 font-mono text-xs">_plausible</td>
                        <td className="py-2">1 an</td>
                        <td className="py-2">Analytics respectueux (Plausible)</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-dark-400 text-xs mt-2">
                    Nous utilisons Plausible Analytics, une solution respectueuse de la vie privée,
                    sans transfert de données hors UE.
                  </p>
                </div>

                {/* Cookies marketing */}
                <div className="bg-dark-900/50 border-2 border-dark-800 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold flex items-center gap-2">
                      <FontAwesomeIcon icon={faBullhorn} className="w-4 h-4" />
                      Cookies marketing
                    </h3>
                    <span className="text-xs bg-dark-700 text-dark-300 px-2 py-1 rounded">
                      OPTIONNELS
                    </span>
                  </div>
                  <p className="text-dark-300 text-sm mb-2">
                    Actuellement, nous n'utilisons <strong>aucun cookie publicitaire</strong>.
                    Si cela change, vous serez informé et pourrez donner votre consentement.
                  </p>
                </div>
              </div>
            </section>

            {/* Gestion des cookies */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-nemesis-400">
                3. Gérer vos préférences
              </h2>
              <p className="text-dark-300 mb-4">
                Vous pouvez modifier vos préférences à tout moment :
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-dark-900/50 border-2 border-dark-800 p-4">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <FontAwesomeIcon icon={faCookieBite} className="w-4 h-4" />
                    Via notre bannière
                  </h3>
                  <p className="text-dark-300 text-sm">
                    Cliquez sur "Gérer les cookies" en bas de page pour ouvrir 
                    le panneau de préférences.
                  </p>
                </div>
                <div className="bg-dark-900/50 border-2 border-dark-800 p-4">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <FontAwesomeIcon icon={faGlobe} className="w-4 h-4" />
                    Via votre navigateur
                  </h3>
                  <p className="text-dark-300 text-sm">
                    Configurez les cookies dans les paramètres de votre navigateur.
                  </p>
                </div>
              </div>

              <div className="mt-4 bg-dark-900 border-2 border-dark-700 p-4">
                <h3 className="font-bold mb-2">Liens utiles par navigateur :</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener" 
                       className="text-nemesis-400 hover:underline">→ Google Chrome</a>
                  </li>
                  <li>
                    <a href="https://support.mozilla.org/fr/kb/cookies-informations-sites-enregistrent" target="_blank" rel="noopener"
                       className="text-nemesis-400 hover:underline">→ Mozilla Firefox</a>
                  </li>
                  <li>
                    <a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener"
                       className="text-nemesis-400 hover:underline">→ Safari</a>
                  </li>
                  <li>
                    <a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener"
                       className="text-nemesis-400 hover:underline">→ Microsoft Edge</a>
                  </li>
                </ul>
              </div>
            </section>

            {/* Stockage local */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-nemesis-400">
                4. Stockage local (localStorage)
              </h2>
              <p className="text-dark-300 mb-4">
                En plus des cookies, nous utilisons le localStorage pour certaines fonctionnalités :
              </p>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-dark-800 border-2 border-dark-700">
                    <th className="p-3 text-left">Clé</th>
                    <th className="p-3 text-left">Finalité</th>
                  </tr>
                </thead>
                <tbody className="text-dark-300">
                  <tr className="border-2 border-dark-700">
                    <td className="p-3 font-mono text-xs">nemesis_cookie_consent</td>
                    <td className="p-3">Vos préférences de cookies</td>
                  </tr>
                  <tr className="border-2 border-dark-700 bg-dark-900/30">
                    <td className="p-3 font-mono text-xs">nemesis_auth_state</td>
                    <td className="p-3">État d'authentification temporaire</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-nemesis-400">
                5. Contact
              </h2>
              <p className="text-dark-300 mb-4">
                Pour toute question sur notre utilisation des cookies :
              </p>
              <div className="bg-dark-900 border-4 border-dark-700 p-6">
                <p className="text-dark-300 flex items-center gap-2">
                  <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                  <a href="mailto:rgpd@nemesislauncher.fr" className="text-nemesis-400 hover:underline">rgpd@nemesislauncher.fr</a>
                </p>
              </div>
              <p className="mt-4 text-dark-400 text-sm">
                Voir également notre <Link href="/privacy" className="text-nemesis-400 hover:underline">Politique de confidentialité</Link>.
              </p>
            </section>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
