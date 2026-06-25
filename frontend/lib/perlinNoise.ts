/** Compact 2D Perlin noise — returns approximately -1 … 1. */

const PERM = new Uint8Array(512);

(function initPerm() {
  const src = new Uint8Array(256);
  for (let i = 0; i < 256; i += 1) src[i] = i;
  for (let i = 255; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = src[i]!;
    src[i] = src[j]!;
    src[j] = tmp;
  }
  for (let i = 0; i < 512; i += 1) PERM[i] = src[i & 255]!;
})();

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function grad(hash: number, x: number, y: number): number {
  const h = hash & 3;
  const u = h < 2 ? x : y;
  const v = h < 2 ? y : x;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

export function perlin2D(x: number, y: number): number {
  const xi = Math.floor(x) & 255;
  const yi = Math.floor(y) & 255;
  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);
  const u = fade(xf);
  const v = fade(yf);

  const aa = PERM[PERM[xi]! + yi]!;
  const ab = PERM[PERM[xi]! + yi + 1]!;
  const ba = PERM[PERM[xi + 1]! + yi]!;
  const bb = PERM[PERM[xi + 1]! + yi + 1]!;

  const x1 = lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u);
  const x2 = lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u);
  return lerp(x1, x2, v);
}

function lerp(a: number, b: number, t: number): number {
  return a + t * (b - a);
}
