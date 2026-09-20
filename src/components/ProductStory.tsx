import { Plus } from "lucide-react";
import { PANEER_STACK_STORY } from "../data/stories";
import type { ProductStoryData } from "../data/stories";
import { PRODUCTS, inr } from "../data/menu";
import { useCart } from "../store/cart";
import Reveal from "./Reveal";

interface Props {
  story?: ProductStoryData;
}

/**
 * Signature product story — editorial product-film composition.
 * Reveals are one-shot (opacity + transform); no scroll-state loops,
 * no canvas, no frame engine. Content is fully data-driven.
 */
export default function ProductStory({ story = PANEER_STACK_STORY }: Props) {
  const { add } = useCart();
  const product = PRODUCTS.find((p) => p.id === story.productId);

  return (
    <section
      id="original"
      aria-label={`${story.titleLines.join(" ")} — product story`}
      className="section-lg bg-seam px-5 md:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow">{story.eyebrow}</p>
          <p className="label mt-4 text-bone/50">{story.whyLabel}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="font-display mt-4 text-[19vw] leading-[0.86] text-bone md:text-[10rem]">
            {story.titleLines.map((line, i) => (
              <span key={line} className="block">
                {i === story.titleLines.length - 1 ? (
                  <span className="text-ember">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-fog md:text-lg">
            {story.lede}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          {/* Product visual — open composition, no card. */}
          <Reveal className="md:col-span-7" delay={0.05}>
            <figure className="m-0">
              <div className="overflow-hidden rounded-[2px]">
                <img
                  src={story.image}
                  alt={story.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover md:aspect-[16/11]"
                />
              </div>
              <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fog/70">
                Fig. 001 — {story.titleLines.join(" ").toLowerCase()}
              </figcaption>
            </figure>
          </Reveal>

          {/* Technical annotations — sequential one-shot reveals. */}
          <ol className="md:col-span-5" aria-label="Ingredient annotations">
            {story.callouts.map((c, i) => (
              <Reveal key={c.n} delay={0.08 + i * 0.08}>
                <li className="group flex items-baseline gap-5 border-t hairline py-6 last:border-b">
                  <span className="font-mono text-xs text-ember-soft">{c.n}</span>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl uppercase tracking-wide text-bone md:text-3xl">
                      {c.title}
                    </h3>
                    <p className="mt-1 text-sm text-fog">{c.body}</p>
                  </div>
                  <span
                    aria-hidden
                    className="hidden h-px w-10 bg-ember/40 transition-all duration-300 group-hover:w-16 group-hover:bg-ember sm:block"
                  />
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Technical details + CTA. */}
        <Reveal delay={0.1}>
          <div className="mt-12 grid grid-cols-1 gap-6 border-t hairline pt-8 md:grid-cols-4 md:items-end">
            <div>
              <p className="label text-fog/70">Pattern</p>
              <p className="mt-2 font-mono text-sm uppercase tracking-[0.12em] text-bone">
                {story.pattern}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="label text-fog/70">Build</p>
              <p className="mt-2 font-mono text-sm uppercase tracking-[0.12em] text-bone">
                {story.build.join(" / ")}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-5 md:justify-end">
              <span className="font-display text-4xl text-bone">
                {product ? inr(product.price) : story.priceNote}
              </span>
              <button
                type="button"
                className="btn-ink"
                onClick={() => product && add(product)}
                aria-label={`Add ${story.titleLines.join(" ")} to order`}
              >
                <Plus size={15} aria-hidden /> Add to order
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
