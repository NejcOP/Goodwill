import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { ProductCard } from "@/components/shop/product-card";
import { products } from "@/lib/products";

export function FeaturedCollection() {
  const featured = products.slice(0, 8);

  return (
    <section className="section-padding bg-warm-white">
      <div className="container-luxury">
        <Reveal className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow mb-4">Izbor</p>
            <h2 className="font-serif text-4xl sm:text-5xl">
              Izpostavljena kolekcija
            </h2>
          </div>
          <Link
            href="/izdelki"
            className="link-underline text-sm tracking-wide whitespace-nowrap"
          >
            Ogled vseh izdelkov
          </Link>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
          {featured.map((product, i) => (
            <Reveal key={product.id} delay={(i % 4) * 0.06}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
