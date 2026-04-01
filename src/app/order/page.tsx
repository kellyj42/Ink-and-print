import Link from "next/link";
import {
  ArrowRight,
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
      <section className="border-b border-[hsl(0,0%,92%)] bg-[hsl(0,0%,99%)] pt-28 pb-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(355,82%,56%)]">
                Place Order
              </p>
              <h1 className="mt-3 text-4xl font-bold md:text-5xl">
                Fill in your request and let&apos;s move into production
              </h1>
              <p className="mt-4 text-lg text-[hsl(0,0%,7%,0.68)]">
                This page is now built to feel direct and practical, so the client
                lands on the order flow quickly instead of reading through a full hero.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="rounded-xl bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-5 py-3 font-semibold text-white transition hover:opacity-90"
              >
                Browse Products
              </Link>
              <Link
                href="/services"
                className="rounded-xl border border-[hsl(0,0%,85%)] px-5 py-3 font-semibold text-[hsl(0,0%,20%)] transition hover:border-[hsl(355,82%,56%)] hover:text-[hsl(355,82%,56%)]"
              >
                Compare Services
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              "Product type or item idea",
              "Estimated quantity and sizes",
              "Logo, artwork, or design direction",
              "Preferred deadline or event date",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[1.5rem] border border-[hsl(0,0%,90%)] bg-white p-5 shadow-sm"
              >
                <div className="flex gap-3">
                  <PackageCheck className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(355,82%,56%)]" />
                  <p className="text-sm leading-6 text-[hsl(0,0%,7%,0.72)]">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-[hsl(0,0%,92%)] bg-white p-8 shadow-sm md:p-10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(355,82%,56%)]">
                  Order Form
                </p>
                <h2 className="mt-4 text-4xl font-bold md:text-5xl">
                  Tell us what you want to print
                </h2>
                <p className="mt-4 max-w-2xl text-lg text-[hsl(0,0%,7%,0.68)]">
                  The faster the request is filled, the faster we can price,
                  confirm, and move your work forward.
                </p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(355,82%,56%)]">
                  All quotes and pricing are shared in UGX
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
                  request interface consistent with the rest of the site, and
                  all pricing is communicated in UGX.
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
                  <p className="font-semibold">Contact Lines</p>
                </div>
                <div className="mt-2 space-y-1 text-sm text-[hsl(0,0%,7%,0.68)]">
                  <p>WhatsApp and calls: 0704444845</p>
                  <p>Other calls: 0790084845</p>
                  <p className="break-all">Email: jamiebanku10@gmail.com</p>
                </div>
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
