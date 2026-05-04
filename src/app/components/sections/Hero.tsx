import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen w-full items-center bg-cover bg-center bg-no-repeat pt-24"
      style={{ backgroundImage: "url('/products/company/hoodie-collection.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/80" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
        <div>
          <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
            Custom Prints That{" "}
            <span className="bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] bg-clip-text text-transparent">
              Speak Your Style
            </span>
          </h1>

          <p className="mt-6 text-lg text-white/90">
            From T-shirts to hoodies, polos to workwear, we bring your ideas to
            life with premium printing and creative designs.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/order"
              className="rounded-lg bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-6 py-3 text-white transition hover:opacity-90"
            >
              Order Now
            </Link>

            <Link
              href="/products"
              className="rounded-lg border border-white px-6 py-3 text-white transition hover:bg-white hover:text-black"
            >
              View Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
