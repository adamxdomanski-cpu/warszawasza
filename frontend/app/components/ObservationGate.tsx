"use client";

import { useEffect, useState } from "react";
import { useStructureAnchor } from "../../hooks/useStructureAnchor";
import {
  ENTRY_COPY,
  type TrajectoryChoice,
} from "../../lib/artifactI18n";
import type { Lang } from "../../lib/i18n";
import { COPY } from "../../lib/i18n";
import FieldBackdrop from "./FieldBackdrop";
import FieldFooter from "./FieldFooter";
import GrapheneField from "./GrapheneField";
import LangNav from "./LangNav";
import LivingSignalText from "./LivingSignalText";
import SignalControl from "./SignalControl";
import TrajectoryChoiceButton from "./TrajectoryChoiceButton";
import { persistTrajectory } from "./TrajectorySwitch";

type ObservationGateProps = {
  onComplete: (choice: TrajectoryChoice, lang: Lang) => void;
};

type GatePhase = "observe" | "question" | "reveal";

export default function ObservationGate({ onComplete }: ObservationGateProps) {
  const [lang, setLang] = useState<Lang>("pl");
  const [phase, setPhase] = useState<GatePhase>("observe");
  const axiomSubjectRef = useStructureAnchor<HTMLDivElement>();
  const revealWaveRef = useStructureAnchor<HTMLParagraphElement>();
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
    <>
      <FieldFooter lang={lang} />
      <div className="relative flex min-h-dvh flex-col gap-7 overflow-x-hidden p-5 pb-14 sm:gap-8 sm:p-8 sm:pb-16">
      <GrapheneField />
      <FieldBackdrop />

      <header className="relative z-10 flex flex-col gap-5">
        <p className="m-0 font-mono-field text-xs tracking-[0.16em] text-accent drop-shadow-[0_0_20px_rgba(228,0,69,0.35)] sm:text-sm">
          {copy.observationMark}
        </p>
        <LangNav lang={lang} onChange={setLang} />
      </header>

      {phase === "observe" ? (
        <section
          className="context-link-group relative z-10 flex flex-1 flex-col justify-center gap-5 py-6 sm:gap-6"
          aria-label={copy.gateObserve}
        >
          <div className="context-link-context max-w-md space-y-1">
            <div ref={axiomSubjectRef} className="fira-structure-proximity fira-structure-badge">
              {COPY[lang].signalAxiom.map((line, index) => (
                <LivingSignalText
                  key={line}
                  text={line}
                  className={`context-link-axiom-line m-0 block text-lg font-light leading-snug sm:text-xl ${
                    index === 1 ? "context-link-axiom-line--follow" : "context-link-axiom-line--subject"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="context-link-label font-mono-field text-sm tracking-[0.2em] text-accent/70 sm:text-base">
            {copy.gateObserve}
          </div>
          <SignalControl
            type="button"
            direction="down"
            onClick={() => setPhase("question")}
            className="context-link-target min-h-11 touch-manipulation self-start font-mono-field text-sm tracking-[0.12em] text-accent uppercase sm:text-base"
          >
            {copy.gateObserveAction}
          </SignalControl>
        </section>
      ) : phase === "question" ? (
        <section
          className="relative z-10 flex flex-1 flex-col justify-center gap-6 py-6 sm:gap-8"
          aria-label={copy.gateQuestion}
        >
          <div className="space-y-1 font-mono-field text-sm tracking-[0.18em] text-accent/55 sm:text-base">
            <div className="text-accent/40">{copy.gateObserve}</div>
            <div className="py-1 text-xs opacity-25" aria-hidden="true">
              ↓
            </div>
            <div className="text-accent/70">{copy.gateQuestion}</div>
          </div>

          <p className="m-0 font-mono-field text-xs tracking-[0.12em] text-accent/38 sm:text-sm">
            {copy.gateHesitation}
          </p>

          <div className="flex flex-col gap-3 sm:gap-4">
            <TrajectoryChoiceButton
              choice="false"
              letter="F"
              hint={copy.falseHint}
              direction="down"
              onCommit={selectTrajectory}
            />
            <TrajectoryChoiceButton
              choice="true"
              letter="T"
              hint={copy.trueHint}
              direction="up-right"
              onCommit={selectTrajectory}
            />
          </div>
        </section>
      ) : (
        <section
          className="animate-gate-in context-link-group relative z-10 flex flex-1 flex-col justify-center gap-3 py-6"
          aria-live="polite"
        >
          <div className="context-link-context space-y-3">
            <p className="animate-spark-in m-0 text-3xl text-accent">{copy.revealSpark}</p>
            <p
              ref={revealWaveRef}
              className="fira-structure-proximity fira-structure-badge m-0 mb-1 font-mono-field text-base tracking-widest"
            >
              {copy.revealWave}
            </p>
            <LivingSignalText
              text={copy.revealLine1}
              className="m-0 block text-2xl font-light leading-snug sm:text-3xl"
            />
            <LivingSignalText
              text={copy.revealLine2}
              className="context-link-follow m-0 block text-2xl font-light leading-snug text-accent sm:text-3xl"
            />
          </div>
          <SignalControl
            type="button"
            direction="right"
            onClick={enterField}
            className="context-link-target mt-6 min-h-11 touch-manipulation self-start font-mono-field text-sm tracking-[0.12em] text-accent uppercase sm:text-base"
          >
            {copy.enterField}
          </SignalControl>
        </section>
      )}
      </div>
    </>
  );
}
