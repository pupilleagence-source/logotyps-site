"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroSection } from "@/components/HeroSection";
import { LogoVariationsSection } from "@/components/LogoVariationsSection";
import { MacbookShowcaseSection } from "@/components/MacbookShowcaseSection";
import { BentoGrid } from "@/components/BentoGrid";
import { ManifestSection } from "@/components/ManifestSection";
import { ParametersSection } from "@/components/ParametersSection";
import { PricingSection } from "@/components/PricingSection";
import { FAQSection } from "@/components/FAQSection";
import { FinalCTASection, Footer } from "@/components/FinalCTASection";
import { StarBorderButton } from "@/components/ui/StarBorderButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePluginTestingNotice } from "@/lib/usePluginTestingNotice";

export default function Home() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const { t } = useLanguage();
  const notify = usePluginTestingNotice();

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past hero (approx 800px)
      setShowStickyCTA(window.scrollY > 800);
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
      <MacbookShowcaseSection />
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
            <div className="pointer-events-auto shadow-2xl rounded-full">
              <StarBorderButton dark onClick={notify}>{t.hero.downloadNow}</StarBorderButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
