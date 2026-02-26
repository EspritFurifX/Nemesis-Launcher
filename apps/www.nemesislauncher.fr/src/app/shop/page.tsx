"use client";

import Image from "next/image";
import { ShoppingCart, Gift, Sparkles, Shield, Zap, Crown } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const shopItems = [
  {
    id: 1,
    name: "Pass Premium",
    price: "4.99€",
    description: "Accès premium avec cosmétiques exclusifs",
    badge: "Populaire",
    icon: Crown,
    color: "gold",
    features: ["Cosmétiques exclusifs", "Pas de pub", "Support prioritaire"],
  },
  {
    id: 2,
    name: "Pack Cosmétiques",
    price: "2.99€",
    description: "10 cosmétiques exclusifs pour personnaliser votre profil",
    icon: Sparkles,
    color: "purple",
    features: ["Capes personnalisées", "Skins exclusifs", "Particules"],
  },
  {
    id: 3,
    name: "Boost XP 7 jours",
    price: "1.99€",
    description: "X2 d'XP pendant 7 jours sur tous les serveurs",
    icon: Zap,
    color: "blue",
    features: ["X2 XP", "7 jours", "Tous les modes"],
  },
  {
    id: 4,
    name: "Protection VIP",
    price: "3.99€",
    description: "Protection anti-grief et priorité de connexion",
    icon: Shield,
    color: "green",
    features: ["Anti-grief", "Priorité serveur", "30 jours"],
  },
  {
    id: 5,
    name: "Starter Pack",
    price: "7.99€",
    description: "Combo complet : cosmétiques + boost + protection",
    badge: "Meilleure valeur",
    icon: Gift,
    color: "red",
    features: ["Tous les bonus", "30 jours", "Valeur 12.97€"],
  },
  {
    id: 6,
    name: "Supporter",
    price: "9.99€",
    description: "Soutiens le projet et deviens supporter officiel",
    icon: Crown,
    color: "emerald",
    features: ["Rôle Discord", "Badge unique", "90 jours de benefits"],
  },
];

export default function ShopPage() {
  return (
    <div className="min-h-screen flex flex-col bg-dark-950">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-16 border-b border-dark-700">
          <div className="absolute inset-0 bg-gradient-to-b from-nemesis-500/20 via-transparent to-dark-950" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

          <div className="relative max-w-6xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Boutique Némésis
              </h1>
              <p className="text-xl text-dark-300 mb-8">
                Améliorez votre expérience avec nos articles exclusifs et soutenez le développement du projet.
              </p>

              <div className="flex items-center justify-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-nemesis-400">
                    100+
                  </div>
                  <div className="text-sm text-dark-400">Articles</div>
                </div>
                <div className="w-px h-12 bg-dark-700" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-nemesis-400">
                    10K+
                  </div>
                  <div className="text-sm text-dark-400">Clients</div>
                </div>
                <div className="w-px h-12 bg-dark-700" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-nemesis-400">
                    ⭐ 4.8
                  </div>
                  <div className="text-sm text-dark-400">Note</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shop Grid */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">Nos articles</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shopItems.map((item) => {
                const Icon = item.icon;
                const bgColor =
                  item.color === "gold"
                    ? "bg-yellow-500/20"
                    : item.color === "purple"
                    ? "bg-purple-500/20"
                    : item.color === "blue"
                    ? "bg-blue-500/20"
                    : item.color === "green"
                    ? "bg-green-500/20"
                    : item.color === "red"
                    ? "bg-red-500/20"
                    : "bg-emerald-500/20";

                const textColor =
                  item.color === "gold"
                    ? "text-yellow-400"
                    : item.color === "purple"
                    ? "text-purple-400"
                    : item.color === "blue"
                    ? "text-blue-400"
                    : item.color === "green"
                    ? "text-green-400"
                    : item.color === "red"
                    ? "text-red-400"
                    : "text-emerald-400";

                return (
                  <div
                    key={item.id}
                    className={`relative bg-dark-900 border rounded-2xl p-6 overflow-hidden transition hover:border-nemesis-500/50 group ${
                      item.badge
                        ? "border-nemesis-500/50 md:col-span-2 lg:col-span-1 lg:col-start-2"
                        : "border-dark-700"
                    }`}
                  >
                    {/* Background gradient */}
                    <div
                      className={`absolute inset-0 ${bgColor} opacity-0 group-hover:opacity-10 transition`}
                    />

                    {/* Badge */}
                    {item.badge && (
                      <div className="absolute -top-1 -right-1">
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-nemesis-500 to-green-500 text-white text-xs font-bold rounded-full transform rotate-12">
                          {item.badge}
                        </span>
                      </div>
                    )}

                    <div className="relative">
                      {/* Icon */}
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${bgColor}`}
                      >
                        <Icon className={`w-7 h-7 ${textColor}`} />
                      </div>

                      {/* Content */}
                      <h3 className="text-lg font-bold text-white mb-1">
                        {item.name}
                      </h3>
                      <p className="text-dark-400 text-sm mb-4">
                        {item.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2 mb-6">
                        {item.features.map((feature, i) => (
                          <li
                            key={i}
                            className="text-dark-300 text-sm flex items-center gap-2"
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${textColor} bg-current`}
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* Price and Button */}
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-white">
                          {item.price}
                        </span>
                        <button className={`flex items-center gap-2 px-4 py-2 rounded-lg ${textColor} ${bgColor} hover:opacity-80 transition font-medium`}>
                          <ShoppingCart className="w-4 h-4" />
                          Acheter
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Info Sections */}
        <section className="py-16 px-6 bg-dark-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🛡️</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Sécurisé
                </h3>
                <p className="text-dark-400">
                  Paiements sécurisés via Stripe. Aucune donnée de carte stockée.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Instantané
                </h3>
                <p className="text-dark-400">
                  Livraison immédiate après paiement. Accès instant.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🎁</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Bonus
                </h3>
                <p className="text-dark-400">
                  Offres exclusives et promotions régulières.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Questions fréquentes
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "Comment activer mes achats ?",
                  a: "Connectez-vous sur le launcher après votre achat. Les articles s'activent automatiquement.",
                },
                {
                  q: "Puis-je être remboursé ?",
                  a: "Oui, remboursement sous 30 jours si vous n'êtes pas satisfait.",
                },
                {
                  q: "Quel est le délai de livraison ?",
                  a: "Instantané. Vous recevez accès immédiatement après la confirmation du paiement.",
                },
                {
                  q: "Quels moyens de paiement ?",
                  a: "Carte bancaire, PayPal, et autres solutions via Stripe.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-dark-900 border border-dark-700 rounded-xl p-4"
                >
                  <h4 className="font-semibold text-white mb-2">{item.q}</h4>
                  <p className="text-dark-400 text-sm">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
