"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Vidéo d'installation en surimpression (FAQ de l'accueil). La piste suit la langue du
// site ; la lecture démarre à l'ouverture, ce qui est permis car l'ouverture est un clic.
export function VideoLightbox({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, language } = useLanguage();
  const lang = language === "fr" ? "fr" : "en";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4 sm:p-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={t.faq.videoTitle}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label={t.faq.videoClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <motion.div
            initial={{ scale: 0.96, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 12 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-white/70 text-sm mb-3" style={{ fontFamily: "Gelica, sans-serif" }}>{t.faq.videoTitle}</p>
            <div className="rounded-[16px] overflow-hidden bg-black aspect-video shadow-2xl">
              <video
                key={lang}
                className="w-full h-full"
                controls
                autoPlay
                playsInline
                preload="metadata"
                poster={`/video/installation-${lang}.jpg`}
              >
                <source src={`/video/installation-${lang}.mp4`} type="video/mp4" />
              </video>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
