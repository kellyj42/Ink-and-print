"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  LogIn,
  LogOut,
  Menu,
  ShoppingCart,
  UserCircle,
  UserPlus,
  X,
} from "lucide-react";
import { useCart } from "../../../lib/use-cart";
import { createSupabaseBrowserClient } from "../../../lib/supabase/client";
import {
  DEFAULT_SITE_SETTINGS,
  rowToSiteSettings,
  type SiteSettings,
} from "../../../lib/site-settings";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const cartItems = useCart();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const closeMenu = () => {
    setIsOpen(false);
    setIsUserMenuOpen(false);
  };
  const displayName = userName || userEmail?.split("@")[0] || "Account";

  useEffect(() => {
    let ignore = false;

    async function loadNavbarData() {
      const { data: settingsRow } = await supabase
        .from("site_settings")
        .select(
          "business_name, hero_eyebrow, hero_headline, hero_description, hero_cta_text, about_title, about_description_1, about_description_2, phone, email, location, whatsapp_number"
        )
        .eq("id", 1)
        .maybeSingle();

      if (!ignore && settingsRow) {
        setSettings(rowToSiteSettings(settingsRow));
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (ignore) return;

      setUserEmail(session?.user.email ?? null);
      setUserName(
        typeof session?.user.user_metadata?.full_name === "string"
          ? session.user.user_metadata.full_name
          : null
      );

      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .maybeSingle<{ role: string }>();

        if (!ignore) {
          setRole(profile?.role ?? "user");
        }
      } else {
        setRole(null);
      }

      setIsAuthReady(true);
    }

    loadNavbarData();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user.email ?? null);
      setUserName(
        typeof session?.user.user_metadata?.full_name === "string"
          ? session.user.user_metadata.full_name
          : null
      );
      setRole(null);
      setIsUserMenuOpen(false);
      setIsAuthReady(true);
    });

    return () => {
      ignore = true;
      subscription.unsubscribe();
    };
  }, [supabase]);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUserEmail(null);
    setUserName(null);
    setRole(null);
    setIsUserMenuOpen(false);
    setIsOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[hsl(0,0%,7%)]  shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex flex-col justify-center items-center">
          <Image
            src="/logoimg.png"
            alt="INK & APPARELS Logo"
            width={80}
            height={50}
            className="object-contain"
          />
          <div className="text-center text-xs ">
            <h1
              className="font-extrabold"
              style={{
                background:
                  "linear-gradient(to right, hsl(355, 82%, 56%), hsl(24, 95%, 53%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {settings.businessName}
            </h1>
            <p
              className="text-white text-xs font-medium tracking-wide italic"
              style={{ fontFamily: "'Poppins', 'Arial', sans-serif" }}
            >
              {settings.heroEyebrow}
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-medium text-[hsl(0,0%,100%)]">
          <li>
            <Link href="/" className="hover:text-[hsl(355,82%,56%)] transition">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="hover:text-[hsl(355,82%,56%)] transition"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="hover:text-[hsl(355,82%,56%)] transition"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/order"
              className="hover:text-[hsl(355,82%,56%)] transition"
            >
              Order
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="hover:text-[hsl(355,82%,56%)] transition"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/orders"
              className="hover:text-[hsl(355,82%,56%)] transition"
            >
              My Orders
            </Link>
          </li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center space-x-3">
          <Link
            href="/checkout"
            aria-label="Cart"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-[hsl(355,82%,56%)] hover:text-[hsl(355,82%,56%)] hover:bg-white/10"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[hsl(355,82%,56%)] px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </Link>
          {userEmail ? (
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen((current) => !current)}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:border-[hsl(355,82%,56%)] hover:bg-white/15"
              >
                <UserCircle className="h-5 w-5" />
                <span className="max-w-28 truncate">{displayName}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {isUserMenuOpen ? (
                <div className="absolute right-0 top-14 w-56 overflow-hidden rounded-2xl border border-[hsl(0,0%,88%)] bg-white py-2 text-[hsl(0,0%,7%)] shadow-xl">
                  <div className="border-b border-[hsl(0,0%,92%)] px-4 py-3">
                    <p className="text-sm font-semibold">{displayName}</p>
                    <p className="truncate text-xs text-[hsl(0,0%,45%)]">
                      {userEmail}
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-[hsl(0,0%,96%)]"
                  >
                    <UserCircle className="h-4 w-4" />
                    User Profile
                  </Link>
                  {role === "admin" ? (
                    <Link
                      href="/admin"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-[hsl(0,0%,96%)]"
                    >
                      <Menu className="h-4 w-4" />
                      Admin Panel
                    </Link>
                  ) : null}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          ) : isAuthReady ? (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition hover:border-[hsl(355,82%,56%)] hover:bg-white/10"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                <UserPlus className="h-4 w-4" />
                Sign Up
              </Link>
            </div>
          ) : null}
        </div>

        {/* Mobile Button */}
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[hsl(0,0%,100%)] border-t border-[hsl(0,0%,95%)] px-4 py-4 space-y-4 text-[hsl(0,0%,7%)]">
          <div className="flex items-center justify-between border-b border-[hsl(0,0%,92%)] pb-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(0,0%,45%)]">
              Menu
            </p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-2 rounded-full border border-[hsl(0,0%,88%)] px-3 py-2 text-sm font-medium text-[hsl(0,0%,18%)] transition hover:border-[hsl(355,82%,56%)] hover:text-[hsl(355,82%,56%)]"
            >
              <X className="h-4 w-4" />
              Close
            </button>
          </div>
          <Link href="/" onClick={closeMenu} className="block hover:text-[hsl(355,82%,56%)]">
            Home
          </Link>
          <Link
            href="/products"
            onClick={closeMenu}
            className="block hover:text-[hsl(355,82%,56%)]"
          >
            Products
          </Link>
          <Link
            href="/services"
            onClick={closeMenu}
            className="block hover:text-[hsl(355,82%,56%)]"
          >
            Services
          </Link>
          <Link href="/order" onClick={closeMenu} className="block hover:text-[hsl(355,82%,56%)]">
            Order
          </Link>
          <Link href="/contact" onClick={closeMenu} className="block hover:text-[hsl(355,82%,56%)]">
            Contact
          </Link>
          <Link href="/orders" onClick={closeMenu} className="block hover:text-[hsl(355,82%,56%)]">
            My Orders
          </Link>
          {userEmail ? (
            <>
              <Link href="/profile" onClick={closeMenu} className="flex items-center gap-2 hover:text-[hsl(355,82%,56%)]">
                <UserCircle className="h-4 w-4" />
                User Profile
              </Link>
              {role === "admin" ? (
                <Link href="/admin" onClick={closeMenu} className="flex items-center gap-2 hover:text-[hsl(355,82%,56%)]">
                  <Menu className="h-4 w-4" />
                  Admin Panel
                </Link>
              ) : null}
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 text-left font-semibold text-red-600"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : isAuthReady ? (
            <div className="grid gap-3">
              <Link
                href="/login"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-xl border border-[hsl(0,0%,82%)] px-4 py-3 font-semibold text-[hsl(0,0%,7%)]"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
              <Link
                href="/signup"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-4 py-3 font-semibold text-white"
              >
                <UserPlus className="h-4 w-4" />
                Sign Up
              </Link>
            </div>
          ) : null}

          <Link
            href="/order"
            onClick={closeMenu}
            className="block text-center py-2 rounded-lg text-white bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)]"
          >
            Order Now
          </Link>
        </div>
      )}
    </nav>
  );
}
