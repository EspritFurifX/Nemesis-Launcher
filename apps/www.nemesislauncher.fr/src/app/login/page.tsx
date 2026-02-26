"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Gamepad2, 
  Shield, 
  ShoppingBag, 
  AlertCircle, 
  Loader2,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Error messages
const ERROR_MESSAGES: Record<string, string> = {
  NO_MINECRAFT: "Vous devez posséder Minecraft Java Edition pour créer un compte Nemesis.",
  XBOX_ERROR: "Erreur lors de la connexion à Xbox Live. Vérifiez que votre compte Xbox est configuré correctement.",
  AUTH_ERROR: "Échec de l'authentification. Veuillez réessayer.",
  invalid_state: "Session expirée. Veuillez réessayer.",
  session_expired: "Session expirée. Veuillez réessayer.",
  missing_params: "Paramètres manquants. Veuillez réessayer.",
  init_failed: "Impossible d'initier la connexion. Veuillez réessayer.",
  server_error: "Erreur serveur. Veuillez réessayer plus tard.",
  access_denied: "Accès refusé. Vous avez annulé la connexion.",
  oauth_not_configured: "L'authentification Microsoft n'est pas encore configurée. L'administrateur doit définir la variable MICROSOFT_CLIENT_ID.",
  invalid_request: "Requête invalide. Vérifiez que le client_id Microsoft est correctement configuré.",
};

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for error in URL
    const errorCode = searchParams.get("error");
    const errorMessage = searchParams.get("message");
    
    if (errorCode) {
      setError(errorMessage ? decodeURIComponent(errorMessage) : ERROR_MESSAGES[errorCode] || errorCode);
    }
    
    // Check if already logged in
    checkAuth();
  }, [searchParams]);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      
      if (data.authenticated) {
        router.push("/account");
        return;
      }
    } catch {
      // Not authenticated
    }
    setChecking(false);
  };

  const handleLogin = () => {
    // Redirect to Microsoft OAuth
    window.location.href = "/api/auth/login";
  };

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-nemesis-400 animate-spin" />
      </div>
    );
  }

  return (
    <section className="pt-32 pb-20">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-dark-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-900 border-4 border-dark-700 p-8"
        >
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <Image
              src="/logo.jpg"
              alt="Nemesis Launcher"
              width={80}
              height={80}
              className="mx-auto mb-4 shadow-minecraft"
            />
            <h1 className="text-3xl font-black">
              Connexion <span className="text-nemesis-400">Nemesis</span>
            </h1>
            <p className="text-dark-400 mt-2">
              Connectez-vous avec votre compte Microsoft/Xbox
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-minecraft-redstone/10 border-2 border-minecraft-redstone/30 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-minecraft-redstone flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-minecraft-redstone font-bold">Erreur de connexion</p>
                <p className="text-dark-300 text-sm mt-1">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Features */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 p-3 bg-dark-800 border-2 border-dark-700">
              <Gamepad2 className="w-5 h-5 text-nemesis-400" />
              <span className="text-sm">Connexion via votre compte Xbox/Microsoft</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-dark-800 border-2 border-dark-700">
              <Shield className="w-5 h-5 text-nemesis-400" />
              <span className="text-sm">Minecraft Java Edition requis</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-dark-800 border-2 border-dark-700">
              <ShoppingBag className="w-5 h-5 text-nemesis-400" />
              <span className="text-sm">Accès aux cosmétiques et achats in-game</span>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full py-4 px-6 bg-[#107C10] hover:bg-[#0e6b0e] border-4 border-[#0e6b0e] text-white font-black text-lg flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-minecraft"
          >
            <svg viewBox="0 0 21 21" className="w-6 h-6" fill="currentColor">
              <rect x="1" y="1" width="9" height="9" />
              <rect x="11" y="1" width="9" height="9" />
              <rect x="1" y="11" width="9" height="9" />
              <rect x="11" y="11" width="9" height="9" />
            </svg>
            Se connecter avec Microsoft
          </button>

          {/* Terms */}
          <p className="text-xs text-dark-500 text-center mt-6">
            En vous connectant, vous acceptez nos{" "}
            <Link href="/terms" className="text-nemesis-400 hover:underline">
              CGU
            </Link>{" "}
            et notre{" "}
            <Link href="/privacy" className="text-nemesis-400 hover:underline">
              Politique de confidentialité
            </Link>
          </p>
        </motion.div>

        {/* Requirements */}
        <div className="mt-8 p-4 bg-dark-900/50 border-2 border-dark-800">
          <h3 className="font-bold text-dark-300 mb-3">Prérequis</h3>
          <ul className="space-y-2 text-sm text-dark-400">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-nemesis-400" />
              Compte Microsoft avec Xbox Live
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-nemesis-400" />
              Minecraft Java Edition (version officielle)
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-nemesis-400" />
              Profil Minecraft actif sur votre compte
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function LoginFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="w-8 h-8 text-nemesis-400 animate-spin" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-dark-950">
      <Header />
      <Suspense fallback={<LoginFallback />}>
        <LoginContent />
      </Suspense>
      <Footer />
    </main>
  );
}
