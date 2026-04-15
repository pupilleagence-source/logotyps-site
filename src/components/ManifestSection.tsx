"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

function Chrome3DLogo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center" style={{ perspective: "1000px" }}>
      <motion.div
        className="relative"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="relative w-48 h-48 md:w-64 md:h-64"
          style={{
            background: "linear-gradient(180deg, #e8e8e8 0%, #b8b8b8 30%, #d0d0d0 50%, #a0a0a0 70%, #c8c8c8 100%)",
            borderRadius: "24px",
            boxShadow: `
              0 20px 60px rgba(0,0,0,0.3),
              0 10px 30px rgba(0,0,0,0.2),
              inset 0 2px 0 rgba(255,255,255,0.5),
              inset 0 -2px 0 rgba(0,0,0,0.1)
            `,
          }}
        >
          <div
            className="absolute inset-4 flex items-center justify-center"
            style={{
              background: "linear-gradient(180deg, #f5f5f5 0%, #e0e0e0 50%, #d5d5d5 100%)",
              borderRadius: "16px",
              boxShadow: "inset 0 2px 4px rgba(255,255,255,0.8), inset 0 -2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/logotyps-icon-1768677535568.png?width=8000&height=8000&resize=contain"
              alt="Logotyps Icon"
              className="w-24 h-24 md:w-32 md:h-32 object-contain"
              style={{
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
              }}
            />
          </div>
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${50 + mousePosition.x * 50}% ${50 + mousePosition.y * 50}%, rgba(255,255,255,0.4) 0%, transparent 50%)`,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export function ManifestSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section ref={ref} className="py-32 px-4 bg-[#1A1A1A] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-[#FF6B35]/20 text-[#FF6B35] text-sm font-medium mb-6">
              {t.manifest.badge}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-[400] mb-6 leading-tight" style={{ fontFamily: 'Gelica, sans-serif' }}>
              {t.manifest.title}{" "}
              <span className="text-gradient-orange">{t.manifest.titleHighlight}</span>
            </h2>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              {t.manifest.subtitle1}
            </p>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              {t.manifest.subtitle2}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#FF6B35]/20 flex items-center justify-center">
                  <span className="text-xl font-bold text-[#FF6B35]">5K+</span>
                </div>
                <span className="text-sm text-white/60">{t.manifest.stat1}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#FF6B35]/20 flex items-center justify-center">
                  <span className="text-xl font-bold text-[#FF6B35]">2M+</span>
                </div>
                <span className="text-sm text-white/60">{t.manifest.stat2}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#FF6B35]/20 flex items-center justify-center">
                  <span className="text-xl font-bold text-[#FF6B35]">98%</span>
                </div>
                <span className="text-sm text-white/60">{t.manifest.stat3}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[400px] md:h-[500px]"
          >
            <Chrome3DLogo />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
