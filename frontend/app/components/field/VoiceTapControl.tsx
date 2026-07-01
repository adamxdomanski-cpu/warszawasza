"use client";

type VoiceTapControlProps = {
  mode: "start" | "stop";
  label: string;
  ariaLabel: string;
  onPress: () => void;
  disabled?: boolean;
};

/** White → red TAP — one control for start/stop (mobile-first). */
export default function VoiceTapControl({
  mode,
  label,
  ariaLabel,
  onPress,
  disabled = false,
}: VoiceTapControlProps) {
  return (
    <button
      type="button"
      onClick={onPress}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={mode === "stop"}
      className={`voice-tap touch-manipulation ${mode === "start" ? "voice-tap--idle" : "voice-tap--live"}`}
    >
      {label}
    </button>
  );
}
