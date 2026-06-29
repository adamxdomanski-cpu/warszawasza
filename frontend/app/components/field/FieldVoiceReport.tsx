"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ColdStartCopy } from "../../../lib/field/coldStartI18n";
import type { Lang } from "../../../lib/i18n";
import { speechRecognitionLocale, localeDateTime } from "../../../lib/localeMap";
import { journeyUiCopy } from "../../../lib/traceJourney";
import {
  appendInteractionEvent,
  getInteractionTrace,
} from "../../../lib/interactionTrace";
import {
  buildTraceCitizenLayer,
  registerTrace,
  type ObservationTracePayload,
} from "../../../lib/observationTrace";
import SignalControl from "../SignalControl";

type VoicePhase = "idle" | "recording" | "review" | "sent";

type FieldVoiceReportProps = {
  lang: Lang;
  copy: ColdStartCopy;
  onSent?: () => void;
  onFindHelp?: () => void;
};

function formatTimer(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function FieldVoiceReport({
  lang,
  copy,
  onSent,
  onFindHelp,
}: FieldVoiceReportProps) {
  const [phase, setPhase] = useState<VoicePhase>("idle");
  const [seconds, setSeconds] = useState(0);
  const [text, setText] = useState("");
  const [canRecord, setCanRecord] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<number | null>(null);
  const recognitionRef = useRef<{ stop: () => void } | null>(null);
  const ui = journeyUiCopy(lang);

  useEffect(() => {
    setCanRecord(
      typeof window !== "undefined" &&
        typeof MediaRecorder !== "undefined" &&
        !!navigator.mediaDevices?.getUserMedia,
    );
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      recognitionRef.current?.stop();
    };
  }, [audioUrl]);

  const startTranscription = useCallback(() => {
    if (typeof window === "undefined") return;
    const W = window as Window & {
      SpeechRecognition?: new () => SpeechRecognitionInstance;
      webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
    };
    const SR = W.SpeechRecognition ?? W.webkitSpeechRecognition;
    if (!SR) return;

    const rec = new SR();
    rec.lang = speechRecognitionLocale(lang);
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (event: SpeechRecognitionEventLike) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i += 1) {
        transcript += event.results[i][0].transcript;
      }
      setText((prev) => (prev.trim() ? prev : transcript.trim()));
    };
    rec.start();
    recognitionRef.current = rec;
  }, [lang]);

  const stopTranscription = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
  }, []);

  const startRecording = useCallback(async () => {
    if (!canRecord) {
      setPhase("review");
      appendInteractionEvent("RECORD", "manual");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return URL.createObjectURL(blob);
        });
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      appendInteractionEvent("RECORD", "start");
      startTranscription();
      setSeconds(0);
      setPhase("recording");
      timerRef.current = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch {
      setPhase("review");
      appendInteractionEvent("RECORD", "denied");
    }
  }, [canRecord, startTranscription]);

  const stopRecording = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    stopTranscription();
    mediaRecorderRef.current?.stop();
    appendInteractionEvent("RECORD", "stop");
    setPhase("review");
  }, [stopTranscription]);

  const sendReport = useCallback(async () => {
    appendInteractionEvent("CHANGE", text.trim() || "voice");
    appendInteractionEvent("COMPLETE");

    const traceEvents = getInteractionTrace().events;
    const payload: ObservationTracePayload = {
      lang,
      trajectory: null,
      engineIndex: 0,
      attentionCount: 0,
      clock: localeDateTime(lang),
      logLines: ["field/voice"],
      createdAt: Date.now(),
      traceEvents,
      citizen: {
        place: "Mokotów · Warszawa",
        observedAt: new Date().toISOString(),
        subject: "field_heat",
        relatedRefs: text.trim() || copy.ctaVoiceReport,
        traceDecision: "none",
      },
    };

    registerTrace(payload);

    try {
      await navigator.clipboard.writeText(buildTraceCitizenLayer(payload));
      setFlash(ui.copied);
    } catch {
      /* clipboard optional */
    }

    setPhase("sent");
    onSent?.();
    window.setTimeout(() => setFlash(null), 2400);
  }, [copy.ctaVoiceReport, lang, onSent, text, ui.copied]);

  const reset = () => {
    setPhase("idle");
    setText("");
    setSeconds(0);
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
  };

  if (phase === "sent") {
    return (
      <section
        aria-label={copy.voiceSentTitle}
        className="rounded border-2 border-accent/40 bg-field px-4 py-5 sm:px-5"
      >
        <p className="m-0 text-lg font-medium text-ink">{copy.voiceSentTitle}</p>
        <p className="mt-2 mb-5 text-sm text-accent/75">{copy.voiceSentBody}</p>
        {flash && (
          <p className="mb-3 text-xs text-accent/60">{flash}</p>
        )}
        <div className="flex flex-col gap-2">
          <SignalControl
            type="button"
            direction="right"
            onClick={() => {
              onFindHelp?.();
            }}
            className="min-h-12 w-full border border-accent/35 bg-field px-4 py-3 text-left text-sm text-ink touch-manipulation"
          >
            {copy.ctaNearbyHelp}
          </SignalControl>
          <Link
            href="/"
            className="flex min-h-12 w-full items-center border border-accent/25 bg-field/80 px-4 py-3 text-sm text-accent/85 touch-manipulation"
          >
            {copy.ctaAnotherObservation}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label={copy.ctaVoiceReport}
      className="rounded border-2 border-accent/50 bg-field px-4 py-5 sm:px-5"
    >
      <h2 className="m-0 text-lg font-medium leading-snug text-ink sm:text-xl">
        {copy.ctaVoiceReport}
      </h2>

      {!canRecord && phase === "idle" && (
        <p className="mt-2 mb-0 text-sm text-accent/65">{copy.voiceUnsupported}</p>
      )}

      {phase === "idle" && (
        <SignalControl
          type="button"
          direction="right"
          onClick={() => void startRecording()}
          className="mt-4 min-h-14 w-full border-2 border-accent/45 bg-field px-4 py-4 text-left text-base font-medium text-ink touch-manipulation"
        >
          {canRecord ? copy.voiceStart : copy.voiceOrType}
        </SignalControl>
      )}

      {phase === "recording" && (
        <div className="mt-4 space-y-3">
          <p className="m-0 flex items-center gap-2 text-base text-ink">
            <span className="inline-block h-3 w-3 animate-pulse rounded-full bg-[var(--color-warsaw-heat-critical)]" aria-hidden />
            {copy.voiceRecording}
            <span className="ml-auto font-mono-field tabular-nums text-accent/80">
              {formatTimer(seconds)}
            </span>
          </p>
          <SignalControl
            type="button"
            direction="right"
            onClick={stopRecording}
            className="min-h-12 w-full border border-accent/40 bg-field px-4 py-3 text-left text-sm text-ink touch-manipulation"
          >
            {copy.voiceStop}
          </SignalControl>
        </div>
      )}

      {phase === "review" && (
        <div className="mt-4 space-y-3">
          <p className="m-0 text-sm font-medium text-ink">{copy.voiceSaved}</p>
          <p className="m-0 text-sm text-accent/75">{copy.voiceReviewPrompt}</p>
          {audioUrl && (
            <div className="flex flex-wrap gap-2">
              <audio controls src={audioUrl} className="w-full max-w-full" preload="metadata">
                {copy.voicePlay}
              </audio>
            </div>
          )}
          <label className="block space-y-1">
            <span className="text-xs text-accent/55">{copy.voiceOrType}</span>
            <textarea
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={copy.voiceTranscribePlaceholder}
              className="w-full min-h-20 touch-manipulation border border-accent/30 bg-field px-3 py-2.5 text-sm text-ink placeholder:text-accent/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            />
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <SignalControl
              type="button"
              direction="right"
              onClick={() => void sendReport()}
              className="min-h-12 flex-1 border-2 border-accent/45 bg-field px-4 py-3 text-left text-sm font-medium text-ink touch-manipulation"
            >
              {copy.voiceSend}
            </SignalControl>
            <button
              type="button"
              onClick={reset}
              className="min-h-12 border border-accent/20 px-4 py-3 text-sm text-accent/60 touch-manipulation"
            >
              {ui.startOver}
            </button>
          </div>
        </div>
      )}

      {phase === "idle" && (
        <p className="mt-3 mb-0 text-xs text-accent/50">{copy.voiceOrType}</p>
      )}
    </section>
  );
}

type SpeechRecognitionResultItem = { transcript: string };
type SpeechRecognitionResultList = ArrayLike<{ 0: SpeechRecognitionResultItem }>;
type SpeechRecognitionEventLike = { results: SpeechRecognitionResultList };

interface SpeechRecognitionInstance {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  start: () => void;
  stop: () => void;
}
