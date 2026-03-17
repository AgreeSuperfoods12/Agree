import Link from "next/link";

import { NewsletterForm } from "@/components/forms/newsletter-form";
import { BrandMark } from "@/components/layout/brand-mark";
import { Container } from "@/components/layout/container";
import { footerNavigation, navigation, siteConfig } from "@/lib/site-config";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const supportPhone = siteConfig.business.records.phone;
  const socialLinks = [
    { label: "Facebook", href: siteConfig.social.facebook },
    { label: "Instagram", href: siteConfig.social.instagram },
    { label: "LinkedIn", href: siteConfig.social.linkedin },
    { label: "YouTube", href: siteConfig.social.youtube },
  ].filter((item) => Boolean(item.href));
  const officialNotes = [
    siteConfig.business.records.gstNumber
      ? `GSTIN / UIN: ${siteConfig.business.records.gstNumber}`
      : null,
    `Response target: ${siteConfig.business.responseTime}`,
    siteConfig.business.records.address || siteConfig.location,
  ].filter((item): item is string => Boolean(item));

  return (
    <footer className="mt-12 border-t border-white/8 bg-[linear-gradient(180deg,#132018_0%,#17241c_100%)] text-sand-50">
      <Container className="py-10 sm:py-12">
        <div className="grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-[1.15fr_0.72fr_0.72fr_0.95fr]">
          <div className="max-w-md space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-sand-100/58">
              Official footer
            </p>
            <BrandMark inverse compact />
            <p className="text-sm leading-7 text-sand-100/78">{siteConfig.description}</p>
            <div className="flex flex-wrap gap-2">
              {officialNotes.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-sand-100/70"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="space-y-1 text-sm text-sand-100/78">
              <p>
                <Link href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-sand-50">
                  {siteConfig.email}
                </Link>
              </p>
              {supportPhone ? (
                <p>
                  <Link
                    href={`tel:${supportPhone.replace(/\s+/g, "")}`}
                    className="transition-colors hover:text-sand-50"
                  >
                    {supportPhone}
                  </Link>
                </p>
              ) : null}
            </div>
          </div>

          <div>
            <h2 className="text-sm uppercase tracking-[0.22em] text-sand-100/62">Explore</h2>
            <ul className="mt-4 space-y-3 text-sm text-sand-100/78">
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
            <h2 className="text-sm uppercase tracking-[0.22em] text-sand-100/62">Support</h2>
            <ul className="mt-4 space-y-3 text-sm text-sand-100/78">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-sand-50">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            {siteConfig.business.whatsappUrl ? (
              <Link
                href={siteConfig.business.whatsappUrl}
                className="mt-4 inline-flex text-sm text-sand-50 transition hover:text-sand-100"
              >
                {siteConfig.business.whatsappLabel}
              </Link>
            ) : null}
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-sm uppercase tracking-[0.22em] text-sand-100/62">Newsletter</h2>
              <p className="mt-3 text-sm leading-7 text-sand-100/78">
                Product updates and educational content, sent occasionally.
              </p>
            </div>
            <NewsletterForm inverse />
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-5 text-xs uppercase tracking-[0.18em] text-sand-100/58 lg:flex-row lg:items-center lg:justify-between">
          <p>{currentYear} Agree Superfoods. Premium pantry essentials with trust-led presentation.</p>
          <div className="flex flex-wrap gap-4">
            <Link href={siteConfig.siteUrl} className="transition-colors hover:text-sand-50">
              {siteConfig.siteUrl.replace(/^https?:\/\//, "")}
            </Link>
            {socialLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-sand-50"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
