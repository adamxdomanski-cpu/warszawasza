"use client";

import Link from "next/link";
import { useState } from "react";
import { COPY, type Lang } from "../../lib/i18n";
import SignalControl from "./SignalControl";

const PRIMARY_KEYS = ["diamente", "shafir", "griffin"] as const;
const MORE_KEYS = ["lustra", "dissonance", "fira"] as const;

type NarrativeArcProps = {
  lang: Lang;
};

/** Secondary layer — hidden until user opens the lexicon (not first-screen). */
export default function NarrativeArc({ lang }: NarrativeArcProps) {
  const copy = COPY[lang];
  const [open, setOpen] = useState(false);
  const [more, setMore] = useState(false);

  if (!open) {
    return (
      <section id="narracja" className="mt-16 border-t border-accent-muted/30 pt-8">
        <SignalControl
          type="button"
          direction="down"
          onClick={() => setOpen(true)}
          className="min-h-11 touch-manipulation font-mono-field text-xs tracking-wider text-accent/35"
          aria-expanded={false}
        >
          {copy.narrativeLexicon}
        </SignalControl>
      </section>
    );
  }

  return (
    <section id="narracja" aria-labelledby="narracja-title" className="mt-16 border-t border-accent-muted/30 pt-8">
      <SignalControl
        type="button"
        direction="up"
        onClick={() => {
          setOpen(false);
          setMore(false);
        }}
        className="mb-4 min-h-10 touch-manipulation font-mono-field text-xs tracking-wider text-accent/35"
        aria-expanded={true}
      >
        {copy.narrativeLexiconClose}
      </SignalControl>

      <h2
        id="narracja-title"
        className="font-mono-field text-xs tracking-[0.18em] text-accent/55 sm:text-sm"
      >
        {copy.narrativeTitle}
      </h2>

      <div className="mt-4 space-y-0 font-mono-field">
        {PRIMARY_KEYS.map((key, index) => {
          const row = copy.narrative[key];
          return (
            <div key={key}>
              <SignalControl
                as={Link}
                href={row.href ?? "#"}
                direction="right"
                className="flex min-h-10 touch-manipulation items-baseline gap-2 py-1"
              >
                <span className="text-base text-accent/75">{row.symbol}</span>
                <span className="text-sm leading-snug">
                  <span className="tracking-wide">{row.name}</span>
                  <span className="text-accent/50"> ({row.role.split(" · ")[0]})</span>
                </span>
              </SignalControl>
              {index < PRIMARY_KEYS.length - 1 && (
                <div className="py-1 pl-1 text-xs opacity-25" aria-hidden="true">
                  ↓
                </div>
              )}
            </div>
          );
        })}
      </div>

      <SignalControl
        type="button"
        direction="down"
        onClick={() => setMore((e) => !e)}
        className="mt-4 min-h-10 touch-manipulation font-mono-field text-xs tracking-wider text-accent/45"
        aria-expanded={more}
      >
        {more ? copy.narrativeLess : copy.narrativeMore}
      </SignalControl>

      {more && (
        <ul className="mt-3 list-none space-y-1 p-0">
          {MORE_KEYS.map((key) => {
            const row = copy.narrative[key];
            return (
              <li key={key}>
                <SignalControl
                  as={Link}
                  href={row.href ?? "#"}
                  direction="right"
                  className="flex min-h-10 touch-manipulation items-baseline gap-2 py-1"
                >
                  <span className="text-base text-accent/60">{row.symbol}</span>
                  <span className="text-sm text-accent/70">
                    {row.name}
                    <span className="text-accent/45"> · {row.role}</span>
                  </span>
                </SignalControl>
              </li>
            );
          })}
          <li>
            <SignalControl
              as={Link}
              href="/meta"
              direction="right"
              className="inline-flex min-h-10 items-center font-mono-field text-sm tracking-wider touch-manipulation"
            >
              META →
            </SignalControl>
          </li>
        </ul>
      )}
    </section>
  );
}
