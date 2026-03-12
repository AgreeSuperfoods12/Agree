import "server-only";

import { cache } from "react";

import { defaultCompliancePage } from "@/content/legal";
import { defaultSiteContent } from "@/content/site";
import type { CompliancePageContent, SiteContent } from "@/types/site";
import { sanityFetch } from "@/sanity/lib/client";
import { compliancePageQuery, siteSettingsQuery } from "@/sanity/lib/queries";

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const data = await sanityFetch<Partial<SiteContent>>({
    query: siteSettingsQuery,
    tags: ["sanity:site-settings"],
  });

  if (!data) {
    return defaultSiteContent;
  }

  return {
    ...defaultSiteContent,
    ...data,
    hero: {
      ...defaultSiteContent.hero,
      ...data.hero,
    },
    newsletter: {
      ...defaultSiteContent.newsletter,
      ...data.newsletter,
    },
  };
});

export const getCompliancePageContent = cache(async (): Promise<CompliancePageContent> => {
  const data = await sanityFetch<CompliancePageContent>({
    query: compliancePageQuery,
    tags: ["sanity:compliance-page"],
  });

  return data || defaultCompliancePage;
});
