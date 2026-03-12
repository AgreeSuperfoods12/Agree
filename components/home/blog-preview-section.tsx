import Image from "next/image";
import Link from "next/link";

import type { BlogPost } from "@/types/blog";
import { Container } from "@/components/layout/container";
import { buttonStyles } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

interface BlogPreviewSectionProps {
  posts: BlogPost[];
}

function JournalMeta({ post }: { post: BlogPost }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-olive-600">
      <span>{formatDate(post.publishedAt)}</span>
      <span className="h-1 w-1 rounded-full bg-olive-300" />
      <span>{post.readingTimeText}</span>
    </div>
  );
}

function FeaturedJournalCard({ post }: { post: BlogPost }) {
  return (
    <article className="group overflow-hidden rounded-[2.1rem] border border-olive-950/8 bg-white/88 shadow-[0_32px_88px_-56px_rgba(19,32,24,0.34)]">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/11] overflow-hidden">
          <Image
            src={post.coverImage.src}
            alt={post.coverImage.alt}
            fill
            sizes="(min-width: 1280px) 46vw, (min-width: 1024px) 54vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,32,24,0.06),rgba(19,32,24,0.38))]" />
          <div className="absolute left-5 top-5 rounded-full border border-white/55 bg-white/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-olive-950 backdrop-blur-sm">
            {post.category}
          </div>
        </div>
      </Link>

      <div className="p-6 sm:p-7">
        <h3 className="max-w-[16ch] text-[2rem] leading-[1.02] tracking-[-0.035em] text-olive-950 sm:text-[2.35rem]">
          <Link href={`/blog/${post.slug}`} className="transition hover:text-olive-700">
            {post.title}
          </Link>
        </h3>

        <p className="mt-4 max-w-[56ch] text-base leading-8 text-olive-800">
          {post.excerpt}
        </p>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <JournalMeta post={post} />
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-olive-950 transition hover:text-olive-700"
          >
            Read article
            <span className="inline-flex size-8 items-center justify-center rounded-full border border-olive-950/10 bg-sand-50">
              +
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

function CompactJournalCard({ post }: { post: BlogPost }) {
  return (
    <article className="group overflow-hidden rounded-[1.8rem] border border-olive-950/8 bg-white/82 shadow-[0_24px_70px_-52px_rgba(19,32,24,0.28)] transition duration-300 hover:-translate-y-1">
      <div className="grid h-full gap-0 sm:grid-cols-[0.42fr_0.58fr] lg:grid-cols-[0.44fr_0.56fr]">
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="relative h-full min-h-[16rem] overflow-hidden bg-sand-100">
            <Image
              src={post.coverImage.src}
              alt={post.coverImage.alt}
              fill
              sizes="(min-width: 1280px) 18vw, (min-width: 640px) 34vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute left-4 top-4 rounded-full border border-white/55 bg-white/92 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-olive-950 backdrop-blur-sm">
              {post.category}
            </div>
          </div>
        </Link>

        <div className="flex h-full flex-col p-5 sm:p-6">
          <h3 className="max-w-[14ch] text-[1.7rem] leading-[1.06] tracking-[-0.03em] text-olive-950">
            <Link href={`/blog/${post.slug}`} className="transition hover:text-olive-700">
              {post.title}
            </Link>
          </h3>

          <p className="mt-4 text-sm leading-7 text-olive-800 sm:text-base">
            {post.excerpt}
          </p>

          <div className="mt-6 flex flex-1 flex-col justify-end gap-4">
            <JournalMeta post={post} />
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-olive-950 transition hover:text-olive-700"
            >
              Read article
              <span className="inline-flex size-8 items-center justify-center rounded-full border border-olive-950/10 bg-sand-50">
                +
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function BlogPreviewSection({ posts }: BlogPreviewSectionProps) {
  if (posts.length === 0) {
    return null;
  }

  const [featuredPost, ...secondaryPosts] = posts;
  const categories = Array.from(new Set(posts.map((post) => post.category))).slice(0, 3);

  return (
    <section className="section-shell">
      <Container>
        <div className="rounded-[2.7rem] border border-olive-950/7 bg-[linear-gradient(180deg,rgba(255,255,255,0.52),rgba(249,245,238,0.96))] px-6 py-7 shadow-[0_34px_95px_-64px_rgba(19,32,24,0.3)] sm:px-8 sm:py-9 lg:px-10 lg:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[42rem]">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-olive-700">
                From the journal
              </p>
              <h2 className="mt-4 max-w-[12ch] text-4xl sm:text-5xl lg:text-[4.1rem]">
                Everyday ingredient guides and serving ideas.
              </h2>
              <p className="mt-5 max-w-[42rem] text-base leading-8 text-olive-800 sm:text-lg">
                Read simple guides on teas, seeds, pantry habits, and easy ways to use the range at home.
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 lg:items-end">
              <div className="flex flex-wrap gap-2.5">
                {categories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full border border-olive-950/10 bg-white/82 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-olive-700"
                  >
                    {category}
                  </span>
                ))}
              </div>

              <Link href="/blog" className={buttonStyles({ variant: "secondary" })}>
                Visit the blog
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <FeaturedJournalCard post={featuredPost} />

            <div className="grid gap-6">
              {secondaryPosts.map((post) => (
                <CompactJournalCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
