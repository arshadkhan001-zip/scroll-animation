import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { ScrollTrigger, initSmoothScroll } from "../lib/scroll";
import {
  FRAME_COUNT,
  drawCover,
  frameUrl,
  loadFrame,
  nearestLoaded,
  startProgressiveLoad,
} from "../lib/frames";

/**
 * STAGE 9 — scroll-driven burger film.
 * One canvas, imperative progress (refs only), rAF that sleeps when
 * settled or off-screen. React re-renders at most 6× per pass (beats).
 *
 * Layers: L1 canvas+poster / L2 scrim / L3 beat slot / L4 metadata / L5 cue.
 */

interface Beat {
  kicker: string;
  lines: string[];
  accentLast?: boolean;
  center?: boolean;
}

export const HERO_BEATS: Beat[] = [
  { kicker: "Stacked — Burger Study", lines: ["BURGERS,", "BUILT DIFFERENTLY."] },
  { kicker: "01 / Assembly", lines: ["BUILT FROM", "THE BUN"] },
  { kicker: "02 / Texture", lines: ["CRISP."], center: true },
  { kicker: "03 / Texture", lines: ["JUICY."], center: true },
  { kicker: "04 / Texture", lines: ["MELTED."], center: true },
  { kicker: "05 / Stacked", lines: ["STACKED."], accentLast: true, center: true },
];

// Spec beat ranges: 0–15 / 15–32 / 32–48 / 48–64 / 64–80 / 80–100.
const EDGES = [0, 0.15, 0.32, 0.48, 0.64, 0.8, 1.01];

function beatFor(p: number): number {
  for (let i = 0; i < HERO_BEATS.length; i++) {
    if (p >= EDGES[i] && p < EDGES[i + 1]) return i;
  }
  return HERO_BEATS.length - 1;
}

const frameFor = (p: number) =>
  Math.min(FRAME_COUNT, Math.max(1, Math.round(p * (FRAME_COUNT - 1)) + 1));

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const frameLabelRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const target = useRef(0);
  const current = useRef(0);
  const [beat, setBeat] = useState(0);
  const [ready, setReady] = useState(false);
  const [eagerPct, setEagerPct] = useState(0);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) {
      setReady(true);
      return;
    }
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    // Opaque canvas: no alpha compositing on HD 4400.
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Lenis owns smooth scroll from here on (single gsap ticker, no dup loop).
    void initSmoothScroll();

    let raf = 0;
    let lastDrawn = -1;
    let lastBeat = -1;
    let lastBar = -1;
    let visible = true;
    let revealed = false;
    let dprCap = 1.5;

    const paint = (img: HTMLImageElement, frame: number) => {
      drawCover(ctx, img, canvas.width, canvas.height);
      lastDrawn = frame;
      if (frameLabelRef.current) {
        frameLabelRef.current.textContent = `FRAME ${String(frame).padStart(3, "0")} / ${FRAME_COUNT}`;
      }
      if (!revealed) {
        // First paint only: reveal canvas over the poster, drop the veil.
        revealed = true;
        setReady(true);
        if (posterRef.current) posterRef.current.style.opacity = "0";
      }
    };

    const frameNow = () => frameFor(current.current);

    const loop = () => {
      raf = 0;
      if (!visible) return; // dormant off-screen
      const t = target.current;
      current.current += (t - current.current) * 0.14;
      const settled = Math.abs(t - current.current) < 0.0004;
      if (settled) current.current = t;
      const p = current.current;
      const frame = frameNow();

      if (frame !== lastDrawn) {
        const img = nearestLoaded(frame);
        if (img) {
          paint(img, frame);
        } else {
          // Late frame: fetch it, paint on arrival if still relevant.
          void loadFrame(frame).then((g) => {
            if (g && visible && frameNow() === frame) paint(g, frame);
          });
        }
      }
      const b = beatFor(p);
      if (b !== lastBeat) {
        lastBeat = b;
        setBeat(b);
      }
      const bar = Math.round(p * 1000) / 1000;
      if (bar !== lastBar && barRef.current) {
        lastBar = bar;
        barRef.current.style.transform = `scaleX(${bar})`;
      }
      // Sleep when settled — ScrollTrigger/intersection wakes us.
      if (!settled) raf = requestAnimationFrame(loop);
    };
    const ensureLoop = () => {
      if (!raf && visible) raf = requestAnimationFrame(loop);
    };

    const applyDpr = () => {
      const coarse =
        window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
      const weak =
        typeof navigator !== "undefined" &&
        typeof navigator.hardwareConcurrency === "number" &&
        navigator.hardwareConcurrency <= 4;
      dprCap = coarse || weak ? 1 : 1.5;
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(r.width * dprCap));
      canvas.height = Math.max(1, Math.round(r.height * dprCap));
      ctx.fillStyle = "#100e0c";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      lastDrawn = -1;
      ensureLoop();
    };
    let resizeT = 0;
    const onResize = () => {
      window.clearTimeout(resizeT);
      resizeT = window.setTimeout(() => {
        applyDpr();
        resize();
      }, 150);
    };

    applyDpr();
    resize();
    window.addEventListener("resize", onResize);

    // Bounded head preload (eager 12 + 48); the rest warms around scroll.
    const loader = startProgressiveLoad({
      eager: 12,
      chunk: 6,
      stride: 1,
      maxHead: 48,
      onProgress: (loaded, total) => setEagerPct(Math.round((loaded / total) * 100)),
    });

    // First frame ASAP — never a blank stage.
    void loadFrame(1).then((img) => {
      if (img && visible && frameNow() === 1) paint(img, 1);
      else if (img) paint(img, 1);
    });

    // ONE hero ScrollTrigger: progress → ref, warm lookahead, wake loop.
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        target.current = self.progress;
        // Bounded lookahead around the live position (deduped inflight).
        const f = frameFor(self.progress);
        for (let k = -1; k <= 4; k++) {
          const idx = f + k;
          if (idx >= 1 && idx <= FRAME_COUNT) void loadFrame(idx);
        }
        ensureLoop();
      },
    });

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          lastDrawn = -1;
          ensureLoop();
        }
      },
      { threshold: 0 },
    );
    io.observe(section);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeT);
      loader.stop();
      st.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  if (reduced) {
    const b = HERO_BEATS[0];
    return (
      <section aria-label="STACKED hero" className="relative flex min-h-svh items-end overflow-hidden bg-coal">
        <img
          src={frameUrl(220)}
          alt="STACKED signature burger — smashed patty, molten cheddar, sesame brioche"
          width={1280}
          height={720}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coal via-transparent to-transparent" aria-hidden />
        <div className="relative px-5 pb-16 pt-24 md:px-12">
          <p className="eyebrow-accent">{b.kicker}</p>
          <h1 className="font-display mt-3 text-[15vw] leading-[0.88] text-bone md:text-[10.5rem]">
            {b.lines.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a href="#menu" className="btn btn-secondary">Explore the menu</a>
            <a href="#story" className="btn btn-ghost">Our story</a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      aria-label="STACKED burger film — scroll to play"
      className="hero-scroll relative h-[430svh] md:h-[520svh]"
    >
      <div className="hero-viewport sticky top-0 flex min-h-svh items-end overflow-hidden bg-coal">
        {/* L1 — film canvas over instant poster. */}
        <div className="absolute inset-0">
          <img
            ref={posterRef}
            src={frameUrl(220)}
            alt=""
            aria-hidden
            width={1280}
            height={720}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full"
            role="img"
            aria-label="Cinematic frame-by-frame build of the STACKED signature burger"
          />
        </div>

        {/* L2 — static readability scrim. */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "linear-gradient(to top, rgba(16,14,12,0.72) 0%, rgba(16,14,12,0.25) 28%, transparent 55%)",
          }}
        />

        {/* L4 — metadata. */}
        <div className="absolute inset-x-0 top-16 flex items-center justify-between px-5 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/70 md:top-[76px] md:px-8 md:text-[11px]">
          <span>STACKED. — Burger Study</span>
          <span ref={frameLabelRef}>FRAME 001 / {FRAME_COUNT}</span>
        </div>

        {/* L3 — beat slot: one visible, same position, crossfade. */}
        <div className="absolute inset-x-0 bottom-0 px-5 pb-24 md:px-12 md:pb-20">
          {HERO_BEATS.map((bt, i) => {
            const active = i === beat;
            return (
              <div
                key={bt.kicker}
                data-hero-beat={i}
                aria-hidden={!active}
                className={`hero-copy-beat ${active ? "relative" : "pointer-events-none absolute inset-x-5 bottom-24 md:inset-x-12 md:bottom-20"} ${bt.center ? "md:text-center" : ""}`}
                style={{
                  opacity: active ? 1 : 0,
                  transform: active ? "translateY(0)" : "translateY(44px)",
                  visibility: active ? "visible" : "hidden",
                }}              >
                <p className="eyebrow-accent">{bt.kicker}</p>
                {i === 0 ? (
                  <h1
                    className={`font-display mt-3 leading-[0.88] text-bone ${
                      bt.lines.length > 1 ? "text-[15vw] md:text-[10.5rem]" : "text-[24vw] md:text-[15rem]"
                    }`}
                  >
                    {bt.lines.map((line, li) => (
                      <span key={line} className="block">
                        {bt.accentLast && li === bt.lines.length - 1 ? (
                          <span className="text-ember">{line}</span>
                        ) : (
                          line
                        )}
                      </span>
                    ))}
                  </h1>
                ) : (
                  <p
                    role={active ? "heading" : undefined}
                    aria-level={active ? 2 : undefined}
                    className={`font-display mt-3 leading-[0.88] text-bone ${
                      bt.lines.length > 1 ? "text-[13vw] md:text-[8rem]" : "text-[22vw] md:text-[14rem]"
                    }`}
                  >
                    {bt.lines.map((line, li) => (
                      <span key={line} className="block">
                        {bt.accentLast && li === bt.lines.length - 1 ? (
                          <span className="text-ember">{line}</span>
                        ) : (
                          line
                        )}
                      </span>
                    ))}
                  </p>
                )}
                {i === 0 && (
                  <>
                    <p className="label mt-5 max-w-md text-bone/70">
                      Smashed to order — crafted without compromise
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <a href="#menu" className="btn btn-secondary">Explore the menu</a>
                      <a href="#story" className="btn btn-ghost">Our story</a>
                    </div>
                  </>
                )}
                {i === HERO_BEATS.length - 1 && (
                  <div className={`mt-6 flex flex-wrap items-center gap-4 ${bt.center ? "md:justify-center" : ""}`}>
                    <a href="#menu" className="btn btn-secondary">Explore the menu</a>
                  </div>
                )}
              </div>
            );
          })}
          <p className="sr-only">
            A burger builds itself as you scroll: bun, crisp texture, juicy
            patty, melted cheese, stacked.
          </p>
        </div>

        {/* L5 — cue + progress. */}
        <div className="absolute inset-x-0 bottom-6 flex items-center justify-between px-5 md:px-8">
          <span
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/60 transition-opacity duration-500"
            style={{ opacity: beat === 0 && ready ? 1 : 0 }}
          >
            <ArrowDown size={13} aria-hidden />
            Scroll to explore
          </span>
          <div
            className="h-px w-40 bg-bone/20 md:w-64"
            role="progressbar"
            aria-label="Burger film progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round((beat / (HERO_BEATS.length - 1)) * 100)}
          >
            <div ref={barRef} className="h-full w-full origin-left bg-ember" style={{ transform: "scaleX(0)" }} />
          </div>
        </div>

        {/* Tiny loading veil — gone on first paint. */}
        <div
          className="absolute inset-0 z-10 flex items-center justify-center bg-coal transition-opacity duration-500"
          style={{ opacity: ready ? 0 : 1, pointerEvents: ready ? "none" : "auto" }}
          aria-hidden={ready}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-fog">
            Preheating — {eagerPct}%
          </p>
        </div>
      </div>
    </section>
  );
}
