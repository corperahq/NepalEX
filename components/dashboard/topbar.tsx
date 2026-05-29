"use client";

import Link from "next/link";
import { Menu, Search, Bell, PlusCircle, Sun } from "lucide-react";

export function Topbar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-ink/80 px-4 backdrop-blur-xl lg:px-6">
      <button
        onClick={onMenu}
        className="rounded-lg border border-line p-2 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden flex-1 items-center gap-2 rounded-lg border border-line bg-ink-soft px-3 md:flex md:max-w-md">
        <Search className="h-4 w-4 text-muted" />
        <input
          placeholder="Search shipments, invoices, AWB…"
          className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted"
        />
        <kbd className="rounded border border-line px-1.5 py-0.5 text-[10px] text-muted">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <Link
          href="/client/create"
          className="brand-gradient hidden items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] sm:flex"
        >
          <PlusCircle className="h-4 w-4" />
          New Shipment
        </Link>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:text-cream"
          aria-label="Theme"
        >
          <Sun className="h-[18px] w-[18px]" />
        </button>

        <Link
          href="/client/notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:text-cream"
          aria-label="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="brand-gradient absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-ink">
            3
          </span>
        </Link>

        <span className="brand-gradient ml-1 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-ink">
          HC
        </span>
      </div>
    </header>
  );
}
