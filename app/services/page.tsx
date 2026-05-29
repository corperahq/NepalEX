import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { ServicesGrid } from "@/components/sections/services-grid";
import { HowItWorks } from "@/components/sections/how-it-works";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Parcels, air cargo, sea cargo, ecommerce logistics, import/export and customs clearance — domestic and international courier services from NepalEX.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title={
          <>
            Logistics solutions for <span className="text-gradient">every need</span>
          </>
        }
        subtitle="One trusted network for domestic and international shipping — fast, reliable and worldwide."
      />
      <section className="mx-auto max-w-7xl px-5 pb-8 lg:px-8">
        <ServicesGrid />
      </section>
      <HowItWorks />
      <CtaBand />
    </>
  );
}
