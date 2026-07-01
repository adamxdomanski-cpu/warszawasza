"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import LangNav from "../LangNav";
import WarszawaszaLogoLink from "../WarszawaszaLogoLink";
import SignalControl from "../SignalControl";
import FieldBrandFooter from "./FieldBrandFooter";
import FieldVoiceReport, { type FieldVoiceReportHandle } from "./FieldVoiceReport";
import HeatFieldDevPanel from "./HeatFieldDevPanel";
import HeatNearbySection from "./HeatNearbySection";
import {
  HEAT_TEMP_C,
  heatFieldCopy,
  heatUrgency,
  HEAT_RCB_CRITICAL,
} from "../../../lib/field/heatFieldI18n";
import { coldStartCopy } from "../../../lib/field/coldStartI18n";
import { useFieldLang } from "../../../lib/field/useFieldLang";
import {
  appendInteractionEvent,
  clearInteractionTrace,
  getInteractionTrace,
} from "../../../lib/interactionTrace";

export default function HeatFieldClient() {
  const [lang, setLang] = useFieldLang();
  const [traceTick, setTraceTick] = useState(0);
  const nearbyRef = useRef<HTMLElement>(null);
  const voicePanelRef = useRef<HTMLElement>(null);
  const voiceRef = useRef<FieldVoiceReportHandle>(null);

  const copy = heatFieldCopy(lang);
  const voiceCopy = coldStartCopy(lang);
  const events = getInteractionTrace().events;
  const urgency = heatUrgency(HEAT_TEMP_C, HEAT_RCB_CRITICAL);

  useEffect(() => {
    clearInteractionTrace();
    appendInteractionEvent("START");
  }, []);

  const bump = () => setTraceTick((t) => t + 1);

  const onVoiceCta = () => {
    appendInteractionEvent("NEXT");
    bump();
    voiceRef.current?.startRecording();
    window.requestAnimationFrame(() => {
      voicePanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const onCta = () => {
    appendInteractionEvent("SELECT", "POMOC_W_POBLIZU");
    appendInteractionEvent("NEXT");
    bump();
    window.requestAnimationFrame(() => {
      nearbyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const onPoint = useCallback((selectValue: string) => {
    appendInteractionEvent("SELECT", selectValue);
    setTraceTick((t) => t + 1);
  }, []);

  return (
    <div
      className="heat-field-page relative min-h-dvh bg-field text-ink"
      data-urgency={urgency}
    >
      <div className="heat-field-ambient pointer-events-none fixed inset-0 z-0" aria-hidden />

      <main className="relative z-10 mx-auto flex min-h-dvh max-w-lg flex-col gap-6 p-5 pb-10 sm:gap-8 sm:p-8">
        <header className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <WarszawaszaLogoLink label="WARSZAWASZA" variant="field" />
            <LangNav lang={lang} onChange={setLang} variant="bracket" />
          </div>

          <div className="space-y-1">
            <p className="m-0 font-mono-field text-xs uppercase tracking-[0.18em] text-accent/75">
              {copy.scenarioLabel}
            </p>
            <p className="m-0 font-mono-field text-xs text-accent/55">{copy.scenarioWhen}</p>
          </div>

          <h1 className="m-0">
            <span className="heat-signal text-3xl font-light sm:text-4xl" aria-label={copy.factTemp}>
              {copy.factTemp}
            </span>
          </h1>

          <div className="grid gap-3 sm:grid-cols-2">
            <SignalControl
              type="button"
              direction="right"
              onClick={onVoiceCta}
              className="min-h-[4.25rem] border-2 border-accent/55 bg-field px-4 py-4 text-left text-base font-medium leading-snug text-ink touch-manipulation sm:min-h-16 sm:text-lg"
            >
              {copy.ctaVoiceReport}
            </SignalControl>
            <SignalControl
              type="button"
              direction="right"
              onClick={onCta}
              className="min-h-[4.25rem] border-2 border-accent/40 bg-field px-4 py-4 text-left text-base font-medium leading-snug text-ink touch-manipulation sm:min-h-16 sm:text-lg"
            >
              {copy.ctaNearbyHelp}
            </SignalControl>
          </div>

          <details className="rounded border border-accent/15 bg-field/60 px-4 py-3">
            <summary className="cursor-pointer text-sm text-accent/55 touch-manipulation">
              {copy.moreContextLabel}
            </summary>
            <div className="mt-3 space-y-3">
              <p className="m-0 font-mono-field text-xs tracking-wide text-accent/55">
                {copy.statusLine}
              </p>
              <p className="m-0 text-sm text-accent/70">{copy.factSubtitle}</p>

              {copy.microHintLabel && copy.microHintBody && (
                <aside className="rounded border border-accent/12 bg-field/50 px-3 py-2.5 text-sm leading-relaxed text-accent/70">
                  <p className="m-0 font-medium text-accent/80">{copy.microHintLabel}</p>
                  <p className="mt-1.5 mb-0">{copy.microHintBody}</p>
                </aside>
              )}

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
                  <li>! {copy.transportTram}</li>
                  <li>! {copy.transportSkm}</li>
                </ul>
              </div>

              <p className="m-0 text-sm leading-relaxed text-accent/65">{copy.waterSaveQuestion}</p>
            </div>
          </details>
        </header>

        <section ref={voicePanelRef} aria-label={copy.ctaVoiceReport}>
          <FieldVoiceReport ref={voiceRef} lang={lang} copy={voiceCopy} onFindHelp={onCta} lean heatContext />
        </section>

        <section
          id="nearby"
          ref={nearbyRef}
          aria-label={copy.layer2Title}
        >
          <HeatNearbySection copy={copy} onPoint={onPoint} />
        </section>

        <HeatFieldDevPanel lang={lang} copy={copy} events={events} traceTick={traceTick} />

        <FieldBrandFooter />
      </main>
    </div>
  );
}
