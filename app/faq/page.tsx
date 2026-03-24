import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo/metadata";
import { getSiteContent } from "@/lib/content/site";
import { getBreadcrumbSchema, getFaqSchema } from "@/lib/seo/schema";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { PageHero } from "@/components/shared/page-hero";

export const metadata: Metadata = buildMetadata({
  title: "FAQ",
  description:
    "Read frequently asked questions about Agree Superfoods products, ordering, support, and brand information.",
  path: "/faq",
});

export default async function FaqPage() {
  const siteContent = await getSiteContent();

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "FAQ", href: "/faq" },
        ])}
      />
      <JsonLd data={getFaqSchema(siteContent.globalFaqs)} />
      <PageHero
        eyebrow="FAQ"
        title="Clear answers for customers, retailers, and wholesale buyers."
        description="These questions cover how the brand works, how to order, and what to expect from Agree Superfoods."
      />
      <section className="section-shell pt-0">
        <Container>
          <FaqAccordion items={siteContent.globalFaqs} />
        </Container>
      </section>
    </>
  );
}
