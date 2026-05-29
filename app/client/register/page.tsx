"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  PackageCheck,
  Eye,
  EyeOff,
  Lock,
  User,
  Mail,
  Phone,
  Building2,
  ArrowRight,
  AlertCircle,
  Check,
  Boxes,
  Globe2,
  Headset,
} from "lucide-react";
import { register } from "@/lib/auth";

type Account = "personal" | "business";

export default function ClientRegisterPage() {
  const router = useRouter();
  const [account, setAccount] = useState<Account>("business");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    business: "",
    pan: "",
    email: "",
    phone: "",
    password: "",
  });
  const [agree, setAgree] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.firstName || !form.email || !form.password) {
      setError("Please fill in your name, email and password.");
      return;
    }
    if (account === "business" && !form.business) {
      setError("Please enter your business name.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!agree) {
      setError("Please accept the Terms & Privacy Policy to continue.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      register(`${form.firstName} ${form.lastName}`.trim(), form.email);
      router.push("/client");
    }, 800);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left — brand panel */}
      <div className="relative hidden overflow-hidden border-r border-line bg-ink-soft lg:block">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="pointer-events-none absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-brand/20 blur-[120px]" />
        <div className="pointer-events-none absolute -right-10 bottom-10 h-72 w-72 rounded-full bg-brand-2/10 blur-[120px]" />

        <div className="relative flex h-full flex-col justify-between p-12">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="brand-gradient flex h-10 w-10 items-center justify-center rounded-xl text-ink shadow-glow">
              <PackageCheck className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="text-2xl font-extrabold">
              Nepal<span className="text-gradient">EX</span>
            </span>
          </Link>

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-md text-4xl font-extrabold leading-tight"
            >
              Create your account and{" "}
              <span className="text-gradient">start shipping today.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 max-w-md text-muted"
            >
              Join thousands of businesses and individuals who trust NepalEX to
              move their parcels and cargo across Nepal and the world.
            </motion.p>

            <div className="mt-10 space-y-4">
              {[
                { icon: Boxes, text: "Book & manage shipments instantly" },
                { icon: Globe2, text: "Ship to 220+ destinations worldwide" },
                { icon: Headset, text: "Dedicated business support" },
              ].map((f, i) => (
                <motion.div
                  key={f.text}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-brand-2">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium">{f.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted">
            © 2012–{new Date().getFullYear()} NepalEX. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right — form */}
      <div className="relative flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md py-8"
        >
          <Link href="/" className="mb-8 flex items-center justify-center gap-2.5 lg:hidden">
            <span className="brand-gradient flex h-10 w-10 items-center justify-center rounded-xl text-ink">
              <PackageCheck className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="text-2xl font-extrabold">
              Nepal<span className="text-gradient">EX</span>
            </span>
          </Link>

          <h2 className="text-2xl font-extrabold">Create your account</h2>
          <p className="mt-1.5 text-sm text-muted">
            Get started with NepalEX in a minute.
          </p>

          {/* Account type toggle */}
          <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl border border-line bg-ink-soft p-1">
            {(["personal", "business"] as Account[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setAccount(t)}
                className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold capitalize transition-colors ${
                  account === t ? "brand-gradient text-ink" : "text-muted hover:text-cream"
                }`}
              >
                {t === "personal" ? <User className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
                {t}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} className="mt-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="First name" icon={User} value={form.firstName} onChange={set("firstName")} placeholder="Ramesh" />
              <Field label="Last name" icon={User} value={form.lastName} onChange={set("lastName")} placeholder="Shrestha" />
            </div>

            <AnimatePresence>
              {account === "business" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-2 gap-3 overflow-hidden"
                >
                  <Field label="Business name" icon={Building2} value={form.business} onChange={set("business")} placeholder="Himalaya Crafts" />
                  <Field label="PAN No." icon={Building2} value={form.pan} onChange={set("pan")} placeholder="301234567" />
                </motion.div>
              )}
            </AnimatePresence>

            <Field label="Email address" icon={Mail} type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" />
            <Field label="Phone" icon={Phone} value={form.phone} onChange={set("phone")} placeholder="+977-98XXXXXXXX" />

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-muted">Password</span>
              <div className="flex items-center gap-2 rounded-lg border border-line bg-ink-soft px-3 focus-within:border-brand">
                <Lock className="h-4 w-4 text-muted" />
                <input
                  type={show ? "text" : "password"}
                  value={form.password}
                  onChange={set("password")}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-muted"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="text-muted hover:text-cream"
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>

            <label className="flex items-start gap-2.5 text-sm text-muted">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 accent-[#ff5a28]"
              />
              <span>
                I agree to the{" "}
                <Link href="#" className="font-medium text-brand-2 hover:underline">Terms</Link> and{" "}
                <Link href="#" className="font-medium text-brand-2 hover:underline">Privacy Policy</Link>.
              </span>
            </label>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 overflow-hidden rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2.5 text-sm text-rose-300"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="brand-gradient group flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold text-ink transition-transform hover:scale-[1.01] disabled:opacity-70"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
                  Creating account…
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link href="/client/login" className="font-semibold text-brand-2 hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function Field({
  label,
  icon: Icon,
  ...props
}: { label: string; icon: typeof User } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-muted">{label}</span>
      <div className="flex items-center gap-2 rounded-lg border border-line bg-ink-soft px-3 focus-within:border-brand">
        <Icon className="h-4 w-4 shrink-0 text-muted" />
        <input
          {...props}
          className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-muted"
        />
      </div>
    </label>
  );
}
