import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { StudioShell } from "@/components/studio/studio-shell";
import { buttonStyles } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo/metadata";
import { hasValidSanityConfig } from "@/sanity/env";

export const metadata: Metadata = buildMetadata({
  title: "Sanity Studio",
  description: "Editorial admin panel for Agree Superfoods content management.",
  path: "/studio",
  noIndex: true,
});

export default function StudioPage() {
  if (!hasValidSanityConfig) {
    return (
      <section className="section-shell">
        <Container>
          <div className="card-surface mx-auto max-w-3xl p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-olive-700">
              Sanity setup required
            </p>
            <h1 className="mt-4 text-4xl">Connect your Sanity project to open the admin panel.</h1>
            <div className="mt-5 space-y-4 leading-7 text-olive-800">
              <p>
                Add `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and
                `NEXT_PUBLIC_SANITY_API_VERSION` to `.env.local`, then restart the dev server.
              </p>
              <p>
                The frontend already works with the local content fallback, so Studio can be added
                whenever the content team is ready.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/" className={buttonStyles({ size: "lg" })}>
                Back to site
              </Link>
              <Link href="/contact" className={buttonStyles({ variant: "secondary", size: "lg" })}>
                Contact route
              </Link>
            </div>
          </div>
        </Container>
      </section>
    );
  }
  return <StudioShell />;
}
