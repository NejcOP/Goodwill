import type { Metadata } from "next";
import { FilterBar } from "@/components/shop/filter-bar";
import { ProductGrid } from "@/components/shop/product-grid";
import { CATEGORY_LABELS, products } from "@/lib/products";
import type { Category } from "@/lib/types";

export const metadata: Metadata = {
  title: "Izdelki",
  description: "Odkrijte celotno kolekcijo GOODWILL — ženske, moški in dodatki.",
};

const CATEGORIES: Category[] = ["zenske", "moski", "dodatki", "arhiv", "majice", "hlace", "pulover", "krilo", "archive_sale"];

export default async function IzdelkiPage({
  searchParams,
}: {
  searchParams: Promise<{ kategorija?: string }>;
}) {
  const { kategorija } = await searchParams;
  const active = CATEGORIES.includes(kategorija as Category)
    ? (kategorija as Category)
    : "all";

  const filtered =
    active === "all"
      ? products
      : products.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-white">
      <div className="container-luxury pt-32 pb-24 sm:pt-40">
        <div className="mb-16 max-w-3xl">
          <p className="eyebrow mb-4">Kolekcija</p>
          <h1 className="font-serif text-5xl sm:text-6xl leading-tight mb-6">
            {active === "all" ? "Vsi izdelki" : CATEGORY_LABELS[active]}
          </h1>
          <p className="text-muted-foreground text-lg">
            {active === "all" 
              ? "Odkrijte našo celovito kolekcijo — od klasičnih bistvenih stvari do sodobnega oblačila za vsak dan."
              : `Brskajte po izboru ${CATEGORY_LABELS[active].toLowerCase()} — ustvarjeni iz naravnih materialov in dolgo trajnih šivov.`}
          </p>
        </div>

        <div className="mb-12">
          <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground mb-4 font-medium">Filtriranje</p>
          <FilterBar active={active as string} />
        </div>

        <ProductGrid products={filtered} />
      </div>
    </div>
  );
}
