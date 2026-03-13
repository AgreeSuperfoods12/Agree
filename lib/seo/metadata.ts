import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";
import { absoluteUrl, truncate } from "@/lib/utils";

interface MetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

function getPageTitle(title?: string) {
  if (!title) {
    return `${siteConfig.name} | Premium Indian Superfoods, Seeds, Tea & Pantry Essentials`;
  }

  return title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;
}

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = "/opengraph-image",
  keywords = [],
  noIndex = false,
  type = "website",
  publishedTime,
  modifiedTime,
  authors = [],
}: MetadataOptions = {}): Metadata {
  const canonicalUrl = absoluteUrl(path);
  const shouldNoIndex = noIndex || siteConfig.isPreviewDeployment;
  const pageTitle = getPageTitle(title);
  const pageDescription = truncate(description, 160);
  const imageUrl = absoluteUrl(image);
  const googleSiteVerification =
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "EgAIl2GI0UGEmKpf66MTq1bxMgEHnsL48uOamOL_CO4";
  const yandexSiteVerification = process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION;
  const bingSiteVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
  const pageKeywords = Array.from(new Set([...siteConfig.defaultKeywords, ...keywords]));
  const openGraph: NonNullable<Metadata["openGraph"]> =
    type === "article"
      ? {
          type: "article",
          url: canonicalUrl,
          title: pageTitle,
          description: pageDescription,
          siteName: siteConfig.name,
          locale: "en_IN",
          publishedTime,
          modifiedTime: modifiedTime || publishedTime,
          authors,
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: pageTitle,
            },
          ],
        }
      : {
          type: "website",
          url: canonicalUrl,
          title: pageTitle,
          description: pageDescription,
          siteName: siteConfig.name,
          locale: "en_IN",
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: pageTitle,
            },
          ],
        };

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    applicationName: siteConfig.name,
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    creator: siteConfig.name,
    publisher: siteConfig.name,
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    manifest: "/manifest.webmanifest",
    icons: {
      icon: "/icon.svg",
      shortcut: "/icon.svg",
    },
    ...(authors.length > 0
      ? {
          authors: authors.map((name) => ({ name })),
        }
      : {}),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !shouldNoIndex,
      follow: !shouldNoIndex,
      googleBot: {
        index: !shouldNoIndex,
        follow: !shouldNoIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    ...(googleSiteVerification || yandexSiteVerification || bingSiteVerification
      ? {
          verification: {
            ...(googleSiteVerification ? { google: googleSiteVerification } : {}),
            ...(yandexSiteVerification ? { yandex: yandexSiteVerification } : {}),
            ...(bingSiteVerification
              ? { other: { "msvalidate.01": bingSiteVerification } }
              : {}),
          },
        }
      : {}),
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [imageUrl],
    },
    category: "food",
  };
}
