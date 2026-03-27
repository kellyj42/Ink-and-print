import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Palette,
  Shirt,
  Sparkles,
  Star,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    category: "Apparel",
    price: "$29.99",
    originalPrice: "$39.99",
    rating: 4.8,
    reviews: 124,
    description:
      "Ultra-soft cotton tee with clean structure and print-friendly surface for bold everyday branding.",
    features: ["Soft-touch finish", "Pre-shrunk", "Strong color hold"],
    colors: [
      { name: "White", swatch: "#f5f5f5" },
      { name: "Black", swatch: "#141414" },
      { name: "Navy", swatch: "#243b72" },
      { name: "Red", swatch: "#d63a3a" },
    ],
    tag: "Most Popular",
  },
  {
    id: 2,
    name: "Signature Hoodie",
    category: "Streetwear",
    price: "$59.99",
    originalPrice: "$79.99",
    rating: 4.9,
    reviews: 89,
    description:
      "Heavyweight comfort with premium structure, ideal for oversized prints, logos, and branded merch drops.",
    features: ["Warm inner fleece", "Premium fit", "Long-wear fabric"],
    colors: [
      { name: "Charcoal", swatch: "#424242" },
      { name: "Black", swatch: "#101010" },
      { name: "Cream", swatch: "#ece6d8" },
      { name: "Olive", swatch: "#5d6741" },
    ],
    tag: "New Drop",
  },
  {
    id: 3,
    name: "Classic Baseball Cap",
    category: "Accessories",
    price: "$24.99",
    originalPrice: "$34.99",
    rating: 4.7,
    reviews: 156,
    description:
      "A structured cap made for embroidery, vinyl details, and clean front-facing logo placement.",
    features: ["Adjustable fit", "Structured crown", "Clean stitch finish"],
    colors: [
      { name: "Black", swatch: "#161616" },
      { name: "Navy", swatch: "#233b6e" },
      { name: "White", swatch: "#f7f7f7" },
      { name: "Burgundy", swatch: "#6a1f2b" },
    ],
    tag: "Easy Branding",
  },
  {
    id: 4,
    name: "Corporate Polo",
    category: "Business",
    price: "$45.99",
    originalPrice: "$59.99",
    rating: 4.6,
    reviews: 78,
    description:
      "Smart, presentation-ready polo for staff uniforms, activations, and polished corporate wear.",
    features: ["Wrinkle resistant", "Easy care", "Office-ready finish"],
    colors: [
      { name: "White", swatch: "#f8f8f8" },
      { name: "Sky", swatch: "#8ebde8" },
      { name: "Grey", swatch: "#9ea1a8" },
      { name: "Black", swatch: "#161616" },
    ],
    tag: "Team Favorite",
  },
];

const categoryPills = ["Apparel", "Streetwear", "Accessories", "Business"];

const stats = [
  { label: "Average rating", value: "4.8/5" },
  { label: "Custom-ready styles", value: "20+" },
  { label: "Bulk and one-off orders", value: "Flexible" },
];

const reasons = [
  {
    title: "Print-Ready Selection",
    description:
      "We pick products that take color well, wear well, and keep their finish after repeated use.",
    icon: Sparkles,
  },
  {
    title: "Brand-Friendly Styling",
    description:
      "From minimalist logo placements to full graphic statements, the range supports different brand directions.",
    icon: Palette,
  },
  {
    title: "Comfort Meets Durability",
    description:
      "Good fabric feel matters just as much as appearance, especially for uniforms, merch, and everyday wear.",
    icon: Shirt,
  },
];

export default function ProductsPage() {
  return (
    <main className="bg-[hsl(0,0%,100%)] text-[hsl(0,0%,7%)]">
      <section className="relative overflow-hidden bg-[hsl(0,0%,7%)] pb-24 pt-32 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_hsla(355,82%,56%,0.26),_transparent_34%),radial-gradient(circle_at_85%_18%,_hsla(24,95%,53%,0.22),_transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
              <BadgeCheck className="h-4 w-4 text-[hsl(24,95%,53%)]" />
              Curated apparel and accessories for custom print work
            </div>

            <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
              Products that look
              <span className="bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] bg-clip-text text-transparent">
                {" "}
                premium before and after print
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg text-white/80 md:text-xl">
              Explore blanks and ready-to-brand pieces designed for fashion
              labels, team wear, promotions, and polished everyday merch.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/order"
                className="rounded-xl bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-6 py-3 font-semibold text-white transition hover:opacity-90"
              >
                Start Custom Order
              </Link>
              <Link
                href="/services"
                className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-[hsl(0,0%,7%)]"
              >
                See Print Services
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <p className="text-sm uppercase tracking-[0.25em] text-white/55">
                  {stat.label}
                </p>
                <p className="mt-4 text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(355,82%,56%)]">
              Collection Focus
            </p>
            <h2 className="mt-3 text-4xl font-bold md:text-5xl">
              Made to support branding, merch, and standout wear
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {categoryPills.map((category) => (
              <span
                key={category}
                className="rounded-full border border-[hsl(0,0%,88%)] bg-[hsl(0,0%,98%)] px-5 py-2 text-sm font-medium text-[hsl(0,0%,30%)]"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-[2rem] border border-[hsl(0,0%,92%)] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative h-80 overflow-hidden bg-[linear-gradient(180deg,_hsl(0,0%,95%),_hsl(0,0%,90%))]">
                <Image
                  src="/shirts.jpg"
                  alt={product.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0" />

                <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[hsl(0,0%,7%)]">
                  {product.tag}
                </div>

                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-[hsl(0,0%,7%)]/80 px-3 py-2 text-xs font-medium text-white backdrop-blur">
                  <Star className="h-4 w-4 fill-[hsl(45,100%,60%)] text-[hsl(45,100%,60%)]" />
                  {product.rating} rating
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[hsl(355,82%,56%)]">
                      {product.category}
                    </p>
                    <h3 className="mt-3 text-2xl font-bold">{product.name}</h3>
                  </div>
                  <span className="text-sm text-[hsl(0,0%,7%,0.55)]">
                    {product.reviews} reviews
                  </span>
                </div>

                <p className="mt-4 text-sm leading-7 text-[hsl(0,0%,7%,0.7)]">
                  {product.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {product.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full bg-[hsl(0,0%,96%)] px-3 py-1 text-xs font-medium text-[hsl(0,0%,35%)]"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(0,0%,45%)]">
                      Available Colors
                    </p>
                    <div className="mt-2 flex gap-2">
                      {product.colors.map((color) => (
                        <span
                          key={color.name}
                          title={color.name}
                          className="h-5 w-5 rounded-full border border-black/10"
                          style={{ backgroundColor: color.swatch }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-[hsl(0,0%,7%)]">
                      {product.price}
                    </p>
                    <p className="text-sm text-[hsl(0,0%,50%)] line-through">
                      {product.originalPrice}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <Link
                    href="/order"
                    className="flex-1 rounded-xl bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-4 py-3 text-center font-semibold text-white transition hover:opacity-90"
                  >
                    Order This
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center rounded-xl border border-[hsl(0,0%,85%)] px-4 py-3 font-semibold text-[hsl(0,0%,20%)] transition hover:border-[hsl(355,82%,56%)] hover:text-[hsl(355,82%,56%)]"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[hsl(0,0%,97%)] py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <article
                key={reason.title}
                className="rounded-[2rem] border border-[hsl(0,0%,92%)] bg-white p-8 shadow-sm"
              >
                <div className="inline-flex rounded-2xl bg-[hsl(0,0%,7%)] p-4 text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-2xl font-bold">{reason.title}</h3>
                <p className="mt-4 text-base leading-7 text-[hsl(0,0%,7%,0.7)]">
                  {reason.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] bg-[hsl(0,0%,7%)] p-8 text-white md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(24,95%,53%)]">
              Best For
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Teams, brands, campaigns, and custom drops that need a clean finish
            </h2>

            <div className="mt-8 grid gap-4">
              {[
                "Branded staff uniforms and corporate kits",
                "Fashion collections and creative merch runs",
                "Event apparel, gifts, and activation pieces",
                "Small-batch custom orders with polished presentation",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-white/5 p-4">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(24,95%,53%)]" />
                  <p className="text-sm leading-6 text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[hsl(0,0%,92%)] bg-white p-8 md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(355,82%,56%)]">
              Need Guidance?
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              We can help match the right product to the right print method
            </h2>
            <p className="mt-4 text-lg text-[hsl(0,0%,7%,0.68)]">
              If you already know the look you want, we&apos;ll recommend the
              best blank, finish, and service combination for your budget and
              deadline.
            </p>

            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-2 font-semibold text-[hsl(355,82%,56%)] transition hover:gap-3"
            >
              Talk to us about product options
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-8 py-14 text-center text-white shadow-2xl md:px-16">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/80">
            Start Your Next Piece
          </p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            Choose a product, send your artwork, and we&apos;ll handle the finish
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90">
            Whether you&apos;re ordering one statement item or building a full
            branded batch, we&apos;ll help you make it look sharp.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/order"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-[hsl(355,82%,56%)] transition hover:bg-white/90"
            >
              Place an Order
            </Link>
            <Link
              href="/services"
              className="rounded-xl border border-white/35 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Compare Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
