import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Protocollo - Ottimizzazione della Longevità Maschile",
  description: "Il tuo percorso scientifico per massimizzare salute, performance e longevità attraverso protocolli basati su evidenze",
  keywords: ["longevità", "salute maschile", "ottimizzazione", "biohacking", "prevenzione"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="dark">
      <body className="antialiased bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
