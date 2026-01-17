"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function LogoVariationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const logoVariations = [
    { type: "Primary", bg: "#FFFFFF", fg: "#1A1A1A", desc: "Light backgrounds" },
    { type: "Inverse", bg: "#1A1A1A", fg: "#FFFFFF", desc: "Dark backgrounds" },
    { type: "Monochrome", bg: "#F5F5F3", fg: "#737373", desc: "Subtle contexts" },
    { type: "Brand Color", bg: "#FF6B35", fg: "#FFFFFF", desc: "High impact" },
    { type: "Gradient", bg: "linear-gradient(135deg, #FF6B35, #FF8F66)", fg: "#FFFFFF", desc: "Modern touch" },
    { type: "Outline", bg: "transparent", fg: "#1A1A1A", border: true, desc: "Minimal style" },
  ];

  const exportFormats = ["SVG", "PNG", "PDF", "EPS", "AI", "JPG", "WEBP"];

  return (
    <section ref={ref} className="py-24 px-4 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-medium mb-4">
            Visual Demonstration
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ fontFamily: "var(--font-syne)" }}>
            One logo, <span className="text-gradient-orange">infinite possibilities</span>
          </h2>
          <p className="text-lg text-[#737373] max-w-2xl mx-auto" style={{ fontFamily: "var(--font-instrument)" }}>
            Watch your single design transform into a complete brand package with every variation you&apos;ll ever need.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl border border-[#E5E5E3] p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-medium text-[#737373] uppercase tracking-wider">Input</span>
                <div className="flex-1 h-px bg-[#E5E5E3]" />
              </div>
              <div className="aspect-square bg-[#F5F5F3] rounded-xl flex items-center justify-center">
                <img
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/logotyps-icon-1768677535568.png?width=8000&height=8000&resize=contain"
                  alt="Original Logo"
                  className="w-32 h-32 object-contain"
                />
              </div>
              <p className="text-center mt-4 text-sm text-[#737373]">Your original logo design</p>
            </div>
            <motion.div
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-10"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-12 h-12 rounded-full bg-[#FF6B35] flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl border border-[#E5E5E3] p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-medium text-[#737373] uppercase tracking-wider">Output</span>
                <div className="flex-1 h-px bg-[#E5E5E3]" />
                <span className="text-xs font-semibold text-[#FF6B35]">150+ variations</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {logoVariations.map((variant, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center p-2 ${variant.border ? "border-2 border-[#E5E5E3]" : ""}`}
                    style={{ background: variant.bg }}
                  >
                    <svg viewBox="0 0 40 40" className="w-8 h-8 mb-1" fill={variant.fg}>
                      <circle cx="20" cy="20" r="6" />
                      <path d="M20 6 L21 11 L20 10 L19 11 Z" />
                      <path d="M20 34 L21 29 L20 30 L19 29 Z" />
                      <path d="M6 20 L11 21 L10 20 L11 19 Z" />
                      <path d="M34 20 L29 21 L30 20 L29 19 Z" />
                    </svg>
                    <span className={`text-[10px] font-medium ${variant.fg === "#FFFFFF" ? "text-white/80" : "text-[#737373]"}`}>
                      {variant.type}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-2xl border border-[#E5E5E3] p-8 shadow-lg"
        >
          <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "var(--font-syne)" }}>Export Formats</h3>
          <div className="flex flex-wrap gap-3">
            {exportFormats.map((format, i) => (
              <motion.div
                key={format}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.05 }}
                className="px-6 py-3 rounded-xl bg-[#F5F5F3] border border-[#E5E5E3] hover:border-[#FF6B35] hover:bg-[#FF6B35]/5 transition-all cursor-default"
              >
                <span className="font-semibold text-sm">.{format.toLowerCase()}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
