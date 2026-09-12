import type { Metadata } from "next";
import { FilterBarPro } from "@/components/shop/filter-bar-pro";
import { ProductGrid } from "@/components/shop/product-grid";
import { CATEGORY_LABELS, products } from "@/lib/products";
import type { Gender, Subcategory } from "@/lib/types";

export const metadata: Metadata = {
  title: "Izdelki",
  description: "Odkrijte celotno kolekcijo GOODWILL — ženske, moški in dodatki.",
};

export default async function IzdelkiPage({
  searchParams,
}: {
  searchParams: Promise<{ spol?: string; kategorija?: string }>;
}) {
  const { spol, kategorija } = await searchParams;
  const activeGender = (spol === "zenske" || spol === "moski" ? spol : undefined) as Gender | undefined;
  const activeSubcategory = kategorija as Subcategory | undefined;

  // Filtriraj izdelke
  let filtered = products;

  if (activeGender) {
    filtered = filtered.filter((p) => p.category === activeGender);
  }

  if (activeSubcategory && activeGender) {
    filtered = filtered.filter((p) => p.category === activeSubcategory || p.subcategory === activeSubcategory);
  }

  // Določi naslov in opis
  const getTitle = () => {
    if (activeGender && activeSubcategory) {
      const genderLabel = activeGender === "zenske" ? "Ženske" : "Moški";
      const subLabel = activeSubcategory === "majice" ? "majice" 
        : activeSubcategory === "hlace" ? "hlače" 
        : activeSubcategory === "pulover" ? "puloverji" 
        : activeSubcategory === "krilo" ? "krila" 
        : "dodatki";
      return `${genderLabel} — ${subLabel}`;
    }
    if (activeGender) {
      return activeGender === "zenske" ? "Ženske oblačila" : "Moška oblačila";
    }
    return "Vsa oblačila";
  };

  const getDescription = () => {
    if (activeGender && activeSubcategory) {
      const genderLabel = activeGender === "zenske" ? "ženskih" : "moških";
      return `Odkrijte našo kolekcijo ${genderLabel} oblačil — ustvarjena iz naravnih materialov in dolgo trajnih šivov.`;
    }
    if (activeGender) {
      const genderLabel = activeGender === "zenske" ? "ženskega" : "moškega";
      return `Brskajte po ${genderLabel} delu naše kolekcije — premišljeno oblikovana in trajno narejena.`;
    }
    return "Odkrijte našo celovito kolekcijo — od klasičnih bistvenih stvari do sodobnega oblačila za vsak dan.";
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container-luxury pt-32 pb-24 sm:pt-40">
        <div className="mb-16 max-w-3xl">
          <p className="eyebrow mb-4">Kolekcija</p>
          <h1 className="font-serif text-5xl sm:text-6xl leading-tight mb-6">
            {getTitle()}
          </h1>
          <p className="text-muted-foreground text-lg">
            {getDescription()}
          </p>
        </div>

        <div className="mb-12">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-6 font-medium">Filtriranje</p>
          <FilterBarPro activeGender={activeGender} activeSubcategory={activeSubcategory} />
        </div>

        <ProductGrid products={filtered} />
      </div>
    </div>
  );
}
