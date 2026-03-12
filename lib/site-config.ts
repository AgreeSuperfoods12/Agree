import type { BusinessConfig, HeaderMenuItem, NavItem } from "@/types/site";

const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "info@agreesuperfoods.com";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.agreesuperfoods.com";
const siteHostLabel = siteUrl.replace(/^https?:\/\//, "");
const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "";
const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || "";

export const siteConfig = {
  name: "Agree Superfoods",
  shortName: "Agree",
  description:
    "Premium seeds, teas, makhana, and pantry essentials for simple everyday wellness.",
  siteUrl,
  email: supportEmail,
  location: "India",
  country: "IN",
  isPreviewDeployment:
    process.env.VERCEL_ENV === "preview" ||
    Boolean(siteUrl.includes(".vercel.app")),
  social: {
    instagram: instagramUrl,
    linkedin: linkedinUrl,
  },
  business: {
    records: {
      businessName: process.env.NEXT_PUBLIC_BUSINESS_NAME || "Agree Superfoods",
      address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "",
      phone: process.env.NEXT_PUBLIC_SUPPORT_PHONE || "",
      supportEmail,
      gstNumber: process.env.NEXT_PUBLIC_GST_NUMBER || "",
      fssaiLicense: process.env.NEXT_PUBLIC_FSSAI_LICENSE || "",
      trademarkStatus: process.env.NEXT_PUBLIC_TRADEMARK_STATUS || "",
    },
    responseTime: "Within 1 business day",
    supportNote:
      "For product questions, retail conversations, or wholesale requests, the team replies through the same support channel for a clear handover.",
    wholesaleTopics: [
      "Retail placement and distributor enquiries",
      "Bulk packs, gifting, and hospitality requirements",
      "Sample requests and product range discussions",
      "Verified compliance details for serious business conversations",
    ],
    contactChannels: [
      {
        label: "Support email",
        value: supportEmail,
        href: `mailto:${supportEmail}`,
      },
      {
        label: "Website",
        value: siteHostLabel,
        href: siteUrl,
      },
      ...(process.env.NEXT_PUBLIC_SUPPORT_PHONE
        ? [
            {
              label: "Phone",
              value: process.env.NEXT_PUBLIC_SUPPORT_PHONE,
              href: `tel:${process.env.NEXT_PUBLIC_SUPPORT_PHONE}`,
            },
          ]
        : []),
      ...(process.env.NEXT_PUBLIC_BUSINESS_ADDRESS
        ? [
            {
              label: "Address",
              value: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS,
            },
          ]
        : [
            {
              label: "Business location",
              value: "India",
            },
          ]),
    ],
    whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL,
    whatsappLabel: "WhatsApp Us",
    complianceSignals: [
      {
        title: "Brand protection",
        status:
          process.env.NEXT_PUBLIC_TRADEMARK_STATUS || "Trademark information managed through official brand documentation",
        description:
          "Agree Superfoods is presented with long-term brand consistency in mind across packaging, product naming, and public communication.",
      },
      {
        title: "Food business compliance",
        status:
          process.env.NEXT_PUBLIC_FSSAI_LICENSE
            ? `FSSAI / food licence: ${process.env.NEXT_PUBLIC_FSSAI_LICENSE}`
            : "Food business details are shared through verified documentation",
        description:
          "Product language stays ingredient-first and restrained so public claims remain suitable for a food brand website.",
      },
      {
        title: "GST-ready business identity",
        status:
          process.env.NEXT_PUBLIC_GST_NUMBER
            ? `GST: ${process.env.NEXT_PUBLIC_GST_NUMBER}`
            : "GST and invoicing details are available through verified business communication",
        description:
          "The website is structured to support trade, invoicing, distribution, and catalogue discussions without making unverified public claims.",
      },
      {
        title: "Reachable support",
        status: process.env.NEXT_PUBLIC_SUPPORT_PHONE
          ? `Support by email and phone: ${process.env.NEXT_PUBLIC_SUPPORT_PHONE}`
          : `Customer and trade enquiries handled by email: ${supportEmail}`,
        description:
          "Support for product questions, retailer interest, and wholesale requests is available through a single contact route with a clear response target.",
      },
    ],
    complianceDisclaimer:
      "Any trademark, FSSAI, GST, certification, or packaging declaration published on the public website should be reviewed and updated only with verified details.",
  } satisfies BusinessConfig,
} as const;

export const navigation: NavItem[] = [
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Compliance", href: "/compliance" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const headerNavigation: HeaderMenuItem[] = [
  {
    label: "Products",
    layout: "catalog",
    sections: [
      {
        title: "Featured",
        links: [
          { label: "All products", href: "/products" },
          { label: "Best sellers", href: "/products" },
          { label: "New arrivals", href: "/products" },
          { label: "Pantry picks", href: "/products?category=Pantry%20Essentials" },
        ],
      },
      {
        title: "Seeds",
        links: [
          { label: "Chia Seeds", href: "/products/chia-seeds" },
          { label: "Flax Seeds", href: "/products/flax-seeds" },
          { label: "Pumpkin Seeds", href: "/products/pumpkin-seeds" },
          { label: "Sunflower Seeds", href: "/products/sunflower-seeds" },
        ],
      },
      {
        title: "Tea Collection",
        links: [
          { label: "Black Tea", href: "/products/black-tea" },
          { label: "Green Tea", href: "/products/green-tea" },
          { label: "White Tea", href: "/products/white-tea" },
          { label: "Tea guide", href: "/blog" },
        ],
      },
      {
        title: "Pantry Essentials",
        links: [
          { label: "Black Pepper", href: "/products/black-pepper" },
          { label: "Makhana", href: "/products/makhana" },
          { label: "Ingredients guide", href: "/ingredients" },
          { label: "FAQ", href: "/faq" },
        ],
      },
      {
        title: "Business",
        links: [
          { label: "Wholesale", href: "/wholesale" },
          { label: "Compliance", href: "/compliance" },
          { label: "Contact support", href: "/contact" },
          { label: "Shipping & Returns", href: "/shipping-returns" },
        ],
      },
      {
        title: "Top 3",
        links: [
          { label: "Chia Seeds", href: "/products/chia-seeds" },
          { label: "Makhana", href: "/products/makhana" },
          { label: "Black Tea", href: "/products/black-tea" },
        ],
      },
    ],
    cards: [
      {
        eyebrow: "Product spotlight",
        title: "Pantry spotlight",
        description: "A pantry-led highlight for seasoning, gifting, and everyday kitchen use.",
        href: "/products/makhana",
        image: {
          src: "/images/products/makhana.png",
          alt: "Makhana spotlight image for Agree Superfoods navigation",
        },
      },
    ],
  },
  {
    label: "About",
    layout: "condensed",
    sections: [
      {
        title: "About Agree Superfoods",
        links: [
          { label: "About us", href: "/about" },
          { label: "Ingredients", href: "/ingredients" },
          { label: "Journal", href: "/blog" },
          { label: "Compliance", href: "/compliance" },
          { label: "FAQ", href: "/faq" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
  },
  {
    label: "Specials",
    badge: "Hot",
    layout: "cards",
    cards: [
      {
        eyebrow: "Edit",
        title: "Seed collection",
        description: "Breakfast bowls, smoothies, and everyday pantry staples in one collection.",
        href: "/products?category=Seeds",
        image: {
          src: "/images/blog/pumpkin-sunflower-seeds.jpg",
          alt: "Seed collection banner image for Agree Superfoods",
        },
      },
      {
        eyebrow: "Trade",
        title: "Makhana and snack shelf",
        description: "Snack-ready products presented for retail, gifting, and trade-led enquiries.",
        href: "/wholesale",
        image: {
          src: "/images/products/makhana.png",
          alt: "Makhana banner image for Agree Superfoods specials navigation",
        },
      },
      {
        eyebrow: "Gift",
        title: "Gifting edit",
        description: "Curated pantry gifting ideas for festive hampers and premium selections.",
        href: "/blog",
        image: {
          src: "/images/banners/tea-ingredients.jpg",
          alt: "Gifting banner image for Agree Superfoods specials navigation",
        },
      },
      {
        eyebrow: "Tea",
        title: "Tea ritual picks",
        description: "A calmer tea-led edit built around everyday rituals and premium pantry moments.",
        href: "/products?category=Tea",
        image: {
          src: "/images/banners/tea-ingredients.jpg",
          alt: "Tea collection banner image for Agree Superfoods specials navigation",
        },
      },
      {
        eyebrow: "Pantry",
        title: "Pantry staples",
        description: "Black pepper, pantry essentials, and kitchen-led ingredients with a richer visual feel.",
        href: "/products?category=Pantry%20Essentials",
        image: {
          src: "/images/banners/spice-flat-lay.jpg",
          alt: "Pantry staples banner image for Agree Superfoods specials navigation",
        },
      },
    ],
  },
  {
    label: "Recipes",
    href: "/blog",
  },
  {
    label: "Features",
    href: "/ingredients",
  },
];

export const footerNavigation: NavItem[] = [
  { label: "Bulk / Wholesale", href: "/wholesale" },
  { label: "Shipping & Returns", href: "/shipping-returns" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];
