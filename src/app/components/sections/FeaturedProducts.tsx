import Link from "next/link";

const products = [
  {
    name: "Custom T-Shirts",
    image: "/products/tshirt.jpg",
  },
  {
    name: "Hoodies",
    image: "/products/hoodie.jpg",
  },
  {
    name: "Caps",
    image: "/products/cap.jpg",
  },
  {
    name: "Corporate Shirts",
    image: "/products/shirt.jpg",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="w-full py-24 bg-gradient-to-b from-[hsl(0,0%,100%)] to-[hsl(0,0%,98%)]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          
          <h2 className="text-4xl md:text-6xl font-bold text-[hsl(0,0%,7%)]">
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
          <p className="mt-6 text-lg text-[hsl(0,0%,7%,0.6)] max-w-2xl mx-auto">
            Discover our carefully curated collection of premium custom apparel
            and branding solutions for your unique style.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-[hsl(0,0%,95%)]"
            >
              {/* Premium Badge */}
              <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] text-white text-xs font-bold px-3 py-1 rounded-full">
                Premium
              </div>

              {/* Image */}
              <div className="relative overflow-hidden h-72 bg-[hsl(0,0%,95%)]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700"
                />

                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,7%,0.6)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[hsl(0,0%,7%)] mb-3">
                  {product.name}
                </h3>

                {/* CTA */}
                <Link
                  href="/order"
                  className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-white bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Customize & Order →
                </Link>
              </div>

              {/* Premium shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-16">
          <Link
            href="/products"
            className="px-8 py-4 rounded-xl text-white font-bold bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
          >
            Explore All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
