"use client";

import Link from "next/link";
import { useState } from "react";
import { STATE, SEMANTIC } from "../../../lib/symbols";
import type { Lang } from "../../../lib/i18n";
import { traceResidentCopy } from "../../../lib/i18n";
import type { ObservationTracePayload } from "../../../lib/observationTrace";
import type { TraceData } from "../../../lib/traceViewModel";
import TraceTechnicalDump from "./TraceTechnicalDump";

const DESCRIPTION_PREVIEW_CHARS = 140;

type CitizenTraceProps = {
  data: TraceData;
  lang?: Lang;
  tracePayload?: ObservationTracePayload;
  onNearbyClick?: () => void;
  nearbyHref?: string;
  flash?: string | null;
  footer?: React.ReactNode;
};

function TraceDescription({
  text,
  showFullLabel,
}: {
  text: string;
  showFullLabel: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const needsClamp = text.length > DESCRIPTION_PREVIEW_CHARS;
  const visible =
    expanded || !needsClamp
      ? text
      : `${text.slice(0, DESCRIPTION_PREVIEW_CHARS).trimEnd()}…`;

  return (
    <div className="field-text-wrap min-w-0 max-w-full">
      <p className="field-text-wrap m-0 text-sm italic leading-relaxed text-accent/80">
        „{visible}"
      </p>
      {needsClamp && !expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-1 min-h-11 text-sm text-accent/65 touch-manipulation"
        >
          {showFullLabel}
        </button>
      )}
    </div>
  );
}

/** Three layers — L1 confirmation · L2 process · L3 technical (collapsed). */
export default function CitizenTrace({
  data,
  lang = "pl",
  tracePayload,
  onNearbyClick,
  nearbyHref = "#nearby",
  flash,
  footer,
}: CitizenTraceProps) {
  const rc = traceResidentCopy(lang);
  const [showProcess, setShowProcess] = useState(false);
  const [showTech, setShowTech] = useState(false);

  const statusTone =
    data.status === "VERIFIED"
      ? "text-[var(--color-warsaw-shade)]"
      : data.status === "CLOSED"
        ? "text-accent/60"
        : "text-[var(--color-warsaw-heat-critical)]";

  return (
    <div className="flex min-w-0 max-w-full flex-col gap-6 overflow-x-clip">
      <main className="min-w-0 space-y-4">
        <div className="field-text-wrap min-w-0 space-y-1">
          <p className="field-text-wrap m-0 text-lg font-medium text-ink">{data.headline}</p>
          <p className="field-text-wrap m-0 break-all font-mono-field text-sm text-accent/75">
            {data.traceReferenceLine}
          </p>
          <p className="field-text-wrap m-0 text-sm text-accent/70">
            <span className="break-words">{data.location}</span>
            <span className="whitespace-nowrap"> · {data.timestamp}</span>
          </p>
        </div>

        <p className="field-text-wrap m-0 text-sm text-accent/70">
          {data.statusLabel}{" "}
          <span className={`font-semibold ${statusTone}`}>{data.statusText}</span>
        </p>

        {data.description && (
          <TraceDescription
            text={data.description}
            showFullLabel={rc.descriptionShowFull ?? "Show full"}
          />
        )}

        <p className="field-text-wrap m-0 text-sm text-ink">{data.savedConfirmation}</p>
        <p className="field-text-wrap m-0 text-sm text-accent/65">{data.emailNote}</p>

        {(data.heatGuidance || data.nearbyCta) && (
          <div className="min-w-0 space-y-3 pt-1">
            {data.heatGuidance && (
              <p className="field-text-wrap m-0 whitespace-pre-line text-sm leading-relaxed text-accent/75">
                {data.heatGuidance}
              </p>
            )}
            {data.nearbyCta &&
              (onNearbyClick ? (
                <button
                  type="button"
                  onClick={onNearbyClick}
                  className="field-text-wrap block w-full min-h-12 min-w-0 touch-manipulation rounded border-2 border-accent/50 bg-ink px-4 py-3 text-center text-sm font-medium text-field active:opacity-90"
                >
                  {data.nearbyCta}
                </button>
              ) : (
                <Link
                  href={nearbyHref}
                  className="field-text-wrap block w-full min-h-12 min-w-0 touch-manipulation rounded border-2 border-accent/50 bg-ink px-4 py-3 text-center text-sm font-medium text-field active:opacity-90"
                >
                  {data.nearbyCta}
                </Link>
              ))}
          </div>
        )}

        {flash && <p className="field-text-wrap m-0 text-xs text-accent/60">{flash}</p>}
      </main>

      <footer className="min-w-0 space-y-4 pt-2 text-sm">
        <div>
          <button
            type="button"
            aria-expanded={showProcess}
            onClick={() => setShowProcess((v) => !v)}
            className="flex w-full min-w-0 items-center justify-between gap-2 py-2 text-left font-medium text-accent/75 touch-manipulation"
          >
            <span className="field-text-wrap min-w-0 flex-1">▼ {data.processTitle}</span>
            <span
              className={`shrink-0 text-xs transition-transform ${showProcess ? "rotate-180" : ""}`}
              aria-hidden
            >
              ▼
            </span>
          </button>
          {showProcess && (
            <ul className="space-y-3 py-2 text-accent/80">
              {data.processSteps.map((step) => (
                <li key={step.text} className="flex min-w-0 gap-2">
                  <span
                    className={
                      step.state === "done"
                        ? "shrink-0 text-[var(--color-warsaw-shade)]"
                        : "shrink-0 text-[var(--color-warsaw-heat-critical)]"
                    }
                    aria-hidden
                  >
                    {step.state === "done" ? SEMANTIC.validation : STATE.active}
                  </span>
                  <span className="field-text-wrap min-w-0 flex-1">{step.text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <button
            type="button"
            aria-expanded={showTech}
            onClick={() => setShowTech((v) => !v)}
            className="flex w-full min-w-0 items-center justify-between gap-2 py-2 text-left font-mono-field text-xs text-accent/55 touch-manipulation"
          >
            <span className="field-text-wrap min-w-0 flex-1">▼ {data.technicalTitle}</span>
            <span
              className={`shrink-0 transition-transform ${showTech ? "rotate-180" : ""}`}
              aria-hidden
            >
              ▼
            </span>
          </button>
          {showTech && (
            <div className="space-y-3 overflow-x-auto py-2 font-mono-field text-xs text-accent/70">
              <div className="break-all">
                <span className="text-accent/45">Trace ID:</span> {data.id}
              </div>
              <div className="break-all">
                <span className="text-accent/45">Pipeline:</span> {data.telemetry.pipelineScore}
              </div>
              <div className="break-all">
                <span className="text-accent/45">Telemetria:</span> {data.telemetry.chain}
              </div>
              <div className="break-all">
                <span className="text-accent/45">Log:</span>{" "}
                {data.telemetry.steps.join(" → ")}
              </div>
              {tracePayload && (
                <TraceTechnicalDump data={data} tracePayload={tracePayload} />
              )}
            </div>
          )}
        </div>

        {footer}
      </footer>
    </div>
  );
}
