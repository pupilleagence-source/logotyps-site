"use client";

import { LanguageProvider } from "@/contexts/LanguageContext";
import { Toaster } from "@/components/ui/sonner";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      {children}
      <Toaster
        position="bottom-right"
        richColors
        closeButton
        toastOptions={{
          style: {
            background: "#1A1A1A",
            color: "#FFFFFF",
            border: "1px solid rgba(255, 107, 53, 0.25)",
          },
        }}
      />
    </LanguageProvider>
  );
}
