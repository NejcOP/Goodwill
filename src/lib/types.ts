export type Category = "zenske" | "moski" | "dodatki" | "arhiv";

export interface ProductColor {
  name: string;
  swatch: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  compareAtPrice?: number;
  images: [string, string, ...string[]];
  colors: ProductColor[];
  sizes: string[];
  description: string;
  materials: string;
  care: string;
  shipping: string;
  isNew?: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
}
