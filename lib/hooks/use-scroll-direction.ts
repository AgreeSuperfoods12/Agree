'use client';

import { useEffect, useState, useRef } from 'react';

interface ScrollState {
  direction: 'up' | 'down' | 'none';
  isScrolled: boolean;
  scrollY: number;
}

/**
 * Hook to detect scroll direction and position
 * Useful for hiding/showing sticky headers based on scroll direction
 * Performance optimized with throttled scroll events (60fps)
 */
export function useScrollDirection(threshold: number = 10): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    direction: 'none',
    isScrolled: false,
    scrollY: 0,
  });

  const previousScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if scrolled (past threshold)
      const isScrolled = currentScrollY > threshold;

      // Determine direction
      let direction: 'up' | 'down' | 'none' = 'none';
      if (currentScrollY > previousScrollY.current) {
        direction = 'down';
      } else if (currentScrollY < previousScrollY.current) {
        direction = 'up';
      }

      previousScrollY.current = currentScrollY;

      // Use requestAnimationFrame for smooth 60fps updates
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          setScrollState({
            direction,
            isScrolled,
            scrollY: currentScrollY,
          });
          ticking.current = false;
        });
      }

      // Clear any pending timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Reset direction to 'none' after scroll stops (500ms)
      scrollTimeout.current = setTimeout(() => {
        setScrollState((prev) => ({
          ...prev,
          direction: 'none',
        }));
      }, 500);
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [threshold]);

  return scrollState;
}
