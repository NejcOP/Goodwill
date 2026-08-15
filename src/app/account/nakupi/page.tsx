"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import type { MockOrder } from "@/lib/auth-types";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeUpItem } from "@/lib/animations";

const STATUS_LABELS: Record<MockOrder["status"], string> = {
  placano: "Plačano",
  "v-obdelavi": "V obdelavi",
  poslano: "Poslano",
  dostavljeno: "Dostavljeno",
};

const STATUS_COLORS: Record<MockOrder["status"], string> = {
  placano: "text-amber-600",
  "v-obdelavi": "text-amber-600",
  poslano: "text-blue-600",
  dostavljeno: "text-green-700",
};

export default function NakupiPage() {
  const { orders } = useAuth();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={fadeUpItem}>
        <p className="eyebrow mb-2">Račun</p>
        <h1 className="font-serif text-3xl sm:text-4xl">Moji nakupi</h1>
        {orders.length > 0 && (
          <p className="mt-2 text-sm text-muted-foreground">
            {orders.length} {orders.length === 1 ? "naročilo" : "naročila"}
          </p>
        )}
      </motion.div>

      {orders.length === 0 ? (
        <motion.div variants={fadeUpItem} className="mt-16 flex flex-col items-center text-center">
          <p className="font-serif text-xl">Še nimate naročil.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Odkrijte kolekcijo GOODWILL.
          </p>
        </motion.div>
      ) : (
        <div className="mt-8 flex flex-col gap-3">
          {orders.map((order, i) => (
            <motion.div
              key={order.id}
              variants={fadeUpItem}
              className="overflow-hidden rounded-2xl border border-border/50 bg-warm-white"
            >
              {/* Order header */}
              <button
                onClick={() =>
                  setExpandedId(expandedId === order.id ? null : order.id)
                }
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
              >
                <div className="flex items-center gap-6">
                  <div>
                    <p className="font-medium text-sm">#{order.number}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {order.date}
                    </p>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-xs text-muted-foreground">
                      {order.itemCount}{" "}
                      {order.itemCount === 1 ? "izdelek" : "izdelka"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium text-sm">€{order.total}</p>
                    <p
                      className={cn(
                        "mt-0.5 text-xs font-medium",
                        STATUS_COLORS[order.status]
                      )}
                    >
                      {STATUS_LABELS[order.status]}
                    </p>
                  </div>
                  <ChevronDown
                    className={cn(
                      "size-4 text-muted-foreground transition-transform duration-300",
                      expandedId === order.id && "rotate-180"
                    )}
                    strokeWidth={1.5}
                  />
                </div>
              </button>

              {/* Expanded detail */}
              <AnimatePresence initial={false}>
                {expandedId === order.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-border/40 px-5 pb-5 pt-4">
                      {order.shippingAddress && (
                        <div className="mb-4">
                          <p className="text-xs tracking-[0.08em] uppercase text-muted-foreground">
                            Dostava
                          </p>
                          <p className="mt-1 text-sm">{order.shippingAddress}</p>
                        </div>
                      )}

                      {order.products && order.products.length > 0 && (
                        <div className="flex flex-col gap-3">
                          {order.products.map((product, pi) => (
                            <div
                              key={pi}
                              className="flex items-center justify-between gap-4"
                            >
                              <div>
                                <p className="text-sm">{product.name}</p>
                                <p className="mt-0.5 text-xs text-muted-foreground">
                                  Velikost {product.size} · Kol. {product.quantity}
                                </p>
                              </div>
                              <p className="text-sm font-medium">€{product.price}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-4 border-t border-border/40 pt-4 flex justify-between">
                        <p className="text-xs tracking-[0.08em] uppercase text-muted-foreground">
                          Skupaj
                        </p>
                        <p className="font-medium">€{order.total}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
