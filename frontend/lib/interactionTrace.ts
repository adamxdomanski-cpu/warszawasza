/**
 * Interaction trace — EVENT facts → TRACE record → PATTERN → HYPOTHESIS → Human.
 * @see docs/protocol/decision-trajectory-v1.md
 */

import {
  INTERACTION_EVENT_KINDS,
  type InteractionEvent,
  type InteractionEventKind,
  type InteractionTrace,
} from "./fira-core/interaction";

export type { InteractionEvent, InteractionEventKind, InteractionTrace };
export { INTERACTION_EVENT_KINDS };

export type TracePattern = {
  id: string;
  observation: string;
};

export type TraceHypothesis = {
  observation: string;
  hypothesis: string;
  patternId?: string;
};

const SESSION_KEY = "wzs-interaction-trace-v2";
const LEGACY_KEY = "wzs-decision-trajectory-v1";

function isKind(value: string): value is InteractionEventKind {
  return (INTERACTION_EVENT_KINDS as readonly string[]).includes(value);
}

function normalizeLegacyEvent(raw: unknown): InteractionEvent | null {
  if (typeof raw !== "object" || raw === null) return null;
  const o = raw as Record<string, unknown>;
  if (typeof o.at !== "number") return null;

  if (typeof o.event === "string" && isKind(o.event)) {
    return {
      event: o.event,
      ...(typeof o.value === "string" ? { value: o.value } : {}),
      at: o.at,
    };
  }

  const legacyType = o.type;
  if (legacyType === "ANSWER_TRUE") {
    return { event: "SELECT", value: "TRUE", at: o.at as number };
  }
  if (legacyType === "ANSWER_FALSE") {
    return { event: "SELECT", value: "FALSE", at: o.at as number };
  }
  if (typeof legacyType === "string") {
    const map: Record<string, InteractionEventKind> = {
      NEXT: "NEXT",
      BACK: "BACK",
      PAUSE: "PAUSE",
      EXIT: "EXIT",
      FINISH: "COMPLETE",
    };
    const kind = map[legacyType];
    if (kind) return { event: kind, at: o.at as number };
  }
  return null;
}

function readRawEvents(): InteractionEvent[] {
  if (typeof window === "undefined") return [];
  try {
    for (const key of [SESSION_KEY, LEGACY_KEY]) {
      const raw = sessionStorage.getItem(key);
      if (!raw) continue;
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) continue;
      const events = parsed
        .map(normalizeLegacyEvent)
        .filter((e): e is InteractionEvent => e !== null);
      if (key === LEGACY_KEY && events.length > 0) {
        writeRawEvents(events);
        sessionStorage.removeItem(LEGACY_KEY);
      }
      return events;
    }
  } catch {
    /* session unavailable */
  }
  return [];
}

function writeRawEvents(events: InteractionEvent[]): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(events));
  } catch {
    /* session unavailable */
  }
}

export function getInteractionTrace(): InteractionTrace {
  return { events: readRawEvents() };
}

/** @deprecated use getInteractionTrace */
export function getDecisionEvents(): InteractionEvent[] {
  return readRawEvents();
}

/** Append one EVENT fact; opens trace with START when needed. */
export function appendInteractionEvent(
  event: InteractionEventKind,
  value?: string,
): InteractionTrace {
  const at = Date.now();
  const row: InteractionEvent = {
    event,
    at,
    ...(value !== undefined && value !== "" ? { value } : {}),
  };

  let next = readRawEvents();

  if (event === "START") {
    next = [row];
  } else {
    if (next.length === 0 || next[0]?.event !== "START") {
      next = [{ event: "START", at }, ...next];
    }
    next = [...next, row];
  }

  writeRawEvents(next);
  return { events: next };
}

/** @deprecated use appendInteractionEvent */
export function appendDecisionEvent(
  event: InteractionEventKind,
  value?: string,
): InteractionEvent[] {
  return appendInteractionEvent(event, value).events;
}

export function clearInteractionTrace(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(LEGACY_KEY);
  } catch {
    /* session unavailable */
  }
}

export function formatEventLabel(e: InteractionEvent): string {
  if (
    (e.event === "SELECT" || e.event === "CHANGE" || e.event === "RECORD") &&
    e.value !== undefined
  ) {
    return `${e.event}(${e.value})`;
  }
  return e.event;
}

/** TRACE as arrow path for SYSTEM / human log. */
export function formatTracePath(events: InteractionEvent[]): string {
  if (events.length === 0) return "";
  return events.map(formatEventLabel).join("\n→ ");
}

/** Compact TRACE for FOP signal.trace_path */
export function compactTracePath(events: InteractionEvent[]): string {
  return events
    .map((e) => {
      if (e.event === "SELECT" || e.event === "CHANGE" || e.event === "RECORD") {
        const v = e.value?.replace(/\|/g, "_") ?? "";
        return `${e.event[0]}:${v}`;
      }
      return e.event[0];
    })
    .join("|");
}

/** @deprecated */
export const formatDecisionPath = formatTracePath;
/** @deprecated */
export const compactDecisionPath = compactTracePath;

function selectValues(events: InteractionEvent[]): string[] {
  return events
    .filter((e) => e.event === "SELECT" && e.value)
    .map((e) => e.value as string);
}

function countSelectChanges(events: InteractionEvent[]): number {
  let changes = 0;
  let last: string | null = null;
  for (const v of selectValues(events)) {
    if (last !== null && last !== v) changes += 1;
    last = v;
  }
  return changes;
}

function consecutiveSelectValue(events: InteractionEvent[], target: string): number {
  let max = 0;
  let run = 0;
  for (const e of events) {
    if (e.event === "SELECT" && e.value === target) {
      run += 1;
      max = Math.max(max, run);
    } else if (e.event === "SELECT") {
      run = 0;
    }
  }
  return max;
}

/** PATTERN — detected structure in TRACE (still observation-level, not psychology). */
export function detectTracePatterns(events: InteractionEvent[]): TracePattern[] {
  const patterns: TracePattern[] = [];
  const selects = events.filter((e) => e.event === "SELECT");
  const backs = events.filter((e) => e.event === "BACK").length;
  const changes = countSelectChanges(events);
  const pauses = events.filter((e) => e.event === "PAUSE").length;

  if (selects.length >= 2 && (changes >= 1 || backs >= 1)) {
    patterns.push({
      id: "select_revision",
      observation: `SELECT count=${selects.length}, value changes=${changes}, BACK=${backs}.`,
    });
  }

  const falseRun = consecutiveSelectValue(events, "FALSE");
  const trueRun = consecutiveSelectValue(events, "TRUE");

  if (falseRun >= 2) {
    patterns.push({
      id: "select_false_run",
      observation: `SELECT(FALSE) repeated ${falseRun} times.`,
    });
  }

  if (trueRun >= 2) {
    patterns.push({
      id: "select_true_run",
      observation: `SELECT(TRUE) repeated ${trueRun} times.`,
    });
  }

  if (pauses >= 1 && selects.length >= 1) {
    patterns.push({
      id: "pause_before_select",
      observation: `PAUSE=${pauses} before or between SELECT events.`,
    });
  }

  return patterns;
}

/** HYPOTHESIS — provisional; Human validates. */
export function suggestHypothesesFromPatterns(
  patterns: TracePattern[],
): TraceHypothesis[] {
  const out: TraceHypothesis[] = [];
  for (const p of patterns) {
    switch (p.id) {
      case "select_revision":
        out.push({
          patternId: p.id,
          observation: p.observation,
          hypothesis: "The prompt or choices may be ambiguous.",
        });
        break;
      case "select_false_run":
        out.push({
          patternId: p.id,
          observation: p.observation,
          hypothesis: "The presented explanation may not be convincing.",
        });
        break;
      case "select_true_run":
        out.push({
          patternId: p.id,
          observation: p.observation,
          hypothesis:
            "The framing may align with user direction — verify in FIELD.",
        });
        break;
      case "pause_before_select":
        out.push({
          patternId: p.id,
          observation: p.observation,
          hypothesis: "Labels or affordances may need clarity.",
        });
        break;
      default:
        break;
    }
  }
  return out;
}

export function suggestTraceHypotheses(events: InteractionEvent[]): TraceHypothesis[] {
  return suggestHypothesesFromPatterns(detectTracePatterns(events));
}

/** @deprecated */
export const suggestTrajectoryHypotheses = suggestTraceHypotheses;

export function traceEventsForLog(events: InteractionEvent[]): string[] {
  if (events.length === 0) return [];
  return [
    "trace:",
    ...events.map(
      (e) => `  ${formatEventLabel(e)} @ ${new Date(e.at).toISOString()}`,
    ),
  ];
}

/** @deprecated */
export const decisionEventsForLog = traceEventsForLog;
