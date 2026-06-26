/**
 * Domain taxonomy — subject keys map to stable node ids for the view layer.
 * Add sectors here; never in ObservationFieldRenderer.
 */

export type SectorDef = {
  subjectKey: string;
  nodeId: string;
};

export const SECTOR_REGISTRY: SectorDef[] = [
  { subjectKey: "core-security", nodeId: "node-core-0" },
  { subjectKey: "core-infrastructure", nodeId: "node-core-1" },
  { subjectKey: "core-ecology", nodeId: "node-core-2" },
  { subjectKey: "core-telemetry", nodeId: "node-core-3" },
];

export function subjectKeyToNodeId(subjectKey: string): string | null {
  const hit = SECTOR_REGISTRY.find((s) => s.subjectKey === subjectKey);
  return hit?.nodeId ?? null;
}

export function nodeIdToSubjectKey(nodeId: string): string | null {
  const hit = SECTOR_REGISTRY.find((s) => s.nodeId === nodeId);
  return hit?.subjectKey ?? null;
}
