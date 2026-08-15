import { ProductCard } from "@/components/shop/product-card";
import { Reveal } from "@/components/ui/reveal";
import type { Product } from "@/lib/types";

export function RelatedProducts({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  if (products.length === 0) return null;

  return (
    <div>
      <h2 className="mb-10 font-serif text-3xl">{title}</h2>
      <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
        {products.map((product, i) => (
          <Reveal key={product.id} delay={i * 0.06}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
