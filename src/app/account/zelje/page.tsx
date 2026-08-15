"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { staggerContainer, fadeUpItem } from "@/lib/animations";

export default function ZeljePage() {
  const { wishlist, toggleWishlist } = useAuth();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={fadeUpItem}>
        <p className="eyebrow mb-2">Shranjeno</p>
        <h1 className="font-serif text-3xl sm:text-4xl">Moje želje</h1>
        {wishlistProducts.length > 0 && (
          <p className="mt-2 text-sm text-muted-foreground">
            {wishlistProducts.length}{" "}
            {wishlistProducts.length === 1 ? "kos" : "kosi"}
          </p>
        )}
      </motion.div>

      {wishlistProducts.length === 0 ? (
        <motion.div
          variants={fadeUpItem}
          className="mt-16 flex flex-col items-center text-center"
        >
          <Heart className="size-10 text-border" strokeWidth={1.5} />
          <p className="mt-4 font-serif text-xl">Vaš seznam je prazen.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Shranite kose, ki jih obožujete.
          </p>
          <Link
            href="/izdelki"
            className="mt-6 text-xs tracking-[0.15em] uppercase text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
          >
            Brskaj po kolekciji
          </Link>
        </motion.div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          <AnimatePresence>
            {wishlistProducts.map((product, i) => (
              <motion.div
                key={product.id}
                variants={fadeUpItem}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className="group relative"
              >
                <Link href={`/izdelek/${product.slug}`} className="block">
                  <div className="relative aspect-3/4 overflow-hidden rounded-xl bg-beige">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className="object-cover transition-opacity duration-500 group-hover:opacity-80"
                    />
                  </div>
                  <div className="mt-3">
                    <p className="font-serif text-sm">{product.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </Link>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Odstrani iz želja"
                  className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-warm-white/90 text-foreground transition-colors hover:bg-white"
                >
                  <X className="size-4" strokeWidth={1.5} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
