/**
 * Citizen trace contract — aligns Obsidian template, FOP/0.1, and ?trace= token.
 * Source of truth: application domain (FOP + registry), not Obsidian vault geometry.
 */

export type CitizenTraceFields = {
  /** sig place= */
  place: string;
  /** observed local time or ISO fragment */
  observedAt: string;
  /** sig subject= — semantic key; KnowledgeGraph maps to render nodeId */
  subject: string;
  /** rel / vault links — free text or comma-separated refs */
  relatedRefs: string;
  /** trace-level decision note — separate from gate trajectory F/T */
  traceDecision: "true" | "false" | "none";
  /** src ref= — optional Obsidian or external note path */
  obsidianRef?: string;
};

export type TraceShareCompact = {
  l: string;
  t: string | null;
  e: number;
  a: number;
  c: string;
  ts: number;
  /** subject key */
  s?: string;
  /** obsidian / external ref */
  r?: string;
};

export const EMPTY_CITIZEN_TRACE: CitizenTraceFields = {
  place: "",
  observedAt: "",
  subject: "",
  relatedRefs: "",
  traceDecision: "none",
};
