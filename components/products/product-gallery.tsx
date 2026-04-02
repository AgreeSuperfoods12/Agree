"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { isPackshotImage } from "@/lib/product-images";
import { cn } from "@/lib/utils";
import type { ProductHighlight } from "@/types/product";
import type { ContentImage } from "@/types/site";

interface ProductGalleryProps {
  name: string;
  images: ContentImage[];
  highlights: ProductHighlight[];
}

export function ProductGallery({ name, images, highlights }: ProductGalleryProps) {
  const safeImages = useMemo(() => images.filter((image) => Boolean(image.src)), [images]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (safeImages.length === 0) {
    return null;
  }

  const activeImage = safeImages[activeImageIndex] ?? safeImages[0];
  const activeIsPackshot = isPackshotImage(activeImage.src);
  const featuredHighlights = highlights.slice(0, 3);

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_14.25rem]">
      <div className="space-y-4">
        <div className="image-stage group relative aspect-[4/4.3] overflow-hidden">
          <div className="absolute left-5 top-5 z-20 rounded-full bg-white/95 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-olive-800">
            Premium product view
          </div>
          <div className="absolute right-5 top-5 z-20 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-olive-800">
            {activeImageIndex + 1}/{safeImages.length}
          </div>
          {activeIsPackshot ? (
            <div className="absolute inset-x-10 bottom-8 z-10 h-8 rounded-full bg-[#6b5835]/10 blur-xl" />
          ) : null}
          <Image
            src={activeImage.src}
            alt={activeImage.alt || `${name} product image ${activeImageIndex + 1}`}
            fill
            priority={activeImageIndex === 0}
            sizes="(min-width: 1280px) 42vw, (min-width: 768px) 50vw, 100vw"
            className={cn(
              "transition duration-500 group-hover:scale-[1.03]",
              activeIsPackshot ? "object-contain p-4 sm:p-8" : "object-cover",
            )}
          />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(180deg,transparent,rgba(19,32,24,0.16))]" />
        </div>

        <div className="flex gap-3 overflow-x-auto pb-1">
          {safeImages.map((image, index) => {
            const isSelected = index === activeImageIndex;
            const isPackshot = isPackshotImage(image.src);

            return (
              <button
                key={`${image.src}-${index}`}
                type="button"
                onClick={() => setActiveImageIndex(index)}
                className={cn(
                  "relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border bg-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-950 sm:h-24 sm:w-24",
                  isSelected
                    ? "border-olive-950/35 shadow-[0_14px_30px_-20px_rgba(19,32,24,0.7)]"
                    : "border-olive-950/12 hover:border-olive-950/25",
                )}
                aria-label={`View image ${index + 1} of ${name}`}
                aria-pressed={isSelected}
              >
                <Image
                  src={image.src}
                  alt={image.alt || `${name} thumbnail ${index + 1}`}
                  fill
                  sizes="96px"
                  className={isPackshot ? "object-contain p-1.5" : "object-cover"}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4">
        {featuredHighlights.map((item) => (
          <div key={item.title} className="card-surface flex flex-col justify-between p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-olive-700">
              {item.title}
            </p>
            <p className="mt-4 text-2xl text-olive-950">{item.value}</p>
            <p className="mt-2 text-sm leading-6 text-olive-800">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
