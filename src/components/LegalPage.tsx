"use client";

import type { ReactNode } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";
import { Footer } from "./FinalCTASection";
import { useLanguage } from "@/contexts/LanguageContext";
import { getLegal, type LegalBlock } from "@/lib/legal-content";

// Page juridique générique : /privacy et /terms partagent la mise en page de /download.
// Le texte vient de src/lib/legal-content.ts (EN / FR), l'identité de src/lib/legal.ts.

// [libellé](url) → lien ; le reste est rendu tel quel.
function renderInline(text: string) {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const href = m[2];
    const external = /^https?:\/\//.test(href);
    parts.push(
      <a
        key={m.index}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="text-[#FF6B35] underline decoration-[#FF6B35]/40 underline-offset-2 hover:decoration-[#FF6B35] break-words"
      >
        {m[1]}
      </a>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function Block({ block }: { block: LegalBlock }) {
  if (Array.isArray(block)) {
    return (
      <ul className="space-y-2 pl-1">
        {block.map((item, i) => (
          <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-[#3a3a3a]">
            <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6B35]" />
            <span className="min-w-0">{renderInline(item)}</span>
          </li>
        ))}
      </ul>
    );
  }
  return <p className="text-[15px] leading-relaxed text-[#3a3a3a]">{renderInline(block)}</p>;
}

export function LegalPage({ doc }: { doc: "privacy" | "terms" }) {
  const { language } = useLanguage();
  const legal = getLegal(language);
  const d = legal[doc];
  const ui = legal.ui;
  const other = doc === "privacy" ? { href: "/terms", label: ui.termsLink } : { href: "/privacy", label: ui.privacyLink };

  return (
    <main className="min-h-screen bg-[#FAFAF8] flex flex-col">
      <div className="grain-overlay" />

      <nav className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <a href="/" aria-label="Logotyps" className="shrink-0">
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/logotyps-horizontal-resized-1768677535430.webp?width=8000&height=8000&resize=contain"
              alt="Logotyps"
              className="h-7"
            />
          </a>
          <div className="flex items-center gap-2 px-2 py-2 rounded-full bg-[#1A1A1A] text-white">
            <LanguageSelector />
            <a href="/" className="text-sm px-4 py-2 rounded-full hover:bg-white/10 transition-colors flex items-center gap-2 whitespace-nowrap">
              <ArrowLeft className="w-4 h-4" /> {ui.backHome}
            </a>
          </div>
        </div>
      </nav>

      <section className="relative flex-1 px-6 lg:px-11 pt-12 pb-24">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] max-w-full h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(255, 107, 53, 0.08) 0%, transparent 60%)" }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <header className="mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-[#FF6B35] mb-3">{ui.updated}</p>
            <h1
              className="text-4xl md:text-5xl font-[400] text-[#1A1A1A] leading-tight mb-4"
              style={{ fontFamily: "Gelica, sans-serif" }}
            >
              {d.title}
            </h1>
            <p className="text-lg text-[#1A1A1A]/60 leading-relaxed">{d.subtitle}</p>
          </header>

          <nav aria-label={ui.toc} className="mb-10 rounded-2xl border border-[#E5E5E3] bg-white p-5 md:p-6">
            <p className="text-sm font-medium text-[#1A1A1A] mb-3">{ui.toc}</p>
            <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
              {d.sections.map((s) => (
                <li key={s.id}>
                  <a href={"#" + s.id} className="text-sm text-[#737373] hover:text-[#FF6B35] transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-10">
            {d.sections.map((s) => (
              <article key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="text-xl md:text-2xl font-[400] text-[#1A1A1A] mb-4" style={{ fontFamily: "Gelica, sans-serif" }}>
                  {s.title}
                </h2>
                <div className="space-y-3">
                  {s.body.map((b, i) => (
                    <Block key={i} block={b} />
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 rounded-2xl bg-[#1A1A1A] text-white p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-white/60 mb-1">{ui.seeAlso}</p>
              <a href={other.href} className="text-lg hover:text-[#FF6B35] transition-colors" style={{ fontFamily: "Gelica, sans-serif" }}>
                {other.label}
              </a>
            </div>
            <p className="text-sm text-white/60 inline-flex items-center gap-2 [&_a]:text-white [&_a]:decoration-white/40">
              <Mail className="w-4 h-4 shrink-0" /> <span>{renderInline(ui.contact)}</span>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
