import { getBlogCategories, getBlogTags } from "@/lib/content/blog";

interface BlogFilterFormProps {
  query?: string;
  category?: string;
  tag?: string;
}

export async function BlogFilterForm({ query, category, tag }: BlogFilterFormProps) {
  const [categories, tags] = await Promise.all([getBlogCategories(), getBlogTags()]);

  return (
    <form className="premium-panel grid gap-4 p-5 md:grid-cols-[1.4fr_0.8fr_0.8fr_auto]">
      <label className="grid gap-2">
        <span className="text-sm font-medium text-olive-900">Search</span>
        <input
          type="search"
          name="query"
          defaultValue={query}
          placeholder="Search by topic, product, or category"
          className="min-h-12 rounded-[1.4rem] border border-olive-950/10 bg-sand-50/75 px-4 text-sm text-olive-950 outline-none transition focus:border-olive-950/30 focus:bg-white"
        />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-medium text-olive-900">Category</span>
        <select
          name="category"
          defaultValue={category}
          className="min-h-12 rounded-[1.4rem] border border-olive-950/10 bg-sand-50/75 px-4 text-sm text-olive-950 outline-none transition focus:border-olive-950/30 focus:bg-white"
        >
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-medium text-olive-900">Tag</span>
        <select
          name="tag"
          defaultValue={tag}
          className="min-h-12 rounded-[1.4rem] border border-olive-950/10 bg-sand-50/75 px-4 text-sm text-olive-950 outline-none transition focus:border-olive-950/30 focus:bg-white"
        >
          <option value="">All tags</option>
          {tags.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <div className="flex items-end">
        <button
          type="submit"
          className="min-h-12 w-full rounded-full bg-olive-950 px-5 py-3 text-sm font-medium text-sand-50 transition hover:bg-olive-900"
        >
          Apply
        </button>
      </div>
    </form>
  );
}
