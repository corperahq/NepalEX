"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  MapPin,
  User,
  Boxes,
  Plane,
  PartyPopper,
} from "lucide-react";
import { PageHead } from "@/components/dashboard/page-head";
import { Card, Button } from "@/components/dashboard/primitives";
import { SERVICE_OPTIONS } from "@/lib/dashboard-data";

const steps = [
  { title: "Sender", icon: MapPin },
  { title: "Receiver", icon: User },
  { title: "Package", icon: Boxes },
  { title: "Service", icon: Plane },
];

export default function CreateShipmentPage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [service, setService] = useState(SERVICE_OPTIONS[0]);

  const next = () => (step < steps.length - 1 ? setStep(step + 1) : setDone(true));
  const back = () => setStep(Math.max(0, step - 1));

  if (done) {
    return (
      <Card className="mx-auto max-w-xl p-10 text-center">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="brand-gradient mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-ink shadow-glow"
        >
          <PartyPopper className="h-8 w-8" />
        </motion.span>
        <h2 className="mt-5 text-2xl font-bold">Shipment created!</h2>
        <p className="mt-2 text-sm text-muted">
          Your shipment request <span className="font-semibold text-cream">NPX020481</span> has
          been placed. We&apos;ve emailed your confirmation and will notify you when it&apos;s
          picked up.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <Link href="/client/shipments">
            <Button>View shipments</Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => {
              setDone(false);
              setStep(0);
            }}
          >
            Create another
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <>
      <PageHead
        title="New Shipment"
        description="Create a new shipment request in a few quick steps."
        breadcrumb={[{ label: "New Shipment" }]}
      />

      {/* Stepper */}
      <div className="mb-6 flex items-center">
        {steps.map((s, i) => (
          <div key={s.title} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                  i < step
                    ? "border-brand/40 bg-brand/15 text-brand-2"
                    : i === step
                      ? "brand-gradient text-ink"
                      : "border-line bg-ink-card text-muted"
                }`}
              >
                {i < step ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
              </span>
              <span className={`text-xs ${i <= step ? "text-cream" : "text-muted"}`}>
                {s.title}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="mx-2 h-px flex-1 bg-line">
                <div
                  className="brand-gradient h-px transition-all"
                  style={{ width: i < step ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <Card className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 && (
              <Grid>
                <Field label="Sender name" placeholder="Himalaya Crafts" />
                <Field label="Phone" placeholder="+977-98XXXXXXXX" />
                <Field label="Pickup address" placeholder="Thamel, Kathmandu" full />
                <Field label="City" placeholder="Kathmandu" />
                <Field label="Postal code" placeholder="44600" />
              </Grid>
            )}
            {step === 1 && (
              <Grid>
                <Field label="Receiver name" placeholder="John Carter" />
                <Field label="Phone" placeholder="+1-212-555-0188" />
                <Field label="Delivery address" placeholder="5th Avenue, Manhattan" full />
                <Field label="City" placeholder="New York" />
                <SelectField label="Country" options={["USA", "UK", "UAE", "Australia", "India"]} />
              </Grid>
            )}
            {step === 2 && (
              <Grid>
                <Field label="Content type" placeholder="Handicrafts" />
                <SelectField label="Package type" options={["Box", "Envelope", "Pallet", "Tube"]} />
                <Field label="Weight (kg)" placeholder="2.5" type="number" />
                <Field label="Pieces" placeholder="1" type="number" />
                <Field label="Declared value (Rs.)" placeholder="15000" type="number" />
                <Field label="Dimensions L×W×H (cm)" placeholder="30 × 20 × 15" />
                <Field label="Description of goods" placeholder="Pashmina shawls" full />
              </Grid>
            )}
            {step === 3 && (
              <div>
                <p className="mb-3 text-sm font-medium text-muted">Choose a service</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {SERVICE_OPTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setService(s)}
                      className={`rounded-xl border p-4 text-left transition-colors ${
                        service === s
                          ? "border-brand/50 bg-brand/10"
                          : "border-line bg-ink-soft hover:border-brand/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{s}</span>
                        {service === s && (
                          <span className="brand-gradient flex h-5 w-5 items-center justify-center rounded-full text-ink">
                            <Check className="h-3 w-3" />
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-muted">
                        {s === "Air Express"
                          ? "1–3 days · fastest"
                          : s === "Air Economy"
                            ? "4–7 days · best value"
                            : s === "Sea Cargo"
                              ? "20–35 days · heavy freight"
                              : "Within Nepal · 1–2 days"}
                      </p>
                    </button>
                  ))}
                </div>
                <div className="mt-5 rounded-xl border border-brand/30 bg-brand/10 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">Estimated total</span>
                    <span className="text-xl font-bold text-gradient">Rs. 4,225</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between border-t border-line pt-5">
          <Button variant="ghost" onClick={back} disabled={step === 0}>
            <ChevronLeft className="h-4 w-4" /> Back
          </Button>
          <Button onClick={next}>
            {step === steps.length - 1 ? "Place request" : "Continue"}
            {step < steps.length - 1 && <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      </Card>
    </>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

function Field({
  label,
  full,
  ...props
}: { label: string; full?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-sm font-medium text-muted">{label}</span>
      <input
        {...props}
        className="w-full rounded-lg border border-line bg-ink-soft px-3 py-2.5 text-sm outline-none transition-colors focus:border-brand placeholder:text-muted"
      />
    </label>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-muted">{label}</span>
      <select className="w-full rounded-lg border border-line bg-ink-soft px-3 py-2.5 text-sm outline-none focus:border-brand">
        {options.map((o) => (
          <option key={o} className="bg-ink-card">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
