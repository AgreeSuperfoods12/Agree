import { getSiteContent } from "@/lib/content/site";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";

export async function TrustSection() {
  const siteContent = await getSiteContent();

  return (
    <section className="section-shell">
      <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="dark-panel p-8 sm:p-10">
          <SectionHeading
            eyebrow="Quality and sourcing story"
            title="A product range supported by careful presentation, useful guidance, and responsive support."
            description="From seeds and teas to everyday essentials, the range is positioned with practical use notes, storage guidance, and a polished identity that feels reliable on every screen."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {siteContent.trustMetrics.map((item) => (
              <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-5">
                <p className="text-3xl text-sand-50">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-sand-100/75">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-5">
          {siteContent.qualityPillars.map((value) => (
            <article key={value.title} className="card-surface p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-olive-700">
                Trust pillar
              </p>
              <h3 className="text-2xl">{value.title}</h3>
              <p className="mt-4 leading-7 text-olive-800">{value.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
