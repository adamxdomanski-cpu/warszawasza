import { NARRATIVE } from "./symbols";

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
  diamente: NARRATIVE.diamente,
  shafir: NARRATIVE.shafir,
  lustra: NARRATIVE.lustra,
  griffin: NARRATIVE.griffin,
  fira: NARRATIVE.fira,
};
