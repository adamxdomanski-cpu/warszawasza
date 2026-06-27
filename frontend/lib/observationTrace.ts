import type { TrajectoryChoice } from "./artifactI18n";
import { buildFopDocument, buildFopHumanLabels } from "./fopBridge";
import type { CitizenTraceFields } from "./domain/traceContract";
import { COPY, PIPELINE_ORDER, traceArtifactCopy, type Lang } from "./i18n";
import {
  buildTraceStatusLines,
  crisisEmergencyHint,
  isCriticalHumanTrace,
} from "./traceStatus";
import { studioDiscoveryLine } from "./studioAnchor";

export type ObservationTracePayload = {
  lang: Lang;
  trajectory: TrajectoryChoice | null;
  engineIndex: number;
  attentionCount: number;
  clock: string;
  logLines: string[];
  createdAt: number;
  citizen?: CitizenTraceFields;
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

export function formatShortTraceId(createdAt: number): string {
  const d = new Date(createdAt);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

export function formatShortTraceLabel(createdAt: number, lang: Lang): string {
  const { tracePrefix } = traceArtifactCopy(lang);
  return `${tracePrefix} #${formatShortTraceId(createdAt)}`;
}

function observationQuote(trace: ObservationTracePayload): string | null {
  const text = trace.citizen?.relatedRefs?.trim();
  return text || null;
}

function traceStatusLines(trace: ObservationTracePayload): string[] {
  return buildTraceStatusLines(trace).lines;
}

/** WARSTWA 1 — human trace: quote, title, status, narracja, short ID. */
export function buildTraceHumanLayer(trace: ObservationTracePayload): string {
  const copy = COPY[trace.lang];
  const artifact = traceArtifactCopy(trace.lang);
  const stageKey = PIPELINE_ORDER[trace.engineIndex] ?? "observation";
  const stageLabel = copy.pipeline[stageKey];

  const lines: string[] = [artifact.layer1, ""];

  const quote = observationQuote(trace);
  if (quote) {
    lines.push(`„${quote}"`, "");
  }

  lines.push(artifact.documentTitle, "");

  for (const status of traceStatusLines(trace)) {
    lines.push(status);
  }
  if (isCriticalHumanTrace(trace)) {
    const hint = crisisEmergencyHint(trace.lang);
    if (hint) lines.push(hint);
  }

  const place = trace.citizen?.place?.trim();
  const time = trace.citizen?.observedAt?.trim() || trace.clock;
  if (place) {
    lines.push(`${place} · ${time}`);
  } else if (time) {
    lines.push(time);
  }

  lines.push(
    `${stageLabel} · ${trace.clock} · ${trace.attentionCount} ${copy.trace.attentionUnits}`,
    "",
    copy.trace.civicBridge,
    "",
    formatShortTraceLabel(trace.createdAt, trace.lang),
    "",
    `· ${studioDiscoveryLine(trace.lang)}`,
  );

  return lines.join("\n");
}

/** WARSTWA 2 — timestamp log lines. */
export function buildTraceLogLayer(trace: ObservationTracePayload): string {
  const artifact = traceArtifactCopy(trace.lang);
  const copy = COPY[trace.lang];
  return [
    artifact.layer2,
    "",
    copy.trace.logHeader,
    ...trace.logLines.map((line) => `  ${line}`),
  ].join("\n");
}

/** WARSTWA 3 — human FOP labels + parseable FOP/0.1 block. */
export function buildTraceFopLayer(trace: ObservationTracePayload): string {
  const artifact = traceArtifactCopy(trace.lang);
  return [
    artifact.separator,
    "",
    artifact.layer3,
    "",
    ...buildFopHumanLabels(trace),
    "",
    buildFopDocument(trace),
  ].join("\n");
}

export function buildTraceDocument(trace: ObservationTracePayload): string {
  return [
    buildTraceHumanLayer(trace),
    "",
    buildTraceLogLayer(trace),
    "",
    buildTraceFopLayer(trace),
  ].join("\n");
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
    ...(trace.citizen?.subject ? { s: trace.citizen.subject } : {}),
    ...(trace.citizen?.obsidianRef ? { r: trace.citizen.obsidianRef } : {}),
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
