import type { TableOfContentsItem } from "@/types/blog";

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <aside className="card-surface top-28 p-6 lg:sticky">
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-olive-700">
        On this page
      </p>
      <nav className="mt-5">
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block text-sm leading-6 text-olive-800 transition-colors hover:text-olive-950 ${
                  item.level === 3 ? "pl-4" : ""
                }`}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

