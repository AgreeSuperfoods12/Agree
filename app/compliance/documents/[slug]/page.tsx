import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PdfFirstPagePreview } from "@/components/compliance/pdf-first-page-preview";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";
import { buttonStyles } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site-config";

interface ComplianceDocumentPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return siteConfig.business.certificationDocuments.map((document) => ({
    slug: document.slug,
  }));
}

export async function generateMetadata({
  params,
}: ComplianceDocumentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const document = siteConfig.business.certificationDocuments.find((item) => item.slug === slug);

  if (!document) {
    return buildMetadata({
      title: "Compliance document not found",
      path: `/compliance/documents/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${document.title} Preview`,
    description: `${document.title} is published as a first-page view-only preview for business verification and trust presentation.`,
    path: `/compliance/documents/${document.slug}`,
    noIndex: true,
  });
}

export default async function ComplianceDocumentPage({
  params,
}: ComplianceDocumentPageProps) {
  const { slug } = await params;
  const document = siteConfig.business.certificationDocuments.find((item) => item.slug === slug);

  if (!document) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow="Compliance document"
        title={document.title}
        description="This record is published as a limited first-page preview for business verification and trust presentation."
      />

      <section className="section-shell pt-0">
        <Container>
          <div className="card-surface p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-olive-700">
                  View-only preview
                </p>
                <h2 className="mt-3 text-3xl">Review the published document on-site</h2>
                <p className="mt-4 max-w-[42rem] text-sm leading-7 text-olive-800 sm:text-base">
                  {document.description}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/compliance" className={buttonStyles({ variant: "secondary" })}>
                  Back to compliance
                </Link>
              </div>
            </div>

            <div className="mt-8">
              <PdfFirstPagePreview
                src={`/compliance/documents/${document.slug}/file`}
                title={document.title}
              />
            </div>

            <p className="mt-4 text-sm leading-7 text-olive-700">
              Only a small first-page preview is shown on the website. The full certificate file is
              not exposed through the page interface.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
