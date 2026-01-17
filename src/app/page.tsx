"use client";

import { HeroSection } from "@/components/HeroSection";
import { LogoVariationsSection } from "@/components/LogoVariationsSection";
import { BentoSection } from "@/components/BentoSection";
import { ManifestSection } from "@/components/ManifestSection";
import { ParametersSection } from "@/components/ParametersSection";
import { PricingSection } from "@/components/PricingSection";
import { FAQSection } from "@/components/FAQSection";
import { FinalCTASection, Footer } from "@/components/FinalCTASection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <div className="grain-overlay" />
      <HeroSection />
      <LogoVariationsSection />
      <BentoSection />
      <ManifestSection />
      <ParametersSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
