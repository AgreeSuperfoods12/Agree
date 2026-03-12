import { defineArrayMember, defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "category", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "badge", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "shortDescription",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fullDescription",
      type: "array",
      of: [{ type: "text" }],
      validation: (rule) => rule.min(2),
    }),
    defineField({ name: "benefits", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "ingredients", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "usageIdeas", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "bestFor", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "pricing",
      type: "object",
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: "amount",
          type: "number",
          validation: (rule) => rule.required().positive(),
        }),
        defineField({
          name: "compareAtAmount",
          type: "number",
          validation: (rule) => rule.min(0),
        }),
        defineField({
          name: "currencyCode",
          type: "string",
          initialValue: "CAD",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "variantLabel",
          type: "string",
          initialValue: "100g",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "productDetails",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "value", type: "string", validation: (rule) => rule.required() }),
          ],
        }),
      ],
    }),
    defineField({
      name: "images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "highlights",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "value", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "description", type: "text", rows: 2, validation: (rule) => rule.required() }),
          ],
        }),
      ],
    }),
    defineField({ name: "faqs", type: "array", of: [{ type: "faqItem" }] }),
    defineField({
      name: "relatedProducts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    defineField({
      name: "relatedPosts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "post" }] }],
    }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "catalogPriority", type: "number", initialValue: 100 }),
    defineField({ name: "seo", type: "seo", validation: (rule) => rule.required() }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "images.0",
    },
  },
});
