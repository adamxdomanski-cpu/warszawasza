"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import LivingInterface from "./LivingInterface";
import LucyAttention from "./LucyAttention";
import SignalFieldProvider from "./SignalFieldProvider";
import ColdStartClient from "./field/ColdStartClient";

function HomeRouter() {
  const params = useSearchParams();
  const legacy = params.get("legacy") === "1";

  if (legacy) {
    return (
      <SignalFieldProvider>
        <LucyAttention />
        <LivingInterface />
      </SignalFieldProvider>
    );
  }

  return <ColdStartClient />;
}

/** Default `/` = cold start; full studio UI at `/?legacy=1`. */
export default function HomeEntry() {
  return (
    <Suspense fallback={<ColdStartClient />}>
      <HomeRouter />
    </Suspense>
  );
}
