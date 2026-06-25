/**
 * Graphene deliberation — transparent ballot state (distribution layer)
 * FOP-compatible records · auditable fingerprint · client-side tally
 */

import {
  encodeObservation,
  observationFingerprint,
  type EvidenceLevel,
  type FiraObservation,
} from "./fira-core";
import type { Lang } from "./i18n";
import { SIGNAL_CHANNELS } from "./signalApi";

export const DELIBERATION_REGISTRY_KEY = "warszawasza-deliberation-votes";

export const DEFAULT_PROPOSITION_ID = "civic-friction-signal";

export type VoteOptionId = "open" | "validate" | "abstain";

export type GrapheneBallot = {
  propositionId: string;
  optionId: VoteOptionId;
  lang: Lang;
  createdAt: number;
};

export type GrapheneTally = {
  open: number;
  validate: number;
  abstain: number;
  total: number;
};

function readRegistry(): GrapheneBallot[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(DELIBERATION_REGISTRY_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as GrapheneBallot[]) : [];
  } catch {
    return [];
  }
}

export function getVoteRegistry(): GrapheneBallot[] {
  return readRegistry();
}

export function registerVote(ballot: GrapheneBallot): number {
  const next = [...readRegistry(), ballot].slice(-499);
  localStorage.setItem(DELIBERATION_REGISTRY_KEY, JSON.stringify(next));
  return next.length;
}

export function getTally(propositionId = DEFAULT_PROPOSITION_ID): GrapheneTally {
  const votes = readRegistry().filter((b) => b.propositionId === propositionId);
  const open = votes.filter((b) => b.optionId === "open").length;
  const validate = votes.filter((b) => b.optionId === "validate").length;
  const abstain = votes.filter((b) => b.optionId === "abstain").length;
  return { open, validate, abstain, total: votes.length };
}

/** Hypothesis weight from tally spread — honest uncertainty, not authority */
export function computeHypothesisPct(
  tally: GrapheneTally,
  selected: VoteOptionId,
): number {
  if (tally.total === 0) return 0;
  const counts: Record<VoteOptionId, number> = {
    open: tally.open,
    validate: tally.validate,
    abstain: tally.abstain,
  };
  const share = (counts[selected] / tally.total) * 100;
  const uncertainty = Math.min(28, Math.round(40 / Math.sqrt(tally.total + 1)));
  return Math.max(0, Math.min(99, Math.round(share - uncertainty / 2)));
}

export function ballotToObservation(
  ballot: GrapheneBallot,
  tally: GrapheneTally,
): FiraObservation {
  const evidenceLevel = Math.min(5, Math.floor(tally.total / 3)) as EvidenceLevel;

  return {
    version: "0.1",
    timestamp: new Date(ballot.createdAt).toISOString(),
    chain: "○●◐◉",
    source: {
      channel: SIGNAL_CHANNELS.CITIZEN,
      ref: `deliberation/${ballot.propositionId}`,
    },
    signal: {
      option: ballot.optionId,
      lang: ballot.lang,
      tally_open: String(tally.open),
      tally_validate: String(tally.validate),
      tally_abstain: String(tally.abstain),
      tally_total: String(tally.total),
    },
    process: { stageIndex: 2 },
    evidence: { level: evidenceLevel },
    relation: { type: "deliberation", ref: ballot.propositionId },
    result: {
      kind: "hypothesis",
      value: String(computeHypothesisPct(tally, ballot.optionId)),
    },
  };
}

export function buildVoteFingerprint(ballot: GrapheneBallot, tally: GrapheneTally): string {
  return observationFingerprint(ballotToObservation(ballot, tally));
}

export function buildVoteFopDocument(ballot: GrapheneBallot, tally: GrapheneTally): string {
  return encodeObservation(ballotToObservation(ballot, tally));
}

export function buildVoteDocument(
  ballot: GrapheneBallot,
  tally: GrapheneTally,
  footerLines: string[],
  origin = "https://www.warszawasza.online",
): string {
  const fop = buildVoteFopDocument(ballot, tally);
  const fingerprint = buildVoteFingerprint(ballot, tally);
  const shareUrl = buildVoteShareUrl(ballot, origin);

  return [
    fop,
    "",
    "---",
    "",
    ...footerLines,
    "",
    `fingerprint: ${fingerprint}`,
    shareUrl,
  ].join("\n");
}

export function buildVoteShareUrl(
  ballot: GrapheneBallot,
  origin = "https://www.warszawasza.online",
): string {
  const compact = {
    p: ballot.propositionId,
    o: ballot.optionId,
    l: ballot.lang,
    ts: ballot.createdAt,
  };
  const encoded = btoa(JSON.stringify(compact))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return `${origin}/deliberation?ballot=${encoded}`;
}

export function buildVoteMailtoHref(
  ballot: GrapheneBallot,
  tally: GrapheneTally,
  footerLines: string[],
): string {
  const body = encodeURIComponent(buildVoteDocument(ballot, tally, footerLines));
  const subject = encodeURIComponent("WARSZAWASZA — deliberation ballot");
  return `mailto:hello@warszawasza.online?subject=${subject}&body=${body}`;
}

export function tallyPercent(tally: GrapheneTally, option: VoteOptionId): number {
  if (tally.total === 0) return 0;
  const counts: Record<VoteOptionId, number> = {
    open: tally.open,
    validate: tally.validate,
    abstain: tally.abstain,
  };
  return Math.round((counts[option] / tally.total) * 100);
}
