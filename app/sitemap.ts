import type { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/content/blog";
import { getAllProducts, getProductLastModifiedMap } from "@/lib/content/products";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, posts, productLastModifiedMap] = await Promise.all([
    getAllProducts(),
    getAllPosts(),
    getProductLastModifiedMap(),
  ]);
  const latestPostDate = posts.reduce((latest, post) => {
    const timestamp = new Date(post.updatedAt || post.publishedAt).getTime();
    return Number.isNaN(timestamp) ? latest : Math.max(latest, timestamp);
  }, 0);
  const latestProductDate = Object.values(productLastModifiedMap).reduce((latest, value) => {
    const timestamp = new Date(value).getTime();
    return Number.isNaN(timestamp) ? latest : Math.max(latest, timestamp);
  }, 0);
  const latestContentDate =
    latestPostDate > 0 || latestProductDate > 0
      ? new Date(Math.max(latestPostDate, latestProductDate))
      : new Date();

  const staticRoutes = [
    { path: "", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/products", changeFrequency: "weekly" as const, priority: 0.92 },
    { path: "/blog", changeFrequency: "weekly" as const, priority: 0.82 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.68 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.72 },
    { path: "/faq", changeFrequency: "monthly" as const, priority: 0.72 },
    { path: "/ingredients", changeFrequency: "monthly" as const, priority: 0.72 },
    { path: "/compliance", changeFrequency: "monthly" as const, priority: 0.74 },
    { path: "/privacy-policy", changeFrequency: "yearly" as const, priority: 0.32 },
    { path: "/shipping-returns", changeFrequency: "monthly" as const, priority: 0.58 },
    { path: "/terms", changeFrequency: "yearly" as const, priority: 0.32 },
    { path: "/wholesale", changeFrequency: "monthly" as const, priority: 0.78 },
  ].map((route) => ({
    url: `${siteConfig.siteUrl}${route.path}`,
    lastModified: latestContentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const productRoutes = products.map((product) => ({
    url: `${siteConfig.siteUrl}${product.seo.canonicalPath}`,
    lastModified: new Date(productLastModifiedMap[product.slug] || latestContentDate),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogRoutes = posts.map((post) => ({
    url: `${siteConfig.siteUrl}${post.seo.canonicalPath}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
