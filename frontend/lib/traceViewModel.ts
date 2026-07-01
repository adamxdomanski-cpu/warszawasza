/**
 * View model for CitizenTrace — maps FOP payload to three-layer UI data.
 */

import { formatEventLabel, compactTracePath } from "./interactionTrace";
import type { InteractionEvent } from "./fira-core/interaction";
import { traceArtifactCopy, traceResidentCopy, type Lang } from "./i18n";
import { traceToObservation } from "./fopBridge";
import {
  formatRelativeTime,
  formatShortTraceId,
  getTraceCitizenView,
  getTraceTechnicalSummary,
  isHeatDeployment,
  type ObservationTracePayload,
  type TracePresentationOptions,
} from "./observationTrace";
import { isTerrainVerified } from "./traceStatus";
import { STUDIO_ANCHOR } from "./studioAnchor";
import { getOperatorSteps, journeyLayerTitle } from "./traceJourney";
import { localizeCitizenPlace } from "./field/citizenPlace";

export type TraceStatus = "PENDING" | "VERIFIED" | "CLOSED";

export type TraceData = {
  headline: string;
  id: string;
  traceReferenceLine: string;
  timestamp: string;
  location: string;
  description?: string;
  status: TraceStatus;
  statusLabel: string;
  statusText: string;
  savedConfirmation: string;
  emailNote: string;
  heatGuidance?: string;
  nearbyCta?: string;
  processTitle: string;
  processSteps: { text: string; state: "done" | "active" }[];
  technicalTitle: string;
  technicalDetailsLabel: string;
  telemetry: {
    pipelineScore: string;
    chain: string;
    steps: string[];
    rawJson: Record<string, unknown>;
  };
};

function resolveEvents(trace: ObservationTracePayload): InteractionEvent[] {
  return trace.traceEvents ?? trace.decisionEvents ?? [];
}

function traceStatus(trace: ObservationTracePayload): TraceStatus {
  if (isTerrainVerified(trace)) return "VERIFIED";
  if (trace.citizen?.traceDecision === "false") return "CLOSED";
  return "PENDING";
}

function pipelineBar(trace: ObservationTracePayload): { level: number; bar: string } {
  const events = resolveEvents(trace);
  const completed = events.some((e) => e.event === "COMPLETE");
  const obs = traceToObservation(trace);
  let level = obs.evidence.level as number;
  if (completed) {
    level = Math.max(level, Math.min(5, trace.engineIndex >= 7 ? 5 : trace.engineIndex + 1));
  }
  if (level < 1) level = completed ? 5 : 1;
  level = Math.max(1, Math.min(5, level));
  return { level, bar: "█".repeat(level) + "░".repeat(5 - level) };
}

export function buildTraceViewModel(
  trace: ObservationTracePayload,
  options: TracePresentationOptions = {},
): TraceData {
  const displayLang = options.displayLang ?? trace.lang;
  const rc = traceResidentCopy(displayLang);
  const artifact = traceArtifactCopy(displayLang);
  const citizen = getTraceCitizenView(trace, options);
  const summary = getTraceTechnicalSummary(trace, displayLang);
  const events = resolveEvents(trace);
  const { level, bar } = pipelineBar(trace);
  const heat = options.heatContext ?? isHeatDeployment(trace);
  const place =
    localizeCitizenPlace(trace.citizen?.place, displayLang) || rc.cityDefault;

  const pipelineScore = `${level}/5 ${bar}`;

  const obs = traceToObservation(trace);

  return {
    headline: citizen.headline,
    id: summary.traceId,
    traceReferenceLine: `${rc.traceReferencePrefix} #${summary.traceId}`,
    timestamp: formatRelativeTime(trace, displayLang),
    location: place,
    ...(citizen.description ? { description: citizen.description } : {}),
    status: traceStatus(trace),
    statusLabel: rc.statusLabel,
    statusText: citizen.statusLine,
    savedConfirmation: rc.savedConfirmation,
    emailNote: rc.emailNotConfigured,
    ...(heat ? { heatGuidance: rc.heatGuidance, nearbyCta: rc.showNearbyPlaces } : {}),
    processTitle: journeyLayerTitle(displayLang),
    processSteps: getOperatorSteps(displayLang, trace),
    technicalTitle: rc.technicalData,
    technicalDetailsLabel: rc.technicalDetails,
    telemetry: {
      pipelineScore,
      chain: summary.telemetryValue || artifact.chainStages,
      steps: events.length ? events.map(formatEventLabel) : ["—"],
      rawJson: {
        trace_id: formatShortTraceId(trace.createdAt),
        pipeline_spojnosc: bar,
        path: events.length ? compactTracePath(events) : undefined,
        telemetry: artifact.chainStages.replace(/ → /g, "->"),
        anchor: [STUDIO_ANCHOR.lat, STUDIO_ANCHOR.lon],
        ...(trace.attentionCount > 0 ? { impulsy_uwagi: trace.attentionCount } : {}),
        src: obs.source.channel,
        ...(obs.source.ref ? { ref: obs.source.ref } : {}),
        lang: trace.lang,
        ...(trace.citizen?.subject ? { subject: trace.citizen.subject } : {}),
      },
    },
  };
}

/** Field-test reference — Ślad #20260628-180642 (Dzielna). Dev / docs only. */
export const MOCK_DZIELNA_TRACE: TraceData = {
  headline: "✓ Zgłoszenie odebrane",
  id: "20260628-180642",
  traceReferenceLine: "Ślad #20260628-180642",
  timestamp: "2 minuty temu",
  location: "Warszawa, rejon ul. Dzielnej",
  description: "Przy tej temperaturze topi się asfalt i czuć intensywny zapach.",
  status: "PENDING",
  statusLabel: "Stan:",
  statusText: "Oczekuje na potwierdzenie.",
  savedConfirmation: "Zapisano na tym urządzeniu.",
  emailNote: "Automatyczna kopia e-mail będzie dostępna w kolejnej wersji.",
  heatGuidance: "Jeżeli przebywasz na zewnątrz podczas upału,\nznajdź wodę i cień.",
  nearbyCta: "📍 Pokaż najbliższe miejsca",
  processTitle: "Jak przetwarzamy to zgłoszenie?",
  processSteps: [
    { text: "Odebraliśmy zgłoszenie z kanału obywatelskiego.", state: "done" },
    { text: "Zlokalizowaliśmy obszar i przypisaliśmy punkt odniesienia.", state: "done" },
    {
      text: "Uruchomiliśmy nasłuch i czekamy na potwierdzenie z terenu.",
      state: "active",
    },
  ],
  technicalTitle: "Dane techniczne",
  technicalDetailsLabel: "Pełne szczegóły (JSON, FOP)",
  telemetry: {
    pipelineScore: "5/5 █████",
    chain: "OBS → SIG → PROC → FIL → PAM → WAL → WIE",
    steps: ["START", "SELECT(MOKOTOW)", "PAUSE", "SELECT(TRUE)", "NEXT", "COMPLETE"],
    rawJson: {
      src: "CHANNEL_A_CITIZEN",
      anchor: [52.24886, 20.99241],
      impulsy_uwagi: 24,
      clock: "00:02:05",
      trajectory: true,
      subject: "core-security",
    },
  },
};
