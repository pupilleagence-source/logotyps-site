"use client";

import React from 'react';

interface StarBorderButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  dark?: boolean;
  className?: string;
}

export const StarBorderButton: React.FC<StarBorderButtonProps> = ({
  children,
  className = "",
  onClick,
  dark = true
}) => {
  const textColor = dark ? "text-white" : "text-neutral-900";
  const bgColor = dark ? "bg-neutral-900" : "bg-white";

  return (
    <button
      onClick={onClick}
      className={`relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2 focus:ring-offset-slate-50 ${className}`}
    >
      <span
        className="absolute inset-[-1000%] animate-border-spin"
        style={{
          background: 'conic-gradient(from 90deg at 50% 50%, #E2E8F0 0%, #FF6B35 50%, #E2E8F0 100%)'
        }}
      />
      <span className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full ${bgColor} px-8 py-1 text-sm font-medium ${textColor} backdrop-blur-3xl transition-all duration-200 hover:scale-[1.02]`}>
        {children}
      </span>
    </button>
  );
};
