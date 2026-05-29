import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { steps } from "@/lib/site";

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-ink-soft py-24">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          center
          eyebrow="How it works"
          title={
            <>
              From booking to <span className="text-gradient">doorstep</span>
            </>
          }
          subtitle="Four simple steps to move your shipment anywhere in the world."
        />

        <div className="relative mt-16 grid gap-8 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent md:block" />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i} className="relative">
              <div className="brand-gradient relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-extrabold text-ink shadow-glow">
                {s.n}
              </div>
              <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
