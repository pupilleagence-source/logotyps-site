"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { checkoutUrl, LAUNCH, PRICING_ANCHOR } from "@/lib/links";

// Rappel compact des tarifs sur la page /download : mêmes textes et mêmes liens de
// paiement que la grille complète de l'accueil (PricingSection), sans la liste des
// fonctionnalités. Le détail reste sur l'accueil, ancre #pricing.
export function PricingRecap() {
  const { t, language } = useLanguage();
  const p = t.pricing;
  const u = t.download;

  const plans = [
    { name: p.freeName, price: p.freePrice, period: "", note: u.recapFreeNote, cta: null as string | null, href: "", popular: false },
    { name: p.plusName, price: p.plusPrice, period: p.perYear, note: p.billedYearly, cta: p.ctaPlus, href: checkoutUrl("annual", language), popular: false },
    { name: p.lifeName, price: p.lifePrice, period: p.oneTime, note: u.recapSeats3, cta: p.ctaLife, href: checkoutUrl("lifetime", language), popular: true },
    { name: p.studioName, price: p.studioPrice, period: p.oneTime, note: u.recapSeats15, cta: p.ctaStudio, href: checkoutUrl("studio", language), popular: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.32 }}
      className="text-left mb-12"
    >
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4">
        <div>
          <h2 className="text-lg font-[400] text-[#1A1A1A]" style={{ fontFamily: "Gelica, sans-serif" }}>{u.recapTitle}</h2>
          <p className="text-sm text-[#1A1A1A]/60">{u.recapHint}</p>
        </div>
        <a href={PRICING_ANCHOR} className="inline-flex items-center gap-1 text-sm text-[#FF6B35] hover:underline whitespace-nowrap">
          {u.recapDetails} <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {LAUNCH.enabled && (
        <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] text-white text-xs px-3 py-1.5">
          {p.launch} <code className="font-mono font-semibold tracking-wide bg-white/15 rounded px-1.5 py-0.5">{LAUNCH.code}</code>
        </p>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`relative rounded-[16px] bg-white border p-4 flex flex-col ${plan.popular ? "border-[#FF6B35] shadow-lg shadow-[#FF6B35]/10" : "border-[#E5E5E3]"}`}
          >
            {plan.popular && (
              <span className="absolute -top-2.5 left-4 inline-flex items-center gap-1 rounded-full bg-[#FF6B35] text-white text-[10px] font-medium px-2 py-0.5">
                <Sparkles className="w-3 h-3" /> {p.mostPopular}
              </span>
            )}
            <div className="text-sm text-[#1A1A1A]/70 mb-1">{plan.name}</div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-2xl font-bold tracking-tight text-[#1A1A1A]">{plan.price}</span>
              {plan.period && <span className="text-xs text-[#1A1A1A]/50">{plan.period}</span>}
            </div>
            <div className="text-xs text-[#1A1A1A]/50 mb-4 flex-1">{plan.note}</div>
            {plan.cta ? (
              <a
                href={plan.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center rounded-full py-2 px-3 text-xs font-medium transition-colors whitespace-nowrap ${
                  plan.popular ? "bg-[#FF6B35] text-white hover:bg-[#FF8F66]" : "bg-[#F5F5F3] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
                }`}
              >
                {plan.cta}
              </a>
            ) : (
              <span className="inline-flex items-center justify-center rounded-full py-2 px-3 text-xs font-medium bg-[#F5F5F3] text-[#1A1A1A]/50">{u.recapFreeCta}</span>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-[#1A1A1A]/50 mt-3">{p.guarantee}</p>
    </motion.div>
  );
}
