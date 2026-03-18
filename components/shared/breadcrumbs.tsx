import Link from "next/link";

import type { BreadcrumbItem } from "@/types/site";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="overflow-hidden">
      <ol className="flex items-center gap-2 overflow-x-auto pb-1 text-sm text-olive-700 sm:flex-wrap sm:overflow-visible">
        {items.map((item, index) => (
          <li key={item.href} className="flex shrink-0 items-center gap-2 sm:min-w-0">
            {index < items.length - 1 ? (
              <Link
                href={item.href}
                className="max-w-[7.5rem] truncate rounded-full bg-white/78 px-3 py-1.5 transition-colors hover:text-olive-950 sm:max-w-none"
              >
                {item.name}
              </Link>
            ) : (
              <span className="max-w-[13.5rem] truncate rounded-full bg-olive-950 px-3 py-1.5 text-sand-50 sm:max-w-[20rem] md:max-w-none">
                {item.name}
              </span>
            )}
            {index < items.length - 1 ? <span aria-hidden className="text-olive-400">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
