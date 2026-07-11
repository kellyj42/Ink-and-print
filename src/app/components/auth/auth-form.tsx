"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { createSupabaseBrowserClient } from "../../../lib/supabase/client";

type AuthMode = "login" | "signup";

type AuthFormProps = {
  mode: AuthMode;
};

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const benefits = [
  "Save your preferred products and order details",
  "Speed up repeat orders and branded team requests",
  "Keep your contact and delivery information ready",
];

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const isSignup = mode === "signup";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const pageCopy = useMemo(
    () =>
      isSignup
        ? {
            label: "Create Account",
            title: "Set up your account",
            description:
              "Create a simple customer account so future orders, quotes, and contact details are easier to manage.",
            submit: "Create Account",
            footerText: "Already have an account?",
            footerLinkLabel: "Sign in",
            footerLinkHref: "/login",
          }
        : {
            label: "Welcome Back",
            title: "Sign in to continue",
            description:
              "Log in to continue managing your order requests and come back to your saved details more quickly.",
            submit: "Sign In",
            footerText: "Need an account?",
            footerLinkLabel: "Create one",
            footerLinkHref: "/signup",
          },
    [isSignup],
  );

  useEffect(() => {
    let ignore = false;

    async function redirectSignedInUser() {
      const supabase = createSupabaseBrowserClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!ignore && session?.user) {
        router.replace("/profile");
        router.refresh();
      }
    }

    redirectSignedInUser();

    return () => {
      ignore = true;
    };
  }, [router]);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  async function ensureUserProfile(
    supabaseClient: ReturnType<typeof createSupabaseBrowserClient>,
    userId: string,
    email: string,
  ) {
    const payload = {
      id: userId,
      email,
      full_name: form.fullName.trim() || null,
      phone: form.phone.trim() || null,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabaseClient
      .from("profiles")
      .upsert(payload, { onConflict: "id" });

    if (error) {
      console.error("Could not create or update profile row:", error);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!form.email.trim() || !form.password.trim()) {
      setError("Please fill in your email and password.");
      return;
    }

    if (isSignup) {
      if (!form.fullName.trim()) {
        setError("Please enter your full name.");
        return;
      }

      if (form.password.length < 6) {
        setError("Password should be at least 6 characters.");
        return;
      }

      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const supabase = createSupabaseBrowserClient();

      if (isSignup) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: form.email.trim(),
          password: form.password,
          options: {
            data: {
              full_name: form.fullName.trim(),
              phone: form.phone.trim(),
            },
          },
        });

        if (signUpError) {
          setError(signUpError.message);
          return;
        }

        if (data.user?.id) {
          await ensureUserProfile(supabase, data.user.id, form.email.trim());
        }

        if (data.session) {
          setMessage("Account created successfully. Redirecting to admin...");
          router.push("/admin");
          router.refresh();
          return;
        }

        setMessage(
          "Account created. Check your email for a confirmation link.",
        );
        router.push("/confirm-email");
        router.refresh();
        return;
      }

      const { data: loginData, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: form.email.trim(),
          password: form.password,
        });

      if (loginError) {
        setError(loginError.message);
        return;
      }

      if (loginData.user?.id) {
        await ensureUserProfile(
          supabase,
          loginData.user.id,
          loginData.user.email ?? form.email.trim(),
        );
      }

      setMessage("Login successful. Redirecting to admin...");
      router.push("/admin");
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong while connecting to authentication.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="bg-[hsl(0,0%,99%)] px-4 pb-20 pt-32 text-[hsl(0,0%,7%)]">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="relative overflow-hidden rounded-[2.5rem] bg-[hsl(0,0%,7%)] p-8 text-white shadow-2xl md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_hsla(355,82%,56%,0.28),_transparent_34%),radial-gradient(circle_at_85%_15%,_hsla(24,95%,53%,0.24),_transparent_28%)]" />
          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[hsl(24,95%,53%)]">
              {pageCopy.label}
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
              {pageCopy.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/80">
              {pageCopy.description}
            </p>

            <div className="mt-10 space-y-4">
              {benefits.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                >
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(24,95%,53%)]" />
                  <p className="text-sm leading-6 text-white/85">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl bg-white/5 p-5 text-sm leading-6 text-white/75">
              These forms now use Supabase authentication. Add your Supabase URL
              and anon key to `.env.local` if they are not set yet.
            </div>
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-[hsl(0,0%,92%)] bg-white p-8 shadow-sm md:p-12">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(355,82%,56%)]">
              Account Access
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              {isSignup ? "Create your details" : "Enter your details"}
            </h2>
            <p className="mt-4 text-base leading-7 text-[hsl(0,0%,7%,0.65)]">
              Use the form below to {isSignup ? "create" : "access"} your
              customer account.
            </p>
          </div>

          <form className="mt-10 grid gap-6" onSubmit={handleSubmit}>
            {isSignup ? (
              <label className="grid gap-2">
                <span className="text-sm font-semibold">Full Name</span>
                <div className="flex items-center rounded-xl border border-[hsl(0,0%,86%)] px-4">
                  <User className="h-4 w-4 text-[hsl(0,0%,48%)]" />
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(event) =>
                      updateField("fullName", event.target.value)
                    }
                    placeholder="Your full name"
                    className="w-full bg-transparent px-3 py-3 outline-none"
                  />
                </div>
              </label>
            ) : null}

            <div className="grid gap-6 md:grid-cols-2">
              <label className="grid gap-2 md:col-span-1">
                <span className="text-sm font-semibold">Email Address</span>
                <div className="flex items-center rounded-xl border border-[hsl(0,0%,86%)] px-4">
                  <Mail className="h-4 w-4 text-[hsl(0,0%,48%)]" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    placeholder="you@example.com"
                    className="w-full bg-transparent px-3 py-3 outline-none"
                  />
                </div>
              </label>

              {isSignup ? (
                <label className="grid gap-2 md:col-span-1">
                  <span className="text-sm font-semibold">Phone Number</span>
                  <div className="flex items-center rounded-xl border border-[hsl(0,0%,86%)] px-4">
                    <Phone className="h-4 w-4 text-[hsl(0,0%,48%)]" />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(event) =>
                        updateField("phone", event.target.value)
                      }
                      placeholder="07XXXXXXXX"
                      className="w-full bg-transparent px-3 py-3 outline-none"
                    />
                  </div>
                </label>
              ) : null}
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-semibold">Password</span>
              <div className="flex items-center rounded-xl border border-[hsl(0,0%,86%)] px-4">
                <Lock className="h-4 w-4 text-[hsl(0,0%,48%)]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(event) =>
                    updateField("password", event.target.value)
                  }
                  placeholder="Enter your password"
                  className="w-full bg-transparent px-3 py-3 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-[hsl(0,0%,40%)] transition hover:text-[hsl(355,82%,56%)]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </label>

            {isSignup ? (
              <label className="grid gap-2">
                <span className="text-sm font-semibold">Confirm Password</span>
                <div className="flex items-center rounded-xl border border-[hsl(0,0%,86%)] px-4">
                  <Lock className="h-4 w-4 text-[hsl(0,0%,48%)]" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(event) =>
                      updateField("confirmPassword", event.target.value)
                    }
                    placeholder="Confirm your password"
                    className="w-full bg-transparent px-3 py-3 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="text-[hsl(0,0%,40%)] transition hover:text-[hsl(355,82%,56%)]"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </label>
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <label className="inline-flex items-center gap-2 text-[hsl(0,0%,7%,0.65)]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  Remember me
                </label>
                <Link
                  href="/contact"
                  className="font-medium text-[hsl(355,82%,56%)] transition hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            ) : null}

            {message ? (
              <div className="flex gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <p>{message}</p>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Please wait..." : pageCopy.submit}
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="text-sm text-[hsl(0,0%,7%,0.6)]">
              {pageCopy.footerText}{" "}
              <Link
                href={pageCopy.footerLinkHref}
                className="font-semibold text-[hsl(355,82%,56%)] transition hover:underline"
              >
                {pageCopy.footerLinkLabel}
              </Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
