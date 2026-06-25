"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../../lib/attention";
import { useAttention } from "../../hooks/useAttention";
import { dispatchLightning } from "./FieldBackdrop";

const HEAD_LERP = 0.14;
const TAIL_LAYERS = 3;
const TAIL_CHARS = "∿~∿~∿~∿";
const COLLAPSE_SPREAD = 0.08;
const UNCERTAIN_SPREAD = 1;

type TailLayer = {
  el: HTMLSpanElement | null;
  phase: number;
};

export default function LucyAttention() {
  const targetRef = useRef({ x: -200, y: -200 });
  const headRef = useRef({ x: -200, y: -200 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastDirRef = useRef({ x: -1, y: 0 });
  const spreadRef = useRef(UNCERTAIN_SPREAD);
  const lastCollapseRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const headElRef = useRef<HTMLDivElement>(null);
  const tailLayersRef = useRef<TailLayer[]>(
    Array.from({ length: TAIL_LAYERS }, (_, i) => ({
      el: null,
      phase: i * 1.7,
    })),
  );

  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  const { position, finePointer } = useAttention({
    onMove: (point) => {
      targetRef.current = { x: point.x, y: point.y };
      setVisible(true);
    },
  });

  useEffect(() => {
    targetRef.current = position;
  }, [position]);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("has-fine-pointer", finePointer);
    document.body.classList.toggle("field-cursor-none", finePointer);
    return () => document.body.classList.remove("field-cursor-none");
  }, [finePointer]);

  useEffect(() => {
    if (reduced) {
      headRef.current = targetRef.current;
      if (headElRef.current) {
        headElRef.current.style.transform = `translate(${headRef.current.x}px, ${headRef.current.y}px)`;
      }
      return;
    }

    const tick = (now: number) => {
      const tx = targetRef.current.x;
      const ty = targetRef.current.y;
      const hx = headRef.current.x;
      const hy = headRef.current.y;
      const dx = tx - hx;
      const dy = ty - hy;
      const speed = Math.hypot(dx, dy);

      headRef.current.x += dx * HEAD_LERP;
      headRef.current.y += dy * HEAD_LERP;

      velocityRef.current.x = dx;
      velocityRef.current.y = dy;

      if (speed > 0.6) {
        const inv = 1 / speed;
        lastDirRef.current = { x: -dx * inv, y: -dy * inv };
      }

      const targetSpread = Math.min(UNCERTAIN_SPREAD, speed * 0.028);
      spreadRef.current += (targetSpread - spreadRef.current) * 0.09;
      const spread = spreadRef.current;

      const prevSpread = spread;
      if (
        prevSpread > 0.35 &&
        spread < COLLAPSE_SPREAD &&
        now - lastCollapseRef.current > 4200
      ) {
        lastCollapseRef.current = now;
        dispatchLightning();
      }

      if (headElRef.current) {
        headElRef.current.style.transform = `translate(${headRef.current.x}px, ${headRef.current.y}px)`;
      }

      const dir = lastDirRef.current;
      const baseAngle = Math.atan2(dir.y, dir.x) * (180 / Math.PI);
      const tailDist = 14 + spread * 6;

      for (let i = 0; i < TAIL_LAYERS; i += 1) {
        const layer = tailLayersRef.current[i]!;
        const el = layer.el;
        if (!el) continue;

        const t = now * 0.001;
        const wobble =
          Math.sin(t * 2.1 + layer.phase) * spread * 5 +
          Math.cos(t * 1.3 + layer.phase * 0.7) * spread * 3;
        const fan = (i - (TAIL_LAYERS - 1) / 2) * spread * 11;
        const angle = baseAngle + fan;
        const rad = (angle * Math.PI) / 180;
        const ox = Math.cos(rad) * tailDist + wobble * 0.15;
        const oy = Math.sin(rad) * tailDist + wobble * 0.12;

        const collapsed = 1 - Math.min(1, spread / UNCERTAIN_SPREAD);
        const isDominant = i === 1;
        let opacity: number;
        if (collapsed > 0.72) {
          opacity = isDominant ? 0.52 : 0.06 + (1 - collapsed) * 0.12;
        } else {
          opacity = 0.1 + (0.22 - i * 0.04) * (1 - collapsed * 0.35);
        }

        const blur = spread > 0.4 ? spread * 0.35 : 0;

        el.style.opacity = opacity.toFixed(3);
        el.style.transform = `translate(${ox.toFixed(2)}px, ${oy.toFixed(2)}px) rotate(${angle.toFixed(2)}deg)`;
        el.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "";
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [reduced]);

  if (!visible && headRef.current.x < 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden="true">
      <div
        ref={headElRef}
        className="fixed top-0 left-0 will-change-transform"
        style={{ transform: "translate(-200px, -200px)" }}
      >
        {!reduced &&
          tailLayersRef.current.map((layer, i) => (
            <span
              key={i}
              ref={(el) => {
                layer.el = el;
              }}
              className="schrodinger-tail absolute top-0 left-0 origin-right whitespace-nowrap"
              aria-hidden="true"
            >
              {TAIL_CHARS}
            </span>
          ))}

        <span className="absolute top-0.5 right-3.5 font-mono-field text-[11px] tracking-[0.14em] text-sapphire/55">
          LUCY
        </span>
        <span className="lucy-head -ml-2.5 -mt-2.5 block text-sm sm:text-base">●</span>
      </div>
    </div>
  );
}
