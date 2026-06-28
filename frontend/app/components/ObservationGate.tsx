"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
import OrientationScreen from "./OrientationScreen";
import SignalControl from "./SignalControl";
import TrajectoryChoiceButton from "./TrajectoryChoiceButton";
import WarszawaszaLogoLink from "./WarszawaszaLogoLink";
import { persistTrajectory } from "./TrajectorySwitch";
import { appendInteractionEvent } from "../../lib/interactionTrace";

type ObservationGateProps = {
  onComplete: (choice: TrajectoryChoice, lang: Lang) => void;
};

type GatePhase = "orient" | "question" | "reveal";

const ORIENT_SEEN_KEY = "wzs-orient-v5";

function readOrientPhase(): GatePhase {
  if (typeof window === "undefined") return "orient";
  try {
    const params = new URLSearchParams(window.location.search);
    const orientParam = params.get("orient");
    if (orientParam === "0") return "question";
    if (orientParam === "1") return "orient";
    if (sessionStorage.getItem(ORIENT_SEEN_KEY) === "1") return "question";
  } catch {
    /* storage unavailable */
  }
  return "orient";
}

function markOrientSeen() {
  try {
    sessionStorage.setItem(ORIENT_SEEN_KEY, "1");
  } catch {
    /* session unavailable */
  }
}

export default function ObservationGate({ onComplete }: ObservationGateProps) {
  const [lang, setLang] = useState<Lang>("pl");
  const [phase, setPhase] = useState<GatePhase>("orient");
  const [orientExiting, setOrientExiting] = useState(false);
  const orientExitDoneRef = useRef(false);
  const axiomSubjectRef = useStructureAnchor<HTMLDivElement>();
  const revealWaveRef = useStructureAnchor<HTMLParagraphElement>();
  const [choice, setChoice] = useState<TrajectoryChoice | null>(null);

  const copy = ENTRY_COPY[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    setPhase(readOrientPhase());
  }, []);

  const beginOrientExit = () => {
    if (orientExitDoneRef.current || orientExiting) return;
    setOrientExiting(true);
  };

  const completeOrientExit = () => {
    if (orientExitDoneRef.current) return;
    orientExitDoneRef.current = true;
    markOrientSeen();
    appendInteractionEvent("NEXT");
    setOrientExiting(false);
    setPhase("question");
  };

  useEffect(() => {
    if (!orientExiting) return;
    const fallback = window.setTimeout(completeOrientExit, 480);
    return () => window.clearTimeout(fallback);
  }, [orientExiting]);

  const selectTrajectory = (next: TrajectoryChoice) => {
    appendInteractionEvent("SELECT", next === "true" ? "TRUE" : "FALSE");
    setChoice(next);
    setPhase("reveal");
    persistTrajectory(next);
  };

  const returnToQuestion = () => {
    appendInteractionEvent("BACK");
    setChoice(null);
    setPhase("question");
  };

  const enterField = () => {
    if (choice) {
      appendInteractionEvent("NEXT");
      onComplete(choice, lang);
    }
  };

  const onHesitate = () => {
    appendInteractionEvent("PAUSE");
  };

  if (phase === "orient") {
    return (
      <OrientationScreen
        lang={lang}
        copy={copy}
        exiting={orientExiting}
        onLangChange={setLang}
        onContinue={beginOrientExit}
        onFadeComplete={completeOrientExit}
      />
    );
  }

  return (
    <>
      <FieldFooter lang={lang} />
      <div className="relative flex min-h-dvh flex-col gap-7 overflow-x-hidden p-5 pb-14 sm:gap-8 sm:p-8 sm:pb-16">
        <GrapheneField />
        <FieldBackdrop />

        <header className="relative z-10 flex flex-col gap-5">
          <WarszawaszaLogoLink label={copy.logoLinkLabel} variant="field" />
          <p className="accent-signal m-0 font-mono-field text-sm tracking-[0.14em] text-accent sm:text-base">
            {copy.observationMark}
          </p>
          <LangNav lang={lang} onChange={setLang} />
          <Link
            href="/field/heat"
            className="font-mono-field text-xs tracking-wide text-accent/70 underline-offset-2 hover:text-accent hover:underline"
          >
            39°C · woda i cień →
          </Link>
        </header>

        {phase === "question" ? (
          <section
            className="animate-gate-in context-link-group relative z-10 flex flex-1 flex-col justify-center gap-6 py-6 sm:gap-8"
            aria-label={copy.gateQuestion}
          >
            <div className="context-link-context max-w-md space-y-1">
              <div ref={axiomSubjectRef} className="fira-structure-proximity fira-structure-badge">
                {COPY[lang].signalAxiom.map((line, index) => (
                  <p
                    key={line}
                    className={`context-link-axiom-line m-0 block text-xl font-light leading-relaxed sm:text-2xl ${
                      index === 1 ? "context-link-axiom-line--follow" : "context-link-axiom-line--subject"
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <p className="m-0 font-mono-field text-sm leading-snug tracking-[0.08em] text-accent/58 sm:text-base">
              {copy.gateHesitation}
            </p>

            <div className="flex flex-col gap-3 sm:gap-4">
              <TrajectoryChoiceButton
                choice="false"
                letter="F"
                hint={copy.falseHint}
                direction="down"
                onCommit={selectTrajectory}
                onHesitate={onHesitate}
              />
              <TrajectoryChoiceButton
                choice="true"
                letter="T"
                hint={copy.trueHint}
                direction="up-right"
                onCommit={selectTrajectory}
                onHesitate={onHesitate}
              />
            </div>
          </section>
        ) : (
          <section
            className="animate-gate-in context-link-group relative z-10 flex flex-1 flex-col justify-center gap-3 py-6"
            aria-live="polite"
          >
            <div className="context-link-context space-y-3">
              <p className="accent-signal animate-spark-in m-0 text-3xl text-accent">{copy.revealSpark}</p>
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
              direction="left"
              onClick={returnToQuestion}
              className="mt-2 min-h-10 self-start font-mono-field text-xs tracking-wider text-accent/45 touch-manipulation"
            >
              ← T / F
            </SignalControl>
            <SignalControl
              type="button"
              direction="right"
              onClick={enterField}
              className="accent-signal context-link-target mt-4 min-h-11 touch-manipulation self-start font-mono-field text-sm tracking-[0.12em] text-accent uppercase sm:text-base"
            >
              {copy.enterField}
            </SignalControl>
          </section>
        )}
      </div>
    </>
  );
}
