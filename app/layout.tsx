import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Fraunces, Manrope } from "next/font/google";

import "@/app/globals.css";

import { AnalyticsScripts } from "@/components/analytics/analytics-scripts";
import { CartProvider } from "@/components/cart/cart-provider";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { AppShell } from "@/components/layout/app-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { MarketProvider } from "@/components/providers/market-provider";
import { getAllPosts } from "@/lib/content/blog";
import { getAllProducts } from "@/lib/content/products";
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
  const [allProducts, allPosts] = await Promise.all([getAllProducts(), getAllPosts()]);

  const searchProducts = allProducts.map((product) => ({
    slug: product.slug,
    name: product.name,
    category: product.category,
    badge: product.badge,
    shortDescription: product.shortDescription,
    benefits: product.benefits,
    pricing: product.pricing,
    images: product.images.slice(0, 1).map((image) => ({
      src: image.src,
      alt: image.alt,
    })),
  }));

  const searchPosts = allPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    tags: post.tags,
    category: post.category,
    coverImage: post.coverImage
      ? {
          src: post.coverImage.src,
          alt: post.coverImage.alt,
        }
      : undefined,
  }));

  return (
    <html lang="en-IN" data-scroll-behavior="smooth">
      <body className={`${fraunces.variable} ${manrope.variable} min-h-screen`}>
        <AnalyticsScripts />
        <JsonLd data={getOrganizationSchema()} />
        <JsonLd data={getWebsiteSchema()} />
        <MarketProvider initialMarketCode={initialMarketCode}>
          <CartProvider>
            <PageViewTracker />
            <AppShell searchProducts={searchProducts} searchPosts={searchPosts}>
              {children}
            </AppShell>
          </CartProvider>
        </MarketProvider>
      </body>
    </html>
  );
}
