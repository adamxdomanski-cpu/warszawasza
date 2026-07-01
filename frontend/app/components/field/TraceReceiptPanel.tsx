"use client";

import { useMemo } from "react";
import type { Lang } from "../../../lib/i18n";
import { traceResidentCopy } from "../../../lib/i18n";
import {
  buildMailtoHref,
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
  flash?: string | null;
};

export default function TraceReceiptPanel({
  trace,
  lang,
  presentation,
  onFindHelp,
  findHelpHref,
  onAnother,
  anotherLabel,
  flash,
}: TraceReceiptPanelProps) {
  const rc = traceResidentCopy(lang);
  const data = useMemo(
    () => buildTraceViewModel(trace, { ...presentation, displayLang: lang }),
    [trace, lang, presentation?.heatContext, presentation?.findHelpPath],
  );
  const href = findHelpHref ?? presentation?.findHelpPath ?? "/field/heat#nearby";

  const footer = (
    <div className="mt-2 flex flex-col gap-2">
      <a
        href={buildMailtoHref(trace)}
        className="inline-flex min-h-11 items-center justify-center border border-accent/35 px-3 py-2 text-sm text-ink touch-manipulation"
      >
        {rc.sendByEmailOptional}
      </a>
      {onAnother && anotherLabel && (
        <button
          type="button"
          onClick={onAnother}
          className="inline-flex min-h-11 items-center justify-center border-2 border-accent/45 px-3 py-2 text-sm font-medium text-ink touch-manipulation"
        >
          {anotherLabel}
        </button>
      )}
    </div>
  );

  return (
    <CitizenTrace
      data={data}
      tracePayload={trace}
      flash={flash}
      onNearbyClick={onFindHelp}
      nearbyHref={href}
      footer={footer}
    />
  );
}

export function copyCitizenTraceText(
  trace: ObservationTracePayload,
  presentation?: TracePresentationOptions,
): string {
  return buildTraceCitizenLayer(trace, undefined, presentation);
}
