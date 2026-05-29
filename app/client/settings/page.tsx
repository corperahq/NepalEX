"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { User, Building2, ShieldCheck, BellRing, Check, Camera } from "lucide-react";
import { PageHead } from "@/components/dashboard/page-head";
import { Card, CardHeader, Button } from "@/components/dashboard/primitives";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "business", label: "Business", icon: Building2 },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "notifications", label: "Notifications", icon: BellRing },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function SettingsPage() {
  const [tab, setTab] = useState<TabId>("profile");
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <>
      <PageHead
        title="Settings"
        description="Manage your account, business details and preferences."
        breadcrumb={[{ label: "Settings" }]}
      />

      <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
        {/* Tab nav */}
        <Card className="h-fit p-2">
          <ul className="space-y-1">
            {tabs.map((t) => (
              <li key={t.id}>
                <button
                  onClick={() => setTab(t.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    tab === t.id
                      ? "bg-brand/10 text-cream"
                      : "text-muted hover:bg-white/5 hover:text-cream"
                  }`}
                >
                  <t.icon className={`h-[18px] w-[18px] ${tab === t.id ? "text-brand-2" : ""}`} />
                  {t.label}
                </button>
              </li>
            ))}
          </ul>
        </Card>

        {/* Tab content */}
        <Card>
          <CardHeader title={tabs.find((t) => t.id === tab)!.label} />
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {tab === "profile" && (
                  <div className="space-y-5">
                    <div className="flex items-center gap-4">
                      <span className="brand-gradient relative flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold text-ink">
                        HC
                        <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-line bg-ink-card text-muted">
                          <Camera className="h-3.5 w-3.5" />
                        </span>
                      </span>
                      <div>
                        <p className="font-semibold">Himalaya Crafts</p>
                        <p className="text-sm text-muted">Business account · since 2021</p>
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="First name" defaultValue="Himalaya" />
                      <Field label="Last name" defaultValue="Crafts" />
                      <Field label="Email" defaultValue="orders@himalayacrafts.com" />
                      <Field label="Phone" defaultValue="+977-9851148010" />
                    </div>
                  </div>
                )}

                {tab === "business" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Business name" defaultValue="Himalaya Crafts Pvt. Ltd." />
                    <Field label="PAN / VAT No." defaultValue="301234567" />
                    <Field label="Industry" defaultValue="Handicrafts & Exports" />
                    <Field label="Website" defaultValue="himalayacrafts.com" />
                    <Field label="Address" defaultValue="Thamel, Kathmandu" full />
                  </div>
                )}

                {tab === "security" && (
                  <div className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Current password" type="password" defaultValue="********" />
                      <div />
                      <Field label="New password" type="password" placeholder="••••••••" />
                      <Field label="Confirm new password" type="password" placeholder="••••••••" />
                    </div>
                    <Toggle label="Two-factor authentication" desc="Add an extra layer of security to your account." defaultOn />
                    <Toggle label="Login alerts" desc="Get notified of new sign-ins to your account." defaultOn />
                  </div>
                )}

                {tab === "notifications" && (
                  <div className="space-y-1">
                    <Toggle label="Shipment updates" desc="Status changes, pickups and deliveries." defaultOn />
                    <Toggle label="Billing & invoices" desc="New invoices and payment reminders." defaultOn />
                    <Toggle label="Promotions" desc="Discounts and seasonal offers." />
                    <Toggle label="Product news" desc="New features and announcements." defaultOn />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center gap-3 border-t border-line pt-5">
              <Button onClick={save}>
                {saved ? (
                  <>
                    <Check className="h-4 w-4" /> Saved
                  </>
                ) : (
                  "Save changes"
                )}
              </Button>
              <Button variant="ghost">Cancel</Button>
              <AnimatePresence>
                {saved && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-emerald-400"
                  >
                    Your changes have been saved.
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

function Field({
  label,
  full,
  ...props
}: { label: string; full?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-sm font-medium text-muted">{label}</span>
      <input
        {...props}
        className="w-full rounded-lg border border-line bg-ink-soft px-3 py-2.5 text-sm outline-none focus:border-brand placeholder:text-muted"
      />
    </label>
  );
}

function Toggle({
  label,
  desc,
  defaultOn = false,
}: {
  label: string;
  desc: string;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line py-3.5 last:border-0">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted">{desc}</p>
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          on ? "brand-gradient" : "bg-white/10"
        }`}
        aria-pressed={on}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            on ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
