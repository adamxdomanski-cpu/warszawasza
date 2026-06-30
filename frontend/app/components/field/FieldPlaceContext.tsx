"use client";

import { useEffect, useState } from "react";
import type { Lang } from "../../../lib/i18n";
import { formatYouAreIn, fetchPlaceLabel } from "../../../lib/field/placeLabel";
import { readPositionIfGranted } from "../../../lib/field/voiceGeoCopy";

type FieldPlaceContextProps = {
  lang: Lang;
};

/** Shows local place when geolocation was already granted — never prompts on first visit. */
export default function FieldPlaceContext({ lang }: FieldPlaceContextProps) {
  const [line, setLine] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const point = await readPositionIfGranted();
      if (!point || cancelled) return;
      const label = await fetchPlaceLabel(point.lat, point.lng, lang);
      if (!label || cancelled) return;
      setLine(formatYouAreIn(lang, label));
    })();

    return () => {
      cancelled = true;
    };
  }, [lang]);

  if (!line) return null;

  return (
    <p className="field-text-wrap m-0 text-sm text-accent/70" aria-live="polite">
      {line}
    </p>
  );
}
