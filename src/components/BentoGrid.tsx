"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileDown, Layers, Zap, Palette, Monitor } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const BentoGrid: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="features" className="py-32 px-6 bg-[#FAFAF8]">
      <div className="max-w-[1550px] mx-auto">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-[400] tracking-tight text-neutral-900 mb-6" style={{ fontFamily: 'Gelica, sans-serif' }}>{t.bento.title}</h2>
          <p className="text-xl text-neutral-500">{t.bento.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-6 h-auto md:h-[600px]">

          {/* Card 1: 1 Input -> Many Outputs (Large) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4 bg-white rounded-3xl p-8 border border-neutral-200 shadow-lg shadow-neutral-100 flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="absolute top-0 right-0 p-8 w-1/2 h-full hidden md:flex items-center justify-center">
              {/* Animation: 1 square splitting into many */}
              <div className="relative w-full h-full flex items-center justify-center">
                 <motion.div
                    animate={{ scale: [1, 0], opacity: [1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    className="absolute w-16 h-16 bg-neutral-900 rounded-xl z-10"
                 />
                 <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                        transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 1 }}
                        className={`w-8 h-8 rounded-md ${i % 3 === 0 ? 'bg-[#FF6B35]' : 'bg-neutral-200'}`}
                      />
                    ))}
                 </div>
              </div>
            </div>
            <div className="relative z-10 md:w-1/2 h-full flex flex-col justify-end md:justify-center">
              <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mb-4 text-[#FF6B35]">
                <Layers />
              </div>
              <h3 className="text-2xl font-[400] text-neutral-900 mb-2" style={{ fontFamily: 'Gelica, sans-serif' }}>{t.bento.massGeneration}</h3>
              <p className="text-neutral-500">{t.bento.massGenerationDesc}</p>
            </div>
          </motion.div>

          {/* Card 2: Exports */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 bg-neutral-900 rounded-3xl p-8 border border-neutral-800 shadow-lg flex flex-col justify-between relative overflow-hidden"
          >
             <div className="absolute top-4 right-4 opacity-20">
                <FileDown size={100} className="text-white" />
             </div>
             <div className="flex gap-2 mb-8">
               {['AI', 'SVG', 'PNG', 'PDF', 'JPG'].map((ext, i) => (
                 <motion.div
                   key={ext}
                   animate={{ y: [0, -10, 0] }}
                   transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                   className="px-2 py-1 bg-white/10 rounded text-xs text-white/70 font-mono"
                 >
                   .{ext}
                 </motion.div>
               ))}
             </div>
             <div>
               <h3 className="text-2xl font-[400] text-white mb-2" style={{ fontFamily: 'Gelica, sans-serif' }}>{t.bento.multiFormat}</h3>
               <p className="text-neutral-400">{t.bento.multiFormatDesc}</p>
             </div>
          </motion.div>

          {/* Card 3: Color Permutations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 bg-white rounded-3xl p-8 border border-neutral-200 shadow-lg shadow-neutral-100 flex flex-col justify-between"
          >
             <div className="mb-4 flex gap-2">
                <motion.div animate={{ backgroundColor: ["#ea580c", "#000000", "#ffffff"] }} transition={{ duration: 3, repeat: Infinity }} className="w-10 h-10 rounded-full border border-neutral-200" />
                <motion.div animate={{ backgroundColor: ["#000000", "#ffffff", "#ea580c"] }} transition={{ duration: 3, repeat: Infinity }} className="w-10 h-10 rounded-full border border-neutral-200" />
                <motion.div animate={{ backgroundColor: ["#ffffff", "#ea580c", "#000000"] }} transition={{ duration: 3, repeat: Infinity }} className="w-10 h-10 rounded-full border border-neutral-200" />
             </div>
             <div>
               <h3 className="text-xl font-[400] text-neutral-900 mb-2" style={{ fontFamily: 'Gelica, sans-serif' }}>{t.bento.smartColoring}</h3>
               <p className="text-neutral-500 text-sm">{t.bento.smartColoringDesc}</p>
             </div>
          </motion.div>

          {/* Card 4: Speed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 bg-white rounded-3xl p-8 border border-neutral-200 shadow-lg shadow-neutral-100 flex flex-col justify-between"
          >
             <div className="w-full h-2 bg-neutral-100 rounded-full mb-8 overflow-hidden">
                <motion.div
                  animate={{ x: ["-100%", "0%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "circInOut" }}
                  className="w-full h-full bg-[#FF6B35]"
                />
             </div>
             <div>
               <h3 className="text-xl font-[400] text-neutral-900 mb-2" style={{ fontFamily: 'Gelica, sans-serif' }}>{t.bento.lightningFast}</h3>
               <p className="text-neutral-500 text-sm">{t.bento.lightningFastDesc}</p>
             </div>
          </motion.div>

          {/* Card 5: Contextual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 bg-white rounded-3xl p-8 border border-neutral-200 shadow-lg shadow-neutral-100 flex flex-col justify-between"
          >
             <div className="flex justify-center mb-4">
               <Monitor className="text-neutral-400" size={48} />
             </div>
             <div>
               <h3 className="text-xl font-[400] text-neutral-900 mb-2" style={{ fontFamily: 'Gelica, sans-serif' }}>{t.bento.contextual}</h3>
               <p className="text-neutral-500 text-sm">{t.bento.contextualDesc}</p>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};