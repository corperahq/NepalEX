import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { ServicesGrid } from "@/components/sections/services-grid";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { HowItWorks } from "@/components/sections/how-it-works";
import { CtaBand } from "@/components/sections/cta-band";
import { RateCalculator } from "@/components/forms/rate-calculator";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />

      {/* Services */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Our services"
            title={
              <>
                Complete logistics, <span className="text-gradient">one network</span>
              </>
            }
            subtitle="From a single parcel to full container cargo — domestic and worldwide."
          />
          <Reveal delay={2}>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-2"
            >
              View all services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-12">
          <ServicesGrid limit={6} />
        </div>
      </section>

      <HowItWorks />

      {/* Rate calculator band */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Instant pricing"
              title={
                <>
                  Know your cost <span className="text-gradient">before you ship</span>
                </>
              }
              subtitle="Pick a service and destination, enter the weight, and get an instant estimate. No sign-up needed."
            />
            <ul className="mt-8 space-y-3 text-muted">
              {[
                "Transparent, competitive rates",
                "Air, sea and domestic options",
                "Door-to-door and airport-to-airport",
              ].map((t) => (
                <Reveal key={t}>
                  <li className="flex items-center gap-3">
                    <span className="brand-gradient h-2 w-2 rounded-full" />
                    {t}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal delay={1}>
            <RateCalculator />
          </Reveal>
        </div>
      </section>

      <WhyChooseUs />
      <CtaBand />
    </>
  );
}
