import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function CtaBand() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-brand/30 bg-ink-card p-10 text-center md:p-16">
          <div className="brand-gradient pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-3xl" />
          <div className="brand-gradient pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full opacity-20 blur-3xl" />
          <h2 className="relative text-3xl font-extrabold md:text-4xl">
            Ready to ship with{" "}
            <span className="text-gradient">Nepal&apos;s #1</span> courier?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-muted">
            Get a quote in seconds or talk to our team about regular business
            shipping, ecommerce fulfilment and bulk cargo.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/rate-calculator"
              className="brand-gradient group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-ink shadow-glow transition-transform hover:scale-[1.03]"
            >
              Get a Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold hover:border-brand/40"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
