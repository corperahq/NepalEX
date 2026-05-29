"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LifeBuoy, MessageSquarePlus, Phone, Mail, BookOpen, CheckCircle2, MessageSquare } from "lucide-react";
import { PageHead } from "@/components/dashboard/page-head";
import { Card, CardHeader, StatusBadge, Button } from "@/components/dashboard/primitives";
import { Th, Td } from "@/components/dashboard/controls";
import { TableSkeleton } from "@/components/dashboard/skeleton";
import { useLoading } from "@/components/dashboard/use-loading";
import { tickets, relativeTime } from "@/lib/dashboard-data";
import { site as siteInfo } from "@/lib/site";

export default function SupportPage() {
  const loading = useLoading();
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHead
        title="Support"
        description="Get help, raise a ticket, or browse the help center."
        breadcrumb={[{ label: "Support" }]}
      />

      {/* Contact cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Phone, label: "Call us", value: siteInfo.phone },
          { icon: Mail, label: "Email", value: siteInfo.emails[0] },
          { icon: BookOpen, label: "Help center", value: "Browse guides →" },
        ].map((c) => (
          <Card key={c.label} className="flex items-center gap-3 p-4">
            <span className="brand-gradient flex h-10 w-10 items-center justify-center rounded-xl text-ink">
              <c.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted">{c.label}</p>
              <p className="text-sm font-semibold">{c.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {/* New ticket */}
        <Card className="h-fit">
          <CardHeader title="Raise a ticket" />
          <div className="p-5">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center text-sm text-emerald-300"
                >
                  <CheckCircle2 className="mx-auto mb-2 h-7 w-7" />
                  Ticket submitted! Our team will reply within 24 hours.
                  <button onClick={() => setSent(false)} className="mt-3 block w-full text-xs text-muted underline">
                    Raise another
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <Field label="Subject" placeholder="Brief summary" />
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-muted">Category</span>
                    <select className="w-full rounded-lg border border-line bg-ink-soft px-3 py-2.5 text-sm outline-none focus:border-brand">
                      {["Shipment", "Billing", "Pickup", "Customs", "Other"].map((o) => (
                        <option key={o} className="bg-ink-card">{o}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-muted">Message</span>
                    <textarea
                      rows={4}
                      placeholder="Describe your issue…"
                      className="w-full resize-none rounded-lg border border-line bg-ink-soft px-3 py-2.5 text-sm outline-none focus:border-brand placeholder:text-muted"
                    />
                  </label>
                  <Button className="w-full" onClick={() => setSent(true)}>
                    <MessageSquarePlus className="h-4 w-4" /> Submit ticket
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>

        {/* Tickets list */}
        <div className="lg:col-span-2">
          {loading ? (
            <TableSkeleton rows={4} cols={5} />
          ) : (
            <Card className="overflow-hidden">
              <CardHeader title="Your tickets" subtitle={`${tickets.length} total`} />
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-line">
                    <tr>
                      <Th>Ticket</Th>
                      <Th>Category</Th>
                      <Th>Priority</Th>
                      <Th>Status</Th>
                      <Th>Updated</Th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {tickets.map((t) => (
                      <tr key={t.id} className="transition-colors hover:bg-white/[0.02]">
                        <Td>
                          <p className="font-semibold">{t.id}</p>
                          <p className="flex items-center gap-1 text-xs text-muted">
                            <MessageSquare className="h-3 w-3" /> {t.subject}
                          </p>
                        </Td>
                        <Td className="text-muted">{t.category}</Td>
                        <Td>
                          <StatusBadge status={t.priority} />
                        </Td>
                        <Td>
                          <StatusBadge status={t.status} />
                        </Td>
                        <Td className="text-muted">{relativeTime(t.updated)}</Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
        className="w-full rounded-lg border border-line bg-ink-soft px-3 py-2.5 text-sm outline-none focus:border-brand placeholder:text-muted"
      />
    </label>
  );
}
