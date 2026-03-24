import type { HomePageContent } from "@/types/home";
import {
  buildGeneralOrderWhatsAppUrl,
  buildWholesaleWhatsAppUrl,
} from "@/lib/whatsapp";

export const defaultHomePageContent: HomePageContent = {
  announcement: {
    message: "Order premium pantry staples directly on WhatsApp",
    secondaryMessage: "Retail and wholesale support available",
    ctaLabel: "Order Now",
    ctaHref: buildGeneralOrderWhatsAppUrl(),
  },
  heroVisualCards: [
    {
      title: "Breakfast pantry picks",
      description: "Seeds chosen for bowls, smoothies, toppings, and meal prep.",
      image: {
        src: "/images/blog/chia-benefits.jpg",
        alt: "Breakfast bowl styling for Agree Superfoods homepage hero",
      },
      href: "/products/chia-seeds",
    },
    {
      title: "Tea-time essentials",
      description: "Tea-led moments and pantry rituals with a premium feel.",
      image: {
        src: "/images/blog/tea-comparison.jpg",
        alt: "Tea ritual image for Agree Superfoods homepage hero",
      },
      href: "/products/black-tea",
    },
  ],
  heroProductSlugs: [
    "chia-seeds",
    "flax-seeds",
    "pumpkin-seeds",
    "sunflower-seeds",
    "makhana",
    "black-pepper",
    "green-tea",
    "black-tea",
    "white-tea",
  ],
  featuredGridSlugs: ["chia-seeds", "flax-seeds", "pumpkin-seeds", "black-pepper"],
  collectionTiles: [
    {
      title: "Seeds",
      description: "Breakfast bowls, toppings, smoothies, and baking staples.",
      href: "/products?category=Seeds",
      image: {
        src: "/images/collections/seeds-premium.jpg",
        alt: "Premium seed bowl and breakfast styling for Agree Superfoods seeds collection",
      },
    },
    {
      title: "Tea Collection",
      description: "Green, white, and black tea for calm daily rituals.",
      href: "/products?category=Tea",
      image: {
        src: "/images/collections/tea-premium.jpg",
        alt: "Premium tea still life for Agree Superfoods tea collection",
      },
    },
    {
      title: "Pantry Essentials",
      description: "Familiar staples for seasoning, snacking, and everyday use.",
      href: "/products?category=Pantry%20Essentials",
      image: {
        src: "/images/collections/pantry-premium.jpg",
        alt: "Premium black pepper macro image for Agree Superfoods pantry essentials collection",
      },
    },
    {
      title: "Healthy Snacking",
      description: "Snack-friendly ingredients with an easy pantry fit.",
      href: "/products/makhana",
      image: {
        src: "/images/collections/snacking-premium.jpg",
        alt: "Premium healthy snack bowls image for Agree Superfoods healthy snacking collection",
      },
    },
    {
      title: "Bulk Supply",
      description: "Retail, gifting, hospitality, and trade support.",
      href: "/wholesale",
      image: {
        src: "/images/blog/pumpkin-sunflower-seeds.jpg",
        alt: "Agree Superfoods bulk supply collection tile image",
      },
    },
  ],
  editorialSplit: {
    eyebrow: "Nourish your body, delight your pantry",
    title: "Ingredient-led foods presented with a richer, more commercial brand feel.",
    description:
      "Agree Superfoods is designed to feel like a premium pantry storefront, not a catalog page. The range is narrow, usable, and easy to browse.",
    body: [
      "From chia and flax seeds to teas, makhana, and black pepper, every product is shown with clearer context, calmer language, and a presentation that feels ready for households, gifting, and trade.",
      "The goal is simple: make the brand feel polished, trustworthy, and easy to explore whether the visitor is a customer, a retailer, or a wholesale buyer.",
    ],
    ctaLabel: "Explore the range",
    ctaHref: "/products",
    image: {
      src: "/images/blog/flax-daily-use.jpg",
      alt: "Flax seeds close-up for Agree Superfoods editorial section",
    },
    highlights: ["Premium merchandising", "Everyday pantry clarity", "Trade-ready support"],
  },
  promoBanner: {
    eyebrow: "Complete pantry nutrition",
    title: "A calmer wellness brand built around kitchen reality, not loud promises.",
    description:
      "The website keeps the tone ingredient-first and practical, while the new storefront system adds more visual rhythm, stronger discovery, and clearer conversion paths.",
    ctaLabel: "Read the brand story",
    ctaHref: "/about",
    image: {
      src: "/images/products/sunflower-seeds.png",
      alt: "Sunflower seeds macro image for Agree Superfoods promotional banner",
    },
    theme: "light",
  },
  benefitsRow: [
    {
      iconText: "QI",
      title: "Quality ingredients",
      description: "Careful ingredient selection and a restrained, trustworthy tone.",
    },
    {
      iconText: "PR",
      title: "Pantry ready",
      description: "Products chosen for breakfast, snacking, tea time, and cooking.",
    },
    {
      iconText: "WS",
      title: "WhatsApp orders",
      description: "Fast direct ordering with support for retail, gifting, and repeat purchases.",
    },
    {
      iconText: "TB",
      title: "Trusted business presentation",
      description: "Professional support routes and compliance-aware messaging.",
    },
  ],
  topPicksSlugs: ["pumpkin-seeds", "sunflower-seeds", "white-tea", "black-tea"],
  productSpotlight: {
    eyebrow: "Spotlight product",
    title: "Makhana made for modern snacking and premium pantry shelves.",
    description:
      "Light, versatile, and easy to share, makhana fits everyday snacking, gifting hampers, and premium retail assortments.",
    productSlug: "makhana",
    bullets: [
      "A familiar snack with a cleaner, more premium pantry presentation",
      "Easy to position for gifting, hospitality, and premium shelf placement",
      "Ideal for everyday snacking, curated hampers, and modern pantry routines",
    ],
  },
  testimonials: [
    {
      quote:
        "The range feels easy to understand and premium enough for our customers without sounding exaggerated.",
      name: "Riya Mehta",
      role: "Retail buyer",
      productLabel: "Seed collection",
    },
    {
      quote:
        "The product pages are much clearer now. It feels like a store I can browse, not just a brand brochure.",
      name: "Karan Bhatia",
      role: "Customer enquiry",
      productLabel: "Tea collection",
    },
    {
      quote:
        "The trade route feels more serious and better organized for gifting and hospitality requirements.",
      name: "Ananya Shah",
      role: "Corporate gifting partner",
      productLabel: "Bulk support",
    },
    {
      quote:
        "The layout gives every ingredient more context, which makes the whole range feel more trustworthy.",
      name: "Dev Arora",
      role: "Wellness shopper",
      productLabel: "Pantry essentials",
    },
  ],
  collageSection: {
    eyebrow: "Brand collage",
    title: "A premium food storefront needs visual rhythm as much as strong copy.",
    description:
      "This section adds the editorial collage feel from the reference design using image-led tiles, descriptive overlays, and product-linked navigation.",
    items: [
      {
        title: "Tea-time rituals",
        description: "Quiet daily moments supported by green, white, and black tea.",
        image: {
          src: "/images/products/white-tea.png",
          alt: "White tea leaves for Agree Superfoods collage section",
        },
        href: "/products?category=Tea",
      },
      {
        title: "Breakfast bowls and toppings",
        description: "Seeds that fit naturally into everyday meal routines.",
        image: {
          src: "/images/blog/chia-benefits.jpg",
          alt: "Chia seeds for Agree Superfoods collage section",
        },
        href: "/products?category=Seeds",
      },
      {
        title: "Pantry flavour and texture",
        description: "Black pepper and makhana keep the assortment practical as well as premium.",
        image: {
          src: "/images/blog/black-pepper-daily-use.jpg",
          alt: "Black pepper for Agree Superfoods collage section",
        },
        href: "/products?category=Pantry%20Essentials",
      },
    ],
  },
  usageCards: [
    {
      title: "Breakfast bowl upgrades",
      description: "Use seeds across bowls, smoothies, and pantry jars for quick daily upgrades.",
      href: "/blog/benefits-of-chia-seeds-in-everyday-diet",
      ctaLabel: "Read breakfast ideas",
      image: {
        src: "/images/blog/chia-benefits.jpg",
        alt: "Chia seeds for breakfast bowl inspiration",
      },
    },
    {
      title: "Tea rituals and pairings",
      description: "Build calmer daily beverage moments with a clearer tea collection.",
      href: "/blog/green-tea-vs-black-tea-vs-white-tea",
      ctaLabel: "Compare the teas",
      image: {
        src: "/images/products/black-tea.png",
        alt: "Black tea for tea ritual inspiration",
      },
    },
    {
      title: "Snack and pantry routines",
      description: "Blend seeds, makhana, and kitchen staples into a steadier home routine.",
      href: "/blog/pumpkin-and-sunflower-seeds-for-everyday-snacking",
      ctaLabel: "See snack ideas",
      image: {
        src: "/images/products/makhana.png",
        alt: "Makhana for snack inspiration",
      },
    },
  ],
  eventBanners: [
    {
      eyebrow: "For retail and trade",
      title: "Wholesale supply conversations for stores, gifting, and hospitality.",
      description:
        "Use the dedicated wholesale route for catalogues, larger quantities, and serious business discussions around the range.",
      ctaLabel: "Bulk / Wholesale",
      ctaHref: buildWholesaleWhatsAppUrl(),
      image: {
        src: "/images/blog/pumpkin-sunflower-seeds.jpg",
        alt: "Seeds image for Agree Superfoods wholesale banner",
      },
    },
    {
      eyebrow: "Ingredient spotlight",
      title: "Explore seeds and teas through practical guidance, not overclaiming.",
      description:
        "The journal supports product discovery with usage ideas, tea comparisons, and pantry-friendly reading.",
      ctaLabel: "Visit the blog",
      ctaHref: "/blog",
      image: {
        src: "/images/blog/flax-daily-use.jpg",
        alt: "Flax seeds image for Agree Superfoods ingredient spotlight banner",
      },
    },
    {
      eyebrow: "Simple ordering",
      title: "Ready to place an order without waiting for a callback?",
      description:
        "Message Agree Superfoods on WhatsApp for current pricing, order confirmation, delivery details, and quick support.",
      ctaLabel: "Order on WhatsApp",
      ctaHref: buildGeneralOrderWhatsAppUrl(),
      image: {
        src: "/images/blog/black-pepper-daily-use.jpg",
        alt: "Black pepper image for Agree Superfoods support banner",
      },
    },
  ],
  productRow: {
    eyebrow: "Exclusive deal style row",
    title: "Compact merchandising near the bottom keeps the homepage feeling like a store.",
    description:
      "This lower rail blends a larger editorial card with compact product cards so the page still feels active and commercial deeper into the scroll.",
    productSlugs: ["green-tea", "white-tea", "black-tea"],
    feature: {
      eyebrow: "Storefront note",
      title: "Seasonal pantry updates, gifting support, and bulk conversations can all live in the same retail system.",
      description:
        "The current frontend keeps the order flow simple through WhatsApp today while staying ready for future stock and cart logic.",
      ctaLabel: "See all products",
      ctaHref: "/products",
      image: {
        src: "/images/products/white-tea.png",
        alt: "White tea image for Agree Superfoods lower editorial card",
      },
    },
  },
  trustIconsBottom: [
    {
      iconText: "CL",
      title: "Compliance aware",
      description: "Business details and public statements stay restrained and configurable.",
    },
    {
      iconText: "SG",
      title: "SEO strong",
      description: "Structured product, blog, and FAQ pages built to stay crawlable and useful.",
    },
    {
      iconText: "MR",
      title: "Mobile ready",
      description: "The storefront is designed first for smaller screens, then scaled upward.",
    },
    {
      iconText: "FC",
      title: "Future commerce ready",
      description: "Layouts are ready for pricing, Shopify data, and headless catalog logic later.",
    },
    {
      iconText: "SP",
      title: "Support first",
      description: "Contact and wholesale routes are placed throughout the experience.",
    },
  ],
  footerCta: {
    eyebrow: "Place your order today",
    title: "Choose your products, confirm the price, and order directly on WhatsApp.",
    description:
      "The site now guides customers toward ordering with clearer pricing, faster support, and a simple WhatsApp checkout conversation for both retail and repeat buyers.",
    primaryLabel: "Order on WhatsApp",
    primaryHref: buildGeneralOrderWhatsAppUrl(),
    secondaryLabel: "Browse Products",
    secondaryHref: "/products",
    image: {
      src: "/images/banners/spice-flat-lay.jpg",
      alt: "Black pepper background image for Agree Superfoods footer CTA",
    },
  },
};
