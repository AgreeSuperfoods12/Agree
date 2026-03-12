import type { FaqItem } from "@/types/site";

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <details key={item.question} className="card-surface group px-6 py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 pr-1 text-left text-lg font-semibold text-olive-950">
            <span>{item.question}</span>
            <span className="mt-1 rounded-full bg-sand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-olive-700">
              Open
            </span>
          </summary>
          <p className="mt-4 max-w-3xl leading-7 text-olive-800">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
