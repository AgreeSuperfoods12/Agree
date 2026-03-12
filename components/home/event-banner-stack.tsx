import Image from "next/image";
import Link from "next/link";

import type { EventBannerItem } from "@/types/home";
import { Container } from "@/components/layout/container";
import { buttonStyles } from "@/components/ui/button";

interface EventBannerStackProps {
  items: EventBannerItem[];
}

export function EventBannerStack({ items }: EventBannerStackProps) {
  return (
    <section className="section-shell">
      <Container>
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-olive-700">
            Events and promotional banners
          </p>
          <h2 className="mt-3 text-4xl sm:text-5xl">Stacked promotional blocks keep the lower homepage active.</h2>
        </div>
        <div className="grid gap-4">
          {items.map((item) => (
            <article
              key={item.title}
              className="relative overflow-hidden rounded-[2.1rem] border border-olive-950/8 bg-olive-950 text-sand-50"
            >
              <div className="absolute inset-0">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="100vw"
                  className="object-cover opacity-35"
                />
              </div>
              <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-100/60">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-3 text-3xl text-sand-50">{item.title}</h3>
                  <p className="mt-3 max-w-3xl leading-7 text-sand-100/78">{item.description}</p>
                </div>
                <Link
                  href={item.ctaHref}
                  className={buttonStyles({
                    variant: "secondary",
                    size: "lg",
                    className: "bg-white text-olive-950",
                  })}
                >
                  {item.ctaLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
