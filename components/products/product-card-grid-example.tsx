import { ProductCard } from "@/components/products/product-card";

const exampleProducts = [
  {
    title: "Salted Caramel Bar",
    price: 240,
    compareAtPrice: 360,
    currency: "INR",
    badgeLeft: "New",
    badgeRight: "-33%",
    primaryImage: {
      src: "/images/reference/packshot-4.png",
      alt: "Salted caramel bar package front",
    },
    secondaryImage: {
      src: "/images/products/makhana.png",
      alt: "Lifestyle snack image for salted caramel bar hover state",
    },
    href: "/products/makhana",
  },
  {
    title: "Omega 3 Boost",
    price: 3490,
    compareAtPrice: 3550,
    currency: "INR",
    badgeLeft: "New",
    badgeRight: "-1%",
    primaryImage: {
      src: "/images/reference/packshot-3.png",
      alt: "Omega 3 Boost package front",
    },
    secondaryImage: {
      src: "/images/blog/chia-benefits.jpg",
      alt: "Chia seeds close-up used as hover image",
    },
    href: "/products/chia-seeds",
  },
  {
    title: "Mint Vanilla Brownie",
    price: 790,
    compareAtPrice: 910,
    currency: "INR",
    badgeLeft: "New",
    badgeRight: "-13%",
    primaryImage: {
      src: "/images/reference/packshot-5.png",
      alt: "Mint Vanilla Brownie package front",
    },
    secondaryImage: {
      src: "/images/products/sunflower-seeds.png",
      alt: "Sunflower seeds close-up used as hover image",
    },
    href: "/products/sunflower-seeds",
  },
  {
    title: "Lavender Valerian",
    price: 3490,
    currency: "INR",
    badgeLeft: "New",
    primaryImage: {
      src: "/images/reference/packshot-1.png",
      alt: "Lavender Valerian package front",
    },
    secondaryImage: {
      src: "/images/products/white-tea.png",
      alt: "White tea image used as hover state",
    },
    href: "/products/white-tea",
  },
];

export function ProductCardGridExample() {
  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {exampleProducts.map((product) => (
        <ProductCard key={product.title} {...product} />
      ))}
    </section>
  );
}
