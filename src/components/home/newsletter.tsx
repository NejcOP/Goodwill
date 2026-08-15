"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="section-padding bg-charcoal text-warm-white">
      <div className="container-luxury flex flex-col items-center text-center">
        <Reveal className="flex flex-col items-center">
          <p className="eyebrow mb-4 text-white/60">Ostanite v stiku</p>
          <h2 className="max-w-xl font-serif text-4xl sm:text-5xl">
            Stay in the GOODWILL World
          </h2>
          <p className="mt-5 max-w-md text-white/70">
            Prijavite se na naše novice in bodite prvi obveščeni o novih
            kolekcijah, ekskluzivnih ponudbah in posebnih dogodkih.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 w-full max-w-md">
          {submitted ? (
            <p className="text-sm text-white/80">
              Hvala za prijavo. Dobrodošli v GOODWILL svetu.
            </p>
          ) : (
            <>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Vaš e-poštni naslov"
                  className="h-12 flex-1 rounded-full border-white/20 bg-transparent px-5 text-white placeholder:text-white/50 focus-visible:ring-white/40"
                />
                <Button
                  type="submit"
                  className="h-12 rounded-full bg-warm-white px-8 text-xs tracking-[0.15em] text-charcoal uppercase hover:bg-white"
                >
                  Prijavi se
                </Button>
              </form>
              <p className="mt-4 text-center text-xs text-white/40">
                Z vpisom se strinjate s prejemanjem GOODWILL novic. Odjava je
                možna kadarkoli.
              </p>
            </>
          )}
        </Reveal>

      </div>
    </section>
  );
}
