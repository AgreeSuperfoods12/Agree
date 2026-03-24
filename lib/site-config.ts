import type { BusinessConfig, HeaderMenuItem, NavItem } from "@/types/site";
import {
  buildGeneralOrderWhatsAppUrl,
  buildWholesaleWhatsAppUrl,
  whatsappDisplayNumber,
} from "@/lib/whatsapp";

const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.agreesuperfoods.in";
const siteHostLabel = siteUrl.replace(/^https?:\/\//, "");
const instagramUrl =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/agree_superfoods/";
const facebookUrl =
  process.env.NEXT_PUBLIC_FACEBOOK_URL ||
  "https://www.facebook.com/profile.php?id=61576801018584";
const linkedinUrl =
  process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/company/105653468/";
const twitterUrl = process.env.NEXT_PUBLIC_TWITTER_URL || "";
const youtubeUrl =
  process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://youtube.com/@agreesuperfoods";
const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME || "Agree Superfoods";
const supportPhone = process.env.NEXT_PUBLIC_SUPPORT_PHONE || whatsappDisplayNumber;
const supportPhoneHref = supportPhone.replace(/\s+/g, "");
const defaultWhatsappUrl = buildGeneralOrderWhatsAppUrl();
const businessAddress = process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "";
const gstNumber = process.env.NEXT_PUBLIC_GST_NUMBER || "29BTGPN0070F1ZS";
const tradeName = process.env.NEXT_PUBLIC_TRADE_NAME || "Agree Superfoods";
const centreJurisdiction =
  process.env.NEXT_PUBLIC_CENTRE_JURISDICTION ||
  "CBIC, Zone - BENGALURU, Commissionerate - BENGALURU EAST, Division - EAST DIVISION-1, Range - RANGE-DED1";
const stateJurisdiction =
  process.env.NEXT_PUBLIC_STATE_JURISDICTION ||
  "State - Karnataka, Division - DGSTO-4, Bengaluru, LOCAL GST Office - LGSTO 015 - Bengaluru";
const gstRegistrationDate = process.env.NEXT_PUBLIC_GST_REGISTRATION_DATE || "25/04/2025";
const businessActivities = process.env.NEXT_PUBLIC_NATURE_OF_BUSINESS_ACTIVITIES
  ? process.env.NEXT_PUBLIC_NATURE_OF_BUSINESS_ACTIVITIES.split("|").map((item) => item.trim()).filter(Boolean)
  : [];
const coreBusinessActivity = process.env.NEXT_PUBLIC_CORE_BUSINESS_ACTIVITY || "";
const fssaiLicense = process.env.NEXT_PUBLIC_FSSAI_LICENSE || "";
const trademarkStatus = process.env.NEXT_PUBLIC_TRADEMARK_STATUS || "";

export const siteConfig = {
  name: "Agree Superfoods",
  shortName: "Agree",
  description:
    "Premium seeds, teas, makhana, and pantry essentials with direct WhatsApp ordering.",
  defaultKeywords: [
    "Agree Superfoods",
    "premium superfoods India",
    "chia seeds",
    "flax seeds",
    "pumpkin seeds",
    "sunflower seeds",
    "makhana",
    "black pepper",
    "green tea",
    "black tea",
    "white tea",
    "healthy snacking",
    "Indian wellness pantry",
    "premium pantry essentials",
  ],
  siteUrl,
  email: supportEmail,
  location: "India",
  country: "IN",
  isPreviewDeployment:
    process.env.VERCEL_ENV === "preview" ||
    Boolean(siteUrl.includes(".vercel.app")),
  social: {
    facebook: facebookUrl,
    instagram: instagramUrl,
    linkedin: linkedinUrl,
    twitter: twitterUrl,
    youtube: youtubeUrl,
  },
  analytics: {
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
  },
  business: {
    records: {
      businessName,
      address: businessAddress,
      phone: supportPhone,
      supportEmail,
      gstNumber,
      fssaiLicense,
      trademarkStatus,
    },
    registrations: {
      gstin: gstNumber,
      tradeName,
      centreJurisdiction,
      stateJurisdiction,
      dateOfRegistration: gstRegistrationDate,
      businessActivities,
      coreBusinessActivity,
    },
    responseTime: "Within 1 business day",
    supportNote:
      "For product questions, direct orders, or bulk requests, the team handles support through WhatsApp for a faster and simpler handover.",
    wholesaleTopics: [
      "Retail placement and distributor enquiries",
      "Bulk packs, gifting, and hospitality requirements",
      "Sample requests and product range discussions",
      "Verified compliance details for serious business conversations",
    ],
    contactChannels: [
      ...(supportPhone
        ? [
            {
              label: "Order WhatsApp",
              value: supportPhone,
              href: process.env.NEXT_PUBLIC_WHATSAPP_URL || defaultWhatsappUrl,
            },
          ]
        : []),
      {
        label: "Website",
        value: siteHostLabel,
        href: siteUrl,
      },
      ...(supportEmail
        ? [
            {
              label: "Support email",
              value: supportEmail,
              href: `mailto:${supportEmail}`,
            },
          ]
        : []),
      ...(supportPhone
        ? [
            {
              label: "Phone",
              value: supportPhone,
              href: `tel:${supportPhoneHref}`,
            },
          ]
        : []),
      ...(businessAddress
        ? [
            {
              label: "Address",
              value: businessAddress,
            },
          ]
        : [
            {
              label: "Business location",
              value: "India",
            },
          ]),
    ],
    whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL || defaultWhatsappUrl,
    whatsappLabel: "Order on WhatsApp",
    complianceSignals: [
      {
        title: "GST registered business",
        status: `GSTIN / UIN: ${gstNumber}`,
        description:
          "Official GST registration details are displayed to support verified business identity, invoicing confidence, and trade credibility.",
      },
      {
        title: "Registered trade identity",
        status: tradeName,
        description:
          "The published trade name and registration date help the brand feel more official for customers, retailers, and wholesale buyers.",
      },
      {
        title: "Food licence document",
        status: fssaiLicense
          ? `Food licence / FSSAI: ${fssaiLicense}`
          : "Official food licence document available for review",
        description:
          "Food licence documentation can be published in a view-only format from the public website to support trust without relying on vague claims.",
      },
      {
        title: "Udyam and supporting records",
        status: "Business registration documents published for verification",
        description:
          "MSME and supporting certificate files can be presented in a view-only format for a more official business presentation.",
      },
      {
        title: "Reachable support",
        status: supportPhone
          ? `WhatsApp orders and support: ${supportPhone}`
          : "Direct order support available through WhatsApp",
        description:
          "Support for product questions, order confirmations, retailer interest, and wholesale requests is available through a single contact route with a clear response target.",
      },
    ],
    certificationDocuments: [
      {
        slug: "gst-registration-certificate",
        title: "GST Registration Certificate",
        description:
          "Official GST registration document showing GSTIN, trade name, registration date, and jurisdiction details.",
        href: "/compliance/documents/gst-registration-certificate",
        fileLabel: "PDF",
        issuedOn: gstRegistrationDate,
      },
      {
        slug: "udyam-registration-certificate",
        title: "Udyam Registration Certificate",
        description:
          "Published MSME / Udyam registration certificate for business credibility and trust with trade buyers.",
        href: "/compliance/documents/udyam-registration-certificate",
        fileLabel: "PDF",
      },
      {
        slug: "food-license",
        title: "Food Licence",
        description:
          "Official food licence document made available for business verification and trust-led communication.",
        href: "/compliance/documents/food-license",
        fileLabel: "PDF",
      },
      {
        slug: "pledge-document",
        title: "Pledge Document",
        description:
          "Supporting business and trust document published alongside the core registrations for reference.",
        href: "/compliance/documents/pledge-document",
        fileLabel: "PDF",
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
  { label: "Order Now", href: "/contact" },
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
          { label: "Order on WhatsApp", href: "/contact" },
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
          { label: "Order now", href: "/contact" },
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
        description: "Snack-ready products presented for retail, gifting, and trade-led bulk orders.",
        href: buildWholesaleWhatsAppUrl(),
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
  { label: "Order Now", href: "/contact" },
  { label: "Bulk / Wholesale", href: "/wholesale" },
  { label: "Shipping & Returns", href: "/shipping-returns" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];
