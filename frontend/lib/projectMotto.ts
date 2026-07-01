import type { Lang } from "./i18n";

const MOTTO: Record<"pl" | "en" | "it", string> = {
  pl: "Technologia ma pomagać widzieć świat wyraźniej, a nie zbierać o Tobie więcej danych.",
  en: "Technology should help you see the world more clearly — not collect more data about you.",
  it: "La tecnologia dovrebbe aiutarti a vedere il mondo più chiaramente — non raccogliere più dati su di te.",
};

export function projectMotto(lang: Lang): string {
  if (lang === "en") return MOTTO.en;
  if (lang === "it") return MOTTO.it;
  return MOTTO.pl;
}
