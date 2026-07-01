/**
 * Cold-start entry copy — two primary actions, voice-first (all LANGS).
 */

import type { Lang } from "../i18n";
import { heatFieldCopy, type HeatCopy } from "./heatFieldI18n";
import { voiceFlowCopy, type VoiceFlowCopy } from "./voiceFlowI18n";

export type ColdStartCopy = Pick<
  HeatCopy,
  | "ctaVoiceReport"
  | "ctaNearbyHelp"
  | "voiceStart"
  | "voiceRecording"
  | "voiceStop"
  | "voiceSaved"
  | "voiceReviewPrompt"
  | "voicePlay"
  | "voiceSend"
  | "voiceOrType"
  | "voiceTranscribePlaceholder"
  | "voiceUnsupported"
  | "voiceMicDenied"
  | "voiceSentTitle"
  | "voiceSentBody"
  | "ctaAnotherObservation"
> &
  VoiceFlowCopy;

const coldStartCopyCache = new Map<Lang, ColdStartCopy>();

export function coldStartCopy(lang: Lang): ColdStartCopy {
  const cached = coldStartCopyCache.get(lang);
  if (cached) return cached;
  const heat = heatFieldCopy(lang);
  const flow = voiceFlowCopy(lang);
  const built: ColdStartCopy = {
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
    voiceMicDenied: heat.voiceMicDenied,
    ...flow,
  };
  coldStartCopyCache.set(lang, built);
  return built;
}
