import { groq } from "next-sanity";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  hero{
    eyebrow,
    title,
    description,
    primaryCta{label, href},
    secondaryCta{label, href},
    supportingPoints
  },
  homepageIntro,
  whyChooseCards[]{title, description},
  wellnessFeatures[]{name, blurb, benefit},
  qualityPillars[]{title, description},
  brandStory,
  packagingStory,
  trustMetrics[]{value, label},
  complianceBadges[]{title, description},
  complianceItems[]{title, description},
  complianceDisclaimer,
  coreCategories[]{title, description, href},
  globalFaqs[]{question, answer},
  contactHighlights,
  wholesaleBenefits,
  newsletter{
    eyebrow,
    title,
    description,
    privacyNote
  }
}`;

export const compliancePageQuery = groq`*[_type == "compliancePage"][0]{
  title,
  intro,
  sections[]{
    title,
    paragraphs
  },
  disclaimer
}`;

const productProjection = `{
  name,
  "slug": slug.current,
  category,
  badge,
  shortDescription,
  description,
  fullDescription,
  benefits,
  ingredients,
  usageIdeas,
  bestFor,
  pricing{
    amount,
    compareAtAmount,
    currencyCode,
    variantLabel
  },
  productDetails[]{label, value},
  "images": images[]{
    "src": asset->url,
    "alt": coalesce(alt, ^.name)
  },
  highlights[]{title, value, description},
  faqs[]{question, answer},
  "relatedProducts": relatedProducts[]->slug.current,
  "relatedPosts": relatedPosts[]->slug.current,
  featured,
  catalogPriority,
  seo{
    title,
    description,
    canonicalPath,
    ogImage,
    keywords,
    noIndex
  }
}`;

export const allProductsQuery = groq`*[_type == "product"] | order(featured desc, catalogPriority asc, name asc) ${productProjection}`;
export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0] ${productProjection}`;

const postProjection = `{
  title,
  "slug": slug.current,
  excerpt,
  author,
  authorRole,
  publishedAt,
  updatedAt,
  category,
  tags,
  "coverImage": {
    "src": coverImage.asset->url,
    "alt": coalesce(coverImage.alt, title)
  },
  body[]{
    ...,
    _type == "image" => {
      ...,
      "src": asset->url,
      alt
    }
  },
  featured,
  "relatedProducts": relatedProducts[]->slug.current,
  seo{
    title,
    description,
    canonicalPath,
    ogImage,
    keywords,
    noIndex
  }
}`;

export const allPostsQuery = groq`*[_type == "post"] | order(publishedAt desc) ${postProjection}`;
export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] ${postProjection}`;
