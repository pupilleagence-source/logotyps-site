"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  const faqs = [
    {
      question: t.faq.question1,
      answer: t.faq.answer1,
    },
    {
      question: t.faq.question2,
      answer: t.faq.answer2,
    },
    {
      question: t.faq.question3,
      answer: t.faq.answer3,
    },
    {
      question: t.faq.question4,
      answer: t.faq.answer4,
    },
    {
      question: t.faq.question5,
      answer: t.faq.answer5,
    },
    {
      question: t.faq.question6,
      answer: t.faq.answer6,
    },
    {
      question: t.faq.question7,
      answer: t.faq.answer7,
    },
    {
      question: t.faq.question8,
      answer: t.faq.answer8,
    },
  ];

  return (
    <section ref={ref} id="faq" className="py-24 px-4 bg-[#FAFAF8]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-medium mb-4">
            {t.faq.badge}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-[400] mb-4" style={{ fontFamily: 'Gelica, sans-serif' }}>
            {t.faq.title} <span className="text-gradient-orange">{t.faq.titleHighlight}</span>
          </h2>
          <p className="text-lg text-[#737373]">
            {t.faq.subtitle}
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <div
                className={`bg-white rounded-xl border transition-all duration-300 ${
                  openIndex === i
                    ? "border-[#FF6B35]/30 shadow-lg"
                    : "border-[#E5E5E3] hover:border-[#FF6B35]/20"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <h3 className="font-[400] text-base pr-4" style={{ fontFamily: 'Gelica, sans-serif' }}>
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className={`w-5 h-5 transition-colors ${openIndex === i ? "text-[#FF6B35]" : "text-[#737373]"}`} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5">
                        <p className="text-[#737373] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
