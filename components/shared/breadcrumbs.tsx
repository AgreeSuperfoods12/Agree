import Link from "next/link";

import type { BreadcrumbItem } from "@/types/site";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-olive-700">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index < items.length - 1 ? (
              <Link
                href={item.href}
                className="rounded-full bg-white/78 px-3 py-1.5 transition-colors hover:text-olive-950"
              >
                {item.name}
              </Link>
            ) : (
              <span className="rounded-full bg-olive-950 px-3 py-1.5 text-sand-50">
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
