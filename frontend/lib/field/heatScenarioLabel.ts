/**
 * L1 — scenario framing for /field/heat (Narracja ≠ Fakt).
 * Visible above factTemp; not hidden in „Więcej kontekstu”.
 *
 * „SCENARIUSZ” — nie „terenowy”: teren = obserwacja/test/dziennik; tu = przygotowany scenariusz.
 */

import type { Lang } from "../i18n";
import { pickLangCopy } from "../localeMap";

export type HeatScenarioLabel = {
  scenarioLabel: string;
  scenarioWhen: string;
};

const LABELS: Partial<Record<Lang, HeatScenarioLabel>> = {
  pl: {
    scenarioLabel: "SCENARIUSZ",
    scenarioWhen: "Warszawa · 28 czerwca 2026",
  },
  en: {
    scenarioLabel: "SCENARIO",
    scenarioWhen: "Warsaw · 28 June 2026",
  },
  it: {
    scenarioLabel: "SCENARIO",
    scenarioWhen: "Varsavia · 28 giugno 2026",
  },
  uk: {
    scenarioLabel: "СЦЕНАРІЙ",
    scenarioWhen: "Варшава · 28 червня 2026",
  },
  hu: {
    scenarioLabel: "SCENÁRIÓ",
    scenarioWhen: "Varsó · 2026. június 28.",
  },
  bg: {
    scenarioLabel: "SCENARIO",
    scenarioWhen: "Warsaw · 28 June 2026",
  },
  et: {
    scenarioLabel: "SCENARIO",
    scenarioWhen: "Warsaw · 28 June 2026",
  },
  fi: {
    scenarioLabel: "SCENARIO",
    scenarioWhen: "Warsaw · 28 June 2026",
  },
  lt: {
    scenarioLabel: "SCENARIO",
    scenarioWhen: "Warsaw · 28 June 2026",
  },
  lv: {
    scenarioLabel: "SCENARIO",
    scenarioWhen: "Warsaw · 28 June 2026",
  },
};

export function heatScenarioLabel(lang: Lang): HeatScenarioLabel {
  return pickLangCopy(LABELS, lang, LABELS.en!);
}
