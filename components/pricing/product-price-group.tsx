"use client";

import { useMarketPricing } from "@/components/providers/market-provider";
import type { ProductPricing } from "@/types/product";
import { cn } from "@/lib/utils";

interface ProductPriceGroupProps {
  pricing?: Partial<ProductPricing> | null;
  className?: string;
  currentClassName?: string;
  compareAtClassName?: string;
  variantClassName?: string;
}

export function ProductPriceGroup({
  pricing,
  className,
  currentClassName,
  compareAtClassName,
  variantClassName,
}: ProductPriceGroupProps) {
  const price = useMarketPricing(pricing);

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <span className={currentClassName}>{price.current}</span>
      {price.compareAt ? <span className={compareAtClassName}>{price.compareAt}</span> : null}
      <span className={variantClassName}>{price.variantLabel}</span>
    </div>
  );
}
