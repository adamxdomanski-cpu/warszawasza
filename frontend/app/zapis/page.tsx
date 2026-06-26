import ObservationSavedScreen from "../components/ObservationSavedScreen";
import {
  buildSavedObservationView,
  parseStatusVariant,
  type StatusVariant,
} from "../../lib/savedObservationScreen";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function param(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** Demo payload for A/B screenshots when no session — layout frozen, only statusText varies. */
function demoView(variant: StatusVariant) {
  return buildSavedObservationView(
    {
      lang: "pl",
      trajectory: "true",
      engineIndex: 2,
      attentionCount: 4,
      clock: "18:42",
      logLines: ["● OBSERWACJA TRWA"],
      createdAt: 1782404755620,
      citizen: {
        place: "Muranów",
        observedAt: "18:42",
        subject: "core-ecology",
        relatedRefs: "Para na ławce. Cisza dłuższa niż hałas ulicy.",
        traceDecision: "true",
        obsidianRef: "10_OBSERWACJE/OBS-VCU-2026-06-18-01.md",
      },
    },
    variant,
  );
}

export default async function ZapisPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const variant = parseStatusVariant(param(params.variant));

  const observationText = param(params.observationText);
  const place = param(params.place);
  const time = param(params.time);
  const shareUrl = param(params.shareUrl);
  const traceToken = param(params.traceToken);
  const rawPayload = param(params.rawPayload);

  const base = demoView(variant);

  const initialView =
    observationText && shareUrl
      ? {
          ...base,
          statusVariant: variant,
          statusText: base.statusText,
          observationText,
          place: place ?? base.place,
          time: time ?? base.time,
          shareUrl,
          traceToken: traceToken ?? base.traceToken,
          rawPayload: rawPayload ?? base.rawPayload,
        }
      : base;

  return (
    <ObservationSavedScreen initialView={initialView} variantFromUrl={variant} />
  );
}

export function generateMetadata() {
  return { title: "WARSZAWASZA" };
}
