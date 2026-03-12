import { defineField, defineType } from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "SEO title",
      type: "string",
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "canonicalPath",
      title: "Canonical path",
      type: "string",
      description: "Example: /products/chia-seeds",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph image path",
      type: "string",
      description: "Use a site-relative fallback such as /opengraph-image or a public asset path.",
      initialValue: "/opengraph-image",
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "noIndex",
      title: "No index",
      type: "boolean",
      initialValue: false,
    }),
  ],
});

