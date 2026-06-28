import { readFile } from "node:fs/promises";
import path from "node:path";
import { parseQualitativeTraceList, type QualitativeTrace } from "./sensory";

let cached: QualitativeTrace[] | null = null;

/** Load thick-mapping seed (Kietlińska 2018) — server / build only. */
export async function loadKietlinskaSeed(): Promise<QualitativeTrace[]> {
  if (cached) return cached;
  const candidates = [
    path.join(process.cwd(), "backend", "data", "kietlinska_seed.json"),
    path.join(process.cwd(), "..", "backend", "data", "kietlinska_seed.json"),
  ];
  let raw: string | null = null;
  for (const filePath of candidates) {
    try {
      raw = await readFile(filePath, "utf8");
      break;
    } catch {
      /* try next path (monorepo root vs frontend cwd) */
    }
  }
  if (raw === null) {
    throw new Error("kietlinska_seed.json not found");
  }
  const parsed = parseQualitativeTraceList(JSON.parse(raw) as unknown);
  cached = parsed;
  return parsed;
}

export function findSensoryByTraceShortId(
  seeds: QualitativeTrace[],
  traceShortId: string,
): QualitativeTrace | undefined {
  return seeds.find((s) => s.linked_trace_short_id === traceShortId);
}
