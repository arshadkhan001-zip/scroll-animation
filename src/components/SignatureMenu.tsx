import { Plus } from "lucide-react";
import { PRODUCTS, inr } from "../data/menu";
import type { Category } from "../data/menu";
import { useCart } from "../store/cart";
import Reveal from "./Reveal";

interface Props {
  category?: Category;
  eyebrow?: string;
  heading?: [string, string];
  lede?: string;
}

/**
 * Editorial menu — alternating rows, dividers, rhythm from type and
 * spacing, not cards. Category-driven so SIDES/DRINKS/DESSERTS reuse
 * this component without a rebuild.
 */
export default function SignatureMenu({
  category = "burgers",
  eyebrow = "The stack",
  heading = ["BUILT FOR", "THE CRAVE."],
  lede = "Premium vegetarian burgers, stacked with serious flavor.",
}: Props) {
  const { add } = useCart();
  const items = PRODUCTS.filter((p) => p.category === category);

  return (
    <section id="menu" aria-label="Signature menu" className="bg-coal px-5 pb-28 md:px-12 md:pb-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="border-t hairline pt-6">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="font-display mt-3 text-5xl leading-[0.92] text-bone md:text-7xl">
              {heading[0]}
              <br />
              {heading[1]}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-fog">
              {lede}
            </p>
          </div>
        </Reveal>

        <ol className="mt-14">
          {items.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal key={p.id} delay={Math.min(i * 0.04, 0.16)}>
                <li className="group grid grid-cols-1 gap-6 border-t hairline py-10 last:border-b md:grid-cols-12 md:items-center md:gap-10">
                  <div className={`md:col-span-1 ${flip ? "md:order-4" : ""}`}>
                    <span className="font-mono text-xs text-ember-soft">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className={`md:col-span-5 ${flip ? "md:order-3 md:text-right" : ""}`}>
                    <div
                      className={`flex flex-wrap items-center gap-3 ${
                        flip ? "md:justify-end" : ""
                      }`}
                    >
                      <h3 className="font-display text-4xl text-bone transition-colors group-hover:text-ember md:text-5xl">
                        {p.name}
                      </h3>
                      {p.tag && (
                        <span className="rounded-full border border-ember/60 px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] text-ember-soft">
                          {p.tag}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-fog md:text-base">
                      {p.description}
                    </p>
                    <p
                      className={`mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fog/80 ${
                        flip ? "md:ml-auto md:max-w-md" : "max-w-md"
                      }`}
                    >
                      {p.ingredients.join(" · ")}
                    </p>
                    <div
                      className={`mt-5 flex items-center gap-5 ${
                        flip ? "md:justify-end" : ""
                      }`}
                    >
                      <span className="font-mono text-xl text-bone">{inr(p.price)}</span>
                      <button
                        type="button"
                        onClick={() => add(p)}
                        className="btn-ink !px-5 !py-3"
                        aria-label={`Add ${p.name} to cart`}
                      >
                        <Plus size={15} aria-hidden /> Add
                      </button>
                    </div>
                  </div>
                  <div
                    className={`overflow-hidden rounded-[2px] md:col-span-6 ${
                      flip ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={`${p.name} — STACKED vegetarian burger still`}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div
                        className="flex aspect-[16/10] w-full items-center justify-center border hairline"
                        aria-hidden
                      >
                        <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-fog/60">
                          Photography soon
                        </span>
                      </div>
                    )}
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
