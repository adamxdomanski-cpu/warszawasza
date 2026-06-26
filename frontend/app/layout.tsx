import type { Metadata, Viewport } from "next";
import { Fira_Mono, Fira_Sans } from "next/font/google";
import type { ReactNode } from "react";
import StudioOriginTrace from "./components/StudioOriginTrace";
import { STUDIO_HTML_TRACE_COMMENT } from "../lib/studioAnchor";
import "./globals.css";

const firaSans = Fira_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "600"],
  variable: "--font-fira-sans",
});

const firaMono = Fira_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-fira-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.warszawasza.online"),
  title: "WARSZAWASZA // FIRA | ● OBSERWACJA TRWA",
  description:
    "Interaktywny system obserwacji miejskiej. Sygnał, tarcie, adaptacja, trajektoria. Moja, Twoja, Wasza Warszawa.",
  openGraph: {
    title: "WARSZAWASZA // FIRA | ● OBSERWACJA TRWA",
    description:
      "Interaktywny system obserwacji miejskiej — nie sklep, lecz żywe pole narracji.",
    url: "https://www.warszawasza.online",
    siteName: "Warszawasza",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 218,
        height: 150,
        alt: "WARSZAWASZA",
      },
    ],
  },
  twitter: {
    card: "summary",
    images: ["/logo.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#030303",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${firaSans.variable} ${firaMono.variable} bg-field text-accent antialiased`}
      >
        <span
          hidden
          aria-hidden="true"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: STUDIO_HTML_TRACE_COMMENT }}
        />
        <StudioOriginTrace />
        {children}
      </body>
    </html>
  );
}
