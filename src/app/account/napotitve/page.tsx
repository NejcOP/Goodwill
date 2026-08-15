"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { LOYALTY_CONFIG } from "@/config/loyalty";
import { staggerContainer, fadeUpItem } from "@/lib/animations";

export default function NapotvitePage() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  if (!user) return null;

  function copyCode() {
    navigator.clipboard.writeText(user!.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={fadeUpItem}>
        <p className="eyebrow mb-2">Skupnost</p>
        <h1 className="font-serif text-3xl sm:text-4xl">Povabi prijatelja</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Podari prijatelju GOODWILL izkušnjo.
        </p>
      </motion.div>

      {/* Referral code card */}
      <motion.div variants={fadeUpItem} className="mt-10 rounded-2xl border border-border/50 bg-warm-white p-6 sm:p-8">
        <p className="eyebrow mb-3">Vaša referenčna koda</p>
        <div className="flex items-center gap-4">
          <div className="flex-1 rounded-xl border border-border/50 bg-background px-5 py-4">
            <p className="font-serif text-xl tracking-wider">{user.referralCode}</p>
          </div>
          <button
            onClick={copyCode}
            className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border/50 bg-background transition-colors hover:bg-muted"
            aria-label="Kopiraj kodo"
          >
            {copied ? (
              <Check className="size-4 text-green-700" strokeWidth={1.5} />
            ) : (
              <Copy className="size-4" strokeWidth={1.5} />
            )}
          </button>
        </div>

        {copied && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-xs text-muted-foreground"
          >
            Koda je bila kopirana.
          </motion.p>
        )}
      </motion.div>

      {/* How it works */}
      <motion.div variants={fadeUpItem} className="mt-10">
        <h2 className="mb-5 font-serif text-xl">Kako deluje</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              step: "01",
              title: "Delite kodo",
              desc: "Pošljite svojo edinstveno kodo prijateljem in družini.",
            },
            {
              step: "02",
              title: "Prijatelj se registrira",
              desc: "Ko se vaš prijatelj registrira z vašo kodo, postane GOODWILL član.",
            },
            {
              step: "03",
              title: "Prejmete točke",
              desc: `Za vsakega uspešnega prijatelja prejmete ${LOYALTY_CONFIG.points.referral} GOODWILL točk.`,
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-xl border border-border/50 bg-warm-white p-5"
            >
              <p className="eyebrow mb-3">{item.step}</p>
              <p className="font-serif text-base mb-2">{item.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Reward info */}
      <motion.div variants={fadeUpItem} className="mt-8 rounded-xl border border-border/50 bg-warm-white p-5">
        <p className="text-sm text-muted-foreground">
          Za vsakega uspešnega prijatelja prejmete{" "}
          <span className="font-medium text-foreground">
            {LOYALTY_CONFIG.points.referral} GOODWILL točk
          </span>
          . Točke so pripisane takoj po registraciji vašega prijatelja.
        </p>
      </motion.div>
    </motion.div>
  );
}
