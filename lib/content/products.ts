import "server-only";

import { cache } from "react";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

import { z } from "zod";

import { resolveProductPricing } from "@/lib/pricing";
import type { Product } from "@/types/product";
import { sanityFetch } from "@/sanity/lib/client";
import { allProductsQuery } from "@/sanity/lib/queries";

const productsDirectory = path.join(process.cwd(), "content", "products");

const productSchema = z.object({
  updatedAt: z.string().optional(),
  slug: z.string(),
  name: z.string(),
  category: z.string(),
  badge: z.string(),
  shortDescription: z.string(),
  description: z.string(),
  fullDescription: z.array(z.string()),
  benefits: z.array(z.string()),
  ingredients: z.array(z.string()),
  usageIdeas: z.array(z.string()),
  bestFor: z.array(z.string()),
  pricing: z
    .object({
      amount: z.number(),
      compareAtAmount: z.number().optional(),
      currencyCode: z.string(),
      variantLabel: z.string(),
    })
    .optional(),
  productDetails: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
  images: z.array(
    z.object({
      src: z.string(),
      alt: z.string(),
      width: z.number().optional(),
      height: z.number().optional(),
    }),
  ),
  highlights: z.array(
    z.object({
      title: z.string(),
      value: z.string(),
      description: z.string(),
    }),
  ),
  faqs: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    }),
  ),
  relatedProducts: z.array(z.string()),
  relatedPosts: z.array(z.string()),
  featured: z.boolean(),
  catalogPriority: z.number(),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    canonicalPath: z.string(),
    ogImage: z.string(),
    keywords: z.array(z.string()).optional(),
    noIndex: z.boolean().optional(),
  }),
});

type ProductSource = z.infer<typeof productSchema>;

function normalizeProduct(product: ProductSource): Product {
  return {
    ...product,
    pricing: resolveProductPricing(product.pricing),
  };
}

function parseProductFile(fileName: string): Product {
  const filePath = path.join(productsDirectory, fileName);
  const source = readFileSync(filePath, "utf8");

  return normalizeProduct(productSchema.parse(JSON.parse(source)));
}

const getLocalProductFileNames = cache(() =>
  readdirSync(productsDirectory).filter((fileName) => fileName.endsWith(".json")),
);

export const getProductLastModifiedMap = cache(async () => {
  const sanityProducts = await getSanityProductSources();

  if (sanityProducts) {
    return Object.fromEntries(
      sanityProducts.map((product) => [
        product.slug,
        new Date(product.updatedAt || Date.now()).toISOString(),
      ]),
    );
  }

  return Object.fromEntries(
    getLocalProductFileNames().map((fileName) => {
      const slug = fileName.replace(/\.json$/, "");
      const filePath = path.join(productsDirectory, fileName);

      return [slug, statSync(filePath).mtime.toISOString()];
    }),
  );
});

function sortProducts(products: Product[]) {
  return products.sort((left, right) => {
    if (left.featured !== right.featured) {
      return Number(right.featured) - Number(left.featured);
    }

    if (left.catalogPriority !== right.catalogPriority) {
      return left.catalogPriority - right.catalogPriority;
    }

    return left.name.localeCompare(right.name);
  });
}

async function getSanityProductSources() {
  const products = await sanityFetch<ProductSource[]>({
    query: allProductsQuery,
    tags: ["sanity:products"],
  });

  return products ? products.map((product) => productSchema.parse(product)) : null;
}

async function getSanityProducts() {
  const productSources = await getSanityProductSources();

  return productSources ? sortProducts(productSources.map(normalizeProduct)) : null;
}

export const getAllProducts = cache(async () => {
  const sanityProducts = await getSanityProducts();

  if (sanityProducts) {
    return sanityProducts;
  }

  const productFiles = getLocalProductFileNames();

  return sortProducts(productFiles.map(parseProductFile));
});

export const getAllProductSlugs = cache(async () =>
  (await getAllProducts()).map((product) => product.slug),
);

export const getFeaturedProducts = cache(async (limit = 4) =>
  (await getAllProducts())
    .filter((product) => product.featured)
    .slice(0, limit),
);

export const getProductBySlug = cache(async (slug: string) =>
  (await getAllProducts()).find((product) => product.slug === slug),
);

export const getRelatedProducts = cache(async (slug: string, limit = 3) => {
  const product = await getProductBySlug(slug);

  if (!product) {
    return [];
  }

  const allProducts = await getAllProducts();

  return product.relatedProducts
    .map((relatedSlug) => allProducts.find((item) => item.slug === relatedSlug))
    .filter((item): item is Product => Boolean(item))
    .slice(0, limit);
});

export const getProductCategories = cache(async () =>
  Array.from(new Set((await getAllProducts()).map((product) => product.category))).sort(),
);
