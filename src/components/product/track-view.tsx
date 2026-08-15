"use client";

import { useEffect } from "react";
import { trackRecentlyViewed } from "@/lib/recently-viewed";

export function TrackView({ slug }: { slug: string }) {
  useEffect(() => {
    trackRecentlyViewed(slug);
  }, [slug]);

  return null;
}
