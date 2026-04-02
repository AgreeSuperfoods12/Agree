"use client";

import { useEffect, useRef, useState } from "react";

import { useCart } from "@/components/cart/cart-provider";
import { useMarketPricing } from "@/components/providers/market-provider";
import { buttonStyles } from "@/components/ui/button";
import { trackAddToCart } from "@/lib/analytics";
import type { CartProductSnapshot } from "@/types/cart";

interface AddToCartButtonProps {
  product: CartProductSnapshot;
  className?: string;
  size?: "md" | "lg";
  variant?: "primary" | "secondary";
  openCartOnAdd?: boolean;
}

export function AddToCartButton({
  product,
  className,
  size = "md",
  variant = "secondary",
  openCartOnAdd = false,
}: AddToCartButtonProps) {
  const { addItem, openCart } = useCart();
  const pricing = useMarketPricing(product.pricing);
  const [justAdded, setJustAdded] = useState(false);
  const resetAddedStateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetAddedStateTimeoutRef.current) {
        clearTimeout(resetAddedStateTimeoutRef.current);
      }
    },
    [],
  );

  function handleAddToCart() {
    addItem(product, 1);

    if (openCartOnAdd) {
      openCart();
    }

    trackAddToCart({
      slug: product.slug,
      name: product.name,
      category: product.category,
      currency: pricing.currencyCode,
      value: pricing.amount,
      quantity: 1,
    });

    setJustAdded(true);
    if (resetAddedStateTimeoutRef.current) {
      clearTimeout(resetAddedStateTimeoutRef.current);
    }

    resetAddedStateTimeoutRef.current = setTimeout(() => {
      setJustAdded(false);
    }, 1400);
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className={buttonStyles({ variant, size, className })}
      aria-label={`Add ${product.name} to cart`}
    >
      {justAdded ? "Added" : "Add to cart"}
    </button>
  );
}
