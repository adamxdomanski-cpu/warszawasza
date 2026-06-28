/**
 * Trace lifecycle — Scenario B closure (COP v1.0 / FOP/0.1).
 * Layer 0 fact required for RESOLVED; time decay for EXPIRED.
 */

import type { ResultKind } from "./fira-core";

/** Operator-console DB enum (backend/sql/001_cop_init.sql) */
export type ObservationStatusIndicator =
  | "STABLE"
  | "ALTERED"
  | "DISCONNECTED"
  | "PENDING";

export type TraceLifecyclePhase = "OPEN" | "RESOLVED" | "EXPIRED";

export type TraceResolutionProtocol = {
  phase: TraceLifecyclePhase;
  /** Maps to civic_observations.status_indicator */
  statusIndicator: ObservationStatusIndicator;
  /** FOP res line: kind + optional value */
  fopResult: { kind: ResultKind; value?: string };
  /** Human status in WARSTWA 1 (PL) */
  statusLinePl: string;
};

/** Default TTL before EXPIRED without corroboration (ms) */
export const TRACE_EXPIRY_MS = 12 * 60 * 60 * 1000;

export const TRACE_LIFECYCLE: Record<TraceLifecyclePhase, TraceResolutionProtocol> = {
  OPEN: {
    phase: "OPEN",
    statusIndicator: "ALTERED",
    fopResult: { kind: "trajectory", value: "open" },
    statusLinePl:
      "Status: NIEZWERYFIKOWANA — hipoteza oczekująca weryfikacji terenowej",
  },
  RESOLVED: {
    phase: "RESOLVED",
    statusIndicator: "STABLE",
    fopResult: { kind: "trajectory", value: "resolved" },
    statusLinePl: "STATUS ✓ Zweryfikowano — tarcie usunięte z pola",
  },
  EXPIRED: {
    phase: "EXPIRED",
    statusIndicator: "DISCONNECTED",
    fopResult: { kind: "trajectory", value: "expired" },
    statusLinePl: "Status: WYGASZONA — brak potwierdzenia w oknie czasu",
  },
};

/** Layer 0 fact required to close as RESOLVED (second physical node). */
export type ResolutionFact = {
  /** Short trace id e.g. 20260627-022029 */
  closesTraceId: string;
  /** Operator confirms friction removed at place */
  placeConfirmed: string;
  /** Free-text: e.g. szkło usunięte z jezdni i chodnika */
  layer0Note: string;
  /** Must be true for RESOLVED — citizen validation, not gate F/T alone */
  verified: boolean;
  resolvedAt: number;
};

export function protocolForPhase(phase: TraceLifecyclePhase): TraceResolutionProtocol {
  return TRACE_LIFECYCLE[phase];
}

/**
 * RESOLVED only when a second CHANNEL_A_CITIZEN fact explicitly verifies cleanup.
 * EXPIRED when open past TTL with no resolution fact.
 * Otherwise OPEN.
 */
export function resolveTracePhase(
  openedAt: number,
  now: number,
  resolutionFact: ResolutionFact | null,
): TraceLifecyclePhase {
  if (resolutionFact?.verified && resolutionFact.layer0Note.trim().length > 0) {
    return "RESOLVED";
  }
  if (now - openedAt >= TRACE_EXPIRY_MS) {
    return "EXPIRED";
  }
  return "OPEN";
}

/** Format short trace id from createdAt (matches observationTrace). */
export function traceIdFromCreatedAt(createdAt: number): string {
  const d = new Date(createdAt);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}
