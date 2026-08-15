"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";
import { staggerContainer, fadeUpItem } from "@/lib/animations";

const inputCls =
  "h-12 rounded-none border-x-0 border-t-0 border-b border-border/60 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors";

export default function ProfilPage() {
  const { user, updateProfile, logout } = useAuth();
  if (!user) return null;

  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone ?? "",
    birthDate: user.birthDate ?? "",
  });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  function set(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await updateProfile({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone || undefined,
      birthDate: form.birthDate || undefined,
    });
    setSaving(false);
    setSaved(true);
  }

  async function handleDeleteAccount() {
    await logout();
    // In production: also call backend to delete account
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={fadeUpItem}>
        <p className="eyebrow mb-2">Račun</p>
        <h1 className="font-serif text-3xl sm:text-4xl">Moj profil</h1>
      </motion.div>

      <motion.form
        variants={fadeUpItem}
        onSubmit={handleSave}
        className="mt-10 max-w-md"
      >
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="mb-2 block text-xs tracking-[0.1em] uppercase text-muted-foreground">
              Ime
            </label>
            <Input
              required
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
              value={form.lastName}
              onChange={(e) => set("lastName", e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-xs tracking-[0.1em] uppercase text-muted-foreground">
            E-pošta
          </label>
          <Input
            type="email"
            required
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className={inputCls}
          />
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-xs tracking-[0.1em] uppercase text-muted-foreground">
            Telefon{" "}
            <span className="normal-case text-muted-foreground/60">(neobvezno)</span>
          </label>
          <Input
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            className={inputCls}
          />
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-xs tracking-[0.1em] uppercase text-muted-foreground">
            Datum rojstva{" "}
            <span className="normal-case text-muted-foreground/60">(neobvezno)</span>
          </label>
          <Input
            type="date"
            value={form.birthDate}
            onChange={(e) => set("birthDate", e.target.value)}
            className={inputCls}
          />
        </div>

        <div className="mt-8 flex items-center gap-4">
          <Button
            type="submit"
            disabled={saving}
            className="h-12 rounded-full px-8 text-xs tracking-[0.15em] uppercase"
          >
            {saving ? "Shranjujem..." : "Shrani spremembe"}
          </Button>
          {saved && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-muted-foreground"
            >
              Shranjeno.
            </motion.p>
          )}
        </div>
      </motion.form>

      {/* Password change section */}
      <motion.div
        variants={fadeUpItem}
        className="mt-16 max-w-md border-t border-border/40 pt-10"
      >
        <h2 className="font-serif text-xl">Geslo</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Sprememba gesla bo poslana na vaš e-poštni naslov.
        </p>
        <button className="mt-4 text-xs tracking-[0.1em] uppercase text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors">
          Pošlji navodila za spremembo gesla
        </button>
      </motion.div>

      {/* Delete account */}
      <motion.div
        variants={fadeUpItem}
        className="mt-10 max-w-md border-t border-border/40 pt-10"
      >
        <h2 className="font-serif text-xl">Izbriši račun</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          S tem dejanjem trajno izbrišete vse vaše podatke, naročila in točke.
        </p>

        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="mt-4 text-xs tracking-[0.1em] uppercase text-destructive/80 hover:text-destructive transition-colors"
          >
            Izbriši moj račun
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-4"
          >
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              className="h-10 rounded-full px-6 text-xs tracking-[0.1em] uppercase"
            >
              Potrdi izbris
            </Button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Prekliči
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
