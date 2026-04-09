import type { Metadata } from "next";

import { getFeaturedPosts } from "@/lib/content/blog";
import { getHomePageContent } from "@/lib/content/home";
import { getAllProducts } from "@/lib/content/products";
import { getBreadcrumbSchema } from "@/lib/seo/schema";
import { BlogPreviewSection } from "@/components/home/blog-preview-section";
import { CollectionBrowseSection } from "@/components/home/collection-browse-section";
import { ComplianceStrip } from "@/components/home/compliance-strip";
import { FeaturedProductsSection } from "@/components/home/featured-products-section";
import { FooterCtaSection } from "@/components/home/footer-cta-section";
import { HeroProductStrip } from "@/components/home/hero-product-strip";
import { HeroSection } from "@/components/home/hero-section";
import { ProductSpotlightSection } from "@/components/home/product-spotlight-section";
import { TrustIconsRow } from "@/components/home/trust-icons-row";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Healthy Morning Drinks for Energy, Digestion & Weight Loss",
  description:
    "Discover healthy morning drinks for energy, digestion, hydration, and weight loss. Learn how chia, amla, coconut, ginger, and lemon support a fresh start.",
};

function pickProducts(slugs: string[], allProducts: Awaited<ReturnType<typeof getAllProducts>>) {
  const productsBySlug = new Map(allProducts.map((product) => [product.slug, product]));

  return slugs
    .map((slug) => productsBySlug.get(slug))
    .filter((product): product is (typeof allProducts)[number] => Boolean(product));
}

export default async function HomePage() {
  const [homeContent, allProducts, featuredPosts] = await Promise.all([
    getHomePageContent(),
    getAllProducts(),
    getFeaturedPosts(3),
  ]);

  const heroProducts = pickProducts(homeContent.heroProductSlugs, allProducts);
  const fallbackHeroProducts = allProducts.filter(
    (product) => !homeContent.heroProductSlugs.includes(product.slug),
  );
  const featuredShowcaseSlugs = Array.from(
    new Set([...homeContent.featuredGridSlugs, ...homeContent.topPicksSlugs]),
  );
  const featuredGridProducts = pickProducts(featuredShowcaseSlugs, allProducts);
  const spotlightProduct = allProducts.find(
    (product) => product.slug === homeContent.productSpotlight.productSlug,
  );

  return (
    <>
      <JsonLd data={getBreadcrumbSchema([{ name: "Home", href: "/" }])} />

      <HeroSection />
      <HeroProductStrip
        eyebrow="Featured collection"
        title="Popular pantry picks for everyday routines"
        products={[...heroProducts, ...fallbackHeroProducts]}
      />
      <CollectionBrowseSection
        eyebrow="Browse collections"
        title="Browse by category."
        description="Explore seeds, teas, pantry staples, snack-ready picks, and wholesale-friendly assortments."
        items={homeContent.collectionTiles.slice(0, 4)}
      />
      <FeaturedProductsSection products={featuredGridProducts} />
      <TrustIconsRow
        eyebrow="Why choose Agree"
        title="Why customers and trade buyers choose Agree."
        description="Premium ingredients, dependable service, and product ranges that fit households, gifting, and wholesale demand."
        items={homeContent.benefitsRow}
      />
      <ComplianceStrip />
      {spotlightProduct ? (
        <ProductSpotlightSection content={homeContent.productSpotlight} product={spotlightProduct} />
      ) : null}
      <BlogPreviewSection posts={featuredPosts} />
      <FooterCtaSection content={homeContent.footerCta} />
    </>
  );
}
