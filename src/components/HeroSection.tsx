"use client";

import { motion } from "framer-motion";
import { RippleGrid } from "./RippleGrid";
import { StarBorderButton, SecondaryButton } from "./StarBorderButton";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAF8] via-[#FAFAF8] to-[#F5F5F3]" />
      <RippleGrid />
      <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAF8] via-transparent to-transparent pointer-events-none" />

      <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/logotyps-horizontal-resized-1768677535430.webp?width=8000&height=8000&resize=contain"
              alt="Logotyps"
              className="h-8"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-4"
          >
            <a href="#pricing" className="text-sm font-medium hover:text-[#FF6B35] transition-colors">Pricing</a>
            <a href="#faq" className="text-sm font-medium hover:text-[#FF6B35] transition-colors">FAQ</a>
            <SecondaryButton className="text-sm px-4 py-2">Get Started</SecondaryButton>
          </motion.div>
        </div>
      </nav>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#E5E5E3] text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-pulse" />
            Adobe Illustrator Plugin
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[0.95]"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Generate all your{" "}
          <span className="text-gradient-orange">logo variations</span>
          <br />
          in seconds
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-[#737373] max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ fontFamily: "var(--font-instrument)" }}
        >
          Stop wasting hours creating logo variations manually. Logotyps automatically generates 
          colors, backgrounds, formats, and exports — all from a single design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <StarBorderButton>
            Start Free Trial <ArrowRight className="w-5 h-5" />
          </StarBorderButton>
          <SecondaryButton className="gap-2">
            <Play className="w-4 h-4" /> Watch Demo
          </SecondaryButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAF8] to-transparent z-10 pointer-events-none h-32 bottom-0 top-auto" />
          <div className="relative rounded-2xl overflow-hidden border border-[#E5E5E3] shadow-2xl shadow-black/10 bg-white p-2">
            <div className="bg-[#2D2D2D] rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#3D3D3D]">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27CA3F]" />
                <span className="ml-4 text-xs text-white/60">Adobe Illustrator — Logotyps Plugin</span>
              </div>
              <div className="p-8 flex items-center justify-center min-h-[300px]">
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { bg: "#FFFFFF", fg: "#1A1A1A" },
                    { bg: "#1A1A1A", fg: "#FFFFFF" },
                    { bg: "#FF6B35", fg: "#FFFFFF" },
                    { bg: "#F5F5F3", fg: "#1A1A1A" },
                    { bg: "linear-gradient(135deg, #FF6B35, #FF8F66)", fg: "#FFFFFF" },
                    { bg: "#2D2D2D", fg: "#FF6B35" },
                    { bg: "#FAFAF8", fg: "#FF6B35" },
                    { bg: "transparent", fg: "#FFFFFF", border: true },
                  ].map((variant, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                      className={`w-20 h-20 rounded-xl flex items-center justify-center ${variant.border ? "border-2 border-white/30" : ""}`}
                      style={{ background: variant.bg }}
                    >
                      <svg viewBox="0 0 40 40" className="w-10 h-10" fill={variant.fg}>
                        <circle cx="20" cy="20" r="8" />
                        <path d="M20 4 L22 12 L20 10 L18 12 Z" />
                        <path d="M20 36 L22 28 L20 30 L18 28 Z" />
                        <path d="M4 20 L12 22 L10 20 L12 18 Z" />
                        <path d="M36 20 L28 22 L30 20 L28 18 Z" />
                      </svg>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
