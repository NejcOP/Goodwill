"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import {
  getTierKey,
  getTierLabel,
  getNextTier,
  LOYALTY_CONFIG,
} from "@/config/loyalty";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeUpItem } from "@/lib/animations";

const TIER_DESCRIPTIONS: Record<string, string> = {
  MEMBER: "Vaš vstop v GOODWILL svet.",
  GOLD: "Za zvestobo, ki jo cenimo.",
  ELITE: "Najvišja stopnja GOODWILL izkušnje.",
};

export default function UgodnostiPage() {
  const { user } = useAuth();
  if (!user) return null;

  const tierKey = getTierKey(user.points);
  const tierLabel = getTierLabel(tierKey);
  const nextTier = getNextTier(tierKey);
  const nextThreshold = nextTier?.threshold ?? null;
  const progress = nextTier
    ? Math.min((user.points / nextTier.threshold) * 100, 100)
    : 100;

  const currentBenefits = LOYALTY_CONFIG.benefits[tierKey];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={fadeUpItem}>
        <p className="eyebrow mb-2">Vaše ugodnosti</p>
        <h1 className="font-serif text-3xl sm:text-4xl">{tierLabel}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {TIER_DESCRIPTIONS[tierKey]}
        </p>
      </motion.div>

      {/* Current tier benefits */}
      <motion.div
        variants={fadeUpItem}
        className="mt-10"
      >
        <h2 className="mb-5 font-serif text-xl">Vaše ugodnosti</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {currentBenefits.map((benefit, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-border/50 bg-warm-white p-5"
            >
              <span
                className={cn(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                  tierKey === "ELITE"
                    ? "bg-bronze/10 text-bronze"
                    : tierKey === "GOLD"
                    ? "bg-amber-500/10 text-amber-600"
                    : "bg-muted text-foreground"
                )}
              >
                <Check className="size-3" strokeWidth={2.5} />
              </span>
              <p className="text-sm leading-relaxed">{benefit}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Progress to next tier */}
      {nextTier && (
        <motion.div
          variants={fadeUpItem}
          className="mt-10 rounded-2xl border border-border/50 bg-warm-white p-6 sm:p-8"
        >
          <p className="eyebrow mb-2">Vaša naslednja stopnja</p>
          <p className="font-serif text-2xl">{nextTier.label}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {TIER_DESCRIPTIONS[nextTier.key]}
          </p>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>{user.points} točk</span>
              <span>{nextThreshold} točk</span>
            </div>
            <div className="h-px w-full overflow-hidden bg-border/40">
              <motion.div
                className="h-full bg-foreground"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Do{" "}
              <span className="font-medium text-foreground">{nextTier.label}</span>{" "}
              vam manjka{" "}
              <span className="font-medium text-foreground">
                {nextThreshold! - user.points}
              </span>{" "}
              točk.
            </p>
          </div>

          <div className="mt-6">
            <p className="mb-3 text-xs tracking-[0.08em] uppercase text-muted-foreground">
              Dodatne ugodnosti naslednje stopnje
            </p>
            <div className="flex flex-col gap-2">
              {LOYALTY_CONFIG.benefits[nextTier.key].map((b, i) => (
                <p key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="size-1 rounded-full bg-border/80 shrink-0" />
                  {b}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {tierKey === "ELITE" && (
        <motion.div
          variants={fadeUpItem}
          className="mt-10 rounded-2xl border border-bronze/30 bg-bronze/5 p-6 sm:p-8"
        >
          <p className="eyebrow mb-2 text-bronze">Najvišja stopnja</p>
          <p className="font-serif text-2xl">Dobrodošli v GOODWILL ELITE.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Uživate v vseh ugodnostih, ki jih GOODWILL ponuja.
          </p>
        </motion.div>
      )}

      {/* All tiers overview */}
      <motion.div variants={fadeUpItem} className="mt-12">
        <h2 className="mb-5 font-serif text-xl">Pregled stopenj</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {LOYALTY_CONFIG.tiers.map((tier) => {
            const isActive = tier.key === tierKey;
            return (
              <div
                key={tier.key}
                className={cn(
                  "rounded-2xl border p-5 transition-colors",
                  isActive
                    ? "border-foreground/20 bg-foreground text-primary-foreground"
                    : "border-border/50 bg-warm-white"
                )}
              >
                <p
                  className={cn(
                    "eyebrow mb-2",
                    isActive ? "text-primary-foreground/60" : ""
                  )}
                >
                  {tier.min === 0
                    ? `0 – ${tier.max} točk`
                    : tier.max === Infinity
                    ? `${tier.min}+ točk`
                    : `${tier.min} – ${tier.max} točk`}
                </p>
                <p
                  className={cn(
                    "font-serif text-lg",
                    isActive ? "" : tier.key === "ELITE" ? "text-bronze" : tier.key === "GOLD" ? "text-amber-600" : ""
                  )}
                >
                  {tier.label.replace("GOODWILL ", "")}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
