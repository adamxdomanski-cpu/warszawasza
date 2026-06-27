import Link from "next/link";
import { Suspense } from "react";
import FieldBackdrop from "../../components/FieldBackdrop";
import MarketActivatePage from "./MarketActivateClient";

export const metadata = {
  title: "WARSZAWASZA · Aktywacja flaconu",
};

export default function ActivateRoutePage() {
  return (
    <>
      <FieldBackdrop />
      <main className="relative z-10 mx-auto min-h-dvh max-w-lg p-5 pb-16 sm:p-8">
        <Link
          href="/market"
          className="mb-8 inline-block font-mono-field text-xs tracking-[0.14em] text-accent/55 uppercase hover:text-accent"
        >
          ← market
        </Link>
        <Suspense fallback={<p className="font-mono-field text-sm text-accent/55">Ładowanie…</p>}>
          <MarketActivatePage />
        </Suspense>
      </main>
    </>
  );
}
