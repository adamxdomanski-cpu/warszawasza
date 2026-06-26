/**
 * Domain events — native EventTarget backbone.
 * Producers and consumers share event names; payloads use nodeId, never renderer sector names.
 */

export const DOMAIN_EVENTS = {
  FIELD_ENTERED: "warszawasza:field:entered",
  /** Operator begins entering trace fields (attention on form). */
  OBSERVATION_START: "warszawasza:observation:start",
  /** A subject/node is bound to the in-progress trace. */
  OBSERVATION_CREATED: "warszawasza:observation:created",
  /** Trace-level commitment on the form — not gate T/F UI. */
  TRACE_CONFIRMED: "warszawasza:trace:confirmed",
  TRACE_EXPORTED: "warszawasza:trace:exported",
} as const;

export type DomainEventName = (typeof DOMAIN_EVENTS)[keyof typeof DOMAIN_EVENTS];

export type ObservationCreatedDetail = {
  nodeId: string;
};

export type TraceConfirmedDetail = {
  nodeId?: string;
  value: "true" | "false" | "none";
};

export type TraceExportedDetail = {
  traceId: number;
};

/** Browser-native bus — no custom wrapper to maintain. */
export const domainEvents =
  typeof EventTarget !== "undefined" ? new EventTarget() : null;

export function emitDomainEvent<T>(name: DomainEventName, detail?: T): void {
  domainEvents?.dispatchEvent(new CustomEvent(name, { detail }));
}

export function subscribeDomainEvent<T>(
  name: DomainEventName,
  handler: (event: CustomEvent<T>) => void,
): () => void {
  if (!domainEvents) return () => undefined;
  const listener = handler as EventListener;
  domainEvents.addEventListener(name, listener);
  return () => domainEvents.removeEventListener(name, listener);
}
