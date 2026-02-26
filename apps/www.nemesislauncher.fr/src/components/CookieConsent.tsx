"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Cookie, Settings, Check, X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCookieBite } from "@fortawesome/free-solid-svg-icons";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true, // Always required
  analytics: false,
  marketing: false,
  functional: false,
};

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Small delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      try {
        setPreferences(JSON.parse(consent));
      } catch {
        setShowBanner(true);
      }
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem("cookie_consent", JSON.stringify(prefs));
    localStorage.setItem("cookie_consent_date", new Date().toISOString());
    setPreferences(prefs);
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    savePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    });
  };

  const rejectAll = () => {
    savePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    });
  };

  const saveCustom = () => {
    savePreferences(preferences);
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      {showSettings && (
        <motion.div
          className="fixed inset-0 bg-black/60 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowSettings(false)}
        />
      )}

      {/* Banner */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-[101] p-4"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
      >
        <div className="max-w-4xl mx-auto bg-dark-900 border-4 border-dark-700 shadow-minecraft-lg">
          {!showSettings ? (
            // Simple Banner
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-minecraft-gold shadow-minecraft flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-6 h-6 text-dark-900" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                    <FontAwesomeIcon icon={faCookieBite} className="w-5 h-5 text-minecraft-gold" />
                    Cookies & Vie Privée
                  </h3>
                  <p className="text-dark-300 text-sm mb-4">
                    Nous utilisons des cookies pour améliorer votre expérience sur Nemesis Launcher. 
                    Certains cookies sont essentiels au fonctionnement, d'autres nous aident à 
                    analyser l'utilisation du site.{" "}
                    <Link href="/privacy" className="text-nemesis-400 hover:underline font-bold">
                      Politique de confidentialité
                    </Link>
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={acceptAll}
                      className="btn-primary flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Tout accepter
                    </button>
                    <button
                      onClick={rejectAll}
                      className="px-4 py-2 bg-dark-800 border-2 border-dark-700 text-dark-300 font-bold hover:text-white transition-all"
                    >
                      Refuser
                    </button>
                    <button
                      onClick={() => setShowSettings(true)}
                      className="px-4 py-2 bg-dark-800 border-2 border-dark-700 text-dark-300 font-bold hover:text-white transition-all flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      Personnaliser
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Detailed Settings
            <div className="p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-dark-700">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Settings className="w-5 h-5 text-nemesis-400" />
                  Paramètres des cookies
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-dark-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {/* Necessary */}
                <CookieOption
                  title="Cookies nécessaires"
                  description="Indispensables au fonctionnement du site. Ils permettent la navigation et l'accès aux fonctionnalités de base."
                  checked={true}
                  disabled={true}
                  onChange={() => {}}
                />

                {/* Functional */}
                <CookieOption
                  title="Cookies fonctionnels"
                  description="Permettent de mémoriser vos préférences (langue, thème) pour une meilleure expérience."
                  checked={preferences.functional}
                  onChange={(checked) => setPreferences({ ...preferences, functional: checked })}
                />

                {/* Analytics */}
                <CookieOption
                  title="Cookies analytiques"
                  description="Nous aident à comprendre comment vous utilisez le site pour l'améliorer."
                  checked={preferences.analytics}
                  onChange={(checked) => setPreferences({ ...preferences, analytics: checked })}
                />

                {/* Marketing */}
                <CookieOption
                  title="Cookies marketing"
                  description="Utilisés pour vous proposer des contenus personnalisés et pertinents."
                  checked={preferences.marketing}
                  onChange={(checked) => setPreferences({ ...preferences, marketing: checked })}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={saveCustom}
                  className="btn-primary flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Enregistrer mes choix
                </button>
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 bg-dark-800 border-2 border-dark-700 text-dark-300 font-bold hover:text-white transition-all"
                >
                  Tout accepter
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function CookieOption({
  title,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className={`p-4 bg-dark-800 border-2 ${disabled ? "border-dark-600" : "border-dark-700"}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold">{title}</span>
            {disabled && (
              <span className="px-2 py-0.5 bg-nemesis-500/20 text-nemesis-400 text-xs font-bold">
                Requis
              </span>
            )}
          </div>
          <p className="text-sm text-dark-400">{description}</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange(e.target.checked)}
            className="sr-only peer"
          />
          <div className={`w-11 h-6 bg-dark-600 peer-focus:outline-none border-2 border-dark-500 
            peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
            after:bg-white after:border after:border-dark-400 after:w-5 after:h-5 after:transition-all 
            ${disabled ? "opacity-50 cursor-not-allowed" : "peer-checked:bg-nemesis-500 peer-checked:border-nemesis-400"}`}
          />
        </label>
      </div>
    </div>
  );
}

// Hook to check cookie consent
export function useCookieConsent() {
  const [consent, setConsent] = useState<CookiePreferences | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("cookie_consent");
    if (stored) {
      try {
        setConsent(JSON.parse(stored));
      } catch {
        setConsent(null);
      }
    }
  }, []);

  return consent;
}
