"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice } =
    useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md! flex flex-col bg-warm-white"
      >
        <SheetHeader className="border-b border-beige px-6 py-5">
          <SheetTitle className="text-lg tracking-wide">
            Vaša košarica ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="size-8 text-muted-foreground" strokeWidth={1} />
            <p className="text-sm text-muted-foreground">Vaša košarica je prazna.</p>
            <Button
              variant="outline"
              onClick={closeCart}
              render={<Link href="/izdelki" />}
              nativeButton={false}
            >
              Nadaljuj z nakupovanjem
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              <ul className="flex flex-col divide-y divide-beige">
                {items.map((item) => (
                  <li
                    key={`${item.productSlug}-${item.size}-${item.color}`}
                    className="flex gap-4 py-6"
                  >
                    <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-md bg-beige">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-serif text-base">{item.name}</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {item.color} / {item.size}
                          </p>
                        </div>
                        <button
                          aria-label="Odstrani izdelek"
                          onClick={() =>
                            removeItem(item.productSlug, item.size, item.color)
                          }
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 rounded-full border border-beige px-2 py-1">
                          <button
                            aria-label="Zmanjšaj količino"
                            onClick={() =>
                              updateQuantity(
                                item.productSlug,
                                item.size,
                                item.color,
                                item.quantity - 1
                              )
                            }
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-4 text-center text-xs">
                            {item.quantity}
                          </span>
                          <button
                            aria-label="Povečaj količino"
                            onClick={() =>
                              updateQuantity(
                                item.productSlug,
                                item.size,
                                item.color,
                                item.quantity + 1
                              )
                            }
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <span className="text-sm">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-beige px-6 py-6">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Vmesni seštevek</span>
                <span className="text-base">{formatPrice(totalPrice)}</span>
              </div>
              <p className="mb-4 text-xs text-muted-foreground">
                Dostava in davki se izračunajo ob zaključku nakupa.
              </p>
              <Button className="h-12 w-full rounded-full text-sm tracking-wide">
                Zaključi nakup
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
