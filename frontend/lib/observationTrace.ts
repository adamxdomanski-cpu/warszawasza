import type { TrajectoryChoice } from "./artifactI18n";
import { buildFopDocument, traceToObservation } from "./fopBridge";
import type { CitizenTraceFields } from "./domain/traceContract";
import {
  compactTracePath,
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
import { STUDIO_ANCHOR } from "./studioAnchor";
import { formatProcessNarrative, journeyLayerTitle } from "./traceJourney";
import {
  localizeCitizenPlace,
} from "./field/citizenPlace";

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

export type TracePresentationOptions = {
  origin?: string;
  /** UI language — may differ from trace.lang (language at submission). */
  displayLang?: Lang;
  /** Show heat guidance + nearby CTA (deployment context, not interpretation). */
  heatContext?: boolean;
  findHelpPath?: string;
};

function resolveDisplayLang(
  trace: ObservationTracePayload,
  options: TracePresentationOptions = {},
): Lang {
  return options.displayLang ?? trace.lang;
}

export type TraceCitizenView = {
  headline: string;
  placeLine: string;
  descriptionLabel?: string;
  description?: string;
  statusLabel: string;
  statusLine: string;
  heatGuidance?: string;
  nearbyCta: string;
  findHelpPath: string;
};

export type TraceTechnicalSummary = {
  traceId: string;
  pipelineLabel: string;
  pipelineValue: string;
  telemetryLabel: string;
  telemetryValue: string;
  eventLogLabel: string;
  eventLogValue: string;
};

export const TRACE_REGISTRY_KEY = "warszawasza-field-traces";

const TELEMETRY_CHAIN = "OBS → SIG → PROC → FIL → PAM → WAL → WIE";

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

/** Most recent trace on this device (localStorage). */
export function getLastRegisteredTrace(): ObservationTracePayload | null {
  const all = readRegistry();
  return all.length ? all[all.length - 1]! : null;
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
  if (!text) return null;
  const placeholders = [
    "Nagraj obserwację",
    "Say what you see",
    "Report what you see",
  ];
  if (placeholders.some((p) => text === p)) return null;
  return text;
}

export function formatRelativeTime(
  trace: ObservationTracePayload,
  displayLang?: Lang,
): string {
  const rc = traceResidentCopy(displayLang ?? trace.lang);
  const ms = Date.now() - trace.createdAt;
  if (ms < 60_000) return rc.justNow;
  const minutes = Math.floor(ms / 60_000);
  if (minutes < 120) return rc.minutesAgo.replace("{n}", String(minutes));
  const hours = Math.floor(minutes / 60);
  return rc.hoursAgo.replace("{n}", String(hours));
}

export function isHeatDeployment(trace: ObservationTracePayload): boolean {
  const subject = trace.citizen?.subject ?? "";
  if (/heat|upał|upa/i.test(subject)) return true;
  return trace.logLines.some((l) => /field\/heat|heat/i.test(l));
}

function resolveTraceEvents(trace: ObservationTracePayload): InteractionEvent[] {
  return trace.traceEvents ?? trace.decisionEvents ?? [];
}

function pipelineCoherence(trace: ObservationTracePayload): { level: number; bar: string } {
  const events = resolveTraceEvents(trace);
  const completed = events.some((e) => e.event === "COMPLETE");
  const obs = traceToObservation(trace);
  let level = obs.evidence.level as number;
  if (completed) {
    level = Math.max(level, Math.min(5, trace.engineIndex >= 7 ? 5 : trace.engineIndex + 1));
  }
  if (level < 1) level = completed ? 5 : 1;
  level = Math.max(1, Math.min(5, level));
  return { level, bar: "█".repeat(level) + "░".repeat(5 - level) };
}

function formatEventLogShort(events: InteractionEvent[]): string {
  if (!events.length) return "—";
  return events.map((e) => e.event).join(" → ");
}

function citizenStatusLine(trace: ObservationTracePayload, displayLang: Lang): string {
  const rc = traceResidentCopy(displayLang);
  if (trace.citizen?.traceDecision === "false") return rc.statusUnverified;
  if (isTerrainVerified(trace)) {
    return displayLang === "pl"
      ? "Potwierdzone w terenie."
      : displayLang === "it"
        ? "Confermato sul campo."
        : "Confirmed in the field.";
  }
  return rc.statusAwaitingField;
}

/** Structured L1 — observation separate from recommendation. */
export function getTraceCitizenView(
  trace: ObservationTracePayload,
  options: TracePresentationOptions = {},
): TraceCitizenView {
  const displayLang = resolveDisplayLang(trace, options);
  const rc = traceResidentCopy(displayLang);
  const place =
    localizeCitizenPlace(trace.citizen?.place, displayLang) || rc.cityDefault;
  const quote = observationQuote(trace);
  const heat = options.heatContext ?? isHeatDeployment(trace);
  const findHelpPath = options.findHelpPath ?? "/field/heat#nearby";

  return {
    headline: rc.statusReceived,
    placeLine: `${place} (${formatRelativeTime(trace, displayLang)})`,
    ...(quote
      ? { descriptionLabel: rc.reportDescriptionLabel, description: quote }
      : {}),
    statusLabel: rc.statusLabel,
    statusLine: citizenStatusLine(trace, displayLang),
    ...(heat ? { heatGuidance: rc.heatGuidance } : {}),
    nearbyCta: rc.showNearbyPlaces,
    findHelpPath,
  };
}

/** Plain-text L1 for clipboard — no telemetry, no interpretation. */
export function buildTraceResidentLayer(
  trace: ObservationTracePayload,
  options: TracePresentationOptions = {},
): string {
  const view = getTraceCitizenView(trace, options);
  const rc = traceResidentCopy(trace.lang);
  const traceId = formatShortTraceId(trace.createdAt);
  const lines: string[] = [
    view.headline,
    `${rc.traceReferencePrefix} #${traceId}`,
    "",
    view.placeLine,
    "",
  ];

  if (view.descriptionLabel && view.description) {
    lines.push(view.descriptionLabel, `„${view.description}"`, "");
  }

  lines.push(view.statusLabel, view.statusLine, "", rc.savedConfirmation, "", rc.emailNotConfigured, "");

  if (view.heatGuidance) {
    lines.push(view.heatGuidance, "");
  }

  if (view.heatGuidance) {
    lines.push(view.nearbyCta);
  }

  if (isCriticalHumanTrace(trace)) {
    const hint = crisisEmergencyHint(trace.lang);
    if (hint) lines.push("", hint);
  }

  return lines.join("\n").trimEnd();
}

export function buildTraceCitizenLayer(
  trace: ObservationTracePayload,
  _origin?: string,
  options: TracePresentationOptions = {},
): string {
  return buildTraceResidentLayer(trace, options);
}

export function buildTraceJourneyLayer(trace: ObservationTracePayload): string {
  return formatProcessNarrative(trace.lang, resolveTraceEvents(trace));
}

export function getTraceTechnicalSummary(
  trace: ObservationTracePayload,
  displayLang?: Lang,
): TraceTechnicalSummary {
  const lang = displayLang ?? trace.lang;
  const rc = traceResidentCopy(lang);
  const copy = traceArtifactCopy(lang);
  const events = resolveTraceEvents(trace);
  const { level } = pipelineCoherence(trace);
  const coherenceLabel =
    lang === "pl"
      ? `Spójność ${level}/5`
      : lang === "en"
        ? `Coherence ${level}/5`
        : `${level}/5`;

  return {
    traceId: formatShortTraceId(trace.createdAt),
    pipelineLabel: rc.pipelineLabel,
    pipelineValue: coherenceLabel,
    telemetryLabel: rc.telemetryLabel,
    telemetryValue: copy.chainStages,
    eventLogLabel: rc.eventLogLabel,
    eventLogValue: formatEventLogShort(events),
  };
}

/** L3 inner drawer — JSON + raw FOP + hypothesis (dev only). */
export function buildTraceTechnicalDetails(trace: ObservationTracePayload): string {
  const events = resolveTraceEvents(trace);
  const { level, bar } = pipelineCoherence(trace);
  const hypothesis = buildTraceHypothesisLayer(trace);

  const jsonBlock = JSON.stringify(
    {
      trace_id: formatShortTraceId(trace.createdAt),
      pipeline_spojnosc: bar,
      path: events.length ? compactTracePath(events) : undefined,
      telemetry: TELEMETRY_CHAIN.replace(/ → /g, "->"),
      anchor: [STUDIO_ANCHOR.lat, STUDIO_ANCHOR.lon],
      ...(trace.attentionCount > 0 ? { impulsy_uwagi: trace.attentionCount } : {}),
      pipeline_level: level,
    },
    null,
    2,
  );

  const parts = [jsonBlock, "", buildFopDocument(trace)];
  if (hypothesis) parts.push("", hypothesis);
  if (events.length) {
    parts.push("", "trace:", formatTracePath(events));
  }
  return parts.join("\n");
}

/** @deprecated L3 flat dump — use summary + details in UI */
export function buildTraceTechnicalLayer(trace: ObservationTracePayload): string {
  const rc = traceResidentCopy(trace.lang);
  const summary = getTraceTechnicalSummary(trace);
  return [
    `${rc.traceIdLabel}: ${summary.traceId}`,
    `${summary.pipelineLabel}: ${summary.pipelineValue}`,
    `${summary.telemetryLabel}: ${summary.telemetryValue}`,
    `${summary.eventLogLabel}: ${summary.eventLogValue}`,
    "",
    buildTraceTechnicalDetails(trace),
  ].join("\n");
}

export function buildTraceHumanLayer(trace: ObservationTracePayload): string {
  return buildTraceResidentLayer(trace);
}

export function buildTraceLogLayer(trace: ObservationTracePayload): string {
  const copy = COPY[trace.lang];
  const events = resolveTraceEvents(trace);
  const traceLines = events.length ? traceEventsForLog(events) : [];
  return [
    copy.trace.logHeader,
    ...trace.logLines.map((line) => `  ${line}`),
    ...traceLines,
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

export function buildTraceDocument(trace: ObservationTracePayload): string {
  return buildTraceCitizenLayer(trace);
}

export function buildTraceArchiveDocument(
  trace: ObservationTracePayload,
  origin = "https://www.warszawasza.online",
): string {
  const rc = traceResidentCopy(trace.lang);
  const journey = buildTraceJourneyLayer(trace);
  const summary = getTraceTechnicalSummary(trace);
  const parts = [
    buildTraceCitizenLayer(trace, origin),
    "",
    "──",
    "",
    journeyLayerTitle(trace.lang),
    journey,
    "",
    rc.technicalData,
    `${rc.traceIdLabel}: ${summary.traceId}`,
    `${summary.pipelineLabel}: ${summary.pipelineValue}`,
    `${summary.telemetryLabel}: ${summary.telemetryValue}`,
    `${summary.eventLogLabel}: ${summary.eventLogValue}`,
  ];
  return parts.join("\n");
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
    buildTraceTechnicalDetails(trace),
    ...(hypothesis ? ["", hypothesis] : []),
  ].join("\n");
}
