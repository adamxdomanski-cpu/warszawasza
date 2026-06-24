"use client";

import Link from "next/link";
import { useState } from "react";

import { LanguageToggle } from "../components/LanguageToggle";
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
      <main className="relative z-10 min-h-screen text-white">
        {/* Hero */}
        <section className="flex min-h-screen flex-col justify-between px-6 py-10 md:px-16 md:py-14">
          <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.45em] text-white/45">
              FIRA / NORKA / KOT / ORZEŁ
            </p>
            <LanguageToggle lang={lang} onChange={setLang} />
          </header>

          <div className="my-16 max-w-6xl md:my-0">
            <div className="mb-8 flex flex-wrap items-center gap-4 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.4em]">
              <span className="text-[#E40045]">{t.hud}</span>
              <span className="hidden h-px flex-1 bg-white/10 md:block" />
              <span className="text-white/35">
                {t.fieldLabel}{" "}
                <span className="text-lime-300">{t.fieldPhase}</span>
              </span>
            </div>

            <h1 className="text-[clamp(3.5rem,14vw,9rem)] font-black leading-[0.9] tracking-[-0.04em]">
              {t.title}
            </h1>

            <p className="mt-8 max-w-3xl text-xl text-white/75 md:text-3xl md:leading-snug">
              {t.subtitle}
            </p>

            <p className="mt-10 max-w-2xl border-l-2 border-[#E40045]/60 pl-6 text-lg leading-relaxed text-white/55 md:text-2xl">
              {t.manifesto}
            </p>

            <p className="mt-8 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.35em] text-white/30">
              {t.fieldNote}
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
          className="border-y border-white/10 bg-black/40 px-6 py-16 md:px-16 md:py-24"
        >
          <div className="mx-auto max-w-4xl">
            <p className="mb-4 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.5em] text-white/35">
              // urban_truth_module.v1
            </p>
            <h2 className="cursor-blink mb-10 font-[family-name:var(--font-mono)] text-2xl font-semibold uppercase tracking-[0.12em] text-white md:text-4xl">
              {t.trueFalse}
            </h2>

            <div className="space-y-5 rounded-none border border-white/10 bg-[#0a0a0a] p-6 font-[family-name:var(--font-mono)] text-sm leading-relaxed md:p-10 md:text-lg">
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
        <section className="px-6 py-16 md:px-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.45em] text-[#E40045]">
                  signal_archive
                </p>
                <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                  {t.dropsTitle}
                </h2>
              </div>
              <button
                type="button"
                onClick={revealSignals}
                disabled={loading}
                className="self-start border border-white/20 px-6 py-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.35em] text-white/70 transition hover:border-[#E40045] hover:text-white disabled:opacity-40"
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
                      <p className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">
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
        <footer className="flex flex-col gap-6 border-t border-white/10 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-16">
          <p className="text-sm uppercase tracking-[0.35em] text-white/45">
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
