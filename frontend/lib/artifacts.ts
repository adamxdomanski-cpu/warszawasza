export const ARTIFACT_SLUGS = [
  "diamente",
  "shafir",
  "lustra",
  "griffin",
  "fira",
] as const;

export type ArtifactSlug = (typeof ARTIFACT_SLUGS)[number];

export function isArtifactSlug(value: string): value is ArtifactSlug {
  return (ARTIFACT_SLUGS as readonly string[]).includes(value);
}

export const ARTIFACT_SYMBOLS: Record<ArtifactSlug, string> = {
  diamente: "◇",
  shafir: "∥",
  lustra: "⌁",
  griffin: "↗",
  fira: "●",
};
