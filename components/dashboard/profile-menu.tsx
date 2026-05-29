"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { User, Settings, LifeBuoy, LogOut, ChevronDown } from "lucide-react";
import { getSession, logout, type Session } from "@/lib/auth";
import { ConfirmDialog } from "./confirm-dialog";

export function ProfileMenu() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(getSession());
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const name = session?.name ?? "Himalaya Crafts";
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const doLogout = () => {
    logout();
    router.replace("/client/login");
  };

  const items = [
    { icon: User, label: "My profile", href: "/client/settings" },
    { icon: Settings, label: "Settings", href: "/client/settings" },
    { icon: LifeBuoy, label: "Support", href: "/client/support" },
  ];

  return (
    <div className="relative ml-1" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full pl-1 pr-2 transition-colors hover:bg-white/5"
        aria-label="Account menu"
      >
        <span className="brand-gradient flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-ink">
          {initials}
        </span>
        <ChevronDown
          className={`hidden h-4 w-4 text-muted transition-transform sm:block ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-12 w-60 overflow-hidden rounded-xl border border-line bg-ink-card shadow-2xl shadow-black/40"
          >
            <div className="flex items-center gap-3 border-b border-line p-4">
              <span className="brand-gradient flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-ink">
                {initials}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{name}</p>
                <p className="truncate text-xs text-muted">Business account</p>
              </div>
            </div>

            <ul className="p-1.5">
              {items.map((it) => (
                <li key={it.label}>
                  <Link
                    href={it.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-white/5 hover:text-cream"
                  >
                    <it.icon className="h-[18px] w-[18px]" />
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="border-t border-line p-1.5">
              <button
                onClick={() => {
                  setOpen(false);
                  setConfirm(true);
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-500/10"
              >
                <LogOut className="h-[18px] w-[18px]" />
                Log out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmDialog
        open={confirm}
        destructive
        title="Log out?"
        message="You'll be returned to the login page and will need to sign in again to access your dashboard."
        confirmLabel="Log out"
        onConfirm={doLogout}
        onCancel={() => setConfirm(false)}
      />
    </div>
  );
}
