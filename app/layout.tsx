import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Fraunces, Manrope } from "next/font/google";

import "@/app/globals.css";

import { AnalyticsScripts } from "@/components/analytics/analytics-scripts";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { AppShell } from "@/components/layout/app-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { MarketProvider } from "@/components/providers/market-provider";
import { defaultMarketCode, isMarketCode } from "@/lib/markets";
import { buildMetadata } from "@/lib/seo/metadata";
import { getOrganizationSchema, getWebsiteSchema } from "@/lib/seo/schema";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#243A2D",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const requestedMarketCode = cookieStore.get("agree-market")?.value;
  const initialMarketCode = isMarketCode(requestedMarketCode)
    ? requestedMarketCode
    : defaultMarketCode;

  return (
    <html lang="en-IN">
      <body className={`${fraunces.variable} ${manrope.variable} min-h-screen`}>
        <AnalyticsScripts />
        <JsonLd data={getOrganizationSchema()} />
        <JsonLd data={getWebsiteSchema()} />
        <MarketProvider initialMarketCode={initialMarketCode}>
          <PageViewTracker />
          <AppShell>{children}</AppShell>
        </MarketProvider>
      </body>
    </html>
  );
}
