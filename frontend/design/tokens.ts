/**
 * Semantic design tokens — meaning first, colour second.
 * @see docs/design-system.md
 */

/** Stable brand layer — same every visit */
export type IdentityToken =
  | "Ground"
  | "Surface"
  | "Text"
  | "Muted"
  | "Focus"
  | "Flow"
  | "Structure";

/** Fact/status layer — at most two visually active per screen */
export type SignalToken =
  | "Water"
  | "Nature"
  | "Warning"
  | "StatusOk"
  | "SignalDay";

export type SemanticToken = IdentityToken | SignalToken;

/** Maps semantic token → CSS custom property in globals.css */
export const TOKEN_TO_CSS_VAR: Record<SemanticToken, string> = {
  Ground: "--color-field",
  Surface: "--color-field",
  Text: "--color-ink",
  Muted: "--color-graphite",
  Focus: "--color-accent",
  Flow: "--color-accent",
  Structure: "--color-fira-structure",
  Water: "--color-sapphire",
  Nature: "--color-citrus",
  Warning: "--color-accent",
  StatusOk: "--color-citrus",
  SignalDay: "--color-accent",
};

export const IDENTITY_TOKENS: IdentityToken[] = [
  "Ground",
  "Surface",
  "Text",
  "Muted",
  "Focus",
  "Flow",
  "Structure",
];

export const SIGNAL_TOKENS: SignalToken[] = [
  "Water",
  "Nature",
  "Warning",
  "StatusOk",
  "SignalDay",
];

/** Max concurrently emphasised signal tokens on one view */
export const MAX_ACTIVE_SIGNALS_PER_SCREEN = 2;
