"use client";

import { useEffect, useRef } from "react";
import LangNav from "../LangNav";
import WarszawaszaLogoLink from "../WarszawaszaLogoLink";
import SignalControl from "../SignalControl";
import FieldBrandFooter from "./FieldBrandFooter";
import FieldVoiceReport, { type FieldVoiceReportHandle } from "./FieldVoiceReport";
import PrivacyLink from "../PrivacyLink";
import { coldStartCopy } from "../../../lib/field/coldStartI18n";
import { useFieldLang } from "../../../lib/field/useFieldLang";
import { projectMotto } from "../../../lib/projectMotto";
import {
  appendInteractionEvent,
  clearInteractionTrace,
} from "../../../lib/interactionTrace";

/** Minimal cold-start — read nothing before first tap. */
export default function ColdStartClient() {
  const [lang, setLang] = useFieldLang();
  const voiceRef = useRef<FieldVoiceReportHandle>(null);
  const voicePanelRef = useRef<HTMLElement>(null);
  const copy = coldStartCopy(lang);

  useEffect(() => {
    clearInteractionTrace();
    appendInteractionEvent("START");
  }, []);

  const onVoice = () => {
    appendInteractionEvent("NEXT");
    voiceRef.current?.startRecording();
    window.requestAnimationFrame(() => {
      voicePanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="heat-field-page relative min-h-dvh bg-field text-ink">
      <main className="relative z-10 mx-auto flex min-h-dvh max-w-lg flex-col gap-6 p-5 pb-10 sm:gap-8 sm:p-8">
        <header className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            <WarszawaszaLogoLink label="WARSZAWASZA" variant="field" className="shrink-0" />
            <LangNav lang={lang} onChange={setLang} variant="bracket" />
          </div>

          <p className="m-0 max-w-md text-base font-light leading-relaxed text-[var(--color-fira-structure-bright)]">
            {projectMotto(lang)}
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <SignalControl
              type="button"
              direction="right"
              onClick={onVoice}
              className="min-h-[4.25rem] border-2 border-accent/55 bg-field px-4 py-4 text-left text-base font-medium leading-snug text-ink touch-manipulation sm:min-h-16 sm:text-lg"
            >
              {copy.ctaVoiceReport}
            </SignalControl>
            <SignalControl
              as="a"
              href="/field/heat#nearby"
              direction="right"
              onClick={() => appendInteractionEvent("SELECT", "POMOC_W_POBLIZU")}
              className="min-h-[4.25rem] border-2 border-accent/40 bg-field px-4 py-4 text-left text-base font-medium leading-snug text-ink touch-manipulation sm:min-h-16 sm:text-lg"
            >
              {copy.ctaNearbyHelp}
            </SignalControl>
          </div>
        </header>

        <section ref={voicePanelRef} aria-label={copy.ctaVoiceReport}>
          <FieldVoiceReport ref={voiceRef} lang={lang} copy={copy} lean />
        </section>

        <p className="m-0 text-center text-sm text-[var(--color-fira-structure-mid)]">
          <PrivacyLink lang={lang} className="text-[var(--color-fira-structure-mid)] hover:text-ink" />
        </p>

        <FieldBrandFooter />
      </main>
    </div>
  );
}
