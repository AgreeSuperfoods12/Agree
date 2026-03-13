import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { TrackedLink } from "@/components/analytics/tracked-link";
import { BlogCard } from "@/components/blog/blog-card";
import { mdxComponents } from "@/components/blog/mdx-components";
import { PortableTextContent } from "@/components/blog/portable-text-components";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/products/product-card";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { buttonStyles } from "@/components/ui/button";
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from "@/lib/content/blog";
import { getAllProducts } from "@/lib/content/products";
import { buildMetadata } from "@/lib/seo/metadata";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo/schema";
import { formatDate } from "@/lib/utils";
import type { Product } from "@/types/product";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllPostSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: "Article not found",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: post.seo.title,
    description: post.seo.description,
    path: post.seo.canonicalPath,
    image: post.coverImage.src,
    keywords: post.seo.keywords,
    noIndex: post.seo.noIndex,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt || post.publishedAt,
    authors: [post.author],
  });
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const compiled =
    post.bodyType === "markdown" && post.markdown
      ? await compileMDX({
          source: post.markdown,
          components: mdxComponents,
          options: {
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
            },
          },
        })
      : null;

  const [relatedPosts, allProducts] = await Promise.all([
    getRelatedPosts(post.slug, 3),
    getAllProducts(),
  ]);
  const relatedProducts = post.relatedProducts
    .map((relatedSlug) => allProducts.find((product) => product.slug === relatedSlug))
    .filter((product): product is Product => Boolean(product))
    .slice(0, 3);
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${post.slug}` },
  ];

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(breadcrumbItems)} />
      <JsonLd data={getArticleSchema(post)} />

      <article className="section-shell">
        <Container className="grid gap-10 lg:grid-cols-[1fr_0.32fr]">
          <div className="space-y-8">
            <Breadcrumbs items={breadcrumbItems} />
            <header className="premium-panel space-y-5 p-7 sm:p-8 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-olive-700">
                {post.category}
              </p>
              <h1 className="max-w-4xl text-4xl sm:text-5xl lg:text-6xl">{post.title}</h1>
              <p className="max-w-3xl text-lg leading-8 text-olive-800">{post.excerpt}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-olive-700">
                <span>{post.author}</span>
                <span>{post.authorRole}</span>
                <span>{formatDate(post.publishedAt)}</span>
                <span>{post.readingTimeText}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="rounded-full bg-olive-50 px-3 py-1 text-xs font-medium text-olive-800"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </header>
            <div className="image-stage relative aspect-[16/9] overflow-hidden">
              <Image
                src={post.coverImage.src}
                alt={post.coverImage.alt}
                fill
                priority
                sizes="(min-width: 1024px) 70vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="prose-content card-surface p-6 sm:p-8 lg:p-10">
              {post.bodyType === "portableText" && post.portableText ? (
                <PortableTextContent value={post.portableText} />
              ) : (
                compiled?.content || null
              )}
            </div>
          </div>
          <div className="space-y-6">
            <TableOfContents items={post.toc} />
            <div className="dark-panel p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-100/60">
                Explore Agree
              </p>
              <p className="mt-3 text-lg leading-7 text-sand-50">
                Continue from article reading into product pages, FAQs, and direct support if you want to know more.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <TrackedLink
                  href="/products"
                  className={buttonStyles({ size: "lg" })}
                  eventData={{
                    location: "blog_sidebar",
                    label: "Explore products",
                    article_slug: post.slug,
                  }}
                >
                  Explore products
                </TrackedLink>
                <TrackedLink
                  href="/contact"
                  className={buttonStyles({
                    variant: "secondary",
                    size: "lg",
                    className: "bg-white text-olive-950",
                  })}
                  eventData={{
                    location: "blog_sidebar",
                    label: "Contact support",
                    article_slug: post.slug,
                  }}
                >
                  Contact Us
                </TrackedLink>
              </div>
            </div>
          </div>
        </Container>
      </article>

      {relatedProducts.length > 0 ? (
        <section className="section-shell pt-0">
          <Container>
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-olive-700">
                Related products
              </p>
              <h2 className="mt-3 text-3xl">Products mentioned in this article</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {relatedProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {relatedPosts.length > 0 ? (
        <section className="section-shell pt-0">
          <Container>
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-olive-700">
                Related posts
              </p>
              <h2 className="mt-3 text-3xl">Keep reading</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
