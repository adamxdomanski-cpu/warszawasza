"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LangNav from "../LangNav";
import SignalControl from "../SignalControl";
import {
  HEAT_POINTS,
  HEAT_TEMP_C,
  heatFieldCopy,
} from "../../../lib/field/heatFieldI18n";
import type { Lang } from "../../../lib/i18n";
import {
  appendInteractionEvent,
  clearInteractionTrace,
  formatTracePath,
  getInteractionTrace,
} from "../../../lib/interactionTrace";

type FilterMode = "all" | "water" | "shade";

export default function HeatFieldClient() {
  const [lang, setLang] = useState<Lang>("pl");
  const [filter, setFilter] = useState<FilterMode>("all");
  const [traceTick, setTraceTick] = useState(0);

  const copy = heatFieldCopy(lang);
  const events = getInteractionTrace().events;

  useEffect(() => {
    clearInteractionTrace();
    appendInteractionEvent("START");
    appendInteractionEvent("SELECT", "MOKOTOW");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const bump = () => setTraceTick((t) => t + 1);

  const onCta = () => {
    appendInteractionEvent("SELECT", "ZNAJDZ_WODE_I_CIEN");
    appendInteractionEvent("NEXT");
    setFilter("water");
    bump();
  };

  const onPoint = (selectValue: string) => {
    appendInteractionEvent("SELECT", selectValue);
    bump();
  };

  const onBack = () => {
    appendInteractionEvent("BACK");
    setFilter("all");
    bump();
  };

  const onShadeOnly = () => {
    appendInteractionEvent("SELECT", "ZNAJDZ_CIEN");
    setFilter("shade");
    bump();
  };

  const visiblePoints = HEAT_POINTS.filter((p) => {
    if (filter === "all") return true;
    if (filter === "water") return p.id !== "biblio_mokotow" || true;
    if (filter === "shade") return p.id === "biblio_mokotow" || p.status === "ok";
    return true;
  });

  return (
    <div className="relative min-h-dvh bg-field text-ink">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(228,0,69,0.12), transparent 55%)",
        }}
      />

      <main className="relative z-10 mx-auto flex max-w-lg flex-col gap-8 p-5 pb-16 sm:p-8">
        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/"
              className="font-mono-field text-xs tracking-widest text-accent/70 uppercase"
            >
              WARSZAWASZA
            </Link>
            <LangNav lang={lang} onChange={setLang} variant="bracket" />
          </div>

          <p className="m-0 font-mono-field text-sm tracking-wide text-accent/80">
            {copy.statusLine}
          </p>
          <h1 className="m-0 text-2xl font-light leading-snug sm:text-3xl">
            {copy.factHead}
          </h1>
          <p className="m-0 font-mono-field text-sm text-accent">{copy.alertRcb}</p>
          <ul className="m-0 list-none space-y-2 pl-0 text-sm text-accent/75">
            {copy.frictions.map((line) => (
              <li key={line}>· {line}</li>
            ))}
          </ul>
          <SignalControl
            type="button"
            direction="right"
            onClick={onCta}
            className="min-h-12 w-full border border-accent/35 bg-field px-4 py-3 text-left font-mono-field text-sm tracking-wide text-accent touch-manipulation"
          >
            {copy.ctaWaterShade}
          </SignalControl>
        </header>

        <section aria-label={copy.layer2Title}>
          <h2 className="mb-4 font-mono-field text-xs tracking-[0.2em] text-accent/55 uppercase">
            {copy.layer2Title}
          </h2>
          <div className="flex flex-col gap-2">
            {visiblePoints.map((point) => {
              const labels = copy.pointLabels[point.id];
              const ok = point.status === "ok";
              return (
                <button
                  key={point.id}
                  type="button"
                  onClick={() => onPoint(point.selectValue)}
                  className="flex min-h-11 w-full touch-manipulation items-start gap-3 border border-accent/20 bg-field/80 px-4 py-3 text-left"
                >
                  <span
                    className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${ok ? "bg-citrus" : "bg-accent"}`}
                    aria-hidden
                  />
                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm leading-snug">{labels.name}</span>
                    <span className="font-mono-field text-xs text-accent/65">
                      {ok ? labels.statusOk : labels.statusFail} · {labels.action}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <SignalControl
              type="button"
              direction="left"
              onClick={onBack}
              className="min-h-10 font-mono-field text-xs text-accent/50 touch-manipulation"
            >
              {copy.back}
            </SignalControl>
            <SignalControl
              type="button"
              direction="down"
              onClick={onShadeOnly}
              className="min-h-10 font-mono-field text-xs text-accent/50 touch-manipulation"
            >
              SELECT(ZNAJDZ_CIEN)
            </SignalControl>
          </div>

          <div className="mt-6 rounded border border-accent/15 bg-field/60 p-3 font-mono-field text-xs leading-relaxed text-accent/45">
            <div className="mb-1 text-accent/60">{copy.traceTitle}</div>
            <pre className="m-0 whitespace-pre-wrap" key={traceTick}>
              {events.length ? formatTracePath(events) : "—"}
            </pre>
          </div>
        </section>

        <details className="rounded border border-accent/15 bg-field/40 p-4">
          <summary className="cursor-pointer font-mono-field text-xs tracking-widest text-accent/45 uppercase">
            {copy.layer3Title}
          </summary>
          <div className="mt-4 space-y-3 font-mono-field text-xs leading-relaxed text-accent/40">
            <p className="m-0">{copy.fopLine}</p>
            <p className="m-0 italic text-accent/35">{copy.hypothesisHeat}</p>
            <p className="m-0">· {copy.knowledgeLink}</p>
            <p className="m-0">· {copy.paperLink}</p>
            <p className="m-0 text-accent/30">
              Observation: temp={HEAT_TEMP_C}°C · deployment=warsaw · adapter=web
            </p>
          </div>
        </details>
      </main>
    </div>
  );
}
