"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  META_COPY,
  META_LANGS,
  TRUTH_CHAIN,
  type MetaLang,
  type SignalKey,
  type TruthPhase,
} from "../../lib/metaI18n";
import { gridZone, pathLength, type AttentionPoint } from "../../lib/attention";
import { useAttention } from "../../hooks/useAttention";
import "./meta-hud.css";
import GrafenGraph from "./GrafenGraph";
import TrajectoryGraph from "./TrajectoryGraph";
import NarrativeFlow from "./NarrativeFlow";

type GazeMark = {
  id: number;
  x: number;
  y: number;
  kind: "dot" | "wave" | "diamond" | "spark";
};
type PathPoint = { x: number; y: number; t: number };

function elapsedClock(startMs: number): string {
  const s = Math.floor((Date.now() - startMs) / 1000);
  const hh = String(Math.floor(s / 3600)).padStart(2, "0");
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

function phaseIndex(phase: TruthPhase): number {
  return TRUTH_CHAIN.indexOf(phase);
}

function advancePhase(current: TruthPhase): TruthPhase {
  const idx = phaseIndex(current);
  if (idx < 0 || idx >= TRUTH_CHAIN.length - 1) return current;
  return TRUTH_CHAIN[idx + 1]!;
}

const SIGNAL_HREFS: Partial<Record<SignalKey, string>> = {
  fira: "/artefacts/fira",
  diamente: "/artefacts/diamente",
  shafir: "/artefacts/shafir",
  lustra: "/artefacts/lustra",
  griffin: "/artefacts/griffin",
};

export default function MetaPerception() {
  const startMsRef = useRef(Date.now());
  const markIdRef = useRef(0);
  const dwellAnchorRef = useRef<{ x: number; y: number; since: number } | null>(
    null,
  );
  const pathRef = useRef<PathPoint[]>([]);
  const visitedZonesRef = useRef(new Set<string>());
  const lastWaveAtRef = useRef(0);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const truthPhaseRef = useRef<TruthPhase>("false");

  const [lang, setLang] = useState<MetaLang>("pl");
  const [clock, setClock] = useState("00:00:00");
  const [truthPhase, setTruthPhase] = useState<TruthPhase>("false");
  const [marks, setMarks] = useState<GazeMark[]>([]);
  const [flash, setFlash] = useState(false);

  const copy = META_COPY[lang];

  useEffect(() => {
    truthPhaseRef.current = truthPhase;
  }, [truthPhase]);

  const bumpTruth = useCallback((from: TruthPhase, expectedMin: TruthPhase) => {
    setTruthPhase((current) => {
      if (phaseIndex(current) < phaseIndex(expectedMin)) return current;
      if (current !== from) return current;
      return advancePhase(current);
    });
  }, []);

  const scheduleReset = useCallback(() => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => {
      setTruthPhase("false");
      visitedZonesRef.current.clear();
      pathRef.current = [];
    }, 10000);
  }, []);

  const spawnMark = useCallback(
    (kind: GazeMark["kind"], x: number, y: number) => {
      markIdRef.current += 1;
      const id = markIdRef.current;
      setMarks((prev) => [...prev.slice(-18), { id, x, y, kind }]);
      window.setTimeout(() => {
        setMarks((prev) => prev.filter((m) => m.id !== id));
      }, kind === "wave" ? 2200 : 1400);
    },
    [],
  );

  const processAttention = useCallback(
    (point: AttentionPoint) => {
      const { x, y } = point;
      const now = point.t;
      const phase = truthPhaseRef.current;

      pathRef.current.push({ x, y, t: now });
      pathRef.current = pathRef.current.filter((p) => now - p.t < 2400);

      if (phase === "false") {
        bumpTruth("false", "false");
        setFlash(true);
        spawnMark("spark", x, y);
        window.setTimeout(() => setFlash(false), 480);
      }

      const anchor = dwellAnchorRef.current;
      if (!anchor || Math.hypot(x - anchor.x, y - anchor.y) > 28) {
        dwellAnchorRef.current = { x, y, since: now };
      } else if (now - anchor.since > 1400 && phase === "diamond") {
        bumpTruth("diamond", "diamond");
        spawnMark("dot", x, y);
        dwellAnchorRef.current = { x, y, since: now + 1200 };
      } else if (now - anchor.since > 900) {
        spawnMark("dot", x, y);
        dwellAnchorRef.current = { x, y, since: now + 700 };
      }

      const length = pathLength(pathRef.current);
      if (
        length > 220 &&
        now - lastWaveAtRef.current > 1600 &&
        phase === "spark"
      ) {
        lastWaveAtRef.current = now;
        bumpTruth("spark", "spark");
        spawnMark("wave", x, y);
      }

      visitedZonesRef.current.add(gridZone(x, y));
      if (visitedZonesRef.current.size >= 5 && phase === "wave") {
        bumpTruth("wave", "wave");
        spawnMark("diamond", x, y);
        visitedZonesRef.current.clear();
      }
    },
    [bumpTruth, spawnMark],
  );

  const { position: attention, finePointer } = useAttention({
    onMove: processAttention,
  });

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const clockTimer = setInterval(() => {
      setClock(elapsedClock(startMsRef.current));
    }, 1000);
    setClock(elapsedClock(startMsRef.current));
    return () => clearInterval(clockTimer);
  }, []);

  useEffect(() => {
    if (truthPhase === "true") scheduleReset();
  }, [truthPhase, scheduleReset]);

  const switchLang = (next: MetaLang) => {
    if (next === lang) return;
    setLang(next);
    if (truthPhase === "false") {
      setTruthPhase("spark");
    }
    setFlash(true);
    window.setTimeout(() => setFlash(false), 480);
  };

  return (
    <div
      className={`metaHud${flash ? " metaHudSpark" : ""}${finePointer ? " metaHudFinePointer" : " metaHudTouch"}`}
    >
      <div className="metaMarks" aria-hidden="true">
        {marks.map((mark) => (
          <span
            key={mark.id}
            className={`metaMark metaMark${mark.kind}`}
            style={{ left: mark.x, top: mark.y }}
          >
            {mark.kind === "dot" && "●"}
            {mark.kind === "wave" && "~~~~"}
            {mark.kind === "diamond" && "◇"}
            {mark.kind === "spark" && "⚡"}
          </span>
        ))}
      </div>

      <div
        className="metaGaze"
        style={{ transform: `translate(${attention.x}px, ${attention.y}px)` }}
        aria-hidden="true"
      >
        <span className="metaGazeCore">●</span>
        <span className="metaGazeLucy">LUCY</span>
      </div>

      <header className="metaTop">
        <p className="metaObservation">+ {copy.observation}</p>
        <p className="metaClock">{clock}</p>
      </header>

      <nav className="metaLang" aria-label="Language">
        {META_LANGS.map((code, index) => (
          <span key={code} className="metaLangItem">
            {index > 0 ? (
              <span className="metaLangSep" aria-hidden="true">
                ·
              </span>
            ) : null}
            <button
              type="button"
              className={lang === code ? "metaLangOn" : "metaLangOff"}
              onClick={() => switchLang(code)}
            >
              {code.toUpperCase()}
            </button>
          </span>
        ))}
      </nav>

      <GrafenGraph phase={truthPhase} label={copy.grafenLabel} />
      <TrajectoryGraph phase={truthPhase} label={copy.trajectoryLabel} />

      <aside className="metaTruth" aria-live="polite">
        {TRUTH_CHAIN.map((phase, index) => {
          const step = copy.truthChain[phase];
          const active = truthPhase === phase;
          return (
            <div key={phase}>
              <div
                className={`metaTruthStep${active ? " metaTruthStepActive" : ""}`}
              >
                {step.glyph}
              </div>
              {index < TRUTH_CHAIN.length - 1 && (
                <div className="metaTruthArrow">↓</div>
              )}
            </div>
          );
        })}
      </aside>

      <section className="metaCore">
        {copy.core.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <p className="metaPrinciple">{copy.principle[0]}</p>
        <p className="metaPrinciple metaPrincipleStrong">{copy.principle[1]}</p>
      </section>

      <NarrativeFlow steps={copy.narrativeFlow} phase={truthPhase} />

      <footer className="metaObjects" aria-label="Narrative objects">
        {(Object.keys(copy.signals) as SignalKey[]).map((key) => {
          const item = copy.signals[key];
          const href = SIGNAL_HREFS[key];
          const inner = (
            <>
              <span>{item.symbol}</span>
              <span>{item.label}</span>
            </>
          );
          return href ? (
            <Link key={key} className="metaObject metaObjectLink" href={href}>
              {inner}
            </Link>
          ) : (
            <div key={key} className="metaObject">
              {inner}
            </div>
          );
        })}
      </footer>
    </div>
  );
}
