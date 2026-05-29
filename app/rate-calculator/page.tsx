import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { RateCalculator } from "@/components/forms/rate-calculator";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Rate Calculator",
  description:
    "Get an instant shipping rate estimate. Choose a service and destination, enter the weight, and check your NepalEX courier or cargo rate.",
};

const notes = [
  { title: "Volumetric weight", desc: "Large light parcels are charged on dimensional weight where it exceeds actual weight." },
  { title: "Customs & duties", desc: "Destination duties and taxes are billed separately by the receiving country." },
  { title: "Final pricing", desc: "Estimates are indicative. Your confirmed rate is set when the shipment is booked." },
];

export default function RatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Instant pricing"
        title={
          <>
            Check your <span className="text-gradient">shipping rate</span>
          </>
        }
        subtitle="Transparent estimates in seconds — no account required."
      />
      <section className="mx-auto grid max-w-5xl gap-12 px-5 pb-12 lg:grid-cols-[1fr_1fr] lg:px-8">
        <Reveal>
          <RateCalculator />
        </Reveal>
        <div className="space-y-5">
          {notes.map((n, i) => (
            <Reveal key={n.title} delay={i}>
              <div className="rounded-2xl border border-line bg-ink-card p-6">
                <h3 className="font-bold">{n.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{n.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
