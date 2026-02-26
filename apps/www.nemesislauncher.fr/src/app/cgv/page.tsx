"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, CreditCard, RefreshCw, AlertTriangle, Scale, Mail, Shield } from "lucide-react";

const sections = [
  {
    icon: ShoppingCart,
    title: "Article 1 - Objet",
    content: `Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre Nemesis Launcher (ci-après "le Vendeur") et toute personne effectuant un achat sur la plateforme (ci-après "l'Acheteur").

Elles s'appliquent à l'ensemble des ventes de produits et services proposés sur le site nemesislauncher.fr et dans l'application Nemesis Launcher, notamment :
- Les cosmétiques in-game (capes, skins, particules)
- Les packs de cosmétiques
- Les abonnements premium
- Tout autre contenu numérique proposé à la vente`,
  },
  {
    icon: CreditCard,
    title: "Article 2 - Prix et Paiement",
    content: `**2.1 Prix**
Les prix sont indiqués en euros (€) TTC. Le Vendeur se réserve le droit de modifier ses prix à tout moment, les produits étant facturés sur la base des tarifs en vigueur au moment de la validation de la commande.

**2.2 Moyens de paiement**
Les paiements peuvent être effectués par :
- Carte bancaire (Visa, Mastercard, American Express)
- PayPal
- Autres moyens de paiement proposés sur la plateforme

**2.3 Sécurité des paiements**
Toutes les transactions sont sécurisées via des protocoles de chiffrement SSL. Les informations bancaires ne sont jamais stockées sur nos serveurs.`,
  },
  {
    icon: RefreshCw,
    title: "Article 3 - Droit de Rétractation",
    content: `**3.1 Contenu numérique**
Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les contrats de fourniture de contenu numérique non fourni sur un support matériel dont l'exécution a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation.

**3.2 Accord préalable**
En validant votre achat de contenu numérique (cosmétiques, abonnements...), vous reconnaissez et acceptez que :
- L'exécution commence immédiatement après la validation du paiement
- Vous renoncez expressément à votre droit de rétractation

**3.3 Exception**
En cas de problème technique avéré empêchant l'accès au contenu acheté, une solution sera proposée (nouvel accès ou remboursement).`,
  },
  {
    icon: AlertTriangle,
    title: "Article 4 - Livraison",
    content: `**4.1 Livraison instantanée**
Les produits numériques sont livrés instantanément après validation du paiement. Ils sont automatiquement ajoutés au compte Nemesis de l'Acheteur.

**4.2 Accès aux produits**
L'Acheteur peut accéder à ses achats depuis :
- Le launcher Nemesis (section "Cosmétiques")
- Son espace personnel sur nemesislauncher.fr

**4.3 Problèmes de livraison**
En cas de non-réception d'un produit après paiement validé, l'Acheteur doit contacter le support dans un délai de 48 heures. Une vérification sera effectuée et le produit sera délivré ou un remboursement sera proposé.`,
  },
  {
    icon: Shield,
    title: "Article 5 - Garanties",
    content: `**5.1 Garantie de conformité**
Le Vendeur garantit que les produits sont conformes à leur description et aux caractéristiques annoncées.

**5.2 Disponibilité**
Les contenus numériques achetés restent accessibles tant que :
- Le compte Nemesis de l'Acheteur est actif
- Le service Nemesis Launcher est opérationnel
- L'Acheteur respecte les CGU

**5.3 Modifications**
Le Vendeur se réserve le droit de modifier les caractéristiques des produits pour des raisons techniques ou d'équilibrage, sans que cela puisse donner lieu à remboursement.`,
  },
  {
    icon: Scale,
    title: "Article 6 - Responsabilité",
    content: `**6.1 Limitations**
La responsabilité du Vendeur ne pourra être engagée en cas de :
- Mauvaise utilisation des produits par l'Acheteur
- Non-respect des conditions d'utilisation
- Force majeure
- Dysfonctionnement du compte Microsoft/Xbox de l'Acheteur

**6.2 Interdictions**
Est strictement interdit :
- La revente des produits achetés
- Le partage de compte pour accéder aux produits
- L'utilisation frauduleuse des produits

Tout manquement pourra entraîner la suspension du compte sans remboursement.`,
  },
  {
    icon: Mail,
    title: "Article 7 - Service Client",
    content: `**7.1 Contact**
Pour toute question relative à une commande :
- Email : support@nemesislauncher.fr
- Discord : discord.nemesislauncher.fr

**7.2 Réclamations**
Les réclamations doivent être adressées dans un délai de 30 jours suivant l'achat.

**7.3 Médiation**
En cas de litige non résolu, l'Acheteur peut recourir gratuitement au service de médiation de la consommation. Conformément à l'article L612-1 du Code de la consommation, les coordonnées du médiateur seront communiquées sur demande.`,
  },
];

export default function CGVPage() {
  return (
    <main className="min-h-screen bg-dark-950">
      <Header />

      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-dark-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Conditions Générales de <span className="text-nemesis-400">Vente</span>
            </h1>
            <p className="text-dark-400 text-lg">
              Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </motion.div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 p-4 bg-minecraft-gold/10 border-2 border-minecraft-gold/30"
          >
            <div className="flex items-start gap-3">
              <ShoppingCart className="w-6 h-6 text-minecraft-gold flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-minecraft-gold mb-1">Boutique en cours de développement</h3>
                <p className="text-dark-300 text-sm">
                  La boutique Nemesis est actuellement en développement. Ces CGV s'appliqueront dès son ouverture. 
                  En attendant, aucun achat n'est possible sur la plateforme.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="bg-dark-900 border-4 border-dark-700 p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-nemesis-400/10 border-2 border-nemesis-400/30 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-nemesis-400" />
                    </div>
                    <h2 className="text-xl font-bold">{section.title}</h2>
                  </div>
                  <div className="text-dark-300 leading-relaxed whitespace-pre-line">
                    {section.content.split("**").map((part, i) => 
                      i % 2 === 1 ? <strong key={i} className="text-white">{part}</strong> : part
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Related Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-6 bg-dark-900/50 border-2 border-dark-800"
          >
            <h3 className="font-bold mb-4">Documents associés</h3>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/terms" 
                className="text-nemesis-400 hover:text-nemesis-300 transition-colors"
              >
                Conditions Générales d'Utilisation (CGU) →
              </Link>
              <Link 
                href="/privacy" 
                className="text-nemesis-400 hover:text-nemesis-300 transition-colors"
              >
                Politique de Confidentialité →
              </Link>
              <Link 
                href="/cookies" 
                className="text-nemesis-400 hover:text-nemesis-300 transition-colors"
              >
                Politique des Cookies →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
