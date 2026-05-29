"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="glass rounded-3xl border border-line p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-10 text-center"
          >
            <span className="brand-gradient flex h-16 w-16 items-center justify-center rounded-2xl text-ink shadow-glow">
              <CheckCircle2 className="h-8 w-8" />
            </span>
            <h3 className="mt-5 text-2xl font-bold">Message sent!</h3>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Thank you for reaching out. Our team will get back to you within
              business hours.
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-6 rounded-full border border-line px-6 py-2.5 text-sm font-semibold hover:border-brand/40"
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={onSubmit}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="First name" name="firstName" placeholder="Ramesh" required />
              <Input label="Last name" name="lastName" placeholder="Shrestha" required />
            </div>
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
            <Input label="Subject" name="subject" placeholder="How can we help?" />
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-muted">
                Your message
              </span>
              <textarea
                name="message"
                rows={4}
                required
                placeholder="Tell us about your shipment…"
                className="ct-input resize-none"
              />
            </label>
            <button
              type="submit"
              className="brand-gradient group flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-ink transition-transform hover:scale-[1.01]"
            >
              Send Message
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <style>{`
        .ct-input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--color-line);
          background: rgba(10,10,13,0.6);
          padding: 0.75rem 0.9rem;
          font-size: 0.95rem;
          color: var(--color-cream);
          outline: none;
          transition: border-color .2s;
        }
        .ct-input:focus { border-color: var(--color-brand); }
        .ct-input::placeholder { color: var(--color-muted); }
      `}</style>
    </div>
  );
}

function Input({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-muted">{label}</span>
      <input {...props} className="ct-input" />
    </label>
  );
}
