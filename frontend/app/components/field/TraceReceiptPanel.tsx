"use client";

import type { Lang } from "../../../lib/i18n";
import {
  buildTraceCitizenLayer,
  type ObservationTracePayload,
  type TracePresentationOptions,
} from "../../../lib/observationTrace";
import { buildTraceViewModel } from "../../../lib/traceViewModel";
import CitizenTrace from "./CitizenTrace";

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
 * Adapter: ObservationTracePayload → CitizenTrace (three layers).
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
  const data = buildTraceViewModel({ ...trace, lang }, presentation);
  const href = findHelpHref ?? presentation?.findHelpPath ?? "/field/heat#nearby";

  const footer =
    onAnother || mailtoHref ? (
      <div className="mt-4 flex flex-col gap-2">
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
    ) : null;

  return (
    <CitizenTrace
      data={data}
      flash={flash}
      onNearbyClick={onFindHelp}
      nearbyHref={href}
      footer={footer}
    />
  );
}

/** Clipboard text — L1 only. */
export function copyCitizenTraceText(
  trace: ObservationTracePayload,
  presentation?: TracePresentationOptions,
): string {
  return buildTraceCitizenLayer(trace, undefined, presentation);
}
