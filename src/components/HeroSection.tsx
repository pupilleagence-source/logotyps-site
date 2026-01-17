"use client";

import { motion } from "framer-motion";
import { StarBorderButton, SecondaryButton } from "./StarBorderButton";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const Chrome3DLogo = dynamic(() => import("./Chrome3DLogo").then(mod => ({ default: mod.Chrome3DLogo })), {
  ssr: false,
  loading: () => <div className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px]" />
});

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-start overflow-hidden bg-[#FAFAF8] px-6 lg:px-11 pt-[140px] pb-[100px] min-h-screen w-full">
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
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
            <a href="#pricing" className="text-sm px-4 py-2 rounded-full hover:bg-white/10 transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-sm px-4 py-2 rounded-full hover:bg-white/10 transition-colors">
              FAQ
            </a>
            <a href="#" className="text-sm px-4 py-2 rounded-full bg-[#FF6B35] hover:bg-[#FF6B35]/90 transition-colors">
              Get Started
            </a>
          </motion.div>
        </div>
      </nav>

      <div className="relative z-10 flex flex-col items-center max-w-[1200px] w-full mx-auto">
        <div className="flex flex-col items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-[900px] text-[40px] md:text-[56px] lg:text-[72px] leading-[1.05] tracking-[-0.03em] text-[#1A1A1A] mb-6"
          >
            Generate all your{" "}
            <span className="text-gradient-orange">logo variations</span>{" "}
            in seconds
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
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
            
            <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-[500px] text-base md:text-lg leading-[1.5] text-[#737373] mb-8"
          >
            Stop wasting hours creating logo variations manually. From colors to exports — 
            everything generated from a single design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-10"
          >
            <StarBorderButton className="text-base px-8 py-4">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </StarBorderButton>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 p-1.5 bg-white rounded-xl shadow-sm border border-[#E5E5E3] overflow-hidden flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#FF6B35">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div className="w-9 h-9 p-1.5 bg-white rounded-xl shadow-sm border border-[#E5E5E3] overflow-hidden flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#330000">
                  <path d="M9.5 16.5h5L12 6.5l-2.5 10zm2.5-14a10 10 0 100 20 10 10 0 000-20z"/>
                </svg>
              </div>
            </div>
            <p className="text-xs text-[#737373]">Works with Adobe Illustrator CC 2020+</p>
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
