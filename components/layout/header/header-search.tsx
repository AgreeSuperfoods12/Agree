"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import { CloseIcon, SearchIcon } from "@/components/layout/header/header-icons";
import { buttonStyles } from "@/components/ui/button";
import { usePredictiveSearch, type SearchResult } from "@/lib/hooks/use-predictive-search";
import { cn } from "@/lib/utils";
import type { SearchablePost, SearchableProduct } from "@/types/search";

interface HeaderSearchProps {
  onClose: () => void;
  products: SearchableProduct[];
  posts: SearchablePost[];
}

function getProductsSearchUrl(query: string) {
  return `/products?q=${encodeURIComponent(query.trim())}`;
}

function getBlogSearchUrl(query: string) {
  return `/blog?query=${encodeURIComponent(query.trim())}`;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightMatches(text: string, tokens: string[]): ReactNode {
  const normalizedTokens = Array.from(
    new Set(
      tokens
        .map((token) => token.trim().toLowerCase())
        .filter((token) => token.length >= 2),
    ),
  ).sort((left, right) => right.length - left.length);

  if (normalizedTokens.length === 0 || text.trim().length === 0) {
    return text;
  }

  const pattern = new RegExp(`(${normalizedTokens.map(escapeRegExp).join("|")})`, "ig");
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    const lowerPart = part.toLowerCase();
    const isMatch = normalizedTokens.some((token) => token === lowerPart);

    return isMatch ? (
      <mark key={`${part}-${index}`} className="rounded bg-[#f7e6b6] px-0.5 text-current">
        {part}
      </mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    );
  });
}

interface SearchResultItemProps {
  result: SearchResult;
  isHighlighted: boolean;
  onMouseEnter: () => void;
  onSelect: () => void;
  queryTokens: string[];
}

function SearchResultItem({
  result,
  isHighlighted,
  onMouseEnter,
  onSelect,
  queryTokens,
}: SearchResultItemProps) {
  return (
    <button
      type="button"
      onMouseEnter={onMouseEnter}
      onClick={onSelect}
      className={cn(
        "w-full border-b border-olive-950/6 px-4 py-3 text-left transition last:border-b-0",
        isHighlighted ? "bg-sand-50/85" : "hover:bg-sand-50/70",
      )}
    >
      <div className="flex items-start gap-3">
        {result.image ? (
          <div className="relative mt-0.5 size-11 shrink-0 overflow-hidden rounded-[0.6rem] border border-olive-950/8 bg-sand-100">
            <Image
              src={result.image}
              alt={result.title}
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="grid size-11 shrink-0 place-items-center rounded-[0.6rem] border border-olive-950/8 bg-sand-100 text-[10px] font-semibold uppercase tracking-[0.18em] text-olive-700">
            {result.type === "product" ? "PRD" : "BLG"}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-olive-950">
            {highlightMatches(result.title, queryTokens)}
          </p>
          <p className="mt-0.5 line-clamp-2 text-xs leading-5 text-olive-700">
            {highlightMatches(result.description, queryTokens)}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px]">
            <span className="rounded-full border border-olive-950/10 bg-white px-2 py-1 font-semibold uppercase tracking-[0.18em] text-olive-700">
              {result.type === "product" ? "Product" : "Article"}
            </span>
            {result.variantLabel ? (
              <span className="rounded-full bg-sand-100 px-2 py-1 font-semibold uppercase tracking-[0.18em] text-olive-700">
                {result.variantLabel}
              </span>
            ) : null}
            {result.price ? (
              <span className="text-xs font-semibold text-olive-950">{result.price}</span>
            ) : null}
          </div>
        </div>
      </div>
    </button>
  );
}

export function HeaderSearch({ onClose, products, posts }: HeaderSearchProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const {
    query,
    results,
    isLoading,
    recentSearches,
    handleSearch,
    saveSearch,
    clearSearch,
    clearRecentSearches,
  } = usePredictiveSearch({
    products,
    posts,
    maxResults: 10,
    debounceMs: 190,
  });

  const openProductsSearch = useCallback(
    (searchTerm: string) => {
      const trimmed = searchTerm.trim();
      if (!trimmed) {
        return;
      }

      saveSearch(trimmed);
      router.push(getProductsSearchUrl(trimmed));
      onClose();
    },
    [onClose, router, saveSearch],
  );

  const openResult = useCallback(
    (href: string) => {
      saveSearch(query);
      router.push(href);
      onClose();
    },
    [onClose, query, router, saveSearch],
  );

  const openBlogSearch = useCallback(
    (searchTerm: string) => {
      const trimmed = searchTerm.trim();
      if (!trimmed) {
        return;
      }

      saveSearch(trimmed);
      router.push(getBlogSearchUrl(trimmed));
      onClose();
    },
    [onClose, router, saveSearch],
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!formRef.current?.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setHighlightedIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const displayedResults = useMemo(() => {
    const productResults = results.filter((result) => result.type === "product");
    const blogResults = results.filter((result) => result.type === "blog");

    return [...productResults, ...blogResults];
  }, [results]);

  const queryTokens = useMemo(
    () => query.toLowerCase().split(/\s+/).map((token) => token.trim()).filter(Boolean),
    [query],
  );

  const productsResultEntries = useMemo(
    () =>
      displayedResults
        .map((result, index) => ({ result, index }))
        .filter((entry) => entry.result.type === "product"),
    [displayedResults],
  );

  const postsResultEntries = useMemo(
    () =>
      displayedResults
        .map((result, index) => ({ result, index }))
        .filter((entry) => entry.result.type === "blog"),
    [displayedResults],
  );

  const popularSearches = useMemo(() => {
    const categoryTerms = Array.from(new Set(products.map((product) => product.category))).slice(0, 3);
    const tagTerms = Array.from(new Set(posts.flatMap((post) => post.tags))).slice(0, 3);

    return [...categoryTerms, ...tagTerms].slice(0, 6);
  }, [posts, products]);

  const showRecentSearches = isDropdownOpen && !query.trim() && recentSearches.length > 0;
  const showPopularSearches = isDropdownOpen && !query.trim() && recentSearches.length === 0 && popularSearches.length > 0;
  const showSearchResults = isDropdownOpen && Boolean(query.trim());
  const hasNoResults = showSearchResults && !isLoading && displayedResults.length === 0;
  const activeHighlightedIndex =
    highlightedIndex >= 0 && highlightedIndex < displayedResults.length ? highlightedIndex : -1;

  const highlightedResult = useMemo(() => {
    if (activeHighlightedIndex < 0) {
      return null;
    }

    return displayedResults[activeHighlightedIndex];
  }, [activeHighlightedIndex, displayedResults]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (highlightedResult) {
      openResult(highlightedResult.href);
      return;
    }

    openProductsSearch(query);
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!displayedResults.length) {
        return;
      }

      setIsDropdownOpen(true);
      setHighlightedIndex((previousIndex) =>
        (previousIndex >= 0 && previousIndex < displayedResults.length ? previousIndex : -1) >= displayedResults.length - 1
          ? 0
          : (previousIndex >= 0 && previousIndex < displayedResults.length ? previousIndex : -1) + 1,
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!displayedResults.length) {
        return;
      }

      setIsDropdownOpen(true);
      setHighlightedIndex((previousIndex) =>
        (previousIndex >= 0 && previousIndex < displayedResults.length ? previousIndex : -1) <= 0
          ? displayedResults.length - 1
          : (previousIndex >= 0 && previousIndex < displayedResults.length ? previousIndex : -1) - 1,
      );
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setIsDropdownOpen(false);
      setHighlightedIndex(-1);
    }
  }

  return (
    <form ref={formRef} action="/products" onSubmit={handleSubmit} className="flex min-h-[3.3rem] items-center gap-2">
      <div className="relative flex-1">
        <div className="flex items-center gap-3 rounded-[1rem] border border-olive-950/12 bg-sand-50/78 px-4 py-2 sm:px-4">
          <SearchIcon />
          <input
            type="search"
            name="q"
            value={query}
            autoFocus
            autoComplete="off"
            placeholder="Search your items..."
            onChange={(event) => {
              handleSearch(event.target.value);
              setIsDropdownOpen(true);
              setHighlightedIndex(-1);
            }}
            onFocus={() => {
              setIsDropdownOpen(true);
            }}
            onKeyDown={handleInputKeyDown}
            className="w-full bg-transparent text-sm text-olive-950 outline-none placeholder:text-olive-700/60"
            aria-label="Search products and blog posts"
            aria-controls="header-search-results"
            aria-autocomplete="list"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                clearSearch();
                setIsDropdownOpen(true);
                setHighlightedIndex(-1);
              }}
              className="rounded-full px-2 py-1 text-xs font-medium text-olive-700 transition hover:bg-white/80 hover:text-olive-950"
            >
              Clear
            </button>
          ) : null}
          <button type="submit" className={buttonStyles({ size: "md", className: "hidden sm:inline-flex" })}>
            Search
          </button>
        </div>

        {(showSearchResults || showRecentSearches || showPopularSearches) ? (
          <div
            id="header-search-results"
            className="absolute inset-x-0 top-[calc(100%+0.45rem)] z-50 overflow-hidden rounded-[1rem] border border-olive-950/10 bg-white shadow-[0_22px_55px_-35px_rgba(19,32,24,0.42)]"
          >
            {showRecentSearches ? (
              <div>
                <div className="flex items-center justify-between border-b border-olive-950/8 px-4 py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-olive-700/85">
                    Recent searches
                  </p>
                  <button
                    type="button"
                    onClick={clearRecentSearches}
                    className="text-xs text-olive-700/75 transition hover:text-olive-950"
                  >
                    Clear
                  </button>
                </div>
                <div className="grid">
                  {recentSearches.map((recentQuery) => (
                    <button
                      key={recentQuery}
                      type="button"
                      onClick={() => {
                        openProductsSearch(recentQuery);
                      }}
                      className="border-b border-olive-950/6 px-4 py-2.5 text-left text-sm text-olive-900 transition last:border-b-0 hover:bg-sand-50/70"
                    >
                      {recentQuery}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {showPopularSearches ? (
              <div>
                <div className="border-b border-olive-950/8 px-4 py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-olive-700/85">
                    Discover popular
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 p-4">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => {
                        openProductsSearch(term);
                      }}
                      className="rounded-full border border-olive-950/12 bg-sand-50 px-3 py-1.5 text-xs font-medium text-olive-900 transition hover:border-olive-950/30 hover:bg-sand-100"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {showSearchResults ? (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-olive-950/8 px-4 py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-olive-700/85">
                    {isLoading ? "Searching..." : `${displayedResults.length} matches found`}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openProductsSearch(query)}
                      className="rounded-full border border-olive-950/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-olive-700 transition hover:border-olive-950/30 hover:text-olive-950"
                    >
                      Catalog
                    </button>
                    <button
                      type="button"
                      onClick={() => openBlogSearch(query)}
                      className="rounded-full border border-olive-950/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-olive-700 transition hover:border-olive-950/30 hover:text-olive-950"
                    >
                      Journal
                    </button>
                  </div>
                </div>

                {isLoading ? (
                  <div className="px-4 py-3 text-sm text-olive-700">Searching...</div>
                ) : null}

                {!isLoading && displayedResults.length > 0 ? (
                  <div className="max-h-[24rem] overflow-y-auto">
                    {productsResultEntries.length > 0 ? (
                      <div className="border-b border-olive-950/8 bg-sand-50/65 px-4 py-2">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-olive-700/85">
                          Products
                        </p>
                      </div>
                    ) : null}
                    {productsResultEntries.map((entry) => (
                      <SearchResultItem
                        key={`${entry.result.type}-${entry.result.id}`}
                        result={entry.result}
                        isHighlighted={entry.index === activeHighlightedIndex}
                        onMouseEnter={() => setHighlightedIndex(entry.index)}
                        onSelect={() => openResult(entry.result.href)}
                        queryTokens={queryTokens}
                      />
                    ))}

                    {postsResultEntries.length > 0 ? (
                      <div className="border-y border-olive-950/8 bg-sand-50/65 px-4 py-2">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-olive-700/85">
                          Articles
                        </p>
                      </div>
                    ) : null}
                    {postsResultEntries.map((entry) => (
                      <SearchResultItem
                        key={`${entry.result.type}-${entry.result.id}`}
                        result={entry.result}
                        isHighlighted={entry.index === activeHighlightedIndex}
                        onMouseEnter={() => setHighlightedIndex(entry.index)}
                        onSelect={() => openResult(entry.result.href)}
                        queryTokens={queryTokens}
                      />
                    ))}
                  </div>
                ) : null}

                {hasNoResults ? (
                  <div className="px-4 py-4 text-sm text-olive-700">
                    <p>No direct matches found for “{query.trim()}”.</p>
                    <p className="mt-1 text-xs text-olive-700/80">
                      Try a shorter keyword or use Catalog/Journal for full results.
                    </p>
                  </div>
                ) : null}

                {!isLoading ? (
                  <div className="flex items-center justify-between border-t border-olive-950/8 bg-sand-50/45 px-4 py-2 text-[11px] text-olive-700">
                    <span>Use ↑ ↓ to navigate, Enter to open, Esc to close</span>
                    <button
                      type="button"
                      onClick={() => openProductsSearch(query)}
                      className="font-semibold text-olive-900 transition hover:text-olive-950"
                    >
                      View all
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
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
