"use client";

import Link from "next/link";
import {
  buildTraceCitizenLayer,
  buildTraceJourneyLayer,
  buildTraceTechnicalDetails,
  getTraceCitizenView,
  getTraceTechnicalSummary,
  type ObservationTracePayload,
  type TracePresentationOptions,
} from "../../../lib/observationTrace";
import { journeyLayerTitle } from "../../../lib/traceJourney";
import { traceResidentCopy, type Lang } from "../../../lib/i18n";

type TraceReceiptPanelProps = {
  trace: ObservationTracePayload;
  lang: Lang;
  presentation?: TracePresentationOptions;
  onFindHelp?: () => void;
  findHelpHref?: string;
  onAnother?: () => void;
  anotherLabel?: string;
  mailtoHref?: string;
  mailtoLabel?: string;
  flash?: string | null;
};

/**
 * Three-layer trace receipt — L1 visible, L2/L3 behind curtains.
 * Resident · operator · developer each get their own layer.
 */
export default function TraceReceiptPanel({
  trace,
  lang,
  presentation,
  onFindHelp,
  findHelpHref,
  onAnother,
  anotherLabel,
  mailtoHref,
  mailtoLabel,
  flash,
}: TraceReceiptPanelProps) {
  const rc = traceResidentCopy(lang);
  const citizen = getTraceCitizenView(trace, presentation);
  const journey = buildTraceJourneyLayer(trace);
  const summary = getTraceTechnicalSummary(trace);
  const technicalDetails = buildTraceTechnicalDetails(trace);
  const href = findHelpHref ?? citizen.findHelpPath;

  return (
    <div className="space-y-4">
      {/* Layer 1 — resident */}
      <section
        aria-label={citizen.headline}
        className="rounded border-2 border-accent/40 bg-field px-4 py-5 sm:px-5"
      >
        <p className="m-0 text-lg font-medium text-ink">{citizen.headline}</p>
        <p className="mt-2 mb-0 text-sm text-accent/75">{citizen.placeLine}</p>

        {citizen.description && (
          <div className="mt-4">
            <p className="m-0 text-xs text-accent/55">{citizen.descriptionLabel}</p>
            <blockquote className="mt-1 mb-0 border-l-2 border-accent/25 pl-3 text-sm leading-relaxed text-ink">
              „{citizen.description}"
            </blockquote>
          </div>
        )}

        <div className="mt-4">
          <p className="m-0 text-xs text-accent/55">{citizen.statusLabel}</p>
          <p className="mt-0.5 mb-0 text-sm text-ink">{citizen.statusLine}</p>
        </div>

        {citizen.heatGuidance && (
          <p className="mt-4 mb-0 whitespace-pre-line text-sm leading-relaxed text-accent/75">
            {citizen.heatGuidance}
          </p>
        )}

        {flash && <p className="mt-3 mb-0 text-xs text-accent/60">{flash}</p>}

        {citizen.heatGuidance && (
          <div className="mt-4">
            {onFindHelp ? (
              <button
                type="button"
                onClick={onFindHelp}
                className="min-h-12 w-full touch-manipulation border-2 border-accent/45 bg-field px-4 py-3 text-left text-sm font-medium text-ink"
              >
                {citizen.nearbyCta}
              </button>
            ) : (
              <Link
                href={href}
                className="flex min-h-12 w-full items-center touch-manipulation border-2 border-accent/45 bg-field px-4 py-3 text-sm font-medium text-ink"
              >
                {citizen.nearbyCta}
              </Link>
            )}
          </div>
        )}
      </section>

      {/* Layer 2 — operator */}
      {journey && (
        <details className="border border-accent/20 bg-field/80 px-4 py-3">
          <summary className="cursor-pointer text-sm text-accent/70 touch-manipulation">
            ▼ {journeyLayerTitle(lang)}
          </summary>
          <pre className="mt-3 mb-0 whitespace-pre-wrap font-sans text-sm leading-relaxed text-accent/75">
            {journey}
          </pre>
        </details>
      )}

      {/* Layer 3 — developer summary + nested details */}
      <details className="border border-accent/15 bg-field/60 px-4 py-3">
        <summary className="cursor-pointer text-sm text-accent/50 touch-manipulation">
          ▼ {rc.technicalData}
        </summary>
        <dl className="mt-3 mb-0 space-y-2 font-mono-field text-xs text-accent/55">
          <div>
            <dt className="inline font-medium text-accent/65">{rc.traceIdLabel}: </dt>
            <dd className="inline">{summary.traceId}</dd>
          </div>
          <div>
            <dt className="inline font-medium text-accent/65">{summary.pipelineLabel}: </dt>
            <dd className="inline">{summary.pipelineValue}</dd>
          </div>
          <div>
            <dt className="inline font-medium text-accent/65">{summary.telemetryLabel}: </dt>
            <dd className="inline">{summary.telemetryValue}</dd>
          </div>
          <div>
            <dt className="inline font-medium text-accent/65">{summary.eventLogLabel}: </dt>
            <dd className="inline break-all">{summary.eventLogValue}</dd>
          </div>
        </dl>

        <details className="mt-4 rounded border border-accent/10 bg-field/40 px-3 py-2">
          <summary className="cursor-pointer text-xs text-accent/45 touch-manipulation">
            ▼ {rc.technicalDetails}
          </summary>
          <pre className="mt-3 mb-0 max-h-80 overflow-auto whitespace-pre-wrap text-[11px] leading-relaxed text-accent/40">
            {technicalDetails}
          </pre>
        </details>
      </details>

      {(onAnother || mailtoHref) && (
        <div className="flex flex-col gap-2">
          {onAnother && anotherLabel && (
            <button
              type="button"
              onClick={onAnother}
              className="inline-flex min-h-11 items-center border border-accent/25 px-3 py-2 text-sm text-accent/75 touch-manipulation"
            >
              {anotherLabel}
            </button>
          )}
          {mailtoHref && mailtoLabel && (
            <a
              href={mailtoHref}
              className="text-[11px] tracking-wide text-accent/40 underline touch-manipulation"
            >
              {mailtoLabel}
            </a>
          )}
        </div>
      )}
    </div>
  );
}

/** Clipboard text — L1 only. */
export function copyCitizenTraceText(
  trace: ObservationTracePayload,
  presentation?: TracePresentationOptions,
): string {
  return buildTraceCitizenLayer(trace, undefined, presentation);
}
