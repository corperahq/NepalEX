"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/site";

export function ServicesGrid({ limit }: { limit?: number }) {
  const list = limit ? services.slice(0, limit) : services;
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((s, i) => (
        <motion.div
          key={s.slug}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
          whileHover={{ y: -6 }}
          className="group relative overflow-hidden rounded-2xl border border-line bg-ink-card p-7 transition-colors hover:border-brand/40"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
          <div className="brand-gradient flex h-14 w-14 items-center justify-center rounded-2xl text-ink shadow-glow">
            <s.icon className="h-7 w-7" strokeWidth={2} />
          </div>
          <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{s.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
