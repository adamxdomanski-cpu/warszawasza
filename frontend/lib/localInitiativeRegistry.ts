/**
 * Client-side mirror of backend/sql/009_local_initiatives.sql seed.
 * UX: "Inicjatywa lokalna" — never "Micro Node" in UI.
 * Spec: fira/LOCAL_INITIATIVE_MODEL.md
 */

import type { Lang } from "./i18n";

export type LocalInitiativeStatus = "Pilot" | "Active" | "Paused";

export type FocusAreaRecord = {
  slug: string;
  displayName: Record<
    "pl" | "en" | "it" | "uk" | "bg" | "et" | "fi" | "lt" | "lv" | "hu",
    string
  >;
};

export type LocalMicroNodeRecord = {
  partnerLabel: string;
  focusAreaSlug: string;
  address: string;
  district: string;
  status: LocalInitiativeStatus;
};

/** Static seed — idempotent with SQL 009 */
export const FOCUS_AREAS: readonly FocusAreaRecord[] = [
  {
    slug: "WASTE_NAV",
    displayName: {
      pl: "FIRA Waste Navigation",
      en: "FIRA Waste Navigation",
      it: "FIRA Waste Navigation",
      uk: "FIRA Waste Navigation",
      bg: "FIRA Waste Navigation",
      et: "FIRA Waste Navigation",
      fi: "FIRA Waste Navigation",
      lt: "FIRA Waste Navigation",
      lv: "FIRA Waste Navigation",
      hu: "FIRA Waste Navigation",
    },
  },
] as const;

/** Muranów courtyard pilot */
export const LOCAL_INITIATIVE_PILOT: LocalMicroNodeRecord = {
  partnerLabel: "Partnerstwo Muranów",
  focusAreaSlug: "WASTE_NAV",
  address: "Dzielna 3A/5",
  district: "Muranów",
  status: "Pilot",
};

export function lookupFocusArea(slug: string): FocusAreaRecord | null {
  return FOCUS_AREAS.find((row) => row.slug === slug) ?? null;
}

export function focusAreaDisplayName(slug: string, lang: Lang): string {
  const row = lookupFocusArea(slug);
  if (!row) return slug;
  if (lang === "pl") return row.displayName.pl;
  if (lang === "it") return row.displayName.it;
  if (lang === "uk") return row.displayName.uk;
  if (lang === "bg") return row.displayName.bg;
  if (lang === "et") return row.displayName.et;
  if (lang === "fi") return row.displayName.fi;
  if (lang === "lt") return row.displayName.lt;
  if (lang === "lv") return row.displayName.lv;
  if (lang === "hu") return row.displayName.hu;
  return row.displayName.en;
}
