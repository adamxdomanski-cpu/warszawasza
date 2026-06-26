"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useIoeSession } from "../../hooks/useIoeSession";
import { formatDiagnosticDump } from "../../lib/ioe/IoeSensor";
import {
  SAVED_OBSERVATION_SESSION_KEY,
  SAVED_SCREEN_COPY,
  buildShareClipboardText,
  statusTextForVariant,
  type SavedObservationView,
  type StatusVariant,
} from "../../lib/savedObservationScreen";

type ObservationSavedScreenProps = {
  initialView: SavedObservationView;
  variantFromUrl: StatusVariant;
};

function readSessionView(): SavedObservationView | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SAVED_OBSERVATION_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedObservationView;
    return parsed?.shareUrl ? parsed : null;
  } catch {
    return null;
  }
}

export default function ObservationSavedScreen({
  initialView,
  variantFromUrl,
}: ObservationSavedScreenProps) {
  const shareRef = useRef<HTMLButtonElement>(null);
  const diagnosticsRef = useRef<HTMLDetailsElement>(null);
  const { finalize } = useIoeSession({ hoverTargetRef: shareRef, diagnosticsRef });

  const [view, setView] = useState<SavedObservationView>(initialView);
  const screenCopy = SAVED_SCREEN_COPY[view.lang] ?? SAVED_SCREEN_COPY.pl;
  const [shareLabel, setShareLabel] = useState(screenCopy.share);
  const [diagnosticDump, setDiagnosticDump] = useState(initialView.rawPayload);

  useEffect(() => {
    document.documentElement.lang = view.lang;
  }, [view.lang]);

  useEffect(() => {
    const fromSession = readSessionView();
    if (fromSession) {
      const lang = fromSession.lang ?? initialView.lang;
      setView({
        ...fromSession,
        lang,
        statusVariant: variantFromUrl,
        statusText: statusTextForVariant(lang, variantFromUrl),
      });
      setDiagnosticDump(fromSession.rawPayload);
      setShareLabel((SAVED_SCREEN_COPY[lang] ?? SAVED_SCREEN_COPY.pl).share);
    }
  }, [variantFromUrl, initialView.lang]);

  const copySignal = useCallback(async () => {
    const ioe = finalize("share");
    setDiagnosticDump(formatDiagnosticDump(view.rawPayload, ioe));
    const copy = SAVED_SCREEN_COPY[view.lang] ?? SAVED_SCREEN_COPY.pl;

    const text = buildShareClipboardText(view);

    if (!navigator.clipboard?.writeText) {
      window.alert(copy.clipboardUnavailable);
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setShareLabel(copy.shareCopied);
      window.setTimeout(() => setShareLabel(copy.share), 2000);
    } catch {
      window.alert(copy.clipboardFailed);
    }
  }, [finalize, view]);

  const onContinue = useCallback(() => {
    const ioe = finalize("continue");
    setDiagnosticDump(formatDiagnosticDump(view.rawPayload, ioe));
  }, [finalize, view]);

  return (
    <main className="trace-form-panel mx-auto max-w-[420px] border border-accent bg-field px-6 py-[60px] font-sans text-ink leading-[1.6] antialiased">
      <p className="mb-8 font-mono-field text-sm text-accent/55">{view.statusText}</p>

      <p className="mb-3 text-[28px] font-semibold leading-[1.3] tracking-[-0.5px] text-ink [overflow-wrap:anywhere]">
        „{view.observationText}”
      </p>

      <p className="mb-16 font-mono-field text-[15px] text-accent/55">
        {view.place} · {view.time}
      </p>

      <div className="mb-20 flex flex-col gap-5">
        <button
          ref={shareRef}
          id="share-trigger"
          type="button"
          onClick={() => void copySignal()}
          className="w-fit cursor-pointer touch-manipulation border-0 bg-transparent p-0 text-left text-base font-medium text-ink hover:text-accent"
        >
          {shareLabel}
        </button>
        <Link
          href="/"
          onClick={onContinue}
          className="w-fit text-base font-medium text-accent/55 hover:text-accent"
        >
          {screenCopy.continue}
        </Link>
      </div>

      <details
        ref={diagnosticsRef}
        id="diagnostics-panel"
        className="border-t border-dashed border-accent/25 pt-4"
      >
        <summary className="cursor-pointer list-none font-mono-field text-xs text-accent/45 [&::-webkit-details-marker]:hidden">
          {screenCopy.diagnostics}
        </summary>
        <div className="mt-3 font-mono-field text-xs leading-normal text-accent/55">
          <div>
            <strong className="text-ink">{screenCopy.traceId}:</strong> {view.traceToken}
          </div>
          <div className="mt-1 text-accent/40">{screenCopy.diagnosticsLegend}</div>
        </div>
        <pre className="trace-field-input mt-3 overflow-x-auto rounded-md border border-accent/20 bg-field p-3 font-mono text-[11px] whitespace-pre-wrap break-all text-accent/65">
          {diagnosticDump}
        </pre>
      </details>
    </main>
  );
}

export function persistSavedObservationView(view: SavedObservationView): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SAVED_OBSERVATION_SESSION_KEY, JSON.stringify(view));
}
