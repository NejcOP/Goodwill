"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function PurchaseCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].name);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addItem({
      productSlug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size,
      color,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="lg:sticky lg:top-28">
      {product.isNew && (
        <span className="mb-4 inline-block rounded-full bg-beige px-3 py-1 text-[10px] tracking-[0.15em] uppercase">
          Novost
        </span>
      )}
      <h1 className="font-serif text-3xl sm:text-4xl">{product.name}</h1>

      <div className="mt-3 flex items-center gap-3">
        <p className="text-lg">{formatPrice(product.price)}</p>
        {product.rating && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-bronze text-bronze" />
            {product.rating} ({product.reviewCount})
          </div>
        )}
      </div>

      <p className="mt-6 max-w-md text-sm text-muted-foreground">
        {product.description}
      </p>

      <div className="mt-8">
        <p className="mb-3 text-xs tracking-[0.1em] uppercase text-muted-foreground">
          Barva — {color}
        </p>
        <div className="flex gap-2">
          {product.colors.map((c) => (
            <button
              key={c.name}
              aria-label={c.name}
              onClick={() => setColor(c.name)}
              className={cn(
                "size-9 rounded-full border-2 transition-all",
                color === c.name
                  ? "border-charcoal"
                  : "border-transparent ring-1 ring-beige"
              )}
              style={{ backgroundColor: c.swatch }}
            />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <p className="mb-3 text-xs tracking-[0.1em] uppercase text-muted-foreground">
          Velikost — {size}
        </p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={cn(
                "flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm transition-colors",
                size === s
                  ? "border-charcoal bg-charcoal text-white"
                  : "border-beige hover:border-charcoal"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <Button
        onClick={handleAddToCart}
        className="mt-9 h-14 w-full rounded-full text-xs tracking-[0.2em] uppercase"
      >
        {added ? "Dodano v košarico" : "Dodaj v košarico"}
      </Button>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        {product.shipping}
      </p>
    </div>
  );
}
