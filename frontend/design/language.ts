/**
 * WARSZAWASZA interface language — meanings first.
 * @see docs/interface-language.md
 */

/** Stable — rhythm, chrome, tone (BASE = Ground + Structure + typography rhythm) */
export type IdentityMeaning =
  | "Ground"
  | "Surface"
  | "Text"
  | "Muted"
  | "Decision"
  | "Interaction"
  | "Structure";

/** Core field meanings referenced in .cursorrules */
export type CoreFieldMeaning = "BASE" | "INTERACTION" | "DECISION" | "WATER";

/** Facts — at most MAX_ACTIVE_SIGNALS on one screen */
export type SignalMeaning =
  | "Water"
  | "Nature"
  | "Warning"
  | "Verified"
  | "DayFact";

export type InterfaceMeaning = IdentityMeaning | SignalMeaning;

/** Current colour implementation (replaceable) */
export const MEANING_TO_CSS_VAR: Record<InterfaceMeaning, string> = {
  Ground: "--color-field",
  Surface: "--color-field",
  Text: "--color-ink",
  Muted: "--color-graphite",
  Decision: "--color-accent",
  Interaction: "--color-citrus",
  Structure: "--color-fira-structure",
  Water: "--color-sapphire",
  Nature: "--color-citrus",
  Warning: "--color-accent",
  Verified: "--color-citrus",
  DayFact: "--color-accent",
};

export const MAX_ACTIVE_SIGNALS = 2;
