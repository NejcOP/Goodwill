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
    <div className="container-luxury pt-32 pb-24 sm:pt-40">
      <div className="mb-12 max-w-2xl">
        <p className="eyebrow mb-4">Izdelki</p>
        <h1 className="font-serif text-4xl sm:text-5xl">
          {active === "all" ? "Vsi izdelki" : CATEGORY_LABELS[active]}
        </h1>
      </div>

      <div className="mb-12">
        <FilterBar active={active as string} />
      </div>

      <ProductGrid products={filtered} />
    </div>
  );
}
