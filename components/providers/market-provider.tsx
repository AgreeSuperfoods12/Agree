"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  MARKET_COOKIE_NAME,
  MARKET_STORAGE_KEY,
  defaultMarketCode,
  getMarketConfig,
  isMarketCode,
  supportedMarkets,
  type MarketCode,
} from "@/lib/markets";
import { getPricingDisplay } from "@/lib/pricing";
import type { ProductPricing } from "@/types/product";

interface MarketContextValue {
  marketCode: MarketCode;
  market: ReturnType<typeof getMarketConfig>;
  markets: typeof supportedMarkets;
  setMarketCode: (code: MarketCode) => void;
}

const MarketContext = createContext<MarketContextValue | null>(null);

function persistMarketCode(marketCode: MarketCode) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(MARKET_STORAGE_KEY, marketCode);
  } catch {
    // Ignore storage access failures.
  }

  document.cookie = `${MARKET_COOKIE_NAME}=${marketCode}; path=/; max-age=31536000; samesite=lax`;
}

function getMarketCodeFromCookie() {
  if (typeof document === "undefined") {
    return null;
  }

  const cookieMatch = document.cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${MARKET_COOKIE_NAME}=`));

  if (!cookieMatch) {
    return null;
  }

  return decodeURIComponent(cookieMatch.split("=")[1] ?? "");
}

function resolveInitialMarketCode(initialMarketCode: MarketCode) {
  if (typeof window === "undefined") {
    return initialMarketCode;
  }

  let storedMarketCode: string | null = null;

  try {
    storedMarketCode = window.localStorage.getItem(MARKET_STORAGE_KEY);
  } catch {
    // Ignore storage access failures.
  }

  const resolvedMarketCode = storedMarketCode || getMarketCodeFromCookie();

  return isMarketCode(resolvedMarketCode) ? resolvedMarketCode : initialMarketCode;
}

export function MarketProvider({
  children,
  initialMarketCode = defaultMarketCode,
}: {
  children: ReactNode;
  initialMarketCode?: MarketCode;
}) {
  const [marketCode, setMarketCodeState] = useState<MarketCode>(() =>
    resolveInitialMarketCode(initialMarketCode),
  );

  useEffect(() => {
    persistMarketCode(marketCode);
  }, [marketCode]);

  const value = useMemo(
    () => ({
      marketCode,
      market: getMarketConfig(marketCode),
      markets: supportedMarkets,
      setMarketCode: setMarketCodeState,
    }),
    [marketCode],
  );

  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>;
}

export function useMarket() {
  const context = useContext(MarketContext);

  if (!context) {
    throw new Error("useMarket must be used within a MarketProvider.");
  }

  return context;
}

export function useMarketPricing(pricing?: Partial<ProductPricing> | null) {
  const { marketCode } = useMarket();

  return useMemo(() => getPricingDisplay(pricing, marketCode), [marketCode, pricing]);
}
