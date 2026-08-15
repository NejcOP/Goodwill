"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";
import { staggerContainer, fadeUpItem } from "@/lib/animations";

export default function RacunPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      router.push("/account");
    }
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
          <h1 className="font-serif text-4xl">Prijava</h1>
        </motion.div>

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

          <motion.div variants={fadeUpItem}>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-xs tracking-[0.1em] uppercase text-muted-foreground">
                Geslo
              </label>
              <Link
                href="/racun/pozabljeno-geslo"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Pozabili ste geslo?
              </Link>
            </div>
            <Input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-none border-x-0 border-t-0 border-b border-border/60 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
            />
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-destructive"
            >
              {error}
            </motion.p>
          )}

          <motion.div variants={fadeUpItem} className="mt-2">
            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-full text-xs tracking-[0.15em] uppercase"
            >
              {loading ? "Prijavljam..." : "Prijava"}
            </Button>
          </motion.div>
        </form>

        <motion.div variants={fadeUpItem} className="mt-8">
          <div className="relative flex items-center gap-4">
            <span className="h-px flex-1 bg-border/40" />
            <span className="text-xs text-muted-foreground">ali pa nadaljujte z</span>
            <span className="h-px flex-1 bg-border/40" />
          </div>

          <button
            type="button"
            className="mt-4 flex h-12 w-full items-center justify-center gap-3 rounded-full border border-border/60 bg-transparent text-xs tracking-[0.1em] uppercase text-foreground transition-colors hover:bg-muted"
          >
            <svg className="size-4" viewBox="0 0 24 24" aria-hidden>
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </button>
        </motion.div>

        <motion.p variants={fadeUpItem} className="mt-10 text-center text-sm text-muted-foreground">
          Še nimate GOODWILL računa?{" "}
          <Link href="/racun/ustvari" className="link-underline text-foreground">
            Ustvari račun
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}

