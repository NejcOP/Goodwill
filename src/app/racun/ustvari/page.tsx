"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";
import { staggerContainer, fadeUpItem } from "@/lib/animations";

const inputCls =
  "h-12 rounded-none border-x-0 border-t-0 border-b border-border/60 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors";

export default function UstvariRacunPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    newsletterConsent: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function set(field: keyof typeof form, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Gesli se ne ujemata.");
      return;
    }
    if (form.password.length < 8) {
      setError("Geslo mora vsebovati vsaj 8 znakov.");
      return;
    }

    setLoading(true);
    const result = await register({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      birthDate: form.birthDate || undefined,
      newsletterConsent: form.newsletterConsent,
    });
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
          <p className="eyebrow mb-4">Postanite član</p>
          <h1 className="font-serif text-4xl">Ustvari račun</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Postanite del GOODWILL sveta.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
          <motion.div
            variants={fadeUpItem}
            className="grid grid-cols-2 gap-4"
          >
            <div>
              <label className="mb-2 block text-xs tracking-[0.1em] uppercase text-muted-foreground">
                Ime
              </label>
              <Input
                required
                autoComplete="given-name"
                value={form.firstName}
                onChange={(e) => set("firstName", e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className="mb-2 block text-xs tracking-[0.1em] uppercase text-muted-foreground">
                Priimek
              </label>
              <Input
                required
                autoComplete="family-name"
                value={form.lastName}
                onChange={(e) => set("lastName", e.target.value)}
                className={inputCls}
              />
            </div>
          </motion.div>

          <motion.div variants={fadeUpItem}>
            <label className="mb-2 block text-xs tracking-[0.1em] uppercase text-muted-foreground">
              E-pošta
            </label>
            <Input
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className={inputCls}
            />
          </motion.div>

          <motion.div variants={fadeUpItem}>
            <label className="mb-2 block text-xs tracking-[0.1em] uppercase text-muted-foreground">
              Geslo
            </label>
            <Input
              type="password"
              required
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
              className={inputCls}
            />
          </motion.div>

          <motion.div variants={fadeUpItem}>
            <label className="mb-2 block text-xs tracking-[0.1em] uppercase text-muted-foreground">
              Ponovi geslo
            </label>
            <Input
              type="password"
              required
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={(e) => set("confirmPassword", e.target.value)}
              className={inputCls}
            />
          </motion.div>

          <motion.div variants={fadeUpItem}>
            <label className="mb-2 block text-xs tracking-[0.1em] uppercase text-muted-foreground">
              Datum rojstva{" "}
              <span className="normal-case text-muted-foreground/60">(neobvezno)</span>
            </label>
            <Input
              type="date"
              autoComplete="bday"
              value={form.birthDate}
              onChange={(e) => set("birthDate", e.target.value)}
              className={inputCls}
            />
          </motion.div>

          <motion.div variants={fadeUpItem}>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={form.newsletterConsent}
                onChange={(e) => set("newsletterConsent", e.target.checked)}
                className="mt-0.5 size-4 accent-foreground"
              />
              <span className="text-xs leading-relaxed text-muted-foreground">
                Želim prejemati GOODWILL novice, ekskluzivne ponudbe in
                informacije o novih kolekcijah.
              </span>
            </label>
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
              {loading ? "Ustvarjam račun..." : "Ustvari račun"}
            </Button>
          </motion.div>
        </form>

        <motion.p variants={fadeUpItem} className="mt-8 text-center text-sm text-muted-foreground">
          Že imate račun?{" "}
          <Link href="/racun" className="link-underline text-foreground">
            Prijava
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
