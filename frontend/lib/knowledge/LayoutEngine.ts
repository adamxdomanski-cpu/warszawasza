import type {
  KnowledgeSnapshot,
  LayoutViewport,
  RenderEdge,
  RenderGraph,
  RenderNode,
} from "./types";

/**
 * LayoutEngine — maps logical graph to coordinates.
 * Swap for force-layout, H3, map projection, or 3D without touching KnowledgeGraph.
 */

export function layoutCircularField(
  snapshot: KnowledgeSnapshot,
  viewport: LayoutViewport,
): RenderGraph {
  const { width, height } = viewport;
  const cx = width / 2;
  const cy = height / 2;
  const baseRadius = Math.min(cx, cy) * 0.65;

  const cores = snapshot.nodes.filter((n) => n.tier === "core");
  const satellites = snapshot.nodes.filter((n) => n.tier === "satellite");

  const positioned = new Map<string, RenderNode>();

  cores.forEach((node, i) => {
    const angle = (i / Math.max(cores.length, 1)) * Math.PI * 2;
    positioned.set(node.id, {
      id: node.id,
      x: cx + Math.cos(angle) * (baseRadius * 0.22),
      y: cy + Math.sin(angle) * (baseRadius * 0.22),
      radius: 4,
      tier: "core",
      importance: node.importance,
    });
  });

  satellites.forEach((node, i) => {
    const angle = (i / Math.max(satellites.length, 1)) * Math.PI * 2 + 0.5;
    const dist = baseRadius * (0.45 + (i % 3) * 0.12);
    positioned.set(node.id, {
      id: node.id,
      x: cx + Math.cos(angle) * dist,
      y: cy + Math.sin(angle) * dist,
      radius: 1.8,
      tier: "satellite",
      importance: node.importance,
    });
  });

  let ringPath = "";
  const ringPoints = 90;
  const microNodes: RenderNode[] = [];
  for (let i = 0; i < ringPoints; i++) {
    const angle = (i / ringPoints) * Math.PI * 2;
    const noise = Math.sin(i * 4) * 8 + Math.cos(i * 8) * 3;
    const rx = cx + Math.cos(angle) * (baseRadius + noise);
    const ry = cy + Math.sin(angle) * (baseRadius + noise);
    ringPath += i === 0 ? `M ${rx} ${ry}` : ` L ${rx} ${ry}`;
    if (i % 3 === 0) {
      microNodes.push({
        id: `micro-${i}`,
        x: rx,
        y: ry,
        radius: 0.8,
        tier: "micro",
        importance: 0.15,
      });
    }
  }
  ringPath += " Z";

  const edges: RenderEdge[] = snapshot.edges.map((e) => ({ from: e.from, to: e.to }));

  return {
    nodes: [...positioned.values(), ...microNodes],
    edges,
    ringPath,
  };
}

export const fieldLayoutEngine = {
  layout: layoutCircularField,
};
