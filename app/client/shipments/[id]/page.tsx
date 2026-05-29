"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Package,
  MapPin,
  Plane,
  Truck,
  CheckCircle2,
  Clock,
  Printer,
  Download,
  User,
  Weight,
  Boxes,
} from "lucide-react";
import { PageHead } from "@/components/dashboard/page-head";
import { Card, CardHeader, StatusBadge, Button } from "@/components/dashboard/primitives";
import { Skeleton } from "@/components/dashboard/skeleton";
import { useLoading } from "@/components/dashboard/use-loading";
import {
  getShipment,
  trackingStages,
  formatNPR,
  formatDate,
  formatDateTime,
} from "@/lib/dashboard-data";

const stageIcons = [Clock, Package, Plane, Truck, CheckCircle2];

export default function ShipmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const loading = useLoading();
  const shipment = getShipment(id);

  if (loading) {
    return (
      <>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-6 h-40 w-full rounded-2xl" />
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <Skeleton className="h-64 rounded-2xl lg:col-span-2" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </>
    );
  }

  if (!shipment) {
    return (
      <Card className="p-12 text-center">
        <h2 className="text-xl font-bold">Shipment not found</h2>
        <p className="mt-2 text-sm text-muted">
          We couldn&apos;t find a shipment with AWB “{id}”.
        </p>
        <Link href="/client/shipments" className="mt-6 inline-block">
          <Button>
            <ArrowLeft className="h-4 w-4" /> Back to shipments
          </Button>
        </Link>
      </Card>
    );
  }

  const currentStage =
    shipment.status === "Cancelled"
      ? -1
      : trackingStages.findIndex((s) => s.status === shipment.status);
  const activeIndex =
    currentStage === -1 && shipment.status !== "Cancelled"
      ? trackingStages.length - 1
      : currentStage;

  return (
    <>
      <PageHead
        title={shipment.id}
        breadcrumb={[
          { label: "Shipments", href: "/client/shipments" },
          { label: shipment.id },
        ]}
        actions={
          <>
            <Button variant="outline">
              <Printer className="h-4 w-4" /> Label
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4" /> Invoice
            </Button>
          </>
        }
      />

      {/* Status banner */}
      <Card className="mb-4 flex flex-wrap items-center justify-between gap-4 p-5">
        <div className="flex items-center gap-4">
          <span className="brand-gradient flex h-12 w-12 items-center justify-center rounded-2xl text-ink">
            <Package className="h-6 w-6" />
          </span>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold">{shipment.destination}, {shipment.country}</h2>
              <StatusBadge status={shipment.status} />
            </div>
            <p className="text-sm text-muted">
              {shipment.service} · {shipment.pieces} pcs · {shipment.weight} kg
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-muted">Estimated delivery</p>
          <p className="text-lg font-bold">{formatDate(shipment.eta)}</p>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Tracking timeline */}
        <Card className="lg:col-span-2">
          <CardHeader title="Tracking" subtitle={`Live status for ${shipment.id}`} />
          <div className="p-6">
            {shipment.status === "Cancelled" ? (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-5 text-sm text-rose-300">
                This shipment was cancelled. Contact support if this is unexpected.
              </div>
            ) : (
              <ol className="relative">
                {trackingStages.map((stage, i) => {
                  const Icon = stageIcons[i];
                  const done = i <= activeIndex;
                  const isCurrent = i === activeIndex;
                  return (
                    <motion.li
                      key={stage.status}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <span
                          className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                            done
                              ? "border-brand/40 bg-brand/15 text-brand-2"
                              : "border-line bg-ink text-muted"
                          } ${isCurrent ? "ring-4 ring-brand/20" : ""}`}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        {i < trackingStages.length - 1 && (
                          <span
                            className={`my-1 w-px flex-1 ${
                              i < activeIndex ? "bg-brand/40" : "bg-line"
                            }`}
                          />
                        )}
                      </div>
                      <div className="pb-7">
                        <p className={`font-semibold ${done ? "text-cream" : "text-muted"}`}>
                          {stage.label}
                        </p>
                        <p className="text-sm text-muted">
                          {done
                            ? formatDateTime(shipment.date)
                            : "Pending"}
                        </p>
                        {isCurrent && (
                          <p className="mt-1 text-xs text-brand-2">Current status</p>
                        )}
                      </div>
                    </motion.li>
                  );
                })}
              </ol>
            )}
          </div>
        </Card>

        {/* Details */}
        <div className="space-y-4">
          <Card>
            <CardHeader title="Parties" />
            <div className="space-y-4 p-5">
              <Detail icon={MapPin} label="Origin" value={shipment.origin} />
              <Detail icon={MapPin} label="Destination" value={`${shipment.destination}, ${shipment.country}`} />
              <Detail icon={User} label="Recipient" value={shipment.recipient} />
            </div>
          </Card>

          <Card>
            <CardHeader title="Package & charges" />
            <div className="space-y-4 p-5">
              <Detail icon={Boxes} label="Pieces" value={`${shipment.pieces}`} />
              <Detail icon={Weight} label="Weight" value={`${shipment.weight} kg`} />
              <Detail icon={Package} label="Service" value={shipment.service} />
              <div className="flex items-center justify-between border-t border-line pt-4">
                <span className="text-sm text-muted">Total charge</span>
                <span className="text-lg font-bold text-gradient">
                  {formatNPR(shipment.cost)}
                </span>
              </div>
              <StatusBadge status={shipment.payment} />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-ink-soft text-brand-2">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
