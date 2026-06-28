/**
 * Semantic tokens — meanings only. Add Nature, Transport here, not in .cursorrules.
 * @see docs/design-language.md
 */

export type IdentityToken =
  | "Base"
  | "Surface"
  | "Text"
  | "Muted"
  | "Interaction"
  | "Decision"
  | "Structure";

export type SignalToken =
  | "Water"
  | "Nature"
  | "Transport"
  | "Warning"
  | "Verified"
  | "DayFact";

export type SemanticToken = IdentityToken | SignalToken;

export const MAX_ACTIVE_SIGNALS = 2;
