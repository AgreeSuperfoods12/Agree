'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/lib/hooks/use-intersection-observer';

export type AnimationType = 'fade' | 'slide-up' | 'slide-down' | 'scale' | 'scale-fade';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number; // in ms
  duration?: number; // in ms
  className?: string;
  once?: boolean; // Only animate once
  threshold?: number;
}

/**
 * Component that wraps a section and applies animations when it enters viewport
 * Powered by Intersection Observer API for optimal performance
 * Supports multiple animation types with customizable delay and duration
 */
export function AnimatedSection({
  children,
  animation = 'fade',
  delay = 0,
  duration = 600,
  className,
  once = true,
  threshold = 0.1,
}: AnimatedSectionProps) {
  const [ref, isVisible] = useIntersectionObserver({
    once,
    threshold,
  });

  // Animation class maps
  const animationClasses: Record<AnimationType, string> = {
    'fade': cn(
      'transition-opacity',
      isVisible
        ? 'opacity-100'
        : 'opacity-0'
    ),
    'slide-up': cn(
      'transition-all',
      isVisible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-8'
    ),
    'slide-down': cn(
      'transition-all',
      isVisible
        ? 'opacity-100 -translate-y-0'
        : 'opacity-0 -translate-y-8'
    ),
    'scale': cn(
      'transition-all',
      isVisible
        ? 'opacity-100 scale-100'
        : 'opacity-0 scale-95'
    ),
    'scale-fade': cn(
      'transition-all',
      isVisible
        ? 'opacity-100 scale-100'
        : 'opacity-50 scale-98'
    ),
  };

  return (
    <section
      ref={ref}
      className={cn(animationClasses[animation], className)}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </section>
  );
}

/**
 * Component for staggered animations on multiple child elements
 * Each child animates with a delay multiplier
 */
interface StaggeredAnimationProps {
  children: ReactNode[];
  animation?: AnimationType;
  staggerDelay?: number; // Delay between each child (ms)
  duration?: number;
  className?: string;
  once?: boolean;
  containerClassName?: string;
}

export function StaggeredAnimation({
  children,
  animation = 'fade',
  staggerDelay = 100,
  duration = 600,
  className,
  once = true,
  containerClassName,
}: StaggeredAnimationProps) {
  const [ref, isVisible] = useIntersectionObserver({
    once,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={containerClassName}>
      {children.map((child, index) => (
        <AnimatedSection
          key={index}
          animation={animation}
          delay={isVisible ? index * staggerDelay : 0}
          duration={duration}
          className={className}
          once={false} // Handled by parent
          threshold={0}
        >
          {child}
        </AnimatedSection>
      ))}
    </div>
  );
}
