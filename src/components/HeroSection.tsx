"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import dynamic from "next/dynamic";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePluginTestingNotice } from "@/lib/usePluginTestingNotice";

const Chrome3DLogo = dynamic(() => import("./Chrome3DLogo").then(mod => ({ default: mod.Chrome3DLogo })), {
  ssr: false,
  loading: () => <div className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-400 rounded-full animate-spin" />
  </div>
});

export function HeroSection() {
  const { t } = useLanguage();
  const notify = usePluginTestingNotice();

  return (
    <section className="relative flex flex-col items-center justify-start overflow-hidden bg-[#FAFAF8] px-6 lg:px-11 pt-[100px] pb-[100px] min-h-screen w-full">
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Animated Grid Background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(26, 26, 26, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(26, 26, 26, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        >
          <motion.div
            animate={{
              backgroundPosition: ['0px 0px', '60px 60px'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 107, 53, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 107, 53, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FAFAF8]" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(255, 107, 53, 0.08) 0%, transparent 60%)",
          }}
        />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/logotyps-horizontal-resized-1768677535430.webp?width=8000&height=8000&resize=contain"
              alt="Logotyps"
              className="h-7"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden md:flex items-center gap-2 px-2 py-2 rounded-full bg-[#1A1A1A] text-white"
          >
            <LanguageSelector />
            <a href="#pricing" className="text-sm px-4 py-2 rounded-full hover:bg-white/10 transition-colors">
              {t.nav.pricing}
            </a>
            <a href="#faq" className="text-sm px-4 py-2 rounded-full hover:bg-white/10 transition-colors">
              {t.nav.faq}
            </a>
            <button
              onClick={notify}
              className="text-sm px-4 py-2 rounded-full bg-[#FF6B35] hover:bg-[#FF6B35]/90 transition-colors cursor-pointer"
            >
              {t.nav.getStarted}
            </button>
          </motion.div>
        </div>
      </nav>

      <div className="relative z-10 flex flex-col items-center max-w-[1200px] w-full mx-auto">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] bg-white border border-[#E5E5E3] mb-6"
          >
            <img
              src="/Adobe_Illustrator_logo.png"
              alt="Adobe Illustrator"
              className="w-5 h-5"
            />
            <span className="text-sm font-medium text-[#1A1A1A]">{t.hero.badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-[900px] text-[40px] md:text-[56px] lg:text-[72px] leading-[1.05] tracking-[-0.03em] text-[#1A1A1A] mb-6 font-[400]"
            style={{ fontFamily: 'Gelica, sans-serif' }}
          >
            {t.hero.title}{" "}
            <span className="text-gradient-orange">{t.hero.titleHighlight}</span>{" "}
            {t.hero.titleEnd}
            </motion.h1>

            <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-[500px] text-base md:text-lg leading-[1.5] text-[#737373] mb-8"
          >
            {t.hero.subtitle}
          </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative my-8"
            >
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(255, 107, 53, 0.12) 0%, transparent 60%)",
                }}
              />
              <Chrome3DLogo />
            </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-6"
          >
            {/* Primary Button - Download now */}
            <motion.button
              onClick={notify}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-[#FF6B35] text-white rounded-full font-medium text-base hover:bg-[#FF8F66] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              {t.hero.downloadNow}
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            {/* Secondary Button - Learn more */}
            <motion.button
              onClick={notify}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-[#1A1A1A] rounded-full font-medium text-base border-2 border-[#E5E5E3] hover:border-[#FF6B35] transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {t.hero.learnMore}
            </motion.button>
          </motion.div>

          {/* Video Play Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-10"
          >
            <motion.button
              onClick={notify}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 text-[#1A1A1A] hover:text-[#FF6B35] transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-white border-2 border-[#E5E5E3] group-hover:border-[#FF6B35] flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                <Play className="w-5 h-5 fill-current" />
              </div>
              <span className="text-sm font-medium">{t.hero.watchDemo}</span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-3">
              {/* Apple Logo */}
              <div className="w-9 h-9 p-1.5 bg-white rounded-xl shadow-sm border border-[#E5E5E3] overflow-hidden flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" fill="#1A1A1A">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
              </div>
              {/* Windows Logo */}
              <div className="w-9 h-9 p-1.5 bg-white rounded-xl shadow-sm border border-[#E5E5E3] overflow-hidden flex items-center justify-center">
                <svg viewBox="0 0 88 88" className="w-[18px] h-[18px]" fill="#1A1A1A">
                  <path d="M0 12.402l35.687-4.86.016 34.423-35.67.203zm35.67 33.529l.028 34.453L.028 75.48.026 45.7zm4.326-39.025L87.314 0v41.527l-47.318.376zm47.329 39.349l-.011 41.34-47.318-6.678-.066-34.739z"/>
                </svg>
              </div>
            </div>
            <p className="text-xs text-[#737373]">{t.hero.compatible}</p>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-[#1A1A1A]/20 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-[#FF6B35]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
