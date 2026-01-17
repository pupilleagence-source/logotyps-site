"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StarBorderButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function StarBorderButton({ children, className = "", onClick }: StarBorderButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white rounded-full overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="absolute inset-0 gradient-orange" />
      <span className="absolute inset-0 rounded-full overflow-hidden">
        <motion.span
          className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0deg,#fff_60deg,transparent_120deg)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ opacity: 0.3 }}
        />
      </span>
      <span
        className="absolute inset-[2px] rounded-full gradient-orange"
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: "0 0 30px rgba(255, 107, 53, 0.5), 0 0 60px rgba(255, 107, 53, 0.3)",
        }}
        animate={{
          boxShadow: [
            "0 0 20px rgba(255, 107, 53, 0.4), 0 0 40px rgba(255, 107, 53, 0.2)",
            "0 0 40px rgba(255, 107, 53, 0.6), 0 0 80px rgba(255, 107, 53, 0.4)",
            "0 0 20px rgba(255, 107, 53, 0.4), 0 0 40px rgba(255, 107, 53, 0.2)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.button>
  );
}

export function SecondaryButton({ children, className = "", onClick }: StarBorderButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center px-6 py-3 text-base font-medium border border-[#1A1A1A]/20 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white hover:border-[#1A1A1A]/30 transition-all duration-300 ${className}`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
