"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  CORE_PRINT_PARTS,
  corePrintPlain,
  type CorePrintPart,
} from "../../lib/corePrint";
import type { Lang } from "../../lib/i18n";
import { prefersReducedMotion } from "../../lib/attention";

const CHAR_MS = 30;
const LINE_PAUSE_MS = 480;
const FRICTION_WEAKEN_MS = 900;

type CorePrintSequenceProps = {
  lang: Lang;
  onComplete: () => void;
};

type LineState = {
  charIndex: number;
  done: boolean;
  frictionWeakened: boolean;
};

function glyphForRole(role: CorePrintPart["role"], weakened: boolean): string | null {
  if (role === "friction") return weakened ? "∥" : null;
  if (role === "trajectory") return "↗";
  if (role === "city") return "●";
  return null;
}

function renderVisibleParts(
  parts: CorePrintPart[],
  charIndex: number,
  lineDone: boolean,
  frictionWeakened: boolean,
): ReactNode[] {
  let remaining = charIndex;
  const nodes: ReactNode[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]!;
    const take = Math.min(remaining, part.text.length);
    if (take <= 0) break;

    const visible = part.text.slice(0, take);
    const role = part.role;
    const glyph =
      lineDone && role ? glyphForRole(role, role === "friction" && frictionWeakened) : null;

    if (role) {
      nodes.push(
        <span
          key={`${i}-${part.text}`}
          className={`print-stress print-stress-${role}${
            role === "friction" && frictionWeakened ? " print-stress-weakened" : ""
          }`}
        >
          {glyph && (
            <span className="print-stress-glyph" aria-hidden="true">
              {glyph}{" "}
            </span>
          )}
          {visible}
        </span>,
      );
    } else {
      nodes.push(<span key={`${i}-${part.text}`}>{visible}</span>);
    }

    remaining -= take;
  }

  return nodes;
}

export default function CorePrintSequence({ lang, onComplete }: CorePrintSequenceProps) {
  const lines = useMemo(() => CORE_PRINT_PARTS[lang], [lang]);
  const completeRef = useRef(onComplete);
  const [lineIndex, setLineIndex] = useState(0);
  const [linesState, setLinesState] = useState<LineState[]>(() =>
    lines.map(() => ({ charIndex: 0, done: false, frictionWeakened: false })),
  );
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    setLineIndex(0);
    setLinesState(lines.map(() => ({ charIndex: 0, done: false, frictionWeakened: false })));
  }, [lines]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setInstant(true);
      setLinesState(
        lines.map((parts) => ({
          charIndex: corePrintPlain(parts).length,
          done: true,
          frictionWeakened: true,
        })),
      );
      setLineIndex(lines.length);
      completeRef.current();
    }
  }, [lines]);

  useEffect(() => {
    if (instant || lineIndex >= lines.length) return;

    const parts = lines[lineIndex]!;
    const full = corePrintPlain(parts);
    const state = linesState[lineIndex]!;

    if (state.done) return;

    if (state.charIndex >= full.length) {
      const hasFriction = parts.some((p) => p.role === "friction");

      setLinesState((prev) => {
        const next = [...prev];
        next[lineIndex] = { ...next[lineIndex]!, done: true, frictionWeakened: false };
        return next;
      });

      if (hasFriction) {
        const weakenTimer = window.setTimeout(() => {
          setLinesState((prev) => {
            const next = [...prev];
            next[lineIndex] = { ...next[lineIndex]!, frictionWeakened: true };
            return next;
          });
          window.setTimeout(() => setLineIndex((i) => i + 1), FRICTION_WEAKEN_MS);
        }, LINE_PAUSE_MS);
        return () => window.clearTimeout(weakenTimer);
      }

      const nextLineTimer = window.setTimeout(() => setLineIndex((i) => i + 1), LINE_PAUSE_MS);
      return () => window.clearTimeout(nextLineTimer);
    }

    const timer = window.setTimeout(() => {
      setLinesState((prev) => {
        const next = [...prev];
        const row = next[lineIndex]!;
        next[lineIndex] = { ...row, charIndex: row.charIndex + 1 };
        return next;
      });
    }, CHAR_MS);

    return () => window.clearTimeout(timer);
  }, [instant, lineIndex, lines, linesState]);

  useEffect(() => {
    if (instant) return;
    if (lineIndex < lines.length) return;
    if (!linesState.every((s) => s.done)) return;
    completeRef.current();
  }, [instant, lineIndex, lines.length, linesState]);

  return (
    <div className="core-print" aria-live="polite">
      {lines.map((parts, idx) => {
        const state = linesState[idx]!;
        const full = corePrintPlain(parts);
        const isActive = !instant && idx === lineIndex && !state.done;
        const showLine = instant || idx <= lineIndex;

        if (!showLine) return null;

        return (
          <p
            key={`${lang}-${idx}-${full}`}
            className="core-print-line mb-2 max-w-full text-xl font-light leading-snug opacity-100 sm:text-2xl lg:mx-auto lg:text-[1.65rem] lg:leading-snug xl:text-3xl"
          >
            {renderVisibleParts(parts, state.charIndex, state.done, state.frictionWeakened)}
            {isActive && (
              <span className="print-cursor" aria-hidden="true">
                ▮
              </span>
            )}
          </p>
        );
      })}
    </div>
  );
}
