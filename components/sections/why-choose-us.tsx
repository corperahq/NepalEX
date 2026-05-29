import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { whyChooseUs } from "@/lib/site";

export function WhyChooseUs() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <SectionHeading
        center
        eyebrow="Why choose us"
        title={
          <>
            Trusted to deliver, <span className="text-gradient">every time</span>
          </>
        }
        subtitle="Nepal's most experienced courier network, built on speed, reliability and genuine care for every consignment."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {whyChooseUs.map((w, i) => (
          <Reveal key={w.title} delay={i}>
            <div className="h-full rounded-2xl border border-line bg-ink-card p-7 transition-colors hover:border-brand/40">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-brand-2">
                <w.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{w.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
