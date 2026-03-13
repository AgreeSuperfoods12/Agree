import Image from "next/image";

import { TrackedLink } from "@/components/analytics/tracked-link";
import { Container } from "@/components/layout/container";
import { buttonStyles } from "@/components/ui/button";
import { getSiteContent } from "@/lib/content/site";
import { siteConfig } from "@/lib/site-config";

const heroDesktopImage = "/images/banners/tea-ingredients.jpg";
const heroMobileImage = "/images/banners/tea-ingredients.jpg";

function SocialRail() {
  const items = [
    {
      label: "Facebook",
      href: siteConfig.social.facebook,
      icon: (
        <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
          <path d="M13.5 21v-7h2.35l.4-2.73H13.5V9.55c0-.82.27-1.55 1.6-1.55h1.28V5.64c-.23-.03-1.02-.09-1.95-.09-2.99 0-4.93 1.58-4.93 4.8v1.92H7.15V14H9.5v7h4Z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: siteConfig.social.instagram,
      icon: (
        <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="4.5" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: siteConfig.social.linkedin,
      icon: (
        <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
          <path d="M6.65 8.78A1.58 1.58 0 1 0 6.64 5.6a1.58 1.58 0 0 0 0 3.17ZM5.23 18.5h2.82V9.86H5.23V18.5Zm4.42 0h2.81v-4.84c0-1.28.25-2.51 1.84-2.51 1.56 0 1.58 1.46 1.58 2.6v4.75h2.82v-5.33c0-2.62-.56-4.63-3.63-4.63-1.47 0-2.45.81-2.85 1.58h-.04V9.86H9.65c.03.83 0 8.64 0 8.64Z" />
        </svg>
      ),
    },
    {
      label: "YouTube",
      href: siteConfig.social.youtube,
      icon: (
        <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
          <path d="M20.2 8.2c-.19-.75-.78-1.34-1.53-1.53C17.3 6.3 12 6.3 12 6.3s-5.3 0-6.67.37c-.75.19-1.34.78-1.53 1.53C3.43 9.57 3.43 12 3.43 12s0 2.43.37 3.8c.19.75.78 1.34 1.53 1.53 1.37.37 6.67.37 6.67.37s5.3 0 6.67-.37c.75-.19 1.34-.78 1.53-1.53.37-1.37.37-3.8.37-3.8s0-2.43-.37-3.8ZM10.3 14.84V9.16L15.22 12l-4.92 2.84Z" />
        </svg>
      ),
    },
  ].filter((item) => Boolean(item.href));

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 lg:flex xl:right-3">
      <div className="flex flex-col gap-2.5 rounded-[1.1rem] bg-white px-2.5 py-4 shadow-[0_22px_60px_-32px_rgba(19,32,24,0.26)]">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            aria-label={item.label}
            target="_blank"
            rel="noreferrer"
            className="grid size-9 place-items-center rounded-full text-olive-950 transition hover:bg-sand-50"
          >
            {item.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

function HeroTitle({ title }: { title: string }) {
  const cleanedTitle = title.replace(/\.$/, "");
  const parts = cleanedTitle.split("Every");

  if (parts.length !== 2) {
    return <>{cleanedTitle}</>;
  }

  return (
    <>
      {parts[0]}
      <span className="relative inline-block px-1">
        Every
        <svg
          viewBox="0 0 176 24"
          aria-hidden="true"
          className="absolute left-0 top-[78%] w-full text-[#d7b6de]"
          fill="none"
        >
          <path d="M3 18.5c43-10 128-10 170 0" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        </svg>
      </span>
      {parts[1]}
    </>
  );
}

export async function HeroSection() {
  const siteContent = await getSiteContent();

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#eee6d7]">
      <div className="absolute inset-0 hidden lg:block">
        <Image
          src={heroDesktopImage}
          alt="Lifestyle banner image for Agree Superfoods"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_48%] brightness-[1.08] saturate-[0.92]"
        />
      </div>

      <div className="absolute inset-0 lg:hidden">
        <Image
          src={heroMobileImage}
          alt="Lifestyle banner image for Agree Superfoods on mobile"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[64%_50%] brightness-[1.08] saturate-[0.92]"
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(249,245,238,0.36)_0%,rgba(249,245,238,0.16)_32%,rgba(249,245,238,0.28)_100%)]" />
      <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,rgba(249,245,238,0.96)_0%,rgba(249,245,238,0.88)_24%,rgba(249,245,238,0.62)_44%,rgba(249,245,238,0.2)_66%,rgba(249,245,238,0)_82%)] lg:w-[74%]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(255,255,255,0.5),transparent_20%),radial-gradient(circle_at_84%_18%,rgba(255,255,255,0.2),transparent_16%)]" />

      <SocialRail />

      <Container className="relative">
        <div className="grid min-h-[100svh] items-center pb-40 pt-28 sm:pb-44 sm:pt-32 lg:grid-cols-5 lg:pb-48 lg:pt-36 xl:pt-40">
          <div className="max-w-[42rem] lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-olive-700">
              {siteContent.hero.eyebrow}
            </p>
            <h1 className="mt-5 max-w-[12ch] text-5xl font-semibold leading-[0.92] text-olive-950 sm:text-6xl lg:text-[5rem] xl:text-[5.6rem]">
              <HeroTitle title={siteContent.hero.title} />
            </h1>
            <p className="mt-6 max-w-[35rem] text-lg leading-8 text-olive-800 lg:max-w-[31rem]">
              {siteContent.hero.description}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <TrackedLink
                href={siteContent.hero.primaryCta.href}
                className={buttonStyles({
                  size: "lg",
                  className:
                    "min-w-[10rem] bg-olive-950 text-sand-50 shadow-[0_16px_38px_-24px_rgba(19,32,24,0.32)] hover:bg-olive-900",
                })}
                eventData={{ location: "hero", label: siteContent.hero.primaryCta.label }}
              >
                {siteContent.hero.primaryCta.label}
                <span
                  aria-hidden="true"
                  className="grid size-6 place-items-center rounded-full bg-white/14 text-sm"
                >
                  &gt;
                </span>
              </TrackedLink>
              <TrackedLink
                href={siteContent.hero.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-olive-950/10 bg-white/78 px-5 py-3 text-sm font-semibold text-olive-950 shadow-[0_18px_36px_-28px_rgba(19,32,24,0.25)] transition hover:bg-white"
                eventData={{ location: "hero", label: siteContent.hero.secondaryCta.label }}
              >
                {siteContent.hero.secondaryCta.label}
                <span aria-hidden="true">+</span>
              </TrackedLink>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-olive-700">
              {siteContent.hero.supportingPoints.map((point) => (
                <span key={point} className="inline-flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-gold-400" />
                  {point}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
