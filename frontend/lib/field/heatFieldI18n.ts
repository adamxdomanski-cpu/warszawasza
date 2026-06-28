/**
 * Heat field · Upał 2026 — Warsaw/Mokotów deployment adapter (Layer 1–3 UI copy).
 * CORE observations are value-neutral; this file only renders per Lang.
 */

import type { Lang } from "../i18n";

export type HeatPointStatus = "ok" | "fail";

export type HeatPoint = {
  id: string;
  status: HeatPointStatus;
  selectValue: string;
};

export const HEAT_FIELD_OBSERVED_AT = "2026-06-28T14:30:00Z";
export const HEAT_TEMP_C = 39;

export const HEAT_POINTS: HeatPoint[] = [
  {
    id: "hydrant_pulawska",
    status: "ok",
    selectValue: "HYDRANT_PULAWSKA",
  },
  {
    id: "biblio_mokotow",
    status: "ok",
    selectValue: "BIBLIOTHEK_MOKOTOW",
  },
  {
    id: "metro_kurtyna",
    status: "fail",
    selectValue: "METRO_KURTYNA",
  },
];

type HeatCopy = {
  statusLine: string;
  factHead: string;
  alertRcb: string;
  frictions: string[];
  ctaWaterShade: string;
  layer2Title: string;
  districtLabel: string;
  pointLabels: Record<string, { name: string; action: string; statusOk: string; statusFail: string }>;
  traceTitle: string;
  layer3Title: string;
  fopLine: string;
  knowledgeLink: string;
  paperLink: string;
  back: string;
  hypothesisHeat: string;
};

const COPY: Partial<Record<Lang, HeatCopy>> = {
  pl: {
    statusLine: "WARSZAWA · 28 CZERWCA 2026 · 16:30",
    factHead: "39°C · ekstremalna fala upałów",
    alertRcb: "Alert RCB",
    frictions: [
      "Tramwaje na Puławskiej zwalniają — ryzyko wygięcia szyn.",
      "W wagonach SKM temperatura przekroczyła 44°C.",
    ],
    ctaWaterShade: "📍 Pokaż najbliższą darmową wodę i cień",
    layer2Title: "Mokotów · fakty terenowe",
    districtLabel: "Mokotów",
    pointLabels: {
      hydrant_pulawska: {
        name: "Hydrant-zdrój (Puławska/Odyńca)",
        action: "Pobierz wodę",
        statusOk: "Działa",
        statusFail: "Niedostępny",
      },
      biblio_mokotow: {
        name: "Schron klimatyzowany (Biblioteka Mokotów)",
        action: "Wejdź",
        statusOk: "Otwarty",
        statusFail: "Zamknięty",
      },
      metro_kurtyna: {
        name: "Kurtyna wodna (Metro Pole Mokotowskie)",
        action: "Sprawdź",
        statusOk: "Działa",
        statusFail: "Awaria zasilania",
      },
    },
    traceTitle: "Ślad (EVENT → TRACE)",
    layer3Title: "Rolloutowo · artifacts",
    fopLine: `FOP/0.1 @${HEAT_FIELD_OBSERVED_AT} | temp=${HEAT_TEMP_C}.0 | src=CHANNEL_A_CITIZEN | deploy=warszawa-mokotow-heat-2026`,
    knowledgeLink: "Miejski Plan Adaptacji do zmian klimatycznych dla m.st. Warszawy do roku 2030",
    paperLink: "Szulczewska et al. — wskaźnik powierzchni biologicznie czynnej w strukturze Warszawy",
    back: "← Wstecz",
    hypothesisHeat:
      "Hipoteza (provisional): ekstremalne ciepło zwiększa zapotrzebowanie na wodę i cień w przestrzeni publicznej.",
  },
  en: {
    statusLine: "WARSAW · 28 JUNE 2026 · 16:30",
    factHead: "39°C · extreme heat wave",
    alertRcb: "RCB alert",
    frictions: [
      "Trams on Puławska slowing — rail buckling risk.",
      "Suburban train carriages reported above 44°C.",
    ],
    ctaWaterShade: "📍 Show nearest free water and shade",
    layer2Title: "Mokotów · field facts",
    districtLabel: "Mokotów",
    pointLabels: {
      hydrant_pulawska: {
        name: "Hydrant fountain (Puławska/Odyńca)",
        action: "Get water",
        statusOk: "Working",
        statusFail: "Unavailable",
      },
      biblio_mokotow: {
        name: "Cooled shelter (Mokotów Library)",
        action: "Enter",
        statusOk: "Open",
        statusFail: "Closed",
      },
      metro_kurtyna: {
        name: "Water curtain (Pole Mokotowskie metro)",
        action: "Check",
        statusOk: "Working",
        statusFail: "Power failure",
      },
    },
    traceTitle: "Trace (EVENT → TRACE)",
    layer3Title: "Rolloutowo · artifacts",
    fopLine: `FOP/0.1 @${HEAT_FIELD_OBSERVED_AT} | temp=${HEAT_TEMP_C}.0 | src=CHANNEL_A_CITIZEN | deploy=warszawa-mokotow-heat-2026`,
    knowledgeLink: "Warsaw climate adaptation plan to 2030",
    paperLink: "Szulczewska et al. — biologically active area index in Warsaw",
    back: "← Back",
    hypothesisHeat:
      "Hypothesis (provisional): extreme heat increases demand for water and shade in public space.",
  },
  uk: {
    statusLine: "ВАРШАВА · 28 ЧЕРВНЯ 2026 · 16:30",
    factHead: "39°C · екстремальна хвиля спеки",
    alertRcb: "Сповіщення RCB",
    frictions: [
      "Трамваї на Пулавській уповільнюються — ризик деформації рейок.",
      "У вагонах SKM температуру зафіксовано понад 44°C.",
    ],
    ctaWaterShade: "📍 Показати найближчу безкоштовну воду та тінь",
    layer2Title: "Мокотів · польові факти",
    districtLabel: "Мokotów",
    pointLabels: {
      hydrant_pulawska: {
        name: "Гідрант (Puławska/Odyńca)",
        action: "Вода",
        statusOk: "Працює",
        statusFail: "Недоступно",
      },
      biblio_mokotow: {
        name: "Охолоджений притулок (бібліотека Мокотів)",
        action: "Увійти",
        statusOk: "Відкрито",
        statusFail: "Зачинено",
      },
      metro_kurtyna: {
        name: "Водна завіса (метро Pole Mokotowskie)",
        action: "Перевірити",
        statusOk: "Працює",
        statusFail: "Відмова живлення",
      },
    },
    traceTitle: "Слід (EVENT → TRACE)",
    layer3Title: "Rolloutowo · artifacts",
    fopLine: `FOP/0.1 @${HEAT_FIELD_OBSERVED_AT} | temp=${HEAT_TEMP_C}.0 | src=CHANNEL_A_CITIZEN`,
    knowledgeLink: "План адаптації Варшави до 2030",
    paperLink: "Szulczewska et al. — біологічно активна площа",
    back: "← Назад",
    hypothesisHeat:
      "Гіпотеза (provisional): екстремальна спека збільшує потребу у воді та тіні.",
  },
};

export function heatFieldCopy(lang: Lang): HeatCopy {
  return COPY[lang] ?? COPY.en!;
}
