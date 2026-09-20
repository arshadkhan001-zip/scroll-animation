import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Lenis is dynamically imported — not loaded at page mount.
// This avoids a continuous rAF loop on weak hardware during Stage 2.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let lenis: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let lenisPromise: Promise<any> | null = null;

export function getLenis() {
  return lenis;
}

/**
 * Init smooth scroll. Called ONCE when the hero scroll experience
 * activates (Stage 4). Until then, the page uses native scrolling
 * — no continuous rAF loop.
 */
export async function initSmoothScroll() {
  if (lenis) return lenis;
  if (lenisPromise) return lenisPromise;
  lenisPromise = (async () => {
    const { default: Lenis } = await import("lenis");
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    // GSAP ticker time is SECONDS; Lenis wants a ms timestamp.
    // Passing raw ticker time advances ~0.016ms/frame = frozen scroll.
    const raf = (time: number) => {
      lenis?.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    if (import.meta.env.DEV) {
      (window as unknown as { __lenis: unknown }).__lenis = lenis;
    }
    return lenis;
  })();
  return lenisPromise;
}

/** Smooth-scroll to an in-page anchor. Falls back to native. */
export function scrollToTarget(selector: string) {
  const el = document.querySelector(selector);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { offset: -64 });
  } else {
    (el as HTMLElement).scrollIntoView({ behavior: "auto" });
  }
}

// useSmoothScroll REMOVED — was the single biggest Stage 2 perf issue.
// Lenis + GSAP ticker ran a continuous rAF loop from page mount, burning
// CPU on the i3-4130 even when nothing was scrolling.
// Stage 4 will call initSmoothScroll() when the hero needs it.

export { gsap, ScrollTrigger };
