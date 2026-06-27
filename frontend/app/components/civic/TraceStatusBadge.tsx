"use client";

import type { Lang } from "../../../lib/i18n";
import { traceArtifactCopy } from "../../../lib/i18n";

export type LayerZeroDisplayStatus = "UNVERIFIED" | "DISPATCHED" | "RESOLVED" | "EXPIRED";

type TraceStatusBadgeProps = {
  lang?: Lang;
  isPipelineValid: boolean;
  layerZeroStatus: LayerZeroDisplayStatus;
  urgency?: boolean;
};

export default function TraceStatusBadge({
  lang = "pl",
  isPipelineValid,
  layerZeroStatus,
  urgency = false,
}: TraceStatusBadgeProps) {
  const copy = traceArtifactCopy(lang);

  const layerZeroLabel =
    layerZeroStatus === "UNVERIFIED"
      ? copy.statusTerrainUnverified.replace(/^STAN TERENOWY[^:]*:\s*/i, "")
      : layerZeroStatus === "RESOLVED"
        ? copy.statusTerrainVerified.replace(/^STAN TERENOWY[^:]*:\s*/i, "")
        : layerZeroStatus;

  return (
    <div
      className={`space-y-2 rounded border p-4 font-mono-field text-xs sm:text-sm ${
        urgency ? "border-red-500/40 bg-red-950/15" : "border-accent/20 bg-black/25"
      }`}
      role="status"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 text-accent/55">
        <span>{copy.statusPipelineVerified.split(":")[0]}:</span>
        <span className={isPipelineValid ? "text-emerald-400" : "text-amber-400"}>
          {isPipelineValid ? "✓ INTEGRALNY" : "⚠ USZKODZONY"}
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-accent/15 pt-2">
        <span className="font-semibold text-accent/85">
          {copy.statusTerrainUnverified.split(":")[0]}:
        </span>
        <span
          className={`rounded px-2 py-0.5 font-semibold ${
            layerZeroStatus === "UNVERIFIED"
              ? "bg-amber-500/15 text-amber-300"
              : layerZeroStatus === "RESOLVED"
                ? "bg-emerald-500/15 text-emerald-300"
                : "bg-accent/10 text-accent/70"
          }`}
        >
          ● {layerZeroLabel}
        </span>
      </div>
    </div>
  );
}
