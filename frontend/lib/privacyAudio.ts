import type { Lang } from "./i18n";
import { privacyLangs } from "./privacyCopy";

/** ~2 min conversation — not a read-aloud of the page. Drop at `public/audio/`. */
export function privacyAudioSrc(lang: Lang): string {
  const code = privacyLangs().includes(lang as "pl" | "en" | "it") ? lang : "pl";
  return `/audio/prywatnosc-${code}.mp3`;
}

/** Future: `prywatnosc-{lang}-30s.mp3` for a short PO CO tier. */
export async function privacyAudioExists(src: string): Promise<boolean> {
  try {
    const res = await fetch(src, { method: "HEAD", cache: "no-store" });
    return res.ok;
  } catch {
    return false;
  }
}
