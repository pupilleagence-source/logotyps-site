"use client";

import { motion } from "framer-motion";
import { StarBorderButton, SecondaryButton } from "./StarBorderButton";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

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
        <div className="relative flex justify-center w-full mb-8">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none">
            <div 
              className="w-full h-full"
              style={{
                background: "radial-gradient(circle, rgba(255, 107, 53, 0.15) 0%, transparent 70%)",
              }}
            />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative w-[280px] md:w-[320px] lg:w-[380px]">
              <div 
                className="relative bg-white rounded-[32px] p-4 shadow-2xl shadow-black/10 border border-[#E5E5E3]"
                style={{
                  background: "linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 100%)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27CA3F]" />
                  <span className="ml-2 text-[10px] text-[#737373]">Logotyps Plugin</span>
                </div>
                
                <div className="bg-[#F5F5F3] rounded-2xl p-4 mb-4">
                  <div className="flex items-center justify-center mb-4">
                    <img
                      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/logotyps-icon-1768677535568.png?width=8000&height=8000&resize=contain"
                      alt="Logo Input"
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="text-center text-xs text-[#737373]">Original Logo</div>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[
                    { bg: "#FFFFFF", fg: "#1A1A1A" },
                    { bg: "#1A1A1A", fg: "#FFFFFF" },
                    { bg: "#FF6B35", fg: "#FFFFFF" },
                    { bg: "#F5F5F3", fg: "#737373" },
                    { bg: "linear-gradient(135deg, #FF6B35, #FF8F66)", fg: "#FFFFFF" },
                    { bg: "#2D2D2D", fg: "#FF6B35" },
                    { bg: "#E8E8E8", fg: "#1A1A1A" },
                    { bg: "#FF8F66", fg: "#FFFFFF" },
                  ].map((v, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                      className="aspect-square rounded-lg flex items-center justify-center"
                      style={{ background: v.bg }}
                    >
                      <svg viewBox="0 0 40 40" className="w-5 h-5" fill={v.fg}>
                        <circle cx="20" cy="20" r="4" />
                        <path d="M20 8 L21 12 L20 11 L19 12 Z" />
                        <path d="M20 32 L21 28 L20 29 L19 28 Z" />
                      </svg>
                    </motion.div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#737373]">8 of 150+ variations</span>
                  <div className="flex items-center gap-1">
                    <motion.div
                      className="w-20 h-1.5 rounded-full bg-[#E5E5E3] overflow-hidden"
                    >
                      <motion.div
                        className="h-full bg-[#FF6B35] rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, delay: 1 }}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

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
