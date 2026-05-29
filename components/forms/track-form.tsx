"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, PackageCheck, Truck, Plane, MapPin, CheckCircle2 } from "lucide-react";

const timeline = [
  { icon: PackageCheck, title: "Picked up", place: "Kathmandu, NP", done: true },
  { icon: Truck, title: "Processed at hub", place: "TIA Cargo Complex", done: true },
  { icon: Plane, title: "In transit", place: "Departed origin", done: true },
  { icon: MapPin, title: "Out for delivery", place: "Destination city", done: false },
  { icon: CheckCircle2, title: "Delivered", place: "Awaiting confirmation", done: false },
];

export function TrackForm() {
  const [code, setCode] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim()) setSubmitted(code.trim());
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <form
        onSubmit={onSubmit}
        className="glass flex flex-col gap-3 rounded-2xl border border-line p-3 sm:flex-row"
      >
        <div className="flex flex-1 items-center gap-3 px-3">
          <Search className="h-5 w-5 shrink-0 text-muted" />
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your tracking / AWB number"
            className="w-full bg-transparent py-3 text-base outline-none placeholder:text-muted"
          />
        </div>
        <button
          type="submit"
          className="brand-gradient rounded-xl px-7 py-3 font-semibold text-ink transition-transform hover:scale-[1.02]"
        >
          Track
        </button>
      </form>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-2xl border border-line bg-ink-card p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted">
                  Tracking number
                </p>
                <p className="text-lg font-bold">{submitted}</p>
              </div>
              <span className="rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand-2">
                In transit
              </span>
            </div>

            <ol className="mt-6 space-y-1">
              {timeline.map((t, i) => (
                <motion.li
                  key={t.title}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                        t.done
                          ? "border-brand/40 bg-brand/15 text-brand-2"
                          : "border-line bg-ink text-muted"
                      }`}
                    >
                      <t.icon className="h-5 w-5" />
                    </span>
                    {i < timeline.length - 1 && (
                      <span
                        className={`my-1 w-px flex-1 ${
                          t.done ? "bg-brand/40" : "bg-line"
                        }`}
                      />
                    )}
                  </div>
                  <div className="pb-6">
                    <p
                      className={`font-semibold ${
                        t.done ? "text-cream" : "text-muted"
                      }`}
                    >
                      {t.title}
                    </p>
                    <p className="text-sm text-muted">{t.place}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
            <p className="text-center text-xs text-muted">
              Demo tracking view. Live status connects to the NepalEX backend.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
