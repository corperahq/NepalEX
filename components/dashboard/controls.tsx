"use client";

import { Search, ChevronLeft, ChevronRight, Inbox } from "lucide-react";

export function SearchInput({
  value,
  onChange,
  placeholder = "Search…",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-line bg-ink-soft px-3">
      <Search className="h-4 w-4 text-muted" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-muted"
      />
    </div>
  );
}

export function Select({
  value,
  onChange,
  options,
  allLabel = "All",
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  allLabel?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-line bg-ink-soft px-3 py-2.5 text-sm outline-none focus:border-brand"
    >
      <option value="" className="bg-ink-card">
        {allLabel}
      </option>
      {options.map((o) => (
        <option key={o} value={o} className="bg-ink-card">
          {o}
        </option>
      ))}
    </select>
  );
}

export function Pagination({
  page,
  pages,
  onPage,
  total,
}: {
  page: number;
  pages: number;
  onPage: (p: number) => void;
  total: number;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line p-4 text-sm">
      <span className="text-muted">
        Page {page} of {pages} · {total} records
      </span>
      <div className="flex items-center gap-1">
        <button
          disabled={page <= 1}
          onClick={() => onPage(page - 1)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-line disabled:opacity-40 hover:border-brand/40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {Array.from({ length: pages }).map((_, i) => (
          <button
            key={i}
            onClick={() => onPage(i + 1)}
            className={`h-8 min-w-8 rounded-lg px-2 text-sm font-medium ${
              page === i + 1
                ? "brand-gradient text-ink"
                : "border border-line text-muted hover:text-cream"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={page >= pages}
          onClick={() => onPage(page + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-line disabled:opacity-40 hover:border-brand/40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function EmptyState({
  title = "Nothing here yet",
  message = "No records match your filters.",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-ink-soft text-muted">
        <Inbox className="h-7 w-7" />
      </span>
      <h4 className="mt-4 font-semibold">{title}</h4>
      <p className="mt-1 max-w-xs text-sm text-muted">{message}</p>
    </div>
  );
}

export function Th({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <th
      className={`whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted ${className}`}
    >
      {children}
    </th>
  );
}

export function Td({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return <td className={`whitespace-nowrap px-4 py-3.5 text-sm ${className}`}>{children}</td>;
}
