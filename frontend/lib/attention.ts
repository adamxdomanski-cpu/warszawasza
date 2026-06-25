/** Unified attention input — pointer, touch, and gaze are equivalent. */

export type AttentionInput = "pointer" | "touch" | "gaze";

export type AttentionPoint = {
  x: number;
  y: number;
  t: number;
  input: AttentionInput;
};

export type AttentionPathPoint = { x: number; y: number; t: number };

export function pathLength(points: AttentionPathPoint[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i += 1) {
    const dx = points[i]!.x - points[i - 1]!.x;
    const dy = points[i]!.y - points[i - 1]!.y;
    total += Math.hypot(dx, dy);
  }
  return total;
}

export function gridZone(x: number, y: number): string {
  const zoneX = Math.floor(x / (window.innerWidth / 3));
  const zoneY = Math.floor(y / (window.innerHeight / 3));
  return `${zoneX}-${zoneY}`;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function hasFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches;
}

export function touchFromEvent(
  event: TouchEvent,
): { x: number; y: number } | null {
  const touch = event.touches[0] ?? event.changedTouches[0];
  if (!touch) return null;
  return { x: touch.clientX, y: touch.clientY };
}
