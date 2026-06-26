import { SECTOR_REGISTRY } from "./sectorRegistry";
import type { KnowledgeEdge, KnowledgeNode, KnowledgeSnapshot } from "./types";

/**
 * KnowledgeGraph — what exists and what connects to what.
 * No coordinates, no SVG, no layout strategy.
 */

const SATELLITE_COUNT = 15;

export class KnowledgeGraph {
  resolveSubjectToNodeId(subjectKey: string): string | null {
    if (!subjectKey) return null;
    const sector = SECTOR_REGISTRY.find((s) => s.subjectKey === subjectKey);
    return sector?.nodeId ?? `node-sat-${subjectKey.slice(0, 8)}`;
  }

  buildSnapshot(): KnowledgeSnapshot {
    const nodes: KnowledgeNode[] = [];
    const edges: KnowledgeEdge[] = [];

    SECTOR_REGISTRY.forEach((sector) => {
      nodes.push({
        id: sector.nodeId,
        tier: "core",
        importance: 0.85,
      });
    });

    for (let i = 0; i < SATELLITE_COUNT; i++) {
      nodes.push({
        id: `node-sat-${i}`,
        tier: "satellite",
        importance: 0.45,
      });
    }

    for (let i = 0; i < SECTOR_REGISTRY.length; i++) {
      const a = SECTOR_REGISTRY[i]?.nodeId;
      const b = SECTOR_REGISTRY[(i + 1) % SECTOR_REGISTRY.length]?.nodeId;
      if (a && b) edges.push({ from: a, to: b });
    }

    for (let i = 0; i < SATELLITE_COUNT; i++) {
      const satId = `node-sat-${i}`;
      const coreId = SECTOR_REGISTRY[i % SECTOR_REGISTRY.length]?.nodeId;
      if (coreId) edges.push({ from: satId, to: coreId });
    }

    return { nodes, edges };
  }
}

export const knowledgeGraph = new KnowledgeGraph();
