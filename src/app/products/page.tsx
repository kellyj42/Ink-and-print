import ProductsCatalog from "../components/products/products-catalog";
import { products } from "../../data/products";

export default function ProductsPage() {
  return <ProductsCatalog initialProducts={products} />;
}
