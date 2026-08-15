"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import type { NewsletterPreferences } from "@/lib/auth-types";
import { staggerContainer, fadeUpItem } from "@/lib/animations";

const TOPICS: { key: keyof NewsletterPreferences; label: string; desc: string }[] = [
  { key: "newCollections", label: "Nove kolekcije", desc: "Bodite prvi obveščeni o novih kosih." },
  { key: "exclusiveOffers", label: "Ekskluzivne ponudbe", desc: "Posebne ponudbe izključno za člane." },
  { key: "sales", label: "Razprodaje", desc: "Obvestila o sezonskih in posebnih razprodajah." },
  { key: "journal", label: "GOODWILL Journal", desc: "Uredniške zgodbe in navdih iz sveta mode." },
  { key: "events", label: "Dogodki", desc: "Povabila na ekskluzivne dogodke in predstavitve." },
];

export default function NovicePage() {
  const { user, updateNewsletter } = useAuth();
  if (!user) return null;

  const [prefs, setPrefs] = useState<NewsletterPreferences>({ ...user.newsletterPreferences });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  function toggle(key: keyof NewsletterPreferences) {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await updateNewsletter(prefs);
    setSaving(false);
    setSaved(true);
  }

  function unsubscribeAll() {
    const all: NewsletterPreferences = {
      newCollections: false,
      exclusiveOffers: false,
      sales: false,
      journal: false,
      events: false,
    };
    setPrefs(all);
    updateNewsletter(all);
    setSaved(false);
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={fadeUpItem}>
        <p className="eyebrow mb-2">Upravljanje</p>
        <h1 className="font-serif text-3xl sm:text-4xl">GOODWILL News</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ostanite v koraku z GOODWILL svetom.
        </p>
      </motion.div>

      <motion.form
        variants={fadeUpItem}
        onSubmit={handleSave}
        className="mt-10 max-w-lg"
      >
        <div className="flex flex-col gap-4">
          {TOPICS.map((topic) => (
            <label
              key={topic.key}
              className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-border/50 bg-warm-white p-5 transition-colors hover:border-border"
            >
              <div>
                <p className="text-sm font-medium">{topic.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{topic.desc}</p>
              </div>
              <input
                type="checkbox"
                checked={prefs[topic.key]}
                onChange={() => toggle(topic.key)}
                className="mt-0.5 size-4 shrink-0 accent-foreground"
              />
            </label>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-4">
          <Button
            type="submit"
            disabled={saving}
            className="h-12 rounded-full px-8 text-xs tracking-[0.15em] uppercase"
          >
            {saving ? "Shranjujem..." : "Shrani nastavitve"}
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

      <motion.div
        variants={fadeUpItem}
        className="mt-12 max-w-lg border-t border-border/40 pt-8"
      >
        <p className="text-sm text-muted-foreground">
          Kadar koli se lahko odjavite od vseh novic.
        </p>
        <button
          type="button"
          onClick={unsubscribeAll}
          className="mt-3 text-xs tracking-[0.1em] uppercase text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
        >
          Odjava od vseh novic
        </button>
      </motion.div>
    </motion.div>
  );
}
