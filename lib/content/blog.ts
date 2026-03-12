import "server-only";

import { cache } from "react";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";

import { slugify } from "@/lib/utils";
import type {
  BlogPost,
  PortableTextBlock,
  PortableTextNode,
  TableOfContentsItem,
} from "@/types/blog";
import { sanityFetch } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/lib/queries";

const blogDirectory = path.join(process.cwd(), "content", "blog");

const frontmatterSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  author: z.string(),
  authorRole: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  coverImage: z.string(),
  coverAlt: z.string(),
  featured: z.boolean().default(false),
  relatedProducts: z.array(z.string()).default([]),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    canonicalPath: z.string(),
    ogImage: z.string(),
    keywords: z.array(z.string()).optional(),
    noIndex: z.boolean().optional(),
  }),
});

function extractTableOfContentsFromMarkdown(content: string): TableOfContentsItem[] {
  const withoutCodeBlocks = content.replace(/```[\s\S]*?```/g, "");
  const matches = [...withoutCodeBlocks.matchAll(/^(##|###)\s+(.+)$/gm)];

  return matches.map((match) => ({
    id: slugify(match[2]),
    title: match[2].trim(),
    level: match[1] === "##" ? 2 : 3,
  }));
}

function isPortableTextBlock(node: PortableTextNode): node is PortableTextBlock {
  return node._type === "block";
}

function getPortableTextPlainText(blocks: PortableTextNode[]) {
  return blocks
    .filter(isPortableTextBlock)
    .map((block) => block.children?.map((child) => child.text).join("") || "")
    .join(" ");
}

function extractTableOfContentsFromPortableText(blocks: PortableTextNode[]): TableOfContentsItem[] {
  return blocks
    .filter(isPortableTextBlock)
    .filter((block) => block.style === "h2" || block.style === "h3")
    .map((block) => {
      const title = block.children?.map((child) => child.text).join("").trim() || "";

      return {
        id: slugify(title),
        title,
        level: block.style === "h2" ? 2 : 3,
      } satisfies TableOfContentsItem;
    })
    .filter((item) => item.title.length > 0);
}

function parseBlogFile(fileName: string): BlogPost {
  const filePath = path.join(blogDirectory, fileName);
  const source = readFileSync(filePath, "utf8");
  const { content, data } = matter(source);
  const slug = fileName.replace(/\.mdx$/, "");
  const frontmatter = frontmatterSchema.parse(data);

  return {
    slug,
    title: frontmatter.title,
    excerpt: frontmatter.excerpt,
    publishedAt: frontmatter.publishedAt,
    updatedAt: frontmatter.updatedAt,
    author: frontmatter.author,
    authorRole: frontmatter.authorRole,
    category: frontmatter.category,
    tags: frontmatter.tags,
    coverImage: {
      src: frontmatter.coverImage,
      alt: frontmatter.coverAlt,
    },
    featured: frontmatter.featured,
    relatedProducts: frontmatter.relatedProducts,
    seo: frontmatter.seo,
    bodyType: "markdown",
    markdown: content,
    readingTimeText: readingTime(content).text,
    toc: extractTableOfContentsFromMarkdown(content),
  };
}

async function getSanityPosts() {
  const posts = await sanityFetch<
    Array<
      Omit<BlogPost, "bodyType" | "readingTimeText" | "toc"> & {
        body: PortableTextNode[];
      }
    >
  >({
    query: allPostsQuery,
    tags: ["sanity:posts"],
  });

  if (!posts) {
    return null;
  }

  return posts.map((post) => {
    const plainText = getPortableTextPlainText(post.body);

    return {
      ...post,
      bodyType: "portableText" as const,
      portableText: post.body,
      readingTimeText: readingTime(plainText).text,
      toc: extractTableOfContentsFromPortableText(post.body),
    };
  });
}

export const getAllPosts = cache(async () => {
  const sanityPosts = await getSanityPosts();

  if (sanityPosts) {
    return sanityPosts.sort(
      (left, right) =>
        new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
    );
  }

  const postFiles = readdirSync(blogDirectory).filter((fileName) =>
    fileName.endsWith(".mdx"),
  );

  return postFiles
    .map(parseBlogFile)
    .sort(
      (left, right) =>
        new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
    );
});

export const getAllPostSlugs = cache(async () => (await getAllPosts()).map((post) => post.slug));

export const getFeaturedPosts = cache(async (limit = 3) =>
  (await getAllPosts())
    .filter((post) => post.featured)
    .slice(0, limit),
);

export const getPostBySlug = cache(async (slug: string) =>
  (await getAllPosts()).find((post) => post.slug === slug),
);

export const getBlogCategories = cache(async () =>
  Array.from(new Set((await getAllPosts()).map((post) => post.category))).sort(),
);

export const getBlogTags = cache(async () =>
  Array.from(new Set((await getAllPosts()).flatMap((post) => post.tags))).sort(),
);

export const getRelatedPosts = cache(async (slug: string, limit = 3) => {
  const currentPost = await getPostBySlug(slug);

  if (!currentPost) {
    return [];
  }

  const related = (await getAllPosts())
    .filter((post) => post.slug !== slug)
    .map((post) => {
      const sharedTags = post.tags.filter((tag) => currentPost.tags.includes(tag)).length;
      const sharedCategory = post.category === currentPost.category ? 1 : 0;

      return {
        post,
        score: sharedTags * 2 + sharedCategory,
      };
    })
    .sort((left, right) => right.score - left.score);

  return related.slice(0, limit).map((entry) => entry.post);
});

function getPostSearchText(post: BlogPost) {
  const bodyText =
    post.bodyType === "portableText"
      ? getPortableTextPlainText(post.portableText || [])
      : post.markdown || "";

  return [post.title, post.excerpt, bodyText, post.category, ...post.tags].join(" ");
}

export function filterPosts(
  posts: BlogPost[],
  query?: string,
  category?: string,
  tag?: string,
) {
  const normalizedQuery = query?.trim().toLowerCase();
  const normalizedCategory = category?.trim().toLowerCase();
  const normalizedTag = tag?.trim().toLowerCase();

  return posts.filter((post) => {
    const queryMatches =
      !normalizedQuery || getPostSearchText(post).toLowerCase().includes(normalizedQuery);
    const categoryMatches =
      !normalizedCategory || post.category.toLowerCase() === normalizedCategory;
    const tagMatches =
      !normalizedTag || post.tags.some((item) => item.toLowerCase() === normalizedTag);

    return queryMatches && categoryMatches && tagMatches;
  });
}
