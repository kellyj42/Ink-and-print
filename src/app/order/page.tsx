import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  FileImage,
  MessageSquareText,
  PackageCheck,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";

const steps = [
  "Tell us what item you want, quantity, and preferred service.",
  "Share your design details, colors, sizes, and deadline.",
  "We confirm the best setup, pricing direction, and production plan.",
  "Once approved, we move your order into print and finishing.",
];

const serviceOptions = [
  "DTF Printing",
  "UV Printing",
  "Vinyl Cutting",
  "Sublimation",
  "Corporate Branding",
  "Custom Apparel",
];

const orderNotes = [
  {
    title: "Fast Response",
    description: "We review incoming requests quickly and guide you on the next step.",
    icon: Clock3,
  },
  {
    title: "Artwork Support",
    description: "Need help refining your idea or placement? We can help shape it before production.",
    icon: FileImage,
  },
  {
    title: "Quality Check",
    description: "Every order is reviewed for finish, color, and overall presentation before delivery.",
    icon: ShieldCheck,
  },
];

export default function OrderPage() {
  return (
    <main className="bg-[hsl(0,0%,100%)] text-[hsl(0,0%,7%)]">
      <section className="relative overflow-hidden bg-[hsl(0,0%,7%)] pb-24 pt-32 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_hsla(355,82%,56%,0.28),_transparent_34%),radial-gradient(circle_at_82%_18%,_hsla(24,95%,53%,0.22),_transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
              <BadgeCheck className="h-4 w-4 text-[hsl(24,95%,53%)]" />
              Custom print requests for one-off pieces and bulk orders
            </div>

            <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
              Start your
              <span className="bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] bg-clip-text text-transparent">
                {" "}
                order the easy way
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg text-white/80 md:text-xl">
              Send us the basics of what you need and we&apos;ll help shape the
              right product, print method, and production flow for your project.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="rounded-xl bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-6 py-3 font-semibold text-white transition hover:opacity-90"
              >
                Browse Products
              </Link>
              <Link
                href="/services"
                className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-[hsl(0,0%,7%)]"
              >
                Compare Services
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(24,95%,53%)]">
              What To Prepare
            </p>
            <div className="mt-6 space-y-4">
              {[
                "Product type or item idea",
                "Estimated quantity and sizes",
                "Logo, artwork, or design direction",
                "Preferred deadline or event date",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-white/5 p-4">
                  <PackageCheck className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(24,95%,53%)]" />
                  <p className="text-sm leading-6 text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-[hsl(0,0%,92%)] bg-white p-8 shadow-sm md:p-10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(355,82%,56%)]">
                  Order Request
                </p>
                <h2 className="mt-4 text-4xl font-bold md:text-5xl">
                  Tell us what you want to print
                </h2>
                <p className="mt-4 max-w-2xl text-lg text-[hsl(0,0%,7%,0.68)]">
                  This form is a clean starting point for custom requests, quotes,
                  and production planning.
                </p>
              </div>

              <div className="hidden rounded-2xl bg-[hsl(0,0%,96%)] p-4 lg:block">
                <Send className="h-6 w-6 text-[hsl(355,82%,56%)]" />
              </div>
            </div>

            <form className="mt-10 grid gap-6">
              <div className="grid gap-6 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-[hsl(0,0%,25%)]">
                    Full Name
                  </span>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="rounded-xl border border-[hsl(0,0%,86%)] px-4 py-3 outline-none transition focus:border-[hsl(355,82%,56%)]"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-[hsl(0,0%,25%)]">
                    Phone Number
                  </span>
                  <input
                    type="tel"
                    placeholder="07XXXXXXXX"
                    className="rounded-xl border border-[hsl(0,0%,86%)] px-4 py-3 outline-none transition focus:border-[hsl(355,82%,56%)]"
                  />
                </label>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-[hsl(0,0%,25%)]">
                    Email Address
                  </span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="rounded-xl border border-[hsl(0,0%,86%)] px-4 py-3 outline-none transition focus:border-[hsl(355,82%,56%)]"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-[hsl(0,0%,25%)]">
                    Preferred Service
                  </span>
                  <select className="rounded-xl border border-[hsl(0,0%,86%)] bg-white px-4 py-3 outline-none transition focus:border-[hsl(355,82%,56%)]">
                    <option>Select a service</option>
                    {serviceOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <label className="grid gap-2 md:col-span-1">
                  <span className="text-sm font-semibold text-[hsl(0,0%,25%)]">
                    Product Type
                  </span>
                  <input
                    type="text"
                    placeholder="T-shirt, mug, hoodie..."
                    className="rounded-xl border border-[hsl(0,0%,86%)] px-4 py-3 outline-none transition focus:border-[hsl(355,82%,56%)]"
                  />
                </label>

                <label className="grid gap-2 md:col-span-1">
                  <span className="text-sm font-semibold text-[hsl(0,0%,25%)]">
                    Quantity
                  </span>
                  <input
                    type="number"
                    placeholder="e.g. 25"
                    className="rounded-xl border border-[hsl(0,0%,86%)] px-4 py-3 outline-none transition focus:border-[hsl(355,82%,56%)]"
                  />
                </label>

                <label className="grid gap-2 md:col-span-1">
                  <span className="text-sm font-semibold text-[hsl(0,0%,25%)]">
                    Needed By
                  </span>
                  <input
                    type="date"
                    className="rounded-xl border border-[hsl(0,0%,86%)] px-4 py-3 outline-none transition focus:border-[hsl(355,82%,56%)]"
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[hsl(0,0%,25%)]">
                  Order Details
                </span>
                <textarea
                  rows={6}
                  placeholder="Describe the design, colors, branding placement, sizes, and any special notes."
                  className="rounded-2xl border border-[hsl(0,0%,86%)] px-4 py-3 outline-none transition focus:border-[hsl(355,82%,56%)]"
                />
              </label>

              <div className="rounded-2xl bg-[hsl(0,0%,97%)] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(0,0%,45%)]">
                  Note
                </p>
                <p className="mt-2 text-sm leading-6 text-[hsl(0,0%,7%,0.68)]">
                  File upload and live submission can be connected next if you
                  want. For now, this page is designed as a polished order
                  request interface consistent with the rest of the site.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-6 py-3 font-semibold text-white transition hover:opacity-90"
                >
                  Send Order Request
                </button>
                <p className="text-sm text-[hsl(0,0%,7%,0.55)]">
                  We&apos;ll review your request and follow up with the next step.
                </p>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] bg-[hsl(0,0%,7%)] p-8 text-white md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(24,95%,53%)]">
                How It Works
              </p>
              <div className="mt-8 space-y-4">
                {steps.map((step, index) => (
                  <div key={step} className="flex gap-4 rounded-2xl bg-white/5 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-sm font-bold">
                      0{index + 1}
                    </div>
                    <p className="text-sm leading-6 text-white/80">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[hsl(0,0%,92%)] bg-white p-8 shadow-sm md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(355,82%,56%)]">
                Need Help First?
              </p>
              <h3 className="mt-4 text-3xl font-bold">
                We can guide you before you place the request
              </h3>
              <div className="mt-6 space-y-4">
                {orderNotes.map((note) => {
                  const Icon = note.icon;

                  return (
                    <div key={note.title} className="flex gap-4">
                      <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[hsl(0,0%,96%)]">
                        <Icon className="h-5 w-5 text-[hsl(355,82%,56%)]" />
                      </div>
                      <div>
                        <p className="font-semibold">{note.title}</p>
                        <p className="mt-1 text-sm leading-6 text-[hsl(0,0%,7%,0.68)]">
                          {note.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 rounded-2xl bg-[hsl(0,0%,97%)] p-5">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[hsl(355,82%,56%)]" />
                  <p className="font-semibold">Call or WhatsApp</p>
                </div>
                <p className="mt-2 text-sm text-[hsl(0,0%,7%,0.68)]">
                  0704444845
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[hsl(0,0%,97%)] py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(355,82%,56%)]">
              Before You Submit
            </p>
            <h2 className="mt-4 text-4xl font-bold md:text-5xl">
              A little detail upfront helps us move faster
            </h2>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {[
              "If you have artwork, mention whether it is final or still needs adjustment.",
              "If you need multiple sizes or color variations, include that in the details.",
              "If the order is tied to an event date, share the exact deadline early.",
            ].map((tip) => (
              <div
                key={tip}
                className="rounded-[2rem] border border-[hsl(0,0%,92%)] bg-white p-8 shadow-sm"
              >
                <MessageSquareText className="h-6 w-6 text-[hsl(355,82%,56%)]" />
                <p className="mt-5 text-base leading-7 text-[hsl(0,0%,7%,0.7)]">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 pt-20">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-8 py-14 text-center text-white shadow-2xl md:px-16">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/80">
            Need More Context?
          </p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            Explore the products and services before sending your request
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90">
            If you&apos;re still deciding what to print on or which method fits
            best, we&apos;ve made it easy to compare your options first.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/products"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-[hsl(355,82%,56%)] transition hover:bg-white/90"
            >
              View Products
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/35 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Review Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
