"use client";

import { useMemo, useState } from "react";
import { buildFopDocument } from "../../../lib/fopBridge";
import type { ObservationTracePayload } from "../../../lib/observationTrace";
import type { TraceData } from "../../../lib/traceViewModel";

type TraceTechnicalDumpProps = {
  data: TraceData;
  tracePayload: ObservationTracePayload;
};

/** L3 raw dump — stringify/FOP only after user opens nested details (INP). */
export default function TraceTechnicalDump({ data, tracePayload }: TraceTechnicalDumpProps) {
  const [open, setOpen] = useState(false);

  const rawDump = useMemo(() => {
    if (!open) return "";
    const json = JSON.stringify(data.telemetry.rawJson, null, 2);
    const fop = buildFopDocument(tracePayload);
    return `${json}\n\n${fop}`;
  }, [open, data.telemetry.rawJson, tracePayload]);

  return (
    <details
      className="pt-2"
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary className="cursor-pointer select-none text-accent/45 touch-manipulation">
        [ {data.technicalDetailsLabel} ]
      </summary>
      {open && (
        <pre className="mt-2 max-h-64 overflow-auto text-[11px] leading-relaxed text-accent/50">
          {rawDump}
        </pre>
      )}
    </details>
  );
}
