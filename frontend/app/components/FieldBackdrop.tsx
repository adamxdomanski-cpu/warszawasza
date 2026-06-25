"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "../../lib/attention";

export default function FieldBackdrop() {
  const [lightning, setLightning] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const onLightning = () => {
      setLightning(true);
      window.setTimeout(() => setLightning(false), 600);
    };

    window.addEventListener("fira:lightning", onLightning);

    const interval = window.setInterval(() => {
      if (Math.random() > 0.82) onLightning();
    }, 14000);

    return () => {
      window.removeEventListener("fira:lightning", onLightning);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-35 mix-blend-soft-light"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 animate-breathe"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(circle at 18% 12%, rgba(228, 0, 69, 0.08), transparent 42%),
            radial-gradient(circle at 82% 78%, rgba(228, 0, 69, 0.04), transparent 38%),
            radial-gradient(circle at 50% 50%, rgba(120, 168, 220, 0.03), transparent 55%)
          `,
        }}
      />
      {lightning && (
        <div
          className="pointer-events-none fixed inset-0 z-[1] animate-lightning bg-accent"
          aria-hidden="true"
        />
      )}
    </>
  );
}

export function dispatchLightning() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("fira:lightning"));
}
