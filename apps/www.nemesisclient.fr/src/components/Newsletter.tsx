"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, CheckCircle, Loader2, AlertCircle } from "lucide-react";

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
    <section id="newsletter" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-nemesis-950/20 to-dark-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-nemesis-500/10 via-transparent to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <div className="inline-flex p-4 rounded-2xl bg-nemesis-500/10 border border-nemesis-500/20 mb-8">
            <Bell className="w-8 h-8 text-nemesis-400" />
          </div>

          {/* Header */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Soyez les <span className="gradient-text">premiers</span> informés
          </h2>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto mb-10">
            Inscrivez-vous pour recevoir une notification dès que Nemesis Launcher
            sera disponible en téléchargement.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading" || status === "success"}
                className="input flex-1"
                required
              />
              <motion.button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="btn-primary whitespace-nowrap"
                whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
                whileTap={{ scale: status === "idle" ? 0.98 : 1 }}
              >
                {status === "loading" && (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                )}
                {status === "success" && (
                  <CheckCircle className="w-5 h-5 mr-2" />
                )}
                {status === "loading"
                  ? "Inscription..."
                  : status === "success"
                  ? "Inscrit !"
                  : "S'inscrire"}
              </motion.button>
            </div>

            {/* Status Message */}
            {message && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 text-sm flex items-center justify-center gap-2 ${
                  status === "success" ? "text-green-400" : "text-red-400"
                }`}
              >
                {status === "success" ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                {message}
              </motion.p>
            )}
          </form>

          {/* Trust Badges */}
          <p className="mt-8 text-sm text-dark-400">
            Pas de spam. Uniquement une notification lors de la release.
            <br />
            Votre email ne sera jamais partagé.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
