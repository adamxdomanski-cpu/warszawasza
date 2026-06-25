import type { Metadata } from "next";
import DigitalObserverManifest from "../components/DigitalObserverManifest";
import MetaPerception from "../components/MetaPerception";

export const metadata: Metadata = {
  title: "Manifest | WARSZAWASZA · OBSERWACJA TRWA",
  description:
    "Manifest Cyfrowego Obserwatora v1.0 — suwerenność poznawcza, palimpsest miasta, Civic Tech.",
};

export default function MetaPage() {
  return (
    <>
      <DigitalObserverManifest />
      <details className="relative z-[2] border-t border-accent/10">
        <summary className="cursor-pointer px-5 py-4 font-mono-field text-xs tracking-[0.14em] text-accent/45 touch-manipulation sm:px-8">
          warstwa percepcji ↓
        </summary>
        <MetaPerception />
      </details>
    </>
  );
}
