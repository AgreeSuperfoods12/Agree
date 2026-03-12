import Image from "next/image";

import { isPackshotImage } from "@/lib/product-images";
import type { ProductHighlight } from "@/types/product";
import type { ContentImage } from "@/types/site";

interface ProductGalleryProps {
  name: string;
  images: ContentImage[];
  highlights: ProductHighlight[];
}

export function ProductGallery({ name, images, highlights }: ProductGalleryProps) {
  const primaryImage = images[0];
  const secondaryImages = images.slice(1);
  const primaryIsPackshot = isPackshotImage(primaryImage.src);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.7fr]">
      <div className="image-stage relative aspect-[4/4.5] overflow-hidden">
        <div className="absolute left-5 top-5 z-20 rounded-full bg-white/92 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-olive-800">
          Agree Superfoods
        </div>
        {primaryIsPackshot ? (
          <div className="absolute inset-x-10 bottom-8 z-10 h-8 rounded-full bg-[#6b5835]/10 blur-xl" />
        ) : null}
        <Image
          src={primaryImage.src}
          alt={primaryImage.alt}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className={primaryIsPackshot ? "object-contain p-4 scale-[1.03] sm:p-6" : "object-cover"}
        />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(180deg,transparent,rgba(19,32,24,0.14))]" />
      </div>
      <div className="grid gap-4">
        {secondaryImages.length > 0
          ? secondaryImages.map((image) => (
              <div
                key={image.src}
                className="image-stage relative aspect-[4/3] overflow-hidden"
              >
                <Image
                  src={image.src}
                  alt={image.alt || `${name} detail`}
                  fill
                  sizes="(min-width: 768px) 25vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))
          : highlights.slice(0, 2).map((item) => (
              <div key={item.title} className="card-surface flex flex-col justify-between p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-olive-700">
                  {item.title}
                </p>
                <p className="mt-4 text-2xl text-olive-950">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-olive-800">{item.description}</p>
              </div>
            ))}
        <div className="dark-panel p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-100/65">
            Product support
          </p>
          <p className="mt-3 text-lg text-sand-50">
            Ask about bulk packs, gifting, or product details directly from the product page.
          </p>
        </div>
      </div>
    </div>
  );
}
