import type { ProductPricing } from "@/types/product";
import {
  convertAmountToMarket,
  defaultMarketCode,
  getMarketConfig,
  type MarketCode,
} from "@/lib/markets";

const defaultPricing: ProductPricing = {
  amount: 980,
  compareAtAmount: 1160,
  currencyCode: "INR",
  variantLabel: "100g",
};

export function resolveProductPricing(
  pricing?: Partial<ProductPricing> | null,
): ProductPricing {
  const amount = pricing?.amount ?? defaultPricing.amount;
  const compareAtAmount =
    pricing?.compareAtAmount && pricing.compareAtAmount > amount
      ? pricing.compareAtAmount
      : defaultPricing.compareAtAmount && defaultPricing.compareAtAmount > amount
        ? defaultPricing.compareAtAmount
        : undefined;

  return {
    amount,
    currencyCode: pricing?.currencyCode ?? defaultPricing.currencyCode,
    variantLabel: pricing?.variantLabel ?? defaultPricing.variantLabel,
    ...(compareAtAmount ? { compareAtAmount } : {}),
  };
}

export function formatCurrencyDisplay(
  amount: number,
  currencyCode: string,
  locale = "en-IN",
) {
  const hasDecimals = Math.abs(amount % 1) > 0.001;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: hasDecimals ? 2 : 0,
  }).format(amount);
}

export function getPricingDisplay(
  pricing?: Partial<ProductPricing> | null,
  marketCode: MarketCode = defaultMarketCode,
) {
  const resolved = resolveProductPricing(pricing);
  const market = getMarketConfig(marketCode);
  const discountPercentage =
    typeof resolved.compareAtAmount === "number" && resolved.compareAtAmount > resolved.amount
      ? Math.round(((resolved.compareAtAmount - resolved.amount) / resolved.compareAtAmount) * 100)
      : null;
  const currentAmount = convertAmountToMarket(resolved.amount, resolved.currencyCode, marketCode);
  const compareAtAmount = resolved.compareAtAmount
    ? convertAmountToMarket(resolved.compareAtAmount, resolved.currencyCode, marketCode)
    : undefined;

  return {
    current: formatCurrencyDisplay(currentAmount, market.currencyCode, market.locale),
    compareAt: compareAtAmount
      ? formatCurrencyDisplay(compareAtAmount, market.currencyCode, market.locale)
      : null,
    variantLabel: resolved.variantLabel,
    currencyCode: market.currencyCode,
    amount: currentAmount,
    compareAtAmount,
    isOnSale: discountPercentage !== null,
    discountPercentage,
  };
}
