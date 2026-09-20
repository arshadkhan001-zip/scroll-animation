// Frame-sequence engine: progressive loading, LRU decode cache,
// cover-fit canvas rendering. No React state inside the hot path.
// Source PNGs in /frames stay untouched; runtime serves generated
// WebP copies from /public/frames (see scripts/convert-frames.py).

export const FRAME_COUNT = 308;
// BASE_URL-aware so the app works under the /scroll-animation/
// GitHub Pages subpath as well as at the domain root.
export const FRAME_DIR = `${import.meta.env.BASE_URL}frames`;

export const frameUrl = (i: number) =>
  `${FRAME_DIR}/frame-${String(i).padStart(3, "0")}.webp`;

const cache = new Map<number, HTMLImageElement>();
// Bounded: 24 decoded 1280x720 bitmaps ≈ 90MB worst case. Scrubbing
// stays smooth inside the window; older entries are re-decoded on demand.
const MAX_CACHE = 24;
const inflight = new Map<number, Promise<HTMLImageElement | null>>();

function touch(i: number, img: HTMLImageElement) {
  cache.delete(i);
  cache.set(i, img);
  while (cache.size > MAX_CACHE) {
    const oldest = cache.keys().next().value;
    if (oldest === undefined) break;
    if (oldest === i) break;
    cache.delete(oldest);
  }
}

export function getCached(i: number): HTMLImageElement | undefined {
  const img = cache.get(i);
  if (img) touch(i, img);
  return img;
}

/** Nearest decoded frame at or before i (never renders blank if anything is loaded). */
export function nearestLoaded(i: number): HTMLImageElement | null {
  for (let k = i; k >= Math.max(1, i - 24); k--) {
    const img = cache.get(k);
    if (img?.complete && img.naturalWidth > 0) {
      touch(k, img);
      return img;
    }
  }
  for (const [, img] of cache) {
    if (img.complete && img.naturalWidth > 0) return img;
  }
  return null;
}

export function loadFrame(i: number): Promise<HTMLImageElement | null> {
  const hit = cache.get(i);
  if (hit) {
    touch(i, hit);
    return Promise.resolve(hit);
  }
  const pending = inflight.get(i);
  if (pending) return pending;
  const p = new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image();
    // ponytail: no fetch-priority tuning; decode order handled by queue
    img.onload = () => {
      touch(i, img);
      inflight.delete(i);
      try {
        void img.decode().then(() => resolve(img));
      } catch {
        resolve(img);
      }
    };
    img.onerror = () => {
      // Dev-visible, never fatal: hero falls back to nearest loaded frame.
      if (typeof console !== "undefined") console.warn(`[frames] failed to load frame ${i}`);
      inflight.delete(i);
      resolve(null);
    };
    img.src = frameUrl(i);
  });
  inflight.set(i, p);
  return p;
}

export interface Loader {
  loadedFirst: number;
  total: number;
  done: boolean;
  stop: () => void;
}

/**
 * Bounded preload: eager window first (hero must paint fast), then a
 * short head of the sequence, then the loader STOPS. Everything past
 * the head loads on demand via loadFrame() — the hero warms neighbours
 * around the live frame during scrubbing. Nothing here ever sweeps the
 * full 308-frame sequence in the background.
 */
export function startProgressiveLoad(opts: {
  eager?: number;
  chunk?: number;
  stride?: number;
  maxHead?: number;
  onProgress?: (loaded: number, total: number) => void;
} = {}): Loader {
  const { eager = 12, chunk = 6, stride = 1, maxHead = 48 } = opts;
  const onProgress = opts.onProgress;
  let stopped = false;
  const total = eager;

  const idle = (cb: () => void) => {
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(() => cb(), { timeout: 800 });
    } else {
      window.setTimeout(cb, 120);
    }
  };

  const indices: number[] = [];
  const headEnd = Math.min(FRAME_COUNT, Math.max(eager, maxHead));
  for (let i = 1; i <= headEnd; i += stride) indices.push(i);
  // Eager window first, then the rest in order.
  const ordered = [
    ...indices.filter((i) => i <= eager),
    ...indices.filter((i) => i > eager),
  ];

  let cursor = 0;
  const loader: Loader = {
    loadedFirst: 0,
    total,
    done: false,
    stop: () => {
      stopped = true;
    },
  };

  const pump = () => {
    if (stopped) return;
    if (cursor >= ordered.length) {
      loader.done = true;
      return;
    }
    const batch = ordered.slice(cursor, cursor + chunk);
    cursor += batch.length;
    void Promise.all(batch.map(loadFrame)).then(() => {
      if (stopped) return;
      const eagerDone = ordered
        .slice(0, eager)
        .filter((i) => cache.has(i)).length;
      loader.loadedFirst = eagerDone;
      onProgress?.(eagerDone, total);
      idle(pump);
    });
  };
  idle(pump);
  return loader;
}

/** Cover-fit draw of img into canvas (focal point: horizontal center, vertical ~42% to protect the stack). */
export function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  w: number,
  h: number,
) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  if (!iw || !ih) return;
  const scale = Math.max(w / iw, h / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  const dx = (w - dw) / 2;
  // Bias slightly upward so the burger stack stays clear of bottom copy.
  const dy = (h - dh) * 0.42;
  ctx.drawImage(img, dx, dy, dw, dh);
}
