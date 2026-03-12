'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePredictiveSearch, type SearchResult } from '@/lib/hooks/use-predictive-search';
import type { BlogPost } from '@/types/blog';
import type { Product } from '@/types/product';

interface PredictiveSearchProps {
  products?: Product[];
  posts?: BlogPost[];
  onSelect?: (href: string) => void;
  maxResults?: number;
  placeholder?: string;
  autoFocus?: boolean;
}

/**
 * PredictiveSearch component with real-time results
 * Displays products and blog posts based on search input
 * Includes recent searches and keyboard navigation
 */
export function PredictiveSearch({
  products = [],
  posts = [],
  onSelect,
  maxResults = 10,
  placeholder = 'Search products, articles...',
  autoFocus = false,
}: PredictiveSearchProps) {
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
    maxResults,
  });

  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = useCallback(() => {
    if (query.trim()) {
      saveSearch(query);
      const searchUrl = `/products?q=${encodeURIComponent(query)}`;
      onSelect?.(searchUrl);
    }
  }, [onSelect, query, saveSearch]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0 && results[highlightedIndex]) {
            const result = results[highlightedIndex];
            saveSearch(query);
            onSelect?.(result.href);
          } else if (query.trim()) {
            handleSubmit();
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSubmit, highlightedIndex, onSelect, query, results, saveSearch]);

  const showResults = isOpen && (results.length > 0 || isLoading || query.trim());
  const showRecent = isOpen && !query.trim() && recentSearches.length > 0;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Search Input */}
      <div className="relative flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            handleSearch(e.target.value);
            setHighlightedIndex(-1);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          autoFocus={autoFocus}
          aria-label="Search"
          aria-controls="search-results"
          aria-autocomplete="list"
          className="w-full rounded-lg border border-[#1d1d1d]/10 px-4 py-2.5 text-sm font-medium placeholder-[#1d1d1d]/50 transition-colors focus:border-[#1d1d1d] focus:outline-none focus:ring-1 focus:ring-[#1d1d1d]"
        />

        {/* Search icon */}
        <SearchIconSVG className="absolute right-3 size-4 text-[#1d1d1d]/40" />

        {/* Clear button */}
        {query && (
          <button
            type="button"
            onClick={() => {
              clearSearch();
              inputRef.current?.focus();
              setHighlightedIndex(-1);
            }}
            className="absolute right-10 p-1 text-[#1d1d1d]/40 hover:text-[#1d1d1d]"
            aria-label="Clear search"
          >
            <ClearIconSVG className="size-4" />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {(showResults || showRecent) && (
        <div
          id="search-results"
          className="absolute top-full left-0 right-0 z-50 mt-2 max-h-96 overflow-y-auto rounded-lg border border-[#1d1d1d]/10 bg-white shadow-lg"
        >
          {/* Loading State */}
          {isLoading && query && (
            <div className="flex items-center justify-center px-4 py-8">
              <LoadingSpinner />
            </div>
          )}

          {/* Results */}
          {!isLoading && results.length > 0 && (
            <div className="divide-y divide-[#1d1d1d]/10">
              {results.map((result, index) => (
                <SearchResultItem
                  key={result.id}
                  result={result}
                  isHighlighted={index === highlightedIndex}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={() => {
                    saveSearch(query);
                    onSelect?.(result.href);
                  }}
                />
              ))}
            </div>
          )}

          {/* Recently Searches */}
          {showRecent && !query && (
            <div className="divide-y divide-[#1d1d1d]/10">
              <div className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-[#1d1d1d]/60">
                    RECENT SEARCHES
                  </h3>
                  <button
                    type="button"
                    onClick={clearRecentSearches}
                    className="text-xs text-[#1d1d1d]/40 hover:text-[#1d1d1d]"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {recentSearches.map((search) => (
                <button
                  key={search}
                  type="button"
                  onClick={() => {
                    handleSearch(search);
                    saveSearch(search);
                    inputRef.current?.focus();
                  }}
                  className="w-full px-4 py-3 text-left text-sm hover:bg-[#f2f2f2] transition"
                >
                  <div className="flex items-center gap-2">
                    <ClockIconSVG className="size-4 text-[#1d1d1d]/40" />
                    <span>{search}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && query && results.length === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-[#1d1d1d]/60">
                No results found for <span>&ldquo;{query}&rdquo;</span>
              </p>
              <p className="text-xs text-[#1d1d1d]/40 mt-1">
                Try a different search term
              </p>
            </div>
          )}
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

// Result item component
function SearchResultItem({
  result,
  isHighlighted,
  onMouseEnter,
  onClick,
}: {
  result: SearchResult;
  isHighlighted: boolean;
  onMouseEnter: () => void;
  onClick: () => void;
}) {
  return (
    <Link
      href={result.href}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={cn(
        'block px-4 py-3 transition',
        isHighlighted ? 'bg-[#f2f2f2]' : 'hover:bg-[#fafafa]'
      )}
    >
      <div className="flex items-start gap-3">
        {result.image && (
          <Image
            src={result.image}
            alt={result.title}
            width={40}
            height={40}
            className="size-10 rounded object-cover"
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="truncate text-sm font-medium text-[#1d1d1d]">
              {result.title}
            </h4>
            <span className="inline-block px-2 py-0.5 text-xs font-semibold text-[#1d1d1d]/60 bg-[#f2f2f2] rounded-full whitespace-nowrap">
              {result.type === 'product' ? 'Product' : 'Article'}
            </span>
          </div>
          <p className="truncate text-xs text-[#1d1d1d]/60 mt-1">
            {result.description}
          </p>
          {result.type === 'product' && result.price ? (
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
              {result.variantLabel ? (
                <span className="rounded-full bg-[#f7f7f7] px-2 py-0.5 font-semibold uppercase tracking-[0.12em] text-[#1d1d1d]/55">
                  {result.variantLabel}
                </span>
              ) : null}
              <span className="font-semibold text-[#1d1d1d]">{result.price}</span>
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

// Icon components
function SearchIconSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function ClearIconSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
}

function ClockIconSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#1d1d1d]/10 border-t-[#1d1d1d]" />
    </div>
  );
}
