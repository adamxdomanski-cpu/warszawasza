/**
 * Client-side mirror of backend/sql/008_civic_organizations.sql seed.
 * Zero-PII · KRS + operational_class + trust_level only.
 * Spec: fira/CIVIC_ORGANIZATION_MATRIX.md
 */

export type CivicOperationalClass =
  | "WATCHDOG"
  | "GRANTMAKER_NETWORK"
  | "CIVIC_TECH";

export type CivicOrgRecord = {
  krs: string;
  orgName: string;
  operationalClass: CivicOperationalClass;
  trustLevel: 0 | 1 | 2 | 3 | 4 | 5;
};

/** Static seed — idempotent with SQL 008 ON CONFLICT DO NOTHING */
export const CIVIC_ORG_REGISTRY: readonly CivicOrgRecord[] = [
  {
    krs: "0000217821",
    orgName: "Forum Darczyńców w Polsce",
    operationalClass: "WATCHDOG",
    trustLevel: 5,
  },
  {
    krs: "0000030897",
    orgName: "Fundacja Wielka Orkiestra Świątecznej Pomocy",
    operationalClass: "CIVIC_TECH",
    trustLevel: 5,
  },
] as const;

export const NGO_WATCHDOG_TAG = "ngo-watchdog" as const;
export const WOSP_TAG = "wosp" as const;
export const CIVIC_TECH_TAG = "civic-tech" as const;

export function lookupCivicOrgByKrs(krs: string): CivicOrgRecord | null {
  const normalized = krs.trim().padStart(10, "0");
  return CIVIC_ORG_REGISTRY.find((row) => row.krs === normalized) ?? null;
}

export function lookupCivicOrgByTag(tag: string): CivicOrgRecord | null {
  if (tag === NGO_WATCHDOG_TAG) {
    return (
      CIVIC_ORG_REGISTRY.find((row) => row.operationalClass === "WATCHDOG") ??
      null
    );
  }
  if (tag === WOSP_TAG || tag === CIVIC_TECH_TAG) {
    return (
      CIVIC_ORG_REGISTRY.find((row) => row.operationalClass === "CIVIC_TECH") ??
      null
    );
  }
  return null;
}
