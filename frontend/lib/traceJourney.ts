/**
 * Human-readable journey steps for operator layer — no event codes.
 */

import type { InteractionEvent } from "./fira-core/interaction";
import type { Lang } from "./i18n";

type JourneyCopy = {
  title: string;
  start: string;
  recordStart: string;
  recordStop: string;
  locationSelected: string;
  helpNearby: string;
  pointSelected: string;
  confirmed: string;
  rejected: string;
  review: string;
  sent: string;
  completed: string;
  next: string;
  typed: string;
};

const COPY: Record<"pl" | "en", JourneyCopy> = {
  pl: {
    title: "Jak przebiegało zgłoszenie?",
    start: "Start",
    recordStart: "Nagrywanie rozpoczęte",
    recordStop: "Nagrywanie zakończone",
    locationSelected: "Wybrano lokalizację",
    helpNearby: "Szukasz pomocy w pobliżu",
    pointSelected: "Wybrano punkt na mapie",
    confirmed: "Potwierdzono",
    rejected: "Odrzucono",
    review: "Przegląd przed wysłaniem",
    sent: "Wysłano",
    completed: "Zakończono",
    next: "Dalej",
    typed: "Wpisano tekst",
  },
  en: {
    title: "How was this observation processed?",
    start: "Start",
    recordStart: "Recording started",
    recordStop: "Recording stopped",
    locationSelected: "Location selected",
    helpNearby: "Finding help nearby",
    pointSelected: "Map point selected",
    confirmed: "Confirmed",
    rejected: "Rejected",
    review: "Review before send",
    sent: "Sent",
    completed: "Completed",
    next: "Next",
    typed: "Text entered",
  },
};

function journeyCopy(lang: Lang): JourneyCopy {
  return lang === "pl" ? COPY.pl : COPY.en;
}

function labelSelect(value: string, jc: JourneyCopy): string {
  if (value === "MOKOTOW") return jc.locationSelected;
  if (value === "POMOC_W_POBLIZU") return jc.helpNearby;
  if (value === "TRUE") return jc.confirmed;
  if (value === "FALSE") return jc.rejected;
  if (value.startsWith("HYDRANT_") || value.startsWith("BIBLIOTHEK_") || value.startsWith("METRO_")) {
    return jc.pointSelected;
  }
  return jc.locationSelected;
}

/** Map one interaction event to a human step; null = skip in journey. */
export function journeyStepLabel(event: InteractionEvent, lang: Lang): string | null {
  const jc = journeyCopy(lang);
  switch (event.event) {
    case "START":
      return jc.start;
    case "RECORD":
      return event.value === "stop" ? jc.recordStop : jc.recordStart;
    case "SELECT":
      return event.value ? labelSelect(event.value, jc) : jc.locationSelected;
    case "CHANGE":
      return event.value?.trim() ? jc.review : jc.typed;
    case "NEXT":
      return jc.next;
    case "COMPLETE":
      return jc.completed;
    default:
      return null;
  }
}

/** Ordered human steps for operator / journey export. */
export function buildJourneySteps(events: InteractionEvent[], lang: Lang): string[] {
  const steps: string[] = [];
  for (const e of events) {
    const label = journeyStepLabel(e, lang);
    if (label && steps[steps.length - 1] !== label) {
      steps.push(label);
    }
  }
  if (steps.length > 0 && steps[steps.length - 1] !== journeyCopy(lang).completed) {
    const hasComplete = events.some((e) => e.event === "COMPLETE");
    if (hasComplete && !steps.includes(journeyCopy(lang).completed)) {
      /* COMPLETE already mapped */
    }
  }
  return steps;
}

export function journeyLayerTitle(lang: Lang): string {
  return journeyCopy(lang).title;
}

/** Plain-text journey block for export / UI. */
export function formatJourneyBlock(events: InteractionEvent[], lang: Lang): string {
  const jc = journeyCopy(lang);
  const steps = buildJourneySteps(events, lang);
  if (steps.length === 0) return "";
  const lines = [`▼ ${jc.title}`, "", ...steps.flatMap((s, i) => (i === 0 ? [s] : ["↓", s]))];
  return lines.join("\n");
}
