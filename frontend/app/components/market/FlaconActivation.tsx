"use client";

import { useCallback, useState } from "react";
import type { ForgeArtifact } from "../../../lib/flaconTokens";
import SignalControl from "../SignalControl";

type ForgeResponse = {
  success: boolean;
  origin?: string;
  artifact?: ForgeArtifact;
  disclaimer?: string;
  error?: { code: string; message: string };
};

export default function FlaconActivation() {
  const [loading, setLoading] = useState(false);
  const [artifact, setArtifact] = useState<ForgeArtifact | null>(null);
  const [error, setError] = useState<string | null>(null);

  const forgeToken = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/market/forge", { method: "POST" });
      const data = (await res.json()) as ForgeResponse;
      if (!res.ok || !data.success || !data.artifact) {
        setError(data.error?.message ?? "Nie udało się wykuć tokenu.");
        setArtifact(null);
        return;
      }
      setArtifact(data.artifact);
    } catch {
      setError("Błąd sieci podczas emisji tokenu.");
      setArtifact(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <section className="space-y-6" aria-labelledby="flacon-activation-heading">
      <div className="space-y-2">
        <h2
          id="flacon-activation-heading"
          className="font-mono-field text-sm tracking-[0.14em] text-accent uppercase"
        >
          Zapach WARSZAWASZA · węzeł O2O
        </h2>
        <p className="m-0 max-w-prose text-sm leading-relaxed text-accent/70">
          Fizyczny flakon wiąże produkt z siatką telemetryczną. Aktywacja{" "}
          <strong className="font-normal text-accent">nie</strong> nadaje statusu zweryfikowanego
          operatora terenowego (Layer 0).
        </p>
      </div>

      <SignalControl
        type="button"
        direction="right"
        disabled={loading}
        onClick={() => void forgeToken()}
        className="accent-signal min-h-11 touch-manipulation font-mono-field text-sm tracking-[0.12em] uppercase"
      >
        {loading ? "Krystalizacja…" : "Wykuj token flaconu →"}
      </SignalControl>

      {error ? (
        <p className="m-0 font-mono-field text-sm text-red-400/90" role="alert">
          {error}
        </p>
      ) : null}

      {artifact ? (
        <div className="space-y-3 rounded border border-accent/20 bg-black/30 p-4 font-mono-field text-xs sm:text-sm">
          <p className="m-0 tracking-wide text-accent/55">STAN · FORGED</p>
          <dl className="m-0 grid gap-2">
            <div>
              <dt className="text-accent/45">Serial</dt>
              <dd className="m-0 tabular-nums">{artifact.flacon_serial_id}</dd>
            </div>
            <div>
              <dt className="text-accent/45">Token</dt>
              <dd className="m-0 break-all tabular-nums">{artifact.cryptographic_token}</dd>
            </div>
            <div>
              <dt className="text-accent/45">QR payload</dt>
              <dd className="m-0 break-all">{artifact.qr_payload}</dd>
            </div>
          </dl>
          <p className="m-0 text-accent/50">
            Ślad #20260627-224500 pozostaje OPEN / UNVERIFIED do potwierdzenia przez węzły Layer 0.
          </p>
        </div>
      ) : null}
    </section>
  );
}
