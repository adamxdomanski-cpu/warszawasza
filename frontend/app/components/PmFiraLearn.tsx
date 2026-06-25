"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { COPY, type Lang } from "../../lib/i18n";
import { PM_FIRA_ROWS, PROCESS_CHAIN_DISPLAY } from "../../lib/pmMapping";
import { PM_MAPPING_COPY } from "../../lib/pmMappingI18n";
import FieldBackdrop from "./FieldBackdrop";
import FieldFooter from "./FieldFooter";
import GrapheneField from "./GrapheneField";
import LangNav from "./LangNav";
import SignalControl from "./SignalControl";
import SignalFieldProvider from "./SignalFieldProvider";

export default function PmFiraLearn() {
  const [lang, setLang] = useState<Lang>("pl");
  const learn = PM_MAPPING_COPY[lang];
  const pipeline = COPY[lang].pipeline;

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <SignalFieldProvider>
      <FieldFooter lang={lang} />
      <main className="relative z-10 min-h-dvh overflow-x-hidden p-5 pb-14 sm:p-8 sm:pb-16">
        <GrapheneField />
        <FieldBackdrop />

        <header className="relative z-10 mb-8 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center font-mono-field text-sm tracking-wider text-accent/70 touch-manipulation sm:text-base"
            aria-label={learn.back}
          >
            {learn.back}
          </Link>
          <LangNav lang={lang} onChange={setLang} />
        </header>

        <article className="relative z-10 mx-auto max-w-prose">
          <p className="m-0 font-mono-field text-[11px] tracking-[0.18em] text-accent/45 uppercase sm:text-xs">
            {learn.subtitle}
          </p>
          <h1 className="mt-2 mb-5 text-2xl font-light tracking-wide text-ink sm:text-3xl">
            {learn.title}
          </h1>
          <p className="mb-8 text-base leading-relaxed text-ink/80 sm:text-lg">
            {learn.intro}
          </p>

          <section className="mb-10" aria-labelledby="chain-heading">
            <h2
              id="chain-heading"
              className="mb-3 font-mono-field text-xs tracking-[0.14em] text-accent/60 uppercase sm:text-sm"
            >
              {learn.chainLabel}
            </h2>
            <p
              className="m-0 overflow-x-auto font-mono-field text-lg tracking-[0.2em] text-accent/90 sm:text-xl"
              aria-label={PROCESS_CHAIN_DISPLAY.join(" ")}
            >
              {PROCESS_CHAIN_DISPLAY.map((glyph, i) => (
                <span key={`${glyph}-${i}`}>
                  {i > 0 ? (
                    <span className="mx-1 text-accent/35" aria-hidden="true">
                      →
                    </span>
                  ) : null}
                  <span>{glyph}</span>
                </span>
              ))}
            </p>
          </section>

          <section className="mb-10" aria-labelledby="mapping-heading">
            <h2
              id="mapping-heading"
              className="mb-4 font-mono-field text-xs tracking-[0.14em] text-accent/60 uppercase sm:text-sm"
            >
              {learn.mappingTitle}
            </h2>
            <div className="space-y-4">
              {PM_FIRA_ROWS.map((row) => {
                const bucket = learn.buckets[row.bucket];
                const firaLabels = row.pipelineKeys
                  .map((k) => pipeline[k])
                  .join(" · ");
                return (
                  <div
                    key={row.bucket}
                    className="border-l border-accent/20 pl-4 sm:pl-5"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-mono-field text-base text-accent/85 sm:text-lg">
                        {row.glyphs.join(" ")}
                      </span>
                      <span className="font-mono-field text-xs tracking-[0.1em] text-accent/50 sm:text-sm">
                        {bucket.pm}
                      </span>
                    </div>
                    <p className="m-0 mt-1 text-sm text-ink/75 sm:text-base">
                      <span className="font-mono-field text-[11px] tracking-[0.08em] text-accent/45 uppercase">
                        {learn.firaColumn}:{" "}
                      </span>
                      {firaLabels}
                    </p>
                    <p className="m-0 mt-1 text-sm text-ink/65 sm:text-base">
                      <span className="font-mono-field text-[11px] tracking-[0.08em] text-accent/45 uppercase">
                        {learn.coreColumn}:{" "}
                      </span>
                      {row.coreStages.join(" → ")}
                    </p>
                    <p className="m-0 mt-2 text-sm leading-relaxed text-ink/55">
                      {bucket.note}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mb-10" aria-labelledby="models-heading">
            <h2
              id="models-heading"
              className="mb-4 font-mono-field text-xs tracking-[0.14em] text-accent/60 uppercase sm:text-sm"
            >
              {learn.modelsTitle}
            </h2>
            <div className="space-y-5">
              {(["five", "six", "hermes"] as const).map((key) => {
                const model = learn.models[key];
                return (
                  <div key={key}>
                    <h3 className="m-0 mb-2 font-mono-field text-sm text-accent/70">
                      {model.title}
                    </h3>
                    <ul className="m-0 list-none space-y-1 p-0 font-mono-field text-sm text-ink/72">
                      {model.phases.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>

          <p className="mb-8 border-l border-accent/25 pl-4 text-base leading-relaxed text-ink/78 sm:text-lg">
            {learn.principle}
          </p>

          <SignalControl
            as={Link}
            href="/"
            direction="right"
            className="inline-flex min-h-11 touch-manipulation font-mono-field text-sm tracking-[0.1em] text-accent uppercase"
          >
            {learn.cta}
          </SignalControl>
        </article>
      </main>
    </SignalFieldProvider>
  );
}
