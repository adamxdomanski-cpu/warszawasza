import { buildFopDocument } from "./fopBridge";
import type { ObservationTracePayload } from "./observationTrace";
import { buildTraceShareUrl } from "./observationTrace";
import { traceSubjectOptions } from "./traceFormI18n";
import type { Lang } from "./i18n";

/** A/B isolation: only status line differs between variants. */
export type StatusVariant = "a" | "b";

export type SavedScreenCopy = {
  statusA: string;
  statusB: string;
  share: string;
  shareCopied: string;
  continue: string;
  diagnostics: string;
  traceId: string;
  diagnosticsLegend: string;
  clipboardUnavailable: string;
  clipboardFailed: string;
  shareClipboardLead: string;
};

export const SAVED_SCREEN_COPY: Record<Lang, SavedScreenCopy> = {
  pl: {
    statusA: "Obserwacja została zapisana.",
    statusB: "Ta chwila została zapisana.",
    share: "Udostępnij obserwację",
    shareCopied: "Skopiowano link do obserwacji",
    continue: "Obserwuj dalej →",
    diagnostics: "Diagnostyka",
    traceId: "Trace ID",
    diagnosticsLegend: "FOP = fakt · IOE = zdarzenia · AOP = analiza offline",
    clipboardUnavailable: "Kopiowanie niedostępne w tej przeglądarce.",
    clipboardFailed:
      "Nie udało się automatycznie skopiować linku. Możesz skopiować go z paska adresu.",
    shareClipboardLead: "Obserwacja",
  },
  en: {
    statusA: "Observation saved.",
    statusB: "This moment was saved.",
    share: "Share observation",
    shareCopied: "Observation link copied",
    continue: "Keep observing →",
    diagnostics: "Diagnostics",
    traceId: "Trace ID",
    diagnosticsLegend: "FOP = fact · IOE = events · AOP = offline analysis",
    clipboardUnavailable: "Copy is not available in this browser.",
    clipboardFailed: "Could not copy the link automatically. Copy it from the address bar.",
    shareClipboardLead: "Observation",
  },
  it: {
    statusA: "Osservazione salvata.",
    statusB: "Questo momento è stato salvato.",
    share: "Condividi osservazione",
    shareCopied: "Link dell'osservazione copiato",
    continue: "Continua ad osservare →",
    diagnostics: "Diagnostica",
    traceId: "Trace ID",
    diagnosticsLegend: "FOP = fatto · IOE = eventi · AOP = analisi offline",
    clipboardUnavailable: "Copia non disponibile in questo browser.",
    clipboardFailed: "Impossibile copiare il link. Copialo dalla barra degli indirizzi.",
    shareClipboardLead: "Osservazione",
  },
  uk: {
    statusA: "Спостереження збережено.",
    statusB: "Цей момент збережено.",
    share: "Поділитися спостереженням",
    shareCopied: "Посилання скопійовано",
    continue: "Спостерігати далі →",
    diagnostics: "Діагностика",
    traceId: "Trace ID",
    diagnosticsLegend: "FOP = факт · IOE = події · AOP = офлайн-аналіз",
    clipboardUnavailable: "Копіювання недоступне.",
    clipboardFailed: "Не вдалося скопіювати посилання.",
    shareClipboardLead: "Спостереження",
  },
  bg: {
    statusA: "Observation saved.",
    statusB: "This moment was saved.",
    share: "Share observation",
    shareCopied: "Link copied",
    continue: "Keep observing →",
    diagnostics: "Diagnostics",
    traceId: "Trace ID",
    diagnosticsLegend: "FOP = fact · IOE = events · AOP = offline analysis",
    clipboardUnavailable: "Copy unavailable.",
    clipboardFailed: "Could not copy link.",
    shareClipboardLead: "Observation",
  },
  et: {
    statusA: "Observation saved.",
    statusB: "This moment was saved.",
    share: "Share observation",
    shareCopied: "Link copied",
    continue: "Keep observing →",
    diagnostics: "Diagnostics",
    traceId: "Trace ID",
    diagnosticsLegend: "FOP = fact · IOE = events · AOP = offline analysis",
    clipboardUnavailable: "Copy unavailable.",
    clipboardFailed: "Could not copy link.",
    shareClipboardLead: "Observation",
  },
  fi: {
    statusA: "Observation saved.",
    statusB: "This moment was saved.",
    share: "Share observation",
    shareCopied: "Link copied",
    continue: "Keep observing →",
    diagnostics: "Diagnostics",
    traceId: "Trace ID",
    diagnosticsLegend: "FOP = fact · IOE = events · AOP = offline analysis",
    clipboardUnavailable: "Copy unavailable.",
    clipboardFailed: "Could not copy link.",
    shareClipboardLead: "Observation",
  },
  lt: {
    statusA: "Observation saved.",
    statusB: "This moment was saved.",
    share: "Share observation",
    shareCopied: "Link copied",
    continue: "Keep observing →",
    diagnostics: "Diagnostics",
    traceId: "Trace ID",
    diagnosticsLegend: "FOP = fact · IOE = events · AOP = offline analysis",
    clipboardUnavailable: "Copy unavailable.",
    clipboardFailed: "Could not copy link.",
    shareClipboardLead: "Observation",
  },
  lv: {
    statusA: "Observation saved.",
    statusB: "This moment was saved.",
    share: "Share observation",
    shareCopied: "Link copied",
    continue: "Keep observing →",
    diagnostics: "Diagnostics",
    traceId: "Trace ID",
    diagnosticsLegend: "FOP = fact · IOE = events · AOP = offline analysis",
    clipboardUnavailable: "Copy unavailable.",
    clipboardFailed: "Could not copy link.",
    shareClipboardLead: "Observation",
  },
  hu: {
    statusA: "Observation saved.",
    statusB: "This moment was saved.",
    share: "Share observation",
    shareCopied: "Link copied",
    continue: "Keep observing →",
    diagnostics: "Diagnostics",
    traceId: "Trace ID",
    diagnosticsLegend: "FOP = fact · IOE = events · AOP = offline analysis",
    clipboardUnavailable: "Copy unavailable.",
    clipboardFailed: "Could not copy link.",
    shareClipboardLead: "Observation",
  },
};

export const STATUS_VARIANT_COPY: Record<StatusVariant, string> = {
  a: SAVED_SCREEN_COPY.pl.statusA,
  b: SAVED_SCREEN_COPY.pl.statusB,
};

export function statusTextForVariant(lang: Lang, variant: StatusVariant): string {
  const copy = SAVED_SCREEN_COPY[lang] ?? SAVED_SCREEN_COPY.en;
  return variant === "b" ? copy.statusB : copy.statusA;
}

export type SavedObservationView = {
  lang: Lang;
  statusText: string;
  statusVariant: StatusVariant;
  observationText: string;
  place: string;
  time: string;
  shareUrl: string;
  traceToken: string;
  rawPayload: string;
};

export const SAVED_OBSERVATION_SESSION_KEY = "warszawasza-saved-observation-v1";

export function parseStatusVariant(value: string | null | undefined): StatusVariant {
  return value === "b" ? "b" : "a";
}

export function assignStatusVariant(): StatusVariant {
  return Math.random() < 0.5 ? "a" : "b";
}

function observationTextFromTrace(trace: ObservationTracePayload): string {
  const text = trace.citizen?.relatedRefs?.trim();
  if (text) return text;
  const lang = trace.lang as Lang;
  const subject = trace.citizen?.subject;
  if (subject) {
    const label = traceSubjectOptions(lang).find((opt) => opt.value === subject)?.label;
    if (label) return label;
  }
  return "—";
}

export function buildSavedObservationView(
  trace: ObservationTracePayload,
  variant: StatusVariant,
  origin = "https://www.warszawasza.online",
): SavedObservationView {
  const shareUrl = buildTraceShareUrl(trace, origin);
  const traceToken = new URL(shareUrl).searchParams.get("trace") ?? "";

  return {
    lang: trace.lang,
    statusText: statusTextForVariant(trace.lang, variant),
    statusVariant: variant,
    observationText: observationTextFromTrace(trace),
    place: trace.citizen?.place?.trim() || "—",
    time: trace.citizen?.observedAt?.trim() || trace.clock,
    shareUrl,
    traceToken,
    rawPayload: buildFopDocument(trace),
  };
}

export function buildShareClipboardText(view: SavedObservationView): string {
  const copy = SAVED_SCREEN_COPY[view.lang] ?? SAVED_SCREEN_COPY.en;
  return `${copy.shareClipboardLead}: „${view.observationText}”\n${view.shareUrl}`;
}
