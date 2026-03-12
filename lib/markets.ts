export const MARKET_STORAGE_KEY = "agree-market";
export const MARKET_COOKIE_NAME = "agree-market";

export const supportedMarkets = [
  {
    code: "IN",
    country: "India",
    currencyCode: "INR",
    locale: "en-IN",
    flag: "🇮🇳",
  },
  {
    code: "US",
    country: "United States",
    currencyCode: "USD",
    locale: "en-US",
    flag: "🇺🇸",
  },
  {
    code: "CA",
    country: "Canada",
    currencyCode: "CAD",
    locale: "en-CA",
    flag: "🇨🇦",
  },
  {
    code: "AE",
    country: "United Arab Emirates",
    currencyCode: "AED",
    locale: "en-AE",
    flag: "🇦🇪",
  },
] as const;

export type MarketCode = (typeof supportedMarkets)[number]["code"];
export type MarketConfig = (typeof supportedMarkets)[number];

export const defaultMarketCode: MarketCode = "IN";

const marketLookup = new Map<MarketCode, MarketConfig>(
  supportedMarkets.map((market) => [market.code, market]),
);

const currencyToInrRate: Record<string, number> = {
  INR: 1,
  USD: 86.1,
  CAD: 61.2,
  AED: 23.45,
};

export function isMarketCode(value: string | null | undefined): value is MarketCode {
  return Boolean(value && marketLookup.has(value as MarketCode));
}

export function getMarketConfig(code: MarketCode = defaultMarketCode) {
  return marketLookup.get(code) ?? marketLookup.get(defaultMarketCode)!;
}

function roundConvertedAmount(amount: number, currencyCode: string) {
  if (currencyCode === "INR") {
    return Math.round(amount / 10) * 10;
  }

  return Math.round(amount * 100) / 100;
}

export function convertAmountToMarket(
  amount: number,
  fromCurrencyCode: string,
  marketCode: MarketCode = defaultMarketCode,
) {
  const market = getMarketConfig(marketCode);
  const sourceRate = currencyToInrRate[fromCurrencyCode] ?? currencyToInrRate.INR;
  const targetRate = currencyToInrRate[market.currencyCode] ?? currencyToInrRate.INR;
  const amountInInr = amount * sourceRate;

  return roundConvertedAmount(amountInInr / targetRate, market.currencyCode);
}
