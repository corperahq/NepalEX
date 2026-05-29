import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { TrackForm } from "@/components/forms/track-form";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Track Shipment",
  description:
    "Track your NepalEX shipment in real time. Enter your tracking or AWB number to see live status from pickup to delivery.",
};

export default function TrackPage() {
  return (
    <>
      <PageHeader
        eyebrow="Live tracking"
        title={
          <>
            Where is my <span className="text-gradient">shipment?</span>
          </>
        }
        subtitle="Enter your tracking or AWB number to follow your parcel every step of the way."
      />
      <section className="mx-auto max-w-7xl px-5 pb-12 lg:px-8">
        <TrackForm />
      </section>
      <CtaBand />
    </>
  );
}
