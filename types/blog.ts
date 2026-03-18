import type { ContentImage, SeoFields } from "@/types/site";

export interface PortableTextSpan {
  _type: "span";
  _key?: string;
  text: string;
  marks?: string[];
}

export interface PortableTextBlock {
  _type: "block";
  _key?: string;
  style?: string;
  children?: PortableTextSpan[];
  markDefs?: Array<Record<string, unknown>>;
}

export interface PortableTextImageBlock {
  _type: "image";
  _key?: string;
  src?: string;
  alt?: string;
}

export type PortableTextNode = PortableTextBlock | PortableTextImageBlock;

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface BlogFrontmatter {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  authorRole: string;
  category: string;
  tags: string[];
  coverImage: ContentImage;
  featured: boolean;
  relatedProducts: string[];
  seo: SeoFields;
}

export interface BlogPost extends BlogFrontmatter {
  bodyType: "markdown" | "portableText";
  markdown?: string;
  portableText?: PortableTextNode[];
  readingTimeText: string;
  wordCount: number;
  toc: TableOfContentsItem[];
}
