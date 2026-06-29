import { LANGS, type Lang } from "../i18n";

/** Browser language → Lang (cold start / field). */
export function initialFieldLang(): Lang {
  if (typeof window === "undefined") return "pl";
  const nav = navigator.language.toLowerCase();
  const hit = LANGS.find((code) => nav === code || nav.startsWith(`${code}-`));
  return hit ?? "pl";
}
