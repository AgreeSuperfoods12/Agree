import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/types/product";
import type { ProductRowFeature } from "@/types/home";
import { Container } from "@/components/layout/container";
import { ProductMiniCard } from "@/components/products/product-mini-card";
import { buttonStyles } from "@/components/ui/button";

interface ProductRowSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  feature: ProductRowFeature;
  products: Product[];
}

export function ProductRowSection({
  eyebrow,
  title,
  description,
  feature,
  products,
}: ProductRowSectionProps) {
  return (
    <section className="section-shell">
      <Container>
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-olive-700">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-4xl sm:text-5xl">{title}</h2>
          <p className="mt-4 leading-7 text-olive-800">{description}</p>
        </div>
        <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
          <article className="overflow-hidden rounded-[2rem] border border-olive-950/8 bg-[#efe3f2] shadow-[0_18px_40px_-30px_rgba(19,32,24,0.24)]">
            <div className="grid gap-6 p-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.7rem]">
                <Image
                  src={feature.image.src}
                  alt={feature.image.alt}
                  fill
                  sizes="(min-width: 1280px) 36vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-olive-700">
                  {feature.eyebrow}
                </p>
                <h3 className="mt-3 text-3xl">{feature.title}</h3>
                <p className="mt-4 leading-7 text-olive-800">{feature.description}</p>
                <Link href={feature.ctaHref} className={buttonStyles({ className: "mt-6" })}>
                  {feature.ctaLabel}
                </Link>
              </div>
            </div>
          </article>
          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-3">
            {products.map((product) => (
              <ProductMiniCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
