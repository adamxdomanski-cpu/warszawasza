"use client";

import { useSearchParams } from "next/navigation";
import FlaconActivation from "../../components/market/FlaconActivation";

export default function MarketActivateClient() {
  const params = useSearchParams();
  const serial = params.get("serial");

  return (
    <div className="space-y-6">
      {serial ? (
        <p className="m-0 font-mono-field text-sm text-accent/70">
          Odczytano serial z QR:{" "}
          <span className="tabular-nums text-accent">{serial}</span> — stan oczekuje na zapis w
          rejestrze <code className="text-accent/80">product_flacon_tokens</code>.
        </p>
      ) : null}
      <FlaconActivation />
    </div>
  );
}
