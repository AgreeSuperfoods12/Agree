import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo/metadata";
import { getCompliancePageContent } from "@/lib/content/site";
import { getBreadcrumbSchema } from "@/lib/seo/schema";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PageHero } from "@/components/shared/page-hero";
import { buttonStyles } from "@/components/ui/button";

export const metadata: Metadata = buildMetadata({
  title: "Compliance & Certifications",
  description:
    "Review the official business and certification presentation for Agree Superfoods, including GST registration, jurisdiction details, and published certificate documents.",
  path: "/compliance",
});

export default async function CompliancePage() {
  const pageContent = await getCompliancePageContent();
  const registrations = siteConfig.business.registrations;
  const registrationCards = [
    { label: "GSTIN / UIN", value: registrations.gstin },
    { label: "Trade name", value: registrations.tradeName },
    { label: "Date of registration", value: registrations.dateOfRegistration },
    ...(registrations.coreBusinessActivity
      ? [{ label: "Core business activity", value: registrations.coreBusinessActivity }]
      : []),
  ].filter((item): item is { label: string; value: string } => Boolean(item.value));
  const profileCards = [
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
        siteConfig.business.records.gstNumber || "Shared through verified business communication",
    },
    {
      label: "Food licence / FSSAI",
      value:
        siteConfig.business.records.fssaiLicense || "Published through official business documents",
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
  ];

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
        <Container>
          <div className="overflow-hidden rounded-[2.4rem] border border-olive-950/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(249,245,238,0.98))] p-6 shadow-[0_34px_90px_-54px_rgba(19,32,24,0.26)] sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr]">
              <div className="max-w-[32rem]">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-olive-700">
                  Official registrations
                </p>
                <h2 className="mt-4 text-4xl sm:text-5xl">Verified business identity for trust-led communication.</h2>
                <p className="mt-5 text-base leading-8 text-olive-800 sm:text-lg">
                  Agree Superfoods now publishes its GST registration details, jurisdiction
                  information, and supporting certificate documents so customers and trade buyers
                  can review a more official business profile from the website itself.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  {siteConfig.business.certificationDocuments.slice(0, 2).map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className={buttonStyles({
                        variant: item.title.includes("GST") ? "primary" : "secondary",
                        className: item.title.includes("GST") ? "" : "bg-white",
                      })}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {registrationCards.map((item) => (
                    <article
                      key={item.label}
                      className="rounded-[1.6rem] border border-olive-950/8 bg-white/82 p-5"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-700">
                        {item.label}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-olive-950">{item.value}</p>
                    </article>
                  ))}
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <article className="rounded-[1.7rem] border border-olive-950/8 bg-sand-50 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-700">
                      Centre jurisdiction
                    </p>
                    <p className="mt-3 text-sm leading-7 text-olive-900">
                      {registrations.centreJurisdiction}
                    </p>
                  </article>
                  <article className="rounded-[1.7rem] border border-olive-950/8 bg-sand-50 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-700">
                      State jurisdiction
                    </p>
                    <p className="mt-3 text-sm leading-7 text-olive-900">
                      {registrations.stateJurisdiction}
                    </p>
                  </article>
                </div>

                {registrations.businessActivities.length > 0 ? (
                  <article className="rounded-[1.7rem] border border-olive-950/8 bg-white/82 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-700">
                      Nature of business activities
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {registrations.businessActivities.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-olive-950/10 bg-sand-50 px-4 py-2 text-sm text-olive-900"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </article>
                ) : null}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-shell pt-0">
        <Container>
          <div className="card-surface p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-olive-700">
                  Certificates & documents
                </p>
                <h2 className="mt-3 text-3xl">Downloadable supporting records</h2>
              </div>
              <p className="max-w-[34rem] text-sm leading-7 text-olive-700">
                These files are published to strengthen trust and help customers, trade buyers, and
                wholesale partners review official records from the website.
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {siteConfig.business.certificationDocuments.map((item) => (
                <article
                  key={item.title}
                  className="flex h-full flex-col rounded-[1.6rem] border border-olive-950/8 bg-white px-5 py-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-olive-700">
                      {item.fileLabel || "Document"}
                    </p>
                    {item.issuedOn ? (
                      <span className="text-xs text-olive-500">{item.issuedOn}</span>
                    ) : null}
                  </div>
                  <h3 className="mt-4 text-2xl">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-olive-800">{item.description}</p>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-olive-950 transition hover:text-olive-700"
                  >
                    Open document
                    <span className="inline-flex size-8 items-center justify-center rounded-full border border-olive-950/10 bg-sand-50">
                      +
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

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
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {siteConfig.business.complianceSignals.map((item) => (
                <article key={item.title} className="rounded-[1.5rem] bg-sand-50 p-5">
                  <h3 className="text-xl">{item.title}</h3>
                  <p className="mt-3 text-sm font-medium text-olive-950">{item.status}</p>
                  <p className="mt-2 text-sm leading-6 text-olive-800">{item.description}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {profileCards.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.5rem] border border-olive-950/8 bg-white p-5"
                >
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
