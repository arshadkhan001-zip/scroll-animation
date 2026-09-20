import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "../data/menu";
import { useCart } from "../store/cart";
import Reveal from "./Reveal";

/**
 * Combo campaign — editorial advertisement, not a promo card.
 * Hover: image scale + CTA shift + accent transition (transform/opacity only).
 */
export default function Combo() {
  const { add } = useCart();
  const combo = PRODUCTS.find((p) => p.id === "stacked-combo");

  return (
    <section id="combo" aria-label="Stacked combo" className="bg-ember px-5 py-24 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-coal/70">
              05 — Limited ritual
            </p>
            <h2 className="font-display mt-4 text-[16vw] leading-[0.88] text-coal md:text-[7rem]">
              THE
              <br />
              STACKED
              <br />
              COMBO
            </h2>
            <p className="font-display mt-6 text-2xl uppercase tracking-wide text-coal md:text-3xl">
              Burger + Fries + Drink
            </p>
            <p className="mt-3 max-w-md text-sm font-medium leading-relaxed text-coal/75 md:text-base">
              Pick your stack. Complete the meal.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="group">
            {combo?.image && (
              <div className="overflow-hidden rounded-[2px]">
                <img
                  src={combo.image}
                  alt="THE STACKED COMBO — signature burger with fries and drink"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              </div>
            )}
            <div className="mt-8 flex flex-wrap items-center gap-6 border-t-2 border-coal/80 pt-8">
              <span className="font-display text-6xl text-coal md:text-7xl">₹349</span>
              <button
                type="button"
                onClick={() => combo && add(combo)}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-[2px] bg-coal px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-bone transition-all duration-200 hover:gap-3 hover:bg-ink active:scale-95"
                aria-label="Add THE STACKED COMBO to order"
              >
                Add combo <ArrowRight size={15} aria-hidden />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
