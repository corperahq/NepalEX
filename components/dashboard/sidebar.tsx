"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PackageCheck, X, LogOut } from "lucide-react";
import { dashboardNav } from "./nav";
import { logout } from "@/lib/auth";
import { ConfirmDialog } from "./confirm-dialog";

export function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    router.replace("/client/login");
  };

  const isActive = (href: string) =>
    href === "/client" ? pathname === "/client" : pathname.startsWith(href);

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-line bg-ink-soft transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <Link href="/client" className="flex items-center gap-2.5">
            <span className="brand-gradient flex h-9 w-9 items-center justify-center rounded-xl text-ink">
              <PackageCheck className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="text-lg font-extrabold">
              Nepal<span className="text-gradient">EX</span>
              <span className="ml-1 align-top text-[10px] font-semibold text-muted">
                CLIENT
              </span>
            </span>
          </Link>
          <button onClick={onClose} className="text-muted lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
          {dashboardNav.map((group) => (
            <div key={group.title}>
              <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-widest text-muted/70">
                {group.title}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                          active
                            ? "bg-brand/10 text-cream"
                            : "text-muted hover:bg-white/5 hover:text-cream"
                        }`}
                      >
                        <span
                          className={`flex h-5 w-5 items-center justify-center ${
                            active ? "text-brand-2" : ""
                          }`}
                        >
                          <item.icon className="h-[18px] w-[18px]" />
                        </span>
                        {item.label}
                        {item.badge && (
                          <span className="brand-gradient ml-auto rounded-full px-1.5 py-0.5 text-[10px] font-bold text-ink">
                            {item.badge}
                          </span>
                        )}
                        {active && (
                          <span className="brand-gradient ml-auto h-1.5 w-1.5 rounded-full" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-line p-3">
          <div className="flex items-center gap-3 rounded-xl bg-ink-card p-3">
            <span className="brand-gradient flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-ink">
              HC
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">Himalaya Crafts</p>
              <p className="truncate text-xs text-muted">Business account</p>
            </div>
            <button
              onClick={() => setConfirm(true)}
              className="text-muted transition-colors hover:text-rose-400"
              title="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      <ConfirmDialog
        open={confirm}
        destructive
        title="Log out?"
        message="You'll be returned to the login page and will need to sign in again to access your dashboard."
        confirmLabel="Log out"
        onConfirm={handleLogout}
        onCancel={() => setConfirm(false)}
      />
    </>
  );
}
