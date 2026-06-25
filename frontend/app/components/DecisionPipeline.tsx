"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { TrajectoryChoice } from "../../lib/artifactI18n";
import {
  COPY,
  PIPELINE_ORDER,
  type Lang,
  type PipelineKey,
} from "../../lib/i18n";
import {
  FILTRATION_STAGE_INDEX,
  MEMORY_FRAMES,
  TERMINAL_STAGE_INDEX,
  VALIDATION_FRAMES,
  hypothesisPercent,
  resolveStagePhase,
  statusSymbol,
  type StageDisplayKey,
  type StagePhase,
} from "../../lib/pipelineEngine";
import {
  formatEvidenceIndicator,
  type InterferenceResult,
} from "../../lib/patternEngine";

type DecisionPipelineProps = {
  lang: Lang;
  engineIndex: number;
  analyzing: boolean;
  trajectory: TrajectoryChoice | null;
  attentionSeed: number;
  interference?: InterferenceResult | null;
  variant?: "sidebar" | "inline";
};

function stageOpacity(phase: StagePhase): string {
  if (phase === "waiting") return "opacity-30";
  if (phase === "analyzing") return "opacity-70";
  return "opacity-100";
}

function stageTextClass(phase: StagePhase, isOutcome: boolean): string {
  if (isOutcome) return "text-accent";
  if (phase === "active" || phase === "analyzing") return "text-accent/90";
  if (phase === "done") return "text-accent/55";
  if (phase === "hypothesis") return "text-accent/80";
  return "text-accent/40";
}

export default function DecisionPipeline({
  lang,
  engineIndex,
  analyzing,
  trajectory,
  attentionSeed,
  interference = null,
  variant = "sidebar",
}: DecisionPipelineProps) {
  const copy = COPY[lang];
  const filtrationRef = useRef<HTMLDivElement>(null);
  const [filtrationActive, setFiltrationActive] = useState(false);
  const [validationFrame, setValidationFrame] = useState(0);
  const [memoryFrame, setMemoryFrame] = useState(0);

  const validationIndex = PIPELINE_ORDER.indexOf("validation");
  const memoryIndex = PIPELINE_ORDER.indexOf("memory");

  const validationLive =
    engineIndex === validationIndex && (analyzing || validationFrame > 0);
  const memoryLive =
    engineIndex === memoryIndex && (analyzing || memoryFrame > 0);

  useEffect(() => {
    if (!validationLive) {
      setValidationFrame(0);
      return;
    }
    const timer = setInterval(() => {
      setValidationFrame((f) => (f + 1) % (VALIDATION_FRAMES.length + 1));
    }, 300);
    return () => clearInterval(timer);
  }, [validationLive]);

  useEffect(() => {
    if (!memoryLive) {
      setMemoryFrame(0);
      return;
    }
    const timer = setInterval(() => {
      setMemoryFrame((f) => Math.min(f + 1, MEMORY_FRAMES.length - 1));
    }, 420);
    return () => clearInterval(timer);
  }, [memoryLive]);

  const checkFiltrationProximity = useCallback(
    (clientX: number, clientY: number) => {
      const el = filtrationRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(clientX - cx, clientY - cy);
      setFiltrationActive(dist < 120);
    },
    [],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      checkFiltrationProximity(e.clientX, e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [checkFiltrationProximity]);

  const wrapClass =
    variant === "sidebar"
      ? "relative z-10 font-mono-field lg:max-w-[14rem] lg:text-left"
      : "relative z-10 w-full font-mono-field";

  function statusLabel(
    key: PipelineKey,
    phase: StagePhase,
  ): string | null {
    if (key === "narration") {
      if (engineIndex >= TERMINAL_STAGE_INDEX && trajectory) return null;
      return copy.pipelineStatus.none;
    }
    if (key === "knowledge" && engineIndex >= TERMINAL_STAGE_INDEX - 1 && trajectory) {
      return trajectory === "true"
        ? copy.pipelineOutcome.modelMatch
        : copy.pipelineOutcome.modelRejected;
    }
    if (phase === "waiting") return copy.pipelineStatus.waiting;
    if (phase === "analyzing") return copy.pipelineStatus.analyzing;
    if (phase === "done") return copy.pipelineStatus.done;
    return copy.pipelineStateLabel[key as StageDisplayKey];
  }

  function renderNarrationOutcome(): ReactNode {
    if (trajectory === "true") {
      return (
        <div className="leading-tight">
          <div className="flex items-baseline gap-1.5 text-xs tracking-[0.14em] sm:text-sm">
            <span aria-hidden="true">●</span>
            <span>{copy.pipelineOutcome.trajectory}</span>
          </div>
          <div className="mt-0.5 pl-4 text-[11px] text-accent/60 sm:text-xs">
            {copy.pipelineOutcome.trajectoryConfirmed}
          </div>
        </div>
      );
    }
    if (trajectory === "false") {
      const pct = hypothesisPercent(attentionSeed);
      return (
        <div className="leading-tight">
          <div className="flex items-baseline gap-1.5 text-xs tracking-[0.14em] sm:text-sm">
            <span aria-hidden="true">≈</span>
            <span>{copy.pipelineOutcome.hypothesis}</span>
          </div>
          <div className="mt-0.5 pl-4 text-[11px] tabular-nums text-accent/60 sm:text-xs">
            {pct}%
          </div>
        </div>
      );
    }
    return (
      <div className="leading-tight">
        <div className="text-xs tracking-[0.14em] opacity-50 sm:text-sm">
          {copy.pipelineOutcome.model}
        </div>
        <div className="mt-0.5 text-[11px] text-accent/45 sm:text-xs">
          {copy.pipelineStatus.waiting}
        </div>
      </div>
    );
  }

  function renderInterferenceBlock(
    match: NonNullable<InterferenceResult>["matches"][0],
  ): ReactNode {
    return (
      <div className="mt-2 space-y-1 text-[10px] leading-relaxed text-accent/55 sm:text-[11px]">
        <div className="tracking-[0.12em] text-accent/70">
          ⟳ {copy.interference.title}
        </div>
        <div>
          {copy.interference.secondarySource} ─► Rejestr.io / KRS:{" "}
          {match.registryEntityKrs}
        </div>
        <div>
          {copy.interference.relation} ─► {copy.interference.sameDominant}:{" "}
          {match.priorLogRef ?? match.priorCitizenPlace}
        </div>
        <div>
          {copy.interference.evidence} ─►{" "}
          {formatEvidenceIndicator(match.evidenceLevel)}
        </div>
        {interference?.griffinDetected && (
          <div className="text-accent/75">
            ↗ {copy.interference.griffin} · {copy.interference.capitalTrajectory}
          </div>
        )}
      </div>
    );
  }

  return (
    <aside className={wrapClass} aria-label="Pipeline">
      {PIPELINE_ORDER.map((key, index) => {
        const isTerminal = key === "narration";
        const phase = resolveStagePhase(
          index,
          engineIndex,
          analyzing,
          isTerminal,
          trajectory,
        );
        const label = copy.pipeline[key];
        const status = statusLabel(key, phase);
        const symbol = statusSymbol(phase);
        const showOutcome =
          isTerminal && engineIndex >= TERMINAL_STAGE_INDEX && trajectory !== null;
        const isFiltration = index === FILTRATION_STAGE_INDEX;

        return (
          <div key={key} ref={isFiltration ? filtrationRef : undefined}>
            <div
              className={`text-sm leading-snug tracking-wide transition-opacity duration-300 sm:text-base ${stageOpacity(phase)} ${stageTextClass(phase, showOutcome)}`}
            >
              {showOutcome ? (
                renderNarrationOutcome()
              ) : (
                <>
                  <span>{label}</span>
                  {status && (
                    <div className="mt-0.5 flex items-baseline gap-1.5 text-[11px] font-normal tracking-normal text-accent/65 sm:text-xs">
                      <span aria-hidden="true">{symbol}</span>
                      <span>{status}</span>
                    </div>
                  )}
                </>
              )}
            </div>

            {isFiltration && filtrationActive && (
              <div
                className="mt-2 space-y-0.5 text-[10px] leading-tight text-accent/50 sm:text-[11px]"
                aria-hidden="true"
              >
                <div>{copy.filtrationFilter.source}</div>
                <div className="tracking-tighter text-accent/35">██████████</div>
                <div className="opacity-40">↓</div>
                <div>◉</div>
                <div className="opacity-40">↓</div>
                <div>{copy.filtrationFilter.oneSignal}</div>
              </div>
            )}

            {key === "validation" &&
              index === engineIndex &&
              (phase === "analyzing" || phase === "active") && (
                <div
                  className="mt-1 text-[10px] tabular-nums tracking-wider text-accent/40 sm:text-[11px]"
                  aria-hidden="true"
                >
                  {validationFrame < VALIDATION_FRAMES.length
                    ? VALIDATION_FRAMES[validationFrame]
                    : copy.pipelineValidationResult}
                </div>
              )}

            {key === "memory" && index === engineIndex && memoryFrame > 0 && (
              <pre
                className="mt-1 whitespace-pre text-[10px] leading-tight text-accent/45 sm:text-[11px]"
                aria-hidden="true"
              >
                {MEMORY_FRAMES[memoryFrame]}
              </pre>
            )}

            {key === "knowledge" &&
              interference?.matches[0] &&
              engineIndex >= PIPELINE_ORDER.indexOf("validation") && (
                <div aria-live="polite">{renderInterferenceBlock(interference.matches[0])}</div>
              )}

            {key === "knowledge" &&
              !interference?.matches[0] &&
              engineIndex >= TERMINAL_STAGE_INDEX - 1 &&
              trajectory &&
              !showOutcome && (
                <div
                  className="mt-1 text-[10px] tracking-wider text-accent/45 sm:text-[11px]"
                  aria-hidden="true"
                >
                  {copy.pipelineOutcome.model}{" "}
                  {trajectory === "true"
                    ? copy.pipelineOutcome.modelMatch
                    : copy.pipelineOutcome.modelRejected}
                </div>
              )}

            {index < PIPELINE_ORDER.length - 1 && (
              <div
                className="py-0.5 text-left text-xs opacity-20 sm:text-sm"
                aria-hidden="true"
              >
                ↓
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
}
