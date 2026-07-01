"use client";

import { memo } from "react";
import {
  HEAT_POINTS,
  formatDistance,
  type HeatCopy,
} from "../../../lib/field/heatFieldI18n";

type HeatNearbySectionProps = {
  copy: HeatCopy;
  onPoint: (selectValue: string) => void;
};

function HeatNearbySection({ copy, onPoint }: HeatNearbySectionProps) {
  return (
    <>
      <h2 className="mb-4 text-base font-normal text-ink/90">{copy.layer2Title}</h2>
      <div className="flex flex-col gap-2">
        {HEAT_POINTS.map((point) => {
          const labels = copy.pointLabels[point.id];
          const ok = point.status === "ok";
          return (
            <button
              key={point.id}
              type="button"
              onClick={() => onPoint(point.selectValue)}
              className="flex min-h-11 w-full touch-manipulation items-start gap-3 border border-accent/20 bg-field/80 px-4 py-3 text-left"
            >
              <span
                className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                  ok
                    ? point.kind === "shade"
                      ? "bg-[var(--color-warsaw-shade)]"
                      : point.kind === "water"
                        ? "bg-[var(--color-warsaw-water)]"
                        : "bg-citrus"
                    : "bg-[var(--color-warsaw-heat-critical)]"
                }`}
                aria-hidden
              />
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-sm leading-snug">{labels.name}</span>
                  <span className="shrink-0 text-xs tabular-nums text-accent/55">
                    {formatDistance(copy, point.distanceM, point.walkMin)}
                  </span>
                </span>
                <span className="text-xs text-accent/65">
                  {labels.kindLabel} · {ok ? labels.statusOk : labels.statusFail} · {labels.action}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}

export default memo(HeatNearbySection);
