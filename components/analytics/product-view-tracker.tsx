"use client";

import { useEffect, useRef } from "react";

import { useMarket } from "@/components/providers/market-provider";
import { trackProductView } from "@/lib/analytics";
import { getPricingDisplay } from "@/lib/pricing";
import type { ProductPricing } from "@/types/product";

interface ProductViewTrackerProps {
  slug: string;
  name: string;
  category: string;
  pricing: ProductPricing;
}

export function ProductViewTracker({
  slug,
  name,
  category,
  pricing,
}: ProductViewTrackerProps) {
  const { marketCode } = useMarket();
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) {
      return;
    }

    const price = getPricingDisplay(pricing, marketCode);

    trackProductView({
      slug,
      name,
      category,
      currency: price.currencyCode,
      value: price.amount,
    });

    hasTracked.current = true;
  }, [category, marketCode, name, pricing, slug]);

  return null;
}
