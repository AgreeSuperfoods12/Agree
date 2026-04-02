'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useMarket } from '@/components/providers/market-provider';
import { getPricingDisplay } from '@/lib/pricing';
import type { SearchablePost, SearchableProduct } from '@/types/search';

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
  products?: SearchableProduct[];
  posts?: SearchablePost[];
  maxResults?: number;
  debounceMs?: number;
}

const MAX_RECENT_SEARCHES = 5;

function normalizeText(value: string) {
  return value.toLowerCase().trim();
}

function tokenizeQuery(value: string) {
  return value
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

function levenshteinDistance(left: string, right: string, maxDistance = 2) {
  if (left === right) {
    return 0;
  }

  const leftLength = left.length;
  const rightLength = right.length;

  if (leftLength === 0) {
    return rightLength;
  }

  if (rightLength === 0) {
    return leftLength;
  }

  if (Math.abs(leftLength - rightLength) > maxDistance) {
    return maxDistance + 1;
  }

  const previous = Array.from({ length: rightLength + 1 }, (_, index) => index);
  const current = new Array<number>(rightLength + 1).fill(0);

  for (let leftIndex = 1; leftIndex <= leftLength; leftIndex += 1) {
    current[0] = leftIndex;
    let rowMin = current[0];

    for (let rightIndex = 1; rightIndex <= rightLength; rightIndex += 1) {
      const substitutionCost = left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1;

      current[rightIndex] = Math.min(
        previous[rightIndex] + 1,
        current[rightIndex - 1] + 1,
        previous[rightIndex - 1] + substitutionCost,
      );

      if (current[rightIndex] < rowMin) {
        rowMin = current[rightIndex];
      }
    }

    if (rowMin > maxDistance) {
      return maxDistance + 1;
    }

    for (let index = 0; index <= rightLength; index += 1) {
      previous[index] = current[index];
    }
  }

  return previous[rightLength];
}

function hasFuzzyTokenMatch(token: string, field: string) {
  if (token.length < 4) {
    return false;
  }

  const words = field.split(/[^a-z0-9]+/).filter(Boolean);
  const maxDistance = token.length <= 5 ? 1 : 2;

  return words.some((word) => {
    if (Math.abs(word.length - token.length) > maxDistance) {
      return false;
    }

    return levenshteinDistance(token, word, maxDistance) <= maxDistance;
  });
}

function scoreTokens(field: string, tokens: string[], baseScore: number) {
  if (!tokens.length) {
    return 0;
  }

  const exactMatches = tokens.filter((token) => field.includes(token)).length;
  if (exactMatches > 0) {
    const coverageBonus = Math.round((exactMatches / tokens.length) * 18);
    return baseScore + coverageBonus;
  }

  const fuzzyMatches = tokens.filter((token) => hasFuzzyTokenMatch(token, field)).length;
  if (fuzzyMatches === 0) {
    return 0;
  }

  const fuzzyBase = Math.round(baseScore * 0.62);
  const fuzzyCoverageBonus = Math.round((fuzzyMatches / tokens.length) * 12);

  return fuzzyBase + fuzzyCoverageBonus;
}

function scoreProduct(product: SearchableProduct, normalizedQuery: string, tokens: string[]) {
  const name = normalizeText(product.name);
  const category = normalizeText(product.category);
  const shortDescription = normalizeText(product.shortDescription);
  const benefits = product.benefits.map(normalizeText);

  let score = 0;

  if (name === normalizedQuery) {
    score += 120;
  } else if (name.startsWith(normalizedQuery)) {
    score += 95;
  } else if (name.includes(normalizedQuery)) {
    score += 70;
  }

  if (category.startsWith(normalizedQuery)) {
    score += 45;
  } else if (category.includes(normalizedQuery)) {
    score += 30;
  }

  if (shortDescription.includes(normalizedQuery)) {
    score += 28;
  }

  if (benefits.some((benefit) => benefit.includes(normalizedQuery))) {
    score += 18;
  }

  const tokenScores = [name, category, shortDescription, ...benefits].map((field, index) =>
    scoreTokens(field, tokens, index === 0 ? 26 : 14),
  );
  score += Math.max(0, ...tokenScores);

  const combinedFields = [name, category, shortDescription, ...benefits].join(" ");
  if (tokens.length > 1 && tokens.every((token) => combinedFields.includes(token))) {
    score += 22;
  }

  return score;
}

function scorePost(post: SearchablePost, normalizedQuery: string, tokens: string[]) {
  const title = normalizeText(post.title);
  const excerpt = normalizeText(post.excerpt);
  const category = normalizeText(post.category);
  const tags = post.tags.map(normalizeText);

  let score = 0;

  if (title === normalizedQuery) {
    score += 110;
  } else if (title.startsWith(normalizedQuery)) {
    score += 84;
  } else if (title.includes(normalizedQuery)) {
    score += 60;
  }

  if (excerpt.includes(normalizedQuery)) {
    score += 26;
  }

  if (category.includes(normalizedQuery)) {
    score += 20;
  }

  if (tags.some((tag) => tag.includes(normalizedQuery))) {
    score += 24;
  }

  const tokenScores = [title, excerpt, category, ...tags].map((field, index) =>
    scoreTokens(field, tokens, index === 0 ? 24 : 12),
  );
  score += Math.max(0, ...tokenScores);

  const combinedFields = [title, excerpt, category, ...tags].join(" ");
  if (tokens.length > 1 && tokens.every((token) => combinedFields.includes(token))) {
    score += 20;
  }

  return score;
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

      return stored ? JSON.parse(stored).slice(0, MAX_RECENT_SEARCHES) : [];
    } catch {
      return [];
    }
  });
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Search logic - memoized for performance
  const performSearch = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setIsLoading(false);
        setResults([]);
        return;
      }

      setIsLoading(true);
      const normalized = normalizeText(searchQuery);
      const tokens = tokenizeQuery(normalized);

      const productResults = products
        .map((product) => ({
          product,
          score: scoreProduct(product, normalized, tokens),
        }))
        .filter((entry) => entry.score > 0)
        .sort((left, right) => right.score - left.score || left.product.name.localeCompare(right.product.name))
        .map((entry) => {
          const { product, score } = entry;
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
            score,
          };
        });

      const blogResults = posts
        .map((post) => ({
          post,
          score: scorePost(post, normalized, tokens),
        }))
        .filter((entry) => entry.score > 0)
        .sort((left, right) => right.score - left.score || left.post.title.localeCompare(right.post.title))
        .map((entry) => {
          const { post, score } = entry;

          return {
            id: post.slug,
            title: post.title,
            description: post.excerpt,
            category: 'blog' as const,
            href: `/blog/${post.slug}`,
            type: 'blog' as const,
            badge: undefined,
            image: post.coverImage?.src,
            price: undefined,
            variantLabel: undefined,
            score,
          };
        });

      const combined = [...productResults, ...blogResults]
        .sort((left, right) => {
          if (left.score !== right.score) {
            return right.score - left.score;
          }

          return left.title.localeCompare(right.title);
        })
        .slice(0, maxResults)
        .map(({ id, title, description, category, href, type, badge, image, price, variantLabel }) => ({
          id,
          title,
          description,
          category,
          href,
          type,
          badge,
          image,
          price,
          variantLabel,
        }));

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
    const trimmedQuery = searchQuery.trim();
    const normalized = normalizeText(trimmedQuery);
    if (!normalized) return;

    setRecentSearches((prev) => {
      const updated = [
        trimmedQuery,
        ...prev.filter((search) => normalizeText(search) !== normalized),
      ].slice(0, MAX_RECENT_SEARCHES);

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
    setIsLoading(false);
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
    results,
    isLoading,
    recentSearches,
    handleSearch,
    saveSearch,
    clearSearch,
    clearRecentSearches,
  };
}
