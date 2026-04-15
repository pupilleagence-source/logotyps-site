import type { Metadata } from "next";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { ClientProviders } from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "Logotyps - Generate All Logo Variations in Seconds",
  description: "Adobe Illustrator plugin that automatically generates all logo variations, colors, backgrounds, and exports in seconds. Built for designers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientProviders>
          {children}
          <VisualEditsMessenger />
        </ClientProviders>
      </body>
    </html>
  );
}
