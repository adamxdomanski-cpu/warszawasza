/**
 * Human place label from coordinates — city-agnostic (Parczew, Lubartów, Warszawa · Muranów).
 */

import type { Lang } from "../i18n";

export type NominatimAddress = {
  city?: string;
  town?: string;
  village?: string;
  suburb?: string;
  neighbourhood?: string;
  municipality?: string;
  county?: string;
  state?: string;
};

/** Build display label from Nominatim address parts. */
export function formatPlaceLabelFromAddress(address: NominatimAddress): string | null {
  const locality =
    pickFirst(address.city, address.town, address.village, address.municipality) ?? null;
  const district = pickFirst(address.suburb, address.neighbourhood) ?? null;

  if (!locality && district) return district;
  if (!locality) return null;

  if (district && !samePlace(locality, district)) {
    return `${locality} · ${district}`;
  }

  return locality;
}

function pickFirst(...values: (string | undefined)[]): string | undefined {
  for (const v of values) {
    const t = v?.trim();
    if (t) return t;
  }
  return undefined;
}

function samePlace(a: string, b: string): boolean {
  return normalize(a) === normalize(b);
}

function normalize(s: string): string {
  return s.trim().toLowerCase();
}

/** Rough Polish locative for “Jesteś w …” — pilot; proper names may need manual copy later. */
export function polishLocative(placeName: string): string {
  const n = placeName.trim();
  if (!n) return n;
  if (n === "Warszawa") return "Warszawie";
  if (n.includes(" · ")) {
    const [city, district] = n.split(" · ", 2);
    return `${polishLocative(city!)} · ${district!.trim()}`;
  }
  if (n.endsWith("ów")) return `${n.slice(0, -2)}owie`;
  if (n.endsWith("ew")) return `${n}ie`;
  if (n.endsWith("a")) return `${n.slice(0, -1)}ie`;
  return n;
}

export function formatYouAreIn(lang: Lang, placeLabel: string): string {
  const trimmed = placeLabel.trim();
  if (!trimmed) return trimmed;

  if (lang === "pl") {
    return `Jesteś w ${polishLocative(trimmed)}`;
  }
  if (lang === "en") {
    return `You are in ${trimmed}`;
  }
  if (lang === "uk") {
    return `Ви в ${trimmed}`;
  }
  if (lang === "it") {
    return `Sei a ${trimmed}`;
  }
  if (lang === "hu") {
    return `Itt vagy: ${trimmed}`;
  }
  return trimmed;
}

export async function fetchPlaceLabel(
  lat: number,
  lon: number,
  lang: Lang,
): Promise<string | null> {
  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    lang,
  });
  const res = await fetch(`/api/place/reverse?${params.toString()}`);
  if (!res.ok) return null;
  const data: unknown = await res.json();
  if (typeof data !== "object" || data === null) return null;
  const label = (data as { label?: unknown }).label;
  return typeof label === "string" && label.trim() ? label.trim() : null;
}
