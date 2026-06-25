"use client";

import { useCallback, useEffect, useState } from "react";
import type { TrajectoryChoice } from "../../lib/artifactI18n";
import type { Lang } from "../../lib/i18n";
import { COPY } from "../../lib/i18n";
import {
  buildMailtoHref,
  buildTraceDocument,
  getTraceRegistryCount,
  registerTrace,
  type ObservationTracePayload,
} from "../../lib/observationTrace";
import SignalControl from "./SignalControl";

type LeaveTraceControlProps = {
  lang: Lang;
  trajectory: TrajectoryChoice | null;
  engineIndex: number;
  attentionCount: number;
  clock: string;
  logLines: string[];
  className?: string;
  showRegistry?: boolean;
};

export default function LeaveTraceControl({
  lang,
  trajectory,
  engineIndex,
  attentionCount,
  clock,
  logLines,
  className = "",
  showRegistry = true,
}: LeaveTraceControlProps) {
  const copy = COPY[lang];
  const [registryCount, setRegistryCount] = useState(0);
  const [flash, setFlash] = useState<string | null>(null);

  useEffect(() => {
    setRegistryCount(getTraceRegistryCount());
  }, []);

  const leaveTrace = useCallback(async () => {
    const payload: ObservationTracePayload = {
      lang,
      trajectory,
      engineIndex,
      attentionCount,
      clock,
      logLines,
      createdAt: Date.now(),
    };

    const count = registerTrace(payload);
    setRegistryCount(count);

    const document = buildTraceDocument(payload);

    try {
      await navigator.clipboard.writeText(document);
      setFlash(copy.trace.copied);
    } catch {
      setFlash(copy.trace.copyFailed);
    }

    window.setTimeout(() => setFlash(null), 2400);
    window.setTimeout(() => {
      window.location.href = buildMailtoHref(payload);
    }, 350);
  }, [
    lang,
    trajectory,
    engineIndex,
    attentionCount,
    clock,
    logLines,
    copy.trace.copied,
    copy.trace.copyFailed,
  ]);

  return (
    <div className="space-y-1.5">
      <SignalControl
        direction="right"
        className={`inline-flex min-h-11 items-center border border-accent-muted px-3 py-2 font-mono-field text-[11px] tracking-[0.12em] touch-manipulation sm:text-xs ${className}`}
        onClick={() => {
          void leaveTrace();
        }}
      >
        {copy.leaveTrace}
      </SignalControl>
      {showRegistry && registryCount > 0 && (
        <div className="font-mono-field text-[10px] tracking-wide text-accent/45 sm:text-[11px]">
          {copy.trace.registry.replace("{n}", String(registryCount))}
        </div>
      )}
      {flash && (
        <div className="font-mono-field text-[10px] tracking-wide text-accent/70 sm:text-[11px]">
          {flash}
        </div>
      )}
    </div>
  );
}
