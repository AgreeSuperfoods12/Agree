import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductViewTracker } from "@/components/analytics/product-view-tracker";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { BlogCard } from "@/components/blog/blog-card";
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

      <section className="section-shell">
        <Container className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div className="space-y-6">
            <Breadcrumbs items={breadcrumbItems} />
            <ProductGallery
              name={product.name}
              images={product.images}
              highlights={product.highlights}
            />
          </div>
          <div className="lg:sticky lg:top-28">
            <div className="premium-panel p-7 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-olive-700">
                {product.category}
              </p>
              <h1 className="mt-4 text-4xl sm:text-5xl">{product.name}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-olive-800">{product.description}</p>
              <ProductPriceGroup
                pricing={product.pricing}
                className="mt-6 items-end gap-x-4 gap-y-3"
                currentClassName="text-3xl font-semibold text-olive-950 sm:text-4xl"
                compareAtClassName="pb-1 text-lg text-olive-500 line-through"
                variantClassName="rounded-full border border-olive-950/10 bg-sand-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-olive-700"
              />
              <div className="mt-5 flex flex-wrap gap-3">
                <span className="rounded-full bg-olive-50 px-4 py-2 text-sm font-medium text-olive-900">
                  {product.badge}
                </span>
                {product.highlights.slice(0, 2).map((item) => (
                  <span
                    key={item.title}
                    className="rounded-full bg-gold-300/30 px-4 py-2 text-sm font-medium text-olive-900"
                  >
                    {item.title}: {item.value}
                  </span>
                ))}
              </div>
              <div className="mt-7 flex flex-col gap-3">
                <TrackedLink
                  href={productOrderUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonStyles({ size: "lg" })}
                  eventData={{
                    location: "product_hero",
                    label: "Order on WhatsApp",
                    product_slug: product.slug,
                  }}
                >
                  Order on WhatsApp
                </TrackedLink>
                <AddToCartButton product={cartProduct} size="lg" variant="secondary" />
                <TrackedLink
                  href={wholesaleUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonStyles({ variant: "secondary", size: "lg" })}
                  eventData={{
                    location: "product_hero",
                    label: "Bulk / Wholesale",
                    product_slug: product.slug,
                  }}
                >
                  Bulk / Wholesale
                </TrackedLink>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-olive-950/8 bg-sand-50 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-olive-700">
                    Pack size
                  </p>
                  <p className="mt-2 text-sm leading-6 text-olive-900">
                    This page shows pricing for the {product.pricing.variantLabel} pack so smaller
                    orders start with a clear reference point before final confirmation on WhatsApp.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-olive-950/8 bg-sand-50 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-olive-700">
                    How to order
                  </p>
                  <p className="mt-2 text-sm leading-6 text-olive-900">
                    Use the WhatsApp order button for retail buying, or the wholesale route for
                    trade, gifting, and larger quantity requests.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link href="#overview" className="rounded-full border border-olive-950/8 bg-white px-4 py-2 text-sm font-medium text-olive-900">
                  Overview
                </Link>
                <Link href="#details" className="rounded-full border border-olive-950/8 bg-white px-4 py-2 text-sm font-medium text-olive-900">
                  Details
                </Link>
                <Link href="#usage" className="rounded-full border border-olive-950/8 bg-white px-4 py-2 text-sm font-medium text-olive-900">
                  Usage
                </Link>
                <Link href="#faq" className="rounded-full border border-olive-950/8 bg-white px-4 py-2 text-sm font-medium text-olive-900">
                  FAQ
                </Link>
              </div>
              <div className="mt-7 grid gap-3">
                <div className="rounded-[1.5rem] border border-olive-950/8 bg-white/75 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-700">
                    Product support
                  </p>
                  <p className="mt-2 text-sm leading-6 text-olive-900">
                    Review the product details here, then use WhatsApp for ordering, gifting
                    needs, samples, or specification requests.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-olive-950/8 bg-white/75 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-700">
                    Response time
                  </p>
                  <p className="mt-2 text-sm leading-6 text-olive-900">
                    Agree Superfoods aims to respond {siteConfig.business.responseTime.toLowerCase()}.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-olive-950/8 bg-white/75 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-700">
                    Bulk route
                  </p>
                  <p className="mt-2 text-sm leading-6 text-olive-900">
                    Retail, hospitality, distributor, and larger quantity requests are welcome
                    through the dedicated business route.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-shell pt-0">
        <Container id="overview" className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="card-surface p-8 sm:p-10">
            <h2 className="text-3xl">Product overview</h2>
            <p className="mt-4 text-base leading-8 text-olive-800">{product.shortDescription}</p>
            <div className="mt-6 space-y-5 text-base leading-8 text-olive-800">
              {product.fullDescription.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="grid gap-5">
            <article id="details" className="dark-panel p-6">
              <h2 className="text-2xl">Product details</h2>
              <dl className="mt-5 space-y-4 text-sm leading-7 text-sand-100/80">
                {product.productDetails.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col gap-1 border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-[0.24em] text-sand-100/60">
                      {item.label}
                    </dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
            <article className="card-surface p-6">
              <h2 className="text-2xl">Best for</h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-olive-800">
                {product.bestFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </Container>
      </section>

      <section className="section-shell pt-0">
        <Container id="usage" className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="card-surface p-6 sm:p-8">
              <h2 className="text-2xl">Benefits</h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-olive-800">
                {product.benefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="card-surface p-6 sm:p-8">
              <h2 className="text-2xl">Ingredients</h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-olive-800">
                {product.ingredients.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
          <div className="grid gap-6">
            <article className="premium-panel p-6 sm:p-8">
              <h2 className="text-2xl">Usage ideas</h2>
              <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-olive-800">
                {product.usageIdeas.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </article>
            <article className="dark-panel p-6 sm:p-8">
              <h2 className="text-2xl">Highlights</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {product.highlights.map((item) => (
                  <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sand-100/60">
                      {item.title}
                    </p>
                    <p className="mt-3 text-xl text-sand-50">{item.value}</p>
                    <p className="mt-2 text-sm leading-6 text-sand-100/76">{item.description}</p>
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
                Ask about product details, suggested use, gifting, retail buying, or wholesale quantities. The team aims to reply {siteConfig.business.responseTime.toLowerCase()}.
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
