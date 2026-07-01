import type { Metadata } from "next";
import PrivacyPageClient from "./PrivacyPageClient";

export const metadata: Metadata = {
  title: "WARSZAWASZA · Jak chronimy Twoje dane",
  description:
    "Co zapisujemy, czego nie zbieramy, czym są cookies i dlaczego tu nie prosimy o zgodę — prosto, bez regulaminowego szumu.",
  openGraph: {
    title: "WARSZAWASZA · Jak chronimy Twoje dane",
    description:
      "Zgłoszenie tylko po Twojej decyzji. Bez trackerów reklamowych. Bez profilowania.",
  },
};

export default function PrywatnoscPage() {
  return <PrivacyPageClient />;
}
