"use client";

import SignalControl from "./SignalControl";
import { TRAJECTORY_KEY, type TrajectoryChoice } from "../../lib/artifactI18n";
import { COPY, type Lang } from "../../lib/i18n";
import { dispatchLightning } from "./FieldBackdrop";

type TrajectorySwitchProps = {
  lang: Lang;
  value: TrajectoryChoice | null;
  onChange: (choice: TrajectoryChoice) => void;
  compact?: boolean;
};

export function persistTrajectory(choice: TrajectoryChoice) {
  try {
    sessionStorage.setItem(TRAJECTORY_KEY, choice);
  } catch {
    /* session unavailable */
  }
}

export default function TrajectorySwitch({
  lang,
  value,
  onChange,
  compact = false,
}: TrajectorySwitchProps) {
  const labels = COPY[lang].entry;

  const pick = (choice: TrajectoryChoice) => {
    if (choice === value) return;
    persistTrajectory(choice);
    dispatchLightning();
    onChange(choice);
  };

  return (
    <div
      className={`flex gap-2 font-mono-field tracking-[0.12em] ${compact ? "text-sm" : "text-base sm:text-lg"}`}
      role="group"
      aria-label="Trajectory"
    >
      {(["false", "true"] as const).map((choice) => {
        const active = value === choice;
        const label = choice === "false" ? labels.falseLabel : labels.trueLabel;
        return (
          <SignalControl
            key={choice}
            type="button"
            direction={choice === "true" ? "up-right" : "down"}
            onClick={() => pick(choice)}
            className={`min-h-11 touch-manipulation px-3 py-2 sm:px-4 ${
              active ? "text-accent opacity-100" : "text-accent/35 opacity-70"
            }`}
            aria-pressed={active}
          >
            [ {label} ]
          </SignalControl>
        );
      })}
    </div>
  );
}
