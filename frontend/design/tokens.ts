/**
 * Implementation map — meanings → CSS vars (replaceable).
 * @see docs/design-language.md
 */

import type { SemanticToken } from "./semantic-tokens";

export const TOKEN_CSS: Record<SemanticToken, string> = {
  Base: "--color-field",
  Surface: "--color-field",
  Text: "--color-ink",
  Muted: "--color-graphite",
  Interaction: "--color-citrus",
  Decision: "--color-accent",
  Structure: "--color-fira-structure",
  Water: "--color-sapphire",
  Nature: "--color-citrus",
  Transport: "--color-sapphire",
  Warning: "--color-accent",
  Verified: "--color-citrus",
  DayFact: "--color-warsaw-heat",
};
