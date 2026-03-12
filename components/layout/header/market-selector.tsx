"use client";

import { ChevronDownIcon } from "@/components/layout/header/header-icons";
import { useMarket } from "@/components/providers/market-provider";
import { cn } from "@/lib/utils";

interface MarketSelectorProps {
  mobile?: boolean;
  className?: string;
}

export function MarketSelector({ mobile = false, className }: MarketSelectorProps) {
  const { market, marketCode, markets, setMarketCode } = useMarket();

  return (
    <label className={cn("block", className)}>
      {mobile ? (
        <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-olive-700">
          Country / Currency
        </span>
      ) : null}
      <div className="relative">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base"
        >
          {market.flag}
        </span>
        <select
          aria-label="Select country and currency"
          value={marketCode}
          onChange={(event) => setMarketCode(event.target.value as typeof marketCode)}
          className={cn(
            "min-h-10 appearance-none rounded-full border border-olive-950/10 bg-white pr-9 text-sm text-olive-950 shadow-[0_12px_28px_-24px_rgba(19,32,24,0.28)]",
            mobile ? "w-full pl-11 pr-10" : "min-w-[12.5rem] pl-10",
          )}
        >
          {markets.map((option) => (
            <option key={option.code} value={option.code}>
              {option.country} ({option.currencyCode})
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-olive-700" />
      </div>
    </label>
  );
}
