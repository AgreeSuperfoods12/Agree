"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { useMarket } from "@/components/providers/market-provider";
import { buttonStyles } from "@/components/ui/button";
import { isPackshotImage } from "@/lib/product-images";
import { getPricingDisplay } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { buildProductOrderWhatsAppUrl } from "@/lib/whatsapp";
import type { Product } from "@/types/product";

interface HeroProductStripProps {
  eyebrow: string;
  title: string;
  products: Product[];
}

interface StripMediaItem {
  src: string;
  alt: string;
  fit: "cover" | "contain";
}

interface StripProduct extends Product {
  frontMedia: StripMediaItem;
  hoverMedia: StripMediaItem;
  quickViewMedia: StripMediaItem[];
  cornerLabel: string;
  topChip?: string;
  displayPrice: string;
  comparePrice?: string;
  variantLabel: string;
}

function uniqueMedia(items: StripMediaItem[]) {
  return items.filter((item, index, array) => array.findIndex((entry) => entry.src === item.src) === index);
}

function toStripMediaItem(image: Product["images"][number] | undefined): StripMediaItem | null {
  if (!image) {
    return null;
  }

  return {
    src: image.src,
    alt: image.alt,
    fit: isPackshotImage(image.src) ? "contain" : "cover",
  };
}

function buildStripProduct(
  product: Product,
  marketCode: Parameters<typeof getPricingDisplay>[1],
): StripProduct {
  const leadMedia = toStripMediaItem(product.images[0]) ?? {
    src: "",
    alt: `${product.name} product image`,
    fit: "contain" as const,
  };
  const hoverMedia = toStripMediaItem(product.images[1]) ?? leadMedia;
  const price = getPricingDisplay(product.pricing, marketCode);
  const quickViewMedia = uniqueMedia(
    [
      leadMedia,
      hoverMedia.src !== leadMedia.src ? hoverMedia : null,
    ].filter((item): item is StripMediaItem => Boolean(item)),
  );

  return {
    ...product,
    frontMedia: leadMedia,
    hoverMedia,
    quickViewMedia,
    cornerLabel: "New",
    topChip: price.discountPercentage ? `-${price.discountPercentage}%` : undefined,
    displayPrice: price.current,
    comparePrice: price.compareAt ?? undefined,
    variantLabel: price.variantLabel,
  };
}

function getScrollAmount(container: HTMLDivElement) {
  const card = container.querySelector<HTMLElement>("[data-hero-strip-card]");
  const styles = window.getComputedStyle(container);
  const gap = Number.parseFloat(styles.columnGap || styles.gap || "20");

  return card ? card.offsetWidth + gap : container.clientWidth * 0.9;
}

export function HeroProductStrip({ eyebrow, title, products }: HeroProductStripProps) {
  const { marketCode } = useMarket();
  const rowRef = useRef<HTMLDivElement>(null);
  const [activeProductSlug, setActiveProductSlug] = useState<string | null>(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const stripProducts = useMemo(
    () => products.map((product) => buildStripProduct(product, marketCode)),
    [marketCode, products],
  );

  const activeProduct =
    stripProducts.find((product) => product.slug === activeProductSlug) ?? null;

  useEffect(() => {
    if (!activeProductSlug) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProductSlug(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProductSlug]);

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
    const resizeObserver = new ResizeObserver(() => updateScrollState());
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      resizeObserver.disconnect();
    };
  }, [stripProducts.length]);

  const handleQuickViewOpen = (productSlug: string) => {
    setActiveProductSlug(productSlug);
    setActiveMediaIndex(0);
  };

  const handleStripScroll = (direction: -1 | 1) => {
    const container = rowRef.current;

    if (!container) {
      return;
    }

    container.scrollBy({
      left: direction * getScrollAmount(container),
      behavior: "smooth",
    });
  };

  return (
    <>
      <section
        className="relative z-10 -mt-28 pb-8 sm:-mt-32 lg:-mt-36 xl:-mt-40"
        aria-labelledby="hero-featured-products"
      >
        <Container className="relative">
          <h2 id="hero-featured-products" className="sr-only">
            {eyebrow}: {title}
          </h2>

          <div className="absolute right-5 top-2 z-20 hidden items-center gap-2 sm:right-7 lg:flex lg:right-8 xl:right-10">
            <StripControlButton
              direction="left"
              disabled={!canScrollLeft}
              onClick={() => handleStripScroll(-1)}
            />
            <StripControlButton
              direction="right"
              disabled={!canScrollRight}
              onClick={() => handleStripScroll(1)}
            />
          </div>

          <div
            ref={rowRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 pt-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:pt-14"
          >
            {stripProducts.map((product) => (
              <HeroStripCard
                key={product.slug}
                product={product}
                onQuickViewOpen={() => handleQuickViewOpen(product.slug)}
              />
            ))}
          </div>
        </Container>
      </section>

      {activeProduct ? (
        <QuickViewModal
          product={activeProduct}
          activeMediaIndex={activeMediaIndex}
          onMediaChange={setActiveMediaIndex}
          onClose={() => setActiveProductSlug(null)}
        />
      ) : null}
    </>
  );
}

interface HeroStripCardProps {
  product: StripProduct;
  onQuickViewOpen: () => void;
}

function HeroStripCard({ product, onQuickViewOpen }: HeroStripCardProps) {
  return (
    <article
      data-hero-strip-card
      className="group relative min-w-[17rem] shrink-0 basis-[80vw] snap-start transition-transform duration-300 ease-out hover:-translate-y-1 sm:min-w-[18rem] sm:basis-[42vw] lg:min-w-0 lg:basis-[calc(25%-0.9375rem)]"
    >
      <div className="relative overflow-hidden rounded-[1.7rem] border border-[#cad7c8] bg-[#dfe9d8]/94 p-3 shadow-[0_24px_70px_-44px_rgba(19,32,24,0.48)] transition duration-300 group-hover:shadow-[0_38px_90px_-48px_rgba(19,32,24,0.56)]">
        <span className="absolute left-3 top-3 z-10 rounded-sm bg-[#f09b73] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-olive-950">
          {product.cornerLabel}
        </span>
        {product.topChip ? (
          <span className="absolute right-3 top-3 z-10 rounded-sm bg-[#dac6f4] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-olive-950">
            {product.topChip}
          </span>
        ) : null}

        <Link href={`/products/${product.slug}`} className="block">
          <div className="relative aspect-[0.97] overflow-hidden rounded-[1.35rem] bg-[#e7efe1]">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(19,32,24,0.06))]" />

            <div className="absolute inset-0">
              <Image
                src={product.frontMedia.src}
                alt={product.frontMedia.alt}
                fill
                sizes="(min-width: 1440px) 19rem, (min-width: 1024px) 22vw, (min-width: 640px) 42vw, 80vw"
                className={cn(
                  "object-cover transition duration-500 ease-out",
                  "group-hover:-translate-y-2 group-hover:scale-[0.95] group-hover:opacity-0",
                )}
              />

              <Image
                src={product.hoverMedia.src}
                alt={product.hoverMedia.alt}
                fill
                sizes="(min-width: 1440px) 19rem, (min-width: 1024px) 22vw, (min-width: 640px) 42vw, 80vw"
                className={cn(
                  "translate-y-7 scale-[1.04] object-cover opacity-0 transition duration-500 ease-out",
                  "group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100",
                )}
              />
            </div>
          </div>
        </Link>

        <div className="absolute bottom-4 right-4 z-20 flex flex-col items-end gap-2">
          <button
            type="button"
            onClick={onQuickViewOpen}
            className="grid size-10 place-items-center rounded-full border border-white/80 bg-white/96 text-olive-950 shadow-[0_18px_34px_-22px_rgba(19,32,24,0.55)] opacity-100 transition duration-200 hover:scale-[1.03] hover:bg-white lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
            aria-label={`Open quick view for ${product.name}`}
          >
            <EyeIcon />
          </button>

          <Link
            href={`/products/${product.slug}`}
            className="grid size-11 place-items-center rounded-full bg-[#cebfd5] text-olive-950 shadow-[0_14px_28px_-18px_rgba(19,32,24,0.5)] transition duration-200 hover:scale-[1.03] hover:bg-[#c7b4d0]"
            aria-label={`View ${product.name}`}
          >
            <PlusIcon />
          </Link>
        </div>
      </div>

      <div className="px-2 pb-2 pt-5 text-center">
        <Link href={`/products/${product.slug}`} className="inline-flex">
          <h3 className="font-sans text-[1.05rem] font-semibold tracking-[-0.02em] text-olive-950 transition hover:text-olive-700 sm:text-[1.12rem]">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-olive-500">
          {product.variantLabel}
        </p>
        <div className="mt-1.5 flex items-center justify-center gap-2 text-[0.95rem] text-olive-950">
          <span className="font-medium">{product.displayPrice}</span>
          {product.comparePrice ? (
            <span className="text-sm text-olive-500 line-through">{product.comparePrice}</span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

interface QuickViewModalProps {
  product: StripProduct;
  activeMediaIndex: number;
  onMediaChange: (index: number) => void;
  onClose: () => void;
}

function QuickViewModal({
  product,
  activeMediaIndex,
  onMediaChange,
  onClose,
}: QuickViewModalProps) {
  const activeMedia = product.quickViewMedia[activeMediaIndex] ?? product.quickViewMedia[0];

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`quick-view-${product.slug}`}
    >
      <button
        type="button"
        aria-label="Close quick view"
        onClick={onClose}
        className="absolute inset-0 bg-olive-950/60 backdrop-blur-[2px]"
      />

      <div className="relative z-10 grid w-full max-w-[71rem] overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-[0_40px_120px_-42px_rgba(19,32,24,0.7)] lg:grid-cols-[1.05fr_1fr]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 grid size-11 place-items-center rounded-full border border-olive-950/10 bg-white/95 text-olive-700 transition hover:bg-sand-50 hover:text-olive-950"
          aria-label="Close quick view"
        >
          <CloseIcon />
        </button>

        <div className="border-b border-olive-950/8 p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <div className="relative aspect-[0.96] overflow-hidden rounded-[1.65rem] bg-[radial-gradient(circle_at_50%_0%,#eef5e8_0,#dce9d6_64%,#d1ded0_100%)]">
            <Image
              src={activeMedia.src}
              alt={activeMedia.alt}
              fill
              sizes="(min-width: 1280px) 34rem, (min-width: 1024px) 45vw, 92vw"
              className={cn(
                "transition duration-300",
                activeMedia.fit === "contain" ? "object-contain p-8" : "object-cover",
              )}
            />
          </div>

          <div className="mt-4 flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {product.quickViewMedia.map((media, index) => (
              <button
                key={`${product.slug}-media-${index}-${media.src}`}
                type="button"
                onClick={() => onMediaChange(index)}
                className={cn(
                  "relative h-24 w-24 shrink-0 overflow-hidden rounded-[1rem] border bg-olive-50 transition",
                  activeMediaIndex === index
                    ? "border-olive-950 shadow-[0_14px_28px_-18px_rgba(19,32,24,0.38)]"
                    : "border-olive-950/10 hover:border-olive-950/35",
                )}
                aria-label={`Show image ${index + 1} for ${product.name}`}
              >
                <Image
                  src={media.src}
                  alt={media.alt}
                  fill
                  sizes="96px"
                  className={media.fit === "contain" ? "object-contain p-2" : "object-cover"}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-olive-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-olive-700">
              {product.category}
            </span>
            <span className="rounded-full bg-[#dac6f4]/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-olive-950">
              {product.badge}
            </span>
            <span className="rounded-full border border-olive-950/10 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-olive-950">
              {product.variantLabel}
            </span>
          </div>

          <h3
            id={`quick-view-${product.slug}`}
            className="mt-5 font-sans text-[2.25rem] font-semibold tracking-[-0.03em] text-olive-950 sm:text-[2.65rem]"
          >
            {product.name}
          </h3>

          <div className="mt-3 flex items-center gap-3 text-olive-950">
            <span className="text-lg font-semibold">{product.displayPrice}</span>
            {product.comparePrice ? (
              <span className="text-base text-olive-500 line-through">{product.comparePrice}</span>
            ) : null}
          </div>

          <p className="mt-4 text-base leading-8 text-olive-700">{product.description}</p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {product.highlights.slice(0, 4).map((item) => (
              <div
                key={`${product.slug}-${item.title}`}
                className="rounded-[1.2rem] border border-olive-950/8 bg-olive-50/60 p-4"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-olive-500">
                  {item.title}
                </p>
                <p className="mt-2 font-sans text-lg font-semibold text-olive-950">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-olive-700">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-olive-500">
              Best for
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.bestFor.slice(0, 3).map((item) => (
                <span
                  key={`${product.slug}-best-for-${item}`}
                  className="rounded-full border border-olive-950/10 bg-white px-4 py-2 text-sm text-olive-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              href={buildProductOrderWhatsAppUrl(product.name, product.variantLabel)}
              target="_blank"
              rel="noreferrer"
              onClick={onClose}
              className={buttonStyles({ size: "lg", className: "w-full" })}
            >
              Order on WhatsApp
            </Link>
            <Link
              href={`/products/${product.slug}`}
              onClick={onClose}
              className={buttonStyles({ variant: "secondary", size: "lg", className: "w-full" })}
            >
              View product
            </Link>
          </div>

          <div className="mt-6 rounded-[1.3rem] border border-olive-950/8 bg-olive-50/70 p-4 text-sm leading-6 text-olive-700">
            Use the full product page for detailed ingredients, usage ideas, related reading, and a clearer order flow.
            <Link
              href={`/products/${product.slug}`}
              onClick={onClose}
              className="mt-3 inline-flex items-center gap-2 font-semibold text-olive-950 transition hover:text-olive-700"
            >
              View full details
              <ArrowIcon direction="right" className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StripControlButtonProps {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}

function StripControlButton({ direction, disabled, onClick }: StripControlButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "grid size-11 place-items-center rounded-full border border-white/75 bg-white/95 text-olive-950 shadow-[0_18px_34px_-22px_rgba(19,32,24,0.45)] transition",
        disabled ? "cursor-not-allowed opacity-45" : "hover:scale-[1.03] hover:bg-white",
      )}
      aria-label={`Scroll ${direction}`}
    >
      <ArrowIcon direction={direction} className="size-5" />
    </button>
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
      className={cn("fill-none stroke-current stroke-[1.8]", className)}
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
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-none stroke-current stroke-[1.7]">
      <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-none stroke-current stroke-[1.9]">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-none stroke-current stroke-[1.8]">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}
