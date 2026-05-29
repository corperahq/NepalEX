"use client";

import { useMemo, useState } from "react";
import { CreditCard, Banknote, Wallet, Plus } from "lucide-react";
import { PageHead } from "@/components/dashboard/page-head";
import { Card, CardHeader, StatCard, StatusBadge, Button } from "@/components/dashboard/primitives";
import { SearchInput, Select, EmptyState, Th, Td } from "@/components/dashboard/controls";
import { StatCardSkeleton, TableSkeleton } from "@/components/dashboard/skeleton";
import { useLoading } from "@/components/dashboard/use-loading";
import { payments, formatNPR, formatDate } from "@/lib/dashboard-data";

const methods = [
  { name: "Bank Transfer", detail: "NIC Asia ••• 4821", icon: Banknote },
  { name: "eSewa", detail: "98XXXXXX10", icon: Wallet },
  { name: "Visa Card", detail: "•••• 7723", icon: CreditCard },
];

export default function PaymentsPage() {
  const loading = useLoading();
  const [q, setQ] = useState("");
  const [method, setMethod] = useState("");

  const filtered = useMemo(
    () =>
      payments.filter((p) => {
        const mq =
          !q ||
          p.id.toLowerCase().includes(q.toLowerCase()) ||
          p.invoiceId.toLowerCase().includes(q.toLowerCase());
        const mm = !method || p.method === method;
        return mq && mm;
      }),
    [q, method],
  );

  const totalPaid = payments
    .filter((p) => p.status === "Success")
    .reduce((a, b) => a + b.amount, 0);

  return (
    <>
      <PageHead
        title="Payments"
        description="Your payment history and saved payment methods."
        breadcrumb={[{ label: "Payments" }]}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          <>
            <StatCard icon={CreditCard} label="Total paid" value={formatNPR(totalPaid)} index={0} />
            <StatCard icon={Wallet} label="Transactions" value={String(payments.length)} index={1} />
            <StatCard icon={Banknote} label="Avg. payment" value={formatNPR(Math.round(totalPaid / Math.max(payments.length, 1)))} index={2} />
            <StatCard icon={CreditCard} label="Methods saved" value={String(methods.length)} index={3} />
          </>
        )}
      </div>

      {/* Payment methods */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {methods.map((m, i) => (
          <Card key={m.name} className="flex items-center gap-3 p-4">
            <span className="brand-gradient flex h-10 w-10 items-center justify-center rounded-xl text-ink">
              <m.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">{m.name}</p>
              <p className="text-xs text-muted">{m.detail}</p>
            </div>
          </Card>
        ))}
        <button className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-line p-4 text-sm font-semibold text-muted transition-colors hover:border-brand/40 hover:text-cream">
          <Plus className="h-4 w-4" /> Add method
        </button>
      </div>

      <Card className="my-4 p-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex-1">
            <SearchInput value={q} onChange={setQ} placeholder="Search payment or invoice…" />
          </div>
          <Select
            value={method}
            onChange={setMethod}
            options={["Bank Transfer", "eSewa", "Khalti", "Card", "Cash"]}
            allLabel="All methods"
          />
        </div>
      </Card>

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
                    <Th>Payment ID</Th>
                    <Th>Invoice</Th>
                    <Th>Method</Th>
                    <Th>Date</Th>
                    <Th>Status</Th>
                    <Th className="text-right">Amount</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {filtered.map((p) => (
                    <tr key={p.id} className="transition-colors hover:bg-white/[0.02]">
                      <Td className="font-semibold">{p.id}</Td>
                      <Td className="text-muted">{p.invoiceId}</Td>
                      <Td className="text-muted">{p.method}</Td>
                      <Td className="text-muted">{formatDate(p.date)}</Td>
                      <Td>
                        <StatusBadge status={p.status} />
                      </Td>
                      <Td className="text-right font-medium">{formatNPR(p.amount)}</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}
    </>
  );
}
