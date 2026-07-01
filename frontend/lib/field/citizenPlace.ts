import type { Lang } from "../i18n";
import { pickLangCopy } from "../localeMap";

const UNKNOWN_PLACE: Partial<Record<Lang, string>> = {
  pl: "Miejsce nieznane (bez GPS)",
  en: "Unknown place (no GPS)",
  it: "Luogo sconosciuto (senza GPS)",
  uk: "Невідоме місце (без GPS)",
  bg: "Unknown place (no GPS)",
  et: "Unknown place (no GPS)",
  fi: "Unknown place (no GPS)",
  lt: "Unknown place (no GPS)",
  lv: "Unknown place (no GPS)",
  hu: "Ismeretlen hely (GPS nélkül)",
};

const KNOWN_UNKNOWN = new Set(
  Object.values(UNKNOWN_PLACE).filter((v): v is string => Boolean(v)),
);

export function unknownPlaceLabel(lang: Lang): string {
  return pickLangCopy(UNKNOWN_PLACE, lang, UNKNOWN_PLACE.en!);
}

export function isUnknownCitizenPlace(place: string | undefined): boolean {
  const trimmed = place?.trim();
  return trimmed ? KNOWN_UNKNOWN.has(trimmed) : false;
}

/** L1 display — re-localize known placeholders; keep geo-derived text as stored. */
export function localizeCitizenPlace(
  place: string | undefined,
  displayLang: Lang,
): string {
  const trimmed = place?.trim();
  if (!trimmed) return "";
  if (isUnknownCitizenPlace(trimmed)) return unknownPlaceLabel(displayLang);
  return trimmed;
}
