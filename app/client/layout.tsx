"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { isAuthenticated } from "@/lib/auth";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  const isAuthPage =
    pathname === "/client/login" || pathname === "/client/register";

  useEffect(() => {
    if (isAuthPage) {
      setReady(true);
      return;
    }
    if (!isAuthenticated()) {
      router.replace("/client/login");
      return;
    }
    setReady(true);
  }, [isAuthPage, pathname, router]);

  // Auth pages render full-screen without the dashboard chrome.
  if (isAuthPage) return <>{children}</>;

  // Avoid flashing protected content before the auth check resolves.
  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-brand" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="lg:pl-72">
        <Topbar onMenu={() => setOpen(true)} />
        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6 lg:py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
