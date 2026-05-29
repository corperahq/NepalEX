"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Package,
  Truck,
  CheckCircle2,
  Wallet,
  ArrowRight,
  PlusCircle,
  Radar,
  Receipt,
  MapPin,
} from "lucide-react";
import { PageHead } from "@/components/dashboard/page-head";
import { StatCard, Card, CardHeader, StatusBadge } from "@/components/dashboard/primitives";
import { AreaChart, DonutChart } from "@/components/dashboard/charts";
import {
  StatCardSkeleton,
  TableSkeleton,
  ChartSkeleton,
} from "@/components/dashboard/skeleton";
import { Th, Td } from "@/components/dashboard/controls";
import { useLoading } from "@/components/dashboard/use-loading";
import {
  shipments,
  invoices,
  monthlyVolume,
  statusDistribution,
  formatNPR,
  formatDate,
  notifications,
  relativeTime,
} from "@/lib/dashboard-data";

export default function DashboardPage() {
  const loading = useLoading();

  const inTransit = shipments.filter((s) =>
    ["In Transit", "Out for Delivery", "Picked Up"].includes(s.status),
  ).length;
  const delivered = shipments.filter((s) => s.status === "Delivered").length;
  const outstanding = invoices
    .filter((i) => i.status !== "Paid")
    .reduce((a, b) => a + b.amount, 0);

  const recent = shipments.slice(0, 6);

  const stats = [
    { icon: Package, label: "Total shipments", value: String(shipments.length), delta: "+12%", positive: true },
    { icon: Truck, label: "In transit", value: String(inTransit), delta: "+4%", positive: true },
    { icon: CheckCircle2, label: "Delivered", value: String(delivered), delta: "+9%", positive: true },
    { icon: Wallet, label: "Outstanding", value: formatNPR(outstanding), delta: "-3%", positive: false },
  ];

  const quickActions = [
    { icon: PlusCircle, label: "New Shipment", href: "/client/create" },
    { icon: Radar, label: "Track", href: "/client/tracking" },
    { icon: Truck, label: "Book Pickup", href: "/client/pickups" },
    { icon: Receipt, label: "Pay Invoice", href: "/client/billing" },
  ];

  return (
    <>
      <PageHead
        title="Welcome back, Himalaya Crafts 👋"
        description="Here's what's happening with your shipments today."
      />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
          : stats.map((s, i) => <StatCard key={s.label} index={i} {...s} />)}
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {loading ? (
            <ChartSkeleton />
          ) : (
            <Card>
              <CardHeader
                title="Shipment volume"
                subtitle="Last 6 months"
                action={
                  <span className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand-2">
                    +18% YoY
                  </span>
                }
              />
              <div className="p-5">
                <AreaChart data={monthlyVolume.map((m) => ({ label: m.label, value: m.shipments }))} />
              </div>
            </Card>
          )}
        </div>
        <div>
          {loading ? (
            <ChartSkeleton />
          ) : (
            <Card>
              <CardHeader title="Status breakdown" subtitle="All shipments" />
              <div className="flex justify-center p-5">
                <DonutChart data={statusDistribution} />
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {quickActions.map((a, i) => (
          <motion.div
            key={a.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
          >
            <Link
              href={a.href}
              className="group flex items-center gap-3 rounded-2xl border border-line bg-ink-card p-4 transition-colors hover:border-brand/40"
            >
              <span className="brand-gradient flex h-10 w-10 items-center justify-center rounded-xl text-ink">
                <a.icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold">{a.label}</span>
              <ArrowRight className="ml-auto h-4 w-4 text-muted transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent shipments + activity */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {loading ? (
            <TableSkeleton />
          ) : (
            <Card>
              <CardHeader
                title="Recent shipments"
                action={
                  <Link
                    href="/client/shipments"
                    className="text-sm font-semibold text-brand-2 hover:underline"
                  >
                    View all
                  </Link>
                }
              />
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-line">
                    <tr>
                      <Th>AWB</Th>
                      <Th>Destination</Th>
                      <Th>Status</Th>
                      <Th className="text-right">Cost</Th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {recent.map((s) => (
                      <tr key={s.id} className="transition-colors hover:bg-white/[0.02]">
                        <Td>
                          <Link
                            href={`/client/shipments/${s.id}`}
                            className="font-semibold text-cream hover:text-brand-2"
                          >
                            {s.id}
                          </Link>
                        </Td>
                        <Td>
                          <span className="flex items-center gap-1.5 text-muted">
                            <MapPin className="h-3.5 w-3.5" />
                            {s.destination}, {s.country}
                          </span>
                        </Td>
                        <Td>
                          <StatusBadge status={s.status} />
                        </Td>
                        <Td className="text-right font-medium">{formatNPR(s.cost)}</Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>

        <div>
          {loading ? (
            <ChartSkeleton className="h-72" />
          ) : (
            <Card>
              <CardHeader title="Recent activity" />
              <ul className="divide-y divide-line">
                {notifications.slice(0, 5).map((n) => (
                  <li key={n.id} className="flex gap-3 p-4">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full brand-gradient" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="truncate text-xs text-muted">{n.message}</p>
                      <p className="mt-0.5 text-[11px] text-muted/70">
                        {relativeTime(n.time)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
