"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nemesis-500 to-nemesis-700 flex items-center justify-center">
              <span className="text-xl font-bold">N</span>
            </div>
            <span className="text-xl font-bold">Nemesis</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-dark-300 hover:text-white transition-colors"
            >
              Fonctionnalités
            </a>
            <a
              href="#newsletter"
              className="text-dark-300 hover:text-white transition-colors"
            >
              Newsletter
            </a>
            <a
              href="https://github.com/EspritFurifX/Nemesis-Launcher"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-300 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a href="#newsletter" className="btn-primary">
              Être notifié
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col gap-4">
              <a
                href="#features"
                className="text-dark-300 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Fonctionnalités
              </a>
              <a
                href="#newsletter"
                className="text-dark-300 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Newsletter
              </a>
              <a
                href="https://github.com/EspritFurifX/Nemesis-Launcher"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-300 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="#newsletter"
                className="btn-primary text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Être notifié
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
