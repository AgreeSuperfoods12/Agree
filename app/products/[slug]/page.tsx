import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductViewTracker } from "@/components/analytics/product-view-tracker";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { BlogCard } from "@/components/blog/blog-card";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { Container } from "@/components/layout/container";
import { ProductPriceGroup } from "@/components/pricing/product-price-group";
import { ProductGallery } from "@/components/products/product-gallery";
import { RelatedProducts } from "@/components/products/related-products";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { buttonStyles } from "@/components/ui/button";
import { getAllPosts } from "@/lib/content/blog";
import { getAllProductSlugs, getProductBySlug, getRelatedProducts } from "@/lib/content/products";
import { toCartProductSnapshot } from "@/lib/cart";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema, getFaqSchema, getProductSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site-config";
import { buildProductOrderWhatsAppUrl, buildWholesaleWhatsAppUrl } from "@/lib/whatsapp";
import type { BlogPost } from "@/types/blog";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllProductSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return buildMetadata({
      title: "Product not found",
      path: `/products/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: product.seo.title,
    description: product.seo.description,
    path: product.seo.canonicalPath,
    image: product.seo.ogImage,
    keywords: product.seo.keywords,
    noIndex: product.seo.noIndex,
  });
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: product.name, href: `/products/${product.slug}` },
  ];

  const [relatedProducts, allPosts] = await Promise.all([
    getRelatedProducts(product.slug, 3),
    getAllPosts(),
  ]);

  const relatedPosts = product.relatedPosts
    .map((relatedSlug) => allPosts.find((post) => post.slug === relatedSlug))
    .filter((post): post is BlogPost => Boolean(post))
    .slice(0, 3);

  const productOrderUrl = buildProductOrderWhatsAppUrl(product.name, product.pricing.variantLabel);
  const wholesaleUrl = buildWholesaleWhatsAppUrl();
  const cartProduct = toCartProductSnapshot(product);

  const savingsPercentage =
    typeof product.pricing.compareAtAmount === "number" &&
    product.pricing.compareAtAmount > product.pricing.amount
      ? Math.round(
          ((product.pricing.compareAtAmount - product.pricing.amount) /
            product.pricing.compareAtAmount) *
            100,
        )
      : null;

  const formatDetail = product.productDetails.find((item) =>
    item.label.toLowerCase().includes("format"),
  )?.value;
  const storageDetail = product.productDetails.find((item) =>
    item.label.toLowerCase().includes("storage"),
  )?.value;
  const sectionLinks = [
    { href: "#overview", label: "Overview" },
    { href: "#details", label: "Specs" },
    { href: "#usage", label: "How to use" },
    ...(relatedPosts.length > 0 ? [{ href: "#reading", label: "Reading" }] : []),
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(breadcrumbItems)} />
      <JsonLd data={getProductSchema(product)} />
      {product.faqs.length > 0 ? <JsonLd data={getFaqSchema(product.faqs)} /> : null}
      <ProductViewTracker
        slug={product.slug}
        name={product.name}
        category={product.category}
        pricing={product.pricing}
      />

      <section className="section-shell pb-12 md:pb-16">
        <Container className="space-y-6">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="grid gap-8 xl:grid-cols-[1.02fr_0.98fr] xl:items-start">
            <ProductGallery
              name={product.name}
              images={product.images}
              highlights={product.highlights}
            />

            <div className="xl:sticky xl:top-24">
              <div className="premium-panel relative overflow-hidden p-7 sm:p-8">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(236,215,155,0.38),transparent_72%)]" />
                <div className="relative">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-olive-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-olive-800">
                      {product.category}
                    </span>
                    <span className="rounded-full bg-gold-300/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-olive-900">
                      {product.badge}
                    </span>
                    {savingsPercentage ? (
                      <span className="rounded-full bg-olive-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-sand-50">
                        Save {savingsPercentage}%
                      </span>
                    ) : null}
                  </div>

                  <h1 className="mt-4 text-4xl sm:text-5xl">{product.name}</h1>
                  <p className="mt-4 max-w-2xl text-lg leading-8 text-olive-800">
                    {product.description}
                  </p>

                  <ProductPriceGroup
                    pricing={product.pricing}
                    className="mt-6 items-end gap-x-4 gap-y-3"
                    currentClassName="text-3xl font-semibold text-olive-950 sm:text-4xl"
                    compareAtClassName="pb-1 text-lg text-olive-500 line-through"
                    variantClassName="rounded-full border border-olive-950/12 bg-sand-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-olive-700"
                  />

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-olive-950/10 bg-white/75 px-4 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-olive-700">
                        Pack
                      </p>
                      <p className="mt-2 text-sm font-medium text-olive-900">
                        {product.pricing.variantLabel}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-olive-950/10 bg-white/75 px-4 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-olive-700">
                        Response
                      </p>
                      <p className="mt-2 text-sm font-medium text-olive-900">
                        {siteConfig.business.responseTime}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-olive-950/10 bg-white/75 px-4 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-olive-700">
                        Support
                      </p>
                      <p className="mt-2 text-sm font-medium text-olive-900">Retail + Bulk</p>
                    </div>
                  </div>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    <AddToCartButton
                      product={cartProduct}
                      size="lg"
                      variant="primary"
                      className="w-full"
                    />
                    <TrackedLink
                      href={productOrderUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={buttonStyles({
                        variant: "secondary",
                        size: "lg",
                        className: "w-full",
                      })}
                      eventData={{
                        location: "product_hero",
                        label: "Order on WhatsApp",
                        product_slug: product.slug,
                      }}
                    >
                      Order on WhatsApp
                    </TrackedLink>
                  </div>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <TrackedLink
                      href={wholesaleUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={buttonStyles({ variant: "secondary", size: "lg", className: "w-full" })}
                      eventData={{
                        location: "product_hero",
                        label: "Bulk / Wholesale",
                        product_slug: product.slug,
                      }}
                    >
                      Bulk / Wholesale
                    </TrackedLink>
                    {siteConfig.business.whatsappUrl ? (
                      <TrackedLink
                        href={siteConfig.business.whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={buttonStyles({
                          variant: "secondary",
                          size: "lg",
                          className: "w-full",
                        })}
                        eventData={{
                          location: "product_hero",
                          label: siteConfig.business.whatsappLabel,
                          product_slug: product.slug,
                        }}
                      >
                        {siteConfig.business.whatsappLabel}
                      </TrackedLink>
                    ) : (
                      <Link
                        href="/contact"
                        className={buttonStyles({
                          variant: "secondary",
                          size: "lg",
                          className: "w-full",
                        })}
                      >
                        Ask a question
                      </Link>
                    )}
                  </div>

                  <div className="mt-7 rounded-[1.5rem] border border-olive-950/10 bg-white/75 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-700">
                      What you get
                    </p>
                    <dl className="mt-4 grid gap-3 text-sm leading-6 text-olive-900 sm:grid-cols-2">
                      <div className="rounded-xl border border-olive-950/8 bg-sand-50 px-4 py-3">
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-600">
                          Ingredient
                        </dt>
                        <dd className="mt-1 font-medium">
                          {product.ingredients[0] ?? "Carefully sourced ingredients"}
                        </dd>
                      </div>
                      <div className="rounded-xl border border-olive-950/8 bg-sand-50 px-4 py-3">
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-600">
                          Format
                        </dt>
                        <dd className="mt-1 font-medium">{formatDetail ?? "Ready for everyday use"}</dd>
                      </div>
                      <div className="rounded-xl border border-olive-950/8 bg-sand-50 px-4 py-3 sm:col-span-2">
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-olive-600">
                          Storage
                        </dt>
                        <dd className="mt-1 font-medium">
                          {storageDetail ?? "Keep sealed in a cool, dry place"}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="mt-6 space-y-3">
                    {product.highlights.slice(0, 2).map((item) => (
                      <div
                        key={item.title}
                        className="rounded-[1.35rem] border border-olive-950/10 bg-white/70 px-4 py-4"
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-olive-700">
                          {item.title}
                        </p>
                        <p className="mt-1.5 text-base font-semibold text-olive-950">{item.value}</p>
                        <p className="mt-1.5 text-sm leading-6 text-olive-800">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-shell py-0">
        <Container>
          <nav
            aria-label="Product sections"
            className="card-surface flex flex-wrap items-center gap-2 p-3 sm:p-4"
          >
            {sectionLinks.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="rounded-full border border-olive-950/10 bg-white px-4 py-2 text-sm font-medium text-olive-900 transition hover:bg-olive-50"
              >
                {section.label}
              </Link>
            ))}
          </nav>
        </Container>
      </section>

      <section id="overview" className="section-shell">
        <Container className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
          <article className="premium-panel p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-olive-700">
              Product overview
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl">{product.name} for everyday routines</h2>
            <p className="mt-5 text-base leading-8 text-olive-800">{product.shortDescription}</p>
            <div className="mt-6 space-y-5 text-base leading-8 text-olive-800">
              {product.fullDescription.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-olive-950/10 bg-white/72 p-5 sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-700">
                Best for
              </p>
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-olive-900 sm:grid-cols-2">
                {product.bestFor.map((item) => (
                  <li key={item} className="rounded-2xl border border-olive-950/8 bg-sand-50 px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <div className="grid gap-6">
            <article id="details" className="card-surface p-6 sm:p-8">
              <h2 className="text-2xl">Product specs</h2>
              <dl className="mt-5 grid gap-4 text-sm leading-7 text-olive-800">
                {product.productDetails.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.3rem] border border-olive-950/8 bg-white/70 px-4 py-4"
                  >
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-700">
                      {item.label}
                    </dt>
                    <dd className="mt-2">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </article>

            <article className="dark-panel p-6 sm:p-8">
              <h2 className="text-2xl">Highlights</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {product.highlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sand-100/65">
                      {item.title}
                    </p>
                    <p className="mt-2 text-xl text-sand-50">{item.value}</p>
                    <p className="mt-2 text-sm leading-6 text-sand-100/78">{item.description}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </Container>
      </section>

      <section id="usage" className="section-shell pt-0">
        <Container className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
          <article className="card-surface p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-olive-700">Usage flow</p>
            <h2 className="mt-3 text-3xl">How to use {product.name}</h2>
            <ol className="mt-6 space-y-4">
              {product.usageIdeas.map((item, index) => (
                <li
                  key={item}
                  className="flex gap-4 rounded-[1.4rem] border border-olive-950/8 bg-white/72 px-4 py-4"
                >
                  <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-olive-950 text-xs font-semibold text-sand-50">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-7 text-olive-900">{item}</p>
                </li>
              ))}
            </ol>
          </article>

          <div className="grid gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <article className="card-surface p-6">
                <h2 className="text-2xl">Benefits</h2>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-olive-800">
                  {product.benefits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="card-surface p-6">
                <h2 className="text-2xl">Ingredients</h2>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-olive-800">
                  {product.ingredients.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>

            <article className="premium-panel p-6 sm:p-8">
              <h2 className="text-2xl">Made for consistent routines</h2>
              <p className="mt-4 text-sm leading-7 text-olive-800">
                This {product.category.toLowerCase()} product is designed to feel simple and repeatable
                for homes, gifting, and growing pantry demand. The team aims to respond{" "}
                {siteConfig.business.responseTime.toLowerCase()} for product questions.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {product.bestFor.slice(0, 4).map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-olive-950/8 bg-white/76 px-4 py-3 text-sm text-olive-900"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </Container>
      </section>

      {relatedPosts.length > 0 ? (
        <section id="reading" className="section-shell pt-0">
          <Container>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-olive-700">
                  Educational content
                </p>
                <h2 className="mt-3 text-3xl">Related reading for {product.name}</h2>
              </div>
              <Link href="/blog" className={buttonStyles({ variant: "secondary" })}>
                Explore the blog
              </Link>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {relatedPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section id="faq" className="section-shell pt-0">
        <Container>
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-olive-700">
              Product FAQ
            </p>
            <h2 className="mt-3 text-3xl">Questions about {product.name}</h2>
          </div>
          <FaqAccordion items={product.faqs} />
        </Container>
      </section>

      <RelatedProducts products={relatedProducts} />

      <section className="section-shell pt-0">
        <Container>
          <div className="dark-panel grid gap-6 p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sand-100/60">
                Enquiry ready
              </p>
              <h2 className="mt-4 text-3xl text-sand-50">
                Need specifications, business details, or product support?
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-sand-100/78">
                Ask about product details, suggested use, gifting, retail buying, or wholesale
                quantities. The team aims to reply {siteConfig.business.responseTime.toLowerCase()}.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <TrackedLink
                href={productOrderUrl}
                target="_blank"
                rel="noreferrer"
                className={buttonStyles({ size: "lg" })}
                eventData={{
                  location: "product_footer_cta",
                  label: "Order on WhatsApp",
                  product_slug: product.slug,
                }}
              >
                Order on WhatsApp
              </TrackedLink>
              <TrackedLink
                href={wholesaleUrl}
                target="_blank"
                rel="noreferrer"
                className={buttonStyles({
                  variant: "secondary",
                  size: "lg",
                  className: "bg-white text-olive-950",
                })}
                eventData={{
                  location: "product_footer_cta",
                  label: "Bulk / Wholesale",
                  product_slug: product.slug,
                }}
              >
                Bulk / Wholesale
              </TrackedLink>
              {siteConfig.business.whatsappUrl ? (
                <TrackedLink
                  href={siteConfig.business.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonStyles({
                    variant: "secondary",
                    size: "lg",
                    className: "bg-white text-olive-950",
                  })}
                  eventData={{
                    location: "product_footer_cta",
                    label: siteConfig.business.whatsappLabel,
                    product_slug: product.slug,
                  }}
                >
                  {siteConfig.business.whatsappLabel}
                </TrackedLink>
              ) : null}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
