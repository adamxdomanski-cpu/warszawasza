import { CORE_PIPELINE, type CoreStage } from "./types";

/** Maps UI/engine chain index (0–7) to core process stage index (0–5) */
export function engineIndexToCoreStage(engineIndex: number): number {
  if (engineIndex <= 1) return 0; // source
  if (engineIndex === 2) return 1; // signal
  if (engineIndex <= 4) return 2; // process (filtration + memory)
  if (engineIndex === 5) return 3; // evidence via validation gate
  if (engineIndex === 6) return 4; // relation / knowledge
  return 5; // result / output
}

export function coreStageLabel(stage: CoreStage): string {
  return stage;
}

export { CORE_PIPELINE };
