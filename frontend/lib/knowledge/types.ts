/** Logical graph — existence and relations only. No coordinates. */

export type KnowledgeNodeTier = "core" | "satellite";

export type KnowledgeNode = {
  id: string;
  tier: KnowledgeNodeTier;
  importance: number;
};

export type KnowledgeEdge = {
  from: string;
  to: string;
};

export type KnowledgeSnapshot = {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
};

/** View model for ObservationFieldRenderer — geometry only. */

export type RenderNodeTier = "micro" | "core" | "satellite";

export type RenderNode = {
  id: string;
  x: number;
  y: number;
  radius: number;
  tier: RenderNodeTier;
  importance: number;
};

export type RenderEdge = {
  from: string;
  to: string;
};

export type RenderGraph = {
  nodes: RenderNode[];
  edges: RenderEdge[];
  ringPath: string;
};

export type FieldHighlightState = {
  nodeId: string | null;
  intensity: number;
  expiresAt: number;
};

export type LayoutViewport = {
  width: number;
  height: number;
};
