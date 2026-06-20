import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Warszawasza Engine",
  description: "Warsaw-themed content generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body style={{ fontFamily: "Arial, sans-serif", padding: "40px" }}>
        {children}
      </body>
    </html>
  );
}
