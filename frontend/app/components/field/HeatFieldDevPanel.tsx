"use client";

import { memo, useState } from "react";
import type { Lang } from "../../../lib/i18n";
import type { HeatCopy } from "../../../lib/field/heatFieldI18n";
import { HEAT_TEMP_C } from "../../../lib/field/heatFieldI18n";
import type { InteractionEvent } from "../../../lib/fira-core/interaction";
import { formatTracePath } from "../../../lib/interactionTrace";
import { formatJourneyBlock, journeyLayerTitle } from "../../../lib/traceJourney";

type HeatFieldDevPanelProps = {
  lang: Lang;
  copy: HeatCopy;
  events: InteractionEvent[];
  traceTick: number;
};

/** L3 — isolated so toggling details does not re-render voice / POI sections (INP). */
function HeatFieldDevPanel({ lang, copy, events, traceTick }: HeatFieldDevPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <details
      className="mt-2 border-t border-accent/10 pt-4"
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary className="cursor-pointer text-sm text-accent/45 touch-manipulation">
        ▼ {copy.technicalData}
      </summary>
      {open && (
        <div className="mt-4 space-y-4 text-xs leading-relaxed text-accent/40">
          {events.length > 0 && (
            <details className="rounded border border-accent/10 bg-field/40 p-3">
              <summary className="cursor-pointer text-sm text-accent/60 touch-manipulation">
                ▼ {journeyLayerTitle(lang)}
              </summary>
              <pre className="mt-3 mb-0 whitespace-pre-wrap text-sm text-accent/65" key={traceTick}>
                {formatJourneyBlock(events, lang).replace(/^▼[^\n]*\n\n/, "")}
              </pre>
            </details>
          )}

          <details className="rounded border border-accent/10 bg-field/40 p-3">
            <summary className="cursor-pointer text-accent/55 touch-manipulation">
              {copy.whyContext}
            </summary>
            <div className="mt-3 space-y-3">
              <div>
                <p className="m-0 mb-1 text-accent/50">{copy.sourcesTitle}</p>
                <p className="m-0">· {copy.knowledgeLink}</p>
              </div>
              <div>
                <p className="m-0 mb-1 text-accent/50">{copy.researchTitle}</p>
                <p className="m-0">· {copy.paperLink}</p>
              </div>
              <details>
                <summary className="cursor-pointer text-accent/45 touch-manipulation">
                  {copy.hypothesisTitle}
                </summary>
                <p className="mt-2 mb-0 italic text-accent/40">{copy.hypothesisHeat}</p>
              </details>
            </div>
          </details>

          <div className="rounded border border-accent/10 bg-field/60 p-3 font-mono-field">
            <div className="mb-1 text-accent/55">{copy.traceTitle}</div>
            <pre className="m-0 whitespace-pre-wrap text-accent/45" key={traceTick}>
              {events.length ? formatTracePath(events) : "—"}
            </pre>
            <p className="mt-2 mb-0 text-accent/35">{copy.devEventCodes}</p>
          </div>

          <div className="space-y-1 font-mono-field text-accent/35">
            <p className="m-0">{copy.layer3Title}</p>
            <p className="m-0">{copy.fopLine}</p>
            <p className="m-0">
              Observation: temp={HEAT_TEMP_C}°C · deployment=warsaw · adapter=web
            </p>
          </div>
        </div>
      )}
    </details>
  );
}

export default memo(HeatFieldDevPanel);
