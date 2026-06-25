"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../../lib/attention";
import { useAttention } from "../../hooks/useAttention";

const HEAD_LERP = 0.14;

export default function LucyAttention() {
  const targetRef = useRef({ x: -200, y: -200 });
  const headRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number | null>(null);
  const headElRef = useRef<HTMLDivElement>(null);

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

    const tick = () => {
      const tx = targetRef.current.x;
      const ty = targetRef.current.y;
      headRef.current.x += (tx - headRef.current.x) * HEAD_LERP;
      headRef.current.y += (ty - headRef.current.y) * HEAD_LERP;

      if (headElRef.current) {
        headElRef.current.style.transform = `translate(${headRef.current.x}px, ${headRef.current.y}px)`;
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
        <span className="lucy-head -ml-2.5 -mt-2.5 block text-sm sm:text-base">●</span>
      </div>
    </div>
  );
}
