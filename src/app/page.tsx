"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroSection } from "@/components/HeroSection";
import { LogoVariationsSection } from "@/components/LogoVariationsSection";
import { LogoSystemSection } from "@/components/LogoSystemSection";
import { BentoGrid } from "@/components/BentoGrid";
import { ManifestSection } from "@/components/ManifestSection";
import { ParametersSection } from "@/components/ParametersSection";
import { PricingSection } from "@/components/PricingSection";
import { FAQSection } from "@/components/FAQSection";
import { FinalCTASection, Footer } from "@/components/FinalCTASection";
import { useLanguage } from "@/contexts/LanguageContext";
import { DOWNLOAD_PAGE } from "@/lib/links";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      // Visible une fois le hero passé (~800 px), masqué dès que la section Tarifs
      // (puis FAQ, CTA final) entre dans l'écran : elles ont leurs propres boutons.
      const pricing = document.getElementById("pricing");
      const pricingReached = !!pricing && pricing.getBoundingClientRect().top < window.innerHeight * 0.9;
      setShowStickyCTA(window.scrollY > 800 && !pricingReached);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <div className="grain-overlay" />
      <HeroSection />
      <LogoVariationsSection />
      <BentoGrid />
      <LogoSystemSection />
      <ManifestSection />
      <ParametersSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />

      {/* Sticky Bottom CTA */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none"
          >
            <a
              href={DOWNLOAD_PAGE}
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] text-white text-sm font-medium px-6 py-3 shadow-2xl border border-white/10 hover:bg-[#FF6B35] transition-colors duration-200"
            >
              {t.hero.downloadNow} <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
