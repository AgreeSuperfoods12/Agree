"use client";

import Image from "next/image";
import Link from "next/link";

import { useMarket } from "@/components/providers/market-provider";
import { isPackshotImage } from "@/lib/product-images";
import { getPricingDisplay } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";
import type { ContentImage } from "@/types/site";

type PriceValue = number | string;

interface ProductCardCustomProps {
  title: string;
  price: PriceValue;
  compareAtPrice?: PriceValue | null;
  primaryImage: ContentImage;
  secondaryImage?: ContentImage;
  badgeLeft?: string;
  badgeRight?: string;
  currency?: string;
  href?: string;
  featured?: boolean;
  className?: string;
}

interface ProductCardProductProps {
  product: Product;
  featured?: boolean;
  className?: string;
}

type ProductCardProps = ProductCardProductProps | ProductCardCustomProps;

interface ResolvedProductCardProps {
  href: string;
  title: string;
  primaryImage: ContentImage;
  secondaryImage?: ContentImage;
  badgeLeft?: string;
  badgeRight?: string;
  price: string;
  compareAtPrice?: string;
  featured?: boolean;
  className?: string;
}

function formatPriceValue(value: PriceValue, currency = "INR") {
  return {
    amount: typeof value === "number" ? value : null,
    formatted: typeof value === "string" ? value : null,
    currencyCode: currency,
  };
}

function resolveBadgeRight(product: Product, marketCode: Parameters<typeof getPricingDisplay>[1]) {
  const pricing = getPricingDisplay(product.pricing, marketCode);

  return pricing.discountPercentage ? `-${pricing.discountPercentage}%` : undefined;
}

function resolveProductCardProps(
  props: ProductCardProps,
  marketCode: Parameters<typeof getPricingDisplay>[1],
): ResolvedProductCardProps {
  if ("product" in props) {
    const pricing = getPricingDisplay(props.product.pricing, marketCode);

    return {
      href: `/products/${props.product.slug}`,
      title: props.product.name,
      primaryImage: props.product.images[0],
      secondaryImage: props.product.images[1],
      badgeLeft: "New",
      badgeRight: resolveBadgeRight(props.product, marketCode),
      price: pricing.current,
      compareAtPrice: pricing.compareAt ?? undefined,
      featured: props.featured,
      className: props.className,
    };
  }

  const currentPrice = formatPriceValue(props.price, props.currency ?? "INR");
  const compareAtPrice = props.compareAtPrice
    ? formatPriceValue(props.compareAtPrice, props.currency ?? "INR")
    : null;
  const convertedPrice =
    typeof currentPrice.amount === "number"
      ? getPricingDisplay(
          {
            amount: currentPrice.amount,
            compareAtAmount: typeof compareAtPrice?.amount === "number" ? compareAtPrice.amount : undefined,
            currencyCode: currentPrice.currencyCode,
            variantLabel: "",
          },
          marketCode,
        )
      : null;

  return {
    href: props.href ?? "#",
    title: props.title,
    primaryImage: props.primaryImage,
    secondaryImage: props.secondaryImage,
    badgeLeft: props.badgeLeft,
    badgeRight: props.badgeRight,
    price: convertedPrice?.current ?? currentPrice.formatted ?? "",
    compareAtPrice: convertedPrice?.compareAt ?? compareAtPrice?.formatted ?? undefined,
    featured: props.featured,
    className: props.className,
  };
}

export function ProductCard(props: ProductCardProps) {
  const { marketCode } = useMarket();
  const card = resolveProductCardProps(props, marketCode);
  const primaryIsPackshot = isPackshotImage(card.primaryImage.src);
  const secondaryIsPackshot = isPackshotImage(card.secondaryImage?.src);

  return (
    <article
      className={cn(
        "group flex h-full flex-col",
        card.featured ? "lg:min-h-[100%]" : "",
        card.className,
      )}
    >
      <div className="relative overflow-hidden rounded-[1.65rem] border border-[#d6dfd2] bg-[#edf3ea] p-3 shadow-[0_20px_50px_-34px_rgba(19,32,24,0.24)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_32px_78px_-42px_rgba(19,32,24,0.32)]">
        {card.badgeLeft ? (
          <span className="absolute left-3 top-3 z-20 rounded-[0.45rem] bg-[#f7a47a] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-olive-950">
            {card.badgeLeft}
          </span>
        ) : null}
        {card.badgeRight ? (
          <span className="absolute right-3 top-3 z-20 rounded-[0.45rem] bg-[#d8c4ee] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-olive-950">
            {card.badgeRight}
          </span>
        ) : null}

        <Link
          href={card.href}
          aria-label={`View ${card.title}`}
          className="block"
        >
          <div
            className={cn(
              "relative aspect-[1/1.02] overflow-hidden rounded-[1.3rem]",
              primaryIsPackshot
                ? "bg-[radial-gradient(circle_at_50%_8%,#fbfef9_0,#edf5e9_56%,#dde8d8_100%)]"
                : "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.98),rgba(241,246,237,0.92)_48%,rgba(225,235,220,0.95)_100%)]",
            )}
          >
            {primaryIsPackshot ? (
              <div className="absolute inset-x-8 bottom-6 h-7 rounded-full bg-[#6b5835]/10 blur-xl" />
            ) : null}
            <Image
              src={card.primaryImage.src}
              alt={card.primaryImage.alt}
              fill
              sizes="(min-width: 1620px) 372px, (min-width: 1200px) 23vw, (min-width: 768px) 31vw, 48vw"
              className={cn(
                "transition-[opacity,transform] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:scale-[0.96] md:group-hover:opacity-0",
                primaryIsPackshot
                  ? "object-contain p-0 scale-[1.08] drop-shadow-[0_24px_32px_rgba(19,32,24,0.18)]"
                  : "object-cover",
              )}
            />

            {card.secondaryImage ? (
              <Image
                src={card.secondaryImage.src}
                alt={card.secondaryImage.alt}
                fill
                sizes="(min-width: 1620px) 372px, (min-width: 1200px) 23vw, (min-width: 768px) 31vw, 48vw"
                className={cn(
                  "opacity-0 transition-[opacity,transform] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:scale-[1.035] md:group-hover:scale-100 md:group-hover:opacity-100",
                  secondaryIsPackshot
                    ? "object-contain p-0 scale-[1.05] drop-shadow-[0_24px_32px_rgba(19,32,24,0.18)]"
                    : "object-cover",
                )}
              />
            ) : null}
          </div>
        </Link>

        <Link
          href={card.href}
          aria-label={`Open ${card.title}`}
          className="absolute bottom-4 right-4 z-20 grid size-11 place-items-center rounded-full bg-[#d2c0dc] text-olive-950 shadow-[0_14px_28px_-18px_rgba(19,32,24,0.36)] transition-[opacity,transform,background-color] duration-300 hover:bg-[#c8b4d2] md:group-hover:pointer-events-none md:group-hover:scale-90 md:group-hover:opacity-0"
        >
          <PlusIcon />
        </Link>
      </div>

      <div className="px-3 pb-2 pt-5 text-center">
        <h3 className="font-sans text-[1.45rem] font-semibold tracking-[-0.03em] text-olive-950 sm:text-[1.55rem]">
          <Link href={card.href} className="transition hover:text-olive-700">
            {card.title}
          </Link>
        </h3>
        <div className="mt-1.5 flex items-center justify-center gap-2 text-[1rem]">
          <span className="font-medium text-olive-950">{card.price}</span>
          {card.compareAtPrice ? (
            <span className="text-sm text-olive-500 line-through">{card.compareAtPrice}</span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="size-5 fill-none stroke-current stroke-[1.8]">
      <path d="M10 4v12M4 10h12" strokeLinecap="round" />
    </svg>
  );
}
