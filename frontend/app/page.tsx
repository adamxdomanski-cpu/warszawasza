"use client";

import { useState } from "react";

import { fetchTopDrops, type TopDrop } from "../lib/api";

export default function HomePage() {
  const [drops, setDrops] = useState<TopDrop[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchTopDrops();
      setDrops(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Nie udało się pobrać top drops";
      setError(message);
      setDrops(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>WARSZAWASZA ENGINE</h1>
      <p style={{ color: "#555", marginBottom: "16px" }}>
        Frontend i API działają na porcie{" "}
        {typeof window !== "undefined" ? window.location.port || "8000" : "8000"}
        .
      </p>

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "ŁADOWANIE..." : "GENERATE TOP DROPS"}
      </button>

      {error ? (
        <pre style={{ marginTop: "20px", color: "crimson" }}>{error}</pre>
      ) : null}

      {drops ? (
        <pre style={{ marginTop: "20px" }}>
          {JSON.stringify(drops, null, 2)}
        </pre>
      ) : null}
    </main>
  );
}
