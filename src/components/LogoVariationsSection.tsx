"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export function LogoVariationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const [showAfter, setShowAfter] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);

  const exportFormats = ["SVG", "PNG", "PDF", "EPS", "AI", "JPG", "WEBP"];

  // Close PDF modal with Escape key
  useEffect(() => {
    if (!pdfOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPdfOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [pdfOpen]);

  const beforeItems = [
    { src: "/plugin-demo/before-icon.png", label: t.logoVariations.iconOnly },
    { src: "/plugin-demo/before-font.png", label: t.logoVariations.textOnly },
  ];

  const afterItems = [
    { src: "/plugin-demo/after-horizontal.png", label: t.logoVariations.horizontalLabel },
    { src: "/plugin-demo/after-vertical.png", label: t.logoVariations.verticalLabel },
    { src: "/plugin-demo/after-bw.png", label: t.logoVariations.monochrome },
    { src: "/plugin-demo/after-monochrome.png", label: t.logoVariations.brandColor },
    { src: "/plugin-demo/after-mockup.png", label: "Mockup" },
  ];

  return (
    <section ref={ref} className="py-24 px-4 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto">
        {/* --- Title --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-medium mb-4">
            {t.logoVariations.badge}
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-[400] mb-4"
            style={{ fontFamily: "Gelica, sans-serif" }}
          >
            {t.logoVariations.title}{" "}
            <span className="text-gradient-orange">{t.logoVariations.titleHighlight}</span>
          </h2>
          <p className="text-lg text-[#737373] max-w-2xl mx-auto">
            {t.logoVariations.subtitle}
          </p>
        </motion.div>

        {/* --- Before / After Card --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          {/* Toggle Tabs */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-white rounded-full border border-[#E5E5E3] p-1 shadow-sm">
              <button
                onClick={() => setShowAfter(false)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  !showAfter
                    ? "bg-[#1A1A1A] text-white shadow-sm"
                    : "text-[#737373] hover:text-[#1A1A1A]"
                }`}
              >
                {t.logoVariations.beforeLabel}
              </button>
              <button
                onClick={() => setShowAfter(true)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  showAfter
                    ? "bg-[#FF6B35] text-white shadow-sm"
                    : "text-[#737373] hover:text-[#1A1A1A]"
                }`}
              >
                {t.logoVariations.afterLabel}
              </button>
            </div>
          </div>

          {/* Card with swipe gesture */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60 && !showAfter) setShowAfter(true);
              if (info.offset.x > 60 && showAfter) setShowAfter(false);
            }}
            className="bg-white rounded-2xl border border-[#E5E5E3] shadow-lg overflow-hidden cursor-grab active:cursor-grabbing select-none"
          >
            <AnimatePresence mode="wait">
              {!showAfter ? (
                /* ========== AVANT ========== */
                <motion.div
                  key="before"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                  className="p-6 md:p-8"
                >
                  <div className="text-xs font-medium text-[#999] uppercase tracking-wider mb-4">
                    {t.logoVariations.inputElements}
                  </div>

                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {beforeItems.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + i * 0.05 }}
                        className="bg-[#F8F8F6] rounded-xl p-4 md:p-6 flex flex-col items-center justify-center aspect-square border border-[#ECECEA]"
                      >
                        <div className="flex-1 w-full flex items-center justify-center min-h-0">
                          <div className="w-[55%] aspect-square flex items-center justify-center">
                            <img
                              src={item.src}
                              alt={item.label}
                              draggable={false}
                              className="w-full h-full object-contain pointer-events-none"
                            />
                          </div>
                        </div>
                        <span className="text-[11px] text-[#999] mt-3 font-medium">
                          {item.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#F0F0EE]">
                    <div className="flex items-center gap-2 text-sm text-[#999]">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      {t.logoVariations.elementsSelected}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#999]">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {t.logoVariations.manualTime}
                    </div>
                  </div>

                  <div className="flex justify-center mt-4">
                    <motion.div
                      className="flex items-center gap-1.5 text-xs text-[#bbb]"
                      animate={{ x: [0, 6, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <span>{t.logoVariations.swipeHint}</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                /* ========== APRÈS ========== */
                <motion.div
                  key="after"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.35 }}
                  className="p-6 md:p-8"
                >
                  <div className="text-xs font-medium text-[#FF6B35] uppercase tracking-wider mb-4">
                    {t.logoVariations.generatedOutput}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {afterItems.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + i * 0.05 }}
                        className="rounded-xl p-3 flex flex-col items-center justify-center aspect-square bg-[#F8F8F6] border border-[#ECECEA] overflow-hidden"
                      >
                        <div className="flex-1 w-full flex items-center justify-center min-h-0">
                          <img
                            src={item.src}
                            alt={item.label}
                            draggable={false}
                            className="max-w-full max-h-full object-contain pointer-events-none"
                          />
                        </div>
                        <span className="text-[10px] text-[#999] mt-2 font-medium">
                          {item.label}
                        </span>
                      </motion.div>
                    ))}

                    {/* 6th case : Brand guide template → opens PDF viewer */}
                    <motion.button
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={() => setPdfOpen(true)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + afterItems.length * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group rounded-xl p-3 flex flex-col items-center justify-center aspect-square bg-[#DD1A23] border border-[#DD1A23] overflow-hidden relative cursor-pointer"
                    >
                      <div className="flex-1 w-full flex flex-col items-center justify-center text-white">
                        <svg className="w-10 h-10 mb-2 opacity-95" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <span className="text-[11px] font-semibold tracking-wide text-center leading-tight px-1">
                          {t.logoVariations.brandGuide}
                        </span>
                      </div>
                      <span className="text-[10px] text-white/90 mt-2 font-medium flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {t.logoVariations.viewPdf}
                      </span>
                    </motion.button>
                  </div>

                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#F0F0EE]">
                    <div className="flex items-center gap-2 text-sm text-[#FF6B35] font-medium">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                      </svg>
                      {t.logoVariations.generatedCount}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#FF6B35] font-medium">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                      {t.logoVariations.automatedTime}
                    </div>
                  </div>

                  <div className="flex justify-center mt-4">
                    <motion.div
                      className="flex items-center gap-1.5 text-xs text-[#bbb]"
                      animate={{ x: [0, -6, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <svg className="w-3.5 h-3.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <span>{t.logoVariations.swipeHint}</span>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* --- Export Formats --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-2xl border border-[#E5E5E3] p-8 shadow-lg"
        >
          <h3 className="text-xl font-[400] mb-6" style={{ fontFamily: "Gelica, sans-serif" }}>
            {t.logoVariations.exportFormats}
          </h3>
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

      {/* --- PDF Viewer Modal --- */}
      <AnimatePresence>
        {pdfOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setPdfOpen(false)}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#E5E5E3] bg-[#FAFAF8]">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  <span className="font-medium text-sm text-[#1A1A1A]">presentation-logo.pdf</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="/plugin-demo/presentation-logo.pdf"
                    download
                    className="text-xs font-medium text-[#737373] hover:text-[#1A1A1A] px-3 py-1.5 rounded-lg hover:bg-[#F0F0EE] transition-colors flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    Download
                  </a>
                  <button
                    onClick={() => setPdfOpen(false)}
                    className="w-8 h-8 rounded-lg hover:bg-[#F0F0EE] flex items-center justify-center text-[#737373] hover:text-[#1A1A1A] transition-colors"
                    aria-label="Close"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* PDF iframe */}
              <div className="flex-1 bg-[#525659]">
                <iframe
                  src="/plugin-demo/presentation-logo.pdf#view=FitH"
                  className="w-full h-full"
                  title="presentation-logo.pdf"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
