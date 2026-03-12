'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useMarket } from '@/components/providers/market-provider';
import { getPricingDisplay } from '@/lib/pricing';
import type { BlogPost } from '@/types/blog';
import type { Product } from '@/types/product';

export type SearchCategory = 'products' | 'blog' | 'all';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: SearchCategory;
  href: string;
  type: 'product' | 'blog';
  badge?: string;
  image?: string;
  price?: string;
  variantLabel?: string;
}

interface UsePredictiveSearchOptions {
  products?: Product[];
  posts?: BlogPost[];
  maxResults?: number;
  debounceMs?: number;
}

/**
 * Hook for predictive search with real-time results
 * Searches across products and blog posts
 * Client-side implementation, extensible to API
 */
export function usePredictiveSearch({
  products = [],
  posts = [],
  maxResults = 10,
  debounceMs = 300,
}: UsePredictiveSearchOptions = {}) {
  const { marketCode } = useMarket();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window === 'undefined') {
      return [];
    }

    try {
      const stored = localStorage.getItem('search-recent');

      return stored ? JSON.parse(stored).slice(0, 5) : [];
    } catch {
      return [];
    }
  });
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Normalize search query
  const normalizeQuery = (q: string) => q.toLowerCase().trim();

  // Search logic - memoized for performance
  const performSearch = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      const normalized = normalizeQuery(searchQuery);

      // Search products
      const productResults: SearchResult[] = products
        .filter((product) => {
          const searchableText = `${product.name} ${product.category} ${product.shortDescription} ${product.benefits.join(
            ' '
          )}`.toLowerCase();
          return searchableText.includes(normalized);
        })
        .slice(0, maxResults)
        .map((product) => {
          const pricing = getPricingDisplay(product.pricing, marketCode);

          return {
            id: product.slug,
            title: product.name,
            description: product.shortDescription,
            category: 'products' as const,
            href: `/products/${product.slug}`,
            type: 'product' as const,
            badge: product.badge,
            image: product.images[0]?.src,
            price: pricing.current,
            variantLabel: pricing.variantLabel,
          };
        });

      // Search blog posts
      const blogResults: SearchResult[] = posts
        .filter((post) => {
          const searchableText = `${post.title} ${post.excerpt} ${post.tags.join(
            ' '
          )} ${post.category}`.toLowerCase();
          return searchableText.includes(normalized);
        })
        .slice(0, maxResults)
        .map((post) => ({
          id: post.slug,
          title: post.title,
          description: post.excerpt,
          category: 'blog' as const,
          href: `/blog/${post.slug}`,
          type: 'blog' as const,
          image: post.coverImage?.src,
        }));

      // Combine and limit results
      const combined = [...productResults, ...blogResults].slice(0, maxResults);
      setResults(combined);
      setIsLoading(false);
    },
    [marketCode, products, posts, maxResults]
  );

  // Debounced search handler
  const handleSearch = useCallback(
    (searchQuery: string) => {
      setQuery(searchQuery);

      // Clear previous timeout
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      // Set new debounced search
      debounceTimeout.current = setTimeout(() => {
        performSearch(searchQuery);
      }, debounceMs);
    },
    [performSearch, debounceMs]
  );

  // Save search to recent
  const saveSearch = useCallback((searchQuery: string) => {
    const normalized = normalizeQuery(searchQuery);
    if (!normalized) return;

    setRecentSearches((prev) => {
      const updated = [
        normalized,
        ...prev.filter((s) => s !== normalized),
      ].slice(0, 5);

      try {
        localStorage.setItem('search-recent', JSON.stringify(updated));
      } catch {
        // Ignore storage errors
      }

      return updated;
    });
  }, []);

  // Clear search
  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
  }, []);

  // Clear recent searches
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('search-recent');
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Memoized suggestions (recent or empty state)
  const suggestions = useMemo(() => {
    if (query.trim()) return results;
    return recentSearches.map((search) => ({
      id: search,
      title: search,
      description: 'Recent search',
      category: 'all' as const,
      href: `/products?q=${encodeURIComponent(search)}`,
      type: 'product' as const,
    }));
  }, [query, results, recentSearches]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return {
    query,
    results: suggestions,
    isLoading,
    recentSearches,
    handleSearch,
    saveSearch,
    clearSearch,
    clearRecentSearches,
  };
}
