"use client";

import { useEffect, useRef, useState } from "react";
import LangNav from "../LangNav";
import SignalControl from "../SignalControl";
import FieldVoiceReport from "./FieldVoiceReport";
import { coldStartCopy } from "../../../lib/field/coldStartI18n";
import { initialFieldLang } from "../../../lib/field/initialFieldLang";
import type { Lang } from "../../../lib/i18n";
import {
  appendInteractionEvent,
  clearInteractionTrace,
} from "../../../lib/interactionTrace";

/** Minimal cold-start surface — two actions + voice above the fold. */
export default function ColdStartClient() {
  const [lang, setLang] = useState<Lang>(() => initialFieldLang());
  const voiceRef = useRef<HTMLElement>(null);
  const copy = coldStartCopy(lang);

  useEffect(() => {
    clearInteractionTrace();
    appendInteractionEvent("START");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const scrollToVoice = () => {
    appendInteractionEvent("NEXT");
    voiceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="heat-field-page relative min-h-dvh bg-field text-ink">
      <main className="relative z-10 mx-auto flex max-w-lg flex-col gap-6 p-5 pb-16 sm:gap-8 sm:p-8">
        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono-field text-xs tracking-widest text-accent/70 uppercase">
              WARSZAWASZA
            </span>
            <LangNav lang={lang} onChange={setLang} variant="bracket" />
          </div>

          <p className="m-0 text-lg font-light leading-snug text-ink sm:text-xl">{copy.tagline}</p>

          <div className="grid gap-2 sm:grid-cols-2">
            <SignalControl
              type="button"
              direction="right"
              onClick={scrollToVoice}
              className="min-h-14 border-2 border-accent/50 bg-field px-4 py-3 text-left text-base font-medium leading-snug text-ink touch-manipulation"
            >
              {copy.ctaVoiceReport}
            </SignalControl>
            <SignalControl
              as="a"
              href="/field/heat#nearby"
              direction="right"
              onClick={() => appendInteractionEvent("SELECT", "POMOC_W_POBLIZU")}
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
            onFindHelp={() => {
              window.location.href = "/field/heat#nearby";
            }}
          />
        </section>
      </main>
    </div>
  );
}
