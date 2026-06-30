"use client";

import Link from "next/link";
import { useState } from "react";
import { STATE, SEMANTIC } from "../../../lib/symbols";
import type { ObservationTracePayload } from "../../../lib/observationTrace";
import type { TraceData } from "../../../lib/traceViewModel";
import TraceTechnicalDump from "./TraceTechnicalDump";

type CitizenTraceProps = {
  data: TraceData;
  tracePayload?: ObservationTracePayload;
  onNearbyClick?: () => void;
  nearbyHref?: string;
  flash?: string | null;
  footer?: React.ReactNode;
};

/** Three layers — L1 confirmation · L2 process · L3 technical (collapsed). */
export default function CitizenTrace({
  data,
  tracePayload,
  onNearbyClick,
  nearbyHref = "#nearby",
  flash,
  footer,
}: CitizenTraceProps) {
  const [showProcess, setShowProcess] = useState(false);
  const [showTech, setShowTech] = useState(false);

  const statusTone =
    data.status === "VERIFIED"
      ? "text-[var(--color-warsaw-shade)]"
      : data.status === "CLOSED"
        ? "text-accent/60"
        : "text-[var(--color-warsaw-heat-critical)]";

  return (
    <div className="flex flex-col gap-6">
      <main className="space-y-4">
        <div className="space-y-1">
          <p className="m-0 text-lg font-medium text-ink">{data.headline}</p>
          <p className="m-0 font-mono-field text-sm text-accent/75">{data.traceReferenceLine}</p>
          <p className="m-0 text-sm text-accent/70">
            {data.location} · {data.timestamp}
          </p>
        </div>

        <p className="m-0 text-sm text-accent/70">
          {data.statusLabel}{" "}
          <span className={`font-semibold ${statusTone}`}>{data.statusText}</span>
        </p>

        {data.description && (
          <p className="m-0 text-sm italic leading-relaxed text-accent/80">
            „{data.description}"
          </p>
        )}

        <p className="m-0 text-sm text-ink">{data.savedConfirmation}</p>

        {(data.heatGuidance || data.nearbyCta) && (
          <div className="space-y-3 pt-1">
            {data.heatGuidance && (
              <p className="m-0 whitespace-pre-line text-sm leading-relaxed text-accent/75">
                {data.heatGuidance}
              </p>
            )}
            {data.nearbyCta &&
              (onNearbyClick ? (
                <button
                  type="button"
                  onClick={onNearbyClick}
                  className="block w-full min-h-12 touch-manipulation rounded border-2 border-accent/50 bg-ink px-4 py-3 text-center text-sm font-medium text-field active:opacity-90"
                >
                  {data.nearbyCta}
                </button>
              ) : (
                <Link
                  href={nearbyHref}
                  className="block w-full min-h-12 touch-manipulation rounded border-2 border-accent/50 bg-ink px-4 py-3 text-center text-sm font-medium text-field active:opacity-90"
                >
                  {data.nearbyCta}
                </Link>
              ))}
          </div>
        )}

        {flash && <p className="m-0 text-xs text-accent/60">{flash}</p>}
      </main>

      <footer className="space-y-4 pt-2 text-sm">
        <div>
          <button
            type="button"
            aria-expanded={showProcess}
            onClick={() => setShowProcess((v) => !v)}
            className="flex w-full items-center justify-between py-2 text-left font-medium text-accent/75 touch-manipulation"
          >
            <span>▼ {data.processTitle}</span>
            <span
              className={`text-xs transition-transform ${showProcess ? "rotate-180" : ""}`}
              aria-hidden
            >
              ▼
            </span>
          </button>
          {showProcess && (
            <ul className="space-y-3 py-2 text-accent/80">
              {data.processSteps.map((step) => (
                <li key={step.text} className="flex gap-2">
                  <span
                    className={
                      step.state === "done"
                        ? "text-[var(--color-warsaw-shade)]"
                        : "text-[var(--color-warsaw-heat-critical)]"
                    }
                    aria-hidden
                  >
                    {step.state === "done" ? SEMANTIC.validation : STATE.active}
                  </span>
                  <span>{step.text}</span>
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
            className="flex w-full items-center justify-between py-2 text-left font-mono-field text-xs text-accent/55 touch-manipulation"
          >
            <span>▼ {data.technicalTitle}</span>
            <span
              className={`transition-transform ${showTech ? "rotate-180" : ""}`}
              aria-hidden
            >
              ▼
            </span>
          </button>
          {showTech && (
            <div className="space-y-3 overflow-x-auto py-2 font-mono-field text-xs text-accent/70">
              <div>
                <span className="text-accent/45">Trace ID:</span> {data.id}
              </div>
              <div>
                <span className="text-accent/45">Pipeline:</span> {data.telemetry.pipelineScore}
              </div>
              <div>
                <span className="text-accent/45">Telemetria:</span> {data.telemetry.chain}
              </div>
              <div>
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
