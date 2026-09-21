import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS, inr } from "../data/menu";
import type { Category } from "../data/menu";
import Reveal from "./Reveal";
import QuantitySelector from "./QuantitySelector";

export default function OrderSection() {
  const [cat, setCat] = useState<Category>("burgers");
  const items = useMemo(() => PRODUCTS.filter((p) => p.category === cat), [cat]);

  return (
    <section id="order" aria-label="Order menu" className="bg-coal px-5 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow">04 — Order</p>
          <h2 className="font-display mt-3 text-5xl text-bone md:text-7xl">
            PICK YOUR STACK.
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <div
            role="tablist"
            aria-label="Menu categories"
            className="sticky top-16 z-30 mt-10 flex gap-2 overflow-x-auto border-y hairline bg-coal py-3 md:top-[72px]"
          >
            {CATEGORIES.map((c) => {
              const active = c.id === cat;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCat(c.id)}
                  className={`whitespace-nowrap rounded-[2px] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                    active
                      ? "bg-ember text-bone"
                      : "border hairline text-fog hover:border-ember hover:text-ember-soft"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <ul key={cat} className="mt-4">
          {items.map((p) => (
            <li
              key={p.id}
              className="group flex items-center justify-between gap-5 border-b hairline py-6"
            >
              <div className="flex min-w-0 flex-1 items-baseline gap-4">
                {p.tag && (
                  <span className="hidden font-mono text-[10px] tracking-[0.18em] text-ember-soft sm:inline">
                    {p.tag}
                  </span>
                )}
                <div>
                  <h3 className="font-display text-2xl tracking-wide text-bone transition-colors group-hover:text-ember md:text-3xl">
                    {p.name}
                  </h3>
                  <p className="mt-1 max-w-lg text-sm text-fog">{p.description}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <span className="font-mono text-base text-bone">{inr(p.price)}</span>
                <QuantitySelector product={p} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
