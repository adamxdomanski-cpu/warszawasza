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
      className={`trajectory-choice flex min-h-11 w-full touch-manipulation flex-col items-start gap-2 bg-field/80 px-5 py-4 text-left ${
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
      <span className="trajectory-choice-letter font-mono-field text-lg tracking-[0.14em] sm:text-xl">
        {hesitating ? "◐" : letter}
      </span>
      <span className="text-sm leading-snug text-accent/50">{hint}</span>
    </SignalControl>
  );
}
