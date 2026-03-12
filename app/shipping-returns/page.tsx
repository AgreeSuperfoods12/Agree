import type { Metadata } from "next";

import { shippingReturnsSections } from "@/content/legal";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema } from "@/lib/seo/schema";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/shared/page-hero";

export const metadata: Metadata = buildMetadata({
  title: "Shipping & Returns",
  description:
    "Find the current shipping and returns status for Agree Superfoods.",
  path: "/shipping-returns",
});

export default function ShippingReturnsPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Shipping & Returns", href: "/shipping-returns" },
        ])}
      />
      <PageHero
        eyebrow="Ordering status"
        title="Shipping & returns"
        description="Direct online ordering is not live yet. This page explains the current status and can be updated when ordering becomes available."
      />
      <section className="section-shell pt-0">
        <Container className="grid gap-5">
          {shippingReturnsSections.map((section) => (
            <article key={section.title} className="card-surface p-6 sm:p-8">
              <h2 className="text-2xl">{section.title}</h2>
              <div className="mt-4 space-y-4 leading-7 text-olive-800">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
