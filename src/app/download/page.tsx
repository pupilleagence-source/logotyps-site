import type { Metadata } from "next";
import { DownloadPage } from "@/components/DownloadPage";

export const metadata: Metadata = {
  title: "Télécharger Logotyps — dernière version du plugin Illustrator",
  description:
    "Téléchargez la dernière version du plugin Logotyps pour Adobe Illustrator (macOS et Windows) et suivez les étapes d'installation.",
  robots: { index: true, follow: true },
};

export default function DownloadRoute() {
  return <DownloadPage />;
}
