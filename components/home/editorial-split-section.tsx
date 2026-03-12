import Image from "next/image";
import Link from "next/link";

import type { EditorialSplitContent } from "@/types/home";
import { Container } from "@/components/layout/container";
import { buttonStyles } from "@/components/ui/button";

interface EditorialSplitSectionProps {
  content: EditorialSplitContent;
}

export function EditorialSplitSection({ content }: EditorialSplitSectionProps) {
  return (
    <section className="section-shell">
      <Container>
        <div
          className={`grid gap-8 lg:grid-cols-2 lg:items-center ${
            content.reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div className="image-stage relative aspect-[4/3.1] overflow-hidden">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="premium-panel p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-olive-700">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 text-4xl sm:text-5xl">{content.title}</h2>
            <p className="mt-5 text-lg leading-8 text-olive-800">{content.description}</p>
            <div className="mt-5 space-y-4 text-base leading-8 text-olive-800">
              {content.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {content.highlights?.length ? (
              <div className="mt-6 flex flex-wrap gap-3">
                {content.highlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-olive-950/8 bg-sand-50 px-4 py-2 text-sm font-medium text-olive-900"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
            <Link href={content.ctaHref} className={buttonStyles({ className: "mt-8" })}>
              {content.ctaLabel}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
