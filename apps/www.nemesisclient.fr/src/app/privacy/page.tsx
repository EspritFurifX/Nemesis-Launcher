import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8">Politique de confidentialité</h1>

          <div className="prose prose-invert prose-lg">
            <p className="text-dark-300">
              Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              1. Collecte des données
            </h2>
            <p className="text-dark-300">
              Nemesis Launcher collecte uniquement les données nécessaires à son
              fonctionnement :
            </p>
            <ul className="list-disc list-inside text-dark-300 space-y-2">
              <li>
                <strong>Newsletter :</strong> Votre adresse email si vous vous
                inscrivez pour être notifié du lancement.
              </li>
              <li>
                <strong>Authentification :</strong> Les tokens Microsoft pour la
                connexion à votre compte Minecraft (stockés localement sur votre
                appareil).
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              2. Utilisation des données
            </h2>
            <p className="text-dark-300">
              Vos données sont utilisées exclusivement pour :
            </p>
            <ul className="list-disc list-inside text-dark-300 space-y-2">
              <li>Vous envoyer une notification lors de la sortie de Nemesis Launcher</li>
              <li>Vous authentifier auprès des services Minecraft</li>
              <li>Améliorer nos services (statistiques anonymes)</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              3. Partage des données
            </h2>
            <p className="text-dark-300">
              Nous ne vendons, n'échangeons ni ne transférons vos informations
              personnelles à des tiers. Vos données restent confidentielles.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              4. Sécurité
            </h2>
            <p className="text-dark-300">
              Nous mettons en œuvre des mesures de sécurité pour protéger vos
              informations personnelles :
            </p>
            <ul className="list-disc list-inside text-dark-300 space-y-2">
              <li>Connexion HTTPS chiffrée</li>
              <li>Tokens stockés de manière sécurisée (keychain système)</li>
              <li>Authentification PKCE pour Microsoft OAuth</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              5. Vos droits
            </h2>
            <p className="text-dark-300">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside text-dark-300 space-y-2">
              <li>Droit d'accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement</li>
              <li>Droit de désinscription de la newsletter</li>
            </ul>
            <p className="text-dark-300 mt-4">
              Pour exercer ces droits, contactez-nous à{" "}
              <a
                href="mailto:contact@nemesisclient.fr"
                className="text-nemesis-400 hover:underline"
              >
                contact@nemesisclient.fr
              </a>
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              6. Contact
            </h2>
            <p className="text-dark-300">
              Pour toute question concernant cette politique de confidentialité,
              vous pouvez nous contacter à{" "}
              <a
                href="mailto:contact@nemesisclient.fr"
                className="text-nemesis-400 hover:underline"
              >
                contact@nemesisclient.fr
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
