/**
 * Layer 0 validation chain — Spec 85233 (COP v1.0).
 * Client-side scoring for L0.1 Proof of Presence; types mirror backend/sql/011.
 */

export type Layer0PipelineStage =
  | "UNVERIFIED"
  | "PRESENCE_OK"
  | "OBSERVATION_OK"
  | "INTEGRITY_OK"
  | "CONSENSUS_OK"
  | "VERIFIED"
  | "REJECTED";

export type ReputationEventType =
  | "OBSERVATION_CONFIRMED"
  | "OBSERVATION_REJECTED"
  | "FABRICATION_DETECTED"
  | "EXIF_MANIPULATION"
  | "CONSENSUS_CONFIRMED"
  | "FALSE_POSITIVE"
  | "REPEATED_ABUSE"
  | "PRESENCE_FAILURE"
  | "MANUAL_ADJUSTMENT";

/** Decomposed L0.1 inputs (0–1 each). */
export type PresenceSignals = {
  gps_confidence: number;
  wifi_proximity: number;
  bluetooth_beacon: number;
  motion_consistency: number;
  time_consistency: number;
};

export const PRESENCE_SIGNAL_WEIGHTS = {
  gps_confidence: 0.45,
  wifi_proximity: 0.2,
  bluetooth_beacon: 0.15,
  motion_consistency: 0.1,
  time_consistency: 0.1,
} as const satisfies Record<keyof PresenceSignals, number>;

/** Default anchor radius (m). Extended to 100 m only when presence_score ≥ 0.85. */
export const PRESENCE_RADIUS_STRICT_M = 50;
export const PRESENCE_RADIUS_RELAXED_M = 100;
export const PRESENCE_SCORE_THRESHOLD = 0.7;
export const PRESENCE_RELAXED_SCORE_THRESHOLD = 0.85;

/** Consensus nodes required before public VERIFIED (L0.4). */
export const CONSENSUS_REQUIRED_DEFAULT = 2;

/** Trust deltas — see docs/protocol/layers-spec-85233.md */
export const TRUST_DELTAS: Record<
  Exclude<
    ReputationEventType,
    "FALSE_POSITIVE" | "REPEATED_ABUSE" | "PRESENCE_FAILURE" | "MANUAL_ADJUSTMENT"
  >,
  number
> = {
  OBSERVATION_CONFIRMED: 2,
  OBSERVATION_REJECTED: -5,
  FABRICATION_DETECTED: -30,
  EXIF_MANIPULATION: -60,
  CONSENSUS_CONFIRMED: 2,
};

export type GeoPoint = { lat: number; lon: number };

/** Haversine distance in metres. */
export function distanceMetres(a: GeoPoint, b: GeoPoint): number {
  const R = 6_371_000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** Map Geolocation accuracy (m) to 0–1 confidence. */
export function gpsAccuracyToConfidence(accuracyMetres: number | null | undefined): number {
  if (accuracyMetres == null || !Number.isFinite(accuracyMetres) || accuracyMetres <= 0) {
    return 0;
  }
  if (accuracyMetres > 100) return 0.3;
  if (accuracyMetres > 50) return 0.5;
  if (accuracyMetres > 25) return 0.75;
  return 1;
}

export function computePresenceScore(signals: PresenceSignals): number {
  const w = PRESENCE_SIGNAL_WEIGHTS;
  const raw =
    w.gps_confidence * clamp01(signals.gps_confidence) +
    w.wifi_proximity * clamp01(signals.wifi_proximity) +
    w.bluetooth_beacon * clamp01(signals.bluetooth_beacon) +
    w.motion_consistency * clamp01(signals.motion_consistency) +
    w.time_consistency * clamp01(signals.time_consistency);
  return clamp01(raw);
}

export type PresenceValidationResult =
  | { ok: true; presenceScore: number; distanceM: number; maxRadiusM: number }
  | {
      ok: false;
      reason: "LOW_PRESENCE_SCORE" | "OUT_OF_RADIUS" | "MISSING_ANCHOR";
      presenceScore: number;
      distanceM?: number;
    };

/**
 * L0.1 gate: operator must be within anchor radius with sufficient presence_score.
 */
export function validateProofOfPresence(
  anchor: GeoPoint | null,
  operator: GeoPoint,
  signals: PresenceSignals,
): PresenceValidationResult {
  const presenceScore = computePresenceScore(signals);
  if (!anchor) {
    return { ok: false, reason: "MISSING_ANCHOR", presenceScore };
  }
  const distanceM = distanceMetres(anchor, operator);
  const maxRadiusM =
    presenceScore >= PRESENCE_RELAXED_SCORE_THRESHOLD
      ? PRESENCE_RADIUS_RELAXED_M
      : PRESENCE_RADIUS_STRICT_M;

  if (presenceScore < PRESENCE_SCORE_THRESHOLD) {
    return { ok: false, reason: "LOW_PRESENCE_SCORE", presenceScore, distanceM };
  }
  if (distanceM > maxRadiusM) {
    return { ok: false, reason: "OUT_OF_RADIUS", presenceScore, distanceM };
  }
  return { ok: true, presenceScore, distanceM, maxRadiusM };
}

/** Ordered pipeline — each stage answers a distinct question. */
export const LAYER0_PIPELINE: readonly {
  stage: Layer0PipelineStage;
  labelPl: string;
  questionPl: string;
}[] = [
  {
    stage: "UNVERIFIED",
    labelPl: "Kwarantanna",
    questionPl: "Sygnal oczekuje — brak faktu Layer 0",
  },
  {
    stage: "PRESENCE_OK",
    labelPl: "L0.1 Obecność",
    questionPl: "Czy operator rzeczywiście znajduje się na miejscu?",
  },
  {
    stage: "OBSERVATION_OK",
    labelPl: "L0.2 Obserwacja",
    questionPl: "Czy istnieje ślad empiryczny zdarzenia?",
  },
  {
    stage: "INTEGRITY_OK",
    labelPl: "L0.3 Integralność",
    questionPl: "Czy ślad nie został sfałszowany (EXIF, hash, czas)?",
  },
  {
    stage: "CONSENSUS_OK",
    labelPl: "L0.4 Konsensus",
    questionPl: "Czy obserwację potwierdzają inni w sektorze?",
  },
  {
    stage: "VERIFIED",
    labelPl: "Zweryfikowano",
    questionPl: "Fakt gotowy do dystrybucji publicznej",
  },
] as const;

function clamp01(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(1, n));
}
