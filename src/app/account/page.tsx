"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Star, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { getTierKey, getTierLabel, getNextTier, LOYALTY_CONFIG } from "@/config/loyalty";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeUpItem } from "@/lib/animations";

const STATUS_LABELS: Record<string, string> = {
  placano: "Plačano",
  "v-obdelavi": "V obdelavi",
  poslano: "Poslano",
  dostavljeno: "Dostavljeno",
};

export default function AccountPage() {
  const { user, orders, wishlist } = useAuth();
  if (!user) return null;

  const tierKey = getTierKey(user.points);
  const tierLabel = getTierLabel(tierKey);
  const nextTier = getNextTier(tierKey);
  const tierConfig = LOYALTY_CONFIG.tiers.find((t) => t.key === tierKey)!;
  const maxPoints = nextTier?.threshold ?? tierConfig.max;
  const progress = nextTier
    ? Math.min((user.points / nextTier.threshold) * 100, 100)
    : 100;

  const recentOrders = orders.slice(0, 2);

  const quickLinks = [
    { label: "Moji nakupi", href: "/account/nakupi", icon: ShoppingBag, value: `${orders.length} naročil` },
    { label: "Moje želje", href: "/account/zelje", icon: Heart, value: `${wishlist.length} kosov` },
    { label: "Ugodnosti", href: "/account/ugodnosti", icon: Star, value: tierLabel },
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div variants={fadeUpItem}>
        <p className="eyebrow mb-2">Pozdravljen,</p>
        <h1 className="font-serif text-3xl sm:text-4xl">
          {user.firstName} {user.lastName}
        </h1>
      </motion.div>

      {/* Membership card */}
      <motion.div
        variants={fadeUpItem}
        className="mt-8 rounded-2xl border border-border/50 bg-warm-white p-6 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow mb-1">Vaša stopnja</p>
            <p
              className={cn(
                "font-serif text-2xl",
                tierKey === "ELITE" && "text-bronze",
                tierKey === "GOLD" && "text-amber-600"
              )}
            >
              {tierLabel}
            </p>
          </div>
          <div className="text-right">
            <p className="font-serif text-3xl">{user.points}</p>
            <p className="text-xs text-muted-foreground">GOODWILL TOČK</p>
          </div>
        </div>

        {nextTier && (
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>{user.points} točk</span>
              <span>{nextTier.threshold} točk</span>
            </div>
            <div className="h-px w-full overflow-hidden bg-border/40">
              <motion.div
                className={cn(
                  "h-full",
                  tierKey === "GOLD" ? "bg-amber-500" : "bg-foreground"
                )}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Do{" "}
              <span className="font-medium text-foreground">
                {nextTier.label}
              </span>{" "}
              vam manjka{" "}
              <span className="font-medium text-foreground">
                {nextTier.threshold - user.points}
              </span>{" "}
              točk.
            </p>
          </div>
        )}

        {!nextTier && (
          <p className="mt-4 text-xs text-muted-foreground">
            Ste na najvišji stopnji GOODWILL ELITE.
          </p>
        )}
      </motion.div>

      {/* Quick links */}
      <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
        {quickLinks.map((item, i) => (
          <motion.div key={item.href} variants={fadeUpItem}>
            <Link
              href={item.href}
              className="flex flex-col gap-3 rounded-xl border border-border/50 bg-warm-white p-4 sm:p-5 transition-colors hover:border-border"
            >
              <item.icon className="size-5 text-muted-foreground" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{item.value}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent orders */}
      {recentOrders.length > 0 && (
        <motion.div variants={fadeUpItem} className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl">Zadnja naročila</h2>
            <Link href="/account/nakupi" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
              Vsa naročila <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-xl border border-border/50 bg-warm-white p-4 sm:p-5"
              >
                <div>
                  <p className="font-medium text-sm">#{order.number}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {order.date} · {order.itemCount}{" "}
                    {order.itemCount === 1 ? "izdelek" : "izdelka"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">€{order.total}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {STATUS_LABELS[order.status]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Benefits preview */}
      <motion.div variants={fadeUpItem} className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-xl">Vaše ugodnosti</h2>
          <Link href="/account/ugodnosti" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
            Vse ugodnosti <ArrowRight className="size-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {LOYALTY_CONFIG.benefits[tierKey].slice(0, 4).map((benefit) => (
            <div
              key={benefit}
              className="rounded-xl border border-border/50 bg-warm-white p-4 text-xs text-muted-foreground leading-relaxed"
            >
              {benefit}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
