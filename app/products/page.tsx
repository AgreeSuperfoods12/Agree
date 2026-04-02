import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getHomePageContent } from "@/lib/content/home";
import { getAllProducts, getProductCategories } from "@/lib/content/products";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema, getProductListSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site-config";
import { ProductCard } from "@/components/products/product-card";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductsPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

type ProductSort = "featured" | "name-asc" | "category";

function resolveSelectedSort(sortValue: string | undefined): ProductSort {
  if (sortValue === "name-asc" || sortValue === "category") {
    return sortValue;
  }

  return "featured";
}

function normalizeText(value: string) {
  return value.toLowerCase().trim();
}

function tokenizeQuery(value: string) {
  return value
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

function scoreProductMatch(
  product: Awaited<ReturnType<typeof getAllProducts>>[number],
  normalizedQuery: string,
) {
  const tokens = tokenizeQuery(normalizedQuery);
  if (!tokens.length) {
    return 0;
  }

  const name = normalizeText(product.name);
  const category = normalizeText(product.category);
  const shortDescription = normalizeText(product.shortDescription);
  const benefits = product.benefits.map(normalizeText);
  const ingredients = product.ingredients.map(normalizeText);
  const usageIdeas = product.usageIdeas.map(normalizeText);

  let score = 0;

  if (name === normalizedQuery) {
    score += 120;
  } else if (name.startsWith(normalizedQuery)) {
    score += 95;
  } else if (name.includes(normalizedQuery)) {
    score += 70;
  }

  if (category.includes(normalizedQuery)) {
    score += 30;
  }

  if (shortDescription.includes(normalizedQuery)) {
    score += 28;
  }

  if (benefits.some((benefit) => benefit.includes(normalizedQuery))) {
    score += 22;
  }

  if (ingredients.some((ingredient) => ingredient.includes(normalizedQuery))) {
    score += 16;
  }

  if (usageIdeas.some((usageIdea) => usageIdea.includes(normalizedQuery))) {
    score += 12;
  }

  const allFields = [name, category, shortDescription, ...benefits, ...ingredients, ...usageIdeas];
  const matchedTokens = tokens.filter((token) => allFields.some((field) => field.includes(token))).length;

  if (matchedTokens > 0) {
    score += Math.round((matchedTokens / tokens.length) * 26);
  }

  if (tokens.length > 1 && tokens.every((token) => allFields.some((field) => field.includes(token)))) {
    score += 22;
  }

  return score;
}

function compareProducts(
  left: Awaited<ReturnType<typeof getAllProducts>>[number],
  right: Awaited<ReturnType<typeof getAllProducts>>[number],
  selectedSort: ProductSort,
) {
  if (selectedSort === "name-asc") {
    return left.name.localeCompare(right.name);
  }

  if (selectedSort === "category") {
    return left.category.localeCompare(right.category) || left.name.localeCompare(right.name);
  }

  if (left.featured !== right.featured) {
    return Number(right.featured) - Number(left.featured);
  }

  if (left.catalogPriority !== right.catalogPriority) {
    return left.catalogPriority - right.catalogPriority;
  }

  return left.name.localeCompare(right.name);
}

function buildProductsHref({
  category,
  sort,
  query,
}: {
  category?: string;
  sort?: ProductSort;
  query?: string;
}) {
  const params = new URLSearchParams();

  if (category) {
    params.set("category", category);
  }

  if (sort && sort !== "featured") {
    params.set("sort", sort);
  }

  const trimmedQuery = query?.trim();
  if (trimmedQuery) {
    params.set("q", trimmedQuery);
  }

  const queryString = params.toString();
  return queryString ? `/products?${queryString}` : "/products";
}

export async function generateMetadata({ searchParams }: ProductsPageProps): Promise<Metadata> {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const selectedCategory =
    typeof resolvedSearchParams.category === "string" ? resolvedSearchParams.category : undefined;
  const selectedSort = resolveSelectedSort(
    typeof resolvedSearchParams.sort === "string" ? resolvedSearchParams.sort : undefined,
  );
  const query = typeof resolvedSearchParams.q === "string" ? resolvedSearchParams.q : undefined;
  const trimmedQuery = query?.trim();
  const hasFilters = Boolean(selectedCategory || selectedSort !== "featured" || trimmedQuery);

  return buildMetadata({
    title: trimmedQuery
      ? `Search results for "${trimmedQuery}"`
      : selectedCategory
        ? `${selectedCategory} Products`
        : "Our Products",
    description: trimmedQuery
      ? `Explore Agree Superfoods products matching "${trimmedQuery}" with direct WhatsApp ordering and wholesale support.`
      : selectedCategory
        ? `Browse ${selectedCategory.toLowerCase()} from Agree Superfoods, with pricing, product details, usage ideas, and direct WhatsApp ordering.`
        : "Explore Agree Superfoods products across seeds, teas, makhana, and pantry essentials with direct WhatsApp ordering.",
    path: "/products",
    noIndex: hasFilters,
  });
}

function mapCollectionImage(
  selectedCategory: string | undefined,
  homeContent: Awaited<ReturnType<typeof getHomePageContent>>,
) {
  if (!selectedCategory) {
    return homeContent.collectionTiles[0];
  }

  if (selectedCategory === "Tea") {
    return homeContent.collectionTiles.find((item) => item.title === "Tea Collection");
  }

  if (selectedCategory === "Pantry Essentials") {
    return homeContent.collectionTiles.find((item) => item.title === "Pantry Essentials");
  }

  return homeContent.collectionTiles.find((item) => item.title === "Seeds");
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const selectedCategory =
    typeof resolvedSearchParams.category === "string" ? resolvedSearchParams.category : undefined;
  const selectedSort = resolveSelectedSort(
    typeof resolvedSearchParams.sort === "string" ? resolvedSearchParams.sort : undefined,
  );
  const query = typeof resolvedSearchParams.q === "string" ? resolvedSearchParams.q : "";
  const normalizedQuery = normalizeText(query);

  const [products, categories, homeContent] = await Promise.all([
    getAllProducts(),
    getProductCategories(),
    getHomePageContent(),
  ]);

  const categoryFilteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const searchedProducts = normalizedQuery
    ? categoryFilteredProducts
        .map((product) => ({
          product,
          score: scoreProductMatch(product, normalizedQuery),
        }))
        .filter((entry) => entry.score > 0)
        .sort((left, right) => {
          if (left.score !== right.score) {
            return right.score - left.score;
          }

          return compareProducts(left.product, right.product, selectedSort);
        })
        .map((entry) => entry.product)
    : categoryFilteredProducts;

  const sortedProducts = normalizedQuery
    ? searchedProducts
    : [...searchedProducts].sort((left, right) => compareProducts(left, right, selectedSort));

  const collectionImage = mapCollectionImage(selectedCategory, homeContent);
  const hasQuery = Boolean(normalizedQuery);
  const queryLabel = query.trim();

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Our Products", href: "/products" },
        ])}
      />
      <JsonLd
        data={getProductListSchema(
          selectedCategory ? `${selectedCategory} Products` : "Agree Superfoods Products",
          "/products",
          sortedProducts,
        )}
      />
      <PageHero
        eyebrow="Our products"
        title="Premium pantry products with clear pricing and direct ordering."
        description="Browse the Agree Superfoods range by category, compare products clearly, and move into detailed product pages with direct WhatsApp ordering and wholesale support."
      >
        <div className="space-y-4">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
            ]}
          />
          {siteConfig.business.whatsappUrl ? (
            <div className="flex flex-wrap gap-3">
              <Link href={siteConfig.business.whatsappUrl} className={buttonStyles({ size: "lg" })}>
                {siteConfig.business.whatsappLabel}
              </Link>
              <Link href="/wholesale" className={buttonStyles({ variant: "secondary", size: "lg" })}>
                Bulk / Wholesale
              </Link>
            </div>
          ) : null}
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-olive-950/8 bg-white/80 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-700">
                Collection size
              </p>
              <p className="mt-2 text-sm leading-6 text-olive-900">{products.length} product pages</p>
            </div>
            <div className="rounded-[1.5rem] border border-olive-950/8 bg-white/80 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-700">
                Filters
              </p>
              <p className="mt-2 text-sm leading-6 text-olive-900">
                Browse by seeds, tea, or pantry essentials
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-olive-950/8 bg-white/80 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-700">
                Order support
              </p>
              <p className="mt-2 text-sm leading-6 text-olive-900">
                Product pages connect directly to WhatsApp ordering and wholesale support
              </p>
            </div>
          </div>
        </div>
      </PageHero>
      <section className="section-shell pt-0">
        <Container>
          <div className="premium-panel mb-10 overflow-hidden p-6 lg:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div className="image-stage relative aspect-[4/2.5] overflow-hidden">
                {collectionImage ? (
                  <Image
                    src={collectionImage.image.src}
                    alt={collectionImage.image.alt}
                    fill
                    sizes="(min-width: 1024px) 48vw, 100vw"
                    className="object-cover"
                  />
                ) : null}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_26%,rgba(19,32,24,0.62)_100%)]" />
                <div className="absolute inset-x-6 bottom-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sand-100/72">
                    Current view
                  </p>
                  <h2 className="mt-2 text-3xl text-sand-50">
                    {selectedCategory || "All categories"}
                  </h2>
                </div>
              </div>
              <div className="grid gap-4 text-sm leading-7 text-olive-800">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-olive-700">
                    Collection overview
                  </p>
                  <p className="mt-3">
                    {sortedProducts.length} products matched{" "}
                    {hasQuery ? <>the search term &ldquo;{queryLabel}&rdquo;</> : "this collection view"}.
                    Use the filters below to compare categories quickly, then open product pages
                    for ingredients, usage ideas, FAQs, and direct ordering.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-olive-950/8 bg-white/75 px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-700">
                      Product pages
                    </p>
                    <p className="mt-2 text-sm leading-6 text-olive-900">
                      Every page includes highlights, usage ideas, pricing, and FAQ content.
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-olive-950/8 bg-white/75 px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-700">
                      Bulk support
                    </p>
                    <p className="mt-2 text-sm leading-6 text-olive-900">
                      Trade, gifting, and larger quantity support stays visible throughout the range.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <form className="mt-6 grid gap-4 rounded-[1.7rem] border border-olive-950/8 bg-white/76 p-4 md:grid-cols-[1fr_auto]">
              {selectedCategory ? <input type="hidden" name="category" value={selectedCategory} /> : null}
              {hasQuery ? <input type="hidden" name="q" value={queryLabel} /> : null}
              <div className="flex flex-wrap gap-3">
                <Link
                  href={buildProductsHref({
                    sort: selectedSort,
                    query: queryLabel,
                  })}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium shadow-[0_14px_28px_-24px_rgba(19,32,24,0.32)] transition",
                    !selectedCategory
                      ? "border-olive-950 bg-olive-950 text-sand-50"
                      : "border-olive-950/8 bg-white text-olive-900",
                  )}
                >
                  All
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={buildProductsHref({
                      category,
                      sort: selectedSort,
                      query: queryLabel,
                    })}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium shadow-[0_14px_28px_-24px_rgba(19,32,24,0.32)] transition",
                      selectedCategory === category
                        ? "border-olive-950 bg-olive-950 text-sand-50"
                        : "border-olive-950/8 bg-white text-olive-900",
                    )}
                  >
                    {category}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-3 md:justify-end">
                <label htmlFor="sort" className="text-sm font-medium text-olive-900">
                  Sort
                </label>
                <select
                  id="sort"
                  name="sort"
                  defaultValue={selectedSort}
                  className="min-h-11 rounded-full border border-olive-950/10 bg-white px-4 text-sm text-olive-950"
                >
                  <option value="featured">Featured first</option>
                  <option value="name-asc">Name A-Z</option>
                  <option value="category">Category</option>
                </select>
                <button
                  type="submit"
                  className="min-h-11 rounded-full bg-olive-950 px-5 text-sm font-medium text-sand-50"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>

          {sortedProducts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {sortedProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="card-surface p-8">
              <h2 className="text-2xl">No products matched this view.</h2>
              <p className="mt-4 max-w-2xl leading-7 text-olive-800">
                {hasQuery ? (
                  <>
                    No products matched &ldquo;{queryLabel}&rdquo; with the current filters. Try a
                    broader search term or reset filters to browse the full Agree Superfoods range.
                  </>
                ) : (
                  <>
                    Try switching categories or resetting the filters to browse the full Agree
                    Superfoods range.
                  </>
                )}
              </p>
              <Link
                href="/products"
                className="mt-6 inline-flex rounded-full bg-olive-950 px-5 py-3 text-sm font-medium text-sand-50"
              >
                Reset filters
              </Link>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
