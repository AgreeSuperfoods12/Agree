import Link from "next/link";

import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/layout/container";
import { buttonStyles } from "@/components/ui/button";

const registrationCards = [
  {
    label: "GSTIN / UIN",
    value: siteConfig.business.registrations.gstin,
  },
  {
    label: "Trade name",
    value: siteConfig.business.registrations.tradeName,
  },
  {
    label: "Registration date",
    value: siteConfig.business.registrations.dateOfRegistration,
  },
  {
    label: "State jurisdiction",
    value: siteConfig.business.registrations.stateJurisdiction,
  },
].filter((item): item is { label: string; value: string } => Boolean(item.value));

export function ComplianceStrip() {
  return (
    <section className="section-shell pt-0">
      <Container>
        <div className="overflow-hidden rounded-[2.35rem] border border-olive-950/8 bg-[linear-gradient(180deg,#132018_0%,#1b2a21_100%)] px-6 py-7 text-sand-50 shadow-[0_34px_90px_-52px_rgba(19,32,24,0.56)] sm:px-8 lg:px-10 lg:py-9">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="max-w-[30rem]">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sand-100/68">
                Official business credentials
              </p>
              <h2 className="mt-4 text-4xl text-sand-50 sm:text-5xl">
                Verified registrations and certificates for trust-led buying.
              </h2>
              <p className="mt-5 text-base leading-8 text-sand-100/78 sm:text-lg">
                Agree Superfoods now displays official registration details and view-only
                certificate documents for customers, trade buyers, and wholesale partners who want
                a more formal business profile.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/compliance" className={buttonStyles({ size: "lg" })}>
                  View compliance page
                </Link>
                <Link
                  href={siteConfig.business.certificationDocuments[0]?.href || "/compliance"}
                  className={buttonStyles({
                    variant: "secondary",
                    size: "lg",
                    className: "bg-white text-olive-950",
                  })}
                >
                  View GST certificate
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {registrationCards.map((item) => (
                  <article
                    key={item.label}
                    className="rounded-[1.55rem] border border-white/10 bg-white/6 px-4 py-4 backdrop-blur-sm"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sand-100/62">
                      {item.label}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-sand-50">{item.value}</p>
                  </article>
                ))}
              </div>

              <div className="rounded-[1.7rem] border border-white/10 bg-white/6 p-4 sm:p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sand-100/62">
                  View-only documents
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {siteConfig.business.certificationDocuments.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="rounded-full border border-white/12 bg-white/10 px-4 py-2 text-sm text-sand-50 transition hover:bg-white/16"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
