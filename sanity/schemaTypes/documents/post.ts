import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "author", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "authorRole", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "publishedAt", type: "datetime", validation: (rule) => rule.required() }),
    defineField({ name: "updatedAt", type: "datetime" }),
    defineField({ name: "category", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          marks: {
            annotations: [
              defineArrayMember({
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    type: "string",
                    description: "Use an absolute URL or a relative path such as /products/chia-seeds.",
                    validation: (rule) => rule.required(),
                  }),
                ],
              }),
            ],
          },
        }),
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string" }],
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({
      name: "relatedProducts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    defineField({ name: "seo", type: "seo", validation: (rule) => rule.required() }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
    },
  },
});
