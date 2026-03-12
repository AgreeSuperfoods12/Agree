import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/products/product-card";
import { SectionHeading } from "@/components/shared/section-heading";
import type { Product } from "@/types/product";

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="section-shell">
      <Container>
        <SectionHeading
          eyebrow="Continue exploring"
          title="Related products"
          description="Keep browsing the range with a few nearby products that suit the same pantry, gifting, or tea-time context."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
