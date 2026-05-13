import Link from "next/link";
import type { SiteSettings } from "../../../lib/site-settings";

export default function Hero({ settings }: { settings: SiteSettings }) {
  return (
    <section
      className="relative flex min-h-screen w-full items-center bg-cover bg-center bg-no-repeat pt-24"
      style={{ backgroundImage: "url('/products/company/hoodie-collection.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/80" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
        <div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-white/75">
            {settings.heroEyebrow}
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
            <span className="bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] bg-clip-text text-transparent">
              {settings.heroHeadline}
            </span>
          </h1>

          <p className="mt-6 text-lg text-white/90">
            {settings.heroDescription}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/order"
              className="rounded-lg bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-6 py-3 text-white transition hover:opacity-90"
            >
              {settings.heroCtaText}
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
