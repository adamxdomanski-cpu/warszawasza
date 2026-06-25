/** FIRA Signal API — Draft 0.99 · unified ingest model */

export const SIGNAL_CHANNELS = {
  CITIZEN: "CHANNEL_A_CITIZEN",
  CITY: "CHANNEL_B_CITY",
  SENSOR: "CHANNEL_C_SENSOR",
  DOCUMENT: "CHANNEL_D_DOCUMENT",
  REGISTRY: "CHANNEL_F_REGISTRY",
} as const;

export type SignalChannel =
  (typeof SIGNAL_CHANNELS)[keyof typeof SIGNAL_CHANNELS];

export type RegistryRelationship = {
  name: string;
  role: string;
  entityKrs?: string;
};

export type RegistryPayload = {
  registrySource: "rejestr.io" | "krs";
  entityKrs: string;
  entityName: string;
  relationships: RegistryRelationship[];
};

export type CitizenPayload = {
  place?: string;
  friction?: string;
  trajectory?: "true" | "false";
  logRef?: string;
};

export type SensorPayload = {
  kind: "attention" | "scroll" | "inactivity" | "dwell";
  count?: number;
};

export type SignalPayload =
  | { channel: typeof SIGNAL_CHANNELS.CITIZEN; data: CitizenPayload }
  | { channel: typeof SIGNAL_CHANNELS.CITY; data: Record<string, string> }
  | { channel: typeof SIGNAL_CHANNELS.SENSOR; data: SensorPayload }
  | { channel: typeof SIGNAL_CHANNELS.DOCUMENT; data: { ref: string; title: string } }
  | { channel: typeof SIGNAL_CHANNELS.REGISTRY; data: RegistryPayload };

export type FiraSignal = {
  id: string;
  channel: SignalChannel;
  timestamp: string;
  payload: SignalPayload["data"];
};

export function createSignalId(prefix: string): string {
  const stamp = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 6);
  return `SIG_${prefix}_${stamp}_${rand}`.toUpperCase();
}

export function createRegistrySignal(data: RegistryPayload): FiraSignal {
  return {
    id: createSignalId("KRS"),
    channel: SIGNAL_CHANNELS.REGISTRY,
    timestamp: new Date().toISOString(),
    payload: data,
  };
}

export function createCitizenSignal(data: CitizenPayload): FiraSignal {
  return {
    id: createSignalId("CIT"),
    channel: SIGNAL_CHANNELS.CITIZEN,
    timestamp: new Date().toISOString(),
    payload: data,
  };
}

export function isRegistrySignal(
  signal: FiraSignal,
): signal is FiraSignal & { payload: RegistryPayload } {
  return signal.channel === SIGNAL_CHANNELS.REGISTRY;
}

export function isCitizenSignal(
  signal: FiraSignal,
): signal is FiraSignal & { payload: CitizenPayload } {
  return signal.channel === SIGNAL_CHANNELS.CITIZEN;
}

/** Capital vector — dominant shareholder KRS or entity root */
export function capitalVectorFromRegistry(data: RegistryPayload): string {
  const shareholder = data.relationships.find((r) =>
    /UDZIALOWIEC|SHAREHOLDER|MATKA|PARENT/i.test(r.role),
  );
  if (shareholder?.entityKrs) return shareholder.entityKrs;
  if (shareholder?.name) return normalizeKey(shareholder.name);
  return data.entityKrs;
}

function normalizeKey(value: string): string {
  return value.trim().toUpperCase().replace(/\s+/g, "_");
}

export const SIGNAL_STORE_KEY = "warszawasza-signal-store";

export function readSignalStore(): FiraSignal[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SIGNAL_STORE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as FiraSignal[]) : [];
  } catch {
    return [];
  }
}

export function ingestSignal(signal: FiraSignal): number {
  const next = [...readSignalStore(), signal].slice(-200);
  localStorage.setItem(SIGNAL_STORE_KEY, JSON.stringify(next));
  return next.length;
}
