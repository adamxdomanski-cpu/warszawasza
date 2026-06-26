import {
  lookupCivicOrgByKrs,
  lookupCivicOrgByTag,
  type CivicOrgRecord,
} from "./civicOrgRegistry";
import type { PipelineKey } from "./i18n";
import { STATE } from "./symbols";

export type CivicOrgRef = {
  krs: string;
  operationalClass: string;
  trustLevel: 0 | 1 | 2 | 3 | 4 | 5;
};

/** Optional observation metadata — mirrors civic_observations + Channel H intersection */
export type PipelineObservationInput = {
  civicOrgRef?: CivicOrgRef;
  sourceNodeId?: string;
  tags?: string[];
};

export type CivicOrgIntersection = {
  matched: CivicOrgRecord;
  trigger: "civicOrgRef" | "tag" | "sourceNodeId";
  trustWeight: 0 | 1 | 2 | 3 | 4 | 5;
  stagesApplied: ("filtration" | "validation")[];
};

/** Validation stage in PIPELINE_ORDER */
export const VALIDATION_STAGE_INDEX = 5;

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
      return STATE.rest;
    case "analyzing":
      return STATE.progress;
    case "active":
    case "done":
      return STATE.active;
    case "rejected":
      return STATE.rejected;
    case "hypothesis":
      return STATE.hypothesis;
    default:
      return STATE.rest;
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

/** Index in PROCESS_CHAIN (0–6) or 7 = OUTPUT */
export function resolveProcessChainIndex(engineIndex: number): number {
  if (engineIndex >= TERMINAL_STAGE_INDEX) return 7;
  return Math.min(engineIndex, 6);
}

export function resolveChainStepPhase(
  stepIndex: number,
  chainActive: number,
  analyzing: boolean,
): StagePhase {
  if (stepIndex < chainActive) return "done";
  if (stepIndex > chainActive) return "waiting";
  return analyzing ? "analyzing" : "active";
}

/**
 * Cross-check observation input against civic org registry (008 seed).
 * Fires when civicOrgRef, ngo-watchdog tag, or sourceNodeId matches registry KRS.
 */
export function intersectCivicOrg(
  input: PipelineObservationInput,
): CivicOrgIntersection | null {
  if (input.civicOrgRef) {
    const matched = lookupCivicOrgByKrs(input.civicOrgRef.krs);
    if (
      matched &&
      matched.operationalClass === input.civicOrgRef.operationalClass
    ) {
      return buildIntersection(matched, "civicOrgRef");
    }
    return null;
  }

  for (const tag of input.tags ?? []) {
    const matched = lookupCivicOrgByTag(tag);
    if (matched) return buildIntersection(matched, "tag");
  }

  if (input.sourceNodeId) {
    const matched = lookupCivicOrgByKrs(input.sourceNodeId);
    if (matched) return buildIntersection(matched, "sourceNodeId");
  }

  return null;
}

function buildIntersection(
  matched: CivicOrgRecord,
  trigger: CivicOrgIntersection["trigger"],
): CivicOrgIntersection {
  return {
    matched,
    trigger,
    trustWeight: matched.trustLevel,
    stagesApplied: [],
  };
}

/** Apply registry trust weight at Filtracja / Walidacja when intersection is active */
export function applyCivicOrgTrustAtStage(
  stageIndex: number,
  intersection: CivicOrgIntersection | null,
): CivicOrgIntersection | null {
  if (!intersection) return null;
  if (
    stageIndex !== FILTRATION_STAGE_INDEX &&
    stageIndex !== VALIDATION_STAGE_INDEX
  ) {
    return intersection;
  }

  const stage =
    stageIndex === FILTRATION_STAGE_INDEX ? "filtration" : "validation";
  if (intersection.stagesApplied.includes(stage)) return intersection;

  return {
    ...intersection,
    stagesApplied: [...intersection.stagesApplied, stage],
  };
}

/** Console / trace line — technical metadata only (no PII) */
export function formatCivicOrgIntersectionTrace(
  intersection: CivicOrgIntersection,
): string {
  const { matched, trigger, trustWeight, stagesApplied } = intersection;
  const stageNote =
    stagesApplied.length > 0 ? stagesApplied.join("+") : "pending";
  return [
    "CIVIC_ORG ∩ stream",
    `KRS ${matched.krs} → ${matched.operationalClass} · trust ${trustWeight}`,
    `trigger:${trigger} · stages:${stageNote}`,
  ].join(" · ");
}

/** Default observation input for ?ngo-watchdog=1 test hook */
export function ngoWatchdogObservationInput(): PipelineObservationInput {
  return {
    tags: ["ngo-watchdog"],
    civicOrgRef: {
      krs: "0000217821",
      operationalClass: "WATCHDOG",
      trustLevel: 5,
    },
  };
}

/** Default observation input for ?wosp=1 · ?civic-tech=1 test hooks */
export function wospObservationInput(): PipelineObservationInput {
  return {
    tags: ["wosp"],
    civicOrgRef: {
      krs: "0000030897",
      operationalClass: "CIVIC_TECH",
      trustLevel: 5,
    },
  };
}

/** Discrete weight scale for layer control (COP v1.0) */
export const LAYER_WEIGHT_MIN = 0;
export const LAYER_WEIGHT_MAX = 5;

export interface DataLayer {
  id: string;
  name: string;
  isActive: boolean;
  weight: number;
}

export interface LayerControlState {
  layers: DataLayer[];
}

/** Signal row must declare which layer it belongs to for weighted filtering */
export type LayerWeightedSignal = {
  layerId: string;
};

export const initialLayerState: LayerControlState = {
  layers: [
    {
      id: "LAYER_OBSERVATIONS",
      name: "Obserwacje mieszkańców",
      isActive: true,
      weight: 3,
    },
    {
      id: "LAYER_MAP_GEOMETRY",
      name: "Mapa i sektory",
      isActive: true,
      weight: 1,
    },
  ],
};

export function clampLayerWeight(weight: number): number {
  return Math.min(
    LAYER_WEIGHT_MAX,
    Math.max(LAYER_WEIGHT_MIN, Math.round(weight)),
  );
}

export function setLayerActive(
  state: LayerControlState,
  layerId: string,
  isActive: boolean,
): LayerControlState {
  return {
    layers: state.layers.map((layer) =>
      layer.id === layerId ? { ...layer, isActive } : layer,
    ),
  };
}

export function setLayerWeight(
  state: LayerControlState,
  layerId: string,
  weight: number,
): LayerControlState {
  const clamped = clampLayerWeight(weight);
  return {
    layers: state.layers.map((layer) =>
      layer.id === layerId ? { ...layer, weight: clamped } : layer,
    ),
  };
}

/** Filter signals by active layers with weight > 0 */
export function calculateWeightedResult<T extends LayerWeightedSignal>(
  state: LayerControlState,
  signals: T[],
): T[] {
  return signals.filter((signal) => {
    const layer = state.layers.find((entry) => entry.id === signal.layerId);
    return layer !== undefined && layer.isActive && layer.weight > 0;
  });
}

/** Sum of active layer weights — observable input for correlation threshold */
export function activeLayerWeightSum(state: LayerControlState): number {
  return state.layers
    .filter((layer) => layer.isActive && layer.weight > 0)
    .reduce((sum, layer) => sum + layer.weight, 0);
}
