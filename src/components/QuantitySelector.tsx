import { Minus, Plus } from "lucide-react";
import type { Product } from "../data/menu";
import { useCart } from "../store/cart";

interface Props {
  product: Product;
}

/**
 * Reusable ADD interaction: idle "ADD +" transitions to a
 * "− qty +" stepper once the product is in the cart.
 * Quantity state lives in the cart store — no local state.
 */
export default function QuantitySelector({ product }: Props) {
  const { lines, add, setQty } = useCart();
  const qty = lines.find((l) => l.product.id === product.id)?.qty ?? 0;

  if (qty === 0) {
    return (
      <button
        type="button"
        onClick={() => add(product)}
        className="inline-flex min-h-[44px] items-center gap-1.5 rounded-[2px] border hairline px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-bone transition-colors hover:border-ember hover:text-ember-soft"
        aria-label={`Add ${product.name} to cart`}
      >
        Add <Plus size={14} aria-hidden />
      </button>
    );
  }

  return (
    <div
      className="inline-flex min-h-[44px] items-center gap-1 rounded-[2px] border border-ember/60 px-1 py-1"
      role="group"
      aria-label={`${product.name} quantity: ${qty}`}
    >
      <button
        type="button"
        onClick={() => setQty(product.id, qty - 1)}
        className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center rounded-[2px] text-bone transition-colors hover:text-ember-soft"
        aria-label={`Decrease ${product.name} quantity`}
      >
        <Minus size={14} aria-hidden />
      </button>
      <span className="w-6 text-center font-mono text-sm text-bone" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        onClick={() => setQty(product.id, qty + 1)}
        className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center rounded-[2px] text-bone transition-colors hover:text-ember-soft"
        aria-label={`Increase ${product.name} quantity`}
      >
        <Plus size={14} aria-hidden />
      </button>
    </div>
  );
}
