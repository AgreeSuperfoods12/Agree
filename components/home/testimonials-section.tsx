import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import type { TestimonialItem } from "@/types/home";

interface TestimonialsSectionProps {
  items: TestimonialItem[];
}

export function TestimonialsSection({ items }: TestimonialsSectionProps) {
  return (
    <section className="section-shell">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="Social proof presented in a cleaner premium retail style."
          description="These cards are styled to feel like a storefront testimonial strip rather than a generic review section."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => (
            <article
              key={`${item.name}-${index}`}
              className="rounded-[1.9rem] border border-olive-950/8 bg-[#efe3f2] px-5 py-6 shadow-[0_18px_40px_-30px_rgba(19,32,24,0.2)] odd:bg-[#efe7dc] even:bg-[#e1ece8]"
            >
              <div className="grid size-12 place-items-center rounded-full bg-white text-sm font-semibold uppercase tracking-[0.18em] text-olive-950">
                {item.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <p className="mt-4 text-base leading-7 text-olive-900">&ldquo;{item.quote}&rdquo;</p>
              <div className="mt-5">
                <p className="text-sm font-semibold text-olive-950">{item.name}</p>
                <p className="text-sm text-olive-700">{item.role}</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-olive-700">
                  {item.productLabel}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
