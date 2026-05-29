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
  ArrowRight,
  AlertCircle,
  Info,
  Plane,
  ShieldCheck,
  Radar,
} from "lucide-react";
import { login, DEMO_CREDENTIALS } from "@/lib/auth";

export default function ClientLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // simulate a network round-trip
    setTimeout(() => {
      if (login(username, password)) {
        router.push("/client");
      } else {
        setError("Invalid username or password. Please try again.");
        setLoading(false);
      }
    }, 700);
  };

  const fillDemo = () => {
    setUsername(DEMO_CREDENTIALS.username);
    setPassword(DEMO_CREDENTIALS.password);
    setError("");
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left — brand / hero panel */}
      <div className="relative hidden overflow-hidden border-r border-line bg-ink-soft lg:block">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-brand/20 blur-[120px]" />
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
              Manage every shipment from one{" "}
              <span className="text-gradient">powerful portal.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 max-w-md text-muted"
            >
              Book pickups, track parcels in real time, settle invoices and view
              analytics — Nepal&apos;s #1 courier network at your fingertips.
            </motion.p>

            <div className="mt-10 space-y-4">
              {[
                { icon: Radar, text: "Live shipment tracking" },
                { icon: Plane, text: "Air, sea & domestic in one place" },
                { icon: ShieldCheck, text: "Secure, business-ready dashboard" },
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

      {/* Right — login form */}
      <div className="relative flex items-center justify-center p-6">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)] lg:hidden" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-sm"
        >
          {/* Mobile logo */}
          <Link href="/" className="mb-8 flex items-center justify-center gap-2.5 lg:hidden">
            <span className="brand-gradient flex h-10 w-10 items-center justify-center rounded-xl text-ink">
              <PackageCheck className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="text-2xl font-extrabold">
              Nepal<span className="text-gradient">EX</span>
            </span>
          </Link>

          <h2 className="text-2xl font-extrabold">Welcome back</h2>
          <p className="mt-1.5 text-sm text-muted">
            Sign in to your NepalEX client account.
          </p>

          {/* Demo credentials hint */}
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-brand/30 bg-brand/[0.07] p-3.5">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-2" />
            <div className="text-xs">
              <p className="font-semibold text-cream">Demo account</p>
              <p className="text-muted">
                Username <span className="font-mono text-brand-2">client</span> ·
                Password <span className="font-mono text-brand-2">Abcd@123</span>
              </p>
              <button
                onClick={fillDemo}
                className="mt-1.5 font-semibold text-brand-2 hover:underline"
              >
                Autofill demo credentials →
              </button>
            </div>
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-muted">
                Username
              </span>
              <div className="flex items-center gap-2 rounded-lg border border-line bg-ink-soft px-3 focus-within:border-brand">
                <User className="h-4 w-4 text-muted" />
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="client"
                  autoComplete="username"
                  className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-muted"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-muted">
                Password
              </span>
              <div className="flex items-center gap-2 rounded-lg border border-line bg-ink-soft px-3 focus-within:border-brand">
                <Lock className="h-4 w-4 text-muted" />
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted">
                <input type="checkbox" className="accent-[#ff5a28]" defaultChecked />
                Remember me
              </label>
              <Link href="#" className="font-medium text-brand-2 hover:underline">
                Forgot password?
              </Link>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <p className="flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2.5 text-sm text-rose-300">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                  </p>
                </motion.div>
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
                  Signing in…
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            Don&apos;t have an account?{" "}
            <Link href="/contact" className="font-semibold text-brand-2 hover:underline">
              Contact sales
            </Link>
          </p>
          <p className="mt-4 text-center">
            <Link href="/" className="text-xs text-muted hover:text-cream">
              ← Back to website
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
