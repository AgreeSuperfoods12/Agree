import type { Metadata } from "next";
import Image from "next/image";

import { TrackedLink } from "@/components/analytics/tracked-link";
import { WholesaleForm } from "@/components/forms/wholesale-form";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { buttonStyles } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema, getFaqSchema } from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { FaqItem } from "@/types/site";

const whatsappLeadUrl = buildWhatsAppUrl(
  "Hi Agree Superfoods, I need wholesale purchase and end-to-end online shop support. Please share services, process, and pricing details.",
);

const supportEmail = siteConfig.email || siteConfig.business.records.supportEmail;
const emailLeadUrl = supportEmail
  ? `mailto:${supportEmail}?subject=Wholesale%20Purchase%20and%20Ecommerce%20Support%20Enquiry`
  : "#contact";
const schemaEmailTarget = supportEmail
  ? `mailto:${supportEmail}?subject=Wholesale%20Purchase%20and%20Ecommerce%20Support%20Enquiry`
  : absoluteUrl("/wholesale#contact");

const leadCtaLabel = supportEmail ? "Send Business Email" : "Open Contact Form";

const heroHighlights = [
  "WhatsApp-first lead handling for faster response.",
  "Wholesale sourcing + online shop setup in one plan.",
  `Target response time: ${siteConfig.business.responseTime}.`,
];

const serviceCards = [
  {
    title: "Wholesale Product Sourcing",
    description:
      "Find high-demand products for bulk purchase with category fit, margin potential, and practical buying clarity.",
    impact: "Better buying decisions before inventory commitment.",
  },
  {
    title: "Supplier Verification & Onboarding",
    description:
      "Validate supplier reliability, product quality readiness, and business credibility before placing large orders.",
    impact: "Lower procurement risk and fewer operational surprises.",
  },
  {
    title: "Bulk Purchase Negotiation",
    description:
      "Support MOQ, pricing, payment terms, and delivery alignment to improve cost control on first and repeat orders.",
    impact: "Healthier margin and stronger cash-flow control.",
  },
  {
    title: "Private Label & Packaging Support",
    description:
      "Plan brand-ready labels and packaging so products look trustworthy across retail shelves and online channels.",
    impact: "Higher trust and stronger brand positioning.",
  },
  {
    title: "Online Store Setup (Shopify/WooCommerce)",
    description:
      "Set up storefront structure, payment gateway, shipping rules, tax setup, and core conversion pages.",
    impact: "Launch quickly with a sales-ready website.",
  },
  {
    title: "Marketplace Setup",
    description:
      "Launch business accounts and channel setup for Amazon, Flipkart, Meesho, and similar marketplaces.",
    impact: "Expand reach through high-intent buying channels.",
  },
  {
    title: "Product Listing & SEO Content",
    description:
      "Write keyword-aligned titles, descriptions, and category metadata to improve discoverability and conversion quality.",
    impact: "Better organic visibility and listing performance.",
  },
  {
    title: "Performance Marketing",
    description:
      "Run Google and Meta campaigns for lead generation, product demand capture, and remarketing growth.",
    impact: "Qualified traffic with measurable ROI focus.",
  },
  {
    title: "Operations & Support Setup",
    description:
      "Design workflows for orders, shipping, returns, and support handover so operations remain stable as sales grow.",
    impact: "Smoother customer experience and repeat sale confidence.",
  },
  {
    title: "Monthly Growth Management",
    description:
      "Ongoing SEO, ads optimization, reporting, and strategic execution support for predictable scale.",
    impact: "Consistent growth through monthly accountability.",
  },
];

const processSteps = [
  {
    title: "Requirement Discovery",
    description:
      "We collect your product category, target customer, budget range, location, and expected launch timeline.",
  },
  {
    title: "Scope and Roadmap",
    description:
      "You receive a clear execution scope showing what we will do first, what follows next, and how leads are handled.",
  },
  {
    title: "Setup and Delivery",
    description:
      "Our team executes sourcing, store setup, marketplace onboarding, and listing structure based on approved scope.",
  },
  {
    title: "Launch and Optimization",
    description:
      "After go-live, we optimize conversion points, campaign quality, and operational flow based on early performance data.",
  },
  {
    title: "Scale Support",
    description:
      "If needed, continue with monthly support for SEO, paid growth, reporting, and business improvement planning.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "Can I get both wholesale sourcing and online shop setup in one package?",
    answer:
      "Yes. We provide combined support so procurement and ecommerce setup move in one direction instead of separate vendor silos.",
  },
  {
    question: "Is WhatsApp the main lead channel for starting the process?",
    answer:
      "Yes. WhatsApp is the fastest route for initial discussion and requirement qualification. Email and form are used for detailed handover.",
  },
  {
    question: "Do you support Amazon, Flipkart, and other marketplace onboarding?",
    answer:
      "Yes. We support account setup, listing structure, and launch-readiness for major marketplace channels.",
  },
  {
    question: "Can you support private label and packaging as well?",
    answer:
      "Yes. Packaging and private label support are included when your business model requires brand-led selling.",
  },
  {
    question: "What should I include in the enquiry for faster response?",
    answer:
      "Share business type, category, quantity target, city/state, and expected launch timeline so the team can qualify quickly.",
  },
  {
    question: "Do you offer support after setup is complete?",
    answer:
      "Yes. Monthly growth management is available for SEO, ads optimization, and performance review support.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Wholesale Purchase and Ecommerce Business Support Services",
  description:
    "End-to-end wholesale sourcing, supplier verification, online store setup, marketplace onboarding, and growth support in India.",
  serviceType: [
    "Wholesale purchase support",
    "Supplier verification",
    "Shopify setup",
    "WooCommerce setup",
    "Marketplace onboarding",
    "SEO and performance marketing",
  ],
  url: absoluteUrl("/wholesale"),
  areaServed: "IN",
  provider: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
  },
  potentialAction: {
    "@type": "CommunicateAction",
    target: [whatsappLeadUrl, schemaEmailTarget, absoluteUrl("/wholesale#contact")],
  },
};

const serviceListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Wholesale and ecommerce services",
  itemListElement: serviceCards.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.title,
    description: item.description,
  })),
};

const processHowToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How our wholesale and ecommerce support process works",
  description: "Step-by-step process from requirement discovery to growth support.",
  totalTime: "P30D",
  step: processSteps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.title,
    text: step.description,
    url: `${absoluteUrl("/wholesale")}#process`,
  })),
};

export const metadata: Metadata = buildMetadata({
  title: "Wholesale Purchase, Shopify Setup & Ecommerce Support in India",
  description:
    "B2B wholesale sourcing, supplier verification, online shop setup, marketplace onboarding, SEO, and growth support in India.",
  path: "/wholesale",
  keywords: [
    "wholesale purchase services",
    "b2b wholesale services india",
    "wholesale ecommerce services india",
    "shopify setup services",
    "woocommerce setup services",
    "supplier verification services",
    "marketplace setup services",
    "ecommerce growth support",
    "whatsapp business support",
  ],
});

export default function WholesalePage() {
  return (
    <>
      <JsonLd
        data={[
          getBreadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Wholesale & Business Support", href: "/wholesale" },
          ]),
          getFaqSchema(faqItems),
          serviceSchema,
          serviceListSchema,
          processHowToSchema,
        ]}
      />

      <section className="relative overflow-hidden pb-10 pt-20 md:pb-12 md:pt-24 lg:pb-14">
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top_right,rgba(201,159,58,0.2),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(39,64,51,0.08),transparent_34%)]" />
        <Container className="relative">
          <div className="premium-panel relative overflow-hidden p-5 sm:p-8 lg:p-10">
            <div className="absolute -right-16 top-0 h-52 w-52 rounded-full bg-gold-300/30 blur-3xl" />
            <div className="absolute left-0 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-olive-200/35 blur-3xl" />

            <div className="relative grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-olive-700">
                  Wholesale + Ecommerce Landing Page
                </p>
                <h1 className="mt-4 max-w-4xl text-[2.25rem] leading-[1.02] sm:text-5xl lg:text-6xl">
                  Wholesale Purchase and Online Shop Support for B2B Growth
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-olive-800 sm:text-lg sm:leading-8">
                  If you need bulk purchase support, supplier validation, Shopify/WooCommerce setup,
                  and marketplace launch support in one place, this page is built for your business.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <TrackedLink
                    href={whatsappLeadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={buttonStyles({ size: "lg" })}
                    eventData={{ location: "wholesale_hero", label: "WhatsApp Lead" }}
                  >
                    Start on WhatsApp
                  </TrackedLink>
                  <TrackedLink
                    href={emailLeadUrl}
                    target={supportEmail ? "_blank" : undefined}
                    rel={supportEmail ? "noreferrer" : undefined}
                    className={buttonStyles({ variant: "secondary", size: "lg" })}
                    eventData={{ location: "wholesale_hero", label: leadCtaLabel }}
                  >
                    {leadCtaLabel}
                  </TrackedLink>
                </div>
              </div>

              <div className="grid gap-3">
                <article className="image-stage relative aspect-[4/2.7] overflow-hidden">
                  <Image
                    src="/images/banners/hero-tea-flat-lay.jpg"
                    alt="Wholesale sourcing and ecommerce planning support"
                    fill
                    priority
                    sizes="(min-width: 1024px) 35vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(19,32,24,0.72))]" />
                </article>
                {heroHighlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.4rem] border border-olive-950/8 bg-white/80 px-4 py-4"
                  >
                    <p className="text-sm leading-6 text-olive-900">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="page-title" className="bg-white/35 py-8 md:py-10 lg:py-12">
        <Container className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="card-surface p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-olive-700">Page Title</p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.65rem]">
              Wholesale Purchase, Shopify Setup and Ecommerce Support Services
            </h2>
            <p className="mt-3 text-sm leading-7 text-olive-800 sm:text-base sm:leading-8">
              We help Indian B2B businesses manage sourcing, supplier checks, online store setup,
              marketplace onboarding, and growth support with one execution partner.
            </p>
            <p className="mt-3 text-sm leading-7 text-olive-800 sm:text-base sm:leading-8">
              This structure is designed for SEO and lead conversion: clear service intent, direct
              CTAs, process clarity, FAQ trust, and fast contact options.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <TrackedLink
                href="/products"
                className="rounded-[1rem] border border-olive-950/10 bg-white px-4 py-3 text-sm font-medium text-olive-900 hover:bg-sand-50"
                eventData={{ location: "page_title_section", label: "View Products" }}
              >
                View Product Range
              </TrackedLink>
              <TrackedLink
                href="/compliance"
                className="rounded-[1rem] border border-olive-950/10 bg-white px-4 py-3 text-sm font-medium text-olive-900 hover:bg-sand-50"
                eventData={{ location: "page_title_section", label: "View Compliance" }}
              >
                View Compliance
              </TrackedLink>
            </div>
          </div>

          <div className="dark-panel p-5 sm:p-6">
            <h2 className="text-3xl text-sand-50 sm:text-4xl">What this page covers</h2>
            <ul className="mt-4 space-y-2.5 text-sm leading-7 text-sand-100/82 sm:text-base">
              <li>Wholesale and bulk purchase service details.</li>
              <li>Step-by-step process from enquiry to launch.</li>
              <li>FAQ answers for decision confidence.</li>
              <li>Direct contact via WhatsApp, email, and form.</li>
            </ul>
          </div>
        </Container>
      </section>

      <section id="services" className="py-8 md:py-10 lg:py-12">
        <Container>
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-olive-700">
              Service Details
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.65rem]">
              End-to-end services for wholesale and ecommerce growth
            </h2>
            <p className="mt-3 text-sm leading-7 text-olive-800 sm:text-base sm:leading-8">
              Each service below solves a specific business problem and fits into one connected
              delivery flow.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {serviceCards.map((service, index) => {
              const serviceWhatsAppUrl = buildWhatsAppUrl(
                `Hi Agree Superfoods, I want to discuss ${service.title}. Please share timeline and pricing.`,
              );

              return (
                <article
                  key={service.title}
                  className="card-surface flex h-full flex-col gap-3 p-4 sm:p-5"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-olive-700">
                    Service {index + 1}
                  </p>
                  <h3 className="text-xl leading-7">{service.title}</h3>
                  <p className="text-sm leading-7 text-olive-800">{service.description}</p>
                  <div className="rounded-[1rem] border border-olive-950/10 bg-white/74 px-3 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-olive-700">
                      Business Impact
                    </p>
                    <p className="mt-1 text-sm leading-6 text-olive-800">{service.impact}</p>
                  </div>
                  <TrackedLink
                    href={serviceWhatsAppUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={buttonStyles({
                      variant: "secondary",
                      className: "mt-auto w-full justify-center text-sm",
                    })}
                    eventData={{ location: "services_section", label: service.title }}
                  >
                    Discuss Service
                  </TrackedLink>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section id="process" className="bg-white/35 py-8 md:py-10 lg:py-12">
        <Container className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="dark-panel p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sand-100/75">
              How It Works Process
            </p>
            <h2 className="mt-3 text-3xl text-sand-50 sm:text-4xl lg:text-[2.65rem]">
              Simple process from first message to business execution
            </h2>
            <div className="mt-5 grid gap-2.5">
              {processSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-3.5"
                >
                  <p className="text-sm font-medium text-sand-50">
                    0{index + 1}. {step.title}
                  </p>
                  <p className="mt-1 text-sm leading-7 text-sand-100/82">{step.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="card-surface p-5 sm:p-6">
            <h2 className="text-3xl sm:text-4xl">What to share in your first message</h2>
            <ul className="mt-4 space-y-2.5 text-sm leading-7 text-olive-800">
              <li>Business type and target customer segment.</li>
              <li>Product category and quantity expectation.</li>
              <li>Target city/state and delivery expectation.</li>
              <li>If you need wholesale only or full ecommerce setup.</li>
              <li>Expected timeline to launch or improve current setup.</li>
            </ul>
            <TrackedLink
              href={whatsappLeadUrl}
              target="_blank"
              rel="noreferrer"
              className={buttonStyles({ className: "mt-6" })}
              eventData={{ location: "process_section", label: "WhatsApp Lead" }}
            >
              Start Process on WhatsApp
            </TrackedLink>
          </div>
        </Container>
      </section>

      <section id="faq" className="py-8 md:py-10 lg:py-12">
        <Container>
          <div className="card-surface p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-olive-700">FAQ</p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.65rem]">Frequently asked questions</h2>
            <p className="mt-3 text-sm leading-7 text-olive-800 sm:text-base sm:leading-8">
              These are the common questions we receive before onboarding a wholesale and ecommerce
              support project.
            </p>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {faqItems.map((item) => (
              <article key={item.question} className="card-surface p-4 sm:p-5">
                <h3 className="text-xl leading-7">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-olive-800">{item.answer}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="contact" className="bg-white/35 pb-16 pt-8 md:pb-16 md:pt-10 lg:pb-20 lg:pt-12">
        <Container className="grid gap-4 lg:grid-cols-[0.84fr_1.16fr]">
          <div className="dark-panel p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sand-100/75">Contact</p>
            <h2 className="mt-3 text-3xl text-sand-50 sm:text-4xl lg:text-[2.65rem]">
              Start your business enquiry
            </h2>
            <p className="mt-3 text-sm leading-7 text-sand-100/82 sm:text-base sm:leading-8">
              For fastest support, start on WhatsApp. Use email or the detailed enquiry form for
              quotation, documents, and full requirement handover.
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-sand-100/82">
              <li>Share your target category and quantity.</li>
              <li>Mention current setup: wholesale only or full ecommerce support.</li>
              <li>Add launch timeline so we can prioritize correctly.</li>
            </ul>

            <div className="mt-5 flex flex-col gap-3">
              <TrackedLink
                href={whatsappLeadUrl}
                target="_blank"
                rel="noreferrer"
                className={buttonStyles({ className: "w-full justify-center bg-sand-50 text-olive-950" })}
                eventData={{ location: "contact_section", label: "WhatsApp Lead" }}
              >
                WhatsApp First Response
              </TrackedLink>
              <TrackedLink
                href={emailLeadUrl}
                target={supportEmail ? "_blank" : undefined}
                rel={supportEmail ? "noreferrer" : undefined}
                className={buttonStyles({
                  variant: "secondary",
                  className:
                    "w-full justify-center border-white/20 bg-transparent text-sand-50 hover:bg-white/10",
                })}
                eventData={{ location: "contact_section", label: leadCtaLabel }}
              >
                {leadCtaLabel}
              </TrackedLink>
            </div>

            <div className="mt-5 rounded-[1.3rem] border border-white/14 bg-white/6 px-4 py-4 text-sm leading-7 text-sand-100/82">
              <p>
                <span className="font-medium text-sand-50">Response time: </span>
                {siteConfig.business.responseTime}
              </p>
              <p>
                <span className="font-medium text-sand-50">Best lead route: </span>
                WhatsApp first, email and form for detail handover.
              </p>
            </div>
          </div>

          <WholesaleForm />
        </Container>
      </section>
    </>
  );
}
