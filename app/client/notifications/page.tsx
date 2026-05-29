"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Package, Receipt, Settings2, Tag, CheckCheck, Bell } from "lucide-react";
import { PageHead } from "@/components/dashboard/page-head";
import { Card, Button } from "@/components/dashboard/primitives";
import { EmptyState } from "@/components/dashboard/controls";
import { CardSkeleton } from "@/components/dashboard/skeleton";
import { useLoading } from "@/components/dashboard/use-loading";
import { notifications as seed, relativeTime, type Notification } from "@/lib/dashboard-data";

const kindIcon = {
  shipment: Package,
  billing: Receipt,
  system: Settings2,
  promo: Tag,
} as const;

const tabs = ["All", "Unread", "Shipment", "Billing"] as const;

export default function NotificationsPage() {
  const loading = useLoading();
  const [items, setItems] = useState<Notification[]>(seed);
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");

  const filtered = useMemo(() => {
    if (tab === "All") return items;
    if (tab === "Unread") return items.filter((n) => !n.read);
    return items.filter((n) => n.kind === tab.toLowerCase());
  }, [items, tab]);

  const unread = items.filter((n) => !n.read).length;

  const markAll = () =>
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const toggle = (id: string) =>
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)),
    );

  return (
    <>
      <PageHead
        title="Notifications"
        description={unread ? `You have ${unread} unread notifications.` : "You're all caught up."}
        breadcrumb={[{ label: "Notifications" }]}
        actions={
          <Button variant="outline" onClick={markAll}>
            <CheckCheck className="h-4 w-4" /> Mark all read
          </Button>
        }
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              tab === t
                ? "border-brand/40 bg-brand/10 text-brand-2"
                : "border-line text-muted hover:text-cream"
            }`}
          >
            {t}
            {t === "Unread" && unread > 0 && (
              <span className="ml-1.5 rounded-full bg-brand/20 px-1.5 text-xs">{unread}</span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} lines={1} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card>
          <EmptyState title="No notifications" message="Nothing to show in this view." />
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((n, i) => {
            const Icon = kindIcon[n.kind];
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Card
                  className={`flex items-start gap-4 p-4 transition-colors hover:border-brand/40 ${
                    !n.read ? "border-brand/20 bg-brand/[0.04]" : ""
                  }`}
                >
                  <span className="brand-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-ink">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{n.title}</p>
                      {!n.read && <span className="h-2 w-2 rounded-full brand-gradient" />}
                    </div>
                    <p className="text-sm text-muted">{n.message}</p>
                    <p className="mt-1 text-xs text-muted/70">{relativeTime(n.time)}</p>
                  </div>
                  <button
                    onClick={() => toggle(n.id)}
                    className="shrink-0 text-xs text-muted hover:text-cream"
                  >
                    {n.read ? "Mark unread" : "Mark read"}
                  </button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </>
  );
}
