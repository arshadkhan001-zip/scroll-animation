import { useEffect, useRef, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "../store/cart";
import SearchOverlay from "./SearchOverlay";

const CENTER_LINKS = [
  { href: "#menu", label: "Menu", section: "menu" },
  { href: "#story", label: "About", section: "story" },
  { href: "#locations", label: "Locations", section: "locations" },
];

const MOBILE_LINKS = [
  { href: "#menu", label: "Menu" },
  { href: "#story", label: "About" },
  { href: "#locations", label: "Locations" },
  { href: "#order", label: "Order" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { count, openCart } = useCart();
  const ticking = useRef(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      // Throttled: at most one React update per frame, no per-pixel renders.
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 48);
          ticking.current = false;
        });
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section in view. Observer fires on
  // visibility change only — no scroll handler, no rAF.
  useEffect(() => {
    const ids = ["menu", "story", "locations"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Mobile menu: Esc, scroll lock, focus the close button on open.
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => closeRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 ${
          scrolled
            ? "border-b hairline bg-coal/90"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 md:h-[72px] md:px-8"
        >
          <a
            href="#top"
            className="font-display justify-self-start text-2xl tracking-wide text-bone"
            aria-label="STACKED home"
          >
            STACKED<span className="text-ember">.</span>
          </a>
          <ul className="hidden items-center gap-10 md:flex">
            {CENTER_LINKS.map((l) => {
              const isActive = active === l.section;
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`font-mono text-[11px] uppercase tracking-[0.24em] transition-colors hover:text-bone ${
                      isActive ? "text-ember-soft" : "text-fog"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-2 justify-self-end">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex min-h-[44px] items-center gap-2 px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.24em] text-fog transition-colors hover:text-bone"
              aria-label="Search menu"
            >
              <Search size={15} aria-hidden />
              <span className="hidden lg:inline">Search</span>
            </button>
            <button
              type="button"
              onClick={openCart}
              className="relative inline-flex items-center gap-2 rounded-[2px] border hairline px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:border-ember hover:text-ember-soft"
              aria-label={`Open cart, ${count} items`}
            >
              <ShoppingBag size={15} aria-hidden />
              <span className="hidden sm:inline">Cart</span>
              <span
                aria-live="polite"
                className="inline-flex min-w-5 justify-center rounded-full bg-ember px-1 text-[11px] font-semibold text-bone"
              >
                {count}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center rounded-[2px] border hairline p-2.5 text-bone md:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu size={18} aria-hidden />
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex flex-col bg-coal px-6 pb-10 pt-5"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl text-bone">
              STACKED<span className="text-ember">.</span>
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-[2px] border hairline p-2.5 text-bone"
              aria-label="Close menu"
            >
              <X size={18} aria-hidden />
            </button>
          </div>
          <ul className="mt-12 flex flex-col gap-2">
            {MOBILE_LINKS.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-4 border-b hairline py-4"
                >
                  <span className="font-mono text-[11px] text-ember-soft">
                    0{i + 1}
                  </span>
                  <span className="font-display text-5xl uppercase text-bone transition-colors group-hover:text-ember">
                    {l.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="eyebrow mt-auto">Built to be remembered.</p>
        </div>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
