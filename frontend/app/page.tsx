"use client";

import Link from "next/link";
import { useState } from "react";

import { LanguageToggle } from "../components/LanguageToggle";
import { MobileStatusBar } from "../components/MobileStatusBar";
import { MythCard } from "../components/MythCard";
import { fetchTopDrops, type TopDrop } from "../lib/api";
import { copy, type Lang } from "../lib/copy";

function emotionColor(emotion: string): string {
  if (emotion === "SILENCE") return "text-cyan-300/80";
  if (emotion === "COLLAPSE") return "text-[#E40045]";
  return "text-lime-300/80";
}

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
    <div className="scanlines grid-noise relative">
      <MobileStatusBar
        domain={t.mobileDomain}
        fieldLabel={t.fieldLabel}
        fieldPhase={t.fieldPhase}
      />
      <main className="relative z-10 min-h-[100dvh] text-white">
        {/* Hero */}
        <section className="flex min-h-[100dvh] flex-col justify-between px-4 py-8 sm:px-6 md:px-16 md:py-14">
          <header className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-center md:justify-between">
            <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.28em] text-white/45 sm:text-[10px] sm:tracking-[0.45em]">
              FIRA / NORKA / KOT / ORZEŁ
            </p>
            <LanguageToggle lang={lang} onChange={setLang} />
          </header>

          <div className="my-10 max-w-6xl sm:my-16 md:my-0">
            <div className="mb-6 flex flex-col gap-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] sm:mb-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:text-[11px] sm:tracking-[0.4em]">
              <span className="text-[#E40045]">{t.hud}</span>
              <span className="hidden h-px flex-1 bg-white/10 md:block" />
              <span className="hidden text-white/35 sm:inline">
                {t.fieldLabel}{" "}
                <span className="text-lime-300">{t.fieldPhase}</span>
              </span>
            </div>

            <h1 className="break-words text-[clamp(2.75rem,16vw,9rem)] font-black leading-[0.92] tracking-[-0.04em]">
              {t.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-snug text-white/75 sm:mt-8 sm:text-xl md:text-3xl">
              {t.subtitle}
            </p>

            <p className="mt-8 max-w-2xl border-l-2 border-[#E40045]/60 pl-4 text-base leading-relaxed text-white/55 sm:mt-10 sm:pl-6 sm:text-lg md:text-2xl">
              {t.manifesto}
            </p>

            <p className="mt-6 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-white/30 sm:mt-8 sm:text-xs sm:tracking-[0.35em]">
              {t.fieldNote}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {t.cards.map((card, index) => (
              <MythCard
                key={card.title}
                title={card.title}
                text={card.text}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* TRUE / FALSE terminal */}
        <section
          id="terminal"
          className="border-y border-white/10 bg-black/40 px-4 py-12 sm:px-6 md:px-16 md:py-24"
        >
          <div className="mx-auto max-w-4xl">
            <p className="mb-4 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.5em] text-white/35">
              // urban_truth_module.v1
            </p>
            <h2 className="cursor-blink mb-8 break-words font-[family-name:var(--font-mono)] text-lg font-semibold uppercase leading-tight tracking-[0.08em] text-white sm:mb-10 sm:text-2xl md:text-4xl md:tracking-[0.12em]">
              {t.trueFalse}
            </h2>

            <div className="space-y-4 rounded-none border border-white/10 bg-[#0a0a0a] p-4 font-[family-name:var(--font-mono)] text-xs leading-relaxed sm:space-y-5 sm:p-6 sm:text-sm md:p-10 md:text-lg">
              <p className="text-lime-300/90">
                <span className="mr-3 text-lime-400/50">&gt;</span>
                {t.trueLine}
              </p>
              <p className="text-[#E40045]/90">
                <span className="mr-3 text-[#E40045]/50">&gt;</span>
                {t.falseLine}
              </p>
              <p className="pt-4 text-white/25">
                <span className="pulse-glow mr-2 inline-block h-2 w-2 rounded-full bg-lime-400" />
                awaiting_next_signal…
              </p>
            </div>
          </div>
        </section>

        {/* Field drops — editorial, not shop */}
        <section className="px-4 py-12 sm:px-6 md:px-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.45em] text-[#E40045]">
                  signal_archive
                </p>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-5xl">
                  {t.dropsTitle}
                </h2>
              </div>
              <button
                type="button"
                onClick={revealSignals}
                disabled={loading}
                className="min-h-[48px] w-full self-start border border-white/20 px-6 py-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.28em] text-white/70 transition active:scale-[0.98] hover:border-[#E40045] hover:text-white disabled:opacity-40 sm:w-auto sm:text-[11px] sm:tracking-[0.35em]"
              >
                {loading ? t.revealing : t.reveal}
              </button>
            </div>

            {error ? (
              <p className="font-[family-name:var(--font-mono)] text-sm text-[#E40045]">
                {error}
              </p>
            ) : null}

            {!drops && !error ? (
              <p className="max-w-xl text-white/40">{t.dropsEmpty}</p>
            ) : null}

            {drops ? (
              <ul className="mt-8 divide-y divide-white/10 border border-white/10">
                {drops.map((drop) => (
                  <li
                    key={drop.text}
                    className="grid gap-4 px-5 py-6 md:grid-cols-[1fr_auto] md:items-center md:px-8"
                  >
                    <div>
                      <p
                        className={`font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.4em] ${emotionColor(drop.emotion)}`}
                      >
                        {drop.emotion} // {drop.channel}
                      </p>
                      <p className="mt-2 break-words text-lg font-semibold tracking-tight sm:text-xl md:text-2xl">
                        {drop.text}
                      </p>
                    </div>
                    <p className="font-[family-name:var(--font-mono)] text-xs text-white/35">
                      score {drop.scores.total_score}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>

        {/* Footer */}
        <footer className="safe-bottom flex flex-col gap-6 border-t border-white/10 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between md:px-16">
          <p className="text-xs uppercase tracking-[0.28em] text-white/45 sm:text-sm sm:tracking-[0.35em]">
            {t.footer}
          </p>
          <Link
            href="https://warszawasza.online"
            target="_blank"
            rel="noreferrer"
            className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.35em] text-white/40 transition hover:text-[#E40045]"
          >
            warszawasza.online ↗
          </Link>
        </footer>
      </main>
    </div>
  );
}
