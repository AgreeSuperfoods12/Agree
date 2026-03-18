import Image from "next/image";
import Link from "next/link";

import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types/blog";

interface BlogCardProps {
  post: Pick<
    BlogPost,
    | "slug"
    | "title"
    | "excerpt"
    | "coverImage"
    | "publishedAt"
    | "readingTimeText"
    | "category"
  >;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group card-surface overflow-hidden border border-olive-950/7 transition duration-300 hover:-translate-y-1.5">
      <div className="relative aspect-[16/10] overflow-hidden bg-sand-100">
        <Image
          src={post.coverImage.src}
          alt={post.coverImage.alt}
          fill
          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,32,24,0.03),rgba(19,32,24,0.24))]" />
        <div className="absolute left-5 top-5 rounded-full bg-white/92 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-800">
          {post.category}
        </div>
      </div>
      <div className="p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-3 text-sm text-olive-700">
          <span>{formatDate(post.publishedAt)}</span>
          <span className="size-1 rounded-full bg-olive-300" />
          <span>{post.readingTimeText}</span>
        </div>
        <h3 className="mt-4 text-2xl leading-[1.08] tracking-[-0.03em]">
          <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-olive-700">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 text-[1rem] leading-7 text-olive-800">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-olive-950 transition hover:text-olive-700"
        >
          Read article
          <span className="inline-flex size-8 items-center justify-center rounded-full border border-olive-950/10 bg-sand-50">
            +
          </span>
        </Link>
      </div>
    </article>
  );
}
