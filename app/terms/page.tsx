import type { Metadata } from "next";

import { termsSections } from "@/content/legal";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema } from "@/lib/seo/schema";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/shared/page-hero";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description:
    "Read the Agree Superfoods terms and conditions covering website use, content, and product information.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Terms & Conditions", href: "/terms" },
        ])}
      />
      <PageHero
        eyebrow="Legal"
        title="Terms & conditions"
        description="These terms apply to the current Agree Superfoods website and the content published on it."
      />
      <section className="section-shell pt-0">
        <Container className="grid gap-5">
          {termsSections.map((section) => (
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
