import type { Metadata } from "next";
import ProductsCatalog from "../components/products/products-catalog";
import { getPublishedProducts } from "../../lib/products";
import { buildMetadata } from "../../lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Products",
  description:
    "Browse custom t-shirts, hoodies, caps, corporate wear, uniforms, and promotional products available from Ink & Apparels.",
  path: "/products",
  keywords: [
    "custom t-shirts Uganda",
    "hoodies and caps printing",
    "corporate wear Uganda",
    "promotional products Uganda",
  ],
});

export default async function ProductsPage() {
  const databaseProducts = await getPublishedProducts();

  return <ProductsCatalog initialProducts={databaseProducts} />;
}
