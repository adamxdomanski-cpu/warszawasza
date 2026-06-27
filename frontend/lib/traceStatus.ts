/**
 * Layer 8 mirror — separate pipeline integrity from Layer 0 terrain fact.
 * traceDecision=true means conscious citizen submit, NOT field-verified incident.
 */

import { traceToObservation } from "./fopBridge";
import { traceArtifactCopy, type Lang } from "./i18n";
import type { ObservationTracePayload } from "./observationTrace";

export type TraceStatusLines = {
  /** WARSTWA 1 status block (1–2 lines) */
  lines: string[];
};

/** Pipeline reached WAL (engine index 7) with coherent FOP package. */
export function isPipelineVerified(trace: ObservationTracePayload): boolean {
  return trace.engineIndex >= 7;
}

/** Layer 0 fact closed — only when trajectory explicitly resolved (future) or external closure. */
export function isTerrainVerified(trace: ObservationTracePayload): boolean {
  const result = traceToObservation(trace).result;
  return result.kind === "trajectory" && result.value === "resolved";
}

/** Crisis / trauma traces need emergency services — never imply help arrived from IOE alone. */
export function isCriticalHumanTrace(trace: ObservationTracePayload): boolean {
  const related = trace.citizen?.relatedRefs?.toLowerCase() ?? "";
  const subject = trace.citizen?.subject ?? "";
  return (
    subject === "core-security" &&
    (/pomoc|112|999|karet|uraz|ręk|ręce|rower/i.test(related) ||
      /złamana|broken|help/i.test(trace.citizen?.obsidianRef ?? ""))
  );
}

export function buildTraceStatusLines(trace: ObservationTracePayload): TraceStatusLines {
  const copy = traceArtifactCopy(trace.lang);
  const pipelineOk = isPipelineVerified(trace);
  const terrainOk = isTerrainVerified(trace);
  const decision = trace.citizen?.traceDecision;

  if (decision === "false") {
    return { lines: [copy.statusUnverified] };
  }

  if (pipelineOk && !terrainOk) {
    return {
      lines: [copy.statusPipelineVerified, copy.statusTerrainUnverified],
    };
  }

  if (pipelineOk && terrainOk) {
    return {
      lines: [copy.statusPipelineVerified, copy.statusTerrainVerified],
    };
  }

  if (decision === "true") {
    return {
      lines: [copy.statusPipelineVerified, copy.statusTerrainUnverified],
    };
  }

  return { lines: [copy.statusUnverified] };
}

export function crisisEmergencyHint(lang: Lang): string | null {
  const copy = traceArtifactCopy(lang);
  return copy.emergencyHint ?? null;
}
