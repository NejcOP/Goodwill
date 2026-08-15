"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.includes(q)
      )
      .slice(0, 6);
  }, [query]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-24 max-w-lg translate-y-0 gap-0 bg-warm-white p-0 sm:max-w-lg">
        <DialogHeader className="border-b border-beige p-4">
          <DialogTitle className="sr-only">Iskanje izdelkov</DialogTitle>
          <div className="flex items-center gap-3">
            <Search className="size-4 text-muted-foreground" />
            <Input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Išči izdelke…"
              className="h-9 border-none bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
          </div>
        </DialogHeader>

        <div className="max-h-96 overflow-y-auto p-2">
          {query.trim() && results.length === 0 && (
            <p className="p-4 text-sm text-muted-foreground">
              Ni rezultatov za &ldquo;{query}&rdquo;.
            </p>
          )}
          {results.map((product) => (
            <Link
              key={product.id}
              href={`/izdelek/${product.slug}`}
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-4 rounded-md p-2 transition-colors hover:bg-beige/40"
            >
              <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-sm bg-beige">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm">{product.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatPrice(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
