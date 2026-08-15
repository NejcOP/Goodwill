import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product/gallery";
import { PurchaseCard } from "@/components/product/purchase-card";
import { InfoAccordion } from "@/components/product/info-accordion";
import { Reviews } from "@/components/product/reviews";
import { RelatedProducts } from "@/components/product/related-products";
import { RecentlyViewed } from "@/components/product/recently-viewed";
import { TrackView } from "@/components/product/track-view";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <div className="pt-28 pb-24 sm:pt-32">
      <TrackView slug={product.slug} />

      <div className="container-luxury grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} name={product.name} />
        <PurchaseCard product={product} />
      </div>

      <div className="container-luxury mt-24 max-w-2xl">
        <InfoAccordion product={product} />
      </div>

      <div className="container-luxury mt-24">
        <Reviews rating={product.rating} reviewCount={product.reviewCount} />
      </div>

      <div className="container-luxury mt-24">
        <RelatedProducts title="Morda vam bo všeč tudi" products={related} />
      </div>

      <div className="container-luxury mt-24">
        <RecentlyViewed excludeSlug={product.slug} />
      </div>
    </div>
  );
}
