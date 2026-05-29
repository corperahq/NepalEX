"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calculator, ArrowRight } from "lucide-react";

const providers = [
  { id: "express", label: "NepalEX Express (Air)", perKg: 1450, base: 600 },
  { id: "economy", label: "NepalEX Economy (Air)", perKg: 980, base: 500 },
  { id: "sea", label: "Sea Cargo", perKg: 320, base: 1500 },
  { id: "domestic", label: "Domestic Courier", perKg: 140, base: 100 },
];

const zones = [
  { id: "saarc", label: "India & SAARC", mult: 1 },
  { id: "gulf", label: "Gulf / Middle East", mult: 1.25 },
  { id: "sea", label: "Southeast & East Asia", mult: 1.4 },
  { id: "eu", label: "Europe", mult: 1.8 },
  { id: "us", label: "USA & Canada", mult: 2.1 },
  { id: "domestic", label: "Within Nepal", mult: 0.25 },
];

export function RateCalculator() {
  const [provider, setProvider] = useState(providers[0].id);
  const [zone, setZone] = useState(zones[0].id);
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<number | null>(null);

  function calculate(e: React.FormEvent) {
    e.preventDefault();
    const p = providers.find((x) => x.id === provider)!;
    const z = zones.find((x) => x.id === zone)!;
    const kg = Math.max(parseFloat(weight) || 0, 0);
    if (kg <= 0) {
      setResult(null);
      return;
    }
    const est = Math.round((p.base + p.perKg * kg) * z.mult);
    setResult(est);
  }

  return (
    <div className="glass rounded-3xl border border-line p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="brand-gradient flex h-10 w-10 items-center justify-center rounded-xl text-ink">
          <Calculator className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-lg font-bold">Check Our Rates</h3>
          <p className="text-xs text-muted">Get an instant estimate</p>
        </div>
      </div>

      <form onSubmit={calculate} className="mt-6 space-y-4">
        <Field label="Service provider">
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="input"
          >
            {providers.map((p) => (
              <option key={p.id} value={p.id} className="bg-ink-card">
                {p.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Destination">
          <select
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="input"
          >
            {zones.map((z) => (
              <option key={z.id} value={z.id} className="bg-ink-card">
                {z.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Estimated weight (in Kg)">
          <input
            type="number"
            min="0"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 2.5"
            className="input"
          />
        </Field>

        <button
          type="submit"
          className="brand-gradient group flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-ink transition-transform hover:scale-[1.01]"
        >
          Check Rate
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>

      <AnimatePresence>
        {result !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-5 overflow-hidden"
          >
            <div className="rounded-2xl border border-brand/30 bg-brand/10 p-5 text-center">
              <p className="text-xs uppercase tracking-widest text-muted">
                Estimated rate
              </p>
              <p className="mt-1 text-4xl font-extrabold text-gradient">
                Rs. {result.toLocaleString()}
              </p>
              <p className="mt-2 text-xs text-muted">
                Indicative only. Final rate confirmed at booking.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--color-line);
          background: rgba(10,10,13,0.6);
          padding: 0.75rem 0.9rem;
          font-size: 0.95rem;
          color: var(--color-cream);
          outline: none;
          transition: border-color .2s;
        }
        .input:focus { border-color: var(--color-brand); }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}
