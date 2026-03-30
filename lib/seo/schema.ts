import { resolveProductPricing } from "@/lib/pricing";
import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import type { BlogPost } from "@/types/blog";
import type { Product } from "@/types/product";
import type { BreadcrumbItem, FaqItem } from "@/types/site";

const websiteId = absoluteUrl("/#website");
const organizationId = absoluteUrl("/#organization");
const aboutPageUrl = absoluteUrl("/about");
const organizationLogoUrl = absoluteUrl("/images/logo/agreesuperfoods.png");
const shippingReturnsUrl = absoluteUrl("/shipping-returns");

export function getOrganizationSchema() {
  const sameAs = [
    siteConfig.social.facebook,
    siteConfig.social.instagram,
    siteConfig.social.linkedin,
    siteConfig.social.twitter,
    siteConfig.social.youtube,
  ].filter(Boolean);
  const logoUrl = absoluteUrl("/images/logo/agreesuperfoods.png");
  const gstin = siteConfig.business.registrations.gstin;
  const tradeName = siteConfig.business.registrations.tradeName;
  const contactPoint = {
    "@type": "ContactPoint",
    contactType: "customer support",
    areaServed: "IN",
    availableLanguage: ["English"],
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    ...(siteConfig.business.records.phone ? { telephone: siteConfig.business.records.phone } : {}),
  };

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    ...(tradeName ? { legalName: tradeName } : {}),
    url: siteConfig.siteUrl,
    logo: logoUrl,
    image: logoUrl,
    description: siteConfig.description,
    ...(gstin ? { taxID: gstin } : {}),
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
    "@id": websiteId,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    publisher: {
      "@id": organizationId,
    },
    inLanguage: "en-IN",
  };
}

function getArticleAuthor(post: BlogPost) {
  const normalizedAuthor = post.author.trim().toLowerCase();
  const isOrganizationAuthor =
    normalizedAuthor.includes("team") ||
    normalizedAuthor.includes(siteConfig.name.toLowerCase()) ||
    normalizedAuthor.includes(siteConfig.shortName.toLowerCase());

  if (isOrganizationAuthor) {
    const sameAs = [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.linkedin,
      siteConfig.social.twitter,
      siteConfig.social.youtube,
    ].filter(Boolean);

    return {
      "@type": "Organization",
      name: post.author,
      url: aboutPageUrl,
      ...(sameAs.length > 0 ? { sameAs } : {}),
    };
  }

  return {
    "@type": "Person",
    name: post.author,
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
  const productUrl = absoluteUrl(product.seo.canonicalPath);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((image) => absoluteUrl(image.src)),
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    category: product.category,
    sku: product.slug,
    itemCondition: "https://schema.org/NewCondition",
    keywords: product.seo.keywords,
    url: productUrl,
    offers: {
      "@type": "Offer",
      priceCurrency: pricing.currencyCode,
      price: pricing.amount.toFixed(2),
      url: productUrl,
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: 0,
          currency: pricing.currencyCode,
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: siteConfig.country,
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 2,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 7,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: siteConfig.country,
        returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
        merchantReturnLink: shippingReturnsUrl,
      },
      seller: {
        "@id": organizationId,
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
  const articleUrl = absoluteUrl(post.seo.canonicalPath);
  const imageUrl = absoluteUrl(post.coverImage.src);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo.description,
    image: [imageUrl],
    thumbnailUrl: imageUrl,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    articleSection: post.category,
    genre: post.category,
    keywords: [...(post.seo.keywords || []), ...post.tags].join(", "),
    inLanguage: "en-IN",
    isAccessibleForFree: true,
    wordCount: post.wordCount,
    author: getArticleAuthor(post),
    isPartOf: {
      "@id": websiteId,
    },
    about: [post.category, ...post.tags].map((item) => ({
      "@type": "Thing",
      name: item,
    })),
    url: articleUrl,
    publisher: {
      "@id": organizationId,
      name: siteConfig.name,
      url: siteConfig.siteUrl,
      logo: {
        "@type": "ImageObject",
        url: organizationLogoUrl,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };
}

export function getProductListSchema(name: string, path: string, products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description: siteConfig.description,
    url: absoluteUrl(path),
    isPartOf: {
      "@id": websiteId,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.name,
        url: absoluteUrl(product.seo.canonicalPath),
      })),
    },
  };
}

export function getBlogListSchema(name: string, path: string, posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description: siteConfig.description,
    url: absoluteUrl(path),
    isPartOf: {
      "@id": websiteId,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: post.title,
        url: absoluteUrl(post.seo.canonicalPath),
      })),
    },
  };
}
