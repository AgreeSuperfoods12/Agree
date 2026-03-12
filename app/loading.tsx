import { Container } from "@/components/layout/container";

export default function Loading() {
  return (
    <div className="section-shell">
      <Container>
        <div className="card-surface grid min-h-[50vh] place-items-center p-12">
          <div className="space-y-4 text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-olive-200 border-t-olive-950" />
            <p className="text-sm uppercase tracking-[0.28em] text-olive-700">
              Loading Agree Superfoods
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
