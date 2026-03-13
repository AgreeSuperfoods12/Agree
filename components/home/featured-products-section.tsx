"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/types/product";
import { Container } from "@/components/layout/container";
import { ProductPriceGroup } from "@/components/pricing/product-price-group";
import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FeaturedProductsSectionProps {
  products: Product[];
}

const CARD_GAP_PX = 28;

function getItemsPerView(viewportWidth: number) {
  if (viewportWidth >= 1280) {
    return 4;
  }

  if (viewportWidth >= 768) {
    return 2;
  }

  return 1.15;
}

function getScrollAmount(container: HTMLDivElement) {
  const card = container.querySelector<HTMLElement>("[data-featured-product-card]");
  const styles = window.getComputedStyle(container);
  const gap = Number.parseFloat(styles.columnGap || styles.gap || String(CARD_GAP_PX));

  return card ? card.offsetWidth + gap : container.clientWidth * 0.92;
}

function SectionChip({
  label,
  accent = false,
}: {
  label: string;
  accent?: boolean;
}) {
  return (
    <span
      className={cn(
        "rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em]",
        accent
          ? "border-[#d3bee8] bg-[#d9c9eb] text-olive-950"
          : "border-olive-950/10 bg-white/86 text-olive-700",
      )}
    >
      {label}
    </span>
  );
}

function ArrowIcon({
  direction,
  className,
}: {
  direction: "left" | "right";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("fill-none stroke-current stroke-[1.85]", className)}
    >
      {direction === "left" ? (
        <path d="M14.5 5.5 8 12l6.5 6.5" />
      ) : (
        <path d="M9.5 5.5 16 12l-6.5 6.5" />
      )}
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-none stroke-current stroke-[1.8]">
      <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-none stroke-current stroke-[1.9]">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function ScrollButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`Scroll ${direction}`}
      className={cn(
        "grid size-11 place-items-center rounded-full border border-olive-950/8 bg-white text-olive-950 shadow-[0_16px_32px_-24px_rgba(19,32,24,0.28)] transition",
        disabled ? "cursor-not-allowed opacity-35" : "hover:-translate-y-0.5 hover:bg-sand-50",
      )}
    >
      <ArrowIcon direction={direction} className="size-5" />
    </button>
  );
}

function FeaturedProductCard({
  product,
  cardBasis,
}: {
  product: Product;
  cardBasis: string;
}) {
  const image = product.images[0];
  const discount = product.pricing.compareAtAmount
    ? Math.round(
        ((product.pricing.compareAtAmount - product.pricing.amount) /
          product.pricing.compareAtAmount) *
          100,
      )
    : null;

  return (
    <article
      data-featured-product-card
      className="shrink-0 snap-start"
      style={{ flexBasis: cardBasis }}
    >
      <div className="group h-full rounded-[2rem] border border-black/6 bg-[#f7f7f4] p-3 shadow-[0_26px_58px_-46px_rgba(19,32,24,0.3)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_74px_-46px_rgba(19,32,24,0.38)]">
        <Link href={`/products/${product.slug}`} className="block">
          <div className="relative overflow-hidden rounded-[1.45rem] bg-[radial-gradient(circle_at_50%_0%,#f8fcf5_0,#e8efe4_55%,#dce5d9_100%)]">
            <span className="absolute left-3 top-3 z-10 rounded-[0.4rem] bg-[#f4a379] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-olive-950">
              New
            </span>
            <span className="absolute right-3 top-3 z-10 rounded-[0.4rem] bg-[#d8c4ee] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-olive-950">
              {discount ? `-${discount}%` : product.category}
            </span>

            <div className="relative aspect-[0.92] overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1280px) 19rem, (min-width: 768px) 42vw, 82vw"
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
              />
            </div>

            <div className="absolute inset-x-4 bottom-4 rounded-[1.15rem] border border-black/5 bg-white/96 px-4 py-3 shadow-[0_18px_36px_-26px_rgba(19,32,24,0.35)] backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex size-9 items-center justify-center rounded-full border border-olive-950/8 bg-sand-50 text-olive-950">
                  <EyeIcon />
                </span>
                <span className="text-sm font-medium tracking-[-0.01em] text-olive-950">
                  View product
                </span>
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-[#d8c4ee] text-olive-950">
                  <PlusIcon />
                </span>
              </div>
            </div>
          </div>
        </Link>

        <div className="px-3 pb-2 pt-5 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-olive-500">
            {product.pricing.variantLabel} | {product.category}
          </p>

          <h3 className="mt-2 text-[1.65rem] leading-[1.05] font-semibold tracking-[-0.035em] text-olive-950">
            <Link href={`/products/${product.slug}`} className="transition hover:text-olive-700">
              {product.name}
            </Link>
          </h3>

          <ProductPriceGroup
            pricing={product.pricing}
            className="mt-3 justify-center gap-2"
            currentClassName="text-[1.05rem] font-semibold text-olive-950"
            compareAtClassName="text-sm text-olive-500 line-through"
            variantClassName="hidden"
          />
        </div>
      </div>
    </article>
  );
}

export function FeaturedProductsSection({ products }: FeaturedProductsSectionProps) {
  const showcaseProducts = useMemo(() => products.slice(0, 8), [products]);
  const rowRef = useRef<HTMLDivElement>(null);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const categoryChips = useMemo(
    () => Array.from(new Set(showcaseProducts.map((product) => product.category))).slice(0, 3),
    [showcaseProducts],
  );

  useEffect(() => {
    const updateItemsPerView = () => {
      setItemsPerView(getItemsPerView(window.innerWidth));
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);

    return () => {
      window.removeEventListener("resize", updateItemsPerView);
    };
  }, []);

  useEffect(() => {
    const container = rowRef.current;

    if (!container) {
      return;
    }

    const updateScrollState = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 8);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8);
    };

    updateScrollState();
    container.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      resizeObserver.disconnect();
    };
  }, [showcaseProducts.length, itemsPerView]);

  const cardBasis = `calc((100% - ${(itemsPerView - 1) * CARD_GAP_PX}px) / ${itemsPerView})`;

  const handleScroll = (direction: -1 | 1) => {
    const container = rowRef.current;

    if (!container) {
      return;
    }

    const viewportStep = Math.max(container.clientWidth * 0.82, getScrollAmount(container));

    container.scrollBy({
      left: direction * viewportStep,
      behavior: "smooth",
    });
  };

  if (showcaseProducts.length === 0) {
    return null;
  }

  return (
    <section className="section-shell bg-[#ebe9e3]" aria-labelledby="featured-products-title">
      <Container className="relative">
        <div className="mx-auto max-w-[46rem] text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-olive-700">
            Featured products
          </p>
          <h2
            id="featured-products-title"
            className="mt-4 text-[2.95rem] leading-[0.95] sm:text-[3.85rem] lg:text-[4.35rem]"
          >
            Bestsellers for everyday pantry routines.
          </h2>
          <p className="mt-5 text-base leading-7 text-olive-800 sm:text-lg">
            Explore a focused edit of our most-requested seeds, spices, teas, and pantry staples.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
          <SectionChip label={`Best sellers ${String(showcaseProducts.length).padStart(2, "0")}`} accent />
          {categoryChips.map((category) => (
            <SectionChip key={category} label={category} />
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-[84rem]">
          <div className="mb-5 flex justify-end gap-3">
            <ScrollButton
              direction="left"
              disabled={!canScrollLeft}
              onClick={() => handleScroll(-1)}
            />
            <ScrollButton
              direction="right"
              disabled={!canScrollRight}
              onClick={() => handleScroll(1)}
            />
          </div>

          <div
            ref={rowRef}
            className="flex snap-x snap-mandatory gap-7 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {showcaseProducts.map((product) => (
              <FeaturedProductCard key={product.slug} product={product} cardBasis={cardBasis} />
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/products"
            className={buttonStyles({
              variant: "secondary",
              className: "min-h-11 px-5 py-3 text-sm",
            })}
          >
            View all products
          </Link>
        </div>
      </Container>
    </section>
  );
}
