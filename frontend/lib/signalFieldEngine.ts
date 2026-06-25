import { perlin2D } from "./perlinNoise";

export type SignalIntensity = "low" | "normal";

type GlyphRecord = {
  el: HTMLElement;
  sentenceId: string;
  seed: number;
  cx: number;
  cy: number;
  activation: number;
  shiftX: number;
  shiftY: number;
  shiftUntil: number;
};

type SentenceRecord = {
  id: string;
  seed: number;
  intensity: SignalIntensity;
  glyphIds: Set<number>;
  nextPulseAt: number;
  pulseGlyphId: number | null;
  pulseUntil: number;
  nextShiftAt: number;
};

type PointerState = { x: number; y: number; t: number };

const ACTIVATION_RADIUS = 118;
const ACTIVATION_DECAY_MS = 100;
const POINTER_WAKE_MS = 320;
const IDLE_STOP_MS = 2200;
const LAYOUT_INTERVAL_MS = 900;

let nextGlyphId = 0;
let nextSentenceId = 0;

export class SignalFieldEngine {
  private glyphs = new Map<number, GlyphRecord>();
  private sentences = new Map<string, SentenceRecord>();
  private pointer: PointerState = { x: -9999, y: -9999, t: 0 };
  private rafId: number | null = null;
  private enabled = true;
  private lastFrame = 0;
  private lastLayout = 0;
  private layoutDirty = true;
  private ambientTimer: ReturnType<typeof setTimeout> | null = null;

  setEnabled(on: boolean) {
    this.enabled = on;
    if (!on) {
      this.stop();
      this.resetStyles();
    }
  }

  setPointer(x: number, y: number) {
    this.pointer = { x, y, t: performance.now() };
    this.scheduleFrame();
  }

  registerSentence(intensity: SignalIntensity = "normal"): string {
    const id = `s${nextSentenceId++}`;
    const now = performance.now();
    const seed = Math.random() * 1000;
    this.sentences.set(id, {
      id,
      seed,
      intensity,
      glyphIds: new Set(),
      nextPulseAt: now + 800 + Math.random() * 4000,
      pulseGlyphId: null,
      pulseUntil: 0,
      nextShiftAt:
        intensity === "normal"
          ? now + 12000 + Math.random() * 20000
          : Number.POSITIVE_INFINITY,
    });
    this.scheduleFrame();
    return id;
  }

  unregisterSentence(sentenceId: string) {
    const sentence = this.sentences.get(sentenceId);
    if (!sentence) return;
    for (const gid of sentence.glyphIds) {
      const g = this.glyphs.get(gid);
      if (g) {
        this.resetGlyph(g);
        this.glyphs.delete(gid);
      }
    }
    this.sentences.delete(sentenceId);
    if (this.glyphs.size === 0) this.stop();
  }

  registerGlyph(sentenceId: string, el: HTMLElement, charSeed: number): number {
    const sentence = this.sentences.get(sentenceId);
    if (!sentence) return -1;

    const id = nextGlyphId++;
    const record: GlyphRecord = {
      el,
      sentenceId,
      seed: charSeed,
      cx: 0,
      cy: 0,
      activation: 0,
      shiftX: 0,
      shiftY: 0,
      shiftUntil: 0,
    };
    this.glyphs.set(id, record);
    sentence.glyphIds.add(id);
    this.layoutDirty = true;
    this.scheduleFrame();
    return id;
  }

  private resetGlyph(g: GlyphRecord) {
    g.el.style.opacity = "";
    g.el.style.transform = "";
  }

  private resetStyles() {
    for (const g of this.glyphs.values()) this.resetGlyph(g);
  }

  private scheduleFrame() {
    if (!this.enabled || this.rafId !== null) return;
    this.rafId = requestAnimationFrame((t) => this.frame(t));
  }

  private stop() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this.ambientTimer !== null) {
      clearTimeout(this.ambientTimer);
      this.ambientTimer = null;
    }
  }

  private scheduleAmbient() {
    if (this.ambientTimer !== null) return;
    this.ambientTimer = setTimeout(() => {
      this.ambientTimer = null;
      this.scheduleFrame();
    }, 340);
  }

  private measureGlyphs(now: number) {
    if (!this.layoutDirty && now - this.lastLayout < LAYOUT_INTERVAL_MS) return;
    this.lastLayout = now;
    this.layoutDirty = false;
    for (const g of this.glyphs.values()) {
      const rect = g.el.getBoundingClientRect();
      g.cx = rect.left + rect.width * 0.5;
      g.cy = rect.top + rect.height * 0.5;
    }
  }

  private frame(now: number) {
    this.rafId = null;
    if (!this.enabled || this.glyphs.size === 0) return;

    const dt = this.lastFrame ? now - this.lastFrame : 16;
    this.lastFrame = now;

    this.measureGlyphs(now);

    const px = this.pointer.x;
    const py = this.pointer.y;
    const pointerFresh = now - this.pointer.t < POINTER_WAKE_MS;

    let needsNext = pointerFresh;

    for (const sentence of this.sentences.values()) {
      const scale = sentence.intensity === "low" ? 0.5 : 1;
      const noiseAmp = 0.03 * scale;
      const sentenceNoise =
        perlin2D(sentence.seed, now * 0.00007) * noiseAmp;

      if (now >= sentence.nextPulseAt && sentence.glyphIds.size > 0) {
        const ids = [...sentence.glyphIds];
        sentence.pulseGlyphId = ids[Math.floor(Math.random() * ids.length)]!;
        sentence.pulseUntil = now + 150 + Math.random() * 100;
        sentence.nextPulseAt = now + (2500 + Math.random() * 7000) / scale;
        needsNext = true;
      }

      if (
        sentence.intensity === "normal" &&
        now >= sentence.nextShiftAt &&
        sentence.glyphIds.size > 0
      ) {
        const ids = [...sentence.glyphIds];
        const gid = ids[Math.floor(Math.random() * ids.length)]!;
        const g = this.glyphs.get(gid);
        if (g) {
          g.shiftX = Math.random() > 0.5 ? 1 : -1;
          g.shiftY = Math.random() > 0.65 ? (Math.random() > 0.5 ? 1 : -1) : 0;
          g.shiftUntil = now + 500 + Math.random() * 200;
        }
        sentence.nextShiftAt = now + 18000 + Math.random() * 28000;
        needsNext = true;
      }

      for (const gid of sentence.glyphIds) {
        const g = this.glyphs.get(gid);
        if (!g) continue;

        let opacity =
          1 +
          sentenceNoise +
          perlin2D(g.seed, now * 0.00011) * noiseAmp * 0.35;

        if (sentence.pulseGlyphId === gid && now < sentence.pulseUntil) {
          const pulseT = 1 - (sentence.pulseUntil - now) / 200;
          const envelope = Math.sin(pulseT * Math.PI);
          opacity += 0.04 * envelope * scale;
          needsNext = true;
        } else if (sentence.pulseGlyphId === gid && now >= sentence.pulseUntil) {
          sentence.pulseGlyphId = null;
        }

        const dist = Math.hypot(g.cx - px, g.cy - py);
        if (dist < ACTIVATION_RADIUS) {
          const boost = (1 - dist / ACTIVATION_RADIUS) * 0.055 * scale;
          g.activation = Math.max(g.activation, boost);
          needsNext = true;
        }

        if (g.activation > 0.0005) {
          g.activation *= Math.exp(-dt / ACTIVATION_DECAY_MS);
          opacity += g.activation;
          needsNext = true;
        } else {
          g.activation = 0;
        }

        opacity = Math.min(1.06, Math.max(0.94, opacity));

        let tx = 0;
        let ty = 0;
        if (now < g.shiftUntil) {
          tx = g.shiftX;
          ty = g.shiftY;
          needsNext = true;
        }

        g.el.style.opacity = opacity.toFixed(4);
        g.el.style.transform =
          tx || ty ? `translate(${tx}px, ${ty}px)` : "";
      }
    }

    const idle = now - this.pointer.t;
    if (needsNext || idle < IDLE_STOP_MS) {
      this.scheduleFrame();
    } else if (this.glyphs.size > 0) {
      this.scheduleAmbient();
    }
  }

  markLayoutDirty() {
    this.layoutDirty = true;
    this.scheduleFrame();
  }
}

export const signalFieldEngine = new SignalFieldEngine();
