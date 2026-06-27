/**
 * Qualitative sensory representation — thick mapping (Kietlińska 2018).
 * Semiotic layer on top of FOP telemetry; not a substitute for Layer 0 facts.
 * Spec: docs/protocol/layers-spec-85233.md
 */

/** Five senses used in Warsaw thick-mapping interviews (Kietlińska 2018). */
export type SensorySense = "WECH" | "WZROK" | "SLUCH" | "DOTYK" | "SMAK";

/** Emotional temperature palette (Kietlińska 2018, s. 178). */
export type EmotionalTemperature = "POSITIVE" | "NEUTRAL" | "AMBIVALENT" | "NEGATIVE";

/** Ratajski-style legibility cap — max distinct graphic classes per map view. */
export const SENSORY_VISUAL_CLASS_MAX = 9;

export type SensoryAnchor = {
  lat: number;
  lng: number;
  sector: string;
};

export type QualitativeTrace = {
  trace_id: string;
  sense: SensorySense;
  temperature: EmotionalTemperature;
  category_general: string;
  category_detailed: string;
  narrative_excerpt: string;
  anchor: SensoryAnchor;
  /** Optional link to COP trace_short_id (e.g. 20260627-022029). */
  linked_trace_short_id?: string;
  /** Product / craft theme (e.g. Zapach WARSZAWASZA). */
  theme?: string;
};

export const SENSORY_SENSE_LABELS: Record<SensorySense, string> = {
  WECH: "Węch",
  WZROK: "Wzrok",
  SLUCH: "Słuch",
  DOTYK: "Dotyk",
  SMAK: "Smak",
};

export const EMOTIONAL_TEMPERATURE_LABELS: Record<EmotionalTemperature, string> = {
  POSITIVE: "Pozytywna",
  NEUTRAL: "Neutralna",
  AMBIVALENT: "Ambiwalentna",
  NEGATIVE: "Negatywna / tarcie",
};

/** Tailwind utility bundles for UI (TraceStatusBadge, map legend). */
export const EMOTIONAL_TEMPERATURE_STYLES: Record<
  EmotionalTemperature,
  { border: string; bg: string; text: string; dot: string }
> = {
  POSITIVE: {
    border: "border-emerald-500/40",
    bg: "bg-emerald-950/20",
    text: "text-emerald-300",
    dot: "bg-emerald-400",
  },
  NEUTRAL: {
    border: "border-sky-500/35",
    bg: "bg-sky-950/20",
    text: "text-sky-300",
    dot: "bg-sky-400",
  },
  AMBIVALENT: {
    border: "border-violet-500/40",
    bg: "bg-violet-950/20",
    text: "text-violet-300",
    dot: "bg-violet-400",
  },
  NEGATIVE: {
    border: "border-red-500/45",
    bg: "bg-red-950/25",
    text: "text-red-300",
    dot: "bg-red-400",
  },
};

export function isSensorySense(value: string): value is SensorySense {
  return value === "WECH" || value === "WZROK" || value === "SLUCH" || value === "DOTYK" || value === "SMAK";
}

export function isEmotionalTemperature(value: string): value is EmotionalTemperature {
  return (
    value === "POSITIVE" ||
    value === "NEUTRAL" ||
    value === "AMBIVALENT" ||
    value === "NEGATIVE"
  );
}

export function parseQualitativeTrace(raw: unknown): QualitativeTrace | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const anchor = o.anchor;
  if (!anchor || typeof anchor !== "object") return null;
  const a = anchor as Record<string, unknown>;
  if (
    typeof o.trace_id !== "string" ||
    typeof o.sense !== "string" ||
    !isSensorySense(o.sense) ||
    typeof o.temperature !== "string" ||
    !isEmotionalTemperature(o.temperature) ||
    typeof o.category_general !== "string" ||
    typeof o.category_detailed !== "string" ||
    typeof o.narrative_excerpt !== "string" ||
    typeof a.lat !== "number" ||
    typeof a.lng !== "number" ||
    typeof a.sector !== "string"
  ) {
    return null;
  }
  return {
    trace_id: o.trace_id,
    sense: o.sense,
    temperature: o.temperature,
    category_general: o.category_general,
    category_detailed: o.category_detailed,
    narrative_excerpt: o.narrative_excerpt,
    anchor: { lat: a.lat, lng: a.lng, sector: a.sector },
    ...(typeof o.linked_trace_short_id === "string"
      ? { linked_trace_short_id: o.linked_trace_short_id }
      : {}),
    ...(typeof o.theme === "string" ? { theme: o.theme } : {}),
  };
}

export function parseQualitativeTraceList(raw: unknown): QualitativeTrace[] {
  if (!Array.isArray(raw)) return [];
  return raw.map(parseQualitativeTrace).filter((t): t is QualitativeTrace => t !== null);
}
