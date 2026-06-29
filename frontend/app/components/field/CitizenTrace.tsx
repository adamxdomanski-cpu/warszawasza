"use client";

import Link from "next/link";
import { useState } from "react";
import type { TraceData } from "../../../lib/traceViewModel";

type CitizenTraceProps = {
  data: TraceData;
  onNearbyClick?: () => void;
  nearbyHref?: string;
  flash?: string | null;
  footer?: React.ReactNode;
};

/**
 * Three-layer citizen trace — presentational only.
 * L1: answer · L2: process · L3: diagnostics (JSON/FOP nested).
 */
export default function CitizenTrace({
  data,
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
      {/* Layer 1 — resident */}
      <main className="space-y-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-lg font-medium text-ink">
            <span aria-hidden>✓</span>
            <span>{data.headline}</span>
          </div>
          <p className="m-0 text-sm text-accent/70">
            {data.location} · {data.timestamp}
          </p>
        </div>

        {data.description && (
          <div className="space-y-1">
            <p className="m-0 text-xs font-medium uppercase tracking-wide text-accent/50">
              {data.descriptionLabel}
            </p>
            <p className="m-0 text-base leading-relaxed text-ink italic">
              „{data.description}"
            </p>
          </div>
        )}

        <p className="m-0 text-sm text-accent/70">
          {data.statusLabel}{" "}
          <span className={`font-semibold ${statusTone}`}>{data.statusText}</span>
        </p>

        {(data.heatGuidance || data.nearbyCta) && (
          <div className="space-y-4 pt-2">
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
                  className="block w-full min-h-12 touch-manipulation rounded border-2 border-accent/50 bg-ink px-4 py-3 text-center text-sm font-medium text-field transition-opacity active:opacity-90"
                >
                  {data.nearbyCta}
                </button>
              ) : (
                <Link
                  href={nearbyHref}
                  className="block w-full min-h-12 touch-manipulation rounded border-2 border-accent/50 bg-ink px-4 py-3 text-center text-sm font-medium text-field transition-opacity active:opacity-90"
                >
                  {data.nearbyCta}
                </Link>
              ))}
          </div>
        )}

        {flash && <p className="m-0 text-xs text-accent/60">{flash}</p>}
      </main>

      {/* Layers 2 + 3 — frameless curtains */}
      <footer className="space-y-4 pt-2 text-sm">
        <div>
          <button
            type="button"
            aria-expanded={showProcess}
            onClick={() => setShowProcess((v) => !v)}
            className="flex w-full items-center justify-between py-2 text-left font-medium text-accent/75 transition-colors touch-manipulation"
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
                    {step.state === "done" ? "✓" : "●"}
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
            className="flex w-full items-center justify-between py-2 text-left font-mono-field text-xs text-accent/55 transition-colors touch-manipulation"
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
                <span className="text-accent/45">Pipeline:</span> Spójność{" "}
                {data.telemetry.pipelineScore}
              </div>
              <div>
                <span className="text-accent/45">Telemetria:</span> {data.telemetry.chain}
              </div>
              <div>
                <span className="text-accent/45">Log zdarzeń:</span>{" "}
                <span className="text-accent/55">{data.telemetry.steps.join(" → ")}</span>
              </div>

              <details className="group pt-2">
                <summary className="cursor-pointer select-none text-accent/45 touch-manipulation hover:text-accent/60">
                  [ {data.technicalDetailsLabel} ]
                </summary>
                <pre className="mt-2 max-h-64 overflow-auto text-[11px] leading-relaxed text-accent/50">
                  {JSON.stringify(data.telemetry.rawJson, null, 2)}
                  {"\n\n"}
                  {data.telemetry.rawFop}
                </pre>
              </details>
            </div>
          )}
        </div>

        {footer}
      </footer>
    </div>
  );
}
