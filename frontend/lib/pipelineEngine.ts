import type { PipelineKey } from "./i18n";

export type StagePhase =
  | "waiting"
  | "analyzing"
  | "active"
  | "done"
  | "rejected"
  | "hypothesis";

export type TrajectoryChoice = "true" | "false";

/** Stages that keep semantic labels once reached (sensors, not steps). */
export const PERSISTENT_STAGE_MAX = 2;

export const TERMINAL_STAGE_INDEX = 7;

export function statusSymbol(phase: StagePhase): string {
  switch (phase) {
    case "waiting":
      return "○";
    case "analyzing":
      return "◐";
    case "active":
    case "done":
      return "●";
    case "rejected":
      return "⊗";
    case "hypothesis":
      return "≈";
    default:
      return "○";
  }
}

export function resolveStagePhase(
  stageIndex: number,
  frontierIndex: number,
  analyzing: boolean,
  isTerminal: boolean,
  trajectory: TrajectoryChoice | null,
): StagePhase {
  if (isTerminal) {
    if (frontierIndex >= TERMINAL_STAGE_INDEX && trajectory === "false") {
      return "hypothesis";
    }
    if (frontierIndex >= TERMINAL_STAGE_INDEX && trajectory === "true") {
      return "done";
    }
    if (stageIndex === frontierIndex && frontierIndex === TERMINAL_STAGE_INDEX) {
      return analyzing ? "analyzing" : "waiting";
    }
    if (stageIndex < TERMINAL_STAGE_INDEX) {
      return stageIndex <= PERSISTENT_STAGE_MAX ? "active" : "done";
    }
    return "waiting";
  }

  if (stageIndex > frontierIndex) return "waiting";
  if (stageIndex === frontierIndex) return analyzing ? "analyzing" : "active";
  if (stageIndex <= PERSISTENT_STAGE_MAX) return "active";
  return "done";
}

export const VALIDATION_FRAMES = ["011001", "001", "10101", "·····"] as const;

export const MEMORY_FRAMES = [
  "•",
  "•\n \\",
  "•──•",
  "•──•\n │  │\n •──•",
] as const;

/** Filtration stage in PIPELINE_ORDER */
export const FILTRATION_STAGE_INDEX = 3;

/** Observation stage — default frontier on field entry */
export const INITIAL_ENGINE_INDEX = 2;

export function hypothesisPercent(seed: number): number {
  return 61 + (Math.abs(seed) % 23);
}

export function computeEngineIndex(
  attentionCount: number,
  elapsedSec: number,
): number {
  const fromAttention = INITIAL_ENGINE_INDEX + Math.floor(attentionCount / 2);
  const fromTime = INITIAL_ENGINE_INDEX + Math.floor(elapsedSec / 14);
  return Math.min(
    TERMINAL_STAGE_INDEX,
    Math.max(INITIAL_ENGINE_INDEX, fromAttention, fromTime),
  );
}

export type StageDisplayKey = Exclude<PipelineKey, "narration">;

/** @deprecated use VALIDATION_FRAMES */
export const DECODE_FRAMES = VALIDATION_FRAMES;

/** @deprecated use MEMORY_FRAMES */
export const RECON_FRAMES = MEMORY_FRAMES;

/** @deprecated use FILTRATION_STAGE_INDEX */
export const KEYHOLE_STAGE_INDEX = FILTRATION_STAGE_INDEX;
