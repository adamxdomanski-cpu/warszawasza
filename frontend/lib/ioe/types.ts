/**
 * IOE/0.2 — Interaction Observation Events (strumień → agregat sesji).
 * Klient: agregat przy closure. Backend: sesja ze strumienia. AOP: offline.
 */

export type IoeInputType = "mouse" | "touch" | "pen" | "unknown";

export type IoeClosureEvent = "share" | "continue";

/** Agregat sesji IOE — surowe cechy, zero interpretacji. */
export type IoeSessionAggregate = {
  protocol: "IOE/0.2";
  decisionTime: number;
  timeToFirstAction: number;
  timeToFirstScroll: number;
  inputType: IoeInputType;
  viewportWidth: number;
  viewportHeight: number;
  prefersReducedMotion: boolean;
  pointerDistance: number;
  pointerReversals: number;
  hoverCount: number;
  hoverTime: number;
  scrollDistance: number;
  scrollReversals: number;
  focusLossCount: number;
  orientationChanges: number;
  textCopyCount: number;
  diagnosticsOpened: boolean;
  diagnosticsOpenTime: number;
  closureEvent: IoeClosureEvent;
};

export const EMPTY_IOE_SESSION: IoeSessionAggregate = {
  protocol: "IOE/0.2",
  decisionTime: 0,
  timeToFirstAction: 0,
  timeToFirstScroll: 0,
  inputType: "unknown",
  viewportWidth: 0,
  viewportHeight: 0,
  prefersReducedMotion: false,
  pointerDistance: 0,
  pointerReversals: 0,
  hoverCount: 0,
  hoverTime: 0,
  scrollDistance: 0,
  scrollReversals: 0,
  focusLossCount: 0,
  orientationChanges: 0,
  textCopyCount: 0,
  diagnosticsOpened: false,
  diagnosticsOpenTime: 0,
  closureEvent: "share",
};

export type IoeEventType =
  | "pointerdown"
  | "pointermove"
  | "pointerup"
  | "scroll"
  | "visibilitychange"
  | "orientationchange"
  | "copy"
  | "click";

export type IoeEvent = {
  t: number;
  type: IoeEventType;
  inputType?: IoeInputType;
};
