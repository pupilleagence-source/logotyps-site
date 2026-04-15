"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { StarBorderButton } from "./StarBorderButton";
import { ArrowRight, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePluginTestingNotice } from "@/lib/usePluginTestingNotice";

export function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const notify = usePluginTestingNotice();

  return (
    <section ref={ref} className="py-24 px-4 bg-[#1A1A1A] relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.15) 0%, transparent 50%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-[400] text-white mb-6 leading-tight" style={{ fontFamily: 'Gelica, sans-serif' }}>
            {t.cta.title1}{" "}
            <span className="text-gradient-orange">{t.cta.title2}</span>
          </h2>
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto">
            {t.cta.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <StarBorderButton onClick={notify} className="text-lg px-10 py-5">
              {t.cta.button} <ArrowRight className="w-5 h-5" />
            </StarBorderButton>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/40">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {t.cta.feature1}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {t.cta.feature2}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {t.cta.feature3}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-12 px-4 bg-[#1A1A1A] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/logotyps-horizontal-resized-1768677535430.webp?width=8000&height=8000&resize=contain"
              alt="Logotyps"
              className="h-6 brightness-0 invert"
            />
          </div>
          <div className="flex items-center gap-8 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
            <a href="#" className="hover:text-white transition-colors">{t.footer.support}</a>
            <a href="mailto:hello@logotyps.com" className="hover:text-white transition-colors flex items-center gap-2">
              <Mail className="w-4 h-4" /> hello@logotyps.com
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-white/30">
          &copy; {new Date().getFullYear()} Logotyps. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
