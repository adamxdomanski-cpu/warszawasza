/**
 * Cold-start entry copy — two primary actions, voice-first (all LANGS).
 */

import type { Lang } from "../i18n";
import { heatFieldCopy, type HeatCopy } from "./heatFieldI18n";

export type ColdStartCopy = Pick<
  HeatCopy,
  | "ctaNearbyHelp"
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
>;

const TAGLINE: Partial<Record<Lang, string>> = {
  pl: "Połącz się z rzeczywistością.",
  en: "Connect with what is real.",
  it: "Connettiti con la realtà.",
  uk: "Зв’язок із реальністю.",
  bg: "Връзка с реалността.",
  et: "Ühendus reaalsusega.",
  fi: "Yhteys todellisuuteen.",
  lt: "Ryšys su realybe.",
  lv: "Saikne ar realitāti.",
  hu: "Kapcsolat a valósággal.",
};

export function coldStartCopy(lang: Lang): ColdStartCopy & { tagline: string } {
  const heat = heatFieldCopy(lang);
  return {
    ctaNearbyHelp: heat.ctaNearbyHelp,
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
    tagline: TAGLINE[lang] ?? TAGLINE.en!,
  };
}
