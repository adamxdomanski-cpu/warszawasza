"use client";

import {
  createElement,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";
import type { SignalIntensity } from "../../lib/signalFieldEngine";
import { useSignalField } from "./SignalFieldProvider";

type LivingSignalTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** One sensor unit per string (default) or split on sentence punctuation. */
  mode?: "line" | "auto";
  intensity?: SignalIntensity;
  children?: never;
};

type SentenceUnitProps = {
  text: string;
  as: ElementType;
  className?: string;
  intensity: SignalIntensity;
  sentenceKey: string;
};

function hashChar(sentenceSeed: number, index: number): number {
  return sentenceSeed * 0.17 + index * 0.031;
}

function SentenceUnit({
  text,
  as,
  className,
  intensity,
  sentenceKey,
}: SentenceUnitProps) {
  const { active, engine } = useSignalField();
  const sentenceIdRef = useRef<string | null>(null);
  const pendingRefs = useRef<
    { el: HTMLElement; index: number; seed: number }[]
  >([]);
  const registeredRef = useRef(new WeakSet<HTMLElement>());

  const sentenceSeed = useMemo(
    () =>
      sentenceKey.split("").reduce((a, c) => a + c.charCodeAt(0), 0) * 0.001,
    [sentenceKey],
  );

  const attachGlyph = (el: HTMLElement, index: number) => {
    if (registeredRef.current.has(el)) return;
    const sid = sentenceIdRef.current;
    if (!sid) {
      pendingRefs.current.push({ el, index, seed: hashChar(sentenceSeed, index) });
      return;
    }
    registeredRef.current.add(el);
    engine.registerGlyph(sid, el, hashChar(sentenceSeed, index));
  };

  useLayoutEffect(() => {
    if (!active) return;
    const sid = engine.registerSentence(intensity);
    sentenceIdRef.current = sid;
    for (const pending of pendingRefs.current) {
      if (!registeredRef.current.has(pending.el)) {
        registeredRef.current.add(pending.el);
        engine.registerGlyph(sid, pending.el, pending.seed);
      }
    }
    pendingRefs.current = [];
    return () => {
      engine.unregisterSentence(sid);
      sentenceIdRef.current = null;
      registeredRef.current = new WeakSet();
      pendingRefs.current = [];
    };
  }, [active, engine, intensity, sentenceKey]);

  const glyphs = useMemo(() => {
    return [...text].map((char, index) => {
      if (char === " " || char === "\n") {
        return char;
      }
      return (
        <span
          key={`${sentenceKey}-${index}`}
          className="signal-glyph"
          ref={(el) => {
            if (el && active) attachGlyph(el, index);
          }}
        >
          {char}
        </span>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- attachGlyph uses stable refs
  }, [active, sentenceKey, sentenceSeed, text]);

  if (!active) {
    return createElement(as, { className }, text);
  }

  return createElement(as, { className }, glyphs);
}

export default function LivingSignalText({
  text,
  as = "p",
  className,
  mode = "line",
  intensity = "normal",
}: LivingSignalTextProps) {
  const uid = useId();

  const sentences = useMemo(() => {
    if (mode === "line" || !text.trim()) return [text];
    return text
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }, [mode, text]);

  if (sentences.length === 1) {
    return (
      <SentenceUnit
        text={sentences[0]!}
        as={as}
        className={className}
        intensity={intensity}
        sentenceKey={`${uid}-0-${sentences[0]}`}
      />
    );
  }

  return createElement(
    "div",
    { className: className?.includes("mb-") ? undefined : className },
    sentences.map((sentence, i) => (
      <SentenceUnit
        key={`${uid}-${i}-${sentence}`}
        text={sentence}
        as={as === "p" ? "p" : "span"}
        className={className}
        intensity={intensity}
        sentenceKey={`${uid}-${i}-${sentence}`}
      />
    )),
  );
}

/** Inline living text inside links or labels. */
export function LivingSignalInline({
  text,
  className,
  intensity = "normal",
}: {
  text: string;
  className?: string;
  intensity?: SignalIntensity;
}) {
  return (
    <LivingSignalText
      text={text}
      as="span"
      className={className}
      mode="line"
      intensity={intensity}
    />
  );
}

export function LivingSignalStatic({
  children,
  as = "span",
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  return createElement(as, { className }, children);
}
