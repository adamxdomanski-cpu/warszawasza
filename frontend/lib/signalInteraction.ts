export type SignalDirection =
  | "none"
  | "right"
  | "left"
  | "down"
  | "up"
  | "up-right"
  | "down-right";

const SHIFT: Record<SignalDirection, { x: number; y: number }> = {
  none: { x: 0, y: 0 },
  right: { x: 1, y: 0 },
  left: { x: -1, y: 0 },
  down: { x: 0, y: 1 },
  up: { x: 0, y: -1 },
  "up-right": { x: 1, y: -1 },
  "down-right": { x: 1, y: 1 },
};

export function signalShift(direction: SignalDirection): { x: number; y: number } {
  return SHIFT[direction];
}

export const SIGNAL_DETECT_MS = 280;
export const SIGNAL_RECOVERY_MS = 320;

export function triggerSignalDetection(el: HTMLElement | null) {
  if (!el) return;
  el.classList.remove("signal-recovering");
  void el.offsetWidth;
  el.classList.add("signal-detected");
  window.setTimeout(() => {
    el.classList.remove("signal-detected");
    el.classList.add("signal-recovering");
    window.setTimeout(() => el.classList.remove("signal-recovering"), SIGNAL_RECOVERY_MS);
  }, SIGNAL_DETECT_MS);
}
