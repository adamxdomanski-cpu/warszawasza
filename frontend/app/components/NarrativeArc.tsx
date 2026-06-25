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

function NarrativeLinkRow({
  symbol,
  name,
  lead,
  href,
  symbolClassName = "text-base text-accent/75",
}: {
  symbol: string;
  name: string;
  lead: string;
  href: string;
  symbolClassName?: string;
}) {
  return (
    <div className="context-link-group py-1">
      <p className="context-link-lead m-0 mb-1 font-mono-field text-[11px] tracking-[0.14em] text-accent/38 sm:text-xs">
        {lead}
      </p>
      <SignalControl
        as={Link}
        href={href}
        direction="right"
        className="context-link-target flex min-h-10 touch-manipulation items-baseline gap-2"
      >
        <span className={symbolClassName}>{symbol}</span>
        <span className="text-sm tracking-wide">{name}</span>
      </SignalControl>
    </div>
  );
}

/** Secondary layer — hidden until user opens the lexicon (not first-screen). */
export default function NarrativeArc({ lang }: NarrativeArcProps) {
  const copy = COPY[lang];
  const [open, setOpen] = useState(false);
  const [more, setMore] = useState(false);

  if (!open) {
    return (
      <section id="narracja" className="mt-16 pt-8">
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
    <section id="narracja" aria-labelledby="narracja-title" className="mt-16 pt-8">
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
              <NarrativeLinkRow
                symbol={row.symbol}
                name={row.name}
                lead={row.role}
                href={row.href ?? "#"}
              />
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
                <NarrativeLinkRow
                  symbol={row.symbol}
                  name={row.name}
                  lead={row.role}
                  href={row.href ?? "#"}
                  symbolClassName="text-base text-accent/60"
                />
              </li>
            );
          })}
          <li>
            <NarrativeLinkRow
              symbol="→"
              name="META"
              lead={copy.narrativeMetaHint}
              href="/meta"
              symbolClassName="text-sm text-accent/55"
            />
          </li>
        </ul>
      )}
    </section>
  );
}
