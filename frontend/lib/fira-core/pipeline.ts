import { CORE_PIPELINE, type CoreStage } from "./types";

export function engineIndexToCoreStage(engineIndex: number): number {
  if (engineIndex <= 1) return 0;
  if (engineIndex === 2) return 1;
  if (engineIndex <= 4) return 2;
  if (engineIndex === 5) return 3;
  if (engineIndex === 6) return 4;
  return 5;
}

export function coreStageLabel(stage: CoreStage): string {
  return stage;
}

export { CORE_PIPELINE };
