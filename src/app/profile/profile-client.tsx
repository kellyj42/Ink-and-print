"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, ReceiptText, ShieldCheck, UserCircle } from "lucide-react";
import { createSupabaseBrowserClient } from "../../lib/supabase/client";

type ProfileState = {
  email: string;
  fullName: string;
  phone: string;
  role: string;
};

export default function ProfileClient() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [profile, setProfile] = useState<ProfileState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadProfile() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        if (!ignore) {
          setProfile(null);
          setIsLoading(false);
        }
        return;
      }

      const { data: profileRow } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .maybeSingle<{ role: string }>();

      if (!ignore) {
        setProfile({
          email: session.user.email ?? "",
          fullName:
            typeof session.user.user_metadata?.full_name === "string"
              ? session.user.user_metadata.full_name
              : "",
          phone:
            typeof session.user.user_metadata?.phone === "string"
              ? session.user.user_metadata.phone
              : "",
          role: profileRow?.role ?? "user",
        });
        setIsLoading(false);
      }
    }

    loadProfile();

    return () => {
      ignore = true;
    };
  }, [supabase]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <main className="bg-[hsl(0,0%,99%)] px-4 pb-20 pt-32 text-[hsl(0,0%,7%)]">
      <div className="mx-auto max-w-5xl">
        <section className="rounded-[2.5rem] border border-[hsl(0,0%,92%)] bg-white p-8 shadow-sm md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(355,82%,56%)]">
            User Profile
          </p>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Account details
          </h1>

          {isLoading ? (
            <p className="mt-8 text-[hsl(0,0%,45%)]">Loading profile...</p>
          ) : !profile ? (
            <div className="mt-8 rounded-2xl border border-dashed border-[hsl(0,0%,84%)] p-8">
              <p className="text-[hsl(0,0%,55%)]">
                Sign in to view your profile and saved order shortcuts.
              </p>
              <Link
                href="/login"
                className="mt-5 inline-flex rounded-xl bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-5 py-3 font-semibold text-white"
              >
                Login
              </Link>
            </div>
          ) : (
            <>
              <div className="mt-10 grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl bg-[hsl(0,0%,97%)] p-5">
                  <UserCircle className="h-6 w-6 text-[hsl(355,82%,56%)]" />
                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(0,0%,45%)]">
                    Name
                  </p>
                  <p className="mt-2 text-lg font-bold">
                    {profile.fullName || "Not added yet"}
                  </p>
                </div>
                <div className="rounded-2xl bg-[hsl(0,0%,97%)] p-5">
                  <ShieldCheck className="h-6 w-6 text-[hsl(355,82%,56%)]" />
                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(0,0%,45%)]">
                    Role
                  </p>
                  <p className="mt-2 text-lg font-bold capitalize">
                    {profile.role}
                  </p>
                </div>
                <div className="rounded-2xl bg-[hsl(0,0%,97%)] p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(0,0%,45%)]">
                    Email
                  </p>
                  <p className="mt-2 break-all text-lg font-bold">
                    {profile.email}
                  </p>
                </div>
                <div className="rounded-2xl bg-[hsl(0,0%,97%)] p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(0,0%,45%)]">
                    Phone
                  </p>
                  <p className="mt-2 text-lg font-bold">
                    {profile.phone || "Not added yet"}
                  </p>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/orders"
                  className="inline-flex items-center gap-2 rounded-xl border border-[hsl(0,0%,84%)] px-5 py-3 font-semibold transition hover:border-[hsl(355,82%,56%)] hover:text-[hsl(355,82%,56%)]"
                >
                  <ReceiptText className="h-4 w-4" />
                  My Orders
                </Link>
                {profile.role === "admin" ? (
                  <Link
                    href="/admin"
                    className="inline-flex items-center gap-2 rounded-xl bg-[hsl(0,0%,7%)] px-5 py-3 font-semibold text-white transition hover:bg-[hsl(355,82%,56%)]"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Admin Panel
                  </Link>
                ) : null}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-5 py-3 font-semibold text-red-700 transition hover:bg-red-100"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
