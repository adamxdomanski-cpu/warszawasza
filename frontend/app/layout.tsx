import type { Metadata } from "next";
import { IBM_Plex_Mono, Syne } from "next/font/google";

import "./globals.css";

const syne = Syne({
  subsets: ["latin", "latin-ext"],
  variable: "--font-syne",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WARSZAWASZA | Moja, Twoja, Wasza Warszawa",
  description:
    "Warszawasza — miejski silnik sygnału: streetwear, FIRA, język tożsamości.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${syne.variable} ${ibmPlexMono.variable}`}>
      <body className="min-h-screen bg-[#050505] font-[family-name:var(--font-syne)] antialiased">
        {children}
      </body>
    </html>
  );
}
