import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="w-full min-h-screen flex items-center pt-24 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/shirts.jpg')" }}
    >
      {/* Dark Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/80"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        {/* CONTENT */}
        <div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
            Custom Prints That{" "}
            <span className="bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] bg-clip-text text-transparent">
              Speak Your Style
            </span>
          </h1>

          <p className="mt-6 text-lg text-white text-opacity-90">
            From T-shirts to hoodies, caps to corporate wear — we bring your
            ideas to life with premium printing and creative designs.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/order"
              className="px-6 py-3 rounded-lg text-white bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] hover:opacity-90 transition"
            >
              Order Now
            </Link>

            <Link
              href="/products"
              className="px-6 py-3 rounded-lg border border-white text-white hover:bg-white hover:text-black transition"
            >
              View Designs
            </Link>
          </div>

          {/* TRUST POINTS */}
         
        </div>
      </div>
    </section>
  );
}
