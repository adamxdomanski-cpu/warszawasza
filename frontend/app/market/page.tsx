import Link from "next/link";
import TraceStatusBadge from "../components/civic/TraceStatusBadge";
import FlaconActivation from "../components/market/FlaconActivation";
import FieldBackdrop from "../components/FieldBackdrop";

export const metadata = {
  title: "WARSZAWASZA · Zapach | O2O",
  description:
    "Produkt premium Zapach WARSZAWASZA — węzeł uwierzytelniający, nie weryfikacja terenu.",
};

export default function MarketPage() {
  return (
    <>
      <FieldBackdrop />
      <main className="relative z-10 mx-auto min-h-dvh max-w-lg p-5 pb-16 sm:p-8">
        <header className="mb-10 space-y-3">
          <Link
            href="/"
            className="font-mono-field text-xs tracking-[0.14em] text-accent/55 uppercase hover:text-accent"
          >
            ← pole obserwacji
          </Link>
          <h1 className="m-0 text-2xl font-light tracking-tight sm:text-3xl">Zapach WARSZAWASZA</h1>
          <p className="m-0 text-sm leading-relaxed text-accent/65">
            Pracownia Dzielna 3A/7 · pętla O2O · migracja{" "}
            <code className="text-accent/80">013_product_flacon_tokens</code>
          </p>
          <TraceStatusBadge
            isPipelineValid
            layerZeroStatus="UNVERIFIED"
            emotionalTemperature="POSITIVE"
            urgency={false}
          />
        </header>

        <FlaconActivation />

        <footer className="mt-12 border-t border-accent/15 pt-6 font-mono-field text-xs text-accent/45">
          COP v1.0 — zakup flaconu ≠ fakt terenowy. Monitoring: Ślad #20260627-224500.
        </footer>
      </main>
    </>
  );
}
