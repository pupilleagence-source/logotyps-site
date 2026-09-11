import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Logotyps",
  description:
    "Ce que le site logotyps.fr et le plugin Logotyps collectent, pourquoi, où les données sont stockées et comment exercer vos droits.",
  robots: { index: true, follow: true },
};

export default function PrivacyRoute() {
  return <LegalPage doc="privacy" />;
}
