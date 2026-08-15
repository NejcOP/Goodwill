"use client";

import { RelatedProducts } from "@/components/product/related-products";
import { useRecentlyViewed } from "@/lib/recently-viewed";
import { getProductBySlug } from "@/lib/products";

export function RecentlyViewed({ excludeSlug }: { excludeSlug: string }) {
  const slugs = useRecentlyViewed(excludeSlug);
  const items = slugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (items.length === 0) return null;

  return <RelatedProducts title="Nedavno ogledano" products={items} />;
}
