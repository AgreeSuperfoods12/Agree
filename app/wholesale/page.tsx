import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo/metadata";
import { getSiteContent } from "@/lib/content/site";
import { siteConfig } from "@/lib/site-config";
import { getBreadcrumbSchema } from "@/lib/seo/schema";
import { WholesaleForm } from "@/components/forms/wholesale-form";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PageHero } from "@/components/shared/page-hero";

export const metadata: Metadata = buildMetadata({
  title: "Bulk / Wholesale Enquiry",
  description:
    "Submit a bulk or wholesale enquiry for Agree Superfoods covering retail, gifting, hospitality, and distribution requirements.",
  path: "/wholesale",
});

export default async function WholesalePage() {
  const siteContent = await getSiteContent();

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Bulk / Wholesale Enquiry", href: "/wholesale" },
        ])}
      />
      <PageHero
        eyebrow="Bulk / wholesale"
        title="Retail, gifting, hospitality, and wholesale support for the Agree Superfoods range."
        description="Use this form for serious business conversations around larger quantities, product interest, catalogue requests, and distributor or hospitality support."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-[1.5rem] border border-olive-950/8 bg-white/78 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-700">
              Trade support
            </p>
            <p className="mt-2 text-sm leading-6 text-olive-900">Retail, gifting, and hospitality</p>
          </div>
          <div className="rounded-[1.5rem] border border-olive-950/8 bg-white/78 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-700">
              Product focus
            </p>
            <p className="mt-2 text-sm leading-6 text-olive-900">Seeds, teas, makhana, essentials</p>
          </div>
          <div className="rounded-[1.5rem] border border-olive-950/8 bg-white/78 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-700">
              Response time
            </p>
            <p className="mt-2 text-sm leading-6 text-olive-900">
              {siteConfig.business.responseTime}
            </p>
          </div>
        </div>
      </PageHero>
      <section className="section-shell pt-0">
        <Container className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="grid gap-5">
            <div className="dark-panel p-6 sm:p-8">
              <h2 className="text-2xl text-sand-50">Why the range works for business</h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-sand-100/78">
                {siteContent.wholesaleBenefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="card-surface p-6">
              <h2 className="text-2xl">Typical enquiry topics</h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-olive-800">
                {siteConfig.business.wholesaleTopics.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="card-surface p-6">
              <h2 className="text-2xl">Before you submit</h2>
              <p className="mt-4 text-sm leading-7 text-olive-800">
                Sharing product interest, estimated quantity, city or state, and your business type
                helps the team respond with a more useful first reply.
              </p>
            </div>
          </div>
          <WholesaleForm />
        </Container>
      </section>
      <CtaBanner
        title="Need a faster first response on WhatsApp?"
        description="If you are still exploring the brand or want a quick product shortlist before a bulk discussion, start with the WhatsApp order route first."
        primaryHref="/contact"
        primaryLabel="Order on WhatsApp"
        secondaryHref="/compliance"
        secondaryLabel="View compliance"
      />
    </>
  );
}
