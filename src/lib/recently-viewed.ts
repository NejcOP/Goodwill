"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "goodwill-recently-viewed";
const MAX_ITEMS = 4;

export function trackRecentlyViewed(slug: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    const next = [slug, ...list.filter((s) => s !== slug)].slice(
      0,
      MAX_ITEMS + 1
    );
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore corrupt storage
  }
}

export function useRecentlyViewed(excludeSlug?: string) {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const list: string[] = raw ? JSON.parse(raw) : [];
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage on mount
      setSlugs(list.filter((s) => s !== excludeSlug).slice(0, MAX_ITEMS));
    } catch {
      setSlugs([]);
    }
  }, [excludeSlug]);

  return slugs;
}
