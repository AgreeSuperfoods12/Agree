import Image from "next/image";
import Link from "next/link";

import type { UsageCard } from "@/types/home";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { buttonStyles } from "@/components/ui/button";

interface UsageInspirationSectionProps {
  items: UsageCard[];
}

export function UsageInspirationSection({ items }: UsageInspirationSectionProps) {
  return (
    <section className="section-shell">
      <Container>
        <SectionHeading
          eyebrow="Fuel your routine"
          title="Usage inspiration cards help the homepage feel useful as well as merchandised."
          description="These modules can later support recipes, guides, or internal linking into richer editorial and commerce flows."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.title} className="group overflow-hidden rounded-[2rem] border border-olive-950/8 bg-white shadow-[0_18px_40px_-30px_rgba(19,32,24,0.22)]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1024px) 32vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl">{item.title}</h3>
                <p className="mt-3 leading-7 text-olive-800">{item.description}</p>
                <Link href={item.href} className={buttonStyles({ variant: "secondary", className: "mt-6" })}>
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
