/** Voice-first flow copy — transcription optional, category never required. */

import type { Lang } from "../i18n";

export type VoiceFlowCopy = {
  voiceTopicHint: string;
  voiceTranscribePending: string;
  voiceTranscribeFailed: string;
  voiceAudioOnlyOk: string;
};

const PL: VoiceFlowCopy = {
  voiceTopicHint:
    "Możesz opisać cokolwiek: upał, awaria, drzewo, hałas, bezpieczeństwo, transport… Kategoria nie jest wymagana.",
  voiceTranscribePending: "Próbuję rozpoznać mowę…",
  voiceTranscribeFailed:
    "Transkrypcja niedostępna — możesz wysłać samo nagranie lub wpisać tekst poniżej.",
  voiceAudioOnlyOk: "Nagranie wystarczy — tekst jest opcjonalny.",
};

const EN: VoiceFlowCopy = {
  voiceTopicHint:
    "Describe anything: heat, outage, trees, noise, safety, transport… No category required.",
  voiceTranscribePending: "Trying to transcribe…",
  voiceTranscribeFailed:
    "Transcription unavailable — you can send the recording alone or type below.",
  voiceAudioOnlyOk: "The recording is enough — text is optional.",
};

const COPY: Partial<Record<Lang, VoiceFlowCopy>> = {
  pl: PL,
  en: EN,
  it: {
    voiceTopicHint:
      "Descrivete qualsiasi cosa: caldo, guasto, alberi, rumore, sicurezza, trasporti… Nessuna categoria obbligatoria.",
    voiceTranscribePending: "Trascrizione in corso…",
    voiceTranscribeFailed:
      "Trascrizione non disponibile — potete inviare solo la registrazione o scrivere sotto.",
    voiceAudioOnlyOk: "La registrazione basta — il testo è facoltativo.",
  },
  uk: {
    voiceTopicHint:
      "Опишіть що завгодно: спека, аварія, дерево, шум, безпека, транспорт… Категорія не обов’язкова.",
    voiceTranscribePending: "Розпізнаю мовлення…",
    voiceTranscribeFailed:
      "Транскрипція недоступна — можна надіслати лише запис або написати текст.",
    voiceAudioOnlyOk: "Запису достатньо — текст необов’язковий.",
  },
  hu: {
    voiceTopicHint:
      "Bármit leírhat: hőség, hiba, fa, zaj, biztonság, közlekedés… Kategória nem kötelező.",
    voiceTranscribePending: "Beszéd felismerése…",
    voiceTranscribeFailed:
      "Átírás nem elérhető — elküldheti csak a felvételt, vagy írjon alább.",
    voiceAudioOnlyOk: "A felvétel elég — a szöveg opcionális.",
  },
};

export function voiceFlowCopy(lang: Lang): VoiceFlowCopy {
  return COPY[lang] ?? EN;
}
