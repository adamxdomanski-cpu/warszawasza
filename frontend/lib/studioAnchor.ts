/**
 * Geographic broadcast anchor — pracownia WARSZAWA, Dzielna 3A/7.
 * FOP-parseable; revealed on trace copy or /meta dwell (truth chain complete).
 * Not shown in main UI — discovery = signal when found.
 */

import type { Lang } from "./i18n";
import type { MetaLang } from "./metaI18n";

/** FOP `place` token */
export const STUDIO_PLACE_FOP = "Dzielna_3A7" as const;

export const STUDIO_ANCHOR = {
  id: "WAW_DZ3A7",
  name: "WARSZAWA",
  address: "Dzielna 3A/7",
  district: "Muranów",
  city: "Warszawa",
  /** Muranów courtyard — same block as local initiative pilot (3A/7) */
  lat: 52.24886,
  lon: 20.99241,
  fopRelationType: "broadcast_anchor",
} as const;

/** Hidden trace page — no nav links; console + view-source discovery only */
export const STUDIO_ORIGIN_ROUTE = "/origin" as const;

export const STUDIO_BROADCAST_LINES = [
  "Nadajemy ze stołu.",
  "Z biurka.",
  "Z maty.",
] as const;

/** Console-only discoverability hint (not rendered in UI) */
export const STUDIO_CONSOLE_HINT = `origin → ${STUDIO_ORIGIN_ROUTE}`;

/** View-source HTML comment injected in root layout */
export const STUDIO_HTML_TRACE_COMMENT = `<!--
WARSZAWASZA

Warszawa
Dzielna 3A/7

Nadajemy ze stołu.
Z biurka.
Z maty.

Dziękujemy wszystkim,
którzy pozostawili ślad w tym projekcie.
-->`;

export const STUDIO_CONSOLE_TRACE = [
  "WARSZAWASZA",
  `${STUDIO_ANCHOR.city} · ${STUDIO_ANCHOR.address}`,
  "",
  ...STUDIO_BROADCAST_LINES,
  "",
  "Dziękujemy wszystkim,",
  "którzy pomogli zbudować ten projekt.",
  "",
  STUDIO_CONSOLE_HINT,
].join("\n");

const DISCOVERY_LINES: Record<
  "pl" | "en" | "it" | "uk" | "bg" | "et" | "fi" | "lt" | "lv" | "hu",
  string
> = {
  pl: "pracownia WARSZAWA · Dzielna 3A/7 · nadajemy ze stołu — dzięki",
  en: "studio WARSZAWA · Dzielna 3A/7 · broadcast from desk — thanks",
  it: "studio WARSZAWA · Dzielna 3A/7 · trasmissione dal tavolo — grazie",
  uk: "майстерня WARSZAWA · Dzielna 3A/7 · трансляція зі столу — дякуємо",
  bg: "ателие WARSZAWA · Dzielna 3A/7 · излъчване от масата — благодарим",
  et: "stuudio WARSZAWA · Dzielna 3A/7 · edastame laualt — täname",
  fi: "studio WARSZAWA · Dzielna 3A/7 · lähetys pöydältä — kiitos",
  lt: "studija WARSZAWA · Dzielna 3A/7 · transliacija nuo stalo — ačiū",
  lv: "studija WARSZAWA · Dzielna 3A/7 · pārraide no galda — paldies",
  hu: "műhely WARSZAWA · Dzielna 3A/7 · adás az asztalról — köszönjük",
};

/** Pairs for FOP `sig` line — parseable, geography-neutral keys */
export function studioPlaceSignal(): Record<string, string> {
  return {
    place: STUDIO_PLACE_FOP,
    anchor: `${STUDIO_ANCHOR.lat},${STUDIO_ANCHOR.lon}`,
  };
}

/** FOP `rel` line — studio as broadcast origin */
export function studioFopRelation(): { type: string; ref: string } {
  const { id, lat, lon, fopRelationType } = STUDIO_ANCHOR;
  return {
    type: fopRelationType,
    ref: `STUDIO:${id}@${lat},${lon}`,
  };
}

/** One-line human discovery copy (trace footer, /meta dwell reveal) */
export function studioDiscoveryLine(lang: Lang | MetaLang): string {
  if (lang in DISCOVERY_LINES) return DISCOVERY_LINES[lang as keyof typeof DISCOVERY_LINES];
  return DISCOVERY_LINES.en;
}
