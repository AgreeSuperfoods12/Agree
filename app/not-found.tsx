import Link from "next/link";

import { Container } from "@/components/layout/container";
import { buttonStyles } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="section-shell">
      <Container>
        <div className="card-surface mx-auto max-w-3xl p-10 text-center sm:p-14">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-olive-700">
            Not found
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl">That page does not exist.</h1>
          <p className="mt-5 text-lg leading-8 text-olive-800">
            The content may have moved, the slug may be incorrect, or the page may not be
            published yet.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/" className={buttonStyles({ size: "lg" })}>
              Back to home
            </Link>
            <Link href="/products" className={buttonStyles({ variant: "secondary", size: "lg" })}>
              Browse products
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
