import Link from "next/link";
import Image from "next/image";

import { getAllProducts } from "@/lib/content/products";
import { getSiteContent } from "@/lib/content/site";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { buttonStyles } from "@/components/ui/button";

export async function CoreCategoriesSection() {
  const [siteContent, products] = await Promise.all([getSiteContent(), getAllProducts()]);
  const categoryImages = new Map(products.map((product) => [product.category, product.images[0]]));

  return (
    <section className="section-shell">
      <Container>
        <SectionHeading
          eyebrow="Core categories"
          title="Shop the range by the way people actually use it at home."
          description="Seeds for breakfast and toppings, teas for daily rituals, and essentials for kitchens or snacking. The range is narrow by design so it stays easy to browse."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {siteContent.coreCategories.map((category) => (
            <article key={category.title} className="card-surface overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden bg-sand-100">
                {(() => {
                  const image =
                    categoryImages.get(
                      category.title === "Seeds"
                        ? "Seeds"
                        : category.title === "Tea collection"
                          ? "Tea"
                          : "Pantry Essentials",
                    ) || null;

                  return image ? (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 32vw, 100vw"
                    className="object-cover transition duration-700 hover:scale-[1.03]"
                  />
                  ) : null;
                })()}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_28%,rgba(19,32,24,0.55)_100%)]" />
                <div className="absolute inset-x-5 bottom-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-sand-100/80">
                    Category
                  </p>
                  <h3 className="mt-2 text-3xl text-sand-50">{category.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="leading-7 text-olive-800">{category.description}</p>
                <Link
                  href={category.href}
                  className={buttonStyles({ variant: "secondary", className: "mt-6" })}
                >
                  Explore category
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
