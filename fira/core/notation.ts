/**
 * FOP — FIRA Observation Protocol notation (Layer 2)
 *
 * ASCII is notation, not decoration. Readable · writable · comparable · archivable.
 */

import type { EvidenceLevel, FiraObservation, ResultKind } from "./types";
import { FOP_VERSION } from "./types";

const HEADER = `FOP/${FOP_VERSION}`;

function parseEvidenceGlyphs(glyphs: string): EvidenceLevel {
  const filled = (glyphs.match(/■/g) ?? []).length;
  return Math.max(0, Math.min(5, filled)) as EvidenceLevel;
}

function evidenceGlyphs(level: EvidenceLevel): string {
  return "■".repeat(level) + "□".repeat(5 - level);
}

function parseKeyValues(rest: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const token of rest.trim().split(/\s+/)) {
    const eq = token.indexOf("=");
    if (eq === -1) continue;
    out[token.slice(0, eq)] = token.slice(eq + 1);
  }
  return out;
}

function formatKeyValues(fields: Record<string, string>): string {
  return Object.entries(fields)
    .filter(([, v]) => v.length > 0)
    .map(([k, v]) => `${k}=${v}`)
    .join(" ");
}

/** Serialize observation to portable ASCII document */
export function encodeObservation(obs: FiraObservation): string {
  const lines = [
    HEADER,
    `@${obs.timestamp}`,
    `chain ${obs.chain}`,
    `src ${obs.source.channel}${obs.source.ref ? ` ref=${obs.source.ref}` : ""}`,
  ];

  const sig = formatKeyValues(obs.signal);
  if (sig) lines.push(`sig ${sig}`);

  lines.push(
    `proc ${obs.process.stageIndex}${obs.process.analyzing ? " analyzing" : ""}`,
    `ev ${evidenceGlyphs(obs.evidence.level)}`,
  );

  if (obs.relation) {
    lines.push(`rel ${obs.relation.type} ${obs.relation.ref}`);
  }

  const resValue = obs.result.value ? ` ${obs.result.value}` : "";
  lines.push(`res ${obs.result.kind}${resValue}`);

  return lines.join("\n");
}

/** Parse FOP document; returns null if not valid FOP */
export function parseObservation(text: string): FiraObservation | null {
  const lines = text
    .trim()
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length === 0 || !lines[0]?.startsWith("FOP/")) return null;

  let timestamp = new Date().toISOString();
  let chain = "○";
  let sourceChannel = "UNKNOWN";
  let sourceRef: string | undefined;
  const signal: Record<string, string> = {};
  let stageIndex = 0;
  let analyzing = false;
  let evidenceLevel: EvidenceLevel = 0;
  let relation: FiraObservation["relation"];
  let resultKind: ResultKind = "pending";
  let resultValue: string | undefined;

  for (const line of lines.slice(1)) {
    if (line.startsWith("@")) {
      timestamp = line.slice(1);
      continue;
    }
    const space = line.indexOf(" ");
    const key = space === -1 ? line : line.slice(0, space);
    const rest = space === -1 ? "" : line.slice(space + 1);

    switch (key) {
      case "chain":
        chain = rest.replace(/\s+/g, "");
        break;
      case "src": {
        const parts = rest.split(/\s+/);
        sourceChannel = parts[0] ?? "UNKNOWN";
        for (const p of parts.slice(1)) {
          if (p.startsWith("ref=")) sourceRef = p.slice(4);
        }
        break;
      }
      case "sig":
        Object.assign(signal, parseKeyValues(rest));
        break;
      case "proc": {
        const parts = rest.split(/\s+/);
        stageIndex = Number.parseInt(parts[0] ?? "0", 10) || 0;
        analyzing = parts.includes("analyzing");
        break;
      }
      case "ev":
        evidenceLevel = parseEvidenceGlyphs(rest);
        break;
      case "rel": {
        const parts = rest.split(/\s+/);
        if (parts.length >= 2) {
          relation = { type: parts[0]!, ref: parts.slice(1).join(" ") };
        }
        break;
      }
      case "res": {
        const parts = rest.split(/\s+/);
        resultKind = (parts[0] as ResultKind) ?? "pending";
        resultValue = parts.slice(1).join(" ") || undefined;
        break;
      }
      default:
        break;
    }
  }

  return {
    version: FOP_VERSION,
    timestamp,
    chain,
    source: { channel: sourceChannel, ref: sourceRef },
    signal,
    process: { stageIndex, analyzing },
    evidence: { level: evidenceLevel },
    relation,
    result: { kind: resultKind, value: resultValue },
  };
}

/** Normalized fingerprint for interoperability comparison */
export function observationFingerprint(obs: FiraObservation): string {
  const sig = Object.keys(obs.signal)
    .sort()
    .map((k) => `${k}:${obs.signal[k]?.toLowerCase()}`)
    .join("|");
  const rel = obs.relation
    ? `${obs.relation.type}:${obs.relation.ref.toLowerCase()}`
    : "";
  return [
    obs.source.channel.toLowerCase(),
    obs.chain,
    sig,
    String(obs.evidence.level),
    rel,
    obs.result.kind,
  ].join(";");
}

/** Two independent observers describing the same phenomenon should share a fingerprint */
export function observationsAlign(a: FiraObservation, b: FiraObservation): boolean {
  return observationFingerprint(a) === observationFingerprint(b);
}
