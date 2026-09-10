"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Apple, Monitor, Download, ArrowLeft, CheckCircle2 } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";
import { Footer } from "./FinalCTASection";
import { useLanguage } from "@/contexts/LanguageContext";

// Backend du plugin : version courante + redirection vers l'installeur.
// /api/download répond par une 302 vers le fichier : le navigateur télécharge,
// le visiteur reste sur logotyps.fr.
const API = "https://logotyps.vercel.app";
const DOWNLOAD = (platform: "mac" | "windows") => `${API}/api/download?platform=${platform}`;

type Latest = { version: string; releaseDate: string; changelog: string[] };
type Platform = "mac" | "windows";

function detectPlatform(): Platform | null {
  if (typeof navigator === "undefined") return null;
  const s = `${navigator.platform || ""} ${navigator.userAgent || ""}`.toLowerCase();
  if (/mac|darwin|iphone|ipad/.test(s)) return "mac";
  if (/win/.test(s)) return "windows";
  return null;
}

export function DownloadPage() {
  const { t, language } = useLanguage();
  const u = t.download;
  const [latest, setLatest] = useState<Latest | null>(null);
  const [failed, setFailed] = useState(false);
  const [platform, setPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    setPlatform(detectPlatform());
    const controller = new AbortController();
    fetch(`${API}/api/version/latest`, { signal: controller.signal, cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: Latest) => setLatest(d))
      .catch(() => setFailed(true));
    return () => controller.abort();
  }, []);

  const releaseDate = latest?.releaseDate
    ? new Date(latest.releaseDate).toLocaleDateString(language === "fr" ? "fr-FR" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const buttons: { key: Platform; label: string; file: string; Icon: typeof Apple }[] = [
    { key: "mac", label: u.mac, file: ".pkg", Icon: Apple },
    { key: "windows", label: u.windows, file: ".exe", Icon: Monitor },
  ];
  // La plateforme détectée passe en premier et en couleur.
  const ordered = platform === "windows" ? [...buttons].reverse() : buttons;

  return (
    <main className="min-h-screen bg-[#FAFAF8] flex flex-col">
      <div className="grain-overlay" />

      <nav className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" aria-label="Logotyps">
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/logotyps-horizontal-resized-1768677535430.webp?width=8000&height=8000&resize=contain"
              alt="Logotyps"
              className="h-7"
            />
          </a>
          <div className="flex items-center gap-2 px-2 py-2 rounded-full bg-[#1A1A1A] text-white">
            <LanguageSelector />
            <a href="/" className="text-sm px-4 py-2 rounded-full hover:bg-white/10 transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> {u.backHome}
            </a>
          </div>
        </div>
      </nav>

      <section className="relative flex-1 px-6 lg:px-11 pt-16 pb-24">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(255, 107, 53, 0.08) 0%, transparent 60%)" }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] bg-white border border-[#E5E5E3] mb-6"
          >
            <img src="/Adobe_Illustrator_logo.png" alt="Adobe Illustrator" className="w-5 h-5" />
            <span className="text-sm text-[#1A1A1A]/70">{u.badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl md:text-6xl font-[400] text-[#1A1A1A] leading-tight mb-4"
            style={{ fontFamily: "Gelica, sans-serif" }}
          >
            {u.title} <span className="text-gradient-orange">{u.titleHighlight}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-[#1A1A1A]/60 mb-10 max-w-xl mx-auto"
          >
            {u.subtitle}
          </motion.p>

          {/* Version */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white border border-[#E5E5E3] mb-8 text-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF6B35]" />
            {latest ? (
              <span className="text-[#1A1A1A]">
                <strong>{u.version} {latest.version}</strong>
                {releaseDate && <span className="text-[#1A1A1A]/50"> · {releaseDate}</span>}
              </span>
            ) : failed ? (
              <span className="text-[#1A1A1A]/60">{u.versionUnavailable}</span>
            ) : (
              <span className="text-[#1A1A1A]/50">{u.loading}</span>
            )}
          </motion.div>

          {/* Boutons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4"
          >
            {ordered.map(({ key, label, file, Icon }, i) => {
              const primary = platform ? key === platform : i === 0;
              return (
                <a
                  key={key}
                  href={DOWNLOAD(key)}
                  className={`group inline-flex items-center justify-center gap-2.5 rounded-full pl-5 pr-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 hover:scale-[1.02] ${
                    primary
                      ? "bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B35]/25"
                      : "bg-white text-[#1A1A1A] border border-[#E5E5E3] hover:border-[#1A1A1A]/30"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>
                    {u.downloadFor} <strong className="font-semibold">{label}</strong>
                  </span>
                  <span className={`text-[11px] rounded-full px-2 py-0.5 ${primary ? "bg-white/15 text-white/85" : "bg-[#F5F5F3] text-[#1A1A1A]/50"}`}>{file}</span>
                  <Download className="w-4 h-4 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
              );
            })}
          </motion.div>
          <p className="text-xs text-[#1A1A1A]/40 mb-16">{u.sizeHint}</p>

          {/* Étapes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid sm:grid-cols-3 gap-4 text-left mb-12"
          >
            {[u.step1, u.step2, u.step3].map((step, i) => (
              <div key={i} className="rounded-[16px] bg-white border border-[#E5E5E3] p-5">
                <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white text-sm flex items-center justify-center mb-3">{i + 1}</div>
                <p className="text-sm text-[#1A1A1A]/80 leading-relaxed">{step}</p>
              </div>
            ))}
          </motion.div>

          {/* Nouveautés */}
          {latest && latest.changelog && latest.changelog.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="rounded-[16px] bg-white border border-[#E5E5E3] p-6 text-left mb-8"
            >
              <h2 className="text-sm font-semibold text-[#1A1A1A] mb-3">
                {u.whatsNew} {latest.version}
              </h2>
              <ul className="space-y-2">
                {latest.changelog.map((line, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#1A1A1A]/70">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#FF6B35] shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          <p className="text-sm text-[#1A1A1A]/50 max-w-xl mx-auto">{u.hotUpdateNote}</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
