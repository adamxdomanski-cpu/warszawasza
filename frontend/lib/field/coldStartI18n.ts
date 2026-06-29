/**
 * Cold-start entry copy — two primary actions, voice-first (all LANGS).
 */

import type { Lang } from "../i18n";
import { heatFieldCopy, type HeatCopy } from "./heatFieldI18n";

export type ColdStartCopy = Pick<
  HeatCopy,
  | "ctaVoiceReport"
  | "voiceStart"
  | "voiceRecording"
  | "voiceStop"
  | "voiceSaved"
  | "voiceReviewPrompt"
  | "voicePlay"
  | "voiceSend"
  | "voiceOrType"
  | "voiceTranscribePlaceholder"
  | "voiceSentTitle"
  | "voiceSentBody"
  | "ctaAnotherObservation"
  | "voiceUnsupported"
> & {
  /** Generic 📍 on `/` — deployment-agnostic (not “help”). */
  ctaNearbyHelp: string;
};

/** Cold `/` — no “pomoc”; heat deployment overrides in heatFieldCopy. */
const NEARBY_GENERIC: Partial<Record<Lang, string>> = {
  pl: "📍 Znajdź w pobliżu",
  en: "📍 Find nearby",
  it: "📍 Trova nelle vicinanze",
  uk: "📍 Знайдіть поруч",
  bg: "📍 Намерете наблизо",
  et: "📍 Leia lähedal",
  fi: "📍 Löydä läheltä",
  lt: "📍 Raskite netoliese",
  lv: "📍 Atrodiet tuvumā",
  hu: "📍 Keressen a közelben",
};

export function coldStartCopy(lang: Lang): ColdStartCopy {
  const heat = heatFieldCopy(lang);
  return {
    ctaNearbyHelp: NEARBY_GENERIC[lang] ?? NEARBY_GENERIC.en!,
    ctaVoiceReport: heat.ctaVoiceReport,
    voiceStart: heat.voiceStart,
    voiceRecording: heat.voiceRecording,
    voiceStop: heat.voiceStop,
    voiceSaved: heat.voiceSaved,
    voiceReviewPrompt: heat.voiceReviewPrompt,
    voicePlay: heat.voicePlay,
    voiceSend: heat.voiceSend,
    voiceOrType: heat.voiceOrType,
    voiceTranscribePlaceholder: heat.voiceTranscribePlaceholder,
    voiceSentTitle: heat.voiceSentTitle,
    voiceSentBody: heat.voiceSentBody,
    ctaAnotherObservation: heat.ctaAnotherObservation,
    voiceUnsupported: heat.voiceUnsupported,
  };
}
