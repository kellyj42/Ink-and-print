import type { Metadata } from "next";
import Link from "next/link";
import { MailCheck, ArrowRight } from "lucide-react";
import { buildMetadata } from "../../lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Confirm Your Email",
  description: "Check your inbox to confirm your account email address.",
  path: "/confirm-email",
  noIndex: true,
});

export default function ConfirmEmailPage() {
  return (
    <main className="bg-[hsl(0,0%,99%)] px-4 pb-20 pt-10 text-[hsl(0,0%,7%)]">
      <section className="mx-auto max-w-3xl rounded-[2.5rem] border border-[hsl(0,0%,92%)] bg-white p-8 text-center shadow-sm md:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[hsl(355,82%,96%)] text-[hsl(355,82%,48%)]">
          <MailCheck className="h-8 w-8" />
        </div>
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(355,82%,56%)]">
          Confirm Email
        </p>
        <h1 className="mt-4 text-4xl font-bold md:text-5xl">
          Check your inbox to finish creating your account
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[hsl(0,0%,7%,0.65)]">
          We sent a confirmation link to the email address you used during
          signup. Open that email and confirm your account, then come back to
          sign in.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Go to Login
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-[hsl(0,0%,84%)] px-6 py-3 font-semibold text-[hsl(0,0%,24%)] transition hover:border-[hsl(355,82%,56%)] hover:text-[hsl(355,82%,56%)]"
          >
            Need Help?
          </Link>
        </div>
      </section>
    </main>
  );
}
