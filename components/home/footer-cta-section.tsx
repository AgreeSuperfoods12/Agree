import Image from "next/image";

import { TrackedLink } from "@/components/analytics/tracked-link";
import type { FooterCtaContent } from "@/types/home";
import { Container } from "@/components/layout/container";
import { buttonStyles } from "@/components/ui/button";

interface FooterCtaSectionProps {
  content: FooterCtaContent;
}

export function FooterCtaSection({ content }: FooterCtaSectionProps) {
  const primaryIsExternal = content.primaryHref.startsWith("http");
  const secondaryIsExternal = content.secondaryHref.startsWith("http");

  return (
    <section className="section-shell pb-10">
      <Container>
        <div className="relative overflow-hidden rounded-[2.4rem] border border-olive-950/8 bg-olive-950 text-sand-50">
          <div className="absolute inset-0">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              fill
              sizes="100vw"
              className="object-cover opacity-30"
            />
          </div>
          <div className="relative grid gap-8 px-6 py-10 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sand-100/60">
                {content.eyebrow}
              </p>
              <h2 className="mt-4 max-w-4xl text-4xl text-sand-50 sm:text-5xl">
                {content.title}
              </h2>
              <p className="mt-5 max-w-3xl leading-8 text-sand-100/78">{content.description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <TrackedLink
                href={content.primaryHref}
                target={primaryIsExternal ? "_blank" : undefined}
                rel={primaryIsExternal ? "noreferrer" : undefined}
                className={buttonStyles({ size: "lg" })}
                eventData={{ location: "footer_cta", label: content.primaryLabel }}
              >
                {content.primaryLabel}
              </TrackedLink>
              <TrackedLink
                href={content.secondaryHref}
                target={secondaryIsExternal ? "_blank" : undefined}
                rel={secondaryIsExternal ? "noreferrer" : undefined}
                className={buttonStyles({
                  variant: "secondary",
                  size: "lg",
                  className: "bg-white text-olive-950",
                })}
                eventData={{ location: "footer_cta", label: content.secondaryLabel }}
              >
                {content.secondaryLabel}
              </TrackedLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
