import Image from "next/image";
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
      <section className="px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-[hsl(0,0%,7%)] md:text-6xl">
          Our{" "}
          <span className="bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] bg-clip-text text-transparent">
            Printing Services
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-[hsl(0,0%,7%,0.7)]">
          We offer a range of modern printing solutions to bring your designs
          to life with precision, durability, and style.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pb-20 md:grid-cols-4">
        {services.map((service) => (
          <div
            key={service.title}
            className="group overflow-hidden rounded-2xl bg-[hsl(0,0%,95%)] transition hover:shadow-lg"
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-semibold text-[hsl(0,0%,7%)]">
                {service.title}
              </h2>
              <p className="mt-3 text-[hsl(0,0%,7%,0.7)]">
                {service.description}
              </p>

              <Link
                href="/order"
                className="mt-5 inline-block font-medium text-[hsl(355,82%,56%)] hover:underline"
              >
                Request This Service &rarr;
              </Link>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-[hsl(0,0%,7%)] px-4 py-16 text-center text-white">
        <h2 className="text-3xl font-bold md:text-4xl">
          Ready to Bring Your Design to Life?
        </h2>
        <p className="mt-4 text-[hsl(0,0%,100%,0.7)]">
          Let&apos;s create something amazing together. Place your order now or
          contact us for custom requests.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/order"
            className="rounded-lg bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-6 py-3 text-white transition hover:opacity-90"
          >
            Order Now
          </Link>

          <Link
            href="/contact"
            className="rounded-lg border border-white px-6 py-3 transition hover:bg-white hover:text-[hsl(0,0%,7%)]"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
