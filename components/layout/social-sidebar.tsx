'use client';

import { useScrollDirection } from '@/lib/hooks/use-scroll-direction';
import { cn } from '@/lib/utils';

/**
 * Social Sidebar Component
 *
 * Fixed vertical sidebar on the right edge showing social media icons.
 * - Desktop only (lg and up)
 * - Fades in/out based on scroll direction and scroll position
 * - Shows when scrolled down (isScrolled) or when scrolling up
 * - Fixed position, z-index below header
 */
export function SocialSidebar() {
  const { direction, isScrolled } = useScrollDirection();

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com',
      icon: (
        <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13.5 21v-7h2.35l.4-2.73H13.5V9.55c0-.82.27-1.55 1.6-1.55h1.28V5.64c-.23-.03-1.02-.09-1.95-.09-2.99 0-4.93 1.58-4.93 4.8v1.92H7.15V14H9.5v7h4Z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      icon: (
        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="4.5" />
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com',
      icon: (
        <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  // Show sidebar when scrolled past initial section, fade on downscroll
  const isVisible = isScrolled && direction !== 'down';

  return (
    <div
      className={cn(
        'fixed right-8 top-1/2 z-30 -translate-y-1/2 hidden lg:flex flex-col gap-6 transition-all duration-300',
        isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
      )}
    >
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1d1d1d] transition-all duration-200',
            'hover:scale-110 hover:bg-[#1d1d1d] hover:text-white',
            'shadow-[0_2px_12px_rgba(29,29,29,0.15)]'
          )}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
