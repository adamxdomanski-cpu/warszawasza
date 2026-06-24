"use client";

import Link from "next/link";
import { useState } from "react";

import { CitrusCursorSection } from "../components/CitrusCursorSection";
import { FieldWatch } from "../components/FieldWatch";
import { FiraLucySection } from "../components/FiraLucySection";
import { LanguageToggle } from "../components/LanguageToggle";
import { MobileStatusBar } from "../components/MobileStatusBar";
import { SymbolLegend } from "../components/SymbolLegend";
import { TrueFalseEditorial } from "../components/TrueFalseEditorial";
import { fetchTopDrops, type TopDrop } from "../lib/api";
import { copy, type Lang } from "../lib/copy";

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("pl");
  const [drops, setDrops] = useState<TopDrop[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = copy[lang];

  async function revealSignals() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTopDrops();
      setDrops(data);
    } catch {
      setError("FIELD_READ_ERROR // API unreachable");
      setDrops(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="editorial-shell scanlines grid-noise grain relative">
      <MobileStatusBar
        domain={t.mobileDomain}
        fieldLabel={t.fieldLabel}
        fieldPhase={t.fieldPhase}
      />

      <main className="relative z-10 min-h-[100dvh] text-white">
        {/* Hero — magazine cover */}
        <section className="flex min-h-[100dvh] flex-col justify-between px-4 py-8 sm:px-6 md:px-16 md:py-14">
          <header className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.38em] text-white/40">
                {t.masthead}
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-[#E40045]">
                {t.hud}
              </p>
            </div>
            <LanguageToggle lang={lang} onChange={setLang} />
          </header>

          <div className="my-12 max-w-6xl md:my-16">
            <h1 className="text-[clamp(3rem,18vw,10rem)] font-bold leading-[0.88] tracking-[-0.045em]">
              WARSZAWASZA
            </h1>

            <div className="mt-10 space-y-2 border-l border-white/15 pl-5 md:mt-14 md:space-y-3 md:pl-8">
              {t.coreLines.map((line) => (
                <p
                  key={line}
                  className="text-lg text-white/70 md:text-2xl lg:text-3xl"
                >
                  {line}
                </p>
              ))}
            </div>

            <p className="mt-12 max-w-2xl text-xl font-medium leading-snug text-white md:mt-16 md:text-3xl">
              {t.manifesto}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/40 md:text-base">
              {t.manifestoSub}
            </p>
          </div>

          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.35em] text-white/25">
            ⌖ {t.enterFeeling}
          </p>
        </section>

        {/* Symbolic layer */}
        <section className="border-t border-white/10 px-4 py-14 sm:px-6 md:px-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="mb-8 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.45em] text-white/35">
              symbolic_layer.v1
            </p>
            <SymbolLegend symbols={[...t.symbols]} />
          </div>
        </section>

        <CitrusCursorSection
          title={t.citrusCursorTitle}
          notLine={t.citrusCursorNot}
          isLine={t.citrusCursorIs}
          traceNote={t.citrusCursorTrace}
        />

        <FiraLucySection
          firaLabel={t.firaLabel}
          firaRole={t.firaRole}
          firaText={t.firaText}
          lucyLabel={t.lucyLabel}
          lucyRole={t.lucyRole}
          lucyText={t.lucyText}
          designNote={t.designNote}
        />

        <TrueFalseEditorial
          title={t.trueFalseTitle}
          subtitle={t.trueFalseSub}
          dichotomies={[...t.dichotomies]}
        />

        <FieldWatch
          title={t.fieldWatchTitle}
          subtitle={t.fieldWatchSub}
          revealLabel={t.reveal}
          revealingLabel={t.revealing}
          emptyLabel={t.dropsEmpty}
          loading={loading}
          error={error}
          drops={drops}
          onReveal={revealSignals}
        />

        <footer className="safe-bottom flex flex-col gap-6 border-t border-white/10 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between md:px-16">
          <p className="text-xs uppercase tracking-[0.32em] text-white/40 sm:text-sm">
            {t.footer}
          </p>
          <Link
            href="https://warszawasza.online"
            target="_blank"
            rel="noreferrer"
            className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.35em] text-white/35 transition hover:text-[#E40045]"
          >
            warszawasza.online ↗
          </Link>
        </footer>
      </main>
    </div>
  );
}
