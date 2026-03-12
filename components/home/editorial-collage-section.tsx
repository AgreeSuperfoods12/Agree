import Image from "next/image";
import Link from "next/link";

import type { CollageItem } from "@/types/home";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";

interface EditorialCollageSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  items: CollageItem[];
}

export function EditorialCollageSection({
  eyebrow,
  title,
  description,
  items,
}: EditorialCollageSectionProps) {
  return (
    <section className="section-shell">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="image-stage relative aspect-[4/3] overflow-hidden">
            <Image
              src={items[0].image.src}
              alt={items[0].image.alt}
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(19,32,24,0.68))]" />
            <div className="absolute inset-x-6 bottom-6">
              <h3 className="text-3xl text-sand-50">{items[0].title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-6 text-sand-100/78">
                {items[0].description}
              </p>
            </div>
          </article>
          <div className="grid gap-5">
            {items.slice(1).map((item) => {
              const card = (
                <article
                  key={item.title}
                  className="group overflow-hidden rounded-[2rem] border border-olive-950/8 bg-white shadow-[0_18px_40px_-30px_rgba(19,32,24,0.24)]"
                >
                  <div className="relative aspect-[4/2.2] overflow-hidden">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(min-width: 1024px) 35vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl">{item.title}</h3>
                    <p className="mt-3 leading-7 text-olive-800">{item.description}</p>
                  </div>
                </article>
              );

              return item.href ? (
                <Link key={item.title} href={item.href}>
                  {card}
                </Link>
              ) : (
                card
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
