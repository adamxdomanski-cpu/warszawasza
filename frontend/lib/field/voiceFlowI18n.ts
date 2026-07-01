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
  /** Shown before first tap — browser may offer “allow once”; we release mic after each recording. */
  voiceMicOnceHint: string;
  voiceMicReleased: string;
  voiceTapLabel: string;
  voiceTapAriaStart: string;
  voiceTapAriaStop: string;
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
  voiceMicOnceHint:
    "Przy pytaniu przeglądarki możesz wybrać „zezwól tylko tym razem”. Mikrofon działa wyłącznie na czas nagrania — potem dostęp jest zwalniany.",
  voiceMicReleased: "Mikrofon wyłączony. Kolejne nagranie poprosi o zgodę ponownie.",
  voiceTapLabel: "TAP",
  voiceTapAriaStart: "Stuknij, aby rozpocząć nagrywanie",
  voiceTapAriaStop: "Stuknij, aby zatrzymać nagrywanie",
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
  voiceMicOnceHint:
    "If the browser asks, you can choose “allow this time only”. The microphone is active only while recording — then access is released.",
  voiceMicReleased: "Microphone off. The next recording will ask for permission again.",
  voiceTapLabel: "TAP",
  voiceTapAriaStart: "Tap to start recording",
  voiceTapAriaStop: "Tap to stop recording",
};

const COPY: Partial<Record<Lang, VoiceFlowCopy>> = {
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
    voiceMicOnceHint:
      "Se il browser chiede, potete scegliere «consenti solo questa volta». Il microfono è attivo solo durante la registrazione.",
    voiceMicReleased: "Microfono disattivato. La prossima registrazione chiederà di nuovo il permesso.",
    voiceTapLabel: "TAP",
    voiceTapAriaStart: "Tocca per iniziare la registrazione",
    voiceTapAriaStop: "Tocca per fermare la registrazione",
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
    voiceMicOnceHint:
      "У діалогу браузера можна обрати «дозволити лише цього разу». Мікрофон активний лише під час запису.",
    voiceMicReleased: "Мікрофон вимкнено. Наступний запис знову попросить дозволу.",
    voiceTapLabel: "TAP",
    voiceTapAriaStart: "Торкніться, щоб почати запис",
    voiceTapAriaStop: "Торкніться, щоб зупинити запис",
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
    voiceMicOnceHint:
      "A böngésző kérdezhet — választhatja az „egyszer engedélyezem” lehetőséget. A mikrofon csak felvétel közben aktív.",
    voiceMicReleased: "Mikrofon kikapcsolva. A következő felvétel újra engedélyt kér.",
    voiceTapLabel: "TAP",
    voiceTapAriaStart: "Érintse meg a felvétel indításához",
    voiceTapAriaStop: "Érintse meg a felvétel leállításához",
  },
};

export function voiceFlowCopy(lang: Lang): VoiceFlowCopy {
  const block = COPY[lang];
  return block ? { ...EN, ...block } : EN;
}
