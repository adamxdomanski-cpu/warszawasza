/** FIRA Core — interaction events (interface-agnostic) */

export const INTERACTION_EVENT_KINDS = [
  "START",
  "SELECT",
  "CHANGE",
  "NEXT",
  "BACK",
  "PAUSE",
  "RESUME",
  "EXIT",
  "COMPLETE",
] as const;

export type InteractionEventKind = (typeof INTERACTION_EVENT_KINDS)[number];

/** Single fact — one row in reality. */
export type InteractionEvent = {
  event: InteractionEventKind;
  value?: string;
  at: number;
};

/** Ordered record of facts — the trace. */
export type InteractionTrace = {
  events: InteractionEvent[];
};
