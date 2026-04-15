"use client";

import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

export function usePluginTestingNotice() {
  const { t } = useLanguage();

  return () => {
    toast(t.logoVariations.pluginTestingTitle, {
      description: t.logoVariations.pluginTestingDesc,
      duration: 4500,
    });
  };
}
