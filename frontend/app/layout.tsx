import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.warszawasza.online"),
  title: "Warszawasza | Moja, Twoja, Wasza Warszawa",
  description:
    "Warszawasza is a Warsaw identity studio turning city signals into limited drops, field maps, and civic language.",
  openGraph: {
    title: "Warszawasza | Moja, Twoja, Wasza Warszawa",
    description:
      "A Warsaw identity studio turning city signals into limited drops, field maps, and civic language.",
    url: "https://www.warszawasza.online",
    siteName: "Warszawasza",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
