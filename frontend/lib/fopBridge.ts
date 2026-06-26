/**
 * Bridge: distribution layer → FOP notation (Layer 3 → 2)
 */

import {
  encodeObservation,
  engineIndexToCoreStage,
  type FiraObservation,
  type ResultKind,
} from "./fira-core";
import { PROCESS_CHAIN } from "./symbols";
import type { ObservationTracePayload } from "./observationTrace";
import { SIGNAL_CHANNELS } from "./signalApi";
import { studioFopRelation, studioPlaceSignal } from "./studioAnchor";

function chainAtEngineIndex(engineIndex: number): string {
  const glyphs = PROCESS_CHAIN.map((s) => s.symbol);
  if (engineIndex >= 7) return glyphs.join("");
  return glyphs
    .map((g, i) => (i <= engineIndex ? g : "○"))
    .join("");
}

function resultFromTrace(trace: ObservationTracePayload): {
  kind: ResultKind;
  value?: string;
} {
  if (trace.engineIndex < 7) return { kind: "pending" };
  if (trace.trajectory === "true") return { kind: "trajectory", value: "open" };
  if (trace.trajectory === "false") {
    const pct = 61 + (Math.abs(trace.attentionCount) % 23);
    return { kind: "hypothesis", value: String(pct) };
  }
  return { kind: "pending" };
}

export function traceToObservation(
  trace: ObservationTracePayload,
): FiraObservation {
  const signal: Record<string, string> = {
    attention: String(trace.attentionCount),
    clock: trace.clock,
    lang: trace.lang,
    ...studioPlaceSignal(),
  };
  if (trace.trajectory) signal.trajectory = trace.trajectory;
  if (trace.citizen?.place) signal.place = trace.citizen.place;
  if (trace.citizen?.subject) signal.subject = trace.citizen.subject;
  if (trace.citizen?.observedAt) signal.observedAt = trace.citizen.observedAt;
  if (trace.citizen?.relatedRefs) signal.related = trace.citizen.relatedRefs;
  if (trace.citizen?.traceDecision && trace.citizen.traceDecision !== "none") {
    signal.traceDecision = trace.citizen.traceDecision;
  }

  const ref =
    trace.citizen?.obsidianRef?.trim() ||
    trace.logLines[0] ||
    undefined;

  return {
    version: "0.1",
    timestamp: new Date(trace.createdAt).toISOString(),
    chain: chainAtEngineIndex(trace.engineIndex),
    source: {
      channel: SIGNAL_CHANNELS.CITIZEN,
      ref,
    },
    signal,
    process: {
      stageIndex: engineIndexToCoreStage(trace.engineIndex),
    },
    evidence: {
      level: Math.min(5, Math.floor(trace.attentionCount / 2)) as 0 | 1 | 2 | 3 | 4 | 5,
    },
    relation: studioFopRelation(),
    result: resultFromTrace(trace),
  };
}

export function buildFopDocument(trace: ObservationTracePayload): string {
  return encodeObservation(traceToObservation(trace));
}
