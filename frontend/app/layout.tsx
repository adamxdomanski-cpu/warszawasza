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
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "WARSZAWASZA",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${syne.variable} ${ibmPlexMono.variable}`}>
      <body className="mobile-shell min-h-screen overflow-x-hidden bg-[#050505] font-[family-name:var(--font-syne)] antialiased">
        {children}
      </body>
    </html>
  );
}
