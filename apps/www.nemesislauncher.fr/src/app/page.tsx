import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

// Lazy load below-the-fold components for better initial load
const Stats = dynamic(() => import("@/components/Stats").then(mod => ({ default: mod.Stats })), {
  loading: () => <div className="h-96 bg-dark-900/50 animate-pulse" />,
});

const HowItWorks = dynamic(() => import("@/components/HowItWorks").then(mod => ({ default: mod.HowItWorks })), {
  loading: () => <div className="h-96 bg-dark-950 animate-pulse" />,
});

const BetaSignup = dynamic(() => import("@/components/BetaSignup").then(mod => ({ default: mod.BetaSignup })), {
  loading: () => <div className="h-96 bg-dark-900/50 animate-pulse" />,
});

const FAQ = dynamic(() => import("@/components/FAQ").then(mod => ({ default: mod.FAQ })), {
  loading: () => <div className="h-96 bg-dark-950 animate-pulse" />,
});

const Newsletter = dynamic(() => import("@/components/Newsletter").then(mod => ({ default: mod.Newsletter })), {
  loading: () => <div className="h-64 bg-dark-900/50 animate-pulse" />,
});

const CTA = dynamic(() => import("@/components/CTA").then(mod => ({ default: mod.CTA })), {
  loading: () => <div className="h-64 bg-dark-950 animate-pulse" />,
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Stats />
      <HowItWorks />
      <BetaSignup />
      <FAQ />
      <Newsletter />
      <CTA />
      <Footer />
    </main>
  );
}
