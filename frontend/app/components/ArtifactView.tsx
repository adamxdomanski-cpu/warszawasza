"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ARTIFACT_COPY } from "../../lib/artifactI18n";
import type { ArtifactSlug } from "../../lib/artifacts";
import type { Lang } from "../../lib/i18n";
import FieldBackdrop from "./FieldBackdrop";
import FieldFooter from "./FieldFooter";
import GrapheneField from "./GrapheneField";
import LangNav from "./LangNav";
import LivingSignalText from "./LivingSignalText";
import LucyAttention from "./LucyAttention";
import SignalControl from "./SignalControl";
import SignalFieldProvider from "./SignalFieldProvider";

type ArtifactViewProps = {
  slug: ArtifactSlug;
};

export default function ArtifactView({ slug }: ArtifactViewProps) {
  const [lang, setLang] = useState<Lang>("pl");
  const layer = ARTIFACT_COPY[lang][slug];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <SignalFieldProvider>
      <LucyAttention />
      <FieldFooter lang={lang} />
      <main className="relative z-10 min-h-dvh overflow-x-hidden p-5 pb-14 sm:p-8 sm:pb-16">
        <GrapheneField />
        <FieldBackdrop />

        <header className="relative z-10 mb-10 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center font-mono-field text-sm tracking-wider text-accent/70 touch-manipulation sm:text-base"
          >
            ← ●
          </Link>
          <LangNav lang={lang} onChange={setLang} />
        </header>

        <article className="relative z-10 max-w-prose">
          <p className="mb-3 font-mono-field text-4xl leading-none sm:text-5xl">
            {layer.symbol}
          </p>
          <h1 className="mb-2 text-3xl font-light tracking-wide sm:text-4xl">
            {layer.name}
          </h1>
          <p className="mb-7 font-mono-field text-xs tracking-[0.12em] text-accent/55 uppercase sm:text-sm">
            {layer.role}
          </p>
          <LivingSignalText
            text={layer.lead}
            className="mb-5 text-lg font-light leading-relaxed sm:text-xl"
          />
          {layer.body.map((line) => (
            <LivingSignalText
              key={line}
              text={line}
              className="mb-3.5 text-base leading-relaxed text-accent/80 sm:text-lg"
            />
          ))}
          <LivingSignalText
            text={layer.signal}
            className="mt-8 font-mono-field text-sm tracking-wide fira-structure-tone sm:text-base"
            intensity="low"
          />
        </article>

        <footer className="relative z-10 mt-12">
          <Link
            href="/meta"
            className="inline-flex min-h-11 items-center font-mono-field text-sm tracking-widest text-accent/70 uppercase touch-manipulation sm:text-base"
          >
            META →
          </Link>
        </footer>
      </main>
    </SignalFieldProvider>
  );
}
