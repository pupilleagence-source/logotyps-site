"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Layers, FolderOpen, Palette, Clock } from "lucide-react";

function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
}

function LogoMultiplierAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="absolute w-12 h-12 rounded-lg bg-[#1A1A1A] flex items-center justify-center"
        initial={{ x: -40 }}
        animate={{ x: [-40, 0, 0, -40], opacity: [1, 1, 0.5, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#FF6B35">
          <circle cx="12" cy="12" r="4" />
        </svg>
      </motion.div>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-8 rounded-lg flex items-center justify-center"
          style={{
            backgroundColor: i % 2 === 0 ? "#FF6B35" : "#1A1A1A",
          }}
          initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
          animate={{
            x: [0, 20 + (i % 3) * 25],
            y: [0, -30 + (i % 2) * 60],
            scale: [0, 1],
            opacity: [0, 1, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 0.5 + i * 0.15,
            ease: "easeOut",
          }}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill={i % 2 === 0 ? "#FFF" : "#FF6B35"}>
            <circle cx="12" cy="12" r="3" />
          </svg>
        </motion.div>
      ))}
      <div className="absolute right-4 top-4 text-right">
        <span className="text-3xl font-bold text-[#FF6B35]">
          <AnimatedCounter end={150} />+
        </span>
        <p className="text-xs text-[#737373]">variations</p>
      </div>
    </div>
  );
}

function FolderExportAnimation() {
  const formats = ["SVG", "PNG", "PDF", "EPS", "AI", "JPG", "WEBP"];
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="relative">
        <FolderOpen className="w-16 h-16 text-[#FF6B35]" />
        {formats.map((format, i) => (
          <motion.div
            key={format}
            className="absolute top-1/2 left-1/2 px-2 py-1 bg-white rounded text-[10px] font-semibold border border-[#E5E5E3] shadow-sm"
            initial={{ x: -20, y: -10, opacity: 0 }}
            animate={{
              x: [-20, 30 + (i % 2) * 20],
              y: [-10, -40 + i * 15],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeOut",
            }}
          >
            .{format.toLowerCase()}
          </motion.div>
        ))}
      </div>
      <div className="absolute right-4 bottom-4">
        <span className="text-2xl font-bold text-[#1A1A1A]">7</span>
        <p className="text-xs text-[#737373]">export types</p>
      </div>
    </div>
  );
}

function ColorPaletteAnimation() {
  const colors = ["#FF6B35", "#1A1A1A", "#FFFFFF", "#737373", "#FF8F66", "#F5F5F3"];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="flex gap-1">
        {colors.map((color, i) => (
          <motion.div
            key={i}
            className="w-6 h-16 rounded-full"
            style={{ backgroundColor: color, border: color === "#FFFFFF" ? "1px solid #E5E5E3" : "none" }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: [0, 1, 1, 0.8, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <Palette className="absolute right-4 top-4 w-6 h-6 text-[#FF6B35]" />
    </div>
  );
}

function SpeedAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <Clock className="w-20 h-20 text-[#E5E5E3]" />
        <motion.div
          className="absolute top-1/2 left-1/2 w-1 h-8 bg-[#FF6B35] rounded-full origin-bottom"
          style={{ transform: "translate(-50%, -100%)" }}
        />
      </motion.div>
      <div className="absolute right-4 bottom-4 text-right">
        <span className="text-2xl font-bold text-[#1A1A1A]">&lt;30s</span>
        <p className="text-xs text-[#737373]">generation time</p>
      </div>
    </div>
  );
}

function LayersAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-16 h-10 rounded-lg border-2"
          style={{
            borderColor: i === 0 ? "#FF6B35" : "#E5E5E3",
            backgroundColor: i === 0 ? "#FF6B35" : "white",
          }}
          animate={{
            y: [0, -i * 8, -i * 12, -i * 8, 0],
            rotateX: [0, 10, 20, 10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
      <Layers className="absolute right-4 top-4 w-6 h-6 text-[#737373]" />
    </div>
  );
}

export function BentoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const bentoItems = [
    {
      title: "Instant Variations",
      description: "One logo input creates 150+ perfectly formatted variations automatically",
      animation: <LogoMultiplierAnimation />,
      className: "lg:col-span-2 lg:row-span-2",
    },
    {
      title: "Smart Exports",
      description: "7 file formats, all sizes, all at once",
      animation: <FolderExportAnimation />,
      className: "lg:col-span-1 lg:row-span-1",
    },
    {
      title: "Color Magic",
      description: "Auto-generates color variations for any context",
      animation: <ColorPaletteAnimation />,
      className: "lg:col-span-1 lg:row-span-1",
    },
    {
      title: "Lightning Fast",
      description: "Complete brand package in under 30 seconds",
      animation: <SpeedAnimation />,
      className: "lg:col-span-1 lg:row-span-1",
    },
    {
      title: "Organized Output",
      description: "Perfectly structured folders, ready for delivery",
      animation: <LayersAnimation />,
      className: "lg:col-span-1 lg:row-span-1",
    },
  ];

  return (
    <section ref={ref} className="py-24 px-4 bg-[#F5F5F3]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ fontFamily: "var(--font-syne)" }}>
            Built for <span className="text-gradient-orange">efficiency</span>
          </h2>
          <p className="text-lg text-[#737373] max-w-2xl mx-auto" style={{ fontFamily: "var(--font-instrument)" }}>
            Every feature designed to save you hours of repetitive work.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-4">
          {bentoItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`bg-white rounded-2xl border border-[#E5E5E3] p-6 shadow-sm hover:shadow-lg transition-shadow ${item.className}`}
            >
              <div className="h-40 mb-4 bg-[#FAFAF8] rounded-xl overflow-hidden">
                {item.animation}
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-syne)" }}>{item.title}</h3>
              <p className="text-sm text-[#737373]" style={{ fontFamily: "var(--font-instrument)" }}>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
