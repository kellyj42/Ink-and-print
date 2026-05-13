import type { Metadata } from "next";
import OrdersClient from "../components/orders/orders-client";
import { buildMetadata } from "../../lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "My Orders",
  description: "View your saved shopping and order history with Ink & Apparels.",
  path: "/orders",
  noIndex: true,
});

export default function OrdersPage() {
  return <OrdersClient />;
}
