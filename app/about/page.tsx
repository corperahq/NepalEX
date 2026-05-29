import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Stats } from "@/components/sections/stats";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";
import { Globe2, HeartHandshake, Rocket } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Nepal Express Parcel and Logistics (NepalEX) has provided fast, reliable courier and cargo services across Nepal and worldwide since 2012.",
};

const values = [
  {
    icon: Rocket,
    title: "Speed by design",
    desc: "An efficient network built to move consignments quickly, from first-mile pickup to final delivery.",
  },
  {
    icon: HeartHandshake,
    title: "Customer first",
    desc: "We care about our customers' feelings and treat every consignment as if it were our own.",
  },
  {
    icon: Globe2,
    title: "Truly worldwide",
    desc: "Domestic coverage across Nepal plus international reach by air and sea to 220+ destinations.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get to know us"
        title={
          <>
            Years of expertise in <span className="text-gradient">on-demand</span>{" "}
            cargo &amp; courier
          </>
        }
        subtitle={`${site.legalName} — one of the oldest and most trusted logistics providers in Nepal.`}
      />

      <section className="mx-auto max-w-4xl px-5 lg:px-8">
        <Reveal>
          <div className="rounded-3xl border border-line bg-ink-card p-8 md:p-12">
            <p className="text-lg leading-relaxed text-muted">
              Through our efficient network,{" "}
              <span className="text-cream">{site.legalName}</span> provides
              consistent and high-quality domestic and international delivery
              services. Providing fast and reliable service since {site.since}, we
              have grown into Nepal&apos;s number one courier service provider, with
              the largest volume of shipments in the country.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              With more than nine years of experience, we take care of every
              consignment seriously — combining competitive pricing with the
              reliability businesses and individuals depend on.
            </p>
          </div>
        </Reveal>
      </section>

      <Stats />

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i}>
              <div className="h-full rounded-2xl border border-line bg-ink-card p-7">
                <div className="brand-gradient flex h-12 w-12 items-center justify-center rounded-xl text-ink">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <WhyChooseUs />
      <CtaBand />
    </>
  );
}
