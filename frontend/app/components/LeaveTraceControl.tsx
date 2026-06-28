"use client";

import { useCallback, useEffect, useState } from "react";
import type { TrajectoryChoice } from "../../lib/artifactI18n";
import {
  DOMAIN_EVENTS,
  emitDomainEvent,
} from "../../lib/domain/events";
import {
  EMPTY_CITIZEN_TRACE,
  type CitizenTraceFields,
} from "../../lib/domain/traceContract";
import type { Lang } from "../../lib/i18n";
import { COPY } from "../../lib/i18n";
import { knowledgeGraph } from "../../lib/knowledge/KnowledgeGraph";
import {
  buildMailtoHref,
  buildTraceDocument,
  getTraceRegistryCount,
  registerTrace,
  type ObservationTracePayload,
} from "../../lib/observationTrace";
import {
  appendDecisionEvent,
  getDecisionEvents,
} from "../../lib/decisionTrajectory";
import { TRACE_FORM_COPY, traceSubjectOptions } from "../../lib/traceFormI18n";
import SignalControl from "./SignalControl";

type LeaveTraceControlProps = {
  lang: Lang;
  trajectory: TrajectoryChoice | null;
  engineIndex: number;
  attentionCount: number;
  clock: string;
  logLines: string[];
  className?: string;
  showRegistry?: boolean;
};

export default function LeaveTraceControl({
  lang,
  trajectory,
  engineIndex,
  attentionCount,
  clock,
  logLines,
  className = "",
  showRegistry = true,
}: LeaveTraceControlProps) {
  const copy = COPY[lang];
  const formCopy = TRACE_FORM_COPY[lang];
  const subjectOptions = traceSubjectOptions(lang);

  const [registryCount, setRegistryCount] = useState(0);
  const [flash, setFlash] = useState<string | null>(null);
  const [fields, setFields] = useState<CitizenTraceFields>(EMPTY_CITIZEN_TRACE);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setRegistryCount(getTraceRegistryCount());
  }, []);

  const patchField = <K extends keyof CitizenTraceFields>(
    key: K,
    value: CitizenTraceFields[K],
  ) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const onFieldFocus = () => {
    if (started) return;
    setStarted(true);
    emitDomainEvent(DOMAIN_EVENTS.OBSERVATION_START);
  };

  const onSubjectChange = (subjectKey: string) => {
    patchField("subject", subjectKey);
    const nodeId = knowledgeGraph.resolveSubjectToNodeId(subjectKey);
    if (nodeId) {
      emitDomainEvent(DOMAIN_EVENTS.OBSERVATION_CREATED, { nodeId });
    }
  };

  const onTraceDecisionChange = (value: CitizenTraceFields["traceDecision"]) => {
    setFields((prev) => {
      const next = { ...prev, traceDecision: value };
      if (value !== "none") {
        const nodeId = next.subject
          ? knowledgeGraph.resolveSubjectToNodeId(next.subject)
          : undefined;
        emitDomainEvent(DOMAIN_EVENTS.TRACE_CONFIRMED, {
          value,
          nodeId: nodeId ?? undefined,
        });
      }
      return next;
    });
  };

  const leaveTrace = useCallback(async () => {
    appendDecisionEvent("FINISH");
    const decisionEvents = getDecisionEvents();
    const payload: ObservationTracePayload = {
      lang,
      trajectory,
      engineIndex,
      attentionCount,
      clock,
      logLines,
      createdAt: Date.now(),
      decisionEvents,
      citizen: {
        ...fields,
        observedAt: fields.observedAt || clock,
      },
    };

    const count = registerTrace(payload);
    setRegistryCount(count);
    emitDomainEvent(DOMAIN_EVENTS.TRACE_EXPORTED, { traceId: count });

    const document = buildTraceDocument(payload);

    try {
      await navigator.clipboard.writeText(document);
      setFlash(copy.trace.copied);
    } catch {
      setFlash(copy.trace.copyFailed);
    }

    window.setTimeout(() => setFlash(null), 2400);
    window.setTimeout(() => {
      window.location.href = buildMailtoHref(payload);
    }, 350);
  }, [
    lang,
    trajectory,
    engineIndex,
    attentionCount,
    clock,
    logLines,
    fields,
    copy.trace.copied,
    copy.trace.copyFailed,
  ]);

  const inputClass =
    "trace-field-input w-full min-h-11 touch-manipulation border border-accent bg-field px-3 py-2.5 font-mono-field text-sm text-ink placeholder:text-accent/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <div className={`space-y-3 ${className}`}>
      <form
        lang={lang}
        autoComplete="off"
        data-1p-ignore
        data-lpignore="true"
        className="trace-form-panel relative space-y-3 border border-accent bg-field p-4 sm:p-5"
        onSubmit={(event) => {
          event.preventDefault();
          void leaveTrace();
        }}
      >
        <input
          type="text"
          name="wzs-honeypot"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
          defaultValue=""
        />
        <div className="space-y-1">
          <h2 className="m-0 font-mono-field text-xs tracking-[0.16em] text-accent uppercase">
            {formCopy.heading}
          </h2>
          <p className="m-0 font-mono-field text-xs leading-relaxed text-accent/55 sm:text-sm">
            {formCopy.lead}
          </p>
        </div>

        <label className="block space-y-1">
          <span className="font-mono-field text-xs tracking-wide text-accent/55">{formCopy.place}</span>
          <input
            type="text"
            name="wzs-place"
            id="wzs-place"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            inputMode="text"
            data-1p-ignore
            data-lpignore="true"
            className={inputClass}
            placeholder={formCopy.placePlaceholder}
            value={fields.place}
            onFocus={onFieldFocus}
            onChange={(e) => patchField("place", e.target.value)}
          />
        </label>

        <label className="block space-y-1">
          <span className="font-mono-field text-xs tracking-wide text-accent/55">{formCopy.time}</span>
          <input
            type="text"
            name="wzs-observed-at"
            id="wzs-observed-at"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            inputMode="numeric"
            data-1p-ignore
            data-lpignore="true"
            className={inputClass}
            placeholder={clock || formCopy.timePlaceholder}
            value={fields.observedAt}
            onFocus={onFieldFocus}
            onChange={(e) => patchField("observedAt", e.target.value)}
          />
        </label>

        <label className="block space-y-1">
          <span className="font-mono-field text-xs tracking-wide text-accent/55">{formCopy.subject}</span>
          <select
            name="wzs-subject"
            id="wzs-subject"
            autoComplete="off"
            data-1p-ignore
            data-lpignore="true"
            className={inputClass}
            value={fields.subject}
            onFocus={onFieldFocus}
            onChange={(e) => onSubjectChange(e.target.value)}
          >
            <option value="">{formCopy.subjectPlaceholder}</option>
            {subjectOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-1">
          <span className="font-mono-field text-xs tracking-wide text-accent/55">{formCopy.relations}</span>
          <textarea
            name="wzs-related-refs"
            id="wzs-related-refs"
            rows={2}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            data-1p-ignore
            data-lpignore="true"
            className={inputClass}
            placeholder={formCopy.relationsPlaceholder}
            value={fields.relatedRefs}
            onFocus={onFieldFocus}
            onChange={(e) => patchField("relatedRefs", e.target.value)}
          />
        </label>

        <fieldset className="space-y-2">
          <legend className="font-mono-field text-xs tracking-wide text-accent/55">{formCopy.decision}</legend>
          {(
            [
              ["none", formCopy.decisionNone],
              ["true", formCopy.decisionTrue],
              ["false", formCopy.decisionFalse],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className="flex min-h-11 touch-manipulation cursor-pointer items-center gap-2 font-mono-field text-sm text-accent/75"
            >
              <input
                type="radio"
                name="wzs-trace-decision"
                value={value}
                checked={fields.traceDecision === value}
                onFocus={onFieldFocus}
                onChange={() => onTraceDecisionChange(value)}
                className="accent-accent"
              />
              {label}
            </label>
          ))}
        </fieldset>

        <label className="block space-y-1">
          <span className="font-mono-field text-xs tracking-wide text-accent/45">{formCopy.obsidianRef}</span>
          <input
            type="text"
            name="wzs-obsidian-ref"
            id="wzs-obsidian-ref"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            data-1p-ignore
            data-lpignore="true"
            className={inputClass}
            placeholder={formCopy.obsidianRefPlaceholder}
            value={fields.obsidianRef ?? ""}
            onFocus={onFieldFocus}
            onChange={(e) => patchField("obsidianRef", e.target.value)}
          />
        </label>

        <SignalControl
          type="submit"
          direction="right"
          className="inline-flex min-h-11 w-full items-center justify-start px-3 py-2 font-mono-field text-xs tracking-[0.12em] touch-manipulation sm:text-sm"
        >
          {formCopy.submit}
        </SignalControl>
      </form>

      {showRegistry && registryCount > 0 && (
        <div className="font-mono-field text-[10px] tracking-wide text-accent/45 sm:text-[11px]">
          {copy.trace.registry.replace("{n}", String(registryCount))}
        </div>
      )}
      {flash && (
        <div className="font-mono-field text-[10px] tracking-wide text-accent/70 sm:text-[11px]">
          {flash}
        </div>
      )}
    </div>
  );
}
