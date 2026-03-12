import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo/metadata";
import { getSiteContent } from "@/lib/content/site";
import { getBreadcrumbSchema } from "@/lib/seo/schema";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PageHero } from "@/components/shared/page-hero";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about Agree Superfoods, a premium Indian wellness pantry brand built on quality, clarity, and everyday use.",
  path: "/about",
});

export default async function AboutPage() {
  const siteContent = await getSiteContent();

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "About Us", href: "/about" },
        ])}
      />
      <PageHero
        eyebrow="About Agree"
        title="An Indian wellness pantry brand shaped by quality, clarity, and everyday use."
        description="Agree Superfoods was created to make familiar healthy foods feel more premium, more trustworthy, and easier to explore for both households and business buyers."
      />
      <section className="section-shell">
        <Container className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="card-surface p-8 sm:p-10">
            <h2 className="text-3xl">Brand story</h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-olive-800">
              {siteContent.brandStory.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="grid gap-5">
            {siteContent.packagingStory.map((paragraph) => (
              <article key={paragraph} className="card-surface p-6">
                <h2 className="text-2xl">Packaging-inspired direction</h2>
                <p className="mt-4 leading-7 text-olive-800">{paragraph}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="section-shell pt-0">
        <Container className="grid gap-5 md:grid-cols-3">
          {siteContent.qualityPillars.map((item) => (
            <article key={item.title} className="card-surface p-6">
              <h2 className="text-2xl">{item.title}</h2>
              <p className="mt-4 leading-7 text-olive-800">{item.description}</p>
            </article>
          ))}
        </Container>
      </section>
      <CtaBanner
        title="Want to know more about the range or the brand?"
        description="Reach out for product details, gifting interest, retail conversations, or wholesale support."
        primaryHref="/contact"
        primaryLabel="Contact Agree"
        secondaryHref="/compliance"
        secondaryLabel="View compliance"
      />
    </>
  );
}
