import type { TrajectoryChoice } from "./artifactI18n";
import { COPY, PIPELINE_ORDER, type Lang } from "./i18n";

export type ObservationTracePayload = {
  lang: Lang;
  trajectory: TrajectoryChoice | null;
  engineIndex: number;
  attentionCount: number;
  clock: string;
  logLines: string[];
  createdAt: number;
};

export const TRACE_REGISTRY_KEY = "warszawasza-field-traces";

function readRegistry(): ObservationTracePayload[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(TRACE_REGISTRY_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ObservationTracePayload[]) : [];
  } catch {
    return [];
  }
}

export function getTraceRegistryCount(): number {
  return readRegistry().length;
}

export function registerTrace(trace: ObservationTracePayload): number {
  const next = [...readRegistry(), trace].slice(-99);
  localStorage.setItem(TRACE_REGISTRY_KEY, JSON.stringify(next));
  return next.length;
}

export function buildTraceDocument(
  trace: ObservationTracePayload,
  origin = "https://www.warszawasza.online",
): string {
  const copy = COPY[trace.lang];
  const stageKey = PIPELINE_ORDER[trace.engineIndex] ?? "observation";
  const stageLabel = copy.pipeline[stageKey];
  const trajectoryLabel =
    trace.trajectory === "true"
      ? copy.entry.trueLabel
      : trace.trajectory === "false"
        ? copy.entry.falseLabel
        : "—";

  const lines = [
    "WARSZAWASZA // ŚLAD OBYWATELSKI",
    `${new Date(trace.createdAt).toISOString()} · ${trace.lang}`,
    `${copy.entry.trueLabel}/${copy.entry.falseLabel}: ${trajectoryLabel}`,
    `${stageLabel} · ${trace.clock} · ${trace.attentionCount} ${copy.trace.attentionUnits}`,
    "",
    copy.trace.logHeader,
    ...trace.logLines.map((line) => `  ${line}`),
    "",
    copy.trace.civicBridge,
    buildTraceShareUrl(trace, origin),
  ];

  return lines.join("\n");
}

export function buildTraceShareUrl(
  trace: ObservationTracePayload,
  origin = "https://www.warszawasza.online",
): string {
  const compact = {
    l: trace.lang,
    t: trace.trajectory,
    e: trace.engineIndex,
    a: trace.attentionCount,
    c: trace.clock,
    ts: trace.createdAt,
  };
  const encoded = btoa(JSON.stringify(compact))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return `${origin}/?trace=${encoded}`;
}

export function buildMailtoHref(trace: ObservationTracePayload): string {
  const body = encodeURIComponent(buildTraceDocument(trace));
  const subject = encodeURIComponent("WARSZAWASZA — ślad obserwacji");
  return `mailto:hello@warszawasza.online?subject=${subject}&body=${body}`;
}
