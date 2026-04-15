"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Palette, Layers, Download, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function ParametersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const parameters = [
    {
      icon: Palette,
      title: t.parameters.param1Title,
      description: t.parameters.param1Desc,
      features: t.parameters.param1Features,
    },
    {
      icon: Layers,
      title: t.parameters.param2Title,
      description: t.parameters.param2Desc,
      features: t.parameters.param2Features,
    },
    {
      icon: Download,
      title: t.parameters.param3Title,
      description: t.parameters.param3Desc,
      features: t.parameters.param3Features,
    },
    {
      icon: Settings,
      title: t.parameters.param4Title,
      description: t.parameters.param4Desc,
      features: t.parameters.param4Features,
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
            {t.parameters.badge}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-[400] mb-4" style={{ fontFamily: 'Gelica, sans-serif' }}>
            {t.parameters.title} <span className="text-gradient-orange">{t.parameters.titleHighlight}</span>
          </h2>
          <p className="text-lg text-[#737373] max-w-2xl mx-auto">
            {t.parameters.subtitle}
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
                <h3 className="text-xl font-[400] mb-3" style={{ fontFamily: 'Gelica, sans-serif' }}>{param.title}</h3>
                <p className="text-sm text-[#737373] mb-6">{param.description}</p>
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
