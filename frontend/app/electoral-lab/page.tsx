import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Electoral Lab | WARSZAWASZA · OBSERWACJA TRWA",
  description:
    "Documentation pointer for electoral protocol layers — not PKW, not official voting.",
};

const DOCS = [
  {
    path: "fira/electoral/MANIFEST_DRAFT.md",
    note: "Layer 1 · normative proposals (propozycja do analizy)",
  },
  {
    path: "fira/electoral/ARCHITECTURE.md",
    note: "Layer 2 · domain model, SQL, verification caveats",
  },
  {
    path: "fira/electoral/COP_LENS.md",
    note: "Layer 3 · signal, noise, COP/FIRA identity",
  },
  {
    path: "fira/electoral/DOMAIN_MODEL.md",
    note: "ER diagram → PostgreSQL tables (005)",
  },
  {
    path: "fira/electoral/README.md",
    note: "Index · migration order 004 → 005",
  },
] as const;

export default function ElectoralLabPage() {
  return (
    <main className="relative z-[2] mx-auto max-w-lg px-5 py-12 sm:px-8 sm:py-16">
      <p className="font-mono-field text-xs tracking-[0.18em] text-accent/60">
        ● ELECTORAL LAB · DOCS ONLY
      </p>
      <h1 className="mt-4 font-sans text-2xl font-light tracking-tight text-white/90 sm:text-3xl">
        Protokół wyborczy COP
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-white/55">
        To nie jest Państwowa Komisja Wyborcza. To nie jest głosowanie urzędowe. Trzy
        warstwy dokumentacji — normatywna, techniczna, filozoficzna — bez mieszania reguł
        politycznych ze schematem SQL.
      </p>
      <ul className="mt-8 space-y-4 border-t border-accent/10 pt-8">
        {DOCS.map((doc) => (
          <li key={doc.path}>
            <code className="font-mono-field text-sm text-accent/90">{doc.path}</code>
            <p className="mt-1 text-xs text-white/45">{doc.note}</p>
          </li>
        ))}
      </ul>
      <p className="mt-10 border-t border-accent/10 pt-8 text-sm text-white/50">
        Instrument obywatelski:{" "}
        <Link href="/deliberation" className="text-accent touch-manipulation hover:underline">
          /deliberation
        </Link>{" "}
        — deliberacja grafenowa, notacja FOP.
      </p>
    </main>
  );
}
