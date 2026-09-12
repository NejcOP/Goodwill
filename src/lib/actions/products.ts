"use server";

import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/types";

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return (data || []).map((item: any) => ({
    id: item.id,
    slug: item.slug,
    name: item.name,
    category: item.category,
    gender: item.gender,
    subcategory: item.subcategory,
    price: item.price,
    compareAtPrice: item.compare_at_price,
    images: item.images,
    colors: item.colors || [],
    sizes: item.sizes || [],
    description: item.description,
    materials: item.materials,
    care: item.care,
    shipping: item.shipping,
    isNew: item.is_new,
    rating: item.rating,
    reviewCount: item.review_count,
  }));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    category: data.category,
    gender: data.gender,
    subcategory: data.subcategory,
    price: data.price,
    compareAtPrice: data.compare_at_price,
    images: data.images,
    colors: data.colors || [],
    sizes: data.sizes || [],
    description: data.description,
    materials: data.materials,
    care: data.care,
    shipping: data.shipping,
    isNew: data.is_new,
    rating: data.rating,
    reviewCount: data.review_count,
  };
}

export async function getRelatedProducts(
  product: Product,
  count = 4
): Promise<Product[]> {
  // Očekuješ isti gender/kategoriju kao proizvod
  const filterGender = product.gender || 
    (product.category === "zenske" || product.category === "moski" 
      ? product.category 
      : undefined);

  let query = supabase.from("products").select("*");

  if (filterGender) {
    query = query.eq("gender", filterGender);
  } else {
    query = query.eq("category", product.category);
  }

  let { data, error } = await query
    .neq("id", product.id)
    .limit(count);

  if (error || !data || data.length < count) {
    // Ako nema dovoljno, proširi pretragu na istu kategoriju
    const { data: moreData } = await supabase
      .from("products")
      .select("*")
      .eq("category", product.category)
      .neq("id", product.id)
      .limit(count);

    data = moreData || [];
  }

  return (data || []).map((item: any) => ({
    id: item.id,
    slug: item.slug,
    name: item.name,
    category: item.category,
    gender: item.gender,
    subcategory: item.subcategory,
    price: item.price,
    compareAtPrice: item.compare_at_price,
    images: item.images,
    colors: item.colors || [],
    sizes: item.sizes || [],
    description: item.description,
    materials: item.materials,
    care: item.care,
    shipping: item.shipping,
    isNew: item.is_new,
    rating: item.rating,
    reviewCount: item.review_count,
  }));
}
