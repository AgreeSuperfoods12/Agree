import "server-only";

import { createClient, type QueryParams } from "next-sanity";

import { apiVersion, dataset, hasValidSanityConfig, projectId } from "@/sanity/env";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: false,
});

interface SanityFetchOptions {
  query: string;
  params?: QueryParams;
  tags?: string[];
}

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: SanityFetchOptions): Promise<T | null> {
  if (!hasValidSanityConfig) {
    return null;
  }

  return sanityClient.fetch<T>(query, params, {
    next: {
      revalidate: 300,
      tags,
    },
  });
}

