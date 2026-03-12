'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { AnimatedSection, type AnimationType } from '@/components/motion/animated-section';

export interface SectionContainerProps {
  /** ID for the section */
  id?: string;
  /** Section content to wrap */
  children: React.ReactNode;
  /** Animation type to apply on scroll */
  animation?: AnimationType;
  /** Delay before animation starts (in ms) */
  animationDelay?: number;
  /** Duration of animation (in ms) */
  animationDuration?: number;
  /** Viewport threshold to trigger animation (0-1) */
  animationThreshold?: number;
  /** Trigger animation only once or every time it enters viewport */
  animationOnce?: boolean;
  /** Top padding (Tailwind size: sm, md, lg, xl, 2xl) */
  paddingTop?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none';
  /** Bottom padding (Tailwind size: sm, md, lg, xl, 2xl) */
  paddingBottom?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none';
  /** Additional classes */
  className?: string;
  /** Background color variant */
  background?: 'white' | 'light' | 'dark' | 'gradient';
  /** Optional data attributes for analytics */
  dataAttributes?: Record<string, string>;
}

const paddingMap = {
  none: '',
  sm: 'py-6 sm:py-8',
  md: 'py-8 sm:py-12',
  lg: 'py-12 sm:py-16',
  xl: 'py-16 sm:py-20',
  '2xl': 'py-20 sm:py-28',
};

const backgroundMap = {
  white: 'bg-white',
  light: 'bg-[#f9f9f9]',
  dark: 'bg-[#1d1d1d] text-white',
  gradient: 'bg-gradient-to-b from-white via-[#fafafa] to-white',
};

/**
 * SectionContainer
 *
 * Wraps home page sections with consistent spacing, animations, and styling.
 * Provides flexible animation controls and responsive padding.
 *
 * @example
 * ```tsx
 * <SectionContainer
 *   id="featured-products"
 *   animation="fade-in"
 *   paddingTop="md"
 *   paddingBottom="lg"
 * >
 *   <FeaturedProductsSection products={products} />
 * </SectionContainer>
 * ```
 */
export function SectionContainer({
  id,
  children,
  animation,
  animationDelay = 0,
  animationDuration = 600,
  animationThreshold = 0.15,
  animationOnce = true,
  paddingTop = 'md',
  paddingBottom = 'md',
  className,
  background = 'white',
  dataAttributes,
}: SectionContainerProps) {
  const paddingClass = cn(
    paddingMap[paddingTop],
    paddingMap[paddingBottom]
  );

  const backgroundClass = backgroundMap[background];

  const section = (
    <section
      id={id}
      className={cn(
        'w-full transition-colors duration-300',
        backgroundClass,
        paddingClass,
        className
      )}
      {...(dataAttributes && Object.entries(dataAttributes).reduce((acc, [key, value]) => {
        acc[`data-${key}`] = value;
        return acc;
      }, {} as Record<string, string>))}
    >
      {children}
    </section>
  );

  // Apply animation wrapper if animation type is specified
  if (animation) {
    return (
      <AnimatedSection
        animation={animation}
        delay={animationDelay}
        duration={animationDuration}
        threshold={animationThreshold}
        once={animationOnce}
      >
        {section}
      </AnimatedSection>
    );
  }

  return section;
}

/**
 * Batch utility to apply animations to multiple sections
 * Useful for creating staggered animations across sections
 *
 * @example
 * ```tsx
 * export function HomePage() {
 *   const sections = [
 *     { animation: 'fade-in', content: <HeroSection {...} /> },
 *     { animation: 'slide-up', content: <FeaturedSection {...} /> },
 *   ];
 *
 *   return (
 *     <>
 *       {sections.map((section, i) => (
 *         <SectionContainer
 *           key={i}
 *           animation={section.animation}
 *           animationDelay={i * 100}
 *         >
 *           {section.content}
 *         </SectionContainer>
 *       ))}
 *     </>
 *   );
 * }
 * ```
 */
export function getSectionAnimationDelay(index: number, baseDelay: number = 0): number {
  return baseDelay + index * 100;
}
