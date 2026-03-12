import { getSiteContent } from "@/lib/content/site";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";

export async function IngredientBenefitsSection() {
  const siteContent = await getSiteContent();

  return (
    <section className="section-shell">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Wellness education"
            title="Ingredient-led content that helps people use the range more confidently."
            description="The experience is built around simple routines, food context, and practical use. It feels educational without sounding clinical or overstated."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {siteContent.wellnessFeatures.map((item) => (
              <article key={item.name} className="card-surface p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-olive-700">
                  {item.benefit}
                </p>
                <h3 className="mt-3 text-2xl">{item.name}</h3>
                <p className="mt-4 leading-7 text-olive-800">{item.blurb}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
