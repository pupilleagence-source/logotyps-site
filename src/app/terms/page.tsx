import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Conditions d'utilisation et mentions légales — Logotyps",
  description:
    "Essai gratuit, achat et utilisation des licences du plugin Logotyps pour Adobe Illustrator, garantie satisfait ou remboursé 14 jours, mentions légales du site.",
  robots: { index: true, follow: true },
};

export default function TermsRoute() {
  return <LegalPage doc="terms" />;
}
