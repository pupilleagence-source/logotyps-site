"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Palette, Layers, Download, Settings } from "lucide-react";

export function ParametersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const parameters = [
    {
      icon: Palette,
      title: "Color Variations",
      description: "Automatically generate light, dark, monochrome, and brand color versions of your logo.",
      features: ["Primary & Secondary", "Inverse modes", "Monochrome", "Custom brand colors"],
    },
    {
      icon: Layers,
      title: "Background Options",
      description: "Create versions optimized for any background context your clients might need.",
      features: ["Transparent", "White & Black", "Gradient backgrounds", "Colored backgrounds"],
    },
    {
      icon: Download,
      title: "Export Formats",
      description: "Export in every format your clients will ever ask for, all at once.",
      features: ["SVG & EPS vectors", "PNG & JPG rasters", "PDF for print", "AI source files"],
    },
    {
      icon: Settings,
      title: "Size Presets",
      description: "Pre-configured sizes for every use case from favicon to billboard.",
      features: ["Social media sizes", "Web & app icons", "Print resolutions", "Custom dimensions"],
    },
  ];

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
            Parameters
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ fontFamily: "var(--font-syne)" }}>
            Total <span className="text-gradient-orange">control</span>
          </h2>
          <p className="text-lg text-[#737373] max-w-2xl mx-auto" style={{ fontFamily: "var(--font-instrument)" }}>
            Customize every aspect of your logo generation process with intuitive parameters.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {parameters.map((param, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl border border-[#E5E5E3] p-6 h-full hover:border-[#FF6B35]/30 hover:shadow-lg transition-all duration-300">
                <motion.div
                  className="w-14 h-14 rounded-xl bg-[#F5F5F3] flex items-center justify-center mb-6 group-hover:bg-[#FF6B35]/10 transition-colors"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  <param.icon className="w-7 h-7 text-[#1A1A1A] group-hover:text-[#FF6B35] transition-colors" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-syne)" }}>{param.title}</h3>
                <p className="text-sm text-[#737373] mb-6" style={{ fontFamily: "var(--font-instrument)" }}>{param.description}</p>
                <ul className="space-y-2">
                  {param.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-[#737373]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
