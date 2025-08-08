import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Protocollo - Ottimizzazione della Longevità Maschile",
  description: "Il tuo percorso scientifico per massimizzare salute, performance e longevità attraverso protocolli basati su evidenze",
  keywords: ["longevità", "salute maschile", "ottimizzazione", "biohacking", "prevenzione"],
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'none',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="dark">
      <body className="antialiased bg-navy-charcoal text-slate-100">
        {children}
      </body>
    </html>
  );
}
