import { cn } from '@/lib/utils';
import type {
  BannerSection,
  BannerSpacing,
  BannerTheme,
  BannerLayout,
  BannerType,
  MobileConfig,
  AnimationType,
} from '@/types/banner';

/**
 * Generate spacing classes for banners
 */
export function getBannerSpacingClasses(spacing?: BannerSpacing): string {
  if (!spacing) return 'py-12 md:py-16 lg:py-20';

  const spacingMap: Record<string, string> = {
    none: 'py-0',
    sm: 'py-4 md:py-6',
    md: 'py-8 md:py-12',
    lg: 'py-12 md:py-16 lg:py-20',
    xl: 'py-16 md:py-24 lg:py-32',
  };

  const horizontalMap: Record<string, string> = {
    sm: 'px-4',
    md: 'px-6',
    lg: 'px-8',
  };

  return cn(
    spacingMap[spacing.top],
    spacingMap[spacing.bottom],
    spacing.horizontal && horizontalMap[spacing.horizontal]
  );
}

/**
 * Generate theme classes for banners
 */
export function getBannerThemeClasses(theme: BannerTheme): string {
  const themeMap: Record<BannerTheme, string> = {
    light: 'bg-white text-[#1d1d1d]',
    dark: 'bg-[#1d1d1d] text-white',
    gradient: 'bg-gradient-to-r from-[#d4c4d9] to-[#ffa680] text-[#1d1d1d]',
  };

  return themeMap[theme];
}

/**
 * Generate layout classes for banners
 */
export function getBannerLayoutClasses(layout: BannerLayout): string {
  const layoutMap: Record<BannerLayout, string> = {
    full: 'w-full',
    contained: 'mx-auto w-full max-w-[90rem] px-5 sm:px-7 lg:px-8 xl:px-10',
    split: 'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12',
  };

  return layoutMap[layout];
}

/**
 * Generate animation classes for banners
 */
export function getBannerAnimationClasses(animation: AnimationType, isVisible: boolean): string {
  const animationMap: Record<AnimationType, string> = {
    'fade': cn(
      'transition-opacity duration-600',
      isVisible ? 'opacity-100' : 'opacity-0'
    ),
    'slide-up': cn(
      'transition-all duration-600',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    ),
    'slide-down': cn(
      'transition-all duration-600',
      isVisible ? 'opacity-100 -translate-y-0' : 'opacity-0 -translate-y-8'
    ),
    'scale': cn(
      'transition-all duration-600',
      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
    ),
    'scale-fade': cn(
      'transition-all duration-600',
      isVisible ? 'opacity-100 scale-100' : 'opacity-50 scale-98'
    ),
  };

  return animationMap[animation];
}

/**
 * Generate mobile configuration classes
 */
export function getMobileConfigClasses(mobile?: MobileConfig): string {
  const classes: string[] = [];

  if (mobile?.hidden) {
    classes.push('hidden md:block');
  }

  if (mobile?.reducedHeight) {
    classes.push('md:h-auto h-48');
  }

  if (mobile?.stackDirection === 'vertical') {
    classes.push('flex flex-col');
  }

  return cn(...classes);
}

/**
 * Get CTA button classes based on variant
 */
export function getCtaButtonClasses(variant: 'primary' | 'secondary' | 'outline' = 'primary'): string {
  const variantMap = {
    primary: 'bg-[#1d1d1d] text-white hover:bg-[#2d2d2d]',
    secondary: 'bg-[#f2f2f2] text-[#1d1d1d] hover:bg-[#e8e8e8]',
    outline: 'border border-[#1d1d1d] text-[#1d1d1d] hover:bg-[#f2f2f2]',
  };

  return cn(
    'inline-block px-6 py-3 rounded-[12px] font-semibold transition-colors duration-200',
    variantMap[variant]
  );
}

/**
 * Generate banner wrapper classes with all styling
 */
export function getBannerWrapperClasses(
  theme: BannerTheme,
  spacing?: BannerSpacing,
  mobile?: MobileConfig
): string {
  return cn(
    getBannerThemeClasses(theme),
    getBannerSpacingClasses(spacing),
    getMobileConfigClasses(mobile),
    'transition-all duration-300'
  );
}

/**
 * Create unique banner ID if not provided
 */
export function generateBannerId(type: string, index: number): string {
  return `banner-${type}-${index}-${Date.now()}`;
}

/**
 * Validate banner configuration
 */
export function validateBannerConfig(banner: Partial<BannerSection>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!banner.id) errors.push('Banner must have an id');
  if (!banner.type) errors.push('Banner must have a type');
  if (!banner.theme) errors.push('Banner must have a theme');
  if (!banner.layout) errors.push('Banner must have a layout');

  const validTypes: BannerType[] = ['hero', 'promo', 'trust', 'cta', 'editorial', 'collection'];
  if (banner.type && !validTypes.includes(banner.type)) {
    errors.push(`Invalid banner type: ${banner.type}`);
  }

  const validThemes = ['light', 'dark', 'gradient'];
  if (banner.theme && !validThemes.includes(banner.theme)) {
    errors.push(`Invalid banner theme: ${banner.theme}`);
  }

  const validLayouts = ['full', 'contained', 'split'];
  if (banner.layout && !validLayouts.includes(banner.layout)) {
    errors.push(`Invalid banner layout: ${banner.layout}`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Sort banners by priority or custom logic
 */
export function sortBanners(
  banners: BannerSection[],
  sortBy: 'type' | 'position' | 'priority' = 'position'
): BannerSection[] {
  if (sortBy === 'position') {
    return banners;
  }

  if (sortBy === 'type') {
    const typeOrder: BannerType[] = ['hero', 'promo', 'editorial', 'cta', 'trust', 'collection'];
    return [...banners].sort((a, b) => {
      const aIndex = typeOrder.indexOf(a.type);
      const bIndex = typeOrder.indexOf(b.type);
      return aIndex - bIndex;
    });
  }

  return banners;
}
