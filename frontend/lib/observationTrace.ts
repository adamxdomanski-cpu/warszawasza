import type { TrajectoryChoice } from "./artifactI18n";
import { buildFopDocument, buildFopHumanLabels } from "./fopBridge";
import type { CitizenTraceFields } from "./domain/traceContract";
import {
  formatTracePath,
  suggestTraceHypotheses,
  traceEventsForLog,
} from "./interactionTrace";
import type { InteractionEvent } from "./fira-core/interaction";
import {
  COPY,
  PIPELINE_ORDER,
  traceArtifactCopy,
  traceResidentCopy,
  type Lang,
} from "./i18n";
import {
  buildTraceStatusLines,
  crisisEmergencyHint,
  isCriticalHumanTrace,
  isTerrainVerified,
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
  traceEvents?: InteractionEvent[];
  /** @deprecated use traceEvents */
  decisionEvents?: InteractionEvent[];
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

function formatRelativeTime(trace: ObservationTracePayload): string {
  const rc = traceResidentCopy(trace.lang);
  const ms = Date.now() - trace.createdAt;
  if (ms < 60_000) return rc.justNow;
  const minutes = Math.floor(ms / 60_000);
  if (minutes < 120) return rc.minutesAgo.replace("{n}", String(minutes));
  const hours = Math.floor(minutes / 60);
  return rc.hoursAgo.replace("{n}", String(hours));
}

function buildResidentStatusLines(trace: ObservationTracePayload): string[] {
  const rc = traceResidentCopy(trace.lang);
  const decision = trace.citizen?.traceDecision;
  const lines: string[] = [];

  if (decision === "true") lines.push(rc.statusReceived);
  else if (decision === "false") lines.push(rc.statusUnverified);
  else lines.push(rc.statusReceived);

  if (!isTerrainVerified(trace)) lines.push(rc.statusAwaitingField);

  if (isCriticalHumanTrace(trace)) {
    const hint = crisisEmergencyHint(trace.lang);
    if (hint) lines.push(hint);
  }

  return lines;
}

/** Resident-facing card — no WARSTWA / FOP / pipeline jargon. */
export function buildTraceResidentLayer(
  trace: ObservationTracePayload,
  origin = "https://www.warszawasza.online",
): string {
  const rc = traceResidentCopy(trace.lang);
  const place = trace.citizen?.place?.trim() || rc.cityDefault;
  const quote = observationQuote(trace);
  const lines: string[] = [];

  if (quote) {
    lines.push(`„${quote}"`, "");
  }

  lines.push(place, formatRelativeTime(trace), "");

  for (const status of buildResidentStatusLines(trace)) {
    lines.push(status);
  }
  lines.push(
    "",
    `${rc.findWaterShade}:`,
    `${origin}/field/heat`,
    "",
    `${rc.reportObservation}:`,
    `${origin}/`,
    "",
    formatShortTraceLabel(trace.createdAt, trace.lang),
    "",
    `· ${studioDiscoveryLine(trace.lang)}`,
  );

  return lines.join("\n");
}

function resolveTraceEvents(trace: ObservationTracePayload): InteractionEvent[] {
  return trace.traceEvents ?? trace.decisionEvents ?? [];
}

/** Developer / archive block — LOG, FOP, hypotheses. */
export function buildTraceTechnicalLayer(trace: ObservationTracePayload): string {
  const artifact = traceArtifactCopy(trace.lang);
  const rc = traceResidentCopy(trace.lang);
  const copy = COPY[trace.lang];
  const events = resolveTraceEvents(trace);
  const traceLines = events.length ? traceEventsForLog(events) : [];
  const pathBlock =
    events.length > 0 ? ["", "trace:", formatTracePath(events)] : [];
  const hypothesis = buildTraceHypothesisLayer(trace);

  return [
    artifact.separator,
    "",
    rc.technicalData,
    "",
    artifact.layer2,
    "",
    copy.trace.logHeader,
    ...trace.logLines.map((line) => `  ${line}`),
    ...traceLines,
    ...pathBlock,
    "",
    artifact.layer3,
    "",
    ...buildFopHumanLabels(trace),
    "",
    buildFopDocument(trace),
    ...(hypothesis ? ["", hypothesis] : []),
  ].join("\n");
}

/** @deprecated use buildTraceResidentLayer */
export function buildTraceHumanLayer(trace: ObservationTracePayload): string {
  return buildTraceResidentLayer(trace);
}

export function buildTraceLogLayer(trace: ObservationTracePayload): string {
  const artifact = traceArtifactCopy(trace.lang);
  const copy = COPY[trace.lang];
  const events = resolveTraceEvents(trace);
  const traceLines = events.length ? traceEventsForLog(events) : [];
  const pathBlock =
    events.length > 0 ? ["", "trace:", formatTracePath(events)] : [];
  return [
    artifact.layer2,
    "",
    copy.trace.logHeader,
    ...trace.logLines.map((line) => `  ${line}`),
    ...traceLines,
    ...pathBlock,
  ].join("\n");
}

export function buildTraceFopLayer(trace: ObservationTracePayload): string {
  const artifact = traceArtifactCopy(trace.lang);
  return [
    artifact.layer3,
    "",
    ...buildFopHumanLabels(trace),
    "",
    buildFopDocument(trace),
  ].join("\n");
}

export function buildTraceHypothesisLayer(trace: ObservationTracePayload): string {
  const events = resolveTraceEvents(trace);
  if (!events.length) return "";
  const suggestions = suggestTraceHypotheses(events);
  if (suggestions.length === 0) return "";
  const lines = ["HYPOTHESIS (provisional — not verified):", ""];
  for (const s of suggestions) {
    lines.push(`Observation: ${s.observation}`);
    lines.push(`Hypothesis: ${s.hypothesis}`);
    lines.push("");
  }
  return lines.join("\n").trimEnd();
}

/** Clipboard / mailto: human first, diagnostics after separator. */
export function buildTraceDocument(trace: ObservationTracePayload): string {
  return [buildTraceResidentLayer(trace), "", buildTraceTechnicalLayer(trace)].join(
    "\n",
  );
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

/** Full legacy export with WARSTWA headers in layer 1 (dev / archive). */
export function buildTraceDocumentLegacy(trace: ObservationTracePayload): string {
  const artifact = traceArtifactCopy(trace.lang);
  const copy = COPY[trace.lang];
  const stageKey = PIPELINE_ORDER[trace.engineIndex] ?? "observation";
  const stageLabel = copy.pipeline[stageKey];
  const quote = observationQuote(trace);
  const hypothesis = buildTraceHypothesisLayer(trace);

  const header: string[] = [artifact.layer1, ""];
  if (quote) header.push(`„${quote}"`, "");
  header.push(artifact.documentTitle, "");
  for (const status of buildTraceStatusLines(trace).lines) {
    header.push(status);
  }
  const place = trace.citizen?.place?.trim();
  const time = trace.citizen?.observedAt?.trim() || trace.clock;
  if (place) header.push(`${place} · ${time}`);
  else if (time) header.push(time);
  header.push(
    `${stageLabel} · ${trace.clock} · ${trace.attentionCount} ${copy.trace.attentionUnits}`,
    "",
    copy.trace.civicBridge,
    "",
    formatShortTraceLabel(trace.createdAt, trace.lang),
  );

  return [
    header.join("\n"),
    "",
    buildTraceLogLayer(trace),
    "",
    buildTraceFopLayer(trace),
    ...(hypothesis ? ["", hypothesis] : []),
  ].join("\n");
}
