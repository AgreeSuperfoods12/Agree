import type { ContentImage, FaqItem, SeoFields } from "@/types/site";

export interface ProductHighlight {
  title: string;
  value: string;
  description: string;
}

export interface ProductDetail {
  label: string;
  value: string;
}

export interface ProductPricing {
  amount: number;
  compareAtAmount?: number;
  currencyCode: string;
  variantLabel: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  badge: string;
  shortDescription: string;
  description: string;
  fullDescription: string[];
  benefits: string[];
  ingredients: string[];
  usageIdeas: string[];
  bestFor: string[];
  pricing: ProductPricing;
  productDetails: ProductDetail[];
  images: ContentImage[];
  highlights: ProductHighlight[];
  faqs: FaqItem[];
  relatedProducts: string[];
  relatedPosts: string[];
  featured: boolean;
  catalogPriority: number;
  seo: SeoFields;
}
