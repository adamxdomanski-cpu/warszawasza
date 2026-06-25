/** FIRA Core — geography-agnostic observation algebra (Layer 1) */

export const CORE_PIPELINE = [
  "source",
  "signal",
  "process",
  "evidence",
  "relation",
  "result",
] as const;

export type CoreStage = (typeof CORE_PIPELINE)[number];

export const FOP_VERSION = "0.1" as const;

export type EvidenceLevel = 0 | 1 | 2 | 3 | 4 | 5;

export type ResultKind = "trajectory" | "hypothesis" | "rejected" | "pending";

export type FiraObservation = {
  version: typeof FOP_VERSION;
  timestamp: string;
  chain: string;
  source: {
    channel: string;
    ref?: string;
  };
  signal: Record<string, string>;
  process: {
    stageIndex: number;
    analyzing?: boolean;
  };
  evidence: {
    level: EvidenceLevel;
  };
  relation?: {
    type: string;
    ref: string;
  };
  result: {
    kind: ResultKind;
    value?: string;
  };
};
