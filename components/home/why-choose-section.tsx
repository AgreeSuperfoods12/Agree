import { getSiteContent } from "@/lib/content/site";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";

export async function WhyChooseSection() {
  const siteContent = await getSiteContent();

  return (
    <section className="section-shell">
      <Container>
        <SectionHeading
          eyebrow="Why choose Agree"
          title="Quality-first products with the feel of a refined modern storefront."
          description="Every section is designed to help customers discover ingredients easily, understand how to use them, and feel confident reaching out for support or trade conversations."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="dark-panel p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sand-100/65">
              The Agree approach
            </p>
            <h3 className="mt-4 text-3xl text-sand-50 sm:text-4xl">
              Premium pantry choices presented with warmth, restraint, and trust.
            </h3>
            <p className="mt-5 max-w-xl leading-7 text-sand-100/78">
              The brand direction stays ingredient-first, easy to understand, and suitable for
              both households and business buyers. Nothing feels noisy or over-claimed.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {siteContent.whyChooseCards.map((item) => (
              <article key={item.title} className="card-surface p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-olive-700">
                  Agree standard
                </p>
                <h3 className="mt-4 text-2xl">{item.title}</h3>
                <p className="mt-4 leading-7 text-olive-800">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
