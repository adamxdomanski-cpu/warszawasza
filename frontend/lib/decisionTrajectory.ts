/**
 * Decision trajectory — observable interaction path (observation, not interpretation).
 * @see docs/protocol/decision-trajectory-v1.md
 */

export const DECISION_EVENT_TYPES = [
  "ANSWER_TRUE",
  "ANSWER_FALSE",
  "NEXT",
  "BACK",
  "PAUSE",
  "EXIT",
  "FINISH",
] as const;

export type DecisionEventType = (typeof DECISION_EVENT_TYPES)[number];

export type DecisionEvent = {
  type: DecisionEventType;
  /** ms since epoch */
  at: number;
};

export type TrajectoryHypothesis = {
  observation: string;
  hypothesis: string;
};

const SESSION_KEY = "wzs-decision-trajectory-v1";

const PATH_TOKEN: Record<DecisionEventType, string> = {
  ANSWER_TRUE: "TRUE",
  ANSWER_FALSE: "FALSE",
  NEXT: "NEXT",
  BACK: "BACK",
  PAUSE: "PAUSE",
  EXIT: "EXIT",
  FINISH: "FINISH",
};

const FOP_PATH_TOKEN: Record<DecisionEventType, string> = {
  ANSWER_TRUE: "T",
  ANSWER_FALSE: "F",
  NEXT: "N",
  BACK: "B",
  PAUSE: "P",
  EXIT: "X",
  FINISH: "E",
};

function readEvents(): DecisionEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e): e is DecisionEvent =>
        typeof e === "object" &&
        e !== null &&
        typeof (e as DecisionEvent).type === "string" &&
        DECISION_EVENT_TYPES.includes((e as DecisionEvent).type) &&
        typeof (e as DecisionEvent).at === "number",
    );
  } catch {
    return [];
  }
}

function writeEvents(events: DecisionEvent[]): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(events));
  } catch {
    /* session unavailable */
  }
}

export function getDecisionEvents(): DecisionEvent[] {
  return readEvents();
}

export function appendDecisionEvent(type: DecisionEventType): DecisionEvent[] {
  const next = [...readEvents(), { type, at: Date.now() }];
  writeEvents(next);
  return next;
}

export function clearDecisionEvents(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* session unavailable */
  }
}

/** Multi-line path for human / SYSTEM log layer. */
export function formatDecisionPath(events: DecisionEvent[]): string {
  if (events.length === 0) return "";
  return events.map((e) => PATH_TOKEN[e.type]).join("\n↓\n");
}

/** Compact path for FOP signal.decision_path */
export function compactDecisionPath(events: DecisionEvent[]): string {
  return events.map((e) => FOP_PATH_TOKEN[e.type]).join("|");
}

function countAnswerChanges(events: DecisionEvent[]): number {
  let changes = 0;
  let last: "true" | "false" | null = null;
  for (const e of events) {
    if (e.type === "ANSWER_TRUE") {
      if (last !== null && last !== "true") changes += 1;
      last = "true";
    }
    if (e.type === "ANSWER_FALSE") {
      if (last !== null && last !== "false") changes += 1;
      last = "false";
    }
  }
  return changes;
}

function consecutiveAnswers(events: DecisionEvent[], answer: DecisionEventType): number {
  let max = 0;
  let run = 0;
  for (const e of events) {
    if (e.type === answer) {
      run += 1;
      max = Math.max(max, run);
    } else if (e.type === "ANSWER_TRUE" || e.type === "ANSWER_FALSE") {
      run = 0;
    }
  }
  return max;
}

/**
 * Suggested hypotheses from trajectory — always provisional, never shown as fact in citizen UI.
 */
export function suggestTrajectoryHypotheses(
  events: DecisionEvent[],
): TrajectoryHypothesis[] {
  const out: TrajectoryHypothesis[] = [];
  const answers = events.filter(
    (e) => e.type === "ANSWER_TRUE" || e.type === "ANSWER_FALSE",
  );
  const backs = events.filter((e) => e.type === "BACK").length;
  const changes = countAnswerChanges(events);
  const falseRun = consecutiveAnswers(events, "ANSWER_FALSE");
  const trueRun = consecutiveAnswers(events, "ANSWER_TRUE");

  if (answers.length >= 2 && (changes >= 2 || backs >= 1)) {
    out.push({
      observation: `User changed answer ${Math.max(changes, 1)} time(s); BACK=${backs}.`,
      hypothesis: "The question may be ambiguous.",
    });
  }

  if (falseRun >= 3) {
    out.push({
      observation: `User selected FALSE ${falseRun} times in sequence.`,
      hypothesis: "The presented explanation was not convincing.",
    });
  }

  if (trueRun >= 3) {
    out.push({
      observation: `User selected TRUE ${trueRun} times in sequence.`,
      hypothesis: "The presented framing aligned with user direction — verify in FIELD.",
    });
  }

  if (events.some((e) => e.type === "PAUSE") && answers.length >= 1) {
    out.push({
      observation: "PAUSE events recorded before commit.",
      hypothesis: "User hesitated before choosing — check clarity of T/F labels.",
    });
  }

  return out;
}

export function decisionEventsForLog(events: DecisionEvent[]): string[] {
  if (events.length === 0) return [];
  return [
    "decision_path:",
    ...events.map((e) => `  ${PATH_TOKEN[e.type]} @ ${new Date(e.at).toISOString()}`),
  ];
}
