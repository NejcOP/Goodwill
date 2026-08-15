"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { staggerContainer, fadeUpItem } from "@/lib/animations";

export default function PozabljenoGesloPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Mock — in production connect to Supabase auth.resetPasswordForEmail()
    setSent(true);
  }

  return (
    <div className="container-luxury flex min-h-screen items-start justify-center pt-32 pb-24 sm:pt-40">
      <motion.div
        className="w-full max-w-sm"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUpItem} className="text-center">
          <p className="eyebrow mb-4">Račun</p>
          <h1 className="font-serif text-4xl">Pozabljeno geslo</h1>
        </motion.div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Če račun z naslovom <strong>{email}</strong> obstaja, boste v
              kratkem prejeli navodila za ponastavitev gesla.
            </p>
            <Link
              href="/racun"
              className="mt-8 inline-block text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Nazaj na prijavo
            </Link>
          </motion.div>
        ) : (
          <>
            <motion.p variants={fadeUpItem} className="mt-4 text-center text-sm text-muted-foreground">
              Vnesite e-poštni naslov in poslali vam bomo navodila za
              ponastavitev gesla.
            </motion.p>

            <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
              <motion.div variants={fadeUpItem}>
                <label className="mb-2 block text-xs tracking-[0.1em] uppercase text-muted-foreground">
                  E-pošta
                </label>
                <Input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-none border-x-0 border-t-0 border-b border-border/60 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
                />
              </motion.div>

              <motion.div variants={fadeUpItem} className="mt-2">
                <Button
                  type="submit"
                  className="h-12 w-full rounded-full text-xs tracking-[0.15em] uppercase"
                >
                  Pošlji navodila
                </Button>
              </motion.div>
            </form>

            <motion.div variants={fadeUpItem} className="mt-8 text-center">
              <Link
                href="/racun"
                className="text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Nazaj na prijavo
              </Link>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}
