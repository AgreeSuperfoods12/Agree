import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo/metadata";
import { getSiteContent } from "@/lib/content/site";
import { getBreadcrumbSchema } from "@/lib/seo/schema";
import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PageHero } from "@/components/shared/page-hero";
import { buttonStyles } from "@/components/ui/button";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Contact Agree Superfoods for product questions, retail enquiries, gifting, or wholesale support.",
  path: "/contact",
});

export default async function ContactPage() {
  const siteContent = await getSiteContent();

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Contact Us", href: "/contact" },
        ])}
      />
      <PageHero
        eyebrow="Contact"
        title="Reach Agree Superfoods through a cleaner, business-ready contact route."
        description="Use this page for product questions, gifting interest, retail conversations, or support around the range. Trade and larger quantity requests can also be routed from here."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.5rem] border border-olive-950/8 bg-white/78 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-700">
              Response time
            </p>
            <p className="mt-2 text-sm leading-6 text-olive-900">
              {siteConfig.business.responseTime}
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-olive-950/8 bg-white/78 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-700">
              Support email
            </p>
            <p className="mt-2 text-sm leading-6 text-olive-900">{siteConfig.email}</p>
          </div>
        </div>
      </PageHero>
      <section className="section-shell pt-0">
        <Container className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="grid gap-5">
            <div className="dark-panel p-6 sm:p-8">
              <h2 className="text-2xl text-sand-50">How we can help</h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-sand-100/78">
                {siteContent.contactHighlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <div className="card-surface p-6">
                <h2 className="text-2xl">General enquiries</h2>
                <p className="mt-4 text-sm leading-7 text-olive-800">
                  Product questions, gifting interest, retail conversations, and first brand
                  introductions can all begin here.
                </p>
              </div>
              <div className="card-surface p-6">
                <h2 className="text-2xl">Wholesale route</h2>
                <p className="mt-4 text-sm leading-7 text-olive-800">
                  For trade, distribution, hospitality, or larger quantity requests, the team may
                  guide you to the dedicated wholesale flow.
                </p>
                <Link
                  href="/wholesale"
                  className={buttonStyles({ variant: "secondary", className: "mt-5" })}
                >
                  Bulk / Wholesale
                </Link>
              </div>
            </div>
            <div className="card-surface p-6">
              <h2 className="text-2xl">Direct details</h2>
              <div className="mt-5 space-y-4 text-sm leading-7 text-olive-800">
                {siteConfig.business.contactChannels.map((channel) =>
                  channel.href ? (
                    <p key={channel.label}>
                      <span className="font-medium text-olive-950">{channel.label}: </span>
                      <Link href={channel.href} className="underline-offset-4 hover:underline">
                        {channel.value}
                      </Link>
                    </p>
                  ) : (
                    <p key={channel.label}>
                      <span className="font-medium text-olive-950">{channel.label}: </span>
                      {channel.value}
                    </p>
                  ),
                )}
                <p>
                  <span className="font-medium text-olive-950">Response time: </span>
                  {siteConfig.business.responseTime}
                </p>
              </div>
              {siteConfig.business.whatsappUrl ? (
                <Link
                  href={siteConfig.business.whatsappUrl}
                  className={buttonStyles({ variant: "secondary", className: "mt-6" })}
                >
                  {siteConfig.business.whatsappLabel}
                </Link>
              ) : null}
            </div>
          </div>
          <ContactForm />
        </Container>
      </section>
      <CtaBanner
        title="Need bulk, distribution, or wholesale support?"
        description="If your enquiry is trade-led, use the dedicated bulk and wholesale form so it reaches the right team more quickly."
        primaryHref="/wholesale"
        primaryLabel="Bulk / Wholesale"
        secondaryHref="/products"
        secondaryLabel="Explore Products"
      />
    </>
  );
}
