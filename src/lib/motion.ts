import { gsap } from "./scroll";

/** Single source of truth for reduced-motion checks (JS side). */
export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export interface RevealOptions {
  y?: number;
  duration?: number;
  delay?: number;
  start?: string;
  once?: boolean;
}

/**
 * Restrained scroll reveal for one element. No-op (stays visible) under
 * reduced motion. Returns a cleanup that kills the tween + trigger.
 */
export function reveal(el: HTMLElement, opts: RevealOptions = {}) {
  const {
    y = 28,
    duration = 0.9,
    delay = 0,
    start = "top 88%",
    once = true,
  } = opts;
  if (prefersReducedMotion()) return () => {};
  const tween = gsap.fromTo(
    el,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start, once },
    },
  );
  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}

/**
 * Batch reveal: children matching `itemSelector` rise with a stagger
 * when the container enters. Container gets .is-in (pairs with the
 * .stagger-item CSS helper for the no-JS-motion fallback path).
 */
export function revealBatch(
  container: HTMLElement,
  itemSelector = ":scope > *",
  opts: { delay?: number; stagger?: number } = {},
) {
  const { delay = 0, stagger = 0.07 } = opts;
  const items = Array.from(container.querySelectorAll(itemSelector));
  if (prefersReducedMotion() || items.length === 0) return () => {};
  items.forEach((item, i) => {
    (item as HTMLElement).style.setProperty("--stagger-i", String(i));
  });
  const tween = gsap.fromTo(
    items,
    { y: 26, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay,
      stagger,
      ease: "power3.out",
      scrollTrigger: { trigger: container, start: "top 86%", once: true },
      onComplete: () => container.classList.add("is-in"),
    },
  );
  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}
