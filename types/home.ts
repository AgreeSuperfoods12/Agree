import type { ContentImage } from "@/types/site";

export interface AnnouncementContent {
  message: string;
  secondaryMessage: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface HeroVisualCard {
  title: string;
  description: string;
  image: ContentImage;
  href: string;
}

export interface CollectionTile {
  title: string;
  description: string;
  href: string;
  image: ContentImage;
}

export interface EditorialSplitContent {
  eyebrow: string;
  title: string;
  description: string;
  body: string[];
  ctaLabel: string;
  ctaHref: string;
  image: ContentImage;
  reverse?: boolean;
  highlights?: string[];
}

export interface PromoBannerContent {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: ContentImage;
  theme?: "light" | "dark";
}

export interface TrustIconItem {
  iconText: string;
  title: string;
  description: string;
}

export interface SpotlightContent {
  eyebrow: string;
  title: string;
  description: string;
  productSlug: string;
  bullets: string[];
}

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  productLabel: string;
}

export interface CollageItem {
  title: string;
  description: string;
  image: ContentImage;
  href?: string;
}

export interface UsageCard {
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  image: ContentImage;
}

export interface EventBannerItem {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: ContentImage;
}

export interface ProductRowFeature {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: ContentImage;
}

export interface FooterCtaContent {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  image: ContentImage;
}

export interface HomePageContent {
  announcement: AnnouncementContent;
  heroVisualCards: HeroVisualCard[];
  heroProductSlugs: string[];
  featuredGridSlugs: string[];
  collectionTiles: CollectionTile[];
  editorialSplit: EditorialSplitContent;
  promoBanner: PromoBannerContent;
  benefitsRow: TrustIconItem[];
  topPicksSlugs: string[];
  productSpotlight: SpotlightContent;
  testimonials: TestimonialItem[];
  collageSection: {
    eyebrow: string;
    title: string;
    description: string;
    items: CollageItem[];
  };
  usageCards: UsageCard[];
  eventBanners: EventBannerItem[];
  productRow: {
    eyebrow: string;
    title: string;
    description: string;
    productSlugs: string[];
    feature: ProductRowFeature;
  };
  trustIconsBottom: TrustIconItem[];
  footerCta: FooterCtaContent;
}
