import axios from "axios";

const DEFAULT_PORT = process.env.NEXT_PUBLIC_API_PORT || "8000";

function resolveBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return `http://127.0.0.1:${DEFAULT_PORT}`;
}

export const api = axios.create({
  baseURL: resolveBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

export type TopDrop = {
  text: string;
  type: string;
  emotion: string;
  channel: string;
  scores: {
    wearability: number;
    virality: number;
    identity_strength: number;
    total_score: number;
  };
};

export async function fetchTopDrops(): Promise<TopDrop[]> {
  const { data } = await api.get<TopDrop[]>("/topdrops");
  return data;
}

export async function pingApi(): Promise<{ status: string }> {
  const { data } = await api.get<{ status: string }>("/ping");
  return data;
}
