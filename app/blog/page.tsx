import type { Metadata } from "next";

import { filterPosts, getAllPosts } from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema } from "@/lib/seo/schema";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogFilterForm } from "@/components/blog/blog-filter-form";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/shared/page-hero";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Read Agree Superfoods articles on seeds, teas, simple pantry habits, and everyday wellness routines.",
  path: "/blog",
});

interface BlogPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const query =
    typeof resolvedSearchParams.query === "string" ? resolvedSearchParams.query : undefined;
  const category =
    typeof resolvedSearchParams.category === "string" ? resolvedSearchParams.category : undefined;
  const tag = typeof resolvedSearchParams.tag === "string" ? resolvedSearchParams.tag : undefined;

  const posts = filterPosts(await getAllPosts(), query, category, tag);

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ])}
      />
      <PageHero
        eyebrow="Educational content"
        title="Helpful reading on seeds, teas, snacking, and simple food habits."
        description="Explore practical articles from Agree Superfoods covering ingredient ideas, tea comparisons, daily routines, and pantry inspiration."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-[1.5rem] border border-olive-950/8 bg-white/78 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-700">
              Article count
            </p>
            <p className="mt-2 text-sm leading-6 text-olive-900">{posts.length} articles</p>
          </div>
          <div className="rounded-[1.5rem] border border-olive-950/8 bg-white/78 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-700">
              Content focus
            </p>
            <p className="mt-2 text-sm leading-6 text-olive-900">
              Ingredient guidance and daily use
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-olive-950/8 bg-white/78 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-700">
              Internal links
            </p>
            <p className="mt-2 text-sm leading-6 text-olive-900">
              Connected to products and FAQs
            </p>
          </div>
        </div>
      </PageHero>
      <section className="section-shell pt-0">
        <Container>
          <BlogFilterForm query={query} category={category} tag={tag} />
          {posts.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="mt-10 card-surface p-8">
              <h2 className="text-2xl">No articles matched those filters.</h2>
              <p className="mt-4 leading-7 text-olive-800">
                Try a broader search term or remove a category or tag filter.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
