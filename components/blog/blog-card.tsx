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
    <article className="group card-surface overflow-hidden transition duration-300 hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden bg-sand-100">
        <Image
          src={post.coverImage.src}
          alt={post.coverImage.alt}
          fill
          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute left-5 top-5 rounded-full bg-white/92 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-800">
          {post.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="mt-3 text-2xl">
          <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-olive-700">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 leading-7 text-olive-800">{post.excerpt}</p>
        <div className="mt-5 flex items-center justify-between gap-4 text-sm text-olive-700">
          <span>{formatDate(post.publishedAt)}</span>
          <span>{post.readingTimeText}</span>
        </div>
      </div>
    </article>
  );
}
