"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Truck, CalendarPlus, CheckCircle2, MapPin, Clock } from "lucide-react";
import { PageHead } from "@/components/dashboard/page-head";
import { Card, CardHeader, StatCard, StatusBadge, Button } from "@/components/dashboard/primitives";
import { Select, EmptyState, Th, Td } from "@/components/dashboard/controls";
import { StatCardSkeleton, TableSkeleton } from "@/components/dashboard/skeleton";
import { useLoading } from "@/components/dashboard/use-loading";
import { pickups, formatDate } from "@/lib/dashboard-data";

export default function PickupsPage() {
  const loading = useLoading();
  const [status, setStatus] = useState("");
  const [scheduled, setScheduled] = useState(false);

  const filtered = useMemo(
    () => pickups.filter((p) => !status || p.status === status),
    [status],
  );

  const scheduledCount = pickups.filter((p) => p.status === "Scheduled").length;
  const completedCount = pickups.filter((p) => p.status === "Completed").length;

  return (
    <>
      <PageHead
        title="Pickups"
        description="Schedule and manage parcel pickups from your locations."
        breadcrumb={[{ label: "Pickups" }]}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          <>
            <StatCard icon={Truck} label="Total pickups" value={String(pickups.length)} index={0} />
            <StatCard icon={Clock} label="Scheduled" value={String(scheduledCount)} index={1} />
            <StatCard icon={CheckCircle2} label="Completed" value={String(completedCount)} index={2} />
            <StatCard icon={CalendarPlus} label="This week" value="4" index={3} />
          </>
        )}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {/* Schedule form */}
        <Card className="h-fit">
          <CardHeader title="Schedule a pickup" />
          <div className="space-y-4 p-5">
            <AnimatePresence mode="wait">
              {scheduled ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center text-sm text-emerald-300"
                >
                  <CheckCircle2 className="mx-auto mb-2 h-6 w-6" />
                  Pickup scheduled! We&apos;ll confirm shortly.
                  <button
                    onClick={() => setScheduled(false)}
                    className="mt-3 block w-full text-xs text-muted underline"
                  >
                    Schedule another
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <Field label="Pickup address" placeholder="Thamel, Kathmandu" />
                  <Field label="Date" type="date" />
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-muted">Time window</span>
                    <select className="w-full rounded-lg border border-line bg-ink-soft px-3 py-2.5 text-sm outline-none focus:border-brand">
                      <option className="bg-ink-card">09:00 – 12:00</option>
                      <option className="bg-ink-card">12:00 – 15:00</option>
                      <option className="bg-ink-card">15:00 – 18:00</option>
                    </select>
                  </label>
                  <Field label="No. of items" type="number" placeholder="1" />
                  <Button className="w-full" onClick={() => setScheduled(true)}>
                    <CalendarPlus className="h-4 w-4" /> Schedule pickup
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>

        {/* Pickups table */}
        <div className="lg:col-span-2">
          <div className="mb-3 flex justify-end">
            <Select
              value={status}
              onChange={setStatus}
              options={["Scheduled", "Completed", "Cancelled"]}
              allLabel="All statuses"
            />
          </div>
          {loading ? (
            <TableSkeleton rows={6} cols={5} />
          ) : (
            <Card className="overflow-hidden">
              {filtered.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-line">
                      <tr>
                        <Th>Pickup ID</Th>
                        <Th>Address</Th>
                        <Th>Date / Window</Th>
                        <Th>Items</Th>
                        <Th>Status</Th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {filtered.map((p) => (
                        <tr key={p.id} className="transition-colors hover:bg-white/[0.02]">
                          <Td className="font-semibold">{p.id}</Td>
                          <Td>
                            <span className="flex items-center gap-1.5 text-muted">
                              <MapPin className="h-3.5 w-3.5" />
                              {p.address}
                            </span>
                          </Td>
                          <Td className="text-muted">
                            {formatDate(p.date)}
                            <span className="block text-xs">{p.window}</span>
                          </Td>
                          <Td>{p.items}</Td>
                          <Td>
                            <StatusBadge status={p.status} />
                          </Td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-muted">{label}</span>
      <input
        {...props}
        className="w-full rounded-lg border border-line bg-ink-soft px-3 py-2.5 text-sm outline-none transition-colors focus:border-brand placeholder:text-muted"
      />
    </label>
  );
}
