export type DropScores = {
  wearability: number;
  virality: number;
  identity_strength: number;
  total_score: number;
};

export type Drop = {
  text: string;
  type: string;
  emotion: string;
  channel: string;
  scores: DropScores;
};

const FALLBACK_DROPS: Drop[] = [
  {
    text: "MOJA WARSZAWA SZA",
    type: "TSHIRT",
    emotion: "SILENCE",
    channel: "IG_POST",
    scores: {
      wearability: 7,
      virality: 7,
      identity_strength: 8,
      total_score: 22,
    },
  },
  {
    text: "TWOJA PRAGA KOLAPS",
    type: "TSHIRT",
    emotion: "COLLAPSE",
    channel: "IG_POST",
    scores: {
      wearability: 6,
      virality: 8,
      identity_strength: 7,
      total_score: 21,
    },
  },
  {
    text: "WASZA MURANÓW SZA",
    type: "TSHIRT",
    emotion: "IDENTITY",
    channel: "IG_POST",
    scores: {
      wearability: 7,
      virality: 6,
      identity_strength: 8,
      total_score: 21,
    },
  },
];

const API_URL =
  process.env.WARSZAWASZA_API_URL ?? "http://127.0.0.1:8000";

export function formatEmotion(emotion: string): string {
  return emotion.charAt(0) + emotion.slice(1).toLowerCase();
}

export async function getTopDrops(): Promise<Drop[]> {
  try {
    const response = await fetch(`${API_URL}/topdrops`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return FALLBACK_DROPS;
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return FALLBACK_DROPS;
    }

    return data as Drop[];
  } catch {
    return FALLBACK_DROPS;
  }
}
