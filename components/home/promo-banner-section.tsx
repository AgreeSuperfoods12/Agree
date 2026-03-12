import Image from "next/image";
import Link from "next/link";

import type { PromoBannerContent } from "@/types/home";
import { Container } from "@/components/layout/container";
import { buttonStyles } from "@/components/ui/button";

interface PromoBannerSectionProps {
  content: PromoBannerContent;
}

export function PromoBannerSection({ content }: PromoBannerSectionProps) {
  const dark = content.theme === "dark";

  return (
    <section className="section-shell">
      <Container>
        <div className={`${dark ? "dark-panel" : "premium-panel"} overflow-hidden p-6 sm:p-8 lg:p-10`}>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="image-stage relative aspect-[4/2.6] overflow-hidden">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <p
                className={`text-xs font-semibold uppercase tracking-[0.3em] ${
                  dark ? "text-sand-100/60" : "text-olive-700"
                }`}
              >
                {content.eyebrow}
              </p>
              <h2 className={`mt-4 text-4xl sm:text-5xl ${dark ? "text-sand-50" : ""}`}>
                {content.title}
              </h2>
              <p
                className={`mt-5 max-w-2xl leading-8 ${
                  dark ? "text-sand-100/78" : "text-olive-800"
                }`}
              >
                {content.description}
              </p>
              <Link
                href={content.ctaHref}
                className={buttonStyles({
                  variant: dark ? "secondary" : "primary",
                  className: dark ? "mt-8 bg-white text-olive-950" : "mt-8",
                })}
              >
                {content.ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
