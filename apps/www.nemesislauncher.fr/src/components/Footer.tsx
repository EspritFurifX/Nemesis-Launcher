import Image from "next/image";
import Link from "next/link";
import { Twitter, Mail } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

const productLinks = [
  { label: "Fonctionnalités", href: "#features" },
  { label: "Télécharger", href: "/download" },
  { label: "Roadmap", href: "/roadmap" },
];

const resourceLinks = [
  { label: "À propos", href: "/about" },
  { label: "Support", href: "/support" },
  { label: "Newsletter", href: "#newsletter" },
];

const legalLinks = [
  { label: "CGU", href: "/terms" },
  { label: "CGV", href: "/cgv" },
  { label: "Confidentialité", href: "/privacy" },
  { label: "Cookies", href: "/cookies" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t-4 border-dark-800 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.jpg"
                alt="Némésis"
                width={40}
                height={40}
                className="shadow-minecraft"
              />
              <div className="flex flex-col">
                <span className="font-black text-xl">NÉMÉSIS</span>
                <span className="text-xs text-dark-400 -mt-1">Launcher</span>
              </div>
            </div>
            <p className="text-dark-400 text-sm mb-4">
              Le launcher Minecraft nouvelle génération. Sécurisé, rapide et moderne.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-2">
              <a
                href="https://discord.nemesislauncher.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-dark-800 border-2 border-dark-700 text-dark-400 hover:text-white hover:bg-[#5865F2] transition-all"
                aria-label="Discord"
              >
                <FontAwesomeIcon icon={faDiscord} className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/nemesislauncher"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-dark-800 border-2 border-dark-700 text-dark-400 hover:text-white hover:bg-minecraft-diamond transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@nemesislauncher.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-dark-800 border-2 border-dark-700 text-dark-400 hover:text-white hover:bg-minecraft-gold transition-all"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-bold text-sm text-dark-300 uppercase tracking-wider mb-4">Produit</h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("#") ? (
                    <a href={link.href} className="text-dark-400 hover:text-white text-sm transition-colors">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-dark-400 hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-sm text-dark-300 uppercase tracking-wider mb-4">Ressources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("#") ? (
                    <a href={link.href} className="text-dark-400 hover:text-white text-sm transition-colors">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-dark-400 hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-sm text-dark-300 uppercase tracking-wider mb-4">Légal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-dark-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-2 border-dark-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-dark-500">
              © {currentYear} Némésis Launcher. Tous droits réservés.
            </p>
            
            {/* Disclaimer */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-dark-900 border-2 border-dark-700">
              <FontAwesomeIcon icon={faTriangleExclamation} className="w-3.5 h-3.5 text-minecraft-gold" />
              <span className="text-xs text-dark-500">
                Némésis n'est pas affilié à Mojang/Microsoft
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
