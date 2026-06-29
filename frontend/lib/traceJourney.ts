/**
 * Human-readable journey steps for operator layer — no event codes.
 */

import type { InteractionEvent } from "./fira-core/interaction";
import type { Lang } from "./i18n";
import { pickLangCopy } from "./localeMap";

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
  startOver: string;
  copied: string;
};

const COPY: Partial<Record<Lang, JourneyCopy>> = {
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
    startOver: "Od nowa",
    copied: "Skopiowano potwierdzenie",
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
    startOver: "Start over",
    copied: "Confirmation copied",
  },
  it: {
    title: "Come è stata elaborata la segnalazione?",
    start: "Inizio",
    recordStart: "Registrazione avviata",
    recordStop: "Registrazione terminata",
    locationSelected: "Località selezionata",
    helpNearby: "Cerca aiuto nelle vicinanze",
    pointSelected: "Punto sulla mappa selezionato",
    confirmed: "Confermato",
    rejected: "Rifiutato",
    review: "Revisione prima dell'invio",
    sent: "Inviato",
    completed: "Completato",
    next: "Avanti",
    typed: "Testo inserito",
    startOver: "Ricomincia",
    copied: "Conferma copiata",
  },
  uk: {
    title: "Як оброблялося звернення?",
    start: "Початок",
    recordStart: "Запис розпочато",
    recordStop: "Запис завершено",
    locationSelected: "Локацію обрано",
    helpNearby: "Шукаєте допомогу поруч",
    pointSelected: "Обрано точку на мапі",
    confirmed: "Підтверджено",
    rejected: "Відхилено",
    review: "Перевірка перед відправкою",
    sent: "Надіслано",
    completed: "Завершено",
    next: "Далі",
    typed: "Текст введено",
    startOver: "Спочатку",
    copied: "Підтвердження скопійовано",
  },
  hu: {
    title: "Hogyan dolgoztuk fel a bejelentést?",
    start: "Kezdet",
    recordStart: "Felvétel elindítva",
    recordStop: "Felvétel leállítva",
    locationSelected: "Hely kiválasztva",
    helpNearby: "Segítség keresése a közelben",
    pointSelected: "Térképpont kiválasztva",
    confirmed: "Megerősítve",
    rejected: "Elutasítva",
    review: "Ellenőrzés küldés előtt",
    sent: "Elküldve",
    completed: "Befejezve",
    next: "Tovább",
    typed: "Szöveg megadva",
    startOver: "Újrakezdés",
    copied: "Megerősítés másolva",
  },
};

function journeyCopy(lang: Lang): JourneyCopy {
  return pickLangCopy(COPY, lang, COPY.en!);
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
  return steps;
}

export function journeyLayerTitle(lang: Lang): string {
  return journeyCopy(lang).title;
}

export function journeyUiCopy(lang: Lang): Pick<JourneyCopy, "startOver" | "copied"> {
  const jc = journeyCopy(lang);
  return { startOver: jc.startOver, copied: jc.copied };
}

/** Plain-text journey block for export / UI. */
export function formatJourneyBlock(events: InteractionEvent[], lang: Lang): string {
  const jc = journeyCopy(lang);
  const steps = buildJourneySteps(events, lang);
  if (steps.length === 0) return "";
  const lines = [`▼ ${jc.title}`, "", ...steps.flatMap((s, i) => (i === 0 ? [s] : ["↓", s]))];
  return lines.join("\n");
}
