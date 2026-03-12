'use client';

import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  /**
   * If true, the element will automatically unobserve after first intersection
   */
  once?: boolean;
  /**
   * Callback when element enters viewport
   */
  onEnter?: () => void;
  /**
   * Callback when element leaves viewport
   */
  onLeave?: () => void;
}

/**
 * Hook to detect when an element enters the viewport using Intersection Observer
 * Perfect for triggering animations, lazy loading, or analytics
 * Performance optimized with native browser API
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasTriggeredOnce = useRef(false);

  const {
    once = false,
    onEnter,
    onLeave,
    threshold = 0.1,
    rootMargin = '0px',
    root = null,
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          onEnter?.();

          if (once) {
            hasTriggeredOnce.current = true;
            observer.unobserve(entry.target);
          }
        } else {
          if (!once) {
            setIsVisible(false);
            onLeave?.();
          }
        }
      },
      {
        threshold,
        rootMargin,
        root,
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, root, once, onEnter, onLeave]);

  return [ref, isVisible];
}
