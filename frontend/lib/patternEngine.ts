import {
  capitalVectorFromRegistry,
  createCitizenSignal,
  createRegistrySignal,
  ingestSignal,
  isCitizenSignal,
  isRegistrySignal,
  readSignalStore,
  type CitizenPayload,
  type FiraSignal,
  type RegistryPayload,
} from "./signalApi";
import { evidenceBar } from "./symbols";

export type EvidenceLevel = 0 | 1 | 2 | 3 | 4 | 5;

export type InterferenceMatch = {
  capitalVector: string;
  citizenPlace: string;
  citizenFriction: string;
  citizenSignalId: string;
  registryEntityKrs: string;
  registryEntityName: string;
  priorCitizenPlace: string;
  priorCitizenSignalId: string;
  priorLogRef?: string;
  evidenceLevel: EvidenceLevel;
};

export type InterferenceResult = {
  matches: InterferenceMatch[];
  griffinDetected: boolean;
};

export function formatEvidenceIndicator(level: EvidenceLevel): string {
  return evidenceBar(level);
}

/** Dominant capital vector shared across registry records */
export function indexRegistryVectors(
  signals: FiraSignal[],
): Map<string, FiraSignal[]> {
  const map = new Map<string, FiraSignal[]>();
  for (const signal of signals) {
    if (!isRegistrySignal(signal)) continue;
    const vector = capitalVectorFromRegistry(signal.payload);
    const bucket = map.get(vector) ?? [];
    bucket.push(signal);
    map.set(vector, bucket);
  }
  return map;
}

export function detectInterference(
  signals: FiraSignal[] = readSignalStore(),
): InterferenceResult | null {
  const citizens = signals.filter(isCitizenSignal);
  const registryIndex = indexRegistryVectors(signals);

  if (citizens.length === 0 || registryIndex.size === 0) return null;

  const matches: InterferenceMatch[] = [];

  for (const citizen of citizens) {
    const place = citizen.payload.place?.trim();
    if (!place) continue;

    for (const [vector, registrySignals] of registryIndex) {
      const registry = registrySignals[0];
      if (!registry || !isRegistrySignal(registry)) continue;

      const prior = citizens.find(
        (c) =>
          c.id !== citizen.id &&
          c.payload.place &&
          c.payload.place !== place &&
          c.timestamp < citizen.timestamp,
      );

      if (!prior) continue;

      matches.push({
        capitalVector: vector,
        citizenPlace: place,
        citizenFriction: citizen.payload.friction ?? "tarcie przestrzenne",
        citizenSignalId: citizen.id,
        registryEntityKrs: registry.payload.entityKrs,
        registryEntityName: registry.payload.entityName,
        priorCitizenPlace: prior.payload.place ?? "—",
        priorCitizenSignalId: prior.id,
        priorLogRef: prior.payload.logRef,
        evidenceLevel: 5,
      });
    }
  }

  if (matches.length === 0) return null;

  return {
    matches,
    griffinDetected: true,
  };
}

/** Seed demo palimpsest — dev / first-run only */
export function seedDemoInterferenceGraph(): void {
  if (readSignalStore().some(isRegistrySignal)) return;

  const spolkaA: RegistryPayload = {
    registrySource: "rejestr.io",
    entityKrs: "0000123456",
    entityName: "SPÓŁKA_DEWELOPERSKA_X",
    relationships: [
      { name: "SPÓŁKA_MATKA_Z", role: "GŁÓWNY_UDZIALOWIEC", entityKrs: "0000999888" },
      { name: "OSOBA_POWIĄZANA_Y", role: "PREZES_ZARZĄDU" },
    ],
  };

  const spolkaB: RegistryPayload = {
    registrySource: "rejestr.io",
    entityKrs: "0000654321",
    entityName: "SPÓŁKA_CELowa_A",
    relationships: [
      { name: "SPÓŁKA_MATKA_Z", role: "GŁÓWNY_UDZIALOWIEC", entityKrs: "0000999888" },
    ],
  };

  ingestSignal(createRegistrySignal(spolkaA));
  ingestSignal(createRegistrySignal(spolkaB));

  const muranow: CitizenPayload = {
    place: "Muranów",
    friction: "wyburzenie pawilonu",
    trajectory: "false",
    logRef: "LOG_2025_10_MURANOW",
  };

  const wola: CitizenPayload = {
    place: "Wola",
    friction: "wycinka drzew pod inwestycję",
    trajectory: "false",
    logRef: "LOG_2026_06_WOLA",
  };

  const tMur = createCitizenSignal(muranow);
  tMur.timestamp = new Date(Date.now() - 240 * 24 * 60 * 60 * 1000).toISOString();
  ingestSignal(tMur);

  const tWola = createCitizenSignal(wola);
  ingestSignal(tWola);
}

export function registerCitizenObservation(payload: CitizenPayload): FiraSignal {
  const signal = createCitizenSignal(payload);
  ingestSignal(signal);
  return signal;
}
