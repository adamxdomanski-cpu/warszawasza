import type { Metadata } from "next";
import { Fira_Sans, IBM_Plex_Mono } from "next/font/google";

import "./globals.css";

const firaSans = Fira_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-fira",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WARSZAWASZA // FIRA // LUCY",
  description:
    "Warszawa nie jest produktem. Warszawa jest stanem. Dark editorial urban system.",
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
    <html lang="pl" className={`${firaSans.variable} ${ibmPlexMono.variable}`}>
      <body className="mobile-shell min-h-screen overflow-x-hidden bg-[#050505] font-[family-name:var(--font-fira)] antialiased">
        {children}
      </body>
    </html>
  );
}
