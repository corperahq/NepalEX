"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Phone, MapPin, Star, Pencil, Trash2, BookUser } from "lucide-react";
import { PageHead } from "@/components/dashboard/page-head";
import { Card, Button } from "@/components/dashboard/primitives";
import { SearchInput, Select, EmptyState } from "@/components/dashboard/controls";
import { Skeleton } from "@/components/dashboard/skeleton";
import { useLoading } from "@/components/dashboard/use-loading";
import { addressBook } from "@/lib/dashboard-data";

export default function AddressesPage() {
  const loading = useLoading();
  const [q, setQ] = useState("");
  const [type, setType] = useState("");

  const filtered = useMemo(
    () =>
      addressBook.filter((a) => {
        const mq =
          !q ||
          a.name.toLowerCase().includes(q.toLowerCase()) ||
          a.city.toLowerCase().includes(q.toLowerCase()) ||
          a.country.toLowerCase().includes(q.toLowerCase());
        const mt = !type || a.type === type;
        return mq && mt;
      }),
    [q, type],
  );

  return (
    <>
      <PageHead
        title="Address Book"
        description="Saved sender and receiver addresses for faster booking."
        breadcrumb={[{ label: "Address Book" }]}
        actions={
          <Button>
            <Plus className="h-4 w-4" /> Add address
          </Button>
        }
      />

      <Card className="mb-4 p-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex-1">
            <SearchInput value={q} onChange={setQ} placeholder="Search by name, city or country…" />
          </div>
          <Select value={type} onChange={setType} options={["Sender", "Receiver"]} allLabel="All types" />
        </div>
      </Card>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-44 rounded-2xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card>
          <EmptyState
            title="No addresses"
            message="Try a different search or add a new address."
          />
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="group h-full p-5 transition-colors hover:border-brand/40">
                <div className="flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-ink-soft text-brand-2">
                    <BookUser className="h-5 w-5" />
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                        a.type === "Sender"
                          ? "border-violet-500/30 bg-violet-500/10 text-violet-300"
                          : "border-sky-500/30 bg-sky-500/10 text-sky-300"
                      }`}
                    >
                      {a.type}
                    </span>
                    {a.isDefault && (
                      <span className="flex items-center gap-1 rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 text-[10px] font-semibold text-brand-2">
                        <Star className="h-3 w-3" /> Default
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="mt-4 font-bold">{a.label}</h3>
                <p className="text-sm text-muted">{a.name}</p>
                <div className="mt-3 space-y-1.5 text-sm text-muted">
                  <p className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5" /> {a.line}, {a.city}, {a.country}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5" /> {a.phone}
                  </p>
                </div>
                <div className="mt-4 flex gap-2 border-t border-line pt-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button variant="ghost" className="text-xs">
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </Button>
                  <Button variant="ghost" className="text-xs text-rose-400 hover:text-rose-300">
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}
