import Link from "next/link";

import { NewsletterForm } from "@/components/forms/newsletter-form";
import { BrandMark } from "@/components/layout/brand-mark";
import { Container } from "@/components/layout/container";
import { footerNavigation, navigation, siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-white/8 bg-olive-950 text-sand-50">
      <Container className="grid gap-10 py-14 xl:grid-cols-[1.05fr_0.7fr_0.7fr_0.75fr_1fr]">
        <div className="max-w-md space-y-5">
          <BrandMark className="text-sand-50" inverse />
          <p className="text-sm leading-7 text-sand-100/80">{siteConfig.description}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-sand-100/60">
                Support
              </p>
              <p className="mt-2 text-sm text-sand-50">{siteConfig.business.responseTime}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-sand-100/60">
                Bulk enquiries
              </p>
              <p className="mt-2 text-sm text-sand-50">Retail, gifting, hospitality, and trade</p>
            </div>
          </div>
          <div className="space-y-1 text-sm text-sand-100/80">
            <p>{siteConfig.location}</p>
            <p>{siteConfig.email}</p>
            <p>{siteConfig.siteUrl.replace(/^https?:\/\//, "")}</p>
          </div>
        </div>

        <div>
          <h2 className="text-base text-sand-50">Explore</h2>
          <ul className="mt-4 space-y-3 text-sm text-sand-100/80">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-sand-50">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-base text-sand-50">Shop by type</h2>
          <ul className="mt-4 space-y-3 text-sm text-sand-100/80">
            <li>
              <Link href="/products?category=Seeds" className="transition-colors hover:text-sand-50">
                Seeds
              </Link>
            </li>
            <li>
              <Link href="/products?category=Tea" className="transition-colors hover:text-sand-50">
                Tea collection
              </Link>
            </li>
            <li>
              <Link href="/products?category=Pantry%20Essentials" className="transition-colors hover:text-sand-50">
                Pantry essentials
              </Link>
            </li>
            <li>
              <Link href="/wholesale" className="transition-colors hover:text-sand-50">
                Bulk supply
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-base text-sand-50">Support</h2>
          <div className="mt-4 space-y-4 text-sm text-sand-100/80">
            <ul className="space-y-3">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-sand-50">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="leading-6 text-sand-100/70">{siteConfig.business.supportNote}</p>
            {siteConfig.business.whatsappUrl ? (
              <Link
                href={siteConfig.business.whatsappUrl}
                className="font-medium text-sand-50 underline-offset-4 hover:underline"
              >
                {siteConfig.business.whatsappLabel}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-base text-sand-50">Newsletter</h2>
          <p className="text-sm leading-7 text-sand-100/78">
            Get occasional product updates, pantry inspiration, and educational content from Agree
            Superfoods.
          </p>
          <NewsletterForm inverse />
        </div>
      </Container>
      <Container className="border-t border-white/8 py-5">
        <p className="text-xs uppercase tracking-[0.24em] text-sand-100/60">
          Agree Superfoods. Premium seeds, teas, makhana, and pantry essentials for simple everyday
          wellness.
        </p>
      </Container>
    </footer>
  );
}
