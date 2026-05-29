"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Plane, MapPin, PackageCheck } from "lucide-react";
import { site } from "@/lib/site";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.5, 0.26, 1] } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
      {/* Background flourishes */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[360px] w-[360px] rounded-full bg-brand-2/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            Serving Nepal since {site.since}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 text-3xl font-extrabold leading-[1.08] sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Nepal&apos;s{" "}
            <span className="text-gradient">Number 1</span>
            <br />
            Courier &amp; Cargo Network
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            Fast, reliable domestic and international delivery — parcels, air &amp;
            sea cargo, and ecommerce logistics. From pickup to doorstep, we move
            your world.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/rate-calculator"
              className="brand-gradient group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold text-ink shadow-glow transition-transform hover:scale-[1.03]"
            >
              Check a Rate
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/track"
              className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold transition-colors hover:border-brand/40"
            >
              Track Shipment
            </Link>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted"
          >
            <span className="flex items-center gap-2">
              <PackageCheck className="h-4 w-4 text-brand-2" /> Door-to-door
            </span>
            <span className="flex items-center gap-2">
              <Plane className="h-4 w-4 text-brand-2" /> Air &amp; sea freight
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-2" /> 220+ destinations
            </span>
          </motion.div>
        </motion.div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.5, 0.26, 1] }}
      className="relative mx-auto aspect-square w-full max-w-md"
    >
      {/* Orbit rings */}
      <div className="absolute inset-0 rounded-full border border-line" />
      <div className="absolute inset-8 rounded-full border border-line" />
      <div className="absolute inset-16 rounded-full border border-dashed border-brand/30" />

      {/* Rotating route with plane */}
      <motion.div
        className="absolute inset-16"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <span className="brand-gradient absolute -top-3 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-xl text-ink shadow-glow">
          <Plane className="h-4 w-4" />
        </span>
      </motion.div>
      <motion.div
        className="absolute inset-8"
        animate={{ rotate: -360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute -bottom-2 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-lg border border-line bg-ink-card">
          <PackageCheck className="h-3.5 w-3.5 text-brand-2" />
        </span>
      </motion.div>

      {/* Center card */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="glass absolute left-1/2 top-1/2 w-44 -translate-x-1/2 -translate-y-1/2 rounded-2xl p-5 text-center"
      >
        <div className="brand-gradient mx-auto flex h-12 w-12 items-center justify-center rounded-xl text-ink">
          <PackageCheck className="h-6 w-6" />
        </div>
        <p className="mt-3 text-2xl font-extrabold">1M+</p>
        <p className="text-xs text-muted">shipments delivered</p>
      </motion.div>

      {/* Floating chips */}
      <FloatingChip className="-left-4 top-10" label="On time" value="99%" delay={0} />
      <FloatingChip
        className="-right-2 bottom-16"
        label="Live tracking"
        value="24/7"
        delay={1.2}
      />
    </motion.div>
  );
}

function FloatingChip({
  className,
  label,
  value,
  delay,
}: {
  className: string;
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
      className={`glass absolute rounded-xl px-3.5 py-2.5 ${className}`}
    >
      <p className="text-base font-bold text-brand-2">{value}</p>
      <p className="text-[11px] text-muted">{label}</p>
    </motion.div>
  );
}
