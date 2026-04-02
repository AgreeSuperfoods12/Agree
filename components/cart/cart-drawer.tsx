"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";

import { useCart } from "@/components/cart/cart-provider";
import { useMarket } from "@/components/providers/market-provider";
import { CloseIcon } from "@/components/layout/header/header-icons";
import { buttonStyles } from "@/components/ui/button";
import { trackBeginCheckout } from "@/lib/analytics";
import { toCartCheckoutLines } from "@/lib/cart";
import { formatCurrencyDisplay, getPricingDisplay } from "@/lib/pricing";
import { buildCartOrderWhatsAppUrl } from "@/lib/whatsapp";

export function CartDrawer() {
  const {
    items,
    itemCount,
    isCartOpen,
    closeCart,
    clearCart,
    removeItem,
    setItemQuantity,
  } = useCart();
  const { marketCode, market } = useMarket();

  const pricedItems = useMemo(
    () =>
      items.map((item) => {
        const pricing = getPricingDisplay(item.product.pricing, marketCode);
        const lineTotal = pricing.amount * item.quantity;

        return {
          ...item,
          pricing,
          lineTotal,
        };
      }),
    [items, marketCode],
  );

  const subtotal = pricedItems.reduce((total, item) => total + item.lineTotal, 0);
  const subtotalLabel = formatCurrencyDisplay(subtotal, market.currencyCode, market.locale);
  const checkoutUrl = buildCartOrderWhatsAppUrl(toCartCheckoutLines(items), {
    estimatedTotal: subtotalLabel,
  });

  useEffect(() => {
    if (!isCartOpen) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeCart();
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [closeCart, isCartOpen]);

  useEffect(() => {
    if (!isCartOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isCartOpen]);

  if (!isCartOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        type="button"
        aria-label="Close cart"
        className="absolute inset-0 bg-[#132018]/40 backdrop-blur-[1.5px]"
        onClick={closeCart}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-[26.5rem] flex-col border-l border-olive-950/10 bg-white shadow-[0_20px_60px_-28px_rgba(19,32,24,0.45)]">
        <div className="flex items-center justify-between border-b border-olive-950/8 px-5 py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-olive-700">
              Your cart
            </p>
            <h2 className="mt-1 text-xl text-olive-950">
              {itemCount} item{itemCount === 1 ? "" : "s"}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="grid size-9 place-items-center rounded-full text-olive-950 transition hover:bg-sand-50"
            aria-label="Close cart panel"
          >
            <CloseIcon />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <p className="text-lg font-medium text-olive-950">Your cart is empty.</p>
            <p className="mt-2 text-sm leading-6 text-olive-700">
              Add products from the catalog, then place one combined WhatsApp order.
            </p>
            <Link
              href="/products"
              onClick={closeCart}
              className={buttonStyles({ className: "mt-6" })}
            >
              Browse products
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <ul className="space-y-3">
                {pricedItems.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-[1.1rem] border border-olive-950/8 bg-sand-50/62 p-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-[0.75rem] border border-olive-950/10 bg-white">
                        {item.product.image ? (
                          <Image
                            src={item.product.image.src}
                            alt={item.product.image.alt || item.product.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-olive-950">
                          {item.product.name}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-olive-700">
                          <span className="rounded-full border border-olive-950/10 bg-white px-2 py-1 font-semibold uppercase tracking-[0.16em]">
                            {item.product.pricing.variantLabel}
                          </span>
                          <span>{item.pricing.current}</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="inline-flex items-center rounded-full border border-olive-950/12 bg-white">
                            <button
                              type="button"
                              onClick={() => setItemQuantity(item.id, item.quantity - 1)}
                              className="grid size-8 place-items-center text-sm text-olive-900 transition hover:bg-sand-50"
                              aria-label={`Reduce quantity for ${item.product.name}`}
                            >
                              -
                            </button>
                            <span className="min-w-8 text-center text-sm font-semibold text-olive-950">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => setItemQuantity(item.id, item.quantity + 1)}
                              className="grid size-8 place-items-center text-sm text-olive-900 transition hover:bg-sand-50"
                              aria-label={`Increase quantity for ${item.product.name}`}
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-xs font-medium text-olive-700 underline-offset-2 transition hover:text-olive-950 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="mt-2 text-right text-sm font-semibold text-olive-950">
                          {formatCurrencyDisplay(item.lineTotal, market.currencyCode, market.locale)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-olive-950/8 bg-white px-5 py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-olive-700">Estimated subtotal</span>
                <span className="text-lg font-semibold text-olive-950">{subtotalLabel}</span>
              </div>
              <p className="mt-1 text-xs leading-5 text-olive-700">
                Final delivery and payment details are confirmed on WhatsApp.
              </p>

              <a
                href={checkoutUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  trackBeginCheckout({
                    currency: market.currencyCode,
                    value: subtotal,
                    itemCount,
                  });
                }}
                className={buttonStyles({ size: "lg", className: "mt-4 w-full" })}
              >
                Checkout on WhatsApp
              </a>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={closeCart}
                  className={buttonStyles({ variant: "secondary", className: "w-full text-sm" })}
                >
                  Continue shopping
                </button>
                <button
                  type="button"
                  onClick={clearCart}
                  className={buttonStyles({ variant: "ghost", className: "w-full text-sm" })}
                >
                  Clear cart
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
