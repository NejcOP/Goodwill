"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { staggerContainer, fadeUpItem } from "@/lib/animations";

export default function NastavitevPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [confirmLogout, setConfirmLogout] = useState(false);

  if (!user) return null;

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={fadeUpItem}>
        <p className="eyebrow mb-2">Račun</p>
        <h1 className="font-serif text-3xl sm:text-4xl">Nastavitve</h1>
      </motion.div>

      <div className="mt-10 max-w-md flex flex-col gap-6">
        {/* Account info */}
        <motion.div variants={fadeUpItem} className="rounded-2xl border border-border/50 bg-warm-white p-6">
          <h2 className="font-serif text-xl mb-4">Informacije o računu</h2>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">E-pošta</span>
              <span>{user.email}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Član od</span>
              <span>
                {new Date(user.createdAt).toLocaleDateString("sl-SI", {
                  year: "numeric",
                  month: "long",
                })}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Referenčna koda</span>
              <span className="font-mono text-xs">{user.referralCode}</span>
            </div>
          </div>
        </motion.div>

        {/* Logout */}
        <motion.div variants={fadeUpItem} className="rounded-2xl border border-border/50 bg-warm-white p-6">
          <h2 className="font-serif text-xl mb-2">Odjava</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Odjavite se iz svojega računa GOODWILL.
          </p>

          {!confirmLogout ? (
            <button
              onClick={() => setConfirmLogout(true)}
              className="text-xs tracking-[0.1em] uppercase text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
            >
              Odjavi se
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <Button
                onClick={handleLogout}
                className="h-10 rounded-full px-6 text-xs tracking-[0.1em] uppercase"
              >
                Potrdi odjavo
              </Button>
              <button
                onClick={() => setConfirmLogout(false)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Prekliči
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
