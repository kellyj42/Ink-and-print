import type { Metadata } from "next";
import AdminDashboard from "./AdminDashboard";
import { buildMetadata } from "../../lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Admin Panel",
  description: "Manage website settings for Ink & Apparels.",
  path: "/admin",
  noIndex: true,
});

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(225,29,72,0.12),transparent_24%),radial-gradient(circle_at_90%_10%,rgba(249,115,22,0.08),transparent_22%),linear-gradient(180deg,#faf7f7_0%,#ffffff_24%,#faf9f6_100%)] px-6 pb-20 pt-8 lg:pt-10">
      <div className="mx-auto max-w-7xl">
        <AdminDashboard />
      </div>
    </main>
  );
}
