import type { Product } from "@/types/product";
import { Container } from "@/components/layout/container";
import { ProductMiniCard } from "@/components/products/product-mini-card";
import { SectionHeading } from "@/components/shared/section-heading";

interface ProductRailSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  products: Product[];
}

export function ProductRailSection({
  eyebrow,
  title,
  description,
  products,
}: ProductRailSectionProps) {
  return (
    <section className="section-shell">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductMiniCard key={product.slug} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
