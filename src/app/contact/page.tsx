import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";

const contactCards = [
  {
    title: "WhatsApp + Calls",
    value: "0704444845",
    description: "Best for WhatsApp chats, quick questions, and direct order conversations.",
    icon: Phone,
  },
  {
    title: "Other Calls",
    value: "0790084845",
    description: "Use this line for additional calls and alternative contact support.",
    icon: MessageCircle,
  },
  {
    title: "Email Us",
    value: "jamiebanku10@gmail.com",
    description: "Send artwork notes, quote requests, and detailed project information here.",
    icon: Mail,
  },
];

const businessNotes = [
  "Monday to Saturday support for order discussions and production planning",
  "Fast guidance on print methods, item choices, and artwork direction",
  "Helpful for custom branding, business wear, events, and merch requests",
];

const reasonsToReachOut = [
  {
    title: "Need a Quote",
    description:
      "If you already know the product, quantity, or deadline, we can help you map out the next step quickly.",
  },
  {
    title: "Need Direction",
    description:
      "If you are unsure which product or service fits your design, we can point you toward the right combination.",
  },
  {
    title: "Need Updates",
    description:
      "Already placed an order? Reach out for follow-up, production progress, or clarification.",
  },
];

export default function ContactPage() {
  return (
    <main className="bg-[hsl(0,0%,100%)] text-[hsl(0,0%,7%)]">
      <section className="relative overflow-hidden bg-[hsl(0,0%,7%)] pb-24 pt-32 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_hsla(355,82%,56%,0.28),_transparent_34%),radial-gradient(circle_at_82%_18%,_hsla(24,95%,53%,0.24),_transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
              <BadgeCheck className="h-4 w-4 text-[hsl(24,95%,53%)]" />
              Reach us for orders, quotes, brand work, and creative guidance
            </div>

            <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
              Let&apos;s talk about
              <span className="bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] bg-clip-text text-transparent">
                {" "}
                your next print project
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg text-white/80 md:text-xl">
              Whether you need a quote, creative advice, or help choosing the
              right product and print method, we&apos;re easy to reach and ready
              to help.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/order"
                className="rounded-xl bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-6 py-3 font-semibold text-white transition hover:opacity-90"
              >
                Start an Order
              </Link>
              <Link
                href="/services"
                className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-[hsl(0,0%,7%)]"
              >
                View Services
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(24,95%,53%)]">
              Quick Info
            </p>
            <div className="mt-6 space-y-4">
              {businessNotes.map((note) => (
                <div key={note} className="flex gap-3 rounded-2xl bg-white/5 p-4">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(24,95%,53%)]" />
                  <p className="text-sm leading-6 text-white/80">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid gap-8 lg:grid-cols-3">
          {contactCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className="rounded-[2rem] border border-[hsl(0,0%,92%)] bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="inline-flex rounded-2xl bg-[hsl(0,0%,7%)] p-4 text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(355,82%,56%)]">
                  {card.title}
                </p>
                <h2 className="mt-4 text-3xl font-bold">{card.value}</h2>
                <p className="mt-4 text-base leading-7 text-[hsl(0,0%,7%,0.7)]">
                  {card.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-[hsl(0,0%,97%)] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-[hsl(0,0%,92%)] bg-white p-8 shadow-sm md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(355,82%,56%)]">
              Send a Message
            </p>
            <h2 className="mt-4 text-4xl font-bold md:text-5xl">
              Contact us for quotes, questions, or custom ideas
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-[hsl(0,0%,7%,0.68)]">
              This gives your contact page a clean premium layout now, and it can
              later be wired to email, WhatsApp, or a backend form handler.
            </p>

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
                    Subject
                  </span>
                  <input
                    type="text"
                    placeholder="Quote, inquiry, branding help..."
                    className="rounded-xl border border-[hsl(0,0%,86%)] px-4 py-3 outline-none transition focus:border-[hsl(355,82%,56%)]"
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[hsl(0,0%,25%)]">
                  Message
                </span>
                <textarea
                  rows={6}
                  placeholder="Tell us what you need, what you want to print, and any deadline or quantity details."
                  className="rounded-2xl border border-[hsl(0,0%,86%)] px-4 py-3 outline-none transition focus:border-[hsl(355,82%,56%)]"
                />
              </label>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-6 py-3 font-semibold text-white transition hover:opacity-90"
                >
                  Send Message
                </button>
                <p className="text-sm text-[hsl(0,0%,7%,0.55)]">
                  We&apos;ll get back to you as soon as possible.
                </p>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] bg-[hsl(0,0%,7%)] p-8 text-white md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(24,95%,53%)]">
                Best Reasons To Reach Out
              </p>
              <div className="mt-8 space-y-4">
                {reasonsToReachOut.map((item) => (
                  <div key={item.title} className="rounded-2xl bg-white/5 p-5">
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-white/80">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[hsl(0,0%,92%)] bg-white p-8 shadow-sm md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(355,82%,56%)]">
                Direct Contact
              </p>
              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-4">
                  <Phone className="mt-1 h-5 w-5 text-[hsl(355,82%,56%)]" />
                  <div>
                    <p className="font-semibold">WhatsApp and Calls</p>
                    <p className="mt-1 text-sm text-[hsl(0,0%,7%,0.68)]">
                      0704444845
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="mt-1 h-5 w-5 text-[hsl(355,82%,56%)]" />
                  <div>
                    <p className="font-semibold">Other Calls</p>
                    <p className="mt-1 text-sm text-[hsl(0,0%,7%,0.68)]">
                      0790084845
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-5 w-5 text-[hsl(355,82%,56%)]" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="mt-1 text-sm text-[hsl(0,0%,7%,0.68)]">
                      Swift Plaza, SD 148
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock3 className="mt-1 h-5 w-5 text-[hsl(355,82%,56%)]" />
                  <div>
                    <p className="font-semibold">Availability</p>
                    <p className="mt-1 text-sm text-[hsl(0,0%,7%,0.68)]">
                      Monday to Saturday for consultations and order support
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="mt-1 h-5 w-5 text-[hsl(355,82%,56%)]" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="mt-1 text-sm text-[hsl(0,0%,7%,0.68)]">
                      jamiebanku10@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://www.instagram.com/ink_n_apparels/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[hsl(0,0%,88%)] px-4 py-2 text-sm font-medium text-[hsl(0,0%,28%)] transition hover:border-[hsl(355,82%,56%)] hover:text-[hsl(355,82%,56%)]"
                >
                  Instagram
                </a>
                <a
                  href="https://www.tiktok.com/@ink_n_apparelsventures"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[hsl(0,0%,88%)] px-4 py-2 text-sm font-medium text-[hsl(0,0%,28%)] transition hover:border-[hsl(355,82%,56%)] hover:text-[hsl(355,82%,56%)]"
                >
                  TikTok
                </a>
              </div>

              <Link
                href="/order"
                className="mt-10 inline-flex items-center gap-2 font-semibold text-[hsl(355,82%,56%)] transition hover:gap-3"
              >
                Prefer to send an order request?
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 pt-20">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-8 py-14 text-center text-white shadow-2xl md:px-16">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/80">
            Ready To Move?
          </p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            If you already know what you need, jump straight into the order page
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90">
            Contact is perfect for questions and consultations. If you&apos;re
            ready to start a job, the order page will help you structure the request.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/order"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-[hsl(355,82%,56%)] transition hover:bg-white/90"
            >
              Go To Order Page
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/35 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Explore Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
