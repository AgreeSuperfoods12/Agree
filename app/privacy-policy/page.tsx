import type { Metadata } from "next";

import { privacySections } from "@/content/legal";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema } from "@/lib/seo/schema";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/shared/page-hero";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Review the Agree Superfoods privacy policy for enquiry data, analytics, and communications handling.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Privacy Policy", href: "/privacy-policy" },
        ])}
      />
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        description="This page explains how Agree Superfoods handles enquiry submissions, analytics, and communication-related information."
      />
      <section className="section-shell pt-0">
        <Container className="grid gap-5">
          {privacySections.map((section) => (
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
