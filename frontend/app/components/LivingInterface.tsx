"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { TRAJECTORY_KEY, type TrajectoryChoice } from "../../lib/artifactI18n";
import { COPY, type Lang } from "../../lib/i18n";
import { computeEngineIndex, INITIAL_ENGINE_INDEX, applyCivicOrgTrustAtStage, formatCivicOrgIntersectionTrace, intersectCivicOrg, ngoWatchdogObservationInput, wospObservationInput, type CivicOrgIntersection, type PipelineObservationInput } from "../../lib/pipelineEngine";
import {
  detectInterference,
  seedDemoInterferenceGraph,
  type InterferenceResult,
} from "../../lib/patternEngine";
import DataCityDiagram from "./DataCityDiagram";
import DecisionPipeline from "./DecisionPipeline";
import CorePrintSequence from "./CorePrintSequence";
import FieldBackdrop from "./FieldBackdrop";
import FieldFooter from "./FieldFooter";
import ObservationFieldRenderer from "./ObservationFieldRenderer";
import LangNav from "./LangNav";
import LeaveTraceControl from "./LeaveTraceControl";
import LocalInitiativePilot from "./LocalInitiativePilot";
import LivingSignalText from "./LivingSignalText";
import NarrativeArc from "./NarrativeArc";
import ObservationGate from "./ObservationGate";
import SignalControl from "./SignalControl";
import { useStructureAnchor } from "../../hooks/useStructureAnchor";
import { DOMAIN_EVENTS, emitDomainEvent } from "../../lib/domain/events";

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
  try {
    sessionStorage.setItem(TRAJECTORY_KEY, choice);
  } catch {
    /* session unavailable */
  }
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
  const [interference, setInterference] = useState<InterferenceResult | null>(null);
  const [observationInput, setObservationInput] = useState<PipelineObservationInput | null>(null);
  const [civicIntersection, setCivicIntersection] = useState<CivicOrgIntersection | null>(null);
  const [corePrinted, setCorePrinted] = useState(false);
  const [cityPrinted, setCityPrinted] = useState(false);
  const [fieldHydrated, setFieldHydrated] = useState(false);
  const [, startTransition] = useTransition();
  const noisePrincipleRef = useStructureAnchor<HTMLDivElement>();

  useEffect(() => {
    if (!inField) {
      setFieldHydrated(false);
      return;
    }
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setFieldHydrated(true));
    });
    return () => cancelAnimationFrame(frame);
  }, [inField]);

  useEffect(() => {
    if (!inField || !fieldHydrated) return;
    emitDomainEvent(DOMAIN_EVENTS.FIELD_ENTERED);
  }, [inField, fieldHydrated]);

  useEffect(() => {
    if (!inField || !fieldHydrated) return;
    const run = () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get("palimpsest") === "1") {
        seedDemoInterferenceGraph();
      }
      if (params.get("ngo-watchdog") === "1") {
        setObservationInput(ngoWatchdogObservationInput());
      }
      if (params.get("wosp") === "1" || params.get("civic-tech") === "1") {
        setObservationInput(wospObservationInput());
      }
      setInterference(detectInterference());
    };
    if (typeof requestIdleCallback === "function") {
      const id = requestIdleCallback(run, { timeout: 400 });
      return () => cancelIdleCallback(id);
    }
    const timer = window.setTimeout(run, 0);
    return () => window.clearTimeout(timer);
  }, [inField, fieldHydrated, engineIndex, attentionCount]);

  useEffect(() => {
    if (!inField || !observationInput) return;
    setCivicIntersection((prev) => {
      const base = prev ?? intersectCivicOrg(observationInput);
      if (!base) return null;
      const next = applyCivicOrgTrustAtStage(engineIndex, base);
      if (!next) return prev;
      if (next.stagesApplied.length > (prev?.stagesApplied.length ?? 0)) {
        console.info(`[COP] ${formatCivicOrgIntersectionTrace(next)}`);
      }
      return next;
    });
  }, [inField, observationInput, engineIndex]);

  const copy = COPY[lang];

  useEffect(() => {
    setTrajectory(readTrajectory());
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    setCorePrinted(false);
    setCityPrinted(false);
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
    startTransition(() => {
      setTrajectory(choice);
      setLang(gateLang);
      setInField(true);
      startMsRef.current = Date.now();
    });
  };

  if (!ready) return null;

  if (!inField) {
    return <ObservationGate onComplete={handleGateComplete} />;
  }

  if (!fieldHydrated) {
    return (
      <>
        <FieldFooter lang={lang} />
        <main
          className="relative z-10 min-h-dvh overflow-x-hidden p-5 pb-14 sm:p-8 sm:pb-16"
          aria-busy="true"
        >
          <ObservationFieldRenderer active={false} />
          <FieldBackdrop />
        </main>
      </>
    );
  }

  return (
    <>
      <FieldFooter lang={lang} />
      <main className="relative z-10 min-h-dvh overflow-x-hidden p-5 pb-14 sm:p-8 sm:pb-16 lg:pb-20">
        <ObservationFieldRenderer active />
        <FieldBackdrop />

        <div className="relative z-10 flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(9.5rem,12rem)_1fr_minmax(10rem,14rem)] lg:items-start lg:gap-10 xl:grid-cols-[14rem_1fr_16rem] xl:gap-12">
          {/* —— LEFT: masthead · controls · pipeline · trace —— */}
          <aside className="flex flex-col gap-5 lg:sticky lg:top-8 lg:gap-6">
            <div className="flex flex-col gap-3">
              <span className="font-mono-field text-sm font-semibold tracking-[0.18em] sm:text-base">
                WARSZAWASZA
              </span>
              <LangNav lang={lang} onChange={setLang} variant="bracket" />
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
              interference={interference}
              civicIntersection={civicIntersection}
              variant="sidebar"
            />

            <LocalInitiativePilot lang={lang} className="hidden lg:block" />

            <div className="hidden lg:block">
              <LeaveTraceControl
                lang={lang}
                trajectory={trajectory}
                engineIndex={engineIndex}
                attentionCount={attentionCount}
                clock={clock}
                logLines={log.map((entry) => entry.line)}
              />
              <SignalControl
                as="a"
                href="mailto:hello@warszawasza.online"
                direction="right"
                className="mt-3 inline-flex min-h-10 items-center font-mono-field text-xs tracking-wider text-accent/45 touch-manipulation"
              >
                {copy.beginObservation}
              </SignalControl>
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
                interference={interference}
                civicIntersection={civicIntersection}
                variant="inline"
              />
            </div>

            <CorePrintSequence
              key={lang}
              lang={lang}
              onComplete={() => setCorePrinted(true)}
            />
            {cityPrinted && (
              <>
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

                <div className="mt-10 px-1 py-2 lg:mx-auto lg:max-w-md">
                  <LivingSignalText
                    text={copy.closing}
                    className="text-base font-light tracking-wide sm:text-lg"
                    intensity="low"
                  />
                </div>
              </>
            )}
          </section>

          {/* —— RIGHT: log · manifest fragment —— */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-8 lg:gap-7">
            <LocalInitiativePilot lang={lang} className="lg:hidden" />

            <div className="font-mono-field text-sm text-accent/35 sm:text-base">
              {log.map((entry) => (
                <div key={entry.id}>{entry.line}</div>
              ))}
            </div>

            <DataCityDiagram
              lang={lang}
              variant="fixed"
              printActive={corePrinted && !cityPrinted}
              onPrintComplete={() => setCityPrinted(true)}
            />

            {cityPrinted && (
              <div ref={noisePrincipleRef} className="fira-structure-proximity fira-structure-badge">
                <LivingSignalText
                  text={copy.noisePrinciple}
                  className="font-mono-field text-xs leading-relaxed sm:text-sm"
                  intensity="low"
                />
              </div>
            )}
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
          <SignalControl
            as="a"
            href="mailto:hello@warszawasza.online"
            direction="right"
            className="mt-3 inline-flex min-h-10 items-center font-mono-field text-xs tracking-wider text-accent/45 touch-manipulation"
          >
            {copy.beginObservation}
          </SignalControl>
        </div>

        <NarrativeArc lang={lang} />
      </main>
    </>
  );
}
