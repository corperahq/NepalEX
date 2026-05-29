"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Download, PlusCircle, MapPin, Filter } from "lucide-react";
import { PageHead } from "@/components/dashboard/page-head";
import { Card, StatusBadge, Button } from "@/components/dashboard/primitives";
import {
  SearchInput,
  Select,
  Pagination,
  EmptyState,
  Th,
  Td,
} from "@/components/dashboard/controls";
import { TableSkeleton } from "@/components/dashboard/skeleton";
import { useLoading } from "@/components/dashboard/use-loading";
import {
  shipments,
  formatNPR,
  formatDate,
  STATUS_OPTIONS,
  SERVICE_OPTIONS,
} from "@/lib/dashboard-data";

const PER_PAGE = 8;

export default function ShipmentsPage() {
  const loading = useLoading();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [service, setService] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return shipments.filter((s) => {
      const matchQ =
        !q ||
        s.id.toLowerCase().includes(q.toLowerCase()) ||
        s.recipient.toLowerCase().includes(q.toLowerCase()) ||
        s.destination.toLowerCase().includes(q.toLowerCase());
      const matchStatus = !status || s.status === status;
      const matchService = !service || s.service === service;
      return matchQ && matchStatus && matchService;
    });
  }, [q, status, service]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages);
  const rows = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const reset = () => {
    setQ("");
    setStatus("");
    setService("");
    setPage(1);
  };

  return (
    <>
      <PageHead
        title="Shipments"
        description={`${shipments.length} total shipments across all services.`}
        breadcrumb={[{ label: "Shipments" }]}
        actions={
          <>
            <Button variant="outline">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Link href="/client/create">
              <Button>
                <PlusCircle className="h-4 w-4" /> New Shipment
              </Button>
            </Link>
          </>
        }
      />

      {/* Filters */}
      <Card className="mb-4 p-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex-1">
            <SearchInput
              value={q}
              onChange={(v) => {
                setQ(v);
                setPage(1);
              }}
              placeholder="Search by AWB, recipient or destination…"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select
              value={status}
              onChange={(v) => {
                setStatus(v);
                setPage(1);
              }}
              options={STATUS_OPTIONS}
              allLabel="All statuses"
            />
            <Select
              value={service}
              onChange={(v) => {
                setService(v);
                setPage(1);
              }}
              options={SERVICE_OPTIONS}
              allLabel="All services"
            />
            {(q || status || service) && (
              <Button variant="ghost" onClick={reset}>
                <Filter className="h-4 w-4" /> Clear
              </Button>
            )}
          </div>
        </div>
      </Card>

      {loading ? (
        <TableSkeleton rows={8} cols={6} />
      ) : (
        <Card className="overflow-hidden">
          {rows.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-line">
                  <tr>
                    <Th>AWB / Recipient</Th>
                    <Th>Destination</Th>
                    <Th>Service</Th>
                    <Th>Date</Th>
                    <Th>Status</Th>
                    <Th>Payment</Th>
                    <Th className="text-right">Cost</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {rows.map((s) => (
                    <tr key={s.id} className="transition-colors hover:bg-white/[0.02]">
                      <Td>
                        <Link
                          href={`/client/shipments/${s.id}`}
                          className="font-semibold text-cream hover:text-brand-2"
                        >
                          {s.id}
                        </Link>
                        <p className="text-xs text-muted">{s.recipient}</p>
                      </Td>
                      <Td>
                        <span className="flex items-center gap-1.5 text-muted">
                          <MapPin className="h-3.5 w-3.5" />
                          {s.destination}, {s.country}
                        </span>
                      </Td>
                      <Td className="text-muted">{s.service}</Td>
                      <Td className="text-muted">{formatDate(s.date)}</Td>
                      <Td>
                        <StatusBadge status={s.status} />
                      </Td>
                      <Td>
                        <StatusBadge status={s.payment} />
                      </Td>
                      <Td className="text-right font-medium">{formatNPR(s.cost)}</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {rows.length > 0 && (
            <Pagination
              page={current}
              pages={pages}
              onPage={setPage}
              total={filtered.length}
            />
          )}
        </Card>
      )}
    </>
  );
}
