"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
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

const WHATSAPP_NUMBER = "256704444845";
const EMAIL_ADDRESS = "jamiebanku10@gmail.com";

type CustomerDetails = {
  fullName: string;
  phone: string;
  email: string;
  deliveryMethod: string;
  notes: string;
};

function buildOrderMessage(items: CartItem[], customer: CustomerDetails, total: number) {
  const lines = items.map(
    (item, index) =>
      `${index + 1}. ${item.name} | Color: ${item.color} | Size: ${item.size} | Qty: ${item.quantity} | ${formatUGX(
        item.price * item.quantity
      )}`
  );

  return [
    "Hello Ink & Apparels, I would like to place this order:",
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

  const cartItems = storedCartItems;

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const orderMessage = useMemo(
    () => buildOrderMessage(cartItems, customer, subtotal),
    [cartItems, customer, subtotal]
  );

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderMessage)}`;
  const emailHref = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(
    "New order request"
  )}&body=${encodeURIComponent(orderMessage)}`;

  const updateQuantity = (id: string, color: string, size: string, delta: number) => {
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
  };

  return (
    <main className="bg-[hsl(0,0%,99%)] pt-28 pb-20 text-[hsl(0,0%,7%)]">
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
              Complete the client details, review the selected items, then submit the
              order directly through WhatsApp or email.
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
                  <h2 className="mt-3 text-3xl font-bold">Where should we send this order?</h2>
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
                  This checkout sends a ready-made order summary to your WhatsApp or
                  email so you can receive client orders immediately without setting up
                  a backend first.
                </p>
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
                          <p className="text-sm text-[hsl(0,0%,7%,0.6)]">Size: {item.size}</p>
                          <p className="text-sm text-[hsl(0,0%,7%,0.6)]">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-bold">{formatUGX(item.price * item.quantity)}</p>
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
                <div className="mt-6 grid gap-4">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-semibold text-white transition hover:opacity-90"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Send via WhatsApp
                  </a>
                  <a
                    href={emailHref}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-[hsl(0,0%,7%)] transition hover:bg-white/90"
                  >
                    <Mail className="h-4 w-4" />
                    Send via Email
                  </a>
                  <a
                    href="tel:0704444845"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                  >
                    <Phone className="h-4 w-4" />
                    Call to Confirm
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
