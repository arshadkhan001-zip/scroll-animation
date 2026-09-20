import { useEffect } from "react";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "../store/cart";
import { inr } from "../data/menu";

export default function CartDrawer() {
  const { lines, subtotal, isOpen, closeCart, setQty, remove, count } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Cart">
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeCart}
        className="absolute inset-0 cursor-default bg-black/60"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-seam p-6">
        <div className="flex items-center justify-between border-b hairline pb-5">
          <h2 className="font-display text-3xl text-bone">
            CART <span className="text-ember">({count})</span>
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="inline-flex items-center justify-center rounded-[2px] border hairline p-2.5 text-bone"
            aria-label="Close cart"
          >
            <X size={17} aria-hidden />
          </button>
        </div>
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <p className="font-display text-2xl text-fog">YOUR STACK IS EMPTY.</p>
            <button type="button" className="btn-ink" onClick={closeCart}>
              Explore menu
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-mist/10 overflow-y-auto" data-lenis-prevent>
              {lines.map((l) => (
                <li key={l.product.id} className="flex items-center justify-between gap-4 py-5">
                  <div>
                    <p className="font-display text-xl text-bone">{l.product.name}</p>
                    <p className="mt-1 font-mono text-xs text-fog">
                      {inr(l.product.price)} each
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQty(l.product.id, l.qty - 1)}
                      className="rounded-[2px] border hairline p-2 text-bone"
                      aria-label={`Decrease ${l.product.name} quantity`}
                    >
                      <Minus size={14} aria-hidden />
                    </button>
                    <span className="w-6 text-center font-mono text-sm" aria-live="polite">
                      {l.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty(l.product.id, l.qty + 1)}
                      className="rounded-[2px] border hairline p-2 text-bone"
                      aria-label={`Increase ${l.product.name} quantity`}
                    >
                      <Plus size={14} aria-hidden />
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(l.product.id)}
                      className="ml-1 font-mono text-[11px] uppercase tracking-[0.15em] text-fog hover:text-ember-soft"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t hairline pt-5 font-mono text-sm">
              <div className="flex justify-between text-base text-bone">
                <span>Subtotal</span>
                <span>{inr(subtotal)}</span>
              </div>
              <p className="mt-2 text-[11px] text-fog/80">
                Tax & delivery calculated at checkout.
              </p>
              <button
                type="button"
                disabled
                className="btn-ink mt-5 w-full justify-center"
                aria-label="Continue to checkout (coming soon)"
              >
                Continue — soon
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
