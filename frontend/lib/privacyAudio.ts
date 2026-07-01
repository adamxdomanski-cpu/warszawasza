import type { Lang } from "./i18n";
import { privacyLangs } from "./privacyCopy";

export type PrivacyAudioLang = "pl" | "en" | "it";

/**
 * Flip to `true` when `public/audio/prywatnosc-{lang}.mp3` is deployed.
 * Each UI language uses its own track — no cross-language fallback.
 */
export const privacyAudioEnabled: Record<PrivacyAudioLang, boolean> = {
  pl: true,
  en: false,
  it: false,
};

export type ResolvedPrivacyAudio = {
  src: string;
  trackLang: PrivacyAudioLang;
};

export function toPrivacyLang(lang: Lang): PrivacyAudioLang | null {
  return privacyLangs().includes(lang as PrivacyAudioLang) ? (lang as PrivacyAudioLang) : null;
}

/** Audio for the active privacy UI language only. */
export function resolvePrivacyAudio(lang: Lang): ResolvedPrivacyAudio | null {
  const uiLang = toPrivacyLang(lang);
  if (!uiLang || !privacyAudioEnabled[uiLang]) return null;
  return { src: `/audio/prywatnosc-${uiLang}.mp3`, trackLang: uiLang };
}

export function privacyAudioSrc(lang: Lang): string | null {
  return resolvePrivacyAudio(lang)?.src ?? null;
}

export function isPrivacyAudioEnabled(lang: Lang): boolean {
  return resolvePrivacyAudio(lang) !== null;
}
