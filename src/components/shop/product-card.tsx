"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist } = useAuth();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <Link href={`/izdelek/${product.slug}`} className="group block">
      <div className="relative aspect-3/4 overflow-hidden rounded-xl bg-beige">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-opacity duration-500 ease-out group-hover:opacity-0"
        />
        <Image
          src={product.images[1]}
          alt=""
          aria-hidden
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 rounded-full bg-warm-white/90 px-3 py-1 text-[10px] tracking-[0.15em] text-charcoal uppercase">
            Novo
          </span>
        )}

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          aria-label={isWishlisted ? "Odstrani iz želja" : "Dodaj v želje"}
          className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-warm-white/90 text-foreground transition-all hover:bg-white opacity-0 group-hover:opacity-100"
        >
          <Heart
            className={cn(
              "size-4 transition-all",
              isWishlisted ? "fill-foreground" : "fill-none"
            )}
            strokeWidth={1.5}
          />
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <h3 className="font-serif text-base">{product.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {CATEGORY_LABELS[product.category]}
          </p>
        </div>
        <p className="text-sm">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
