import Image from "next/image";
import Link from "next/link";
import { products } from "../../../data/products";

export default function FeaturedProducts() {
  const featuredProducts = products.slice(0, 4);

  if (featuredProducts.length === 0) {
    return (
      <section className="w-full bg-gradient-to-b from-[hsl(0,0%,100%)] to-[hsl(0,0%,98%)] py-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-4xl font-bold text-[hsl(0,0%,7%)] md:text-6xl">
            Featured{" "}
            <span
              style={{
                background:
                  "linear-gradient(to right, hsl(355, 82%, 56%), hsl(24, 95%, 53%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Products
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[hsl(0,0%,7%,0.6)]">
            Add or edit products in the local static catalog and they&apos;ll
            appear here automatically.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/products"
              className="rounded-xl bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-8 py-4 font-bold text-white transition-opacity hover:opacity-90"
            >
              Open Product Page
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-gradient-to-b from-[hsl(0,0%,100%)] to-[hsl(0,0%,98%)] py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-[hsl(0,0%,7%)] md:text-6xl">
            Featured{" "}
            <span
              style={{
                background:
                  "linear-gradient(to right, hsl(355, 82%, 56%), hsl(24, 95%, 53%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Products
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[hsl(0,0%,7%,0.6)]">
            Discover our carefully curated collection of premium custom apparel
            and branding solutions for your unique style.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-3xl border border-[hsl(0,0%,95%)] bg-white shadow-md transition-all duration-500 hover:shadow-2xl"
            >
              <div className="absolute top-4 right-4 z-10 rounded-full bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-3 py-1 text-xs font-bold text-white">
                {product.tag || "Premium"}
              </div>

              <div className="relative h-72 overflow-hidden bg-[hsl(0,0%,95%)]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,7%,0.6)] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-[hsl(0,0%,7%)]">
                  {product.name}
                </h3>
                <p className="line-clamp-2 text-sm text-[hsl(0,0%,7%,0.6)]">
                  {product.description}
                </p>

                <Link
                  href="/order"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Customize & Order
                </Link>
              </div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/products"
            className="rounded-xl bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-8 py-4 font-bold text-white shadow-lg transition-opacity hover:opacity-90 hover:shadow-xl"
          >
            Explore All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
