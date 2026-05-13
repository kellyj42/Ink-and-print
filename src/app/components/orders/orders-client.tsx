"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Receipt, ShoppingBag } from "lucide-react";
import { createSupabaseBrowserClient } from "../../../lib/supabase/client";
import {
  formatOrderDate,
  formatOrderStatus,
  type OrderRecord,
} from "../../../lib/orders";
import { formatUGX } from "../../../lib/format";

type LoadState = "loading" | "ready";

export default function OrdersClient() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [state, setState] = useState<LoadState>("loading");

  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  useEffect(() => {
    let ignore = false;

    async function loadOrders() {
      setState("loading");
      setError("");

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          if (!ignore) {
            setIsAuthenticated(false);
            setOrders([]);
            setState("ready");
          }
          return;
        }

        if (!ignore) {
          setIsAuthenticated(true);
        }

        const { data, error: ordersError } = await supabase
          .from("orders")
          .select(
            "id, created_at, status, total_amount, full_name, phone, email, delivery_method, notes, order_items(id, product_id, product_name, price, quantity, color, size, image)"
          )
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false });

        if (ignore) return;

        if (ordersError) {
          setError(
            "Could not load your order history yet. Make sure supabase/orders.sql has been run."
          );
          setOrders([]);
        } else {
          setOrders((data as OrderRecord[]) ?? []);
        }
      } catch (loadError) {
        if (!ignore) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Something went wrong while loading your orders."
          );
        }
      } finally {
        if (!ignore) {
          setState("ready");
        }
      }
    }

    loadOrders();

    return () => {
      ignore = true;
    };
  }, [supabase]);

  return (
    <main className="bg-[hsl(0,0%,99%)] px-4 pb-20 pt-32 text-[hsl(0,0%,7%)]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(355,82%,56%)]">
              My Orders
            </p>
            <h1 className="mt-3 text-4xl font-bold md:text-5xl">
              Your shopping history
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-[hsl(0,0%,7%,0.66)]">
              Review your saved orders, check what was submitted, and come back
              to past product selections more easily.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl border border-[hsl(0,0%,85%)] bg-white px-5 py-3 font-semibold transition hover:border-[hsl(355,82%,56%)] hover:text-[hsl(355,82%,56%)]"
          >
            Shop again <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {state === "loading" ? (
          <div className="rounded-[2rem] border border-[hsl(0,0%,92%)] bg-white p-10 shadow-sm">
            <p className="text-sm text-[hsl(0,0%,7%,0.6)]">
              Loading your order history...
            </p>
          </div>
        ) : !isAuthenticated ? (
          <div className="rounded-[2rem] border border-dashed border-[hsl(0,0%,85%)] bg-white p-16 text-center shadow-sm">
            <ShoppingBag className="mx-auto h-14 w-14 text-[hsl(0,0%,55%)]" />
            <h2 className="mt-6 text-3xl font-bold">Sign in to view your orders</h2>
            <p className="mt-3 text-[hsl(0,0%,7%,0.6)]">
              Your saved order history is linked to your account.
            </p>
            <Link
              href="/login"
              className="mt-8 inline-flex rounded-xl bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-6 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Go to sign in
            </Link>
          </div>
        ) : error ? (
          <div className="rounded-[2rem] border border-red-200 bg-red-50 p-8 text-red-700 shadow-sm">
            {error}
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-[hsl(0,0%,85%)] bg-white p-16 text-center shadow-sm">
            <Receipt className="mx-auto h-14 w-14 text-[hsl(0,0%,55%)]" />
            <h2 className="mt-6 text-3xl font-bold">No saved orders yet</h2>
            <p className="mt-3 text-[hsl(0,0%,7%,0.6)]">
              Once you save an order from checkout, it will appear here.
            </p>
            <Link
              href="/products"
              className="mt-8 inline-flex rounded-xl bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] px-6 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <section
                key={order.id}
                className="rounded-[2rem] border border-[hsl(0,0%,92%)] bg-white p-8 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(355,82%,56%)]">
                      Order #{order.id}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">
                      {formatOrderStatus(order.status)}
                    </h2>
                    <p className="mt-2 text-sm text-[hsl(0,0%,7%,0.6)]">
                      Saved on {formatOrderDate(order.created_at)}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[hsl(0,0%,97%)] px-5 py-4 text-right">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(0,0%,45%)]">
                      Total
                    </p>
                    <p className="mt-2 text-2xl font-bold">
                      {formatUGX(order.total_amount)}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                  <div>
                    <h3 className="text-lg font-semibold">Items</h3>
                    <div className="mt-4 space-y-4">
                      {order.order_items.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-4 rounded-2xl border border-[hsl(0,0%,92%)] p-4"
                        >
                          <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-[hsl(0,0%,96%)]">
                            <Image
                              src={item.image}
                              alt={item.product_name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">{item.product_name}</p>
                            <p className="mt-1 text-sm text-[hsl(0,0%,7%,0.6)]">
                              Color: {item.color} | Size: {item.size}
                            </p>
                            <p className="text-sm text-[hsl(0,0%,7%,0.6)]">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="font-semibold">
                            {formatUGX(item.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[hsl(0,0%,97%)] p-6">
                    <h3 className="text-lg font-semibold">Customer details</h3>
                    <div className="mt-4 space-y-3 text-sm text-[hsl(0,0%,7%,0.68)]">
                      <p>
                        <span className="font-semibold text-[hsl(0,0%,7%)]">
                          Name:
                        </span>{" "}
                        {order.full_name || "-"}
                      </p>
                      <p>
                        <span className="font-semibold text-[hsl(0,0%,7%)]">
                          Phone:
                        </span>{" "}
                        {order.phone || "-"}
                      </p>
                      <p>
                        <span className="font-semibold text-[hsl(0,0%,7%)]">
                          Email:
                        </span>{" "}
                        {order.email || "-"}
                      </p>
                      <p>
                        <span className="font-semibold text-[hsl(0,0%,7%)]">
                          Delivery:
                        </span>{" "}
                        {order.delivery_method || "-"}
                      </p>
                      <p>
                        <span className="font-semibold text-[hsl(0,0%,7%)]">
                          Notes:
                        </span>{" "}
                        {order.notes || "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
