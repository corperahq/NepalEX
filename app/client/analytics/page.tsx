"use client";

import { Package, Wallet, Timer, Globe2 } from "lucide-react";
import { PageHead } from "@/components/dashboard/page-head";
import { Card, CardHeader, StatCard } from "@/components/dashboard/primitives";
import { AreaChart, BarChart, DonutChart, HBars } from "@/components/dashboard/charts";
import { StatCardSkeleton, ChartSkeleton } from "@/components/dashboard/skeleton";
import { useLoading } from "@/components/dashboard/use-loading";
import { Select } from "@/components/dashboard/controls";
import { useState } from "react";
import {
  monthlyVolume,
  weeklyActivity,
  statusDistribution,
  topDestinations,
  formatNPR,
} from "@/lib/dashboard-data";

export default function AnalyticsPage() {
  const loading = useLoading();
  const [range, setRange] = useState("Last 6 months");

  const totalShipments = monthlyVolume.reduce((a, b) => a + b.shipments, 0);
  const totalSpend = monthlyVolume.reduce((a, b) => a + b.spend, 0);

  return (
    <>
      <PageHead
        title="Analytics"
        description="Insights into your shipping volume, spend and performance."
        breadcrumb={[{ label: "Analytics" }]}
        actions={
          <Select
            value={range}
            onChange={setRange}
            options={["Last 30 days", "Last 3 months", "Last 6 months", "This year"]}
            allLabel="Last 6 months"
          />
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          <>
            <StatCard icon={Package} label="Total shipments" value={totalShipments.toLocaleString()} delta="+18%" index={0} />
            <StatCard icon={Wallet} label="Total spend" value={formatNPR(totalSpend)} delta="+22%" index={1} />
            <StatCard icon={Timer} label="Avg. transit" value="4.2 days" delta="-6%" positive index={2} />
            <StatCard icon={Globe2} label="Countries" value="24" delta="+3" index={3} />
          </>
        )}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {loading ? (
            <ChartSkeleton className="h-56" />
          ) : (
            <Card>
              <CardHeader title="Shipment volume" subtitle={range} />
              <div className="p-5">
                <AreaChart data={monthlyVolume.map((m) => ({ label: m.label, value: m.shipments }))} />
              </div>
            </Card>
          )}
        </div>
        <div>
          {loading ? (
            <ChartSkeleton className="h-56" />
          ) : (
            <Card>
              <CardHeader title="Status mix" />
              <div className="flex justify-center p-5">
                <DonutChart data={statusDistribution} />
              </div>
            </Card>
          )}
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {loading ? (
          <>
            <ChartSkeleton className="h-52" />
            <ChartSkeleton className="h-52" />
          </>
        ) : (
          <>
            <Card>
              <CardHeader title="Weekly activity" subtitle="Shipments per day" />
              <div className="p-5">
                <BarChart data={weeklyActivity} />
              </div>
            </Card>
            <Card>
              <CardHeader title="Top destinations" subtitle="By volume" />
              <div className="p-5">
                <HBars data={topDestinations} />
              </div>
            </Card>
          </>
        )}
      </div>

      <div className="mt-4">
        {loading ? (
          <ChartSkeleton className="h-40" />
        ) : (
          <Card>
            <CardHeader title="Monthly spend" subtitle="NPR" />
            <div className="p-5">
              <AreaChart data={monthlyVolume.map((m) => ({ label: m.label, value: Math.round(m.spend / 1000) }))} height={180} />
            </div>
          </Card>
        )}
      </div>
    </>
  );
}
