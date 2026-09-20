import Reveal from "./Reveal";
import { frameUrl } from "../lib/frames";

const PRINCIPLES = [
  { n: "01", title: "Stack with intent.", body: "Every layer earns its place." },
  { n: "02", title: "Crunch matters.", body: "Texture is a flavor." },
  { n: "03", title: "Sauce is everything.", body: "Made in-house, never bottled." },
  { n: "04", title: "Vegetarian. Never boring.", body: "Built for flavor, not apology." },
];

/**
 * Brand story — editorial statement + visual + principles + closer.
 * One-shot reveals (transform/opacity); open composition, no cards.
 */
export default function BrandStory() {
  return (
    <section id="story" aria-label="Our story" className="section-lg bg-coal px-5 md:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow">06 — Story</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="font-display mt-6 max-w-5xl text-[13vw] leading-[0.9] text-bone md:text-[7rem]">
            BUILT
            <br />
            DIFFERENTLY<span className="text-ember">.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-5" delay={0.08}>
            <div className="flex h-full flex-col justify-center">
              <p className="max-w-md text-base leading-relaxed text-bone md:text-lg">
                We started with a simple idea: a great burger doesn&apos;t need
                to imitate anything.
              </p>
              <p className="mt-4 max-w-md text-base leading-relaxed text-fog">
                It needs a great stack. So we build vegetarian burgers worth
                ordering for the flavor itself — crisp, molten, and deliberate.
              </p>
            </div>
          </Reveal>
          <Reveal className="md:col-span-7" delay={0.12}>
            <div className="overflow-hidden rounded-[2px]">
              <img
                src={frameUrl(95)}
                alt="STACKED burger in studio light — sesame brioche, greens, molten cheddar"
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>

        <ol className="mt-14 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4" aria-label="Brand principles">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.n} delay={Math.min(i * 0.06, 0.18)}>
              <li className="border-t hairline py-7 pr-6">
                <span className="font-mono text-xs text-ember-soft">{p.n}</span>
                <h3 className="font-display mt-3 text-2xl uppercase tracking-wide text-bone md:text-[1.7rem]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-fog">{p.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <div className="mt-14 border-t hairline pt-10 text-center">
            <p className="font-display text-3xl leading-tight text-bone md:text-5xl">
              Come hungry.
              <br />
              <span className="text-fog">Leave thinking about the next one.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
