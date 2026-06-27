"use client";

import { useCallback, useState } from "react";
import type { FlaconLifecycleState } from "../../../lib/flaconTokens";
import SignalControl from "../SignalControl";

type ActivateResponse = {
  success: boolean;
  flacon_serial_id?: string;
  lifecycle_state?: FlaconLifecycleState;
  disclaimer?: string;
  error?: { code: string; message: string };
};

type FlaconActivationProps = {
  initialSerial?: string | null;
};

export default function FlaconActivation({ initialSerial = null }: FlaconActivationProps) {
  const [serial, setSerial] = useState(initialSerial ?? "");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [activated, setActivated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activate = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/market/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flacon_serial_id: serial.trim(),
          cryptographic_token: token.trim(),
        }),
      });
      const data = (await res.json()) as ActivateResponse;
      if (!res.ok || !data.success) {
        setError(data.error?.message ?? "Aktywacja nie powiodła się.");
        setActivated(false);
        return;
      }
      setActivated(true);
    } catch {
      setError("Błąd sieci podczas aktywacji.");
      setActivated(false);
    } finally {
      setLoading(false);
    }
  }, [serial, token]);

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
          Wpisz dane z etykiety flaconu (PolakPotrafi, 2015 — projekt rzemieślniczy WARSZAWASZA).
          Aktywacja wiąże <strong className="font-normal text-accent">węzeł produktu</strong>, nie
          status zweryfikowanego operatora terenowego (Layer 0).
        </p>
      </div>

      {activated ? (
        <div className="space-y-2 rounded border border-emerald-500/30 bg-emerald-950/20 p-4 font-mono-field text-sm text-emerald-300">
          <p className="m-0 font-semibold">✓ Węzeł produktu sparowany</p>
          <p className="m-0 text-accent/60">
            Serial {serial} · stan ACTIVE. Reputacja terenowa wymaga osobnej walidacji Layer 0.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <label className="block space-y-1 font-mono-field text-xs text-accent/55">
            Serial (WAW-2026-XXXX)
            <input
              type="text"
              value={serial}
              onChange={(e) => setSerial(e.target.value.toUpperCase())}
              className="w-full border border-accent/20 bg-black/40 p-2 font-mono-field text-sm text-accent focus:border-accent/50 focus:outline-none"
              autoComplete="off"
            />
          </label>
          <label className="block space-y-1 font-mono-field text-xs text-accent/55">
            Token kryptograficzny (UUID z korka / etykiety)
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full border border-accent/20 bg-black/40 p-2 font-mono-field text-sm text-accent focus:border-accent/50 focus:outline-none"
              autoComplete="off"
            />
          </label>
          <SignalControl
            type="button"
            direction="right"
            disabled={loading || !serial.trim() || !token.trim()}
            onClick={() => void activate()}
            className="accent-signal min-h-11 touch-manipulation font-mono-field text-sm tracking-[0.12em] uppercase"
          >
            {loading ? "Autoryzacja…" : "Połącz z siatką →"}
          </SignalControl>
        </div>
      )}

      {error ? (
        <p className="m-0 font-mono-field text-sm text-red-400/90" role="alert">
          {error}
        </p>
      ) : null}

      <p className="m-0 font-mono-field text-xs text-accent/45">
        Emisja tokenów (forge) — tylko terminal pracowni:{" "}
        <code className="text-accent/60">curl -X POST …/api/market/forge -H X-Admin-Secret:…</code>
      </p>
    </section>
  );
}
