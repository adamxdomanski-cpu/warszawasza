"use client";

import { useEffect, useRef, useState } from "react";
import LangNav from "../LangNav";
import SignalControl from "../SignalControl";
import FieldBrandFooter from "./FieldBrandFooter";
import FieldVoiceReport, { type FieldVoiceReportHandle } from "./FieldVoiceReport";
import { coldStartCopy } from "../../../lib/field/coldStartI18n";
import { initialFieldLang } from "../../../lib/field/initialFieldLang";
import type { Lang } from "../../../lib/i18n";
import {
  appendInteractionEvent,
  clearInteractionTrace,
} from "../../../lib/interactionTrace";

/** Minimal cold-start — read nothing before first tap. */
export default function ColdStartClient() {
  const [lang, setLang] = useState<Lang>(() => initialFieldLang());
  const voiceRef = useRef<FieldVoiceReportHandle>(null);
  const voicePanelRef = useRef<HTMLElement>(null);
  const copy = coldStartCopy(lang);

  useEffect(() => {
    clearInteractionTrace();
    appendInteractionEvent("START");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const onVoice = () => {
    appendInteractionEvent("NEXT");
    voiceRef.current?.startRecording();
    window.requestAnimationFrame(() => {
      voicePanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="heat-field-page relative min-h-dvh overflow-x-clip bg-field text-ink">
      <main className="relative z-10 mx-auto flex min-h-dvh w-full min-w-0 max-w-lg flex-col gap-6 overflow-x-clip p-5 pb-10 sm:gap-8 sm:p-8">
        <header className="flex min-w-0 flex-col gap-4">
          <div className="flex min-w-0 justify-end">
            <LangNav lang={lang} onChange={setLang} variant="bracket" />
          </div>

          <div className="grid min-w-0 gap-3 md:grid-cols-2">
            <SignalControl
              type="button"
              direction="right"
              onClick={onVoice}
              className="field-text-wrap min-h-[4.25rem] border-2 border-accent/55 bg-field px-4 py-4 text-left text-base font-medium leading-snug text-ink touch-manipulation sm:min-h-16 sm:text-lg"
            >
              {copy.ctaVoiceReport}
            </SignalControl>
            <SignalControl
              as="a"
              href="/field/heat#nearby"
              direction="right"
              onClick={() => appendInteractionEvent("SELECT", "POMOC_W_POBLIZU")}
              className="field-text-wrap min-h-[4.25rem] border-2 border-accent/40 bg-field px-4 py-4 text-left text-base font-medium leading-snug text-ink touch-manipulation sm:min-h-16 sm:text-lg"
            >
              {copy.ctaNearbyHelp}
            </SignalControl>
          </div>
        </header>

        <section ref={voicePanelRef} aria-label={copy.ctaVoiceReport}>
          <FieldVoiceReport ref={voiceRef} lang={lang} copy={copy} lean />
        </section>

        <FieldBrandFooter />
      </main>
    </div>
  );
}
