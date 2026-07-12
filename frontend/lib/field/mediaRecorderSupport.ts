/** Browser audio capture — language-agnostic; STT is optional add-on. */

const MIME_CANDIDATES = [
  "audio/mp4",
  "audio/aac",
  "audio/x-m4a",
  "audio/webm;codecs=opus",
  "audio/webm",
  "audio/ogg;codecs=opus",
  "audio/ogg",
];

/** Safari/iOS needs periodic slices + requestData before stop or blobs stay empty. */
export const RECORDER_TIMESLICE_MS = 1000;

/** Brief pause after requestData so Safari flushes the final chunk before stop. */
const SAFARI_STOP_FLUSH_MS = 80;

export function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/i.test(ua)) return true;
  // iPadOS 13+ may report as Mac with touch
  return navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
}

export function isLikelySafari(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /Safari/i.test(ua) && !/Chrome|Chromium|CriOS|FxiOS|EdgiOS/i.test(ua);
}

/** All WebKit-based mobile browsers use the same MediaRecorder quirks as Safari. */
export function needsSafariRecorderWorkarounds(): boolean {
  return isLikelySafari() || isIOS();
}

/** Live STT + MediaRecorder on the same mic breaks on Safari / iOS WebKit. */
export function prefersDeferredSpeechRecognition(): boolean {
  return needsSafariRecorderWorkarounds();
}

export function pickAudioMimeType(): string | undefined {
  if (typeof MediaRecorder === "undefined") return undefined;
  for (const mime of MIME_CANDIDATES) {
    if (MediaRecorder.isTypeSupported(mime)) return mime;
  }
  return undefined;
}

export function canUseAudioRecording(): boolean {
  if (typeof window === "undefined") return false;
  if (!window.isSecureContext) return false;
  if (!navigator.mediaDevices?.getUserMedia) return false;
  if (typeof MediaRecorder === "undefined") return false;
  return true;
}

export function createAudioRecorder(stream: MediaStream): MediaRecorder {
  const mimeType = pickAudioMimeType();
  return mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
}

export function recorderBlobMime(recorder: MediaRecorder): string {
  const raw = recorder.mimeType?.split(";")[0]?.trim();
  if (raw) return raw;
  return needsSafariRecorderWorkarounds() ? "audio/mp4" : "audio/webm";
}

export function startAudioRecorder(recorder: MediaRecorder): void {
  if (needsSafariRecorderWorkarounds()) {
    recorder.start(RECORDER_TIMESLICE_MS);
    return;
  }
  recorder.start();
}

export function stopAudioRecorder(recorder: MediaRecorder): void {
  if (recorder.state === "inactive") return;
  try {
    if (needsSafariRecorderWorkarounds() && typeof recorder.requestData === "function") {
      recorder.requestData();
      window.setTimeout(() => {
        try {
          if (recorder.state !== "inactive") recorder.stop();
        } catch {
          /* already stopped */
        }
      }, SAFARI_STOP_FLUSH_MS);
      return;
    }
    recorder.stop();
  } catch {
    /* already stopped */
  }
}

/** Stop capture immediately — helps browsers treat permission as session-scoped (“allow once”). */
export function releaseMediaStream(stream: MediaStream | null | undefined): void {
  stream?.getTracks().forEach((track) => {
    track.stop();
  });
}
