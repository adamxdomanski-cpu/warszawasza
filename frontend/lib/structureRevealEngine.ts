/** Structural ● badges emerge where beetroot attention passes — then stay (system remembers). */

const REVEAL_RADIUS = 132;
const REVEAL_CLASS = "fira-structure-revealed";

type AnchorRecord = {
  el: HTMLElement;
  revealed: boolean;
};

let nextAnchorId = 0;

export class StructureRevealEngine {
  private anchors = new Map<number, AnchorRecord>();
  private pointer = { x: -9999, y: -9999 };
  private enabled = true;

  setEnabled(on: boolean) {
    this.enabled = on;
    if (!on) {
      for (const anchor of this.anchors.values()) {
        anchor.el.classList.remove(REVEAL_CLASS);
        anchor.revealed = false;
      }
    }
  }

  setPointer(x: number, y: number) {
    if (!this.enabled) return;
    this.pointer = { x, y };
    this.evaluate();
  }

  register(el: HTMLElement): () => void {
    const id = nextAnchorId++;
    this.anchors.set(id, { el, revealed: false });
    return () => {
      const anchor = this.anchors.get(id);
      if (anchor) {
        anchor.el.classList.remove(REVEAL_CLASS);
        this.anchors.delete(id);
      }
    };
  }

  private evaluate() {
    const { x, y } = this.pointer;

    for (const anchor of this.anchors.values()) {
      if (anchor.revealed) continue;

      const rect = anchor.el.getBoundingClientRect();
      const cx = rect.left + rect.width * 0.5;
      const cy = rect.top + rect.height * 0.5;
      if (Math.hypot(cx - x, cy - y) > REVEAL_RADIUS) continue;

      anchor.revealed = true;
      anchor.el.classList.add(REVEAL_CLASS);
    }
  }
}

export const structureRevealEngine = new StructureRevealEngine();
