"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export function MacbookShowcaseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-200px" });
  const [isIllustratorOpen, setIsIllustratorOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const { t } = useLanguage();

  // Reset states when leaving view
  useEffect(() => {
    if (!isInView) {
      setIsIllustratorOpen(false);
      setHasBeenOpened(false);
    }
  }, [isInView]);

  return (
    <section ref={ref} className="py-32 px-4 bg-[#1a1a1a] relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(255, 107, 53, 0.15) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white font-[400]"
            style={{ fontFamily: 'Gelica, sans-serif' }}
          >
            {t.macbook.title1}
            <br />
            <span className="text-gradient-orange">{t.macbook.title2}</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t.macbook.subtitle}
          </p>
        </motion.div>

        {/* MacBook mockup */}
        <div className="relative max-w-5xl mx-auto" style={{ perspective: '2000px' }}>
          <div
            style={{ transformStyle: 'preserve-3d' }}
            className="relative"
          >
            {/* MacBook lid (screen) */}
            <motion.div
              initial={{ rotateX: -95, opacity: 0 }}
              animate={isInView ? { rotateX: 0, opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                transformOrigin: 'bottom',
                transformStyle: 'preserve-3d',
              }}
              className="relative z-10 mx-auto max-w-[95%]"
            >
              {/* Screen bezel */}
              <div className="bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] rounded-t-2xl md:rounded-t-3xl border border-gray-800/50 p-2 md:p-4 shadow-2xl">
                {/* Screen */}
                <div className="bg-black rounded-lg md:rounded-xl overflow-hidden aspect-[16/10] relative shadow-inner">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 md:w-32 h-4 md:h-6 bg-black rounded-b-2xl z-20 shadow-lg" />

                  {/* Screen content */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: 1.7 }}
                    className="w-full h-full relative"
                  >
                    <img
                      src="/macos-sierra.jpg"
                      alt="macOS Sierra wallpaper"
                      className="w-full h-full object-cover"
                    />

                    {/* Illustrator app icon */}
                    {!isIllustratorOpen && (
                      <motion.div
                        key="illustrator-icon"
                        initial={{ scale: 0, opacity: 0, y: 0 }}
                        animate={isInView ? {
                          scale: 1,
                          opacity: 1,
                          y: [0, -8, 0, -4, 0]
                        } : { scale: 0, opacity: 0 }}
                        transition={{
                          scale: {
                            duration: 0.5,
                            delay: hasBeenOpened ? 0 : 2.2,
                            ease: [0.34, 1.56, 0.64, 1]
                          },
                          opacity: {
                            duration: 0.5,
                            delay: hasBeenOpened ? 0 : 2.2
                          },
                          y: {
                            duration: 1.2,
                            delay: hasBeenOpened ? 0.5 : 3,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: [0.34, 1.56, 0.64, 1]
                          }
                        }}
                        onClick={() => {
                          setIsIllustratorOpen(true);
                          setHasBeenOpened(true);
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                      >
                        <div className="relative group">
                          {/* App icon */}
                          <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl bg-gradient-to-br from-[#330000] to-[#1a0000] border border-[#4a0000]/30 shadow-2xl flex items-center justify-center backdrop-blur-sm hover:scale-110 transition-transform">
                            <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#FF9A00]" style={{ fontFamily: 'Arial, sans-serif' }}>
                              Ai
                            </span>
                          </div>
                          {/* App label */}
                          <div className="mt-1 md:mt-2 text-center">
                            <p className="text-[8px] md:text-[10px] text-white font-medium drop-shadow-lg">Illustrator</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Illustrator Window */}
                    {isIllustratorOpen && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                        className="absolute inset-2 md:inset-4 bg-[#2D2D2D] rounded-lg shadow-2xl flex flex-col overflow-hidden"
                      >
                        {/* Window title bar */}
                        <div className="bg-[#1F1F1F] px-2 md:px-3 py-1 md:py-2 flex items-center justify-between border-b border-[#3a3a3a]">
                          <div className="flex items-center gap-1 md:gap-2">
                            <div className="flex gap-1">
                              <button
                                onClick={() => setIsIllustratorOpen(false)}
                                className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF3B30] transition-colors"
                              />
                              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#FFBD2E]" />
                              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#28CA42]" />
                            </div>
                            <span className="text-[8px] md:text-xs text-white ml-2 md:ml-3">Adobe Illustrator</span>
                          </div>
                        </div>

                        {/* Window content */}
                        <div className="flex-1 bg-[#2D2D2D] overflow-hidden p-1 md:p-2">
                          <img
                            src="/capture-illustrator.png"
                            alt="Illustrator interface"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* MacBook base (keyboard area) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-b-2xl md:rounded-b-3xl border-x border-b border-gray-800/50 pt-2 md:pt-3 pb-2 md:pb-4 px-4 md:px-8 shadow-2xl">
                {/* Trackpad */}
                <div className="h-0.5 md:h-1 w-20 md:w-32 mx-auto bg-gradient-to-b from-gray-700 to-gray-800 rounded-full shadow-inner" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 10px 25px -5px rgba(255, 107, 53, 0.3)",
                "0 10px 35px -5px rgba(255, 107, 53, 0.5)",
                "0 10px 25px -5px rgba(255, 107, 53, 0.3)",
              ],
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="group relative px-8 py-4 bg-[#FF6B35] text-white rounded-full font-medium text-base md:text-lg hover:bg-[#FF8F66] transition-colors duration-300"
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF6B35] via-[#FF8F66] to-[#FF6B35] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: "200% 100%"
              }}
            />
            <span className="relative z-10">Try Logotyps for Free</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
