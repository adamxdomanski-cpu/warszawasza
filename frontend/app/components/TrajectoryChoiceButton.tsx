"use client";

import { useState } from "react";
import type { TrajectoryChoice } from "../../lib/artifactI18n";
import type { SignalDirection } from "../../lib/signalInteraction";
import SignalControl from "./SignalControl";

type TrajectoryChoiceButtonProps = {
  choice: TrajectoryChoice;
  letter: "F" | "T";
  hint: string;
  direction: SignalDirection;
  onCommit: (choice: TrajectoryChoice) => void;
};

/** Pointer down = hesitation (◐). Click = commit T/F trajectory. */
export default function TrajectoryChoiceButton({
  choice,
  letter,
  hint,
  direction,
  onCommit,
}: TrajectoryChoiceButtonProps) {
  const [hesitating, setHesitating] = useState(false);

  const endHesitation = () => setHesitating(false);

  return (
    <SignalControl
      type="button"
      direction={direction}
      className={`trajectory-choice flex min-h-[3.25rem] w-full touch-manipulation flex-col items-start gap-2.5 border border-accent/30 bg-field px-5 py-5 text-left sm:min-h-11 sm:py-4 ${
        hesitating ? "trajectory-hesitating" : ""
      }`}
      onPointerDown={() => setHesitating(true)}
      onPointerLeave={endHesitation}
      onPointerCancel={endHesitation}
      onClick={() => {
        onCommit(choice);
        endHesitation();
      }}
    >
      <span className="trajectory-choice-letter font-mono-field text-2xl tracking-[0.14em] text-ink sm:text-2xl">
        {hesitating ? "◐" : letter}
      </span>
      <span className="text-base leading-snug text-accent/88 sm:text-lg">{hint}</span>
    </SignalControl>
  );
}
