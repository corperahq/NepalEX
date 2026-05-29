"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onCancel}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-sm rounded-2xl border border-line bg-ink-card p-6"
          >
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                destructive
                  ? "border border-rose-500/30 bg-rose-500/10 text-rose-400"
                  : "brand-gradient text-ink"
              }`}
            >
              <AlertTriangle className="h-6 w-6" />
            </span>
            <h3 className="mt-4 text-lg font-bold">{title}</h3>
            <p className="mt-2 text-sm text-muted">{message}</p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 rounded-lg border border-line px-4 py-2.5 text-sm font-semibold text-cream transition-colors hover:border-brand/40"
              >
                {cancelLabel}
              </button>
              <button
                onClick={onConfirm}
                className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.02] ${
                  destructive
                    ? "bg-rose-500 text-white"
                    : "brand-gradient text-ink"
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
