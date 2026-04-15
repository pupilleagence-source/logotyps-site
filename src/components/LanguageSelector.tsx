"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 px-2 py-2 rounded-full bg-white/10">
      <button
        onClick={() => setLanguage('en')}
        className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 ${
          language === 'en'
            ? 'bg-white/20 text-white font-medium'
            : 'text-white/60 hover:text-white/80'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('fr')}
        className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 ${
          language === 'fr'
            ? 'bg-white/20 text-white font-medium'
            : 'text-white/60 hover:text-white/80'
        }`}
      >
        FR
      </button>
    </div>
  );
}
