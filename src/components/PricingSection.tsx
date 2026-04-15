"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Sparkles } from "lucide-react";
import { StarBorderButton } from "./StarBorderButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePluginTestingNotice } from "@/lib/usePluginTestingNotice";

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const notify = usePluginTestingNotice();

  const plans = [
    {
      name: t.pricing.plan1Name,
      price: "$29",
      period: t.pricing.perMonth,
      description: t.pricing.plan1Desc,
      features: t.pricing.plan1Features,
      popular: false,
    },
    {
      name: t.pricing.plan2Name,
      price: "$79",
      period: t.pricing.perMonth,
      description: t.pricing.plan2Desc,
      features: t.pricing.plan2Features,
      popular: true,
    },
    {
      name: t.pricing.plan3Name,
      price: t.pricing.custom,
      period: "",
      description: t.pricing.plan3Desc,
      features: t.pricing.plan3Features,
      popular: false,
    },
  ];

  return (
    <section ref={ref} id="pricing" className="py-24 px-4 bg-[#F5F5F3]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-medium mb-4">
            {t.pricing.badge}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-[400] mb-4" style={{ fontFamily: 'Gelica, sans-serif' }}>
            {t.pricing.title} <span className="text-gradient-orange">{t.pricing.titleHighlight}</span> {t.pricing.titleEnd}
          </h2>
          <p className="text-lg text-[#737373] max-w-2xl mx-auto">
            {t.pricing.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#FF6B35] text-white text-sm font-medium flex items-center gap-1">
                  <Sparkles className="w-4 h-4" /> {t.pricing.mostPopular}
                </div>
              )}
              <div
                className={`bg-white rounded-2xl border p-8 h-full flex flex-col ${
                  plan.popular
                    ? "border-[#FF6B35] shadow-xl shadow-[#FF6B35]/10"
                    : "border-[#E5E5E3] hover:border-[#FF6B35]/30 hover:shadow-lg"
                } transition-all duration-300`}
              >
                <div className="mb-6">
                  <h3 className="text-xl font-[400] mb-2" style={{ fontFamily: 'Gelica, sans-serif' }}>{plan.name}</h3>
                  <p className="text-sm text-[#737373]">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl md:text-5xl font-bold">{plan.price}</span>
                  <span className="text-[#737373]">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <Check className="w-5 h-5 text-[#FF6B35] flex-shrink-0 mt-0.5" />
                      <span className="text-[#737373]">{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.popular ? (
                  <StarBorderButton onClick={notify} className="w-full justify-center text-base py-3">
                    {t.pricing.startTrial}
                  </StarBorderButton>
                ) : (
                  <motion.button
                    onClick={notify}
                    className="w-full py-3 rounded-full border border-[#E5E5E3] font-medium hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {plan.price === t.pricing.custom ? t.pricing.contactSales : t.pricing.getStarted}
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
