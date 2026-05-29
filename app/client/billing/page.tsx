"use client";

import { useMemo, useState } from "react";
import { Receipt, Wallet, CheckCircle2, AlertTriangle, Download } from "lucide-react";
import { PageHead } from "@/components/dashboard/page-head";
import { Card, StatCard, StatusBadge, Button } from "@/components/dashboard/primitives";
import { SearchInput, Select, EmptyState, Th, Td } from "@/components/dashboard/controls";
import { StatCardSkeleton, TableSkeleton } from "@/components/dashboard/skeleton";
import { useLoading } from "@/components/dashboard/use-loading";
import { invoices, formatNPR, formatDate } from "@/lib/dashboard-data";

export default function BillingPage() {
  const loading = useLoading();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");

  const filtered = useMemo(
    () =>
      invoices.filter((inv) => {
        const mq =
          !q ||
          inv.id.toLowerCase().includes(q.toLowerCase()) ||
          inv.shipmentId.toLowerCase().includes(q.toLowerCase());
        const ms = !status || inv.status === status;
        return mq && ms;
      }),
    [q, status],
  );

  const totalBilled = invoices.reduce((a, b) => a + b.amount, 0);
  const paid = invoices.filter((i) => i.status === "Paid").reduce((a, b) => a + b.amount, 0);
  const outstanding = invoices.filter((i) => i.status !== "Paid").reduce((a, b) => a + b.amount, 0);
  const overdue = invoices.filter((i) => i.status === "Overdue").length;

  return (
    <>
      <PageHead
        title="Invoices"
        description="Your billing history and outstanding balances."
        breadcrumb={[{ label: "Invoices" }]}
        actions={
          <Button variant="outline">
            <Download className="h-4 w-4" /> Statement
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          <>
            <StatCard icon={Receipt} label="Total billed" value={formatNPR(totalBilled)} index={0} />
            <StatCard icon={CheckCircle2} label="Paid" value={formatNPR(paid)} index={1} />
            <StatCard icon={Wallet} label="Outstanding" value={formatNPR(outstanding)} positive={false} delta={`${overdue} overdue`} index={2} />
            <StatCard icon={AlertTriangle} label="Overdue invoices" value={String(overdue)} positive={false} index={3} />
          </>
        )}
      </div>

      <Card className="my-4 p-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex-1">
            <SearchInput value={q} onChange={setQ} placeholder="Search invoice or AWB…" />
          </div>
          <Select value={status} onChange={setStatus} options={["Paid", "Unpaid", "Overdue"]} allLabel="All statuses" />
        </div>
      </Card>

      {loading ? (
        <TableSkeleton rows={7} cols={6} />
      ) : (
        <Card className="overflow-hidden">
          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-line">
                  <tr>
                    <Th>Invoice</Th>
                    <Th>Shipment</Th>
                    <Th>Issued</Th>
                    <Th>Due</Th>
                    <Th>Status</Th>
                    <Th className="text-right">Amount</Th>
                    <Th></Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {filtered.map((inv) => (
                    <tr key={inv.id} className="transition-colors hover:bg-white/[0.02]">
                      <Td className="font-semibold">{inv.id}</Td>
                      <Td className="text-muted">{inv.shipmentId}</Td>
                      <Td className="text-muted">{formatDate(inv.date)}</Td>
                      <Td className="text-muted">{formatDate(inv.dueDate)}</Td>
                      <Td>
                        <StatusBadge status={inv.status} />
                      </Td>
                      <Td className="text-right font-medium">{formatNPR(inv.amount)}</Td>
                      <Td className="text-right">
                        {inv.status === "Paid" ? (
                          <Button variant="ghost" className="text-xs">
                            <Download className="h-3.5 w-3.5" /> PDF
                          </Button>
                        ) : (
                          <Button className="text-xs">Pay now</Button>
                        )}
                      </Td>
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
