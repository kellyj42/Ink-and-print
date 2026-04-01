import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { client } from "./client";

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

type SanityColorObject = { name: string; swatch?: string };

type SanityProduct = {
  _id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  description: string;
  features?: string[];
  colors?: Array<string | SanityColorObject>;
  sizes?: string[];
  tag?: string;
  image?: Image;
  inStock?: boolean;
};

const builder = imageUrlBuilder(client);

const colorSwatches: Record<string, string> = {
  White: "#f5f5f5",
  Black: "#141414",
  Navy: "#243b72",
  Red: "#d63a3a",
  Charcoal: "#424242",
  Cream: "#ece6d8",
  Olive: "#5d6741",
  Burgundy: "#6a1f2b",
  Grey: "#9ea1a8",
  Sky: "#8ebde8",
  "Royal Blue": "#2f56d3",
  Green: "#2f8f4e",
  Yellow: "#f3c742",
  Orange: "#e67e22",
  Purple: "#7d4ac7",
  Default: "#141414",
};

const productsQuery = groq`*[_type == "product"] | order(_createdAt desc) {
  _id,
  name,
  category,
  price,
  originalPrice,
  rating,
  reviews,
  description,
  features,
  colors,
  sizes,
  tag,
  image,
  inStock
}`;

export async function getProducts(): Promise<Product[]> {
  const products = await client.fetch<SanityProduct[]>(productsQuery);

  return products.map((product) => ({
    id: product._id,
    name: product.name,
    category: product.category,
    price: product.price,
    originalPrice: product.originalPrice,
    rating: product.rating ?? 4.5,
    reviews: product.reviews ?? 0,
    description: product.description,
    features: product.features ?? [],
    colors: product.colors?.length
      ? product.colors.map((color) => {
          if (typeof color === "string") {
            return {
              name: color,
              swatch: colorSwatches[color] ?? colorSwatches.Default,
            };
          }

          return {
            name: color.name,
            swatch:
              color.swatch ??
              colorSwatches[color.name] ??
              colorSwatches.Default,
          };
        })
      : [{ name: "Default", swatch: colorSwatches.Default }],
    sizes: product.sizes ?? [],
    tag: product.tag,
    image: product.image
      ? builder.image(product.image).width(800).height(800).fit("crop").url()
      : "/shirts.jpg",
    inStock: product.inStock ?? true,
  }));
}
