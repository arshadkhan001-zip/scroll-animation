import { useEffect, useRef, useState } from "react";
import { PRODUCTS, inr } from "../data/menu";
import { useCart } from "../store/cart";

interface Props {
  open: boolean;
  onClose: () => void;
}

/**
 * Minimal search overlay. Filters the existing product data only —
 * no new data layer, no results preloading. Stage 4+ can extend it.
 */
export default function SearchOverlay({ open, onClose }: Props) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { add } = useCart();

  useEffect(() => {
    if (!open) return;
    setQ("");
    const t = window.setTimeout(() => inputRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const needle = q.trim().toLowerCase();
  const results =
    needle.length === 0
      ? []
      : PRODUCTS.filter(
          (p) =>
            p.name.toLowerCase().includes(needle) ||
            p.ingredients.some((i) => i.toLowerCase().includes(needle)),
        ).slice(0, 6);

  return (
    <div
      className="fixed inset-0 z-[70] bg-coal"
      role="dialog"
      aria-modal="true"
      aria-label="Search menu"
    >
      <div className="wrap-editorial flex h-full flex-col pt-5">
        <div className="flex items-center justify-between">
          <span className="label text-fog">Search the menu</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-[2px] border hairline px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-bone"
            aria-label="Close search"
          >
            Close
          </button>
        </div>
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try ‘cheddar’ or ‘fries’…"
          aria-label="Search menu items"
          className="mt-8 w-full border-b hairline bg-transparent pb-4 font-display text-4xl uppercase text-bone placeholder:text-fog/40 focus:outline-none md:text-6xl"
        />
        <ul className="mt-8 divide-y divide-mist/10 overflow-y-auto" data-lenis-prevent>
          {results.map((p) => (
            <li key={p.id} className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="font-display text-xl tracking-wide text-bone">{p.name}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-fog">
                  {p.category} · {inr(p.price)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => add(p)}
                className="btn btn-secondary btn-sm"
                aria-label={`Add ${p.name} to cart`}
              >
                Add
              </button>
            </li>
          ))}
        </ul>
        {needle.length > 0 && results.length === 0 && (
          <p className="mt-8 text-sm text-fog">Nothing stacked by that name.</p>
        )}
      </div>
    </div>
  );
}
