"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plus, Star, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";
import type { Address } from "@/lib/auth-types";
import { staggerContainer, fadeUpItem } from "@/lib/animations";

const inputCls =
  "h-12 rounded-none border-x-0 border-t-0 border-b border-border/60 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  postalCode: "",
  country: "Slovenija",
  phone: "",
  isDefault: false,
};

export default function NasloviPage() {
  const { addresses, addAddress, removeAddress, setDefaultAddress } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  function set(field: keyof typeof form, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    addAddress({
      firstName: form.firstName,
      lastName: form.lastName,
      address: form.address,
      city: form.city,
      postalCode: form.postalCode,
      country: form.country,
      phone: form.phone || undefined,
      isDefault: form.isDefault || addresses.length === 0,
    });
    setSaving(false);
    setForm(EMPTY_FORM);
    setShowForm(false);
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={fadeUpItem}>
        <p className="eyebrow mb-2">Račun</p>
        <h1 className="font-serif text-3xl sm:text-4xl">Naslovi</h1>
      </motion.div>

      <div className="mt-8 max-w-lg">
        {/* Address list */}
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {addresses.map((addr, i) => (
              <motion.div
                key={addr.id}
                variants={fadeUpItem}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                className="relative rounded-xl border border-border/50 bg-warm-white p-5"
              >
                {addr.isDefault && (
                  <span className="eyebrow mb-2 inline-flex items-center gap-1 text-bronze">
                    <Star className="size-3" fill="currentColor" /> Privzeto
                  </span>
                )}
                <p className="text-sm font-medium">
                  {addr.firstName} {addr.lastName}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {addr.address}
                </p>
                <p className="text-sm text-muted-foreground">
                  {addr.postalCode} {addr.city}, {addr.country}
                </p>
                {addr.phone && (
                  <p className="mt-1 text-xs text-muted-foreground">{addr.phone}</p>
                )}

                <div className="mt-4 flex items-center gap-4">
                  {!addr.isDefault && (
                    <button
                      onClick={() => setDefaultAddress(addr.id)}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Nastavi kot privzeto
                    </button>
                  )}
                  <button
                    onClick={() => removeAddress(addr.id)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="size-3" strokeWidth={1.5} />
                    Odstrani
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Add address button */}
        {!showForm && (
          <motion.button
            variants={fadeUpItem}
            onClick={() => setShowForm(true)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border/60 py-5 text-sm text-muted-foreground transition-colors hover:border-border hover:text-foreground"
          >
            <Plus className="size-4" strokeWidth={1.5} />
            Dodaj naslov
          </motion.button>
        )}

        {/* Add address form */}
        <AnimatePresence>
          {showForm && (
            <motion.form
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleAdd}
              className="mt-4 rounded-2xl border border-border/50 bg-warm-white p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-serif text-lg">Nov naslov</h2>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" strokeWidth={1.5} />
                </button>
              </div>

              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-xs tracking-[0.1em] uppercase text-muted-foreground">
                      Ime
                    </label>
                    <Input required value={form.firstName} onChange={(e) => set("firstName", e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs tracking-[0.1em] uppercase text-muted-foreground">
                      Priimek
                    </label>
                    <Input required value={form.lastName} onChange={(e) => set("lastName", e.target.value)} className={inputCls} />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs tracking-[0.1em] uppercase text-muted-foreground">
                    Ulica in hišna številka
                  </label>
                  <Input required value={form.address} onChange={(e) => set("address", e.target.value)} className={inputCls} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-xs tracking-[0.1em] uppercase text-muted-foreground">
                      Poštna številka
                    </label>
                    <Input required value={form.postalCode} onChange={(e) => set("postalCode", e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs tracking-[0.1em] uppercase text-muted-foreground">
                      Mesto
                    </label>
                    <Input required value={form.city} onChange={(e) => set("city", e.target.value)} className={inputCls} />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs tracking-[0.1em] uppercase text-muted-foreground">
                    Država
                  </label>
                  <Input required value={form.country} onChange={(e) => set("country", e.target.value)} className={inputCls} />
                </div>

                <div>
                  <label className="mb-2 block text-xs tracking-[0.1em] uppercase text-muted-foreground">
                    Telefon{" "}
                    <span className="normal-case text-muted-foreground/60">(neobvezno)</span>
                  </label>
                  <Input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls} />
                </div>

                {addresses.length > 0 && (
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={form.isDefault}
                      onChange={(e) => set("isDefault", e.target.checked)}
                      className="size-4 accent-foreground"
                    />
                    <span className="text-xs text-muted-foreground">
                      Nastavi kot privzeti naslov
                    </span>
                  </label>
                )}

                <div className="flex items-center gap-4 pt-2">
                  <Button
                    type="submit"
                    disabled={saving}
                    className="h-12 rounded-full px-8 text-xs tracking-[0.15em] uppercase"
                  >
                    {saving ? "Shranjujem..." : "Dodaj naslov"}
                  </Button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Prekliči
                  </button>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
