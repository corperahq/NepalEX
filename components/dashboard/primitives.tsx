"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";
import { statusClass } from "@/lib/dashboard-data";

export function Card({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-2xl border border-line bg-ink-card ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  action,
  subtitle,
}: {
  title: React.ReactNode;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line p-5">
      <div>
        <h3 className="font-semibold">{title}</h3>
        {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusClass(
        status,
      )}`}
    >
      {status}
    </span>
  );
}

export function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  positive = true,
  index = 0,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  delta?: string;
  positive?: boolean;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group relative overflow-hidden rounded-2xl border border-line bg-ink-card p-5 transition-colors hover:border-brand/40"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
      <div className="flex items-center justify-between">
        <span className="brand-gradient flex h-10 w-10 items-center justify-center rounded-xl text-ink">
          <Icon className="h-5 w-5" />
        </span>
        {delta && (
          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold ${
              positive ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {positive ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            {delta}
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-extrabold">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </motion.div>
  );
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: {
  variant?: "primary" | "ghost" | "outline";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const styles =
    variant === "primary"
      ? "brand-gradient text-ink hover:scale-[1.02]"
      : variant === "outline"
        ? "border border-line text-cream hover:border-brand/40"
        : "text-muted hover:text-cream hover:bg-white/5";
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${styles} ${className}`}
    >
      {children}
    </button>
  );
}
