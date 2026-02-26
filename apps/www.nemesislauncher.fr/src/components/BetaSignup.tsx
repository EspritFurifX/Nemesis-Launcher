"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faCheck, faSpinner, faFlask, faGift, faBug, faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

const benefits = [
  {
    icon: faFlask,
    title: "Accès anticipé",
    description: "Testez les nouvelles fonctionnalités avant tout le monde",
  },
  {
    icon: faGift,
    title: "Cosmétiques exclusifs",
    description: "Recevez des récompenses uniques réservées aux beta testeurs",
  },
  {
    icon: faBug,
    title: "Impact direct",
    description: "Vos retours façonnent directement le launcher",
  },
  {
    icon: faUserSecret,
    title: "Badge Beta Tester",
    description: "Affichez fièrement votre statut de pionnier",
  },
];

export function BetaSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "beta" }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Inscription réussie ! Surveillez votre boîte mail.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Une erreur est survenue. Réessayez.");
      }
    } catch {
      setStatus("error");
      setMessage("Erreur de connexion. Réessayez plus tard.");
    }

    setTimeout(() => {
      if (status !== "success") setStatus("idle");
    }, 5000);
  };

  return (
    <section className="py-24 relative overflow-hidden" id="beta">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-nemesis-500/5 to-dark-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-nemesis-500/10 via-transparent to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-nemesis-400/10 border-2 border-nemesis-400/30 mb-6">
              <FontAwesomeIcon icon={faRocket} className="w-4 h-4 text-nemesis-400" />
              <span className="text-nemesis-400 text-sm font-bold">Rejoignez l'aventure</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              Devenez <span className="text-nemesis-400">Beta Testeur</span>
            </h2>
            
            <p className="text-xl text-dark-300 mb-8">
              Faites partie des premiers à découvrir Nemesis Launcher et aidez-nous à créer 
              le launcher Minecraft parfait.
            </p>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-dark-900/50 border-2 border-dark-800"
                >
                  <div className="w-10 h-10 bg-nemesis-500/10 border-2 border-nemesis-500/30 flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={benefit.icon} className="w-4 h-4 text-nemesis-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{benefit.title}</h3>
                    <p className="text-dark-400 text-xs">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Signup Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-dark-900 border-4 border-dark-700 p-8">
              <h3 className="text-2xl font-black mb-2 text-center">
                Inscrivez-vous à la <span className="text-nemesis-400">Beta</span>
              </h3>
              <p className="text-dark-400 text-center mb-6">
                Places limitées - Soyez parmi les premiers !
              </p>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-minecraft-emerald/20 border-4 border-minecraft-emerald/30 flex items-center justify-center mx-auto mb-4">
                    <FontAwesomeIcon icon={faCheck} className="w-8 h-8 text-minecraft-emerald" />
                  </div>
                  <h4 className="text-xl font-bold text-minecraft-emerald mb-2">Inscription réussie !</h4>
                  <p className="text-dark-400">{message}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="beta-email" className="block text-sm font-bold text-dark-300 mb-2">
                      Votre email
                    </label>
                    <input
                      id="beta-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="steve@minecraft.net"
                      className="w-full px-4 py-3 bg-dark-800 border-4 border-dark-700 text-white placeholder:text-dark-500 focus:border-nemesis-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-minecraft-redstone text-sm">{message}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 px-6 bg-nemesis-500 hover:bg-nemesis-600 disabled:bg-nemesis-500/50 border-4 border-nemesis-600 disabled:border-nemesis-600/50 text-white font-black text-lg flex items-center justify-center gap-3 transition-all shadow-minecraft disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} className="w-5 h-5 animate-spin" />
                        Inscription...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faRocket} className="w-5 h-5" />
                        Rejoindre la Beta
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Discord Alternative */}
              <div className="mt-6 pt-6 border-t-2 border-dark-700 text-center">
                <p className="text-dark-400 text-sm mb-3">Ou rejoignez directement notre Discord</p>
                <a
                  href="https://discord.nemesislauncher.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#5865F2] hover:bg-[#4752c4] border-4 border-[#4752c4] font-bold transition-colors"
                >
                  <FontAwesomeIcon icon={faDiscord} className="w-5 h-5" />
                  Discord Nemesis
                </a>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 mt-6 text-dark-500 text-sm">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-minecraft-emerald" />
                <span>Pas de spam</span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-minecraft-emerald" />
                <span>Désinscription facile</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
