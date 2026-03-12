import type { ContentImage } from '@/types/site';

export type AnimationType = 'fade' | 'slide-up' | 'slide-down' | 'scale' | 'scale-fade';
export type BannerTheme = 'light' | 'dark' | 'gradient';
export type BannerLayout = 'full' | 'contained' | 'split';
export type BannerType = 'hero' | 'promo' | 'trust' | 'cta' | 'editorial' | 'collection';
export type AnimationTrigger = 'immediate' | 'on-scroll' | 'on-view';

export interface AnimationConfig {
  type: AnimationType;
  trigger: AnimationTrigger;
  delay?: number;
  duration?: number;
  stagger?: number; // For multiple children
}

export interface MobileConfig {
  layout?: BannerLayout;
  hidden?: boolean;
  reducedHeight?: boolean;
  stackDirection?: 'vertical' | 'horizontal';
}

export interface BannerSpacing {
  top: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  bottom: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  horizontal?: 'sm' | 'md' | 'lg';
}

export interface BannerSection {
  id: string;
  type: BannerType;
  theme: BannerTheme;
  layout: BannerLayout;
  animation?: AnimationConfig;
  content: Record<string, unknown>;
  spacing?: BannerSpacing;
  mobile?: MobileConfig;
  cta?: {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  secondaryCta?: {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  backgroundImage?: ContentImage;
  metadata?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

/**
 * Configuration for multiple banners with rotation logic
 */
export interface BannerRotationConfig {
  banners: BannerSection[];
  rotationInterval?: number; // in ms
  autoRotate?: boolean;
  showIndicators?: boolean;
}

/**
 * Search result type for predictive search
 */
export interface SearchResultBanner extends BannerSection {
  searchQuery?: string;
  displayRank?: number;
}

/**
 * Banner event tracking
 */
export interface BannerEventTracker {
  bannerId: string;
  eventType: 'view' | 'click' | 'dismiss';
  timestamp: number;
  metadata?: Record<string, unknown>;
}
