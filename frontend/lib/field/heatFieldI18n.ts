/**
 * Heat field · Upał 2026 — Warsaw/Mokotów orientation panel (Layer 1 UI copy).
 */

import type { Lang } from "../i18n";
import { HEAT_FIELD_EXTRA } from "./heatFieldExtras";

export type HeatPointStatus = "ok" | "fail";
export type HeatPointKind = "water" | "shade" | "both";

export type HeatPoint = {
  id: string;
  status: HeatPointStatus;
  selectValue: string;
  distanceM: number;
  walkMin: number;
  kind: HeatPointKind;
};

export const HEAT_FIELD_OBSERVED_AT = "2026-06-28T14:30:00Z";
export const HEAT_TEMP_C = 39;

export const HEAT_POINTS: HeatPoint[] = [
  {
    id: "hydrant_pulawska",
    status: "ok",
    selectValue: "HYDRANT_PULAWSKA",
    distanceM: 120,
    walkMin: 3,
    kind: "water",
  },
  {
    id: "biblio_mokotow",
    status: "ok",
    selectValue: "BIBLIOTHEK_MOKOTOW",
    distanceM: 480,
    walkMin: 6,
    kind: "shade",
  },
  {
    id: "metro_kurtyna",
    status: "fail",
    selectValue: "METRO_KURTYNA",
    distanceM: 650,
    walkMin: 8,
    kind: "both",
  },
];

type PointLabel = {
  name: string;
  action: string;
  statusOk: string;
  statusFail: string;
  kindLabel: string;
};

export type HeatCopy = {
  statusLine: string;
  factTemp: string;
  factSubtitle: string;
  alertRcbLabel: string;
  alertRcbBody: string;
  transportTitle: string;
  transportTram: string;
  transportSkm: string;
  transportMore: string;
  waterSaveTitle: string;
  waterSaveQuestion: string;
  ctaNearbyHelp: string;
  ctaVoiceReport: string;
  voiceStart: string;
  voiceRecording: string;
  voiceStop: string;
  voiceSaved: string;
  voiceReviewPrompt: string;
  voicePlay: string;
  voiceSend: string;
  voiceOrType: string;
  voiceTranscribePlaceholder: string;
  voiceSentTitle: string;
  voiceSentBody: string;
  ctaAnotherObservation: string;
  voiceUnsupported: string;
  layer2Title: string;
  distanceM: string;
  distanceWalk: string;
  pointLabels: Record<string, PointLabel>;
  traceTitle: string;
  layer3Title: string;
  fopLine: string;
  knowledgeLink: string;
  paperLink: string;
  back: string;
  technicalData: string;
  whyContext: string;
  sourcesTitle: string;
  researchTitle: string;
  hypothesisTitle: string;
  hypothesisHeat: string;
  devEventCodes: string;
  moreContextLabel: string;
  /** Optional curated micro-decision (deployment-specific, not temp-generated). */
  microHintLabel?: string;
  microHintBody?: string;
};

const COPY: Partial<Record<Lang, HeatCopy>> = {
  pl: {
    statusLine: "WARSZAWA · 28 CZERWCA 2026 · 16:30",
    factTemp: "39°C",
    factSubtitle: "ekstremalna fala upałów",
    alertRcbLabel: "Alert RCB",
    alertRcbBody:
      "Od 28 czerwca obowiązuje ostrzeżenie przed ekstremalnym upałem. Unikaj przebywania na słońcu w godzinach 11–17. Pij wodę, szukaj chłodnych pomieszczeń. W razie złego samopoczucia — 112.",
    transportTitle: "Transport",
    transportTram: "Tramwaje na Puławskiej zwalniają — ryzyko wygięcia szyn",
    transportSkm: "W wagonach SKM temperatura przekroczyła 44°C",
    transportMore: "→ zobacz więcej",
    waterSaveTitle: "Jak oszczędzać wodę?",
    waterSaveQuestion:
      "Czy dziś naprawdę potrzebujesz trzeciej spłuczki, czy wystarczy jedna?",
    ctaNearbyHelp: "📍 Znajdź wodę i cień",
    ctaVoiceReport: "🎤 Powiedz, co widzisz",
    voiceStart: "Rozpocznij nagrywanie",
    voiceRecording: "Nagrywanie…",
    voiceStop: "Zakończ",
    voiceSaved: "✓ Nagranie zapisane",
    voiceReviewPrompt: "Czy wszystko się zgadza?",
    voicePlay: "Odtwórz",
    voiceSend: "Wyślij",
    voiceOrType: "lub wpisz tekst",
    voiceTranscribePlaceholder: "Opcjonalnie: popraw transkrypcję…",
    voiceSentTitle: "✓ Odebrane",
    voiceSentBody: "Dziękujemy.",
    ctaAnotherObservation: "Wyślij kolejne zgłoszenie",
    voiceUnsupported: "Nagrywanie niedostępne w tej przeglądarce — wpisz tekst poniżej.",
    layer2Title: "W pobliżu",
    distanceM: "{n} m",
    distanceWalk: "{n} min pieszo",
    pointLabels: {
      hydrant_pulawska: {
        name: "Hydrant-zdrój (Puławska/Odyńca)",
        action: "Pobierz wodę",
        statusOk: "Działa",
        statusFail: "Niedostępny",
        kindLabel: "Woda",
      },
      biblio_mokotow: {
        name: "Schron klimatyzowany (Biblioteka Mokotów)",
        action: "Wejdź",
        statusOk: "Otwarty",
        statusFail: "Zamknięty",
        kindLabel: "Cień",
      },
      metro_kurtyna: {
        name: "Kurtyna wodna (Metro Pole Mokotowskie)",
        action: "Sprawdź",
        statusOk: "Działa",
        statusFail: "Awaria zasilania",
        kindLabel: "Woda · cień",
      },
    },
    traceTitle: "Ślad (EVENT → TRACE)",
    layer3Title: "Rolloutowo · artifacts",
    fopLine: `FOP/0.1 @${HEAT_FIELD_OBSERVED_AT} | temp=${HEAT_TEMP_C}.0 | src=CHANNEL_A_CITIZEN | deploy=warszawa-mokotow-heat-2026`,
    knowledgeLink: "Miejski Plan Adaptacji do zmian klimatycznych dla m.st. Warszawy do roku 2030",
    paperLink: "Szulczewska et al. — wskaźnik powierzchni biologicznie czynnej w strukturze Warszawy",
    back: "← Wstecz",
    technicalData: "Dane techniczne",
    whyContext: "Dlaczego to pokazujemy?",
    sourcesTitle: "Źródła",
    researchTitle: "Badania",
    hypothesisTitle: "Hipoteza",
    hypothesisHeat:
      "Ekstremalne ciepło zwiększa zapotrzebowanie na wodę i cień w przestrzeni publicznej (provisional).",
    devEventCodes:
      "Kody zdarzeń (dev): SELECT(POMOC_W_POBLIZU), SELECT(HYDRANT_PULAWSKA), …",
    moreContextLabel: "Więcej kontekstu",
    microHintLabel: "💡 Wskazówka na dziś",
    microHintBody:
      "Jeśli masz kwiaty na balkonie, warto je schować przed popołudniowym upałem.",
  },
  en: {
    statusLine: "WARSAW · 28 JUNE 2026 · 16:30",
    factTemp: "39°C",
    factSubtitle: "extreme heat wave",
    alertRcbLabel: "RCB alert",
    alertRcbBody:
      "Extreme heat warning in effect from 28 June. Avoid sun exposure 11:00–17:00. Drink water, seek cool indoor spaces. If unwell — call 112.",
    transportTitle: "Transport",
    transportTram: "Trams on Puławska slowing — rail buckling risk",
    transportSkm: "Suburban train carriages reported above 44°C",
    transportMore: "→ see more",
    waterSaveTitle: "How to save water?",
    waterSaveQuestion: "Do you really need a third flush today, or is one enough?",
    ctaNearbyHelp: "📍 Find water and shade",
    ctaVoiceReport: "🎤 Tell us what you see",
    voiceStart: "Start recording",
    voiceRecording: "Recording…",
    voiceStop: "Stop",
    voiceSaved: "✓ Recording saved",
    voiceReviewPrompt: "Does everything look right?",
    voicePlay: "Play back",
    voiceSend: "Send",
    voiceOrType: "or type instead",
    voiceTranscribePlaceholder: "Optional: edit transcription…",
    voiceSentTitle: "✓ Received",
    voiceSentBody: "Thank you.",
    ctaAnotherObservation: "Submit another observation",
    voiceUnsupported: "Recording unavailable in this browser — type below instead.",
    layer2Title: "Nearby",
    distanceM: "{n} m",
    distanceWalk: "{n} min walk",
    pointLabels: {
      hydrant_pulawska: {
        name: "Hydrant fountain (Puławska/Odyńca)",
        action: "Get water",
        statusOk: "Working",
        statusFail: "Unavailable",
        kindLabel: "Water",
      },
      biblio_mokotow: {
        name: "Cooled shelter (Mokotów Library)",
        action: "Enter",
        statusOk: "Open",
        statusFail: "Closed",
        kindLabel: "Shade",
      },
      metro_kurtyna: {
        name: "Water curtain (Pole Mokotowskie metro)",
        action: "Check",
        statusOk: "Working",
        statusFail: "Power failure",
        kindLabel: "Water · shade",
      },
    },
    traceTitle: "Trace (EVENT → TRACE)",
    layer3Title: "Rolloutowo · artifacts",
    fopLine: `FOP/0.1 @${HEAT_FIELD_OBSERVED_AT} | temp=${HEAT_TEMP_C}.0 | src=CHANNEL_A_CITIZEN | deploy=warszawa-mokotow-heat-2026`,
    knowledgeLink: "Warsaw climate adaptation plan to 2030",
    paperLink: "Szulczewska et al. — biologically active area index in Warsaw",
    back: "← Back",
    technicalData: "Technical data",
    whyContext: "Why we show this",
    sourcesTitle: "Sources",
    researchTitle: "Research",
    hypothesisTitle: "Hypothesis",
    hypothesisHeat:
      "Extreme heat increases demand for water and shade in public space (provisional).",
    devEventCodes: "Event codes (dev): SELECT(POMOC_W_POBLIZU), …",
    moreContextLabel: "More context",
    microHintLabel: "💡 Hint for today",
    microHintBody:
      "If you have plants on the balcony, consider moving them in before the afternoon heat.",
  },
  uk: {
    statusLine: "ВАРШАВА · 28 ЧЕРВНЯ 2026 · 16:30",
    factTemp: "39°C",
    factSubtitle: "екстремальна хвиля спеки",
    alertRcbLabel: "Сповіщення RCB",
    alertRcbBody:
      "Попередження про екстремальну спеку. Уникайте сонця 11–17. Пийте воду. Якщо погано — 112.",
    transportTitle: "Транспорт",
    transportTram: "Трамваї на Пулавській уповільнюються",
    transportSkm: "У вагonах SKM понад 44°C",
    waterSaveTitle: "Як економити воду?",
    waterSaveQuestion: "Чи потрібен третій злив, чи достатньо одного?",
    ctaNearbyHelp: "📍 Вода та тінь поруч",
    ctaVoiceReport: "🎤 Розкажіть, що бачите",
    voiceStart: "Почати запис",
    voiceRecording: "Запис…",
    voiceStop: "Зупинити",
    voiceSaved: "✓ Запис збережено",
    voiceReviewPrompt: "Усе правильно?",
    voicePlay: "Відтворити",
    voiceSend: "Надіслати",
    voiceOrType: "або введіть текст",
    voiceTranscribePlaceholder: "За бажанням: виправте текст…",
    voiceSentTitle: "✓ Отримано",
    voiceSentBody: "Дякуємо.",
    ctaAnotherObservation: "Скажіть ще раз",
    voiceUnsupported: "Запис недоступний — введіть текст нижче.",
    layer2Title: "Поруч",
    distanceM: "{n} м",
    distanceWalk: "{n} хв пішки",
    pointLabels: {
      hydrant_pulawska: {
        name: "Гідрант (Puławska/Odyńca)",
        action: "Вода",
        statusOk: "Працює",
        statusFail: "Недоступно",
        kindLabel: "Вода",
      },
      biblio_mokotow: {
        name: "Бібліотека Мokotów",
        action: "Увійти",
        statusOk: "Відкрито",
        statusFail: "Зачинено",
        kindLabel: "Тінь",
      },
      metro_kurtyna: {
        name: "Водна завіса (метро)",
        action: "Перевірити",
        statusOk: "Працює",
        statusFail: "Відмова живлення",
        kindLabel: "Вода · тінь",
      },
    },
    transportMore: "→ більше",
    traceTitle: "Слід (EVENT → TRACE)",
    layer3Title: "Rolloutowo · artifacts",
    fopLine: `FOP/0.1 @${HEAT_FIELD_OBSERVED_AT} | temp=${HEAT_TEMP_C}.0 | src=CHANNEL_A_CITIZEN`,
    knowledgeLink: "План адаптації Варшави до 2030",
    paperLink: "Szulczewska et al. — біологічно активна площа",
    back: "← Назад",
    technicalData: "Технічні дані",
    whyContext: "Чому ми це показуємо",
    sourcesTitle: "Джерела",
    researchTitle: "Дослідження",
    hypothesisTitle: "Гіпотеза",
    hypothesisHeat: "Екстремальна спека збільшує потребу у воді та тіні (provisional).",
    devEventCodes: "Коди подій (dev): SELECT(POMOC_W_POBLIZU), …",
    moreContextLabel: "Більше контексту",
  },
};

export function heatFieldCopy(lang: Lang): HeatCopy {
  const merged: Partial<Record<Lang, HeatCopy>> = { ...COPY, ...HEAT_FIELD_EXTRA };
  const en = merged.en!;
  const resolved = merged[lang] ?? en;
  return {
    ...resolved,
    microHintLabel: resolved.microHintLabel ?? en.microHintLabel,
    microHintBody: resolved.microHintBody ?? en.microHintBody,
  };
}

export function formatDistance(copy: HeatCopy, meters: number, walkMin: number): string {
  return `${copy.distanceM.replace("{n}", String(meters))} · ${copy.distanceWalk.replace("{n}", String(walkMin))}`;
}

/** Official RCB tier for this deployment; drives critical urgency when level 3+. */
export const HEAT_RCB_CRITICAL = false;

export type HeatUrgency = "normal" | "warning" | "critical";

/** Urgency drives motion — meaning, not decoration. */
export function heatUrgency(tempC: number, rcbCritical = HEAT_RCB_CRITICAL): HeatUrgency {
  if (tempC >= 42 || rcbCritical) return "critical";
  if (tempC >= 35) return "warning";
  return "normal";
}
