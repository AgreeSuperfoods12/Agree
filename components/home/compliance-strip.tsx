import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/layout/container";

export function ComplianceStrip() {
  return (
    <section className="section-shell py-8">
      <Container>
        <div className="dark-panel grid gap-4 p-5 md:grid-cols-4">
          {siteConfig.business.complianceSignals.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.6rem] border border-white/10 bg-white/5 px-4 py-4"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sand-100/65">
                {item.title}
              </p>
              <p className="mt-3 text-sm font-medium text-sand-50">{item.status}</p>
              <p className="mt-2 text-sm leading-6 text-sand-100/78">{item.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
