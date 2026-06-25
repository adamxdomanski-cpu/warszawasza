/** Canonical FIRA / WARSZAWASZA glyph lexicon — single source of truth. */

export const STATE = {
  rest: "○",
  active: "●",
  progress: "◐",
  rejected: "⊗",
  hypothesis: "≈",
  evidence: "■",
  noEvidence: "□",
} as const;

export type StateSymbol = (typeof STATE)[keyof typeof STATE];

export const STATE_LABEL_PL: Record<keyof typeof STATE, string> = {
  rest: "stan spoczynku",
  active: "aktywny punkt",
  progress: "proces w toku",
  rejected: "odrzucono",
  hypothesis: "hipoteza",
  evidence: "dowód",
  noEvidence: "brak dowodu",
};

export const DIRECTION = {
  down: "↓",
  up: "↑",
  right: "→",
  left: "←",
  upRight: "↗",
  downRight: "↘",
  upLeft: "↖",
  downLeft: "↙",
} as const;

export const GRAPH = {
  vertical: "│",
  horizontal: "─",
  cross: "┼",
  teeRight: "├",
  teeLeft: "┤",
  teeDown: "┬",
  teeUp: "┴",
} as const;

export const SEMANTIC = {
  compression: "◉",
  memory: "⟳",
  relation: "⌁",
  conflict: "≠",
  validation: "✓",
  ellipsis: "…",
} as const;

/** Narrative objects — distinct from pipeline state glyphs */
export const NARRATIVE = {
  lucy: "●",
  diamente: "◇",
  shafir: "∥",
  lustra: "⌁",
  griffin: "↗",
  fira: "●",
  dysonans: "≠",
  grafen: "🕸",
} as const;

export function evidenceBar(level: number, max = 5): string {
  const filled = Math.max(0, Math.min(max, level));
  return STATE.evidence.repeat(filled) + STATE.noEvidence.repeat(max - filled);
}

/** Compressed observation flow — symbols only, OUTPUT terminal */
export const PROCESS_CHAIN = [
  { key: "rest", symbol: STATE.rest },
  { key: "active", symbol: STATE.active },
  { key: "progress", symbol: STATE.progress },
  { key: "compression", symbol: SEMANTIC.compression },
  { key: "hypothesis", symbol: STATE.hypothesis },
  { key: "validation", symbol: SEMANTIC.validation },
  { key: "evidence", symbol: STATE.evidence },
] as const;

export type ProcessChainKey = (typeof PROCESS_CHAIN)[number]["key"];

export const PROCESS_OUTPUT_KEY = "output" as const;
