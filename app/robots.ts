import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  if (siteConfig.isPreviewDeployment) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
      sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
      host: siteConfig.siteUrl,
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/studio"],
      },
    ],
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
    host: siteConfig.siteUrl,
  };
}
