import type { IoeClosureEvent, IoeInputType, IoeSessionAggregate } from "./types";

type IoeSensorOptions = {
  hoverTarget?: HTMLElement | null;
  diagnosticsPanel?: HTMLDetailsElement | null;
};

function normalizeInputType(pointerType: string): IoeInputType {
  if (pointerType === "mouse" || pointerType === "touch" || pointerType === "pen") {
    return pointerType;
  }
  return "unknown";
}

/** Bezstanowy sensor IOE — współrzędne nadpisywane w locie. */
export class IoeSensor {
  private tStart = Date.now();
  private timeToFirstAction = 0;
  private timeToFirstScroll = 0;
  private inputType: IoeInputType = "unknown";
  private viewportWidth = 0;
  private viewportHeight = 0;
  private prefersReducedMotion = false;
  private pointerDistance = 0;
  private pointerReversals = 0;
  private hoverCount = 0;
  private hoverTime = 0;
  private scrollDistance = 0;
  private scrollReversals = 0;
  private focusLossCount = 0;
  private orientationChanges = 0;
  private textCopyCount = 0;
  private diagnosticsOpened = false;
  private diagnosticsOpenTime = 0;

  private lastX: number | null = null;
  private lastY: number | null = null;
  private lastAngle: number | null = null;
  private hoverEntered = 0;
  private lastScrollY = 0;
  private lastScrollDir = 0;
  private diagnosticsOpenedAt = 0;
  private hasAction = false;

  private boundPointerDown: (e: PointerEvent) => void;
  private boundPointerMove: (e: PointerEvent) => void;
  private boundScroll: () => void;
  private boundVisibility: () => void;
  private boundOrientation: () => void;
  private boundCopy: () => void;
  private boundPointerEnter: () => void;
  private boundPointerLeave: () => void;
  private boundDiagnosticsToggle: () => void;

  private orientationTarget: ScreenOrientation | null = null;
  private hoverTarget: HTMLElement | null = null;
  private diagnosticsPanel: HTMLDetailsElement | null = null;
  private active = false;

  constructor() {
    this.boundPointerDown = () => this.markFirstAction();
    this.boundPointerMove = (e) => this.onPointerMove(e);
    this.boundScroll = () => this.onScroll();
    this.boundVisibility = () => this.onVisibility();
    this.boundOrientation = () => this.onOrientation();
    this.boundCopy = () => this.onCopy();
    this.boundPointerEnter = () => this.onPointerEnter();
    this.boundPointerLeave = () => this.onPointerLeave();
    this.boundDiagnosticsToggle = () => this.onDiagnosticsToggle();
  }

  start(options: IoeSensorOptions = {}): void {
    if (this.active || typeof window === "undefined") return;
    this.active = true;
    this.tStart = Date.now();
    this.lastScrollY = window.scrollY;
    this.viewportWidth = window.innerWidth;
    this.viewportHeight = window.innerHeight;
    this.prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.hoverTarget = options.hoverTarget ?? null;
    this.diagnosticsPanel = options.diagnosticsPanel ?? null;

    window.addEventListener("pointerdown", this.boundPointerDown, { passive: true });
    window.addEventListener("pointermove", this.boundPointerMove, { passive: true });
    window.addEventListener("scroll", this.boundScroll, { passive: true });
    document.addEventListener("visibilitychange", this.boundVisibility);
    document.addEventListener("copy", this.boundCopy);

    if (window.screen?.orientation) {
      this.orientationTarget = window.screen.orientation;
      this.orientationTarget.addEventListener("change", this.boundOrientation);
    }

    if (this.hoverTarget) {
      this.hoverTarget.addEventListener("pointerenter", this.boundPointerEnter);
      this.hoverTarget.addEventListener("pointerleave", this.boundPointerLeave);
    }

    if (this.diagnosticsPanel) {
      this.diagnosticsPanel.addEventListener("toggle", this.boundDiagnosticsToggle);
    }
  }

  stop(): void {
    if (!this.active || typeof window === "undefined") return;
    this.active = false;

    window.removeEventListener("pointerdown", this.boundPointerDown);
    window.removeEventListener("pointermove", this.boundPointerMove);
    window.removeEventListener("scroll", this.boundScroll);
    document.removeEventListener("visibilitychange", this.boundVisibility);
    document.removeEventListener("copy", this.boundCopy);

    if (this.orientationTarget) {
      this.orientationTarget.removeEventListener("change", this.boundOrientation);
      this.orientationTarget = null;
    }

    if (this.hoverTarget) {
      this.hoverTarget.removeEventListener("pointerenter", this.boundPointerEnter);
      this.hoverTarget.removeEventListener("pointerleave", this.boundPointerLeave);
    }

    if (this.diagnosticsPanel) {
      this.diagnosticsPanel.removeEventListener("toggle", this.boundDiagnosticsToggle);
    }

    this.flushHover();
    this.flushDiagnostics();
    this.hoverTarget = null;
    this.diagnosticsPanel = null;
  }

  finalize(closureEvent: IoeClosureEvent): IoeSessionAggregate {
    this.markFirstAction();
    this.flushHover();
    this.flushDiagnostics();
    this.stop();

    return {
      protocol: "IOE/0.2",
      decisionTime: round3((Date.now() - this.tStart) / 1000),
      timeToFirstAction: round3(this.timeToFirstAction),
      timeToFirstScroll: round3(this.timeToFirstScroll),
      inputType: this.inputType,
      viewportWidth: this.viewportWidth,
      viewportHeight: this.viewportHeight,
      prefersReducedMotion: this.prefersReducedMotion,
      pointerDistance: Math.round(this.pointerDistance),
      pointerReversals: this.pointerReversals,
      hoverCount: this.hoverCount,
      hoverTime: round3(this.hoverTime),
      scrollDistance: Math.round(this.scrollDistance),
      scrollReversals: this.scrollReversals,
      focusLossCount: this.focusLossCount,
      orientationChanges: this.orientationChanges,
      textCopyCount: this.textCopyCount,
      diagnosticsOpened: this.diagnosticsOpened,
      diagnosticsOpenTime: round3(this.diagnosticsOpenTime),
      closureEvent,
    };
  }

  private markFirstAction(): void {
    if (this.hasAction) return;
    this.hasAction = true;
    this.timeToFirstAction = (Date.now() - this.tStart) / 1000;
  }

  private onPointerMove(e: PointerEvent): void {
    this.inputType = normalizeInputType(e.pointerType);
    const x = e.clientX;
    const y = e.clientY;

    if (this.lastX !== null && this.lastY !== null) {
      const dx = x - this.lastX;
      const dy = y - this.lastY;
      this.pointerDistance += Math.hypot(dx, dy);

      if (dx !== 0 || dy !== 0) {
        const angle = Math.atan2(dy, dx);
        if (this.lastAngle !== null) {
          const diff = Math.abs(angle - this.lastAngle);
          if (diff > Math.PI / 2 && diff < (3 * Math.PI) / 2) {
            this.pointerReversals++;
          }
        }
        this.lastAngle = angle;
      }
    }

    this.lastX = x;
    this.lastY = y;
  }

  private onPointerEnter(): void {
    this.hoverCount++;
    this.hoverEntered = Date.now();
  }

  private onPointerLeave(): void {
    this.flushHover();
  }

  private flushHover(): void {
    if (this.hoverEntered > 0) {
      this.hoverTime += (Date.now() - this.hoverEntered) / 1000;
      this.hoverEntered = 0;
    }
  }

  private flushDiagnostics(): void {
    if (this.diagnosticsOpenedAt > 0) {
      this.diagnosticsOpenTime += (Date.now() - this.diagnosticsOpenedAt) / 1000;
      this.diagnosticsOpenedAt = 0;
    }
  }

  private onScroll(): void {
    if (this.timeToFirstScroll === 0) {
      this.timeToFirstScroll = (Date.now() - this.tStart) / 1000;
    }
    this.markFirstAction();

    const currentY = window.scrollY;
    const delta = currentY - this.lastScrollY;
    this.scrollDistance += Math.abs(delta);

    if (delta !== 0) {
      const dir = delta > 0 ? 1 : -1;
      if (this.lastScrollDir !== 0 && dir !== this.lastScrollDir) {
        this.scrollReversals++;
      }
      this.lastScrollDir = dir;
    }

    this.lastScrollY = currentY;
  }

  private onDiagnosticsToggle(): void {
    this.markFirstAction();
    const panel = this.diagnosticsPanel;
    if (!panel) return;

    if (panel.open) {
      this.diagnosticsOpened = true;
      this.diagnosticsOpenedAt = Date.now();
    } else {
      this.flushDiagnostics();
    }
  }

  private onVisibility(): void {
    if (document.visibilityState === "hidden") {
      this.focusLossCount++;
    }
  }

  private onOrientation(): void {
    this.orientationChanges++;
  }

  private onCopy(): void {
    this.textCopyCount++;
    this.markFirstAction();
  }
}

function round3(n: number): number {
  return parseFloat(n.toFixed(3));
}

export function formatDiagnosticDump(
  fopPayload: string,
  ioe: IoeSessionAggregate | null,
): string {
  const ioeBlock = ioe
    ? JSON.stringify(ioe, null, 2)
    : "(IOE — finalize on share or continue)";
  return `[FOP Fact Record]\n${fopPayload}\n\n[IOE Session Aggregate]\n${ioeBlock}`;
}
