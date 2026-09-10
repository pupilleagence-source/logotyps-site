"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Check, Folder, FileImage, FileText, BookOpen, RefreshCw, Layers, Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { DOWNLOAD_PAGE } from "@/lib/links";

// Arborescence réellement produite par le plugin (voir CLAUDE.md §5.3 du dépôt du
// plugin) : <Logopack>/<version>/<couleur>/<FORMAT>/<taille>_<nom>.<ext>
const TREE: { name: string; depth: number; kind: "folder" | "file"; muted?: boolean }[] = [
  { name: "horizontal", depth: 1, kind: "folder" },
  { name: "original", depth: 2, kind: "folder" },
  { name: "PNG", depth: 3, kind: "folder" },
  { name: "petit_horizontal.png", depth: 4, kind: "file" },
  { name: "moyen_horizontal.png", depth: 4, kind: "file" },
  { name: "grand_horizontal.png", depth: 4, kind: "file" },
  { name: "SVG · PDF · AI · JPG", depth: 3, kind: "folder", muted: true },
  { name: "blackwhite · monochrome · monochromeLight · custom", depth: 2, kind: "folder", muted: true },
  { name: "vertical", depth: 1, kind: "folder" },
  { name: "icon", depth: 1, kind: "folder" },
  { name: "text", depth: 1, kind: "folder" },
  { name: "favicon", depth: 1, kind: "folder" },
  { name: "presentation-logo.idml", depth: 1, kind: "file" },
];

export function LogoSystemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const s = t.system;

  const points = [
    { Icon: Layers, title: s.point1Title, desc: s.point1Desc },
    { Icon: FileImage, title: s.point2Title, desc: s.point2Desc },
    { Icon: BookOpen, title: s.point3Title, desc: s.point3Desc },
    { Icon: RefreshCw, title: s.point4Title, desc: s.point4Desc },
  ];

  const stats = [
    { value: s.stat1Value, label: s.stat1 },
    { value: s.stat2Value, label: s.stat2 },
    { value: s.stat3Value, label: s.stat3 },
  ];

  return (
    <section ref={ref} id="system" className="relative pt-24 md:pt-32 pb-16 md:pb-20 px-6 lg:px-11 bg-[#1A1A1A] overflow-hidden">
      {/* Fond */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[700px]"
          style={{ background: "radial-gradient(ellipse at center, rgba(255, 107, 53, 0.16) 0%, transparent 60%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.06) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-14 md:mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#FF6B35]/20 text-[#FF6B35] text-sm font-medium mb-5">
            {s.badge}
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-[60px] text-white font-[400] leading-[1.05] mb-5 text-balance"
            style={{ fontFamily: "Gelica, sans-serif" }}
          >
            {s.title1}
            <br />
            <span className="text-gradient-orange">{s.title2}</span>
          </h2>
          <p className="text-base md:text-lg text-white/60">{s.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Colonne gauche : les 4 points + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-6 order-2 lg:order-1"
          >
            <ul className="space-y-5 md:space-y-6">
              {points.map(({ Icon, title, desc }, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#FF6B35]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-medium mb-1">{title}</h3>
                    <p className="text-white/55 text-sm md:text-[15px] leading-relaxed">{desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
              <a
                href={DOWNLOAD_PAGE}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF6B35] hover:bg-[#FF8F66] text-white font-medium px-7 py-3.5 transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-[#FF6B35]/25 whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                {s.cta}
                <ArrowRight className="w-4 h-4" />
              </a>
              <span className="text-xs text-white/40">{s.ctaHint}</span>
            </div>
          </motion.div>

          {/* Colonne droite : arborescence + charte */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 order-1 lg:order-2 grid gap-4 sm:grid-cols-5"
          >
            {/* Arborescence */}
            <div className="sm:col-span-3 rounded-2xl bg-[#101010] border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
                  <Folder className="w-4 h-4 text-[#FF6B35]" />
                  {s.folderTitle}
                </div>
                <span className="text-[11px] text-white/35">{s.folderHint}</span>
              </div>
              <ul className="px-3 py-3 font-mono text-[12px] leading-6">
                {TREE.map((n, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                    className={`flex items-center gap-2 truncate ${n.muted ? "text-white/35" : n.kind === "file" ? "text-white/60" : "text-white/85"}`}
                    style={{ paddingLeft: `${(n.depth - 1) * 14}px` }}
                  >
                    {n.kind === "folder" ? (
                      <Folder className={`w-3.5 h-3.5 shrink-0 ${n.muted ? "text-white/25" : "text-[#FF6B35]/80"}`} />
                    ) : (
                      <FileText className="w-3.5 h-3.5 shrink-0 text-white/30" />
                    )}
                    <span className="truncate">{n.name}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Charte + chiffres */}
            <div className="sm:col-span-2 flex flex-col gap-4">
              <div className="rounded-2xl bg-[#101010] border border-white/10 overflow-hidden">
                <div className="aspect-[4/3] bg-[#0b0b0b]">
                  <img src="/plugin-demo/after-mockup.png" alt={s.mockupTitle} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="px-4 py-3">
                  <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
                    <BookOpen className="w-4 h-4 text-[#FF6B35]" />
                    {s.mockupTitle}
                  </div>
                  <p className="text-[11px] text-white/35 mt-0.5">{s.mockupHint}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {stats.map((st, i) => (
                  <div key={i} className="rounded-xl bg-white/[0.05] border border-white/10 px-2 py-3 text-center">
                    <div className="text-2xl font-semibold text-white leading-none">{st.value}</div>
                    <div className="text-[11px] text-white/45 mt-1">{st.label}</div>
                  </div>
                ))}
              </div>

              <div className="hidden sm:flex items-center gap-2 text-[11px] text-white/40 px-1">
                <Check className="w-3.5 h-3.5 text-[#FF6B35]" />
                PNG · JPG · SVG · PDF · AI
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
