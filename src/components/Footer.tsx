import { AtSign } from "lucide-react";
import Reveal from "./Reveal";

/**
 * Closing frame of the brand film: giant wordmark, tagline,
 * closing line, nav / order / social columns, metadata bar.
 */
export default function Footer() {
  return (
    <footer id="contact" className="border-t hairline bg-coal px-5 pb-10 pt-20 md:px-12 md:pt-28" aria-label="Footer">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow">08 — Closing</p>
          <a
            href="#top"
            className="font-display mt-4 block text-[18vw] leading-none text-bone md:text-[10rem]"
            aria-label="Back to top — STACKED"
          >
            STACKED<span className="text-ember">.</span>
          </a>
          <p className="eyebrow mt-5">Built to be remembered.</p>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="font-display mt-12 max-w-4xl text-3xl leading-tight text-bone md:text-5xl">
            SEE YOU AT <span className="text-ember">THE STACK.</span>
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-10 border-t hairline pt-10 md:grid-cols-4">
          <nav aria-label="Footer navigation">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember-soft">
              Navigate
            </p>
            <ul className="mt-4 space-y-3 text-sm text-fog">
              {[
                { href: "#menu", label: "Menu" },
                { href: "#story", label: "About" },
                { href: "#locations", label: "Locations" },
                { href: "#contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href + l.label}>
                  <a href={l.href} className="transition-colors hover:text-bone">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Order">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember-soft">
              Order
            </p>
            <ul className="mt-4 space-y-3 text-sm text-fog">
              <li>
                <a href="#order" className="transition-colors hover:text-bone">
                  Order now
                </a>
              </li>
              <li>
                <a href="#menu" className="transition-colors hover:text-bone">
                  View menu
                </a>
              </li>
              <li>
                <a href="#combo" className="transition-colors hover:text-bone">
                  Stacked combo
                </a>
              </li>
            </ul>
          </nav>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember-soft">
              Social
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-fog">
              <AtSign size={16} aria-hidden /> Instagram — soon
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember-soft">
              Stack
            </p>
            <p className="mt-4 text-sm leading-relaxed text-fog">
              100% vegetarian.
              <br />
              Zero compromise.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t hairline pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-fog/70 md:flex-row md:items-center md:justify-between">
          <span>© 2026 Stacked.</span>
          <span>Vegetarian burgers</span>
          <span>Built to be remembered.</span>
        </div>
      </div>
    </footer>
  );
}
