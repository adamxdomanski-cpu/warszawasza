"use client";

import { useEffect, useRef, useState } from "react";
import {
  hasFinePointer,
  touchFromEvent,
  type AttentionInput,
  type AttentionPoint,
} from "../lib/attention";

type UseAttentionOptions = {
  onMove?: (point: AttentionPoint) => void;
  enabled?: boolean;
};

/**
 * Binds pointer, touch, and gaze to one attention stream.
 * The real interface is attention — not the cursor.
 */
export function useAttention({ onMove, enabled = true }: UseAttentionOptions) {
  const onMoveRef = useRef(onMove);
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [input, setInput] = useState<AttentionInput>("touch");
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    onMoveRef.current = onMove;
  }, [onMove]);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const emit = (x: number, y: number, source: AttentionInput) => {
      const point: AttentionPoint = { x, y, t: Date.now(), input: source };
      setPosition({ x, y });
      setInput(source);
      onMoveRef.current?.(point);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      emit(event.clientX, event.clientY, "pointer");
    };

    const onTouchStart = (event: TouchEvent) => {
      const coords = touchFromEvent(event);
      if (coords) emit(coords.x, coords.y, "touch");
    };

    const onTouchMove = (event: TouchEvent) => {
      const coords = touchFromEvent(event);
      if (coords) emit(coords.x, coords.y, "touch");
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [enabled]);

  return { position, input, finePointer: finePointer || hasFinePointer() };
}
