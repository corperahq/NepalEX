"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Package,
  Plane,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
} from "lucide-react";
import { PageHead } from "@/components/dashboard/page-head";
import { Card, CardHeader, StatusBadge, Button } from "@/components/dashboard/primitives";
import {
  getShipment,
  shipments,
  trackingStages,
  formatDateTime,
  type Shipment,
} from "@/lib/dashboard-data";

const stageIcons = [Clock, Package, Plane, Truck, CheckCircle2];

export default function TrackingPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<Shipment | null | undefined>(undefined);

  const search = (value: string) => {
    setCode(value);
    setResult(getShipment(value.trim()));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(getShipment(code.trim()));
  };

  const suggestions = shipments
    .filter((s) => s.status !== "Cancelled")
    .slice(0, 4);

  return (
    <>
      <PageHead
        title="Track a Shipment"
        description="Enter an AWB number to see its live journey."
        breadcrumb={[{ label: "Tracking" }]}
      />

      <Card className="p-5">
        <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-line bg-ink-soft px-3">
            <Search className="h-4 w-4 text-muted" />
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. NPX020480"
              className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-muted"
            />
          </div>
          <Button type="submit">Track</Button>
        </form>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted">Try:</span>
          {suggestions.map((s) => (
            <button
              key={s.id}
              onClick={() => search(s.id)}
              className="rounded-full border border-line px-2.5 py-1 text-xs text-muted transition-colors hover:border-brand/40 hover:text-cream"
            >
              {s.id}
            </button>
          ))}
        </div>
      </Card>

      <AnimatePresence mode="wait">
        {result === null && (
          <motion.div
            key="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4"
          >
            <Card className="p-8 text-center">
              <p className="font-semibold">No shipment found</p>
              <p className="mt-1 text-sm text-muted">
                Check the AWB number and try again.
              </p>
            </Card>
          </motion.div>
        )}

        {result && (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 grid gap-4 lg:grid-cols-3"
          >
            <Card className="lg:col-span-2">
              <CardHeader
                title={result.id}
                subtitle={`${result.origin} → ${result.destination}, ${result.country}`}
                action={<StatusBadge status={result.status} />}
              />
              <div className="p-6">
                <Timeline shipment={result} />
              </div>
            </Card>

            <Card className="h-fit">
              <CardHeader title="Summary" />
              <div className="space-y-3 p-5 text-sm">
                <Row label="Service" value={result.service} />
                <Row label="Weight" value={`${result.weight} kg`} />
                <Row label="Pieces" value={`${result.pieces}`} />
                <Row label="Recipient" value={result.recipient} />
                <Link
                  href={`/client/shipments/${result.id}`}
                  className="mt-2 block"
                >
                  <Button variant="outline" className="w-full">
                    View full details
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Timeline({ shipment }: { shipment: Shipment }) {
  if (shipment.status === "Cancelled") {
    return (
      <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-5 text-sm text-rose-300">
        This shipment was cancelled.
      </div>
    );
  }
  const activeIndex = trackingStages.findIndex((s) => s.status === shipment.status);
  const idx = activeIndex === -1 ? trackingStages.length - 1 : activeIndex;

  return (
    <ol>
      {trackingStages.map((stage, i) => {
        const Icon = stageIcons[i];
        const done = i <= idx;
        return (
          <motion.li
            key={stage.status}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex gap-4"
          >
            <div className="flex flex-col items-center">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                  done
                    ? "border-brand/40 bg-brand/15 text-brand-2"
                    : "border-line bg-ink text-muted"
                } ${i === idx ? "ring-4 ring-brand/20" : ""}`}
              >
                <Icon className="h-5 w-5" />
              </span>
              {i < trackingStages.length - 1 && (
                <span className={`my-1 w-px flex-1 ${i < idx ? "bg-brand/40" : "bg-line"}`} />
              )}
            </div>
            <div className="pb-7">
              <p className={`font-semibold ${done ? "text-cream" : "text-muted"}`}>
                {stage.label}
              </p>
              <p className="flex items-center gap-1.5 text-sm text-muted">
                <MapPin className="h-3 w-3" />
                {done ? formatDateTime(shipment.date) : "Pending"}
              </p>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
