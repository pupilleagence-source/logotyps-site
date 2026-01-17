"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is Logotyps and how does it work?",
      answer: "Logotyps is an Adobe Illustrator plugin that automatically generates all logo variations from a single design. Simply select your logo, run the plugin, and it creates all color variations, background options, and exports them in multiple formats — all organized in a structured folder system.",
    },
    {
      question: "Which Adobe Illustrator versions are supported?",
      answer: "Logotyps supports Adobe Illustrator CC 2020 and later versions. We recommend using the latest version for the best experience and access to all features.",
    },
    {
      question: "How many logo variations does Logotyps create?",
      answer: "Depending on your settings, Logotyps can generate 150+ variations per logo. This includes different color schemes (primary, inverse, monochrome, brand colors), background options (transparent, white, black, colored), and all standard export formats.",
    },
    {
      question: "What export formats are available?",
      answer: "Logotyps exports in 7 formats: SVG, PNG (multiple sizes), PDF, EPS, AI, JPG, and WEBP. Each format is optimized for its intended use case — vectors for print and scalability, rasters for web and social media.",
    },
    {
      question: "Can I customize the output settings?",
      answer: "Absolutely! You can customize color palettes, choose which variations to generate, set custom sizes, define your folder structure, and even save presets for future projects. Professional and Enterprise plans offer even more customization options.",
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes! We offer a 14-day free trial with full access to all Professional features. No credit card required. You can generate up to 10 logos during the trial period.",
    },
    {
      question: "How do I install the plugin?",
      answer: "After subscribing, you'll receive a download link and installation instructions. The process takes less than 2 minutes: download the .zxp file, open it with Adobe Exchange, and restart Illustrator. The plugin will appear in your Extensions menu.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time from your account dashboard. Your access will continue until the end of your current billing period. We also offer a 30-day money-back guarantee.",
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
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Got <span className="text-gradient-orange">questions?</span>
          </h2>
          <p className="text-lg text-[#737373]">
            Everything you need to know about Logotyps.
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
                  <h3 className="font-semibold text-base pr-4">
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
