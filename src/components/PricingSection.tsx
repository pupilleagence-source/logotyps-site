"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CHECKOUT_LIFETIME, CHECKOUT_MONTHLY, DOWNLOAD_PAGE } from "@/lib/links";

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const p = t.pricing;

  // Les deux licences existent réellement chez Lemon Squeezy (produit « License ») :
  // Logotyps+ 6,50 €/mois et Lifetime 25 €. L'essai gratuit = 3 générations dans le plugin.
  const plans = [
    { name: p.freeName, price: p.freePrice, period: "", description: p.freeDesc, features: p.freeFeatures, cta: p.ctaFree, href: DOWNLOAD_PAGE, external: false, popular: false },
    { name: p.plusName, price: p.plusPrice, period: p.perMonth, description: p.plusDesc, features: p.plusFeatures, cta: p.ctaPlus, href: CHECKOUT_MONTHLY, external: true, popular: false },
    { name: p.lifeName, price: p.lifePrice, period: p.oneTime, description: p.lifeDesc, features: p.lifeFeatures, cta: p.ctaLife, href: CHECKOUT_LIFETIME, external: true, popular: true },
  ];

  return (
    <section ref={ref} id="pricing" className="py-24 px-4 bg-[#F5F5F3]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-medium mb-4">
            {p.badge}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-[400] mb-4" style={{ fontFamily: "Gelica, sans-serif" }}>
            {p.title} <span className="text-gradient-orange">{p.titleHighlight}</span> {p.titleEnd}
          </h2>
          <p className="text-lg text-[#737373] max-w-2xl mx-auto">{p.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#FF6B35] text-white text-sm font-medium flex items-center gap-1 whitespace-nowrap z-10">
                  <Sparkles className="w-4 h-4" /> {p.mostPopular}
                </div>
              )}
              <div
                className={`bg-white rounded-2xl border p-7 md:p-8 h-full flex flex-col transition-all duration-300 ${
                  plan.popular ? "border-[#FF6B35] shadow-xl shadow-[#FF6B35]/10" : "border-[#E5E5E3] hover:border-[#FF6B35]/30 hover:shadow-lg"
                }`}
              >
                <div className="mb-5">
                  <h3 className="text-xl font-[400] mb-1" style={{ fontFamily: "Gelica, sans-serif" }}>{plan.name}</h3>
                  <p className="text-sm text-[#737373]">{plan.description}</p>
                </div>
                <div className="mb-6 flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-bold tracking-tight">{plan.price}</span>
                  {plan.period && <span className="text-sm text-[#737373]">{plan.period}</span>}
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 text-[#FF6B35] flex-shrink-0 mt-0.5" />
                      <span className="text-[#4a4a4a]">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.href}
                  target={plan.external ? "_blank" : undefined}
                  rel={plan.external ? "noopener noreferrer" : undefined}
                  className={`w-full inline-flex items-center justify-center rounded-full py-3 px-5 text-sm font-medium transition-all duration-200 hover:scale-[1.02] whitespace-nowrap ${
                    plan.popular
                      ? "bg-[#FF6B35] text-white hover:bg-[#FF8F66] shadow-lg shadow-[#FF6B35]/20"
                      : "bg-white text-[#1A1A1A] border border-[#E5E5E3] hover:border-[#FF6B35] hover:text-[#FF6B35]"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-[#737373]/80 mt-8">{p.note}</p>
      </div>
    </section>
  );
}
