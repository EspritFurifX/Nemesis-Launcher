"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCheck, faArrowRight, faShieldHalved, faEnvelopeCircleCheck, faLinkSlash } from "@fortawesome/free-solid-svg-icons";

type FormStatus = "idle" | "loading" | "success" | "error";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Veuillez entrer une adresse email valide.");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Inscription réussie ! Vous serez notifié du lancement.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Erreur de connexion. Veuillez réessayer.");
    }
  };

  return (
    <section id="newsletter" className="py-24 sm:py-32 relative overflow-hidden bg-block-pattern">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-nemesis-950/10 to-dark-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-nemesis-500/5 via-transparent to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Icon - Block style */}
          <motion.div 
            className="inline-flex p-4 bg-nemesis-500 shadow-minecraft-lg mb-8"
            whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.3 }}
          >
            <FontAwesomeIcon icon={faBell} className="w-8 h-8 text-white" />
          </motion.div>

          {/* Header */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 text-shadow-minecraft">
            <span className="text-white">Soyez les </span>
            <span className="text-nemesis-400">premiers</span>
          </h2>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto mb-10">
            Inscrivez-vous pour recevoir une notification{" "}
            <span className="text-nemesis-400 font-bold">dès la sortie</span> de Nemesis Launcher.
          </p>

          {/* Form - Minecraft style */}
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 p-2 bg-dark-800 border-2 border-dark-600 shadow-minecraft">
              <input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading" || status === "success"}
                className="flex-1 px-4 py-3 bg-dark-900 border-2 border-dark-700 text-white placeholder-dark-400 focus:outline-none focus:border-nemesis-500"
                required
              />
              <motion.button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="btn-primary whitespace-nowrap flex items-center gap-2"
                whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
                whileTap={{ scale: status === "idle" ? 0.98 : 1 }}
              >
                {status === "loading" && (
                  <Loader2 className="w-5 h-5 animate-spin" />
                )}
                {status === "success" && (
                  <FontAwesomeIcon icon={faCheck} className="w-5 h-5" />
                )}
                {status === "idle" && (
                  <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                )}
                {status === "loading"
                  ? "..."
                  : status === "success"
                  ? "Inscrit !"
                  : "S'inscrire"}
              </motion.button>
            </div>

            {/* Status Message */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-3 border-2 flex items-center justify-center gap-2 ${
                  status === "success" 
                    ? "bg-nemesis-500/10 border-nemesis-500/30 text-nemesis-400" 
                    : "bg-minecraft-redstone/10 border-minecraft-redstone/30 text-minecraft-redstone"
                }`}
              >
                {status === "success" ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                <span className="font-bold">{message}</span>
              </motion.div>
            )}
          </form>

          {/* Trust Badges */}
          <motion.div 
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-dark-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faShieldHalved} className="w-4 h-4 text-nemesis-400" />
              <span>Pas de spam</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faEnvelopeCircleCheck} className="w-4 h-4 text-minecraft-diamond" />
              <span>Email non partagé</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faLinkSlash} className="w-4 h-4 text-minecraft-gold" />
              <span>Désinscription facile</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
