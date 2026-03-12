import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
        defineField({
          name: "description",
          type: "text",
          rows: 4,
          validation: (rule) => rule.required(),
        }),
        defineField({ name: "primaryCta", type: "linkItem", validation: (rule) => rule.required() }),
        defineField({ name: "secondaryCta", type: "linkItem", validation: (rule) => rule.required() }),
        defineField({
          name: "supportingPoints",
          type: "array",
          of: [{ type: "string" }],
          validation: (rule) => rule.min(3).max(4),
        }),
      ],
    }),
    defineField({
      name: "homepageIntro",
      title: "Homepage intro",
      type: "array",
      of: [{ type: "text" }],
      validation: (rule) => rule.min(2).max(3),
    }),
    defineField({
      name: "whyChooseCards",
      title: "Why choose cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
            defineField({
              name: "description",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "wellnessFeatures",
      title: "Wellness features",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "blurb", type: "text", rows: 3, validation: (rule) => rule.required() }),
            defineField({
              name: "benefit",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "qualityPillars",
      title: "Quality pillars",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "description", type: "text", rows: 3, validation: (rule) => rule.required() }),
          ],
        }),
      ],
    }),
    defineField({ name: "brandStory", type: "array", of: [{ type: "text" }] }),
    defineField({ name: "packagingStory", type: "array", of: [{ type: "text" }] }),
    defineField({
      name: "trustMetrics",
      title: "Trust metrics",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
          ],
        }),
      ],
    }),
    defineField({
      name: "complianceBadges",
      title: "Compliance badges",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "description", type: "text", rows: 2, validation: (rule) => rule.required() }),
          ],
        }),
      ],
    }),
    defineField({
      name: "complianceItems",
      title: "Compliance items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "description", type: "text", rows: 3, validation: (rule) => rule.required() }),
          ],
        }),
      ],
    }),
    defineField({ name: "complianceDisclaimer", type: "text", rows: 3 }),
    defineField({
      name: "coreCategories",
      title: "Core categories",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "description", type: "text", rows: 3, validation: (rule) => rule.required() }),
            defineField({ name: "href", type: "string", validation: (rule) => rule.required() }),
          ],
        }),
      ],
    }),
    defineField({ name: "globalFaqs", type: "array", of: [{ type: "faqItem" }] }),
    defineField({ name: "contactHighlights", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "wholesaleBenefits", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "newsletter",
      title: "Newsletter",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "description", type: "text", rows: 3, validation: (rule) => rule.required() }),
        defineField({ name: "privacyNote", type: "string", validation: (rule) => rule.required() }),
      ],
    }),
  ],
});

