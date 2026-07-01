/**
 * Layer 2 — operator process narrative. No event codes, no citizen quote (L1 owns that).
 */

import type { InteractionEvent } from "./fira-core/interaction";
import type { Lang } from "./i18n";
import { pickLangCopy } from "./localeMap";
import { isUnknownCitizenPlace } from "./field/citizenPlace";
import type { ObservationTracePayload } from "./observationTrace";

type OperatorCopy = {
  title: string;
  stepReceived: string;
  stepLocated: string;
  stepNoGps: string;
  stepListening: string;
  startOver: string;
  copied: string;
};

const COPY: Partial<Record<Lang, OperatorCopy>> = {
  pl: {
    title: "Jak przetwarzamy to zgłoszenie?",
    stepReceived: "Odebraliśmy zgłoszenie z kanału obywatelskiego.",
    stepLocated: "Zlokalizowaliśmy obszar i przypisaliśmy punkt odniesienia.",
    stepNoGps: "Brak GPS — nie przypisano współrzędnych; punkt odniesienia to studio (anchor).",
    stepListening: "Uruchomiliśmy nasłuch i czekamy na potwierdzenie z terenu.",
    startOver: "Od nowa",
    copied: "Skopiowano potwierdzenie",
  },
  en: {
    title: "How we process this report",
    stepReceived: "We received the report from the citizen channel.",
    stepLocated: "We located the area and assigned a reference point.",
    stepNoGps: "No GPS — no coordinates assigned; reference point is studio anchor.",
    stepListening: "Listening is active — awaiting field confirmation.",
    startOver: "Start over",
    copied: "Confirmation copied",
  },
  it: {
    title: "Come elaboriamo questa segnalazione",
    stepReceived: "Abbiamo ricevuto la segnalazione dal canale cittadino.",
    stepLocated: "Abbiamo localizzato l'area e assegnato un punto di riferimento.",
    stepNoGps: "GPS assente — nessuna coordinata; punto di riferimento: studio (anchor).",
    stepListening: "Ascolto attivo — in attesa di conferma sul campo.",
    startOver: "Ricomincia",
    copied: "Conferma copiata",
  },
  uk: {
    title: "Як ми обробляємо це звернення",
    stepReceived: "Ми отримали звернення з громадянського каналу.",
    stepLocated: "Ми локалізували зону та призначили опорну точку.",
    stepNoGps: "Немає GPS — координати не призначено; опорна точка — studio (anchor).",
    stepListening: "Слухання активне — очікуємо підтвердження з поля.",
    startOver: "Спочатку",
    copied: "Підтвердження скопійовано",
  },
  hu: {
    title: "Hogyan dolgozzuk fel ezt a bejelentést",
    stepReceived: "Fogadtuk a bejelentést a polgári csatornán.",
    stepLocated: "Lokalizáltuk a területet és hozzárendeltünk referenciapontot.",
    stepNoGps: "Nincs GPS — koordináta nélkül; referenciapont: studio (anchor).",
    stepListening: "Figyelés aktív — terepi megerősítésre várunk.",
    startOver: "Újrakezdés",
    copied: "Megerősítés másolva",
  },
};

function operatorCopy(lang: Lang): OperatorCopy {
  return pickLangCopy(COPY, lang, COPY.en!);
}

/** L2 — fixed operator steps; no SELECT codes or duplicate quote. */
export function formatProcessNarrative(lang: Lang, _events?: InteractionEvent[]): string {
  const oc = operatorCopy(lang);
  return [oc.stepReceived, oc.stepLocated, oc.stepListening].join("\n");
}

export type OperatorStepState = "done" | "active";

export function getOperatorSteps(
  lang: Lang,
  trace?: ObservationTracePayload,
): { text: string; state: OperatorStepState }[] {
  const oc = operatorCopy(lang);
  const noGps = trace ? isUnknownCitizenPlace(trace.citizen?.place) : false;
  return [
    { text: oc.stepReceived, state: "done" },
    { text: noGps ? oc.stepNoGps : oc.stepLocated, state: "done" },
    { text: oc.stepListening, state: "active" },
  ];
}

export function journeyLayerTitle(lang: Lang): string {
  return operatorCopy(lang).title;
}

export function journeyUiCopy(lang: Lang): Pick<OperatorCopy, "startOver" | "copied"> {
  const oc = operatorCopy(lang);
  return { startOver: oc.startOver, copied: oc.copied };
}

/** @deprecated */
export function formatJourneyBlock(events: InteractionEvent[], lang: Lang): string {
  return formatProcessNarrative(lang, events);
}

export type ProcessNarrativeInput = {
  lang: Lang;
  quote?: string;
  place?: string;
  events: InteractionEvent[];
  awaitingField?: boolean;
};
