"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { TRAJECTORY_KEY, type TrajectoryChoice } from "../../lib/artifactI18n";
import {
  COPY,
  NARRATIVE_ORDER,
  type Lang,
} from "../../lib/i18n";
import { computeEngineIndex, INITIAL_ENGINE_INDEX } from "../../lib/pipelineEngine";
import DataCityDiagram from "./DataCityDiagram";
import DecisionPipeline from "./DecisionPipeline";
import FieldBackdrop from "./FieldBackdrop";
import FieldFooter from "./FieldFooter";
import GrapheneField from "./GrapheneField";
import LangNav from "./LangNav";
import LeaveTraceControl from "./LeaveTraceControl";
import LivingSignalText, { LivingSignalInline } from "./LivingSignalText";
import LucyAttention from "./LucyAttention";
import LucyMasthead from "./LucyMasthead";
import ObservationGate from "./ObservationGate";
import SignalControl from "./SignalControl";
import TrajectorySwitch, { persistTrajectory } from "./TrajectorySwitch";

function elapsedClock(startMs: number): string {
  const s = Math.floor((Date.now() - startMs) / 1000);
  const hh = String(Math.floor(s / 3600)).padStart(2, "0");
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

function elapsedLabel(startMs: number): string {
  const s = Math.floor((Date.now() - startMs) / 1000);
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

function readTrajectory(): TrajectoryChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const value = sessionStorage.getItem(TRAJECTORY_KEY);
    if (value === "true" || value === "false") return value;
  } catch {
    return null;
  }
  return null;
}

function storeTrajectory(choice: TrajectoryChoice) {
  persistTrajectory(choice);
}

export default function LivingInterface() {
  const startMsRef = useRef(Date.now());
  const lastMoveRef = useRef(0);
  const idleLoggedRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logIdRef = useRef(0);
  const attentionCountRef = useRef(0);

  const [ready, setReady] = useState(false);
  const [inField, setInField] = useState(false);
  const [trajectory, setTrajectory] = useState<TrajectoryChoice | null>(null);
  const [lang, setLang] = useState<Lang>("pl");
  const [clock, setClock] = useState("00:00:00");
  const [engineIndex, setEngineIndex] = useState(INITIAL_ENGINE_INDEX);
  const [analyzing, setAnalyzing] = useState(false);
  const [attentionCount, setAttentionCount] = useState(0);
  const [log, setLog] = useState<{ id: number; line: string }[]>([]);

  const copy = COPY[lang];

  useEffect(() => {
    setTrajectory(readTrajectory());
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (!inField) return;

    const labels = COPY[lang].log;

    const pushSignal = (kind: keyof typeof labels) => {
      const line = `${elapsedLabel(startMsRef.current)} ${labels[kind]}`;
      logIdRef.current += 1;
      setLog((prev) => [...prev.slice(-4), { id: logIdRef.current, line }]);

      if (kind !== "inactivity") {
        idleLoggedRef.current = false;
        if (kind === "attention") {
          attentionCountRef.current += 1;
          const next = attentionCountRef.current;
          setAttentionCount(next);
          const elapsedSec = Math.floor((Date.now() - startMsRef.current) / 1000);
          setEngineIndex((prev) =>
            Math.max(prev, computeEngineIndex(next, elapsedSec)),
          );
        }
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(() => {
          if (!idleLoggedRef.current) {
            idleLoggedRef.current = true;
            pushSignal("inactivity");
          }
        }, 5000);
      }
    };

    const onMove = () => {
      const now = Date.now();
      if (now - lastMoveRef.current < 900) return;
      lastMoveRef.current = now;
      pushSignal("attention");
    };

    const onScroll = () => pushSignal("scroll");

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("touchstart", onMove, { passive: true });
    document.addEventListener("touchmove", onMove, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true });

    idleTimerRef.current = setTimeout(() => {
      if (!idleLoggedRef.current) {
        idleLoggedRef.current = true;
        pushSignal("inactivity");
      }
    }, 5000);

    const clockTimer = setInterval(() => {
      setClock(elapsedClock(startMsRef.current));
      const elapsedSec = Math.floor((Date.now() - startMsRef.current) / 1000);
      setEngineIndex((prev) => {
        const next = computeEngineIndex(attentionCountRef.current, elapsedSec);
        return next > prev ? next : prev;
      });
    }, 1000);

    const analyzeTimer = setInterval(() => {
      setAnalyzing((a) => !a);
    }, 900);

    setClock(elapsedClock(startMsRef.current));

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("touchstart", onMove);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("scroll", onScroll);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      clearInterval(clockTimer);
      clearInterval(analyzeTimer);
    };
  }, [lang, inField]);

  const handleGateComplete = (choice: TrajectoryChoice, gateLang: Lang) => {
    storeTrajectory(choice);
    setTrajectory(choice);
    setLang(gateLang);
    setInField(true);
    startMsRef.current = Date.now();
  };

  const handleTrajectoryChange = (choice: TrajectoryChoice) => {
    storeTrajectory(choice);
    setTrajectory(choice);
  };

  if (!ready) return null;

  if (!inField) {
    return <ObservationGate onComplete={handleGateComplete} />;
  }

  return (
    <>
      <LucyAttention />
      <FieldFooter lang={lang} />
      <main className="relative z-10 min-h-dvh overflow-x-hidden p-5 pb-16 sm:p-8 lg:pb-20">
        <GrapheneField />
        <FieldBackdrop />

        <div className="relative z-10 flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(9.5rem,12rem)_1fr_minmax(10rem,14rem)] lg:items-start lg:gap-10 xl:grid-cols-[14rem_1fr_16rem] xl:gap-12">
          {/* —— LEFT: masthead · controls · pipeline · trace —— */}
          <aside className="flex flex-col gap-5 lg:sticky lg:top-8 lg:gap-6">
            <div className="flex flex-col gap-3">
              <LucyMasthead />
              <span className="font-mono-field text-sm font-semibold tracking-[0.18em] sm:text-base">
                WARSZAWASZA
              </span>
              <LangNav lang={lang} onChange={setLang} variant="bracket" />
              <TrajectorySwitch
                lang={lang}
                value={trajectory}
                onChange={handleTrajectoryChange}
                compact
              />
            </div>

            <div aria-live="polite">
              <div className="font-mono-field text-xs tracking-[0.14em] text-accent/55 uppercase sm:text-sm">
                + {copy.observation}
              </div>
              <div className="mt-1 font-mono-field text-lg tabular-nums tracking-wide sm:text-xl">
                {clock}
              </div>
            </div>

            <DecisionPipeline
              lang={lang}
              engineIndex={engineIndex}
              analyzing={analyzing}
              trajectory={trajectory}
              attentionSeed={attentionCount + logIdRef.current}
              variant="sidebar"
            />

            <div className="hidden lg:block">
              <LeaveTraceControl
                lang={lang}
                trajectory={trajectory}
                engineIndex={engineIndex}
                attentionCount={attentionCount}
                clock={clock}
                logLines={log.map((entry) => entry.line)}
              />
            </div>
          </aside>

          {/* —— CENTER: core narrative —— */}
          <section className="flex min-h-[50vh] flex-col justify-center py-4 lg:min-h-[calc(100vh-7rem)] lg:py-12 lg:text-center">
            <div className="mb-8 lg:hidden">
              <DecisionPipeline
                lang={lang}
                engineIndex={engineIndex}
                analyzing={analyzing}
                trajectory={trajectory}
                attentionSeed={attentionCount + logIdRef.current}
                variant="inline"
              />
            </div>

            {copy.core.map((line) => (
              <LivingSignalText
                key={line}
                text={`${line.replace(/\.$/, "")}..`}
                className="mb-2 max-w-full text-xl font-light leading-snug sm:text-2xl lg:mx-auto lg:text-[1.65rem] lg:leading-snug xl:text-3xl"
              />
            ))}
            <LivingSignalText
              text={`${copy.principle[0].replace(/\.$/, "")}..`}
              className="mt-8 font-mono-field text-sm text-accent/50 sm:text-base lg:mx-auto"
              intensity="low"
            />
            <LivingSignalText
              text={`${copy.principle[1].replace(/\.$/, "")}..`}
              className="mt-1 font-mono-field text-sm text-accent/65 sm:text-base lg:mx-auto"
              intensity="low"
            />

            <div className="mt-10 border border-accent-muted px-4 py-3 lg:mx-auto lg:max-w-md">
              <LivingSignalText
                text={copy.closing}
                className="text-base font-light tracking-wide sm:text-lg"
                intensity="low"
              />
            </div>

            <SignalControl
              as="a"
              href="#narracja"
              direction="down"
              className="mt-8 inline-flex min-h-11 items-center font-mono-field text-xs tracking-widest text-accent/55 uppercase touch-manipulation lg:hidden"
            >
              {copy.dissonance}
            </SignalControl>
          </section>

          {/* —— RIGHT: log · data city · noise · narracja —— */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-8 lg:gap-7">
            <div className="font-mono-field text-sm text-accent/35 sm:text-base">
              {log.map((entry) => (
                <div key={entry.id}>{entry.line}</div>
              ))}
            </div>

            <DataCityDiagram lang={lang} variant="fixed" />

            <LivingSignalText
              text={copy.noisePrinciple}
              className="font-mono-field text-xs leading-relaxed text-sapphire/70 sm:text-sm"
              intensity="low"
            />

            <section id="narracja" aria-labelledby="narracja-title">
              <h2
                id="narracja-title"
                className="mb-4 font-mono-field text-xs tracking-[0.18em] sm:text-sm"
              >
                {copy.narrativeTitle}
              </h2>
              <ul className="m-0 list-none p-0">
                {NARRATIVE_ORDER.map((key) => {
                  const row = copy.narrative[key];
                  return (
                    <li key={key}>
                      <SignalControl
                        as={Link}
                        href={row.href ?? "#"}
                        direction="right"
                        className="flex min-h-10 touch-manipulation items-start gap-2 py-1.5"
                      >
                        <span className="font-mono-field text-base text-accent/80">
                          {row.symbol}
                        </span>
                        <span className="text-sm leading-snug">
                          <span className="tracking-wide">{row.name}</span>
                          <span className="font-mono-field text-accent/55">
                            {" "}
                            · {row.role}
                          </span>
                        </span>
                      </SignalControl>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-5 flex flex-col gap-2">
                <SignalControl
                  as={Link}
                  href="/meta"
                  direction="right"
                  className="inline-flex min-h-10 items-center font-mono-field text-sm tracking-wider touch-manipulation"
                >
                  META →
                </SignalControl>
                <SignalControl
                  as="a"
                  href="mailto:hello@warszawasza.online"
                  direction="right"
                  className="inline-flex min-h-10 items-center font-mono-field text-sm tracking-wider touch-manipulation"
                >
                  {copy.launchFira}
                </SignalControl>
              </div>
            </section>
          </aside>
        </div>

        <div className="relative z-10 mt-10 lg:hidden">
          <LeaveTraceControl
            lang={lang}
            trajectory={trajectory}
            engineIndex={engineIndex}
            attentionCount={attentionCount}
            clock={clock}
            logLines={log.map((entry) => entry.line)}
          />
        </div>
      </main>
    </>
  );
}
