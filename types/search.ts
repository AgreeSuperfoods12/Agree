export interface SearchableProduct {
  slug: string;
  name: string;
  category: string;
  badge?: string;
  shortDescription: string;
  benefits: string[];
  pricing?: {
    amount?: number;
    compareAtAmount?: number;
    currencyCode?: string;
    variantLabel?: string;
  } | null;
  images: Array<{
    src: string;
    alt?: string;
  }>;
}

export interface SearchablePost {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  category: string;
  coverImage?: {
    src: string;
    alt?: string;
  };
}
