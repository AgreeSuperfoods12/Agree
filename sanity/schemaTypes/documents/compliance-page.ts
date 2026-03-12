import { defineArrayMember, defineField, defineType } from "sanity";

export const compliancePageType = defineType({
  name: "compliancePage",
  title: "Compliance page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sections",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
            defineField({
              name: "paragraphs",
              type: "array",
              of: [{ type: "text" }],
              validation: (rule) => rule.min(1),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "disclaimer",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
});

