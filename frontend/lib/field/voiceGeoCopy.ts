import type { Lang } from "../i18n";

export type VoiceGeoCopy = {
  attach: string;
  attached: string;
  failed: string;
  hint: string;
};

const COPY: Partial<Record<Lang, VoiceGeoCopy>> = {
  pl: {
    attach: "📍 Dołącz, gdzie jestem",
    attached: "📍 Lokalizacja dołączona",
    failed: "Nie udało się odczytać lokalizacji — wyślij mimo to",
    hint: "Nie musisz znać nazwy ulicy. Jedno dotknięcie wysyła współrzędne.",
  },
  en: {
    attach: "📍 Attach where I am",
    attached: "📍 Location attached",
    failed: "Could not read location — you can still send",
    hint: "You don't need the street name. One tap sends coordinates.",
  },
  hu: {
    attach: "📍 Hol vagyok — csatolás",
    attached: "📍 Hely megadva",
    failed: "A hely nem olvasható — küldheted így is",
    hint: "Utcanevet nem kell tudnod. Egy érintés koordinátát küld.",
  },
  it: {
    attach: "📍 Allega dove sono",
    attached: "📍 Posizione allegata",
    failed: "Posizione non disponibile — puoi inviare lo stesso",
    hint: "Non serve il nome della via. Un tocco invia le coordinate.",
  },
  uk: {
    attach: "📍 Додати, де я",
    attached: "📍 Локацію додано",
    failed: "Не вдалося зчитати місце — можна надіслати",
    hint: "Назва вулиці не потрібна. Один дотик — координати.",
  },
};

export function voiceGeoCopy(lang: Lang): VoiceGeoCopy {
  return COPY[lang] ?? COPY.en!;
}

export type GeoPoint = { lat: number; lng: number; accuracyM?: number };

export function formatPlaceFromGeo(point: GeoPoint): string {
  const acc =
    point.accuracyM !== undefined
      ? ` ±${Math.round(point.accuracyM)} m`
      : "";
  return `${point.lat.toFixed(5)}, ${point.lng.toFixed(5)}${acc}`;
}

export function readCurrentPosition(): Promise<GeoPoint> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new Error("geolocation_unavailable"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracyM: pos.coords.accuracy,
        });
      },
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 12_000, maximumAge: 60_000 },
    );
  });
}
