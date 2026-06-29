/**
 * Local draft — survives refresh, back navigation, and accidental tab close (same origin).
 * Cleared only after successful SEND.
 */

const DRAFT_KEY = "wzs-field-voice-draft-v1";
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

export type VoiceDraftGeo = {
  lat: number;
  lon: number;
  accuracy?: number;
};

export type VoiceDraft = {
  text: string;
  lang: string;
  heatContext: boolean;
  geo?: VoiceDraftGeo;
  savedAt: number;
};

function storage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function saveVoiceDraft(draft: Omit<VoiceDraft, "savedAt">): void {
  const store = storage();
  if (!store) return;
  if (!draft.text.trim() && !draft.geo) return;
  try {
    const payload: VoiceDraft = { ...draft, savedAt: Date.now() };
    store.setItem(DRAFT_KEY, JSON.stringify(payload));
  } catch {
    /* quota / private mode */
  }
}

export function loadVoiceDraft(): VoiceDraft | null {
  const store = storage();
  if (!store) return null;
  try {
    const raw = store.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;
    const d = parsed as VoiceDraft;
    if (typeof d.text !== "string" || typeof d.savedAt !== "number") return null;
    if (Date.now() - d.savedAt > MAX_AGE_MS) {
      clearVoiceDraft();
      return null;
    }
    return d;
  } catch {
    return null;
  }
}

export function clearVoiceDraft(): void {
  const store = storage();
  if (!store) return;
  try {
    store.removeItem(DRAFT_KEY);
  } catch {
    /* ignore */
  }
}
