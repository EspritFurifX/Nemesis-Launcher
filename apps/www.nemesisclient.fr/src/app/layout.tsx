import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Nemesis Launcher - Le launcher Minecraft nouvelle génération",
  description:
    "Nemesis Launcher est un launcher Minecraft moderne avec authentification Microsoft, mises à jour automatiques et une interface élégante. Inscrivez-vous pour être notifié de la première release.",
  keywords: [
    "minecraft",
    "launcher",
    "nemesis",
    "minecraft launcher",
    "microsoft auth",
    "gaming",
  ],
  authors: [{ name: "Nemesis Team" }],
  openGraph: {
    title: "Nemesis Launcher",
    description: "Le launcher Minecraft nouvelle génération",
    url: "https://www.nemesisclient.fr",
    siteName: "Nemesis Launcher",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nemesis Launcher",
    description: "Le launcher Minecraft nouvelle génération",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a1b1e",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${inter.variable} font-sans bg-dark-950 text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
