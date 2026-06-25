"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GRAPHENE_VOTE_COPY, VOTE_OPTION_ORDER } from "../../lib/grapheneVoteI18n";
import {
  buildVoteDocument,
  buildVoteFingerprint,
  buildVoteFopDocument,
  buildVoteMailtoHref,
  computeHypothesisPct,
  DEFAULT_PROPOSITION_ID,
  getTally,
  getVoteRegistry,
  registerVote,
  tallyPercent,
  type GrapheneBallot,
  type VoteOptionId,
} from "../../lib/grapheneVote";
import type { Lang } from "../../lib/i18n";
import FieldBackdrop from "./FieldBackdrop";
import FieldFooter from "./FieldFooter";
import GrapheneField from "./GrapheneField";
import LangNav from "./LangNav";
import SignalControl from "./SignalControl";

type Phase = "read" | "vote" | "result";

export default function GrapheneVote() {
  const [lang, setLang] = useState<Lang>("pl");
  const [phase, setPhase] = useState<Phase>("read");
  const [selected, setSelected] = useState<VoteOptionId | null>(null);
  const [ballot, setBallot] = useState<GrapheneBallot | null>(null);
  const [tally, setTally] = useState(() => getTally(DEFAULT_PROPOSITION_ID));
  const [registryCount, setRegistryCount] = useState(0);
  const [flash, setFlash] = useState<string | null>(null);

  const copy = GRAPHENE_VOTE_COPY[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    setTally(getTally(DEFAULT_PROPOSITION_ID));
    setRegistryCount(getVoteRegistry().length);
  }, [ballot]);

  const hypothesisPct = useMemo(() => {
    if (!ballot) return 0;
    return computeHypothesisPct(tally, ballot.optionId);
  }, [ballot, tally]);

  const fingerprint = useMemo(() => {
    if (!ballot) return "";
    return buildVoteFingerprint(ballot, tally);
  }, [ballot, tally]);

  const fopNotation = useMemo(() => {
    if (!ballot) return "";
    return buildVoteFopDocument(ballot, tally);
  }, [ballot, tally]);

  const commitVote = (optionId: VoteOptionId) => {
    const nextBallot: GrapheneBallot = {
      propositionId: DEFAULT_PROPOSITION_ID,
      optionId,
      lang,
      createdAt: Date.now(),
    };
    registerVote(nextBallot);
    setSelected(optionId);
    setBallot(nextBallot);
    setPhase("result");
  };

  const copyNotation = useCallback(async () => {
    if (!ballot) return;
    const document = buildVoteDocument(ballot, tally, copy.footerLines);
    try {
      await navigator.clipboard.writeText(document);
      setFlash(copy.copied);
    } catch {
      setFlash(copy.copyFailed);
    }
    window.setTimeout(() => setFlash(null), 2400);
  }, [ballot, tally, copy]);

  const leaveTrace = useCallback(() => {
    if (!ballot) return;
    void copyNotation();
    window.setTimeout(() => {
      window.location.href = buildVoteMailtoHref(ballot, tally, copy.footerLines);
    }, 350);
  }, [ballot, tally, copy, copyNotation]);

  return (
    <>
      <FieldFooter lang={lang} />
      <main className="relative z-10 min-h-dvh overflow-x-hidden p-5 pb-14 sm:p-8 sm:pb-16">
        <GrapheneField />
        <FieldBackdrop />

        <header className="relative z-10 mb-8 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center font-mono-field text-sm tracking-wider text-accent/70 touch-manipulation sm:text-base"
            aria-label={copy.back}
          >
            {copy.back}
          </Link>
          <LangNav lang={lang} onChange={setLang} />
        </header>

        <article className="relative z-10 mx-auto max-w-prose">
          <p className="m-0 font-mono-field text-[11px] tracking-[0.18em] text-accent/45 uppercase sm:text-xs">
            {copy.subtitle}
          </p>
          <h1 className="mt-2 mb-3 text-2xl font-light tracking-wide text-ink sm:text-3xl">
            {copy.title}
          </h1>
          <p className="mb-8 text-sm leading-relaxed text-accent/55 sm:text-base">
            {copy.disclaimer}
          </p>

          <section className="mb-8 rounded-sm border border-accent/15 bg-field/40 p-4 sm:p-5">
            <h2 className="m-0 mb-2 font-mono-field text-[11px] tracking-[0.16em] text-accent/50 uppercase sm:text-xs">
              {copy.propositionLabel}
            </h2>
            <p className="m-0 text-base leading-relaxed text-ink/90 sm:text-lg">
              {copy.proposition}
            </p>
          </section>

          <section className="mb-8" aria-labelledby="tally-heading">
            <h2
              id="tally-heading"
              className="m-0 mb-3 font-mono-field text-[11px] tracking-[0.16em] text-accent/50 uppercase sm:text-xs"
            >
              {copy.tallyLabel}
            </h2>
            {tally.total === 0 ? (
              <p className="m-0 font-mono-field text-sm text-accent/40">{copy.tallyEmpty}</p>
            ) : (
              <ul className="m-0 list-none space-y-1.5 p-0 font-mono-field text-sm tabular-nums sm:text-base">
                {VOTE_OPTION_ORDER.map((id) => {
                  const opt = copy.options[id];
                  const n =
                    id === "open" ? tally.open : id === "validate" ? tally.validate : tally.abstain;
                  const pct = tallyPercent(tally, id);
                  return (
                    <li key={id} className="text-accent/75">
                      {copy.tallyRow
                        .replace("{label}", opt.label)
                        .replace("{n}", String(n))
                        .replace("{pct}", String(pct))}
                    </li>
                  );
                })}
              </ul>
            )}
            {registryCount > 0 && (
              <p className="mt-2 mb-0 font-mono-field text-[10px] tracking-wide text-accent/40 sm:text-[11px]">
                {copy.registry.replace("{n}", String(registryCount))}
              </p>
            )}
          </section>

          {phase === "read" && (
            <SignalControl
              type="button"
              direction="down"
              onClick={() => setPhase("vote")}
              className="min-h-11 touch-manipulation font-mono-field text-sm tracking-[0.12em] text-accent uppercase sm:text-base"
            >
              {copy.readAction}
            </SignalControl>
          )}

          {phase === "vote" && (
            <section aria-labelledby="vote-heading" className="space-y-4">
              <h2
                id="vote-heading"
                className="m-0 font-mono-field text-[11px] tracking-[0.16em] text-accent/50 uppercase sm:text-xs"
              >
                {copy.voteLabel}
              </h2>
              <div className="flex flex-col gap-3">
                {VOTE_OPTION_ORDER.map((id) => {
                  const opt = copy.options[id];
                  return (
                    <SignalControl
                      key={id}
                      type="button"
                      direction={id === "open" ? "up-right" : id === "validate" ? "right" : "down"}
                      onClick={() => commitVote(id)}
                      className="trajectory-choice flex min-h-11 w-full touch-manipulation flex-col items-start gap-2 bg-field/80 px-5 py-4 text-left"
                    >
                      <span className="font-mono-field text-lg tracking-[0.14em] text-accent sm:text-xl">
                        {opt.glyph} {opt.label}
                      </span>
                      <span className="text-sm leading-snug text-accent/50">{opt.consequence}</span>
                    </SignalControl>
                  );
                })}
              </div>
            </section>
          )}

          {phase === "result" && ballot && selected && (
            <section aria-live="polite" className="space-y-6">
              <div className="font-mono-field text-sm text-accent/70 sm:text-base">
                <span className="text-accent/45">{copy.options[selected].glyph}</span>{" "}
                {copy.options[selected].label}
              </div>

              <div>
                <div className="mb-1 font-mono-field text-[11px] tracking-[0.14em] text-accent/45 uppercase sm:text-xs">
                  {copy.hypothesisLabel}
                </div>
                <div className="font-mono-field text-2xl tabular-nums text-accent sm:text-3xl">
                  {hypothesisPct}%
                </div>
              </div>

              <div>
                <div className="mb-1 font-mono-field text-[11px] tracking-[0.14em] text-accent/45 uppercase sm:text-xs">
                  {copy.fingerprintLabel}
                </div>
                <code className="block break-all font-mono-field text-[11px] leading-relaxed text-accent/65 sm:text-xs">
                  {fingerprint}
                </code>
              </div>

              <div>
                <div className="mb-2 font-mono-field text-[11px] tracking-[0.14em] text-accent/45 uppercase sm:text-xs">
                  {copy.notationLabel}
                </div>
                <pre className="m-0 overflow-x-auto rounded-sm border border-accent/12 bg-field/60 p-3 font-mono-field text-[11px] leading-relaxed text-accent/80 sm:text-xs">
                  {fopNotation}
                </pre>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <SignalControl
                  type="button"
                  direction="right"
                  onClick={() => {
                    void copyNotation();
                  }}
                  className="min-h-11 touch-manipulation px-3 py-2 font-mono-field text-xs tracking-[0.12em] sm:text-sm"
                >
                  {copy.copyAction}
                </SignalControl>
                <SignalControl
                  type="button"
                  direction="right"
                  onClick={leaveTrace}
                  className="min-h-11 touch-manipulation px-3 py-2 font-mono-field text-xs tracking-[0.12em] sm:text-sm"
                >
                  {copy.leaveTrace}
                </SignalControl>
              </div>
              {flash && (
                <p className="m-0 font-mono-field text-[11px] tracking-wide text-accent/70 sm:text-xs">
                  {flash}
                </p>
              )}
            </section>
          )}
        </article>
      </main>
    </>
  );
}
