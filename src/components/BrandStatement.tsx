import Reveal from "./Reveal";

/**
 * Brand manifesto — one typographic moment. Opacity + transform reveals
 * only; no blur, no cards, no decoration.
 */
export default function BrandStatement() {
  return (
    <section
      aria-label="Brand manifesto"
      className="section-lg bg-coal px-5 md:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow">01 — Manifesto</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display mt-8 text-[14vw] leading-[0.9] text-bone md:text-[8rem]">
            NOT FAST FOOD.
            <br />
            <span className="text-fog">FAST FOOD,</span>
            <br />
            <span className="text-ember">RECONSIDERED.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="mt-10 flex flex-col gap-4 border-t hairline pt-6 md:flex-row md:items-baseline md:justify-between">
            <p className="max-w-xl text-base leading-relaxed text-fog md:text-lg">
              100% vegetarian. Zero compromise. Every stack is built like it
              matters — because it does.
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember-soft">
              Est. for the crave
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
