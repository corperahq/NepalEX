"use client";

import { useEffect, useState } from "react";

/**
 * Simulates async data fetching so skeleton loaders are visible.
 * Returns `true` while "loading", then flips to `false` after `ms`.
 */
export function useLoading(ms = 900): boolean {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(t);
  }, [ms]);
  return loading;
}
