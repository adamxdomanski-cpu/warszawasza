"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import LangNav from "../LangNav";
import SignalControl from "../SignalControl";
import FieldVoiceReport from "./FieldVoiceReport";
import {
  HEAT_POINTS,
  HEAT_TEMP_C,
  formatDistance,
  heatFieldCopy,
  heatUrgency,
  HEAT_RCB_CRITICAL,
} from "../../../lib/field/heatFieldI18n";
import type { Lang } from "../../../lib/i18n";
import { LANGS } from "../../../lib/i18n";
import {
  appendInteractionEvent,
  clearInteractionTrace,
  formatTracePath,
  getInteractionTrace,
} from "../../../lib/interactionTrace";
import { formatJourneyBlock, journeyLayerTitle } from "../../../lib/traceJourney";

function initialFieldLang(): Lang {
  if (typeof window === "undefined") return "pl";
  const nav = navigator.language.toLowerCase();
  const hit = LANGS.find((code) => nav === code || nav.startsWith(`${code}-`));
  return hit ?? "pl";
}

export default function HeatFieldClient() {
  const [lang, setLang] = useState<Lang>(() => initialFieldLang());
  const [helpOpen, setHelpOpen] = useState(false);
  const [traceTick, setTraceTick] = useState(0);
  const nearbyRef = useRef<HTMLElement>(null);
  const voiceRef = useRef<HTMLElement>(null);

  const copy = heatFieldCopy(lang);
  const events = getInteractionTrace().events;
  const urgency = heatUrgency(HEAT_TEMP_C, HEAT_RCB_CRITICAL);

  useEffect(() => {
    clearInteractionTrace();
    appendInteractionEvent("START");
    appendInteractionEvent("SELECT", "MOKOTOW");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const bump = () => setTraceTick((t) => t + 1);

  const onVoiceCta = () => {
    appendInteractionEvent("NEXT");
    bump();
    window.requestAnimationFrame(() => {
      voiceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const onCta = () => {
    appendInteractionEvent("SELECT", "POMOC_W_POBLIZU");
    appendInteractionEvent("NEXT");
    setHelpOpen(true);
    bump();
    window.requestAnimationFrame(() => {
      nearbyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const onPoint = (selectValue: string) => {
    appendInteractionEvent("SELECT", selectValue);
    bump();
  };

  return (
    <div
      className="heat-field-page relative min-h-dvh bg-field text-ink"
      data-urgency={urgency}
    >
      <div className="heat-field-ambient pointer-events-none fixed inset-0 z-0" aria-hidden />

      <main className="relative z-10 mx-auto flex max-w-lg flex-col gap-6 p-5 pb-16 sm:gap-8 sm:p-8">
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
            <span className="heat-signal" aria-label={`${copy.factTemp} ${copy.factSubtitle}`}>
              {copy.factTemp}
            </span>
            <span className="text-ink/90"> · {copy.factSubtitle}</span>
          </h1>

          <details className="rounded border border-accent/20 bg-field/80 px-4 py-3">
            <summary className="cursor-pointer text-sm font-medium text-accent touch-manipulation">
              {copy.alertRcbLabel}
            </summary>
            <p className="mt-3 mb-0 text-sm leading-relaxed text-accent/75">
              {copy.alertRcbBody}
            </p>
          </details>

          <div className="rounded border border-accent/20 bg-field/80 px-4 py-3">
            <p className="m-0 mb-2 text-sm font-medium text-ink/90">{copy.transportTitle}</p>
            <ul className="m-0 list-none space-y-1.5 pl-0 text-sm text-accent/75">
              <li>⚠ {copy.transportTram}</li>
              <li>⚠ {copy.transportSkm}</li>
            </ul>
            <details className="mt-2">
              <summary className="cursor-pointer text-xs text-accent/50 touch-manipulation">
                {copy.transportMore}
              </summary>
              <p className="mt-2 mb-0 text-xs leading-relaxed text-accent/45">
                {copy.transportTram}. {copy.transportSkm}.
              </p>
            </details>
          </div>

          <details className="rounded border border-accent/15 bg-field/60 px-4 py-3">
            <summary className="cursor-pointer text-sm text-accent/70 touch-manipulation">
              {copy.waterSaveTitle}
            </summary>
            <p className="mt-3 mb-0 text-sm leading-relaxed text-accent/65">
              {copy.waterSaveQuestion}
            </p>
          </details>

          <div className="grid gap-2 sm:grid-cols-2">
            <SignalControl
              type="button"
              direction="right"
              onClick={onVoiceCta}
              className="min-h-14 border-2 border-accent/50 bg-field px-4 py-3 text-left text-base font-medium leading-snug text-ink touch-manipulation"
            >
              {copy.ctaVoiceReport}
            </SignalControl>
            <SignalControl
              type="button"
              direction="right"
              onClick={onCta}
              className="min-h-14 border border-accent/35 bg-field px-4 py-3 text-left text-sm leading-snug text-ink touch-manipulation"
            >
              {copy.ctaNearbyHelp}
            </SignalControl>
          </div>
        </header>

        <section ref={voiceRef} aria-label={copy.ctaVoiceReport}>
          <FieldVoiceReport
            lang={lang}
            copy={copy}
            onFindHelp={onCta}
          />
        </section>

        <section
          ref={nearbyRef}
          aria-label={copy.layer2Title}
          className={helpOpen ? "opacity-100" : "opacity-100"}
        >
          <h2 className="mb-4 text-base font-normal text-ink/90">{copy.layer2Title}</h2>
          <div className="flex flex-col gap-2">
            {HEAT_POINTS.map((point) => {
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
                    className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                      ok
                        ? point.kind === "shade"
                          ? "bg-[var(--color-warsaw-shade)]"
                          : point.kind === "water"
                            ? "bg-[var(--color-warsaw-water)]"
                            : "bg-citrus"
                        : "bg-[var(--color-warsaw-heat-critical)]"
                    }`}
                    aria-hidden
                  />
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-sm leading-snug">{labels.name}</span>
                      <span className="shrink-0 text-xs tabular-nums text-accent/55">
                        {formatDistance(copy, point.distanceM, point.walkMin)}
                      </span>
                    </span>
                    <span className="text-xs text-accent/65">
                      {labels.kindLabel} · {ok ? labels.statusOk : labels.statusFail} ·{" "}
                      {labels.action}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <details className="mt-2 border-t border-accent/10 pt-4">
          <summary className="cursor-pointer text-sm text-accent/45 touch-manipulation">
            ▼ {copy.technicalData}
          </summary>
          <div className="mt-4 space-y-4 text-xs leading-relaxed text-accent/40">
            {events.length > 0 && (
              <details className="rounded border border-accent/10 bg-field/40 p-3">
                <summary className="cursor-pointer text-sm text-accent/60 touch-manipulation">
                  ▼ {journeyLayerTitle(lang)}
                </summary>
                <pre className="mt-3 mb-0 whitespace-pre-wrap text-sm text-accent/65" key={traceTick}>
                  {formatJourneyBlock(events, lang).replace(/^▼[^\n]*\n\n/, "")}
                </pre>
              </details>
            )}

            <details className="rounded border border-accent/10 bg-field/40 p-3">
              <summary className="cursor-pointer text-accent/55 touch-manipulation">
                {copy.whyContext}
              </summary>
              <div className="mt-3 space-y-3">
                <div>
                  <p className="m-0 mb-1 text-accent/50">{copy.sourcesTitle}</p>
                  <p className="m-0">· {copy.knowledgeLink}</p>
                </div>
                <div>
                  <p className="m-0 mb-1 text-accent/50">{copy.researchTitle}</p>
                  <p className="m-0">· {copy.paperLink}</p>
                </div>
                <details>
                  <summary className="cursor-pointer text-accent/45 touch-manipulation">
                    {copy.hypothesisTitle}
                  </summary>
                  <p className="mt-2 mb-0 italic text-accent/40">{copy.hypothesisHeat}</p>
                </details>
              </div>
            </details>

            <div className="rounded border border-accent/10 bg-field/60 p-3 font-mono-field">
              <div className="mb-1 text-accent/55">{copy.traceTitle}</div>
              <pre className="m-0 whitespace-pre-wrap text-accent/45" key={traceTick}>
                {events.length ? formatTracePath(events) : "—"}
              </pre>
              <p className="mt-2 mb-0 text-accent/35">{copy.devEventCodes}</p>
            </div>

            <div className="space-y-1 font-mono-field text-accent/35">
              <p className="m-0">{copy.layer3Title}</p>
              <p className="m-0">{copy.fopLine}</p>
              <p className="m-0">
                Observation: temp={HEAT_TEMP_C}°C · deployment=warsaw · adapter=web
              </p>
            </div>
          </div>
        </details>
      </main>
    </div>
  );
};
