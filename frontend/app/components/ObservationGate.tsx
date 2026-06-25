"use client";

import { useEffect, useState } from "react";
import {
  ENTRY_COPY,
  type TrajectoryChoice,
} from "../../lib/artifactI18n";
import type { Lang } from "../../lib/i18n";
import { COPY } from "../../lib/i18n";
import FieldBackdrop from "./FieldBackdrop";
import GrapheneField from "./GrapheneField";
import LangNav from "./LangNav";
import LivingSignalText from "./LivingSignalText";
import SignalControl from "./SignalControl";
import { persistTrajectory } from "./TrajectorySwitch";

type ObservationGateProps = {
  onComplete: (choice: TrajectoryChoice, lang: Lang) => void;
};

type GatePhase = "choose" | "reveal";

export default function ObservationGate({ onComplete }: ObservationGateProps) {
  const [lang, setLang] = useState<Lang>("pl");
  const [phase, setPhase] = useState<GatePhase>("choose");
  const [choice, setChoice] = useState<TrajectoryChoice | null>(null);

  const copy = ENTRY_COPY[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const selectTrajectory = (next: TrajectoryChoice) => {
    setChoice(next);
    setPhase("reveal");
    persistTrajectory(next);
  };

  const enterField = () => {
    if (choice) onComplete(choice, lang);
  };

  return (
    <div className="relative flex min-h-dvh flex-col gap-7 overflow-x-hidden p-5 pb-10 sm:gap-8 sm:p-8">
      <GrapheneField />
      <FieldBackdrop />

      <header className="relative z-10 flex flex-col gap-5">
        <p className="m-0 font-mono-field text-xs tracking-[0.16em] text-accent drop-shadow-[0_0_20px_rgba(228,0,69,0.35)] sm:text-sm">
          {copy.observationMark}
        </p>
        <LangNav lang={lang} onChange={setLang} />
      </header>

      {phase === "choose" ? (
        <section
          className="relative z-10 flex flex-1 flex-col justify-center gap-8 py-6 sm:gap-10"
          aria-label={copy.observationMark}
        >
          <LivingSignalText
            text={COPY[lang].signalAxiom}
            className="m-0 max-w-md text-lg font-light leading-relaxed text-sapphire/80 sm:text-xl"
          />
          <p className="m-0 font-mono-field text-sm tracking-widest text-accent/50">
            T / F ?
          </p>

          <div className="flex flex-col gap-3 sm:gap-4">
            <SignalControl
              type="button"
              direction="down"
              onClick={() => selectTrajectory("false")}
              className="flex min-h-11 w-full touch-manipulation flex-col items-start gap-2 border border-accent-muted bg-field/80 px-5 py-4 text-left"
            >
              <span className="font-mono-field text-lg tracking-[0.14em] sm:text-xl">
                [ {copy.falseLabel} ]
              </span>
              <span className="text-sm leading-snug text-accent/50">{copy.falseHint}</span>
            </SignalControl>

            <SignalControl
              type="button"
              direction="up-right"
              onClick={() => selectTrajectory("true")}
              className="flex min-h-11 w-full touch-manipulation flex-col items-start gap-2 border border-accent-muted bg-field/80 px-5 py-4 text-left"
            >
              <span className="font-mono-field text-lg tracking-[0.14em] sm:text-xl">
                [ {copy.trueLabel} ]
              </span>
              <span className="text-sm leading-snug text-accent/50">{copy.trueHint}</span>
            </SignalControl>
          </div>
        </section>
      ) : (
        <section
          className="animate-gate-in relative z-10 flex flex-1 flex-col justify-center gap-3 py-6"
          aria-live="polite"
        >
          <p className="animate-spark-in m-0 text-3xl text-accent">{copy.revealSpark}</p>
          <p className="m-0 mb-1 font-mono-field text-base tracking-widest text-sapphire/75">
            {copy.revealWave}
          </p>
          <LivingSignalText
            text={copy.revealLine1}
            className="m-0 text-2xl font-light leading-snug sm:text-3xl"
          />
          <LivingSignalText
            text={copy.revealLine2}
            className="m-0 text-2xl font-light leading-snug text-accent sm:text-3xl"
          />
          <SignalControl
            type="button"
            direction="right"
            onClick={enterField}
            className="mt-6 min-h-11 touch-manipulation self-start font-mono-field text-sm tracking-[0.12em] text-accent uppercase sm:text-base"
          >
            {copy.enterField}
          </SignalControl>
        </section>
      )}
    </div>
  );
}
