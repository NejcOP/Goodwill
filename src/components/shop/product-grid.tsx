import { ProductCard } from "@/components/shop/product-card";
import { Reveal } from "@/components/ui/reveal";
import type { Product } from "@/lib/types";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="py-24 text-center text-sm text-muted-foreground">
        V tej kategoriji trenutno ni izdelkov.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
      {products.map((product, i) => (
        <Reveal key={product.id} delay={(i % 4) * 0.05}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
}
