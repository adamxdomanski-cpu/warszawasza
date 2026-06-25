import type { PipelineKey } from "./i18n";
import { PIPELINE_ORDER } from "./i18n";
import { PROCESS_CHAIN, STATE, SEMANTIC } from "./symbols";

/** Canonical PM bucket keys — documentation layer only */
export type PmBucketKey =
  | "initiation"
  | "planning"
  | "design"
  | "execution"
  | "closing";

export type PmFiraRow = {
  bucket: PmBucketKey;
  pipelineKeys: PipelineKey[];
  glyphs: string[];
  coreStages: readonly string[];
};

/**
 * Validated against PIPELINE_ORDER and user mapping spec.
 * Covers 5-phase, 6-phase, and HERMES via bucket labels in i18n.
 */
export const PM_FIRA_ROWS: PmFiraRow[] = [
  {
    bucket: "initiation",
    pipelineKeys: ["reality"],
    glyphs: [STATE.rest],
    coreStages: ["source"],
  },
  {
    bucket: "planning",
    pipelineKeys: ["signals", "observation"],
    glyphs: [STATE.active, STATE.progress],
    coreStages: ["source", "signal"],
  },
  {
    bucket: "design",
    pipelineKeys: ["filtration", "memory"],
    glyphs: [SEMANTIC.compression, STATE.hypothesis],
    coreStages: ["process"],
  },
  {
    bucket: "execution",
    pipelineKeys: ["validation"],
    glyphs: [SEMANTIC.validation],
    coreStages: ["evidence"],
  },
  {
    bucket: "closing",
    pipelineKeys: ["knowledge", "narration"],
    glyphs: [STATE.evidence, "OUTPUT"],
    coreStages: ["relation", "result"],
  },
];

export const PROCESS_CHAIN_DISPLAY = [
  ...PROCESS_CHAIN.map((s) => s.symbol),
  "OUTPUT",
] as const;

export function pipelineIndex(key: PipelineKey): number {
  return PIPELINE_ORDER.indexOf(key);
}

export { PIPELINE_ORDER };
