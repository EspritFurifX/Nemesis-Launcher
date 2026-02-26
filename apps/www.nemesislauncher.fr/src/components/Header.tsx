"use client";

import { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogIn, ChevronDown } from "lucide-react";

interface UserInfo {
  minecraftUsername: string;
  minecraftUuid: string;
}

const navLinks = [
  { href: "/#features", label: "Fonctionnalités" },
  { href: "/download", label: "Télécharger" },
  { href: "/shop", label: "Boutique" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/about", label: "À propos" },
];

const moreLinks = [
  { href: "/support", label: "Support" },
  { href: "/terms", label: "CGU" },
  { href: "/cgv", label: "CGV" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    checkAuth();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { 
        credentials: "include",
        cache: "no-store" 
      });
      const data = await res.json();
      if (data.authenticated) {
        setUser(data.user);
      }
    } catch {
      // Not logged in
    }
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-dark-900/95 backdrop-blur-sm border-b-2 border-dark-700 py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo - Block style */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 400 }}>
              <Image
                src="/logo.jpg"
                alt="Nemesis"
                width={40}
                height={40}
                className="shadow-minecraft"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight">NEMESIS</span>
              <span className="text-xs text-dark-400 -mt-1">Launcher</span>
            </div>
            {/* Dev Badge */}
            <span className="hidden sm:inline-flex px-2 py-0.5 bg-minecraft-gold/20 border border-minecraft-gold/40 text-minecraft-gold text-xs font-bold">
              BETA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              link.href.startsWith("#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-dark-300 hover:text-white hover:bg-dark-800/50 transition-all font-bold"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-dark-300 hover:text-white hover:bg-dark-800/50 transition-all font-bold"
                >
                  {link.label}
                </Link>
              )
            ))}
            
            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                onBlur={() => setTimeout(() => setIsMoreOpen(false), 150)}
                className="px-4 py-2 text-dark-300 hover:text-white hover:bg-dark-800/50 transition-all font-bold flex items-center gap-1"
              >
                Plus
                <ChevronDown className={`w-4 h-4 transition-transform ${isMoreOpen ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {isMoreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 mt-2 bg-dark-900 border-2 border-dark-700 min-w-[140px] shadow-lg"
                  >
                    {moreLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2 text-dark-300 hover:text-white hover:bg-dark-800/50 transition-all font-bold text-sm"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Auth & CTA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link
                href="/account"
                className="flex items-center gap-2 px-4 py-2 bg-dark-800 border-2 border-dark-700 hover:border-nemesis-500/50 transition-all"
              >
                <Image
                  src={`https://mc-heads.net/avatar/${user.minecraftUuid}/24`}
                  alt={user.minecraftUsername}
                  width={24}
                  height={24}
                  className="rounded-sm"
                />
                <span className="font-bold text-sm">{user.minecraftUsername}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 text-dark-300 hover:text-white hover:bg-dark-800/50 transition-all font-bold"
              >
                <LogIn className="w-4 h-4" />
                Connexion
              </Link>
            )}
            <a href="#newsletter" className="btn-primary">
              → S'inscrire
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 bg-dark-800 border-2 border-dark-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu - Block style */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t-2 border-dark-700 pt-4 overflow-hidden"
            >
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  link.href.startsWith("#") ? (
                    <a
                      key={link.href}
                      href={link.href}
                      className="px-4 py-3 text-dark-300 hover:text-white bg-dark-800/50 hover:bg-dark-800 border-2 border-dark-700 font-bold transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="px-4 py-3 text-dark-300 hover:text-white bg-dark-800/50 hover:bg-dark-800 border-2 border-dark-700 font-bold transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                ))}
                
                {/* More links */}
                <div className="flex gap-2 flex-wrap">
                  {moreLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="px-3 py-2 text-dark-400 hover:text-white bg-dark-800/30 border border-dark-700 text-sm font-bold transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                
                {user ? (
                  <Link
                    href="/account"
                    className="flex items-center gap-2 px-4 py-3 text-dark-300 hover:text-white bg-dark-800/50 hover:bg-dark-800 border-2 border-dark-700 font-bold transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Image
                      src={`https://mc-heads.net/avatar/${user.minecraftUuid}/20`}
                      alt={user.minecraftUsername}
                      width={20}
                      height={20}
                      className="rounded-sm"
                    />
                    Mon compte
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-4 py-3 text-dark-300 hover:text-white bg-dark-800/50 hover:bg-dark-800 border-2 border-dark-700 font-bold transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LogIn className="w-4 h-4" />
                    Connexion
                  </Link>
                )}
                <a
                  href="#newsletter"
                  className="btn-primary text-center mt-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  → S'inscrire
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
