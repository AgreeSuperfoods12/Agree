import type { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/content/blog";
import { getAllProducts } from "@/lib/content/products";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/products",
    "/blog",
    "/contact",
    "/faq",
    "/ingredients",
    "/compliance",
    "/privacy-policy",
    "/shipping-returns",
    "/terms",
    "/wholesale",
  ].map((path) => ({
    url: `${siteConfig.siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const [products, posts] = await Promise.all([getAllProducts(), getAllPosts()]);

  const productRoutes = products.map((product) => ({
    url: `${siteConfig.siteUrl}${product.seo.canonicalPath}`,
    lastModified: new Date(),
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
