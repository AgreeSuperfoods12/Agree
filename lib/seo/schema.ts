import { resolveProductPricing } from "@/lib/pricing";
import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import type { BlogPost } from "@/types/blog";
import type { Product } from "@/types/product";
import type { BreadcrumbItem, FaqItem } from "@/types/site";

export function getOrganizationSchema() {
  const sameAs = [siteConfig.social.instagram, siteConfig.social.linkedin].filter(Boolean);
  const logoUrl = absoluteUrl("/images/logo/agreesuperfoods.png");
  const contactPoint = {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: siteConfig.email,
    areaServed: "IN",
    availableLanguage: ["English"],
    ...(siteConfig.business.records.phone ? { telephone: siteConfig.business.records.phone } : {}),
  };

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    logo: logoUrl,
    image: logoUrl,
    description: siteConfig.description,
    ...(siteConfig.business.records.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: siteConfig.business.records.address,
            addressCountry: siteConfig.country,
          },
        }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    contactPoint: [contactPoint],
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    inLanguage: "en-IN",
  };
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function getFaqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getProductSchema(product: Product) {
  const pricing = resolveProductPricing(product.pricing);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((image) => absoluteUrl(image.src)),
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    category: product.category,
    sku: product.slug,
    url: absoluteUrl(product.seo.canonicalPath),
    offers: {
      "@type": "Offer",
      priceCurrency: pricing.currencyCode,
      price: pricing.amount.toFixed(2),
      url: absoluteUrl(product.seo.canonicalPath),
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
    additionalProperty: [
      ...product.highlights.map((item) => ({
        "@type": "PropertyValue",
        name: item.title,
        value: item.value,
        description: item.description,
      })),
      ...product.productDetails.map((item) => ({
        "@type": "PropertyValue",
        name: item.label,
        value: item.value,
      })),
    ],
  };
}

export function getArticleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seo.description,
    image: [absoluteUrl(post.coverImage.src)],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    articleSection: post.category,
    keywords: post.tags,
    inLanguage: "en-IN",
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/logo/agreesuperfoods.png"),
      },
    },
    mainEntityOfPage: absoluteUrl(post.seo.canonicalPath),
  };
}
