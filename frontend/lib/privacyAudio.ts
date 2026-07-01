import type { Lang } from "./i18n";
import { privacyLangs } from "./privacyCopy";

/**
 * Flip to `true` when `public/audio/prywatnosc-{lang}.mp3` is deployed.
 * No runtime HEAD — predictable UI, zero extra requests.
 */
export const privacyAudioEnabled: Record<"pl" | "en" | "it", boolean> = {
  pl: true,
  en: false,
  it: false,
};

/** ~2 min · script: public/audio/prywatnosc-pl-script.txt — commitment, not policy read-aloud. */
export function privacyAudioSrc(lang: Lang): string {
  const code = privacyLangs().includes(lang as "pl" | "en" | "it") ? lang : "pl";
  return `/audio/prywatnosc-${code}.mp3`;
}

export function isPrivacyAudioEnabled(lang: Lang): boolean {
  const code = privacyLangs().includes(lang as "pl" | "en" | "it") ? lang : "pl";
  return privacyAudioEnabled[code as keyof typeof privacyAudioEnabled];
}
