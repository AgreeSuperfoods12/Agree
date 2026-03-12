import type { Metadata } from "next";

import { getFeaturedProducts } from "@/lib/content/products";
import { buildMetadata } from "@/lib/seo/metadata";
import { getSiteContent } from "@/lib/content/site";
import { getBreadcrumbSchema } from "@/lib/seo/schema";
import { ProductCard } from "@/components/products/product-card";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/shared/page-hero";

export const metadata: Metadata = buildMetadata({
  title: "Ingredients & Wellness Education",
  description:
    "Explore Agree Superfoods ingredient guides across seeds, teas, snacks, and everyday pantry habits.",
  path: "/ingredients",
});

export default async function IngredientsPage() {
  const [siteContent, featuredProducts] = await Promise.all([
    getSiteContent(),
    getFeaturedProducts(4),
  ]);

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Ingredients & Wellness Education", href: "/ingredients" },
        ])}
      />
      <PageHero
        eyebrow="Wellness education"
        title="Ingredient-first guidance for everyday pantry habits."
        description="Explore the food stories behind the range, from simple seed use to tea rituals, snacking, and kitchen essentials."
      />
      <section className="section-shell pt-0">
        <Container className="grid gap-5 md:grid-cols-2">
          {siteContent.wellnessFeatures.map((item) => (
            <article key={item.name} className="card-surface p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-olive-700">
                {item.benefit}
              </p>
              <h2 className="mt-3 text-3xl">{item.name}</h2>
              <p className="mt-4 leading-7 text-olive-800">{item.blurb}</p>
            </article>
          ))}
        </Container>
      </section>
      <section className="section-shell pt-0">
        <Container>
          <div className="mb-10">
            <h2 className="text-3xl">Explore products linked to these ingredient stories</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
