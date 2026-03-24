import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo/metadata";
import { getSiteContent } from "@/lib/content/site";
import { getBreadcrumbSchema } from "@/lib/seo/schema";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PageHero } from "@/components/shared/page-hero";
import { buttonStyles } from "@/components/ui/button";

export const metadata: Metadata = buildMetadata({
  title: "Order on WhatsApp",
  description:
    "Order Agree Superfoods on WhatsApp for product support, final pricing, gifting, or wholesale follow-up.",
  path: "/contact",
});

export default async function ContactPage() {
  const siteContent = await getSiteContent();

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Order on WhatsApp", href: "/contact" },
        ])}
      />
      <PageHero
        eyebrow="Order support"
        title="Place your order on WhatsApp and get a direct response from Agree Superfoods."
        description="Use this page to start a product order, confirm pricing, ask about gifting, or share a bulk requirement. The simplest route right now is WhatsApp."
      >
        <div className="grid gap-3 sm:grid-cols-3">
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
              WhatsApp
            </p>
            <p className="mt-2 text-sm leading-6 text-olive-900">{siteConfig.business.records.phone}</p>
          </div>
          <div className="rounded-[1.5rem] border border-olive-950/8 bg-white/78 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-700">
              Order flow
            </p>
            <p className="mt-2 text-sm leading-6 text-olive-900">
              Choose products, message on WhatsApp, confirm final price
            </p>
          </div>
        </div>
      </PageHero>
      <section className="section-shell pt-0">
        <Container className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="grid gap-5">
            <div className="dark-panel p-6 sm:p-8">
              <h2 className="text-2xl text-sand-50">How ordering works</h2>
              <div className="mt-5 grid gap-3">
                {[
                  "Browse the product pages and note what you want to buy.",
                  "Tap the WhatsApp order button and send your requirement.",
                  "Confirm final price, delivery location, and payment details on WhatsApp.",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-sand-100/78"
                  >
                    <span className="mr-2 font-semibold text-sand-50">0{index + 1}.</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="dark-panel p-6 sm:p-8">
              <h2 className="text-2xl text-sand-50">What we can help with</h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-sand-100/78">
                {siteContent.contactHighlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <div className="card-surface p-6">
                <h2 className="text-2xl">Retail orders</h2>
                <p className="mt-4 text-sm leading-7 text-olive-800">
                  Use WhatsApp for product questions, gifting interest, repeat orders, and quick
                  support around the range.
                </p>
              </div>
              <div className="card-surface p-6">
                <h2 className="text-2xl">Wholesale route</h2>
                <p className="mt-4 text-sm leading-7 text-olive-800">
                  For trade, distribution, hospitality, or larger quantity requests, use the
                  dedicated wholesale flow after your first product review.
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
                  className={buttonStyles({ className: "mt-6" })}
                >
                  {siteConfig.business.whatsappLabel}
                </Link>
              ) : null}
            </div>
          </div>
          <div className="grid gap-5">
            <div className="premium-panel p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-olive-700">
                Best way to order
              </p>
              <h2 className="mt-4 text-3xl">WhatsApp is the main order channel right now.</h2>
              <p className="mt-4 text-base leading-8 text-olive-800">
                The website helps you compare products and pricing, but final order confirmation
                happens on WhatsApp so the team can share current availability, delivery details,
                and payment steps in one place.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {siteConfig.business.whatsappUrl ? (
                  <Link href={siteConfig.business.whatsappUrl} className={buttonStyles({ size: "lg" })}>
                    {siteConfig.business.whatsappLabel}
                  </Link>
                ) : null}
                <Link href="/products" className={buttonStyles({ variant: "secondary", size: "lg" })}>
                  Browse Products
                </Link>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="card-surface p-6">
                <h2 className="text-2xl">Before you message</h2>
                <p className="mt-4 text-sm leading-7 text-olive-800">
                  Mention the product names, pack sizes, quantity, and city so the team can reply
                  faster with the right quote.
                </p>
              </div>
              <div className="card-surface p-6">
                <h2 className="text-2xl">For bulk buyers</h2>
                <p className="mt-4 text-sm leading-7 text-olive-800">
                  Share your business type, estimated quantity, and delivery location if you need
                  wholesale pricing or a trade discussion.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <CtaBanner
        title="Need bulk, distribution, or wholesale support?"
        description="If your requirement is trade-led, use the dedicated bulk and wholesale route so the team can review quantity, catalogue, and delivery needs properly."
        primaryHref="/wholesale"
        primaryLabel="Bulk / Wholesale"
        secondaryHref="/products"
        secondaryLabel="Explore Products"
      />
    </>
  );
}
