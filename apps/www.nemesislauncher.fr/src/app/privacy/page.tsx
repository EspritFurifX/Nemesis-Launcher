"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEnvelope, 
  faGamepad, 
  faCookieBite, 
  faCircleXmark, 
  faClipboardList, 
  faPen, 
  faTrash, 
  faBoxOpen, 
  faBan, 
  faPause, 
  faLock,
  faShieldHalved
} from "@fortawesome/free-solid-svg-icons";

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

export default function PrivacyPage() {
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
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-dark-800 border-2 border-nemesis-500/30 mb-4 shadow-minecraft">
              <FontAwesomeIcon icon={faShieldHalved} className="w-4 h-4 text-nemesis-400" />
              <span className="text-nemesis-400 font-bold uppercase tracking-wider text-sm">
                RGPD
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Politique de confidentialité</h1>
            <p className="text-dark-400 mb-8">
              Dernière mise à jour : 25 février 2026
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-dark-900 border-4 border-dark-700 p-6 mb-8">
            <p className="text-dark-300">
              Nemesis Launcher ("nous", "notre", "nos") s'engage à protéger votre vie privée. 
              Cette politique explique comment nous collectons, utilisons et protégeons vos données 
              personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>
          </motion.div>

          <div className="space-y-8">
            {/* Responsable du traitement */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-nemesis-400">
                1. Responsable du traitement
              </h2>
              <div className="bg-dark-900/50 border-2 border-dark-800 p-4">
                <p className="text-dark-300">
                  <strong>Nemesis Launcher</strong><br />
                  Email : <a href="mailto:contact@nemesislauncher.fr" className="text-nemesis-400 hover:underline">contact@nemesislauncher.fr</a><br />
                  Site : <a href="https://nemesislauncher.fr" className="text-nemesis-400 hover:underline">nemesislauncher.fr</a>
                </p>
              </div>
            </section>

            {/* Données collectées */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-nemesis-400">
                2. Données collectées
              </h2>
              <div className="space-y-4">
                <div className="bg-dark-900/50 border-2 border-dark-800 p-4">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                    Newsletter
                  </h3>
                  <ul className="list-disc list-inside text-dark-300 space-y-1">
                    <li>Adresse email</li>
                    <li>Date d'inscription</li>
                    <li>Adresse IP (pour la sécurité)</li>
                  </ul>
                </div>
                
                <div className="bg-dark-900/50 border-2 border-dark-800 p-4">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <FontAwesomeIcon icon={faGamepad} className="w-4 h-4" />
                    Compte Nemesis (via Microsoft/Xbox)
                  </h3>
                  <ul className="list-disc list-inside text-dark-300 space-y-1">
                    <li>Gamertag Xbox</li>
                    <li>UUID Minecraft</li>
                    <li>Pseudo Minecraft</li>
                    <li>Avatar (facultatif)</li>
                    <li>Historique d'achats in-game</li>
                  </ul>
                </div>

                <div className="bg-dark-900/50 border-2 border-dark-800 p-4">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <FontAwesomeIcon icon={faCookieBite} className="w-4 h-4" />
                    Cookies
                  </h3>
                  <p className="text-dark-300 mb-2">
                    Consultez notre <Link href="/cookies" className="text-nemesis-400 hover:underline">Politique de cookies</Link> pour plus de détails.
                  </p>
                </div>
              </div>
            </section>

            {/* Finalités */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-nemesis-400">
                3. Finalités du traitement
              </h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-dark-800 border-2 border-dark-700">
                    <th className="p-3 text-left">Finalité</th>
                    <th className="p-3 text-left">Base légale</th>
                    <th className="p-3 text-left">Durée</th>
                  </tr>
                </thead>
                <tbody className="text-dark-300">
                  <tr className="border-2 border-dark-700">
                    <td className="p-3">Envoi de notifications de lancement</td>
                    <td className="p-3">Consentement</td>
                    <td className="p-3">Jusqu'au désabonnement</td>
                  </tr>
                  <tr className="border-2 border-dark-700 bg-dark-900/30">
                    <td className="p-3">Authentification Minecraft</td>
                    <td className="p-3">Exécution du contrat</td>
                    <td className="p-3">Durée du compte</td>
                  </tr>
                  <tr className="border-2 border-dark-700">
                    <td className="p-3">Achats in-game (cosmétiques)</td>
                    <td className="p-3">Exécution du contrat</td>
                    <td className="p-3">10 ans (obligation légale)</td>
                  </tr>
                  <tr className="border-2 border-dark-700 bg-dark-900/30">
                    <td className="p-3">Amélioration du service</td>
                    <td className="p-3">Intérêt légitime</td>
                    <td className="p-3">26 mois max</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* Partage */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-nemesis-400">
                4. Partage des données
              </h2>
              <p className="text-dark-300 mb-4">
                Vos données peuvent être partagées avec :
              </p>
              <ul className="list-disc list-inside text-dark-300 space-y-2">
                <li><strong>Microsoft/Xbox :</strong> Pour l'authentification (requis pour Minecraft)</li>
                <li><strong>Stripe :</strong> Pour le traitement des paiements (cosmétiques)</li>
                <li><strong>Hébergeur :</strong> Serveurs sécurisés en Europe</li>
              </ul>
              <div className="mt-4 p-4 bg-nemesis-500/10 border-2 border-nemesis-500/30">
                <p className="text-nemesis-400 font-bold flex items-center gap-2">
                  <FontAwesomeIcon icon={faCircleXmark} className="w-4 h-4" />
                  Nous ne vendons JAMAIS vos données à des tiers.
                </p>
              </div>
            </section>

            {/* Droits RGPD */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-nemesis-400">
                5. Vos droits (RGPD)
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-dark-900/50 border-2 border-dark-800 p-4">
                  <h3 className="font-bold mb-1 flex items-center gap-2">
                    <FontAwesomeIcon icon={faClipboardList} className="w-4 h-4" />
                    Droit d'accès
                  </h3>
                  <p className="text-sm text-dark-400">Obtenir une copie de vos données</p>
                </div>
                <div className="bg-dark-900/50 border-2 border-dark-800 p-4">
                  <h3 className="font-bold mb-1 flex items-center gap-2">
                    <FontAwesomeIcon icon={faPen} className="w-4 h-4" />
                    Droit de rectification
                  </h3>
                  <p className="text-sm text-dark-400">Corriger vos données inexactes</p>
                </div>
                <div className="bg-dark-900/50 border-2 border-dark-800 p-4">
                  <h3 className="font-bold mb-1 flex items-center gap-2">
                    <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                    Droit à l'effacement
                  </h3>
                  <p className="text-sm text-dark-400">Supprimer vos données</p>
                </div>
                <div className="bg-dark-900/50 border-2 border-dark-800 p-4">
                  <h3 className="font-bold mb-1 flex items-center gap-2">
                    <FontAwesomeIcon icon={faBoxOpen} className="w-4 h-4" />
                    Droit à la portabilité
                  </h3>
                  <p className="text-sm text-dark-400">Récupérer vos données</p>
                </div>
                <div className="bg-dark-900/50 border-2 border-dark-800 p-4">
                  <h3 className="font-bold mb-1 flex items-center gap-2">
                    <FontAwesomeIcon icon={faBan} className="w-4 h-4" />
                    Droit d'opposition
                  </h3>
                  <p className="text-sm text-dark-400">S'opposer au traitement</p>
                </div>
                <div className="bg-dark-900/50 border-2 border-dark-800 p-4">
                  <h3 className="font-bold mb-1 flex items-center gap-2">
                    <FontAwesomeIcon icon={faPause} className="w-4 h-4" />
                    Droit à la limitation
                  </h3>
                  <p className="text-sm text-dark-400">Limiter le traitement</p>
                </div>
              </div>
              <p className="mt-4 text-dark-300">
                Pour exercer vos droits : <a href="mailto:rgpd@nemesislauncher.fr" className="text-nemesis-400 hover:underline font-bold">rgpd@nemesislauncher.fr</a>
              </p>
              <p className="mt-2 text-dark-400 text-sm">
                Délai de réponse : 30 jours maximum. Vous pouvez également déposer une réclamation 
                auprès de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener" className="text-nemesis-400 hover:underline">www.cnil.fr</a>).
              </p>
            </section>

            {/* Sécurité */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-nemesis-400">
                6. Sécurité
              </h2>
              <ul className="list-disc list-inside text-dark-300 space-y-2">
                <li>Chiffrement HTTPS/TLS sur toutes les communications</li>
                <li>Stockage sécurisé des tokens (keychain système)</li>
                <li>Authentification OAuth 2.0 avec PKCE</li>
                <li>Mots de passe hashés (bcrypt)</li>
                <li>Protection contre les attaques (rate limiting, CSRF)</li>
                <li>Serveurs hébergés en Europe (RGPD compliant)</li>
              </ul>
            </section>

            {/* Mineurs */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-nemesis-400">
                7. Protection des mineurs
              </h2>
              <p className="text-dark-300">
                Les utilisateurs de moins de 16 ans doivent obtenir le consentement parental 
                pour créer un compte. Les achats in-game nécessitent une vérification d'âge.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-nemesis-400">
                8. Contact
              </h2>
              <div className="bg-dark-900 border-4 border-dark-700 p-6">
                <p className="text-dark-300 mb-4">
                  Pour toute question concernant vos données personnelles :
                </p>
                <ul className="space-y-2 text-dark-300">
                  <li className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                    Email général : <a href="mailto:contact@nemesislauncher.fr" className="text-nemesis-400 hover:underline">contact@nemesislauncher.fr</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faLock} className="w-4 h-4" />
                    DPO / RGPD : <a href="mailto:rgpd@nemesislauncher.fr" className="text-nemesis-400 hover:underline">rgpd@nemesislauncher.fr</a>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
