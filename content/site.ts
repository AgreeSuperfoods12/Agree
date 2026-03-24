import type { SiteContent } from "@/types/site";
import { buildGeneralOrderWhatsAppUrl } from "@/lib/whatsapp";

export const defaultSiteContent: SiteContent = {
  hero: {
    eyebrow: "Agree Superfoods",
    title: "Order Better Pantry Staples.",
    description:
      "Explore premium seeds, teas, makhana, and pantry essentials with simple pricing and direct WhatsApp ordering for fast support.",
    primaryCta: {
      label: "Order on WhatsApp",
      href: buildGeneralOrderWhatsAppUrl(),
    },
    secondaryCta: {
      label: "Browse Products",
      href: "/products",
    },
    supportingPoints: [
      "Direct WhatsApp ordering",
      "Market-aligned pricing",
      "Bulk support available",
    ],
  },
  homepageIntro: [
    "Agree Superfoods is a modern Indian wellness pantry brand for people who want better everyday choices without the noise. The range focuses on familiar ingredients, steady quality, and products that are easy to use at home.",
    "From breakfast bowls and tea rituals to snacking and simple cooking, every product is presented with careful language, practical guidance, and a premium visual identity that builds confidence from the first visit.",
  ],
  whyChooseCards: [
    {
      title: "Familiar ingredients, thoughtfully presented",
      description:
        "The collection is built around products people already understand and use, from chia and flax seeds to black pepper, makhana, and tea.",
    },
    {
      title: "Clear information at every step",
      description:
        "Product pages focus on ingredients, usage ideas, storage guidance, and honest, restrained wellness language rather than exaggerated promises.",
    },
    {
      title: "A brand you can contact with confidence",
      description:
        "Agree Superfoods is designed to feel dependable for both households and business buyers, with clear support routes for direct orders and bulk requirements.",
    },
  ],
  wellnessFeatures: [
    {
      name: "Seeds for breakfast, topping, and meal prep",
      blurb:
        "Chia, flax, pumpkin, and sunflower seeds work naturally in breakfast bowls, smoothies, salads, snack mixes, and pantry jars.",
      benefit: "Simple to use in everyday meals",
    },
    {
      name: "Tea rituals that feel calm and refined",
      blurb:
        "Green tea, white tea, and black tea help bring a premium beverage layer to the range, whether the moment is quiet, social, or part of a daily reset.",
      benefit: "A clean tea collection for daily routines",
    },
    {
      name: "Makhana for modern snacking",
      blurb:
        "Makhana brings a recognisable Indian snacking favourite into a cleaner, premium pantry context with room for both home and gifting use.",
      benefit: "Snack-friendly and easy to revisit",
    },
    {
      name: "Kitchen staples with steady everyday value",
      blurb:
        "Black pepper keeps the range grounded in real kitchens and practical cooking, adding depth to the brand beyond trend-driven health foods.",
      benefit: "Useful in cooking, seasoning, and daily food habits",
    },
  ],
  qualityPillars: [
    {
      title: "Careful sourcing and selection",
      description:
        "The range is presented around ingredient quality, clean pantry appeal, and products that deserve a place in everyday routines.",
    },
    {
      title: "Clean, label-friendly communication",
      description:
        "Descriptions stay easy to understand, visually refined, and suitable for packaging, product sheets, and public-facing brand communication.",
    },
    {
      title: "Support for households and business buyers",
      description:
        "The same website supports customer discovery, direct order requests, wholesale interest, and serious brand conversations without feeling technical or cluttered.",
    },
  ],
  brandStory: [
    "Agree Superfoods was shaped as a premium, modern Indian healthy foods brand with a simple promise: bring better everyday ingredients to people in a way that feels calm, credible, and easy to trust.",
    "Instead of chasing loud claims, the brand is built around quality presentation, familiar pantry behaviour, and products that make sense in real homes, gifting moments, and professional buying conversations.",
  ],
  packagingStory: [
    "The visual direction is inspired by premium pantry packaging, with botanical greens, warm neutrals, rounded labels, and clean ingredient-led layouts that feel natural on both mobile and desktop.",
    "That same packaging logic carries through the website so every section feels considered, readable, and consistent with the kind of brand experience customers expect from a premium food label.",
  ],
  trustMetrics: [
    { value: "9", label: "everyday products across seeds, teas, snacks, and pantry essentials" },
    { value: "3", label: "clear product lanes: seeds, teas, and everyday essentials" },
    { value: "1 business day", label: "target response time for WhatsApp orders and bulk requests" },
    { value: "Every product", label: "includes pricing, usage ideas, and FAQ guidance" },
  ],
  complianceBadges: [
    {
      title: "Quality-first presentation",
      description: "Each page is written to support trust, clarity, and a premium food brand impression.",
    },
    {
      title: "Careful wellness language",
      description: "The brand avoids exaggerated health promises and keeps claims practical and responsible.",
    },
    {
      title: "Business enquiry support",
      description: "Retail, wholesale, gifting, and distributor discussions can be handled through direct WhatsApp and bulk support routes.",
    },
    {
      title: "Support you can reach",
      description: "WhatsApp support is available for customer questions, product requests, and business conversations.",
    },
  ],
  complianceItems: [
    {
      title: "Professional business identity",
      description:
        "The brand is presented with clear naming, structured product information, and a polished visual system suitable for public launch.",
    },
    {
      title: "Responsible public claims",
      description:
        "The website uses careful food and wellness language focused on ingredient use, routine, and quality rather than medical promises.",
    },
    {
      title: "Straightforward support and trade access",
      description:
        "Customers, retailers, and wholesale buyers all have clear routes to ask questions, request details, or start a conversation.",
    },
  ],
  complianceDisclaimer:
    "Public compliance statements should always be reviewed and updated with verified business details before they are used as legal or regulatory claims.",
  coreCategories: [
    {
      title: "Seeds",
      description:
        "Chia, flax, pumpkin, and sunflower seeds for breakfast bowls, toppings, smoothies, baking, and everyday healthy pantry habits.",
      href: "/products?category=Seeds",
    },
    {
      title: "Tea collection",
      description:
        "Green tea, white tea, and black tea for quiet rituals, gifting, and simple daily beverage routines with premium presentation.",
      href: "/products?category=Tea",
    },
    {
      title: "Everyday essentials",
      description:
        "Makhana and black pepper bring together snacking and kitchen familiarity, keeping the range practical as well as premium.",
      href: "/products?category=Pantry%20Essentials",
    },
  ],
  globalFaqs: [
    {
      question: "How can I buy Agree Superfoods products?",
      answer:
        "You can place an order directly on WhatsApp from the product pages or the main order buttons across the site. Bulk buyers can also use the wholesale route.",
    },
    {
      question: "Does Agree Superfoods make medical claims?",
      answer:
        "No. Product and blog content uses careful food and wellness language focused on ingredients, taste, routine, and everyday use.",
    },
    {
      question: "Can retailers, distributors, or hospitality buyers get in touch?",
      answer:
        "Yes. The bulk and wholesale route is designed for trade, gifting, distributor, and hospitality conversations.",
    },
    {
      question: "How quickly does the team reply?",
      answer:
        "Agree Superfoods aims to respond to WhatsApp orders and wholesale requests within one business day.",
    },
  ],
  contactHighlights: [
    "Direct WhatsApp ordering for products across seeds, teas, makhana, and pantry essentials.",
    "Retail, distributor, gifting, and hospitality bulk requirements.",
    "Support for final pricing, delivery confirmation, and catalogue discussions.",
  ],
  wholesaleBenefits: [
    "A focused product range across seeds, teas, snacks, and pantry essentials.",
    "Premium presentation suited to retail shelves, gifting, and catalogue discussions.",
    "Clear product information that helps business buyers review the range faster.",
    "Responsive support for trade, distribution, and bulk requirement discussions.",
  ],
  newsletter: {
    eyebrow: "Stay connected",
    title: "Get product news, ingredient ideas, and updates from Agree Superfoods.",
    description:
      "Join the list for occasional updates on new launches, pantry inspiration, and practical articles around seeds, teas, and everyday wellness foods.",
    privacyNote: "Occasional emails only. No spam and no exaggerated health promises.",
  },
};
