import { buttonStyles } from "@/components/ui/button";
import { CloseIcon, SearchIcon } from "@/components/layout/header/header-icons";

interface HeaderSearchProps {
  onClose: () => void;
}

export function HeaderSearch({ onClose }: HeaderSearchProps) {
  return (
    <form action="/products" className="flex min-h-[3.3rem] items-center gap-2">
      <div className="flex flex-1 items-center gap-3 rounded-[1rem] border border-olive-950/12 bg-sand-50/78 px-4 py-2 sm:px-4">
        <SearchIcon />
        <input
          type="search"
          name="q"
          autoFocus
          placeholder="Search your items..."
          className="w-full bg-transparent text-sm text-olive-950 outline-none placeholder:text-olive-700/60"
        />
        <button type="submit" className={buttonStyles({ size: "md", className: "hidden sm:inline-flex" })}>
          Search
        </button>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close search"
        className="grid size-8 place-items-center rounded-full text-olive-950 transition hover:bg-sand-50"
      >
        <CloseIcon />
      </button>
    </form>
  );
}
