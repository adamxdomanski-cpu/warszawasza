"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "../../lib/i18n";
import { COPY } from "../../lib/i18n";
import { useStructureAnchor } from "../../hooks/useStructureAnchor";
import { prefersReducedMotion } from "../../lib/attention";

const DATA_CITY_LINES = [
  { id: "a", text: "        ↗", kind: "flow" as const },
  { id: "b", text: "↗ ↗ ↗", kind: "flow" as const },
  { id: "c", text: "        ↓", kind: "flow" as const },
  { id: "d", text: "    ●", kind: "node" as const },
  { id: "e", text: "      ↘", kind: "flow" as const },
  { id: "f", text: "         ↘", kind: "flow" as const },
];

const CHAR_MS = 22;
const ROW_PAUSE_MS = 280;

type DataCityDiagramProps = {
  lang: Lang;
  variant?: "fixed" | "inline";
  printActive?: boolean;
  onPrintComplete?: () => void;
};

export default function DataCityDiagram({
  lang,
  variant = "fixed",
  printActive = false,
  onPrintComplete,
}: DataCityDiagramProps) {
  const label = COPY[lang].dataCity;
  const nodeRef = useStructureAnchor<HTMLSpanElement>();
  const completeRef = useRef(onPrintComplete);
  const finishedRef = useRef(false);
  const [rowIndex, setRowIndex] = useState(-1);
  const [charCounts, setCharCounts] = useState<number[]>(() => DATA_CITY_LINES.map(() => 0));
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    completeRef.current = onPrintComplete;
  }, [onPrintComplete]);

  useEffect(() => {
    if (!printActive) {
      finishedRef.current = false;
      setRowIndex(-1);
      setCharCounts(DATA_CITY_LINES.map(() => 0));
      setInstant(false);
      return;
    }

    if (prefersReducedMotion()) {
      setInstant(true);
      setRowIndex(DATA_CITY_LINES.length - 1);
      setCharCounts(DATA_CITY_LINES.map((l) => l.text.length));
      completeRef.current?.();
      return;
    }

    setRowIndex(0);
    setCharCounts(DATA_CITY_LINES.map(() => 0));
  }, [printActive]);

  useEffect(() => {
    if (!printActive || instant || rowIndex < 0) return;

    const line = DATA_CITY_LINES[rowIndex];
    if (!line) return;

    const count = charCounts[rowIndex] ?? 0;
    if (count < line.text.length) {
      const timer = window.setTimeout(() => {
        setCharCounts((prev) => {
          const next = [...prev];
          next[rowIndex] = (next[rowIndex] ?? 0) + 1;
          return next;
        });
      }, CHAR_MS);
      return () => window.clearTimeout(timer);
    }

    if (rowIndex >= DATA_CITY_LINES.length - 1 && count >= line.text.length) {
      if (!finishedRef.current) {
        finishedRef.current = true;
        completeRef.current?.();
      }
      return;
    }

    const nextTimer = window.setTimeout(() => setRowIndex((i) => i + 1), ROW_PAUSE_MS);
    return () => window.clearTimeout(nextTimer);
  }, [printActive, instant, rowIndex, charCounts]);

  const wrapClass =
    variant === "fixed"
      ? "relative z-10 font-mono-field lg:text-left"
      : "relative z-10 mx-auto mb-8 font-mono-field text-left sm:text-center";

  const printing = printActive && !instant && rowIndex >= 0;
  const started = printActive && (instant || rowIndex >= 0);

  return (
    <aside
      className={`${wrapClass}${started ? "" : " opacity-0"}`}
      aria-label={label}
      aria-hidden={!started}
    >
      <p className="mb-2 text-[10px] tracking-[0.2em] text-accent/40 uppercase sm:text-xs">
        {started ? label : ""}
      </p>
      <pre className="m-0 text-xs leading-relaxed tracking-wide sm:text-sm">
        {DATA_CITY_LINES.map((line, idx) => {
          if (!started) return null;
          if (!instant && idx > rowIndex) return null;

          const visible = instant
            ? line.text
            : line.text.slice(0, charCounts[idx] ?? 0);
          const isActive = printing && idx === rowIndex;

          return (
            <span
              key={line.id}
              ref={line.kind === "node" ? nodeRef : undefined}
              className={`block ${
                line.kind === "node"
                  ? "fira-structure-proximity fira-structure-tone fira-structure-revealed"
                  : "text-accent/32"
              }`}
            >
              {visible}
              {isActive && (
                <span className="print-cursor print-cursor--mono" aria-hidden="true">
                  ▮
                </span>
              )}
            </span>
          );
        })}
      </pre>
    </aside>
  );
}
