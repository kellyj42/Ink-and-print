import Link from "next/link";

const services = [
  {
    title: "UV Printing",
    description:
      "High-quality direct printing on hard surfaces like mugs, pens, and promotional items. Perfect for branding and corporate gifts.",
    image: "/services/uv.jpg",
  },
  {
    title: "DTF Printing",
    description:
      "Direct-to-Film printing for vibrant, long-lasting designs on t-shirts, hoodies, and fabrics of all kinds.",
    image: "/services/dtf.jpg",
  },
  {
    title: "Vinyl Cutting",
    description:
      "Clean and durable designs using heat transfer vinyl. Ideal for bold text, logos, and sportswear.",
    image: "/services/vinyl.jpg",
  },
  {
    title: "Sublimation Printing",
    description:
      "Best for full-color designs on polyester fabrics and coated surfaces. Produces smooth, fade-resistant prints.",
    image: "/services/sublimation.jpg",
  },
];

export default function ServicesPage() {
  return (
    <div className="w-full bg-[hsl(0,0%,100%)] pt-24">
      
      {/* HERO */}
      <section className="text-center px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-[hsl(0,0%,7%)]">
          Our{" "}
          <span className="bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] bg-clip-text text-transparent">
            Printing Services
          </span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-[hsl(0,0%,7%,0.7)]">
          We offer a range of modern printing solutions to bring your designs to life with precision, durability, and style.
        </p>
      </section>

      {/* SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-4 pb-20 grid gap-10 grid-cols-1 md:grid-cols-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="group bg-[hsl(0,0%,95%)] rounded-2xl overflow-hidden hover:shadow-lg transition"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-[hsl(0,0%,7%)]">
                {service.title}
              </h2>
              <p className="mt-3 text-[hsl(0,0%,7%,0.7)]">
                {service.description}
              </p>

              <Link
                href="/order"
                className="inline-block mt-5 text-[hsl(355,82%,56%)] font-medium hover:underline"
              >
                Request This Service →
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* CTA SECTION */}
      <section className="text-center py-16 px-4 bg-[hsl(0,0%,7%)] text-white">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Bring Your Design to Life?
        </h2>
        <p className="mt-4 text-[hsl(0,0%,100%,0.7)]">
          Let’s create something amazing together. Place your order now or contact us for custom requests.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link
            href="/order"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] text-white hover:opacity-90 transition"
          >
            Order Now
          </Link>

          <Link
            href="/contact"
            className="px-6 py-3 rounded-lg border border-white hover:bg-white hover:text-[hsl(0,0%,7%)] transition"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}