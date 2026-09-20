import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const SPOTS = [
  { n: "01", city: "Panipat", status: "Coming soon" },
  { n: "02", city: "Delhi", status: "Coming soon" },
  { n: "03", city: "Chandigarh", status: "Coming soon" },
];

/**
 * Locations — placeholder editorial list. Rows are NOT links: no
 * addresses exist yet, so nothing pretends to navigate anywhere.
 */
export default function Locations() {
  return (
    <section
      id="locations"
      aria-label="Locations"
      className="bg-coal px-5 pb-28 md:px-12 md:pb-40"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="border-t hairline pt-6">
            <p className="eyebrow">07 — Locations</p>
            <h2 className="font-display mt-3 text-5xl text-bone md:text-7xl">
              FIND YOUR STACK.
            </h2>
          </div>
        </Reveal>
        <ol className="mt-10" aria-label="Upcoming locations">
          {SPOTS.map((s, i) => (
            <Reveal key={s.city} delay={i * 0.05}>
              <li className="group flex items-center gap-6 border-t hairline py-7 last:border-b md:py-9">
                <span className="font-mono text-xs text-ember-soft">{s.n}</span>
                <h3 className="font-display flex-1 text-4xl uppercase text-bone transition-all duration-300 group-hover:translate-x-2 group-hover:text-ember md:text-6xl">
                  {s.city}
                </h3>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
                  {s.status}
                </span>
                <ArrowRight
                  size={20}
                  aria-hidden
                  className="text-fog transition-all duration-300 group-hover:translate-x-1 group-hover:text-ember"
                />
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={0.1}>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-fog/60">
            More stacks firing up soon.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
