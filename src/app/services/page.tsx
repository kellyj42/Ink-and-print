import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Layers3,
  Palette,
  Shirt,
  Sparkles,
  Zap,
} from "lucide-react";
import { buildMetadata } from "../../lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Explore DTF printing, UV printing, vinyl cutting, sublimation, and custom branding services from Ink & Apparels.",
  path: "/services",
  keywords: [
    "DTF printing Uganda",
    "UV printing Uganda",
    "vinyl cutting services",
    "sublimation printing Uganda",
  ],
});

const services = [
  {
    title: "UV Printing",
    description:
      "Sharp, durable branding on hard surfaces like mugs, bottles, keyholders, notebooks, and premium gift items.",
    idealFor: "Corporate gifting, merch drops, branded packaging",
    icon: Sparkles,
  },
  {
    title: "DTF Printing",
    description:
      "Rich color transfers for t-shirts, hoodies, jerseys, and everyday apparel with a soft finish and strong wash performance.",
    idealFor: "Fashion brands, events, staff uniforms, school wear",
    icon: Shirt,
  },
  {
    title: "Vinyl Cutting",
    description:
      "Bold lettering, clean logos, and standout numbering for uniforms and statement pieces that need crisp edges.",
    idealFor: "Sports kits, workwear, names, limited-run branding",
    icon: Zap,
  },
  {
    title: "Sublimation",
    description:
      "All-over color printing for polyester fabrics and coated products with smooth blends and lasting vibrancy.",
    idealFor: "Jerseys, custom gifts, promotional pieces, décor items",
    icon: Palette,
  },
];

const workflow = [
  "Share your concept, logo, quantity, and deadline.",
  "We refine the artwork, product choice, and print method.",
  "Production starts once the mockup and details are approved.",
  "We package, quality-check, and prepare your order for pickup or dispatch.",
];

const highlights = [
  "Fast turnaround for urgent print jobs",
  "Premium inks, films, vinyl, and blanks",
  "Creative support for artwork cleanup and placement",
  "Reliable output for one-offs and bulk orders",
];

const sectors = [
  "Fashion brands",
  "Schools and clubs",
  "Corporate teams",
  "Events and activations",
  "Small businesses",
  "Gift and promo campaigns",
];

export default function ServicesPage() {
  return (
    <main className="bg-[hsl(0,0%,100%)] text-[hsl(0,0%,7%)]">
      <section className="relative overflow-hidden bg-[hsl(0,0%,7%)] pt-32 pb-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_hsla(355,82%,56%,0.28),_transparent_34%),radial-gradient(circle_at_80%_20%,_hsla(24,95%,53%,0.24),_transparent_28%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[hsl(0,0%,7%)] to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/75 backdrop-blur">
                <BadgeCheck className="h-4 w-4 text-[hsl(24,95%,53%)]" />
                Print, branding, and apparel finishing under one roof
              </div>

              <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
                Services built for
                <span className="bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] bg-clip-text text-transparent">
                  {" "}
                  brands that want to stand out
                </span>
              </h1>

              <p className="mt-6 max-w-3xl text-lg text-white/80 md:text-xl">
                From single statement pieces to coordinated bulk runs, we help
                turn ideas into polished print products with speed, clarity, and
                a premium finish.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/order"
                  className="rounded-xl bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-6 py-3 font-semibold text-white transition hover:opacity-90"
                >
                  Start an Order
                </Link>
                <Link
                  href="/products"
                  className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-[hsl(0,0%,7%)]"
                >
                  Explore Products
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-white/10 p-3">
                    <Layers3 className="h-5 w-5 text-[hsl(24,95%,53%)]" />
                  </div>
                  <p className="text-sm leading-6 text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(355,82%,56%)]">
            Core Services
          </p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            The print methods we use to match the job, not force the job
          </h2>
          <p className="mt-4 text-lg text-[hsl(0,0%,7%,0.68)]">
            Every project has different material, color, durability, and budget
            needs. We guide you to the best process so the final result looks
            right and lasts.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="group rounded-[2rem] border border-[hsl(0,0%,92%)] bg-[linear-gradient(180deg,_hsl(0,0%,100%),_hsl(0,0%,98%))] p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex rounded-2xl bg-[hsl(0,0%,7%)] p-4 text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-[hsl(355,82%,56%,0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(355,82%,56%)]">
                    Best Seller
                  </span>
                </div>

                <h3 className="mt-8 text-3xl font-bold">{service.title}</h3>
                <p className="mt-4 text-base leading-7 text-[hsl(0,0%,7%,0.7)]">
                  {service.description}
                </p>

                <div className="mt-6 rounded-2xl bg-[hsl(0,0%,96%)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(0,0%,45%)]">
                    Ideal For
                  </p>
                  <p className="mt-2 text-sm text-[hsl(0,0%,7%,0.72)]">
                    {service.idealFor}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-[hsl(0,0%,97%)] py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(355,82%,56%)]">
              How We Work
            </p>
            <h2 className="mt-4 text-4xl font-bold md:text-5xl">
              A simple flow from idea to finished piece
            </h2>
            <p className="mt-4 text-lg text-[hsl(0,0%,7%,0.68)]">
              We keep the process collaborative and practical so you always know
              what is happening, what to approve, and when your order is moving.
            </p>
          </div>

          <div className="space-y-5">
            {workflow.map((step, index) => (
              <div
                key={step}
                className="flex gap-5 rounded-[1.75rem] border border-[hsl(0,0%,90%)] bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[hsl(0,0%,7%)] text-sm font-bold text-white">
                  0{index + 1}
                </div>
                <p className="pt-2 text-base leading-7 text-[hsl(0,0%,7%,0.72)]">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] bg-[hsl(0,0%,7%)] p-8 text-white md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(24,95%,53%)]">
              Why Clients Choose Us
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Reliable for both small custom jobs and scaled brand orders
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/80"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[hsl(0,0%,92%)] bg-white p-8 md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(355,82%,56%)]">
              Sectors We Serve
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Flexible enough for creative drops and structured brand work
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {sectors.map((sector) => (
                <span
                  key={sector}
                  className="rounded-full border border-[hsl(0,0%,88%)] bg-[hsl(0,0%,98%)] px-4 py-2 text-sm font-medium text-[hsl(0,0%,28%)]"
                >
                  {sector}
                </span>
              ))}
            </div>

            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-2 font-semibold text-[hsl(355,82%,56%)] transition hover:gap-3"
            >
              Talk to us about your project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-8 py-14 text-center text-white shadow-2xl md:px-16">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/80">
            Ready When You Are
          </p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            Let&apos;s turn your next concept into a finished print product
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90">
            Share the item, quantity, artwork, and deadline, and we&apos;ll help
            you choose the right service for the job.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/order"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-[hsl(355,82%,56%)] transition hover:bg-white/90"
            >
              Request a Quote
            </Link>
            <Link
              href="/products"
              className="rounded-xl border border-white/35 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              View Product Range
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
