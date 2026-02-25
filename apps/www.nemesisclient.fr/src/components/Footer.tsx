import { Github, Twitter, Mail } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/EspritFurifX/Nemesis-Launcher",
    icon: Github,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/nemesislauncher",
    icon: Twitter,
  },
  {
    name: "Email",
    href: "mailto:contact@nemesisclient.fr",
    icon: Mail,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-nemesis-500 to-nemesis-700 flex items-center justify-center">
                <span className="text-sm font-bold">N</span>
              </div>
              <span className="font-semibold">Nemesis Launcher</span>
            </div>
            <p className="text-sm text-dark-400">
              © {currentYear} Nemesis. Tous droits réservés.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-dark-400">
            <a
              href="#features"
              className="hover:text-white transition-colors"
            >
              Fonctionnalités
            </a>
            <a
              href="#newsletter"
              className="hover:text-white transition-colors"
            >
              Newsletter
            </a>
            <a
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Confidentialité
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-dark-400 hover:text-white hover:bg-dark-800 transition-all"
                aria-label={link.name}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-8 border-t border-dark-800 text-center">
          <p className="text-xs text-dark-500">
            Nemesis Launcher n'est pas un produit officiel de Mojang/Microsoft.
            Minecraft est une marque déposée de Mojang Studios.
          </p>
        </div>
      </div>
    </footer>
  );
}
