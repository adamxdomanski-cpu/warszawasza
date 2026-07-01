"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type { ColdStartCopy } from "../../../lib/field/coldStartI18n";
import { clearVoiceDraft, loadVoiceDraft, saveVoiceDraft } from "../../../lib/field/voiceDraft";
import {
  canUseAudioRecording,
  createAudioRecorder,
  pickAudioMimeType,
  releaseMediaStream,
} from "../../../lib/field/mediaRecorderSupport";
import type { Lang } from "../../../lib/i18n";
import { traceResidentCopy } from "../../../lib/i18n";
import { speechRecognitionLocale, localeDateTime } from "../../../lib/localeMap";
import {
  formatPlaceFromGeo,
  readCurrentPosition,
  voiceGeoCopy,
  type GeoPoint,
} from "../../../lib/field/voiceGeoCopy";
import { journeyUiCopy } from "../../../lib/traceJourney";
import { unknownPlaceLabel } from "../../../lib/field/citizenPlace";
import {
  appendInteractionEvent,
  clearInteractionTrace,
  getInteractionTrace,
} from "../../../lib/interactionTrace";
import {
  registerTrace,
  type ObservationTracePayload,
} from "../../../lib/observationTrace";
import TraceReceiptPanel, { copyCitizenTraceText } from "./TraceReceiptPanel";
import SignalControl from "../SignalControl";
import VoiceTapControl from "./VoiceTapControl";

type VoicePhase = "idle" | "recording" | "review" | "sent";
type SttStatus = "idle" | "pending" | "ok" | "failed";

export type FieldVoiceReportHandle = {
  startRecording: () => void;
};

type FieldVoiceReportProps = {
  lang: Lang;
  copy: ColdStartCopy;
  onSent?: () => void;
  onFindHelp?: () => void;
  /** Header CTAs already label voice — hide duplicate chrome until recording. */
  lean?: boolean;
  /** Heat deployment — show orientation CTA, not interpretation. */
  heatContext?: boolean;
};

function formatTimer(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function audioOnlyLabel(lang: Lang): string {
  return lang === "pl" ? "[nagranie głosowe]" : "[voice recording]";
}

const FieldVoiceReport = forwardRef<FieldVoiceReportHandle, FieldVoiceReportProps>(
  function FieldVoiceReport({ lang, copy, onSent, onFindHelp, lean = false, heatContext = false }, ref) {
    const [phase, setPhase] = useState<VoicePhase>("idle");
    const [seconds, setSeconds] = useState(0);
    const [text, setText] = useState("");
    const [canRecord, setCanRecord] = useState(() => canUseAudioRecording());
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [hasAudioBlob, setHasAudioBlob] = useState(false);
    const [flash, setFlash] = useState<string | null>(null);
    const [micFallback, setMicFallback] = useState(false);
    const [sttStatus, setSttStatus] = useState<SttStatus>("idle");
    const [geo, setGeo] = useState<GeoPoint | null>(null);
    const [geoBusy, setGeoBusy] = useState(false);
    const [geoError, setGeoError] = useState<string | null>(null);
    const [sentPayload, setSentPayload] = useState<ObservationTracePayload | null>(null);
    const [pendingDraft, setPendingDraft] = useState<ReturnType<typeof loadVoiceDraft>>(null);
    const [sending, setSending] = useState(false);

    const geoCopy = voiceGeoCopy(lang);
    const rc = traceResidentCopy(lang);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const chunksRef = useRef<BlobPart[]>([]);
    const audioMimeRef = useRef<string>("audio/webm");
    const timerRef = useRef<number | null>(null);
    const recognitionRef = useRef<{ stop: () => void } | null>(null);
    const userEditedTextRef = useRef(false);
    const playbackAudioRef = useRef<HTMLAudioElement>(null);
    const autoPlayAfterStopRef = useRef(false);
    const ui = journeyUiCopy(lang);

    useEffect(() => {
      setCanRecord(canUseAudioRecording());
      const draft = loadVoiceDraft();
      if (draft?.text.trim()) setPendingDraft(draft);
    }, []);

    useEffect(() => {
      if (phase !== "review" && phase !== "recording") return;
      saveVoiceDraft({
        text,
        lang,
        heatContext,
        ...(geo ? { geo: { lat: geo.lat, lon: geo.lng, accuracy: geo.accuracyM } } : {}),
      });
    }, [text, phase, lang, heatContext, geo]);

    useEffect(() => {
      if (phase !== "review" || !audioUrl || !hasAudioBlob || !autoPlayAfterStopRef.current) {
        return;
      }
      autoPlayAfterStopRef.current = false;
      const el = playbackAudioRef.current;
      if (!el) return;
      void el.play().catch(() => {
        /* autoplay blocked — user uses controls */
      });
    }, [phase, audioUrl, hasAudioBlob]);

    useEffect(() => {
      return () => {
        if (timerRef.current) window.clearInterval(timerRef.current);
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        recognitionRef.current?.stop();
        releaseMediaStream(mediaStreamRef.current);
        mediaStreamRef.current = null;
      };
    }, [audioUrl]);

    const stopTranscription = useCallback(() => {
      recognitionRef.current?.stop();
      recognitionRef.current = null;
    }, []);

    /** One recording = one mic session; release tracks so “allow once” can apply next time. */
    const releaseMicSession = useCallback(() => {
      stopTranscription();
      const recorder = mediaRecorderRef.current;
      if (recorder && recorder.state !== "inactive") {
        try {
          recorder.stop();
        } catch {
          /* already stopped */
        }
      }
      mediaRecorderRef.current = null;
      releaseMediaStream(mediaStreamRef.current);
      mediaStreamRef.current = null;
    }, [stopTranscription]);

    const handleTextChange = useCallback(
      (value: string) => {
        userEditedTextRef.current = true;
        stopTranscription();
        setText(value);
      },
      [stopTranscription],
    );

    const startTranscription = useCallback(() => {
      if (typeof window === "undefined") return;
      const W = window as Window & {
        SpeechRecognition?: new () => SpeechRecognitionInstance;
        webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
      };
      const SR = W.SpeechRecognition ?? W.webkitSpeechRecognition;
      if (!SR) {
        setSttStatus("failed");
        return;
      }

      try {
        setSttStatus("pending");
        const rec = new SR();
        rec.lang = speechRecognitionLocale(lang);
        rec.continuous = true;
        rec.interimResults = true;
        rec.onerror = () => {
          setSttStatus((prev) => (prev === "ok" ? "ok" : "failed"));
        };
        rec.onresult = (event: SpeechRecognitionEventLike) => {
          let transcript = "";
          for (let i = 0; i < event.results.length; i += 1) {
            transcript += event.results[i][0].transcript;
          }
          const trimmed = transcript.trim();
          if (trimmed && !userEditedTextRef.current) {
            setText(trimmed);
            setSttStatus("ok");
          }
        };
        rec.start();
        recognitionRef.current = rec;
      } catch {
        setSttStatus("failed");
      }
    }, [lang]);

    const startRecording = useCallback(async () => {
      setMicFallback(false);
      setSttStatus("idle");
      userEditedTextRef.current = false;
      stopTranscription();

      const recordingCapable = canUseAudioRecording();
      setCanRecord(recordingCapable);

      if (!recordingCapable) {
        setPhase("review");
        setMicFallback(true);
        appendInteractionEvent("RECORD", "manual");
        return;
      }

      let stream: MediaStream | null = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
        const picked = pickAudioMimeType();
        audioMimeRef.current = picked?.split(";")[0] ?? "audio/webm";
        const recorder = createAudioRecorder(stream);
        chunksRef.current = [];
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunksRef.current.push(e.data);
        };
        recorder.onstop = () => {
          releaseMediaStream(mediaStreamRef.current);
          mediaStreamRef.current = null;
          mediaRecorderRef.current = null;
          const blob = new Blob(chunksRef.current, { type: audioMimeRef.current });
          if (blob.size > 0) {
            setHasAudioBlob(true);
            setAudioUrl((prev) => {
              if (prev) URL.revokeObjectURL(prev);
              return URL.createObjectURL(blob);
            });
          }
        };
        mediaRecorderRef.current = recorder;
        recorder.start();
        startTranscription();
        appendInteractionEvent("RECORD", "start");
        setSeconds(0);
        setPhase("recording");
        timerRef.current = window.setInterval(() => setSeconds((s) => s + 1), 1000);
      } catch {
        releaseMicSession();
        setPhase("review");
        setMicFallback(true);
        appendInteractionEvent("RECORD", "denied");
      }
    }, [releaseMicSession, startTranscription, stopTranscription]);

    useImperativeHandle(ref, () => ({ startRecording: () => void startRecording() }), [
      startRecording,
    ]);

    const stopRecording = useCallback(() => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      stopTranscription();
      mediaRecorderRef.current?.stop();
      appendInteractionEvent("RECORD", "stop");
      autoPlayAfterStopRef.current = true;
      setPhase("review");
    }, [stopTranscription]);

    const attachLocation = useCallback(async () => {
      setGeoBusy(true);
      setGeoError(null);
      try {
        const point = await readCurrentPosition();
        setGeo(point);
        appendInteractionEvent("SELECT", "GEO");
      } catch {
        setGeoError(geoCopy.failed);
      } finally {
        setGeoBusy(false);
      }
    }, [geoCopy.failed]);

    const sendReport = useCallback(async () => {
      if (sending) return;

      const trimmed = text.trim();
      const canSendNow = Boolean(trimmed || hasAudioBlob);
      if (!canSendNow) return;

      setSending(true);
      releaseMicSession();
      try {
        appendInteractionEvent("CHANGE", trimmed || "voice");
        appendInteractionEvent("COMPLETE");

        const traceEvents = getInteractionTrace().events;
        const place = geo ? formatPlaceFromGeo(geo) : unknownPlaceLabel(lang);

        const payload: ObservationTracePayload = {
          lang,
          trajectory: null,
          engineIndex: 0,
          attentionCount: 0,
          clock: localeDateTime(lang),
          logLines: heatContext ? ["field/heat"] : ["field/voice"],
          createdAt: Date.now(),
          traceEvents,
          citizen: {
            place,
            observedAt: new Date().toISOString(),
            subject: geo ? "field_voice_geo" : heatContext ? "field_heat" : "field_voice",
            relatedRefs: trimmed || audioOnlyLabel(lang),
            traceDecision: "none",
          },
        };

        registerTrace(payload);
        setSentPayload(payload);
        clearVoiceDraft();
        setPendingDraft(null);

        try {
          await navigator.clipboard.writeText(
            copyCitizenTraceText(payload, { heatContext: heatContext || undefined }),
          );
          setFlash(ui.copied);
        } catch {
          /* clipboard optional */
        }

        setPhase("sent");
        onSent?.();
        window.setTimeout(() => setFlash(null), 2400);
      } finally {
        setSending(false);
      }
    }, [geo, hasAudioBlob, heatContext, lang, onSent, releaseMicSession, sending, text, ui.copied]);

    const startAnotherReport = useCallback(() => {
      releaseMicSession();
      clearVoiceDraft();
      setPendingDraft(null);
      setSentPayload(null);
      setPhase("idle");
      setText("");
      setSeconds(0);
      setGeo(null);
      setGeoError(null);
      setHasAudioBlob(false);
      setMicFallback(false);
      setSttStatus("idle");
      stopTranscription();
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
      clearInteractionTrace();
      appendInteractionEvent("START");
    }, [audioUrl, releaseMicSession, stopTranscription]);

    const discardDraft = useCallback(() => {
      clearVoiceDraft();
      setPendingDraft(null);
    }, []);

    const restoreDraft = useCallback(() => {
      if (!pendingDraft) return;
      setText(pendingDraft.text);
      if (pendingDraft.geo) {
        setGeo({
          lat: pendingDraft.geo.lat,
          lng: pendingDraft.geo.lon,
          accuracyM: pendingDraft.geo.accuracy,
        });
      }
      setPhase("review");
      setPendingDraft(null);
    }, [pendingDraft]);

    const discardReview = () => {
      if ((text.trim() || hasAudioBlob) && !window.confirm(rc.resetConfirm)) return;
      releaseMicSession();
      clearVoiceDraft();
      setPendingDraft(null);
      setPhase("idle");
      setText("");
      setSeconds(0);
      setGeo(null);
      setGeoError(null);
      setHasAudioBlob(false);
      setMicFallback(false);
      setSttStatus("idle");
      stopTranscription();
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    };

    const canSend = Boolean(text.trim() || hasAudioBlob) && !sending;

    const draftBanner =
      pendingDraft && phase === "idle" ? (
        <div className="space-y-2 py-2">
          <p className="m-0 text-sm text-accent/80">{rc.draftRestorePrompt}</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={restoreDraft}
              className="min-h-11 touch-manipulation border-2 border-accent/45 px-4 py-2 text-sm font-medium text-ink"
            >
              {rc.draftRestoreAction}
            </button>
            <button
              type="button"
              onClick={discardDraft}
              className="min-h-11 touch-manipulation border border-accent/25 px-4 py-2 text-sm text-accent/65"
            >
              {rc.draftDismissAction}
            </button>
          </div>
        </div>
      ) : null;

    if (lean && phase === "idle" && !pendingDraft) {
      return null;
    }

    if (lean && phase === "idle" && pendingDraft) {
      return draftBanner;
    }

    if (phase === "sent" && sentPayload) {
      return (
        <TraceReceiptPanel
          trace={sentPayload}
          lang={lang}
          presentation={{ heatContext }}
          flash={flash}
          onFindHelp={onFindHelp}
          onAnother={startAnotherReport}
          anotherLabel={copy.ctaAnotherObservation}
        />
      );
    }

    const panelClass = lean ? "px-0 py-2" : "px-0 py-3";

    return (
      <section aria-label={copy.ctaVoiceReport} className={panelClass}>
        {draftBanner}

        {!lean && (
          <h2 className="m-0 text-lg font-medium leading-snug text-ink sm:text-xl">
            {copy.ctaVoiceReport}
          </h2>
        )}

        {!canRecord && phase === "idle" && !lean && (
          <p className="mt-2 mb-0 text-sm text-accent/65">{copy.voiceUnsupported}</p>
        )}

        {phase === "idle" && !lean && canRecord && (
          <p className="mt-3 mb-0 text-xs leading-relaxed text-accent/50">{copy.voiceMicOnceHint}</p>
        )}

        {phase === "idle" && !lean && (
          <VoiceTapControl
            mode="start"
            label={copy.voiceTapLabel}
            ariaLabel={copy.voiceTapAriaStart}
            onPress={() => void startRecording()}
            disabled={!canRecord}
          />
        )}

        {phase === "recording" && (
          <div className={lean ? "space-y-3" : "mt-4 space-y-3"} aria-live="polite">
            {lean && (
              <p className="m-0 text-xs leading-relaxed text-accent/50">{copy.voiceMicOnceHint}</p>
            )}
            <VoiceTapControl
              mode="stop"
              label={copy.voiceTapLabel}
              ariaLabel={copy.voiceTapAriaStop}
              onPress={stopRecording}
            />
            <p className="m-0 flex items-center justify-between gap-2 text-sm text-accent/75">
              <span>{copy.voiceRecording}</span>
              <span className="font-mono-field tabular-nums">{formatTimer(seconds)}</span>
            </p>
            {sttStatus === "pending" && (
              <p className="m-0 text-xs text-accent/50">{copy.voiceTranscribePending}</p>
            )}
          </div>
        )}

        {phase === "review" && micFallback && (
          <div className={lean ? "space-y-3" : "mt-4 space-y-3"} aria-live="polite">
            <p className="m-0 text-base font-medium text-ink">{copy.voiceMicFallbackTitle}</p>
            <p className="m-0 text-sm text-accent/70">{copy.voiceMicFallbackLead}</p>
            <label className="block space-y-2">
              <span className="text-sm text-ink">{copy.voiceTypeObservation}</span>
              <textarea
                rows={4}
                value={text}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={copy.voiceDescriptionPlaceholder}
                className="w-full min-h-24 touch-manipulation border border-accent/20 bg-field/80 px-3 py-2.5 text-sm text-ink placeholder:text-accent/35 focus-visible:border-accent/40 focus-visible:outline-none"
              />
            </label>
            <div className="flex flex-col gap-2">
              <SignalControl
                type="button"
                direction="right"
                disabled={!text.trim() || sending}
                onClick={() => void sendReport()}
                className="min-h-12 w-full border-2 border-accent/45 bg-field px-4 py-3 text-left text-sm font-medium text-ink touch-manipulation disabled:opacity-45"
              >
                {sending ? copy.voiceSending : copy.voiceSend}
              </SignalControl>
              <button
                type="button"
                onClick={() => void startRecording()}
                className="min-h-12 border border-accent/30 px-4 py-3 text-sm text-ink touch-manipulation"
              >
                {copy.voiceMicRetry}
              </button>
            </div>
          </div>
        )}

        {phase === "review" && !micFallback && hasAudioBlob && (
          <div className={lean ? "space-y-3" : "mt-4 space-y-3"} aria-live="polite">
            <p className="m-0 text-base font-medium text-ink">{copy.voiceRecordingReady}</p>
            <p className="m-0 text-xs text-accent/50">{copy.voiceMicReleased}</p>
            {audioUrl && (
              <audio
                ref={playbackAudioRef}
                controls
                src={audioUrl}
                className="w-full max-w-full"
                preload="metadata"
              >
                {copy.voicePlay}
              </audio>
            )}
            <SignalControl
              type="button"
              direction="right"
              disabled={sending}
              onClick={() => void sendReport()}
              className="min-h-12 w-full border-2 border-accent/45 bg-field px-4 py-3 text-left text-sm font-medium text-ink touch-manipulation disabled:opacity-45"
            >
              {sending ? copy.voiceSending : copy.voiceSend}
            </SignalControl>
            <details className="border border-accent/15 bg-field/40 px-3 py-2">
              <summary className="cursor-pointer text-sm text-accent/70 touch-manipulation">
                {copy.voiceAddDescription}
              </summary>
              <div className="mt-3 space-y-3 pb-1">
                {sttStatus === "failed" && text.trim().length === 0 && (
                  <p className="m-0 text-xs text-accent/50">{copy.voiceTranscribeFailed}</p>
                )}
                <textarea
                  rows={3}
                  value={text}
                  onChange={(e) => handleTextChange(e.target.value)}
                  placeholder={copy.voiceDescriptionPlaceholder}
                  className="w-full min-h-20 touch-manipulation border-0 border-b border-accent/20 bg-transparent px-0 py-2 text-sm text-ink placeholder:text-accent/35 focus-visible:border-accent/40 focus-visible:outline-none"
                />
                <div className="space-y-2">
                  <button
                    type="button"
                    disabled={geoBusy || !!geo}
                    onClick={() => void attachLocation()}
                    className="min-h-11 w-full touch-manipulation border border-accent/25 bg-field/80 px-4 py-2.5 text-left text-sm text-ink disabled:opacity-60"
                  >
                    {geo ? geoCopy.attached : geoCopy.attach}
                  </button>
                  {geo && (
                    <p className="m-0 font-mono-field text-xs text-accent/55">
                      {formatPlaceFromGeo(geo)}
                    </p>
                  )}
                  {geoError && <p className="m-0 text-xs text-accent/55">{geoError}</p>}
                </div>
              </div>
            </details>
            <button
              type="button"
              onClick={discardReview}
              className="min-h-11 text-sm text-accent/55 touch-manipulation"
            >
              {ui.startOver}
            </button>
          </div>
        )}

        {phase === "review" && !micFallback && !hasAudioBlob && (
          <div className={lean ? "space-y-3" : "mt-4 space-y-3"} aria-live="polite">
            <label className="block space-y-2">
              <span className="text-sm text-ink">{copy.voiceTypeObservation}</span>
              <textarea
                rows={4}
                value={text}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={copy.voiceDescriptionPlaceholder}
                className="w-full min-h-24 touch-manipulation border border-accent/20 bg-field/80 px-3 py-2.5 text-sm text-ink placeholder:text-accent/35 focus-visible:border-accent/40 focus-visible:outline-none"
              />
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <SignalControl
                type="button"
                direction="right"
                disabled={!canSend}
                onClick={() => void sendReport()}
                className="min-h-12 flex-1 border-2 border-accent/45 bg-field px-4 py-3 text-left text-sm font-medium text-ink touch-manipulation disabled:opacity-45"
              >
                {sending ? copy.voiceSending : copy.voiceSend}
              </SignalControl>
              <button
                type="button"
                onClick={discardReview}
                className="min-h-12 border border-accent/20 px-4 py-3 text-sm text-accent/60 touch-manipulation"
              >
                {ui.startOver}
              </button>
            </div>
          </div>
        )}

      </section>
    );
  },
);

export default FieldVoiceReport;

type SpeechRecognitionResultItem = { transcript: string };
type SpeechRecognitionResultList = ArrayLike<{ 0: SpeechRecognitionResultItem }>;
type SpeechRecognitionEventLike = { results: SpeechRecognitionResultList };

interface SpeechRecognitionInstance {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: unknown) => void) | null;
  start: () => void;
  stop: () => void;
}
