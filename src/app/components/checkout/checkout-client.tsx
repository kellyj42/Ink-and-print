"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Mail,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { CartItem, clearCart, writeCart } from "../../../lib/cart";
import { formatUGX } from "../../../lib/format";
import { useCart } from "../../../lib/use-cart";
import { createSupabaseBrowserClient } from "../../../lib/supabase/client";
import {
  DEFAULT_SITE_SETTINGS,
  rowToSiteSettings,
  toTelHref,
  type SiteSettings,
} from "../../../lib/site-settings";

type CustomerDetails = {
  fullName: string;
  phone: string;
  email: string;
  deliveryMethod: string;
  notes: string;
};

function buildOrderMessage(
  items: CartItem[],
  customer: CustomerDetails,
  total: number,
  businessName: string
) {
  const lines = items.map(
    (item, index) =>
      `${index + 1}. ${item.name} | Color: ${item.color} | Size: ${item.size} | Qty: ${item.quantity} | ${formatUGX(
        item.price * item.quantity
      )}`
  );

  return [
    `Hello ${businessName}, I would like to place this order:`,
    "",
    ...lines,
    "",
    `Subtotal: ${formatUGX(total)}`,
    "",
    "Customer details:",
    `Name: ${customer.fullName || "-"}`,
    `Phone: ${customer.phone || "-"}`,
    `Email: ${customer.email || "-"}`,
    `Delivery / Pickup: ${customer.deliveryMethod || "-"}`,
    `Notes: ${customer.notes || "-"}`,
  ].join("\n");
}

export default function CheckoutClient() {
  const storedCartItems = useCart();
  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: "",
    phone: "",
    email: "",
    deliveryMethod: "",
    notes: "",
  });
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedOrderId, setSavedOrderId] = useState<number | null>(null);

  const cartItems = storedCartItems;
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const orderMessage = useMemo(
    () => buildOrderMessage(cartItems, customer, subtotal, settings.businessName),
    [cartItems, customer, settings.businessName, subtotal]
  );

  const whatsappHref = `https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(orderMessage)}`;
  const emailHref = `mailto:${settings.email}?subject=${encodeURIComponent(
    "New order request"
  )}&body=${encodeURIComponent(orderMessage)}`;

  useEffect(() => {
    let ignore = false;

    async function loadSession() {
      try {
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

        if (session?.user) {
          setIsSignedIn(true);
          setCustomer((prev) => ({
            ...prev,
            email: prev.email || session.user.email || "",
            fullName:
              prev.fullName ||
              (typeof session.user.user_metadata?.full_name === "string"
                ? session.user.user_metadata.full_name
                : ""),
            phone:
              prev.phone ||
              (typeof session.user.user_metadata?.phone === "string"
                ? session.user.user_metadata.phone
                : ""),
          }));
        } else {
          setIsSignedIn(false);
        }
      } catch {
        if (!ignore) {
          setIsSignedIn(false);
        }
      }
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsSignedIn(Boolean(session?.user));
    });

    return () => {
      ignore = true;
      subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    setSavedOrderId(null);
    setStatusMessage("");
    setError("");
  }, [cartItems]);

  const updateQuantity = (
    id: string,
    color: string,
    size: string,
    delta: number
  ) => {
    const nextCartItems = cartItems
      .map((item) => {
        if (item.id === id && item.color === color && item.size === size) {
          const quantity = item.quantity + delta;
          if (quantity <= 0) return null;
          return { ...item, quantity };
        }
        return item;
      })
      .filter(Boolean) as CartItem[];

    writeCart(nextCartItems);
  };

  const removeItem = (id: string, color: string, size: string) => {
    writeCart(
      cartItems.filter(
        (item) => !(item.id === id && item.color === color && item.size === size)
      )
    );
  };

  const handleClearCart = () => {
    clearCart();
    setSavedOrderId(null);
    setStatusMessage("");
    setError("");
  };

  function validateCustomerDetails() {
    if (!cartItems.length) {
      setError("Your cart is empty.");
      return false;
    }

    if (!customer.fullName.trim() || !customer.phone.trim() || !customer.email.trim()) {
      setError("Please fill in your full name, phone number, and email.");
      return false;
    }

    return true;
  }

  async function ensureOrderSaved(requireAuth: boolean) {
    if (savedOrderId) {
      return savedOrderId;
    }

    if (!validateCustomerDetails()) {
      return null;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      if (requireAuth) {
        setError("Sign in first so this order can be saved to your account history.");
      }
      return null;
    }

    setIsSaving(true);
    setError("");
    setStatusMessage("");

    try {
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: session.user.id,
          status: "submitted",
          total_amount: subtotal,
          full_name: customer.fullName.trim(),
          phone: customer.phone.trim(),
          email: customer.email.trim(),
          delivery_method: customer.deliveryMethod.trim(),
          notes: customer.notes.trim(),
        })
        .select("id")
        .single<{ id: number }>();

      if (orderError || !order) {
        setError(
          orderError?.message ||
            "Could not save your order yet. Make sure supabase/orders.sql has been run."
        );
        return null;
      }

      const itemPayload = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        price: item.price,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
        image: item.image,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(itemPayload);

      if (itemsError) {
        setError(itemsError.message);
        return null;
      }

      setSavedOrderId(order.id);
      setStatusMessage(`Order #${order.id} saved to your history.`);
      return order.id;
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSaveOnly() {
    await ensureOrderSaved(true);
  }

  async function handleSendWhatsApp() {
    await ensureOrderSaved(false);
    window.open(whatsappHref, "_blank", "noopener,noreferrer");
  }

  async function handleSendEmail() {
    await ensureOrderSaved(false);
    window.location.href = emailHref;
  }

  return (
    <main className="bg-[hsl(0,0%,99%)] pb-20 pt-28 text-[hsl(0,0%,7%)]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(355,82%,56%)]">
              Checkout
            </p>
            <h1 className="mt-3 text-4xl font-bold md:text-5xl">
              Review your cart and send the order
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-[hsl(0,0%,7%,0.66)]">
              Complete the client details, review the selected items, then
              submit the order through WhatsApp or email. Signed-in users also
              get saved order history.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl border border-[hsl(0,0%,85%)] bg-white px-5 py-3 font-semibold transition hover:border-[hsl(355,82%,56%)] hover:text-[hsl(355,82%,56%)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to products
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-[hsl(0,0%,85%)] bg-white p-16 text-center shadow-sm">
            <ShoppingBag className="mx-auto h-14 w-14 text-[hsl(0,0%,55%)]" />
            <h2 className="mt-6 text-3xl font-bold">Your cart is empty</h2>
            <p className="mt-3 text-[hsl(0,0%,7%,0.6)]">
              Add some products first, then come back here to complete the order.
            </p>
            <Link
              href="/products"
              className="mt-8 inline-flex rounded-xl bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-6 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-[hsl(0,0%,92%)] bg-white p-8 shadow-sm md:p-10">
              <div className="mb-8 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(355,82%,56%)]">
                    Customer Details
                  </p>
                  <h2 className="mt-3 text-3xl font-bold">
                    Where should we send this order?
                  </h2>
                </div>
                <button
                  onClick={handleClearCart}
                  className="inline-flex items-center gap-2 rounded-xl border border-[hsl(0,0%,85%)] px-4 py-2 text-sm font-semibold transition hover:border-red-500 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear cart
                </button>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold">Full Name</span>
                  <input
                    value={customer.fullName}
                    onChange={(event) =>
                      setCustomer((prev) => ({ ...prev, fullName: event.target.value }))
                    }
                    className="rounded-xl border border-[hsl(0,0%,86%)] px-4 py-3 outline-none transition focus:border-[hsl(355,82%,56%)]"
                    placeholder="Customer name"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold">Phone Number</span>
                  <input
                    value={customer.phone}
                    onChange={(event) =>
                      setCustomer((prev) => ({ ...prev, phone: event.target.value }))
                    }
                    className="rounded-xl border border-[hsl(0,0%,86%)] px-4 py-3 outline-none transition focus:border-[hsl(355,82%,56%)]"
                    placeholder="07XXXXXXXX"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold">Email</span>
                  <input
                    value={customer.email}
                    onChange={(event) =>
                      setCustomer((prev) => ({ ...prev, email: event.target.value }))
                    }
                    className="rounded-xl border border-[hsl(0,0%,86%)] px-4 py-3 outline-none transition focus:border-[hsl(355,82%,56%)]"
                    placeholder="you@example.com"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold">Pickup / Delivery</span>
                  <input
                    value={customer.deliveryMethod}
                    onChange={(event) =>
                      setCustomer((prev) => ({
                        ...prev,
                        deliveryMethod: event.target.value,
                      }))
                    }
                    className="rounded-xl border border-[hsl(0,0%,86%)] px-4 py-3 outline-none transition focus:border-[hsl(355,82%,56%)]"
                    placeholder="Pickup, delivery, dispatch..."
                  />
                </label>
              </div>

              <label className="mt-6 grid gap-2">
                <span className="text-sm font-semibold">Extra Notes</span>
                <textarea
                  value={customer.notes}
                  onChange={(event) =>
                    setCustomer((prev) => ({ ...prev, notes: event.target.value }))
                  }
                  rows={5}
                  className="rounded-2xl border border-[hsl(0,0%,86%)] px-4 py-3 outline-none transition focus:border-[hsl(355,82%,56%)]"
                  placeholder="Artwork notes, branding placement, deadline, special instructions..."
                />
              </label>

              <div className="mt-8 rounded-2xl bg-[hsl(0,0%,97%)] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(0,0%,45%)]">
                  Order handoff
                </p>
                <p className="mt-2 text-sm leading-6 text-[hsl(0,0%,7%,0.68)]">
                  Signed-in customers can save orders into account history.
                  Guests can still send orders through WhatsApp or email, but
                  those requests will not appear under `My Orders`.
                </p>
                {!isSignedIn ? (
                  <Link
                    href="/login"
                    className="mt-4 inline-flex font-semibold text-[hsl(355,82%,56%)] transition hover:underline"
                  >
                    Sign in to save order history
                  </Link>
                ) : null}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-[hsl(0,0%,92%)] bg-white p-8 shadow-sm md:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(355,82%,56%)]">
                  Order Summary
                </p>

                <div className="mt-6 space-y-5">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.id}-${item.color}-${item.size}`}
                      className="rounded-2xl border border-[hsl(0,0%,92%)] p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="mt-1 text-sm text-[hsl(0,0%,7%,0.6)]">
                            Color: {item.color}
                          </p>
                          <p className="text-sm text-[hsl(0,0%,7%,0.6)]">
                            Size: {item.size}
                          </p>
                          <p className="text-sm text-[hsl(0,0%,7%,0.6)]">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-bold">
                          {formatUGX(item.price * item.quantity)}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.color, item.size, -1)
                            }
                            className="rounded-full border border-[hsl(0,0%,85%)] p-1 transition hover:bg-[hsl(0,0%,96%)]"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.color, item.size, 1)
                            }
                            className="rounded-full border border-[hsl(0,0%,85%)] p-1 transition hover:bg-[hsl(0,0%,96%)]"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id, item.color, item.size)}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 transition hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-[hsl(0,0%,92%)] pt-5">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Subtotal</span>
                    <span>{formatUGX(subtotal)}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] bg-[hsl(0,0%,7%)] p-8 text-white md:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(24,95%,53%)]">
                  Submit Order
                </p>

                {error ? (
                  <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                    {error}
                  </div>
                ) : null}

                {statusMessage ? (
                  <div className="mt-6 flex gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    <p>{statusMessage}</p>
                  </div>
                ) : null}

                <div className="mt-6 grid gap-4">
                  <button
                    type="button"
                    onClick={handleSaveOnly}
                    disabled={isSaving}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {isSaving ? "Saving..." : "Save to My Orders"}
                  </button>
                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    disabled={isSaving}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Send via WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={handleSendEmail}
                    disabled={isSaving}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-[hsl(0,0%,7%)] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <Mail className="h-4 w-4" />
                    Send via Email
                  </button>
                  <a
                    href={toTelHref(settings.phone)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                  >
                    <Phone className="h-4 w-4" />
                    Call to Confirm
                  </a>
                </div>

                {savedOrderId ? (
                  <Link
                    href="/orders"
                    className="mt-5 inline-flex font-semibold text-[hsl(24,95%,53%)] transition hover:underline"
                  >
                    View saved order history
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
