import type { Lang } from "./i18n";

/** BCP 47 tags for Web Speech API and date formatting. */
export const BCP47: Record<Lang, string> = {
  pl: "pl-PL",
  en: "en-GB",
  it: "it-IT",
  uk: "uk-UA",
  bg: "bg-BG",
  et: "et-EE",
  fi: "fi-FI",
  lt: "lt-LT",
  lv: "lv-LV",
  hu: "hu-HU",
};

export function speechRecognitionLocale(lang: Lang): string {
  return BCP47[lang];
}

export function localeDateTime(lang: Lang, date = new Date()): string {
  return date.toLocaleTimeString(BCP47[lang], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Resolve copy map entry — never silently swap language identity. */
export function pickLangCopy<T>(map: Partial<Record<Lang, T>>, lang: Lang, fallback: T): T {
  return map[lang] ?? fallback;
}
