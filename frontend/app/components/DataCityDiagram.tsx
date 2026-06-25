"use client";

import type { Lang } from "../../lib/i18n";
import { COPY } from "../../lib/i18n";
import { useStructureAnchor } from "../../hooks/useStructureAnchor";
import { LivingSignalInline } from "./LivingSignalText";

/** Urban data topology — trajectories converge on ● then diverge. */
const DATA_CITY_LINES = [
  { id: "a", text: "        ↗", kind: "flow" as const, delay: 0 },
  { id: "b", text: "↗ ↗ ↗", kind: "flow" as const, delay: 0.35 },
  { id: "c", text: "        ↓", kind: "flow" as const, delay: 0.7 },
  { id: "d", text: "    ●", kind: "node" as const, delay: 1.05 },
  { id: "e", text: "      ↘", kind: "flow" as const, delay: 1.4 },
  { id: "f", text: "         ↘", kind: "flow" as const, delay: 1.75 },
];

type DataCityDiagramProps = {
  lang: Lang;
  variant?: "fixed" | "inline";
};

export default function DataCityDiagram({
  lang,
  variant = "fixed",
}: DataCityDiagramProps) {
  const label = COPY[lang].dataCity;
  const nodeRef = useStructureAnchor<HTMLSpanElement>();

  const wrapClass =
    variant === "fixed"
      ? "relative z-10 font-mono-field lg:text-left"
      : "relative z-10 mx-auto mb-8 font-mono-field text-left sm:text-center";

  return (
    <aside className={wrapClass} aria-label={label}>
      <p className="mb-2 text-[10px] tracking-[0.2em] text-accent/40 uppercase sm:text-xs">
        <LivingSignalInline text={label} intensity="low" />
      </p>
      <pre className="m-0 text-xs leading-relaxed tracking-wide sm:text-sm">
        {DATA_CITY_LINES.map((line) => (
          <span
            key={line.id}
            ref={line.kind === "node" ? nodeRef : undefined}
            className={`data-city-line block ${
              line.kind === "node"
                ? "data-city-node fira-structure-proximity fira-structure-tone"
                : "text-accent/32"
            }`}
            style={{ animationDelay: `${line.delay}s` }}
          >
            {line.text}
          </span>
        ))}
      </pre>
    </aside>
  );
}
