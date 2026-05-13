import { createClient } from "@supabase/supabase-js";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  colors: { name: string; swatch: string }[];
  sizes: string[];
  tag?: string;
  image: string;
  inStock: boolean;
};

type ProductRow = {
  id: string;
  name: string;
  category: string;
  price: number;
  original_price: number | null;
  rating: number | null;
  reviews: number | null;
  description: string;
  features: string[] | null;
  colors: { name: string; swatch: string }[] | null;
  sizes: string[] | null;
  tag: string | null;
  image: string;
  in_stock: boolean | null;
};

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL;
}

function getSupabaseAnonKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

export function productRowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: row.price,
    originalPrice: row.original_price ?? undefined,
    rating: row.rating ?? 0,
    reviews: row.reviews ?? 0,
    description: row.description,
    features: row.features ?? [],
    colors: row.colors ?? [],
    sizes: row.sizes ?? [],
    tag: row.tag ?? undefined,
    image: row.image,
    inStock: row.in_stock ?? true,
  };
}

export async function getPublishedProducts() {
  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();

  if (!url || !anonKey) return [];

  const supabase = createClient(url, anonKey);
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, name, category, price, original_price, rating, reviews, description, features, colors, sizes, tag, image, in_stock"
    )
    .eq("in_stock", true)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return (data as ProductRow[]).map(productRowToProduct);
}

export async function getFeaturedProducts(limit = 4) {
  const products = await getPublishedProducts();

  return products.slice(0, limit);
}
