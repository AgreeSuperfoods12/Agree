import Image from "next/image";
import Link from "next/link";

import type { SpotlightContent } from "@/types/home";
import type { Product } from "@/types/product";
import { Container } from "@/components/layout/container";
import { ProductPriceGroup } from "@/components/pricing/product-price-group";
import { buttonStyles } from "@/components/ui/button";
import { isPackshotImage } from "@/lib/product-images";
import { cn } from "@/lib/utils";

interface ProductSpotlightSectionProps {
  content: SpotlightContent;
  product: Product;
}

export function ProductSpotlightSection({
  content,
  product,
}: ProductSpotlightSectionProps) {
  const image = product.images[0];
  const packshot = isPackshotImage(image?.src);

  return (
    <section className="section-shell">
      <Container>
        <div className="overflow-hidden rounded-[2.6rem] border border-olive-950/7 bg-[linear-gradient(180deg,rgba(255,255,255,0.62),rgba(248,244,237,0.98))] p-6 shadow-[0_30px_90px_-54px_rgba(19,32,24,0.26)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="max-w-[36rem]">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-olive-700">
                {content.eyebrow}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <span className="rounded-full border border-olive-950/10 bg-white/82 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-olive-700">
                  {product.badge}
                </span>
                <span className="rounded-full border border-olive-950/10 bg-sand-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-olive-500">
                  {product.category}
                </span>
              </div>

              <h2 className="mt-5 max-w-[12ch] text-4xl leading-[0.96] sm:text-5xl lg:text-[3.7rem]">
                {content.title}
              </h2>

              <p className="mt-5 text-base leading-8 text-olive-800 sm:text-lg">
                {content.description}
              </p>

              <ProductPriceGroup
                pricing={product.pricing}
                className="mt-7 items-center gap-3"
                currentClassName="text-2xl font-semibold text-olive-950"
                compareAtClassName="text-base text-olive-500 line-through"
                variantClassName="rounded-full border border-olive-950/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-olive-700"
              />

              <ul className="mt-8 space-y-3">
                {content.bullets.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-[1.25rem] border border-olive-950/8 bg-white/74 px-4 py-3.5 text-sm leading-7 text-olive-800"
                  >
                    <span className="mt-2.5 inline-flex size-2 shrink-0 rounded-full bg-gold-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={`/products/${product.slug}`} className={buttonStyles()}>
                  Explore {product.name}
                </Link>
                <Link href="/wholesale" className={buttonStyles({ variant: "secondary" })}>
                  Bulk / Wholesale
                </Link>
              </div>
            </div>

            <div className="grid gap-5">
              <div className="overflow-hidden rounded-[2rem] border border-olive-950/8 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92),rgba(243,236,222,0.84)_42%,rgba(239,245,237,0.94)_100%)] p-4 shadow-[0_28px_70px_-48px_rgba(19,32,24,0.28)] sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-700">
                    Pantry spotlight
                  </p>
                  <span className="rounded-full border border-olive-950/10 bg-white/84 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-olive-500">
                    {product.pricing.variantLabel}
                  </span>
                </div>

                <div className="relative mt-4 aspect-[1.02] overflow-hidden rounded-[1.55rem] bg-white/42">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1280px) 42vw, (min-width: 1024px) 48vw, 100vw"
                    className={cn(
                      "transition duration-500",
                      packshot ? "object-contain p-6 sm:p-8" : "object-cover",
                    )}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {product.highlights.slice(0, 3).map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.5rem] border border-olive-950/8 bg-white/84 px-4 py-4"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-olive-700">
                      {item.title}
                    </p>
                    <p className="mt-3 text-[1.35rem] leading-[1.15] font-semibold tracking-[-0.02em] text-olive-950">
                      {item.value}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-olive-700">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
