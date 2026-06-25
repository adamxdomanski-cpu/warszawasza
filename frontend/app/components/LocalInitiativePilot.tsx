"use client";

import type { Lang } from "../../lib/i18n";
import { COPY } from "../../lib/i18n";
import {
  LOCAL_INITIATIVE_PILOT,
  focusAreaDisplayName,
} from "../../lib/localInitiativeRegistry";

type LocalInitiativePilotProps = {
  lang: Lang;
  className?: string;
};

export default function LocalInitiativePilot({
  lang,
  className = "",
}: LocalInitiativePilotProps) {
  const copy = COPY[lang];
  const pilot = LOCAL_INITIATIVE_PILOT;
  const focusLabel = focusAreaDisplayName(pilot.focusAreaSlug, lang);

  return (
    <section
      className={`font-mono-field text-xs leading-relaxed sm:text-sm ${className}`}
      aria-label={copy.localInitiative.title}
    >
      <div className="text-accent/55 tracking-[0.12em] uppercase">
        {copy.localInitiative.title}
      </div>
      <div className="mt-2 space-y-1 text-accent/85">
        <div>{pilot.partnerLabel}</div>
        <div className="text-accent/45">↓ {focusLabel}</div>
        <div className="text-accent/45">↓ {pilot.address}</div>
        <div className="text-accent/45">
          ↓ {copy.localInitiative.statusLabel}: {pilot.status}
        </div>
      </div>
    </section>
  );
}
