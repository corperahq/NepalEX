"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calculator, ArrowRight } from "lucide-react";
import { PageHead } from "@/components/dashboard/page-head";
import { Card, CardHeader, Button } from "@/components/dashboard/primitives";
import { Th, Td } from "@/components/dashboard/controls";
import { formatNPR } from "@/lib/dashboard-data";

const providers = [
  { id: "express", label: "Air Express", perKg: 1450, base: 600 },
  { id: "economy", label: "Air Economy", perKg: 980, base: 500 },
  { id: "sea", label: "Sea Cargo", perKg: 320, base: 1500 },
  { id: "domestic", label: "Domestic", perKg: 140, base: 100 },
];

const zones = [
  { id: "saarc", label: "India & SAARC", mult: 1 },
  { id: "gulf", label: "Gulf / Middle East", mult: 1.25 },
  { id: "sea", label: "Southeast & East Asia", mult: 1.4 },
  { id: "eu", label: "Europe", mult: 1.8 },
  { id: "us", label: "USA & Canada", mult: 2.1 },
  { id: "domestic", label: "Within Nepal", mult: 0.25 },
];

const rateCard = [
  { zone: "India & SAARC", express: 1850, economy: 1280, sea: 520 },
  { zone: "Gulf / Middle East", express: 2150, economy: 1480, sea: 640 },
  { zone: "Southeast Asia", express: 2380, economy: 1620, sea: 720 },
  { zone: "Europe", express: 3050, economy: 2080, sea: 880 },
  { zone: "USA & Canada", express: 3560, economy: 2420, sea: 980 },
];

export default function RatesPage() {
  const [provider, setProvider] = useState(providers[0].id);
  const [zone, setZone] = useState(zones[0].id);
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calc = (e: React.FormEvent) => {
    e.preventDefault();
    const p = providers.find((x) => x.id === provider)!;
    const z = zones.find((x) => x.id === zone)!;
    const kg = Math.max(parseFloat(weight) || 0, 0);
    if (kg <= 0) return setResult(null);
    setResult(Math.round((p.base + p.perKg * kg) * z.mult));
  };

  return (
    <>
      <PageHead
        title="Rate Calculator"
        description="Estimate shipping costs and view the current rate card."
        breadcrumb={[{ label: "Rate Calculator" }]}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Calculate a rate" />
          <form onSubmit={calc} className="space-y-4 p-5">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-muted">Service</span>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="w-full rounded-lg border border-line bg-ink-soft px-3 py-2.5 text-sm outline-none focus:border-brand"
              >
                {providers.map((p) => (
                  <option key={p.id} value={p.id} className="bg-ink-card">
                    {p.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-muted">Destination zone</span>
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full rounded-lg border border-line bg-ink-soft px-3 py-2.5 text-sm outline-none focus:border-brand"
              >
                {zones.map((z) => (
                  <option key={z.id} value={z.id} className="bg-ink-card">
                    {z.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-muted">Weight (kg)</span>
              <input
                type="number"
                min="0"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="2.5"
                className="w-full rounded-lg border border-line bg-ink-soft px-3 py-2.5 text-sm outline-none focus:border-brand placeholder:text-muted"
              />
            </label>
            <Button type="submit" className="w-full">
              Calculate <ArrowRight className="h-4 w-4" />
            </Button>

            <AnimatePresence>
              {result !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="rounded-xl border border-brand/30 bg-brand/10 p-5 text-center">
                    <p className="text-xs uppercase tracking-widest text-muted">Estimated rate</p>
                    <p className="mt-1 text-3xl font-extrabold text-gradient">{formatNPR(result)}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader title="Rate card" subtitle="Per kg, indicative (Rs.)" />
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-line">
                <tr>
                  <Th>Zone</Th>
                  <Th className="text-right">Express</Th>
                  <Th className="text-right">Economy</Th>
                  <Th className="text-right">Sea</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rateCard.map((r) => (
                  <tr key={r.zone} className="transition-colors hover:bg-white/[0.02]">
                    <Td className="font-medium">{r.zone}</Td>
                    <Td className="text-right text-muted">{r.express.toLocaleString()}</Td>
                    <Td className="text-right text-muted">{r.economy.toLocaleString()}</Td>
                    <Td className="text-right text-muted">{r.sea.toLocaleString()}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
