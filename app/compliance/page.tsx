import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo/metadata";
import { getCompliancePageContent } from "@/lib/content/site";
import { getBreadcrumbSchema } from "@/lib/seo/schema";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PageHero } from "@/components/shared/page-hero";

export const metadata: Metadata = buildMetadata({
  title: "Compliance & Certifications",
  description:
    "Review the business and compliance presentation for Agree Superfoods, including brand protection, food business communication, and support identity.",
  path: "/compliance",
});

export default async function CompliancePage() {
  const pageContent = await getCompliancePageContent();

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Compliance & Certifications", href: "/compliance" },
        ])}
      />
      <PageHero
        eyebrow="Compliance & certifications"
        title={pageContent.title}
        description={pageContent.intro}
      />
      <section className="section-shell pt-0">
        <Container className="grid gap-5 lg:grid-cols-2">
          {pageContent.sections.map((section) => (
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
      <section className="section-shell pt-0">
        <Container>
          <div className="card-surface p-6 sm:p-8">
            <h2 className="text-2xl">Public trust and business presentation</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {siteConfig.business.complianceSignals.slice(0, 3).map((item) => (
                <article key={item.title} className="rounded-[1.5rem] bg-sand-50 p-5">
                  <h3 className="text-xl">{item.title}</h3>
                  <p className="mt-3 text-sm font-medium text-olive-950">{item.status}</p>
                  <p className="mt-2 text-sm leading-6 text-olive-800">{item.description}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                {
                  label: "Business name",
                  value: siteConfig.business.records.businessName,
                },
                {
                  label: "Support email",
                  value: siteConfig.business.records.supportEmail,
                },
                {
                  label: "GST",
                  value:
                    siteConfig.business.records.gstNumber ||
                    "Shared through verified business communication",
                },
                {
                  label: "Food licence / FSSAI",
                  value:
                    siteConfig.business.records.fssaiLicense ||
                    "Shared through verified business communication",
                },
                {
                  label: "Trademark",
                  value:
                    siteConfig.business.records.trademarkStatus ||
                    "Managed through official brand documentation",
                },
                {
                  label: "Address",
                  value:
                    siteConfig.business.records.address ||
                    "Shared with verified retail and wholesale enquiries",
                },
              ].map((item) => (
                <div key={item.label} className="rounded-[1.5rem] border border-olive-950/8 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-olive-700">
                    {item.label}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-olive-900">{item.value}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-7 text-olive-700">{pageContent.disclaimer}</p>
          </div>
        </Container>
      </section>
      <CtaBanner
        title="Need verified business details for a serious trade conversation?"
        description="Contact the team if you need current support, product, or business information for retail, distribution, or wholesale discussions."
        primaryHref="/contact"
        primaryLabel="Contact Us"
        secondaryHref="/wholesale"
        secondaryLabel="Bulk / Wholesale"
      />
    </>
  );
}
