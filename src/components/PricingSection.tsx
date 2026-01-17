"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Sparkles } from "lucide-react";
import { StarBorderButton } from "./StarBorderButton";

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for freelancers and small projects",
      features: [
        "50 logo generations/month",
        "All color variations",
        "PNG & SVG exports",
        "Basic folder structure",
        "Email support",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      description: "For agencies and design studios",
      features: [
        "Unlimited logo generations",
        "All color variations",
        "All export formats (7 types)",
        "Advanced folder structure",
        "Priority support",
        "Custom size presets",
        "Brand guidelines export",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large teams with specific needs",
      features: [
        "Everything in Professional",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
        "SLA guarantee",
        "On-premise deployment",
        "Custom training",
      ],
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
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Simple, <span className="text-gradient-orange">transparent</span> pricing
          </h2>
          <p className="text-lg text-[#737373] max-w-2xl mx-auto">
            Choose the plan that fits your workflow. No hidden fees, cancel anytime.
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
                  <Sparkles className="w-4 h-4" /> Most Popular
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
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
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
                  <StarBorderButton className="w-full justify-center text-base py-3">
                    Start Free Trial
                  </StarBorderButton>
                ) : (
                  <motion.button
                    className="w-full py-3 rounded-full border border-[#E5E5E3] font-medium hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
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
