"use client";

import Image from "next/image";
import Link from "next/link";

import { useMarketPricing } from "@/components/providers/market-provider";
import { isPackshotImage } from "@/lib/product-images";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductMiniCardProps {
  product: Product;
}

export function ProductMiniCard({ product }: ProductMiniCardProps) {
  const image = product.images[0];
  const price = useMarketPricing(product.pricing);
  const imageIsPackshot = isPackshotImage(image.src);

  return (
    <article className="group rounded-[1.7rem] border border-olive-950/8 bg-white/96 p-3 shadow-[0_18px_40px_-28px_rgba(19,32,24,0.34)] transition duration-300 hover:-translate-y-1">
      <Link href={`/products/${product.slug}`} className="block">
        <div
          className={cn(
            "relative aspect-[4/4.1] overflow-hidden rounded-[1.35rem]",
            imageIsPackshot
              ? "bg-[radial-gradient(circle_at_50%_8%,#fbfef9_0,#edf5e9_56%,#dde8d8_100%)]"
              : "bg-sand-100",
          )}
        >
          {imageIsPackshot ? (
            <div className="absolute inset-x-8 bottom-5 h-7 rounded-full bg-[#6b5835]/10 blur-xl" />
          ) : null}
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1280px) 18vw, (min-width: 768px) 30vw, 60vw"
            className={cn(
              "transition duration-700 group-hover:scale-[1.04]",
              imageIsPackshot
                ? "object-contain p-0 scale-[1.05] drop-shadow-[0_24px_32px_rgba(19,32,24,0.18)]"
                : "object-cover",
            )}
          />
        </div>
        <div className="px-1 pb-1 pt-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-olive-700">
            {product.badge}
          </p>
          <h3 className="mt-2 text-lg text-olive-950">{product.name}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-olive-950/10 bg-sand-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-olive-700">
              {price.variantLabel}
            </span>
            <span className="text-sm font-semibold text-olive-950">{price.current}</span>
            {price.compareAt ? (
              <span className="text-xs text-olive-500 line-through">{price.compareAt}</span>
            ) : null}
          </div>
          <p className="mt-2 text-sm leading-6 text-olive-700">{product.shortDescription}</p>
        </div>
      </Link>
    </article>
  );
}
