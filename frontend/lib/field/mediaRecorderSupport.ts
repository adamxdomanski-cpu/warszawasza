/** Browser audio capture — language-agnostic; STT is optional add-on. */

const MIME_CANDIDATES = [
  "audio/mp4",
  "audio/webm;codecs=opus",
  "audio/webm",
  "audio/ogg;codecs=opus",
  "audio/ogg",
];

/** Safari/iOS needs periodic slices + requestData before stop or blobs stay empty. */
export const RECORDER_TIMESLICE_MS = 1000;

export function isLikelySafari(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /Safari/i.test(ua) && !/Chrome|Chromium|CriOS|FxiOS|EdgiOS/i.test(ua);
}

/** Live STT + MediaRecorder on the same mic breaks on Safari desktop. */
export function prefersDeferredSpeechRecognition(): boolean {
  return isLikelySafari();
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
  return isLikelySafari() ? "audio/mp4" : "audio/webm";
}

export function startAudioRecorder(recorder: MediaRecorder): void {
  if (isLikelySafari()) {
    recorder.start(RECORDER_TIMESLICE_MS);
    return;
  }
  recorder.start();
}

export function stopAudioRecorder(recorder: MediaRecorder): void {
  if (recorder.state === "inactive") return;
  try {
    if (isLikelySafari() && typeof recorder.requestData === "function") {
      recorder.requestData();
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
