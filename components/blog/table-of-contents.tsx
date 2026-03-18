import type { TableOfContentsItem } from "@/types/blog";

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <aside className="card-surface top-28 max-h-[calc(100vh-8rem)] overflow-hidden p-6 lg:sticky">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-olive-700">
          On this page
        </p>
        <span className="rounded-full bg-olive-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-olive-700">
          {items.length} sections
        </span>
      </div>
      <nav className="mt-5 overflow-y-auto pr-1">
        <ul className="space-y-1.5">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`group flex items-start gap-3 rounded-[1.1rem] px-3 py-2.5 text-sm leading-6 text-olive-800 transition-all hover:bg-olive-50 hover:text-olive-950 ${
                  item.level === 3 ? "ml-4 text-olive-700" : ""
                }`}
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold-400 transition-transform group-hover:scale-125" />
                <span>{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <a
        href="#article-top"
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-olive-950/8 bg-white px-4 py-2 text-sm font-semibold text-olive-900 transition hover:bg-sand-50"
      >
        Back to top
        <span aria-hidden="true">↑</span>
      </a>
    </aside>
  );
}
