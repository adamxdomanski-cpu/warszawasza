/** Voice-first flow copy — recording is the artifact; text is optional. */

import type { Lang } from "../i18n";

export type VoiceFlowCopy = {
  voiceRecordingReady: string;
  voiceAddDescription: string;
  voiceDescriptionPlaceholder: string;
  voiceMicFallbackTitle: string;
  voiceMicFallbackLead: string;
  voiceTypeObservation: string;
  voiceMicRetry: string;
  voiceSending: string;
  voiceTranscribePending: string;
  voiceTranscribeFailed: string;
  recordingSummary: string;
  recordingSummaryReady: string;
};

const PL: VoiceFlowCopy = {
  voiceRecordingReady: "Nagranie gotowe.",
  voiceAddDescription: "Dodaj opis (opcjonalnie)",
  voiceDescriptionPlaceholder: "Krótki opis — jeśli chcesz coś doprecyzować",
  voiceMicFallbackTitle: "Nie udało się uruchomić mikrofonu.",
  voiceMicFallbackLead: "Możesz wpisać obserwację albo spróbować ponownie.",
  voiceTypeObservation: "Wpisz obserwację",
  voiceMicRetry: "Spróbuj ponownie",
  voiceSending: "Wysyłanie…",
  voiceTranscribePending: "Próbuję rozpoznać mowę…",
  voiceTranscribeFailed: "Transkrypcja niedostępna — nagranie możesz wysłać bez tekstu.",
  recordingSummary: "🎤 Nagranie ({n} s)",
  recordingSummaryReady: "🎤 Nagranie gotowe",
};

const EN: VoiceFlowCopy = {
  voiceRecordingReady: "Recording ready.",
  voiceAddDescription: "Add a description (optional)",
  voiceDescriptionPlaceholder: "Short note — only if you want to clarify something",
  voiceMicFallbackTitle: "Could not start the microphone.",
  voiceMicFallbackLead: "You can type your observation or try again.",
  voiceTypeObservation: "Type your observation",
  voiceMicRetry: "Try again",
  voiceSending: "Sending…",
  voiceTranscribePending: "Trying to transcribe…",
  voiceTranscribeFailed: "Transcription unavailable — you can send the recording without text.",
  recordingSummary: "🎤 Recording ({n} s)",
  recordingSummaryReady: "🎤 Recording ready",
};

const COPY: Partial<Record<Lang, Partial<VoiceFlowCopy>>> = {
  pl: PL,
  en: EN,
  it: {
    voiceRecordingReady: "Registrazione pronta.",
    voiceAddDescription: "Aggiungi descrizione (facoltativo)",
    voiceDescriptionPlaceholder: "Breve nota — solo se volete precisare",
    voiceMicFallbackTitle: "Impossibile avviare il microfono.",
    voiceMicFallbackLead: "Potete scrivere l'osservazione o riprovare.",
    voiceTypeObservation: "Scrivi l'osservazione",
    voiceMicRetry: "Riprova",
    voiceSending: "Invio…",
    voiceTranscribePending: "Trascrizione in corso…",
    voiceTranscribeFailed: "Trascrizione non disponibile — potete inviare solo l'audio.",
  },
  uk: {
    voiceRecordingReady: "Запис готовий.",
    voiceAddDescription: "Додати опис (за бажанням)",
    voiceDescriptionPlaceholder: "Коротка нотатка — якщо хочете уточнити",
    voiceMicFallbackTitle: "Не вдалося увімкнути мікрофон.",
    voiceMicFallbackLead: "Можете написати спостереження або спробувати знову.",
    voiceTypeObservation: "Напишіть спостереження",
    voiceMicRetry: "Спробуйте знову",
    voiceSending: "Надсилання…",
    voiceTranscribePending: "Розпізнаю мовлення…",
    voiceTranscribeFailed: "Транскрипція недоступна — можна надіслати лише запис.",
  },
  hu: {
    voiceRecordingReady: "Felvétel kész.",
    voiceAddDescription: "Leírás hozzáadása (opcionális)",
    voiceDescriptionPlaceholder: "Rövid megjegyzés — ha pontosítani szeretne",
    voiceMicFallbackTitle: "A mikrofon nem indítható.",
    voiceMicFallbackLead: "Beírhatja a megfigyelést, vagy megpróbálhatja újra.",
    voiceTypeObservation: "Írja be a megfigyelést",
    voiceMicRetry: "Újra",
    voiceSending: "Küldés…",
    voiceTranscribePending: "Beszéd felismerése…",
    voiceTranscribeFailed: "Az átírás nem elérhető — a felvétel küldhető szöveg nélkül.",
  },
};

export function voiceFlowCopy(lang: Lang): VoiceFlowCopy {
  return { ...EN, ...(COPY[lang] ?? {}) };
}

/** L1 label when the trace is audio-only (no STT text). */
export function formatRecordingSummary(lang: Lang, durationSec: number): string {
  const copy = voiceFlowCopy(lang);
  if (durationSec > 0) {
    return copy.recordingSummary.replace("{n}", String(durationSec));
  }
  return copy.recordingSummaryReady;
}
