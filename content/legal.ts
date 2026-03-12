import type { CompliancePageContent, LongFormSection } from "@/types/site";

export const privacySections: LongFormSection[] = [
  {
    title: "Information collected",
    paragraphs: [
      "Agree Superfoods collects information submitted through contact, newsletter, and wholesale enquiry forms, including names, email addresses, company details, and messages shared with the team.",
      "Basic analytics and technical usage data may also be collected to understand how visitors use the website and which pages are most useful.",
    ],
  },
  {
    title: "How information is used",
    paragraphs: [
      "Submitted data is used to respond to enquiries, review retail or wholesale interest, improve service quality, and share business communication where appropriate.",
      "Personal information is not sold. Limited data may be processed by trusted service providers involved in hosting, analytics, or communication delivery.",
    ],
  },
  {
    title: "Retention and access",
    paragraphs: [
      "Information is retained only for as long as needed to manage communication, maintain internal records, or meet legal obligations.",
      "Requests related to access, correction, or deletion can be sent to info@agreesuperfoods.com.",
    ],
  },
];

export const termsSections: LongFormSection[] = [
  {
    title: "Website purpose",
    paragraphs: [
      "This website is a brand and product information website for Agree Superfoods. It currently supports product discovery, enquiries, and wholesale conversations.",
      "All content is intended for general food and brand information. It should not be treated as medical advice or as a substitute for professional guidance.",
    ],
  },
  {
    title: "Use restrictions",
    paragraphs: [
      "Users may not misuse the website, interfere with its operation, or submit knowingly inaccurate contact or business information through enquiry forms.",
    ],
  },
  {
    title: "Intellectual property",
    paragraphs: [
      "The Agree Superfoods name, copy, layouts, imagery, and brand presentation are protected materials unless stated otherwise.",
    ],
  },
  {
    title: "Product availability and ordering",
    paragraphs: [
      "If direct online ordering becomes available, separate terms covering payments, shipping, returns, and order handling will be published on the website.",
    ],
  },
];

export const shippingReturnsSections: LongFormSection[] = [
  {
    title: "Current website status",
    paragraphs: [
      "Agree Superfoods currently uses this website for product discovery, enquiries, and wholesale discussions. Direct online ordering is not active at this time.",
    ],
  },
  {
    title: "When ordering goes live",
    paragraphs: [
      "When online ordering becomes available, this page can be updated with dispatch timelines, service areas, packaging notes, return conditions, and customer support steps.",
    ],
  },
];

export const defaultCompliancePage: CompliancePageContent = {
  title: "Compliance & business information",
  intro:
    "Agree Superfoods presents its products with careful public language, a premium food brand identity, and a structure ready for verified business details when they are available for publication.",
  sections: [
    {
      title: "Brand protection and trademark positioning",
      paragraphs: [
        "The Agree Superfoods identity is presented with consistency across product names, layouts, and public-facing communication.",
        "Any public trademark references should be added only after they are reviewed and verified for release.",
      ],
    },
    {
      title: "Food business communication",
      paragraphs: [
        "Product descriptions are written in an ingredient-first, food-focused tone that keeps wellness language careful and practical.",
        "Licence or regulatory references should only be published once the relevant information is verified and approved for public display.",
      ],
    },
    {
      title: "GST and trade readiness",
      paragraphs: [
        "The website is structured to support business credibility for retail, wholesale, gifting, and distribution discussions.",
        "Where GST or invoicing information is needed, it should be shared accurately and only through verified business channels.",
      ],
    },
    {
      title: "Packaging and label clarity",
      paragraphs: [
        "The content model is suited to product specifications, packaging copy, origin notes, storage guidance, and other label-facing information.",
      ],
    },
  ],
  disclaimer:
    "Regulatory, trademark, GST, and certification claims should always be updated with verified details before public launch or campaign use.",
};
