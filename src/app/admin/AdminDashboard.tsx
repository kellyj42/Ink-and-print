"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  Edit3,
  Mail,
  Package,
  PlusCircle,
  ReceiptText,
  Save,
  Settings,
  Trash2,
  UserRound,
} from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  DEFAULT_SITE_SETTINGS,
  normalizeSiteSettings,
  type SiteSettings,
} from "@/lib/site-settings";
import { formatUGX } from "@/lib/format";
import { formatOrderDate, formatOrderStatus } from "@/lib/orders";

type Status = "idle" | "loading" | "saving";
type Tab = "settings" | "users" | "products" | "newsletters" | "orders";

type SiteSettingsRow = {
  id: number;
  business_name: string;
  hero_eyebrow: string;
  hero_headline: string;
  hero_description: string;
  hero_cta_text: string;
  about_title: string;
  about_description_1: string;
  about_description_2: string;
  phone: string;
  email: string;
  location: string;
  whatsapp_number: string;
};

type ProfileRow = {
  id: string;
  email: string | null;
  role: "admin" | "user";
  created_at: string;
  updated_at: string;
};

type ProductRow = {
  id: string;
  name: string;
  category: string;
  price: number;
  original_price: number | null;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  colors: { name: string; swatch: string }[];
  sizes: string[];
  tag: string | null;
  image: string;
  in_stock: boolean;
};

type NewsletterRow = {
  id: number;
  email: string;
  full_name: string;
  status: "subscribed" | "unsubscribed";
  source: string;
  created_at: string;
};

type AdminOrderRow = {
  id: number;
  created_at: string;
  status: string;
  total_amount: number;
  full_name: string;
  phone: string;
  email: string;
  delivery_method: string;
  order_items?: { id: number }[];
};

const emptyProduct: ProductRow = {
  id: "",
  name: "",
  category: "Apparel",
  price: 0,
  original_price: null,
  rating: 0,
  reviews: 0,
  description: "",
  features: [],
  colors: [{ name: "Black", swatch: "#111111" }],
  sizes: ["M", "L", "XL"],
  tag: "",
  image: "/products/company/tee-grid.jpg",
  in_stock: true,
};

const emptyNewsletter: Omit<NewsletterRow, "id" | "created_at"> = {
  email: "",
  full_name: "",
  status: "subscribed",
  source: "admin",
};

const tabs: { id: Tab; label: string; icon: typeof Settings }[] = [
  { id: "settings", label: "Settings", icon: Settings },
  { id: "users", label: "Users", icon: UserRound },
  { id: "products", label: "Products", icon: Package },
  { id: "newsletters", label: "Newsletters", icon: Mail },
  { id: "orders", label: "Orders", icon: ReceiptText },
];

const inputClass =
  "w-full rounded-2xl border border-[hsl(0,0%,84%)] bg-white px-4 py-3 text-sm focus:border-[hsl(355,82%,56%)] focus:outline-none";
const labelClass = "mb-2 block text-sm font-medium text-[hsl(0,0%,35%)]";

function rowToSettings(row: Partial<SiteSettingsRow> | null): SiteSettings {
  return normalizeSiteSettings({
    businessName: row?.business_name,
    heroEyebrow: row?.hero_eyebrow,
    heroHeadline: row?.hero_headline,
    heroDescription: row?.hero_description,
    heroCtaText: row?.hero_cta_text,
    aboutTitle: row?.about_title,
    aboutDescription1: row?.about_description_1,
    aboutDescription2: row?.about_description_2,
    phone: row?.phone,
    email: row?.email,
    location: row?.location,
    whatsappNumber: row?.whatsapp_number,
  });
}

function settingsToRow(settings: SiteSettings): SiteSettingsRow {
  return {
    id: 1,
    business_name: settings.businessName,
    hero_eyebrow: settings.heroEyebrow,
    hero_headline: settings.heroHeadline,
    hero_description: settings.heroDescription,
    hero_cta_text: settings.heroCtaText,
    about_title: settings.aboutTitle,
    about_description_1: settings.aboutDescription1,
    about_description_2: settings.aboutDescription2,
    phone: settings.phone,
    email: settings.email,
    location: settings.location,
    whatsapp_number: settings.whatsappNumber,
  };
}

function linesToArray(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function colorsToText(colors: ProductRow["colors"]) {
  return colors.map((color) => `${color.name}|${color.swatch}`).join("\n");
}

function textToColors(value: string) {
  return linesToArray(value).map((line) => {
    const [name, swatch] = line.split("|").map((part) => part.trim());
    return { name: name || "Color", swatch: swatch || "#111111" };
  });
}

function productToDraft(product: ProductRow) {
  return {
    ...product,
    tag: product.tag ?? "",
    featuresText: product.features.join("\n"),
    colorsText: colorsToText(product.colors),
    sizesText: product.sizes.join(", "),
  };
}

type ProductDraft = ProductRow & {
  featuresText: string;
  colorsText: string;
  sizesText: string;
};

function productDraftToRow(draft: ProductDraft): ProductRow {
  return {
    id: draft.id.trim(),
    name: draft.name.trim(),
    category: draft.category.trim() || "Apparel",
    price: Number(draft.price) || 0,
    original_price: draft.original_price ? Number(draft.original_price) : null,
    rating: Number(draft.rating) || 0,
    reviews: Number(draft.reviews) || 0,
    description: draft.description.trim(),
    features: linesToArray(draft.featuresText),
    colors: textToColors(draft.colorsText),
    sizes: draft.sizesText
      .split(",")
      .map((size) => size.trim())
      .filter(Boolean),
    tag: draft.tag?.trim() || null,
    image: draft.image.trim() || "/products/company/tee-grid.jpg",
    in_stock: draft.in_stock,
  };
}

export default function AdminDashboard() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [status, setStatus] = useState<Status>("loading");
  const [activeTab, setActiveTab] = useState<Tab>("settings");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [newsletters, setNewsletters] = useState<NewsletterRow[]>([]);
  const [orders, setOrders] = useState<AdminOrderRow[]>([]);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [productDraft, setProductDraft] = useState<ProductDraft>(
    productToDraft(emptyProduct)
  );
  const [newsletterDraft, setNewsletterDraft] = useState(emptyNewsletter);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadAdminData() {
    setStatus("loading");
    setMessage("");
    setError("");

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setIsAuthenticated(false);
      setRole(null);
      setStatus("idle");
      return;
    }

    setIsAuthenticated(true);

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .maybeSingle<{ role: string }>();

    if (profileError) {
      setError("Could not load your role. Run the SQL files in Supabase first.");
      setStatus("idle");
      return;
    }

    const nextRole = profile?.role ?? "user";
    setRole(nextRole);

    if (nextRole !== "admin") {
      setStatus("idle");
      return;
    }

    const [
      settingsResult,
      profilesResult,
      productsResult,
      newslettersResult,
      ordersResult,
    ] = await Promise.all([
      supabase
        .from("site_settings")
        .select(
          "id, business_name, hero_eyebrow, hero_headline, hero_description, hero_cta_text, about_title, about_description_1, about_description_2, phone, email, location, whatsapp_number"
        )
        .eq("id", 1)
        .maybeSingle<SiteSettingsRow>(),
      supabase
        .from("profiles")
        .select("id, email, role, created_at, updated_at")
        .order("created_at", { ascending: false }),
      supabase
        .from("products")
        .select(
          "id, name, category, price, original_price, rating, reviews, description, features, colors, sizes, tag, image, in_stock"
        )
        .order("created_at", { ascending: false }),
      supabase
        .from("newsletter_subscribers")
        .select("id, email, full_name, status, source, created_at")
        .order("created_at", { ascending: false }),
      supabase
        .from("orders")
        .select(
          "id, created_at, status, total_amount, full_name, phone, email, delivery_method, order_items(id)"
        )
        .order("created_at", { ascending: false }),
    ]);

    if (settingsResult.error) {
      setError("Could not load site settings. Run supabase/site_settings.sql.");
    } else {
      setSettings(rowToSettings(settingsResult.data));
    }

    if (profilesResult.error) {
      setError("Could not load users. Run supabase/admin_crud.sql.");
    } else {
      setProfiles((profilesResult.data as ProfileRow[]) ?? []);
    }

    if (productsResult.error) {
      setError("Could not load products. Run supabase/admin_crud.sql.");
    } else {
      setProducts((productsResult.data as ProductRow[]) ?? []);
    }

    if (newslettersResult.error) {
      setError("Could not load newsletters. Run supabase/admin_crud.sql.");
    } else {
      setNewsletters((newslettersResult.data as NewsletterRow[]) ?? []);
    }

    if (ordersResult.error) {
      setError("Could not load orders. Run supabase/orders.sql.");
    } else {
      setOrders((ordersResult.data as AdminOrderRow[]) ?? []);
    }

    setStatus("idle");
  }

  useEffect(() => {
    void loadAdminData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  async function runMutation(
    successMessage: string,
    task: () => PromiseLike<{ error: { message: string } | null }>
  ) {
    setStatus("saving");
    setMessage("");
    setError("");

    const { error: mutationError } = await task();

    if (mutationError) {
      setError(mutationError.message);
    } else {
      setMessage(successMessage);
      await loadAdminData();
    }

    setStatus("idle");
  }

  function updateSettingsField<K extends keyof SiteSettings>(
    key: K,
    value: SiteSettings[K]
  ) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  async function saveSettings() {
    await runMutation("Website settings saved.", () =>
      supabase.from("site_settings").upsert(settingsToRow(settings), {
        onConflict: "id",
      })
    );
  }

  async function saveProduct() {
    const row = productDraftToRow(productDraft);
    if (!row.id || !row.name) {
      setError("Product ID and name are required.");
      return;
    }

    await runMutation("Product saved.", () =>
      supabase.from("products").upsert(row, { onConflict: "id" })
    );
    setProductDraft(productToDraft(emptyProduct));
    setIsProductFormOpen(false);
  }

  function startAddProduct() {
    setProductDraft(productToDraft(emptyProduct));
    setIsProductFormOpen(true);
  }

  function startEditProduct(product: ProductRow) {
    setProductDraft(productToDraft(product));
    setIsProductFormOpen(true);
  }

  function cancelProductForm() {
    setProductDraft(productToDraft(emptyProduct));
    setIsProductFormOpen(false);
  }

  async function deleteProduct(id: string) {
    await runMutation("Product deleted.", () =>
      supabase.from("products").delete().eq("id", id)
    );
  }

  async function saveNewsletter() {
    if (!newsletterDraft.email.trim()) {
      setError("Newsletter email is required.");
      return;
    }

    await runMutation("Newsletter subscriber saved.", () =>
      supabase.from("newsletter_subscribers").upsert(
        {
          ...newsletterDraft,
          email: newsletterDraft.email.trim(),
          full_name: newsletterDraft.full_name.trim(),
          source: newsletterDraft.source.trim() || "admin",
        },
        { onConflict: "email" }
      )
    );
    setNewsletterDraft(emptyNewsletter);
  }

  async function updateProfile(profile: ProfileRow, role: ProfileRow["role"]) {
    await runMutation("User role updated.", () =>
      supabase
        .from("profiles")
        .update({ role, updated_at: new Date().toISOString() })
        .eq("id", profile.id)
    );
  }

  async function deleteProfile(id: string) {
    await runMutation("Profile deleted.", () =>
      supabase.from("profiles").delete().eq("id", id)
    );
  }

  async function updateOrderStatus(id: number, statusValue: string) {
    await runMutation("Order status updated.", () =>
      supabase.from("orders").update({ status: statusValue }).eq("id", id)
    );
  }

  async function deleteOrder(id: number) {
    await runMutation("Order deleted.", () =>
      supabase.from("orders").delete().eq("id", id)
    );
  }

  async function deleteNewsletter(id: number) {
    await runMutation("Newsletter subscriber deleted.", () =>
      supabase.from("newsletter_subscribers").delete().eq("id", id)
    );
  }

  if (!isAuthenticated && status !== "loading") {
    return (
      <section className="rounded-[2rem] border border-[hsl(0,0%,92%)] bg-white p-8 shadow-sm lg:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(355,82%,56%)]">
          Admin access
        </p>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-[hsl(0,0%,7%)]">
          Sign in to access the admin dashboard.
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[hsl(0,0%,7%,0.65)]">
          The dashboard is available to authenticated admin accounts.
        </p>
        <Link
          href="/login"
          className="mt-8 inline-flex rounded-full bg-[hsl(0,0%,7%)] px-7 py-3.5 font-semibold text-white transition hover:bg-[hsl(355,82%,56%)]"
        >
          Go to Sign In
        </Link>
      </section>
    );
  }

  if (isAuthenticated && status !== "loading" && role !== "admin") {
    return (
      <section className="rounded-[2rem] border border-[hsl(0,0%,92%)] bg-white p-8 shadow-sm lg:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(355,82%,56%)]">
          Admin access
        </p>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-[hsl(0,0%,7%)]">
          Your account is signed in, but it is not an admin account.
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[hsl(0,0%,7%,0.65)]">
          Ask an admin to update your role in the `profiles` table.
        </p>
      </section>
    );
  }

  const pendingOrders = orders.filter((order) =>
    ["pending", "submitted", "processing"].includes(order.status)
  ).length;
  const subscribedCount = newsletters.filter(
    (subscriber) => subscriber.status === "subscribed"
  ).length;
  const productCategories = Array.from(
    new Set(products.map((product) => product.category).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));
  const totalSales = orders.reduce(
    (total, order) => total + order.total_amount,
    0
  );
  const statItems = [
    {
      label: "Users",
      value: profiles.length.toLocaleString(),
      detail: `${profiles.filter((profile) => profile.role === "admin").length} admins`,
      icon: UserRound,
    },
    {
      label: "Products",
      value: products.length.toLocaleString(),
      detail: `${products.filter((product) => product.in_stock).length} in stock`,
      icon: Package,
    },
    {
      label: "Subscribers",
      value: subscribedCount.toLocaleString(),
      detail: `${newsletters.length.toLocaleString()} total contacts`,
      icon: Mail,
    },
    {
      label: "Orders",
      value: orders.length.toLocaleString(),
      detail: `${pendingOrders} need attention`,
      icon: ReceiptText,
    },
    {
      label: "Sales",
      value: formatUGX(totalSales),
      detail: "Saved order value",
      icon: ReceiptText,
    },
  ];

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-[hsl(0,0%,92%)] bg-white p-8 shadow-sm lg:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(355,82%,56%)]">
          Admin dashboard
        </p>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-[hsl(0,0%,7%)] md:text-5xl">
          Manage content, users, products, subscribers, and orders.
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[hsl(0,0%,7%,0.65)]">
          Run `supabase/admin_crud.sql` once after the existing profile, order,
          and site settings SQL files to enable the new tables and policies.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {statItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="rounded-[1.5rem] border border-[hsl(0,0%,92%)] bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[hsl(0,0%,45%)]">
                    {item.label}
                  </p>
                  <p className="mt-3 text-2xl font-bold text-[hsl(0,0%,7%)]">
                    {item.value}
                  </p>
                </div>
                <div className="rounded-2xl bg-[hsl(355,82%,96%)] p-3 text-[hsl(355,82%,45%)]">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 text-sm text-[hsl(0,0%,45%)]">{item.detail}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="h-fit rounded-[2rem] border border-[hsl(0,0%,92%)] bg-white p-4 shadow-sm lg:sticky lg:top-28">
          <p className="px-3 pb-3 pt-2 text-xs font-semibold uppercase tracking-[0.24em] text-[hsl(0,0%,45%)]">
            Manage
          </p>
          <nav className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex min-w-max items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition lg:min-w-0 ${
                    activeTab === tab.id
                      ? "bg-[hsl(0,0%,7%)] text-white"
                      : "text-[hsl(0,0%,32%)] hover:bg-[hsl(0,0%,96%)]"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0 space-y-8">
          {(message || error || status === "loading") && (
            <div className="rounded-2xl border border-[hsl(0,0%,92%)] bg-white p-4 text-sm shadow-sm">
              {status === "loading" ? (
                <span className="text-[hsl(0,0%,45%)]">
                  Loading dashboard...
                </span>
              ) : null}
              {message ? (
                <span className="text-emerald-700">{message}</span>
              ) : null}
              {error ? <span className="text-red-700">{error}</span> : null}
            </div>
          )}

      {activeTab === "settings" ? (
        <Panel title="Website Settings">
          <div className="grid gap-5 md:grid-cols-2">
            <TextField label="Business name" value={settings.businessName} onChange={(value) => updateSettingsField("businessName", value)} />
            <TextField label="Hero eyebrow" value={settings.heroEyebrow} onChange={(value) => updateSettingsField("heroEyebrow", value)} />
            <TextField label="Hero headline" value={settings.heroHeadline} onChange={(value) => updateSettingsField("heroHeadline", value)} wide />
            <TextArea label="Hero description" value={settings.heroDescription} onChange={(value) => updateSettingsField("heroDescription", value)} />
            <TextField label="Hero CTA text" value={settings.heroCtaText} onChange={(value) => updateSettingsField("heroCtaText", value)} />
            <TextField label="Phone" value={settings.phone} onChange={(value) => updateSettingsField("phone", value)} />
            <TextField label="Email" value={settings.email} onChange={(value) => updateSettingsField("email", value)} />
            <TextField label="WhatsApp number" value={settings.whatsappNumber} onChange={(value) => updateSettingsField("whatsappNumber", value)} />
            <TextField label="Location" value={settings.location} onChange={(value) => updateSettingsField("location", value)} wide />
            <TextField label="About title" value={settings.aboutTitle} onChange={(value) => updateSettingsField("aboutTitle", value)} wide />
            <TextArea label="About description 1" value={settings.aboutDescription1} onChange={(value) => updateSettingsField("aboutDescription1", value)} />
            <TextArea label="About description 2" value={settings.aboutDescription2} onChange={(value) => updateSettingsField("aboutDescription2", value)} />
          </div>
          <SaveButton label="Save website settings" onClick={saveSettings} disabled={status === "saving"} />
        </Panel>
      ) : null}

      {activeTab === "users" ? (
        <Panel title="Users">
          <p className="mb-6 text-sm leading-7 text-[hsl(0,0%,7%,0.62)]">
            User creation still happens through the sign-up page so Supabase can
            create the auth account. Admins can update roles or remove profile
            rows here.
          </p>
          <DataTable
            headers={["Email", "Role", "Created", "Actions"]}
            rows={profiles.map((profile) => [
              profile.email ?? profile.id,
              <select key="role" className={inputClass} value={profile.role} onChange={(event) => updateProfile(profile, event.target.value as ProfileRow["role"])}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>,
              formatOrderDate(profile.created_at),
              <IconButton key="delete" label="Delete profile" onClick={() => deleteProfile(profile.id)} />,
            ])}
          />
        </Panel>
      ) : null}

      {activeTab === "products" ? (
        <Panel title="Products">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-2xl text-sm leading-7 text-[hsl(0,0%,7%,0.62)]">
              Product records are loaded from the database. Categories on the
              public products page are created from these product records.
            </p>
            <button
              type="button"
              onClick={startAddProduct}
              className="inline-flex items-center gap-2 rounded-full bg-[hsl(0,0%,7%)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[hsl(355,82%,56%)]"
            >
              <PlusCircle className="h-4 w-4" />
              Add product
            </button>
          </div>

          {isProductFormOpen ? (
            <div className="mb-8 rounded-[1.5rem] border border-[hsl(0,0%,90%)] bg-[hsl(0,0%,99%)] p-6">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-semibold text-[hsl(0,0%,7%)]">
                  {productDraft.id ? "Edit product" : "Add product"}
                </h3>
                <button
                  type="button"
                  onClick={cancelProductForm}
                  className="rounded-full border border-[hsl(0,0%,84%)] px-4 py-2 text-sm font-semibold transition hover:border-[hsl(355,82%,56%)] hover:text-[hsl(355,82%,56%)]"
                >
                  Cancel
                </button>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <TextField label="Product ID" value={productDraft.id} onChange={(value) => setProductDraft((draft) => ({ ...draft, id: value }))} />
                <TextField label="Name" value={productDraft.name} onChange={(value) => setProductDraft((draft) => ({ ...draft, name: value }))} />
                <div>
                  <label className={labelClass}>Category</label>
                  <input
                    list="admin-product-categories"
                    value={productDraft.category}
                    onChange={(event) =>
                      setProductDraft((draft) => ({
                        ...draft,
                        category: event.target.value,
                      }))
                    }
                    className={inputClass}
                  />
                  <datalist id="admin-product-categories">
                    {productCategories.map((category) => (
                      <option key={category} value={category} />
                    ))}
                  </datalist>
                </div>
                <TextField label="Image path" value={productDraft.image} onChange={(value) => setProductDraft((draft) => ({ ...draft, image: value }))} />
                <NumberField label="Price" value={productDraft.price} onChange={(value) => setProductDraft((draft) => ({ ...draft, price: value }))} />
                <NumberField label="Original price" value={productDraft.original_price ?? 0} onChange={(value) => setProductDraft((draft) => ({ ...draft, original_price: value || null }))} />
                <NumberField label="Rating" value={productDraft.rating} onChange={(value) => setProductDraft((draft) => ({ ...draft, rating: value }))} />
                <NumberField label="Reviews" value={productDraft.reviews} onChange={(value) => setProductDraft((draft) => ({ ...draft, reviews: value }))} />
                <TextField label="Tag" value={productDraft.tag ?? ""} onChange={(value) => setProductDraft((draft) => ({ ...draft, tag: value }))} />
                <label className="flex items-center gap-3 rounded-2xl border border-[hsl(0,0%,84%)] px-4 py-3 text-sm font-medium">
                  <input type="checkbox" checked={productDraft.in_stock} onChange={(event) => setProductDraft((draft) => ({ ...draft, in_stock: event.target.checked }))} />
                  In stock
                </label>
                <TextArea label="Description" value={productDraft.description} onChange={(value) => setProductDraft((draft) => ({ ...draft, description: value }))} />
                <TextArea label="Features, one per line" value={productDraft.featuresText} onChange={(value) => setProductDraft((draft) => ({ ...draft, featuresText: value }))} />
                <TextArea label="Colors, one per line as Name|#hex" value={productDraft.colorsText} onChange={(value) => setProductDraft((draft) => ({ ...draft, colorsText: value }))} />
                <TextArea label="Sizes, comma separated" value={productDraft.sizesText} onChange={(value) => setProductDraft((draft) => ({ ...draft, sizesText: value }))} />
              </div>
              <SaveButton label="Save product" onClick={saveProduct} disabled={status === "saving"} />
            </div>
          ) : null}

          {products.length === 0 ? (
            <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-8 text-center">
              <Package className="mx-auto h-10 w-10 text-amber-700" />
              <h3 className="mt-4 text-2xl font-bold text-amber-950">
                No product records found
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-amber-900">
                Your public product page is database-only now. Add at least one
                product so customers can browse products and categories.
              </p>
              <button
                type="button"
                onClick={startAddProduct}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[hsl(355,82%,56%)]"
              >
                <PlusCircle className="h-4 w-4" />
                Add product
              </button>
            </div>
          ) : (
            <DataTable
              headers={["Product", "Category", "Price", "Stock", "Actions"]}
              rows={products.map((product) => [
                product.name,
                product.category,
                formatUGX(product.price),
                product.in_stock ? "In stock" : "Hidden",
                <div key="actions" className="flex gap-2">
                  <button type="button" onClick={() => startEditProduct(product)} className="rounded-full bg-[hsl(0,0%,94%)] p-2 text-[hsl(0,0%,25%)] hover:bg-[hsl(0,0%,88%)]" title="Edit product">
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <IconButton label="Delete product" onClick={() => deleteProduct(product.id)} />
                </div>,
              ])}
            />
          )}
        </Panel>
      ) : null}

      {activeTab === "newsletters" ? (
        <Panel title="Newsletter Subscribers">
          <div className="grid gap-5 md:grid-cols-4">
            <TextField label="Email" value={newsletterDraft.email} onChange={(value) => setNewsletterDraft((draft) => ({ ...draft, email: value }))} />
            <TextField label="Full name" value={newsletterDraft.full_name} onChange={(value) => setNewsletterDraft((draft) => ({ ...draft, full_name: value }))} />
            <TextField label="Source" value={newsletterDraft.source} onChange={(value) => setNewsletterDraft((draft) => ({ ...draft, source: value }))} />
            <div>
              <label className={labelClass}>Status</label>
              <select className={inputClass} value={newsletterDraft.status} onChange={(event) => setNewsletterDraft((draft) => ({ ...draft, status: event.target.value as NewsletterRow["status"] }))}>
                <option value="subscribed">Subscribed</option>
                <option value="unsubscribed">Unsubscribed</option>
              </select>
            </div>
          </div>
          <SaveButton label="Save subscriber" onClick={saveNewsletter} disabled={status === "saving"} />
          <DataTable
            headers={["Email", "Name", "Status", "Source", "Actions"]}
            rows={newsletters.map((subscriber) => [
              subscriber.email,
              subscriber.full_name || "-",
              subscriber.status,
              subscriber.source,
              <div key="actions" className="flex gap-2">
                <button type="button" onClick={() => setNewsletterDraft(subscriber)} className="rounded-full bg-[hsl(0,0%,94%)] p-2 text-[hsl(0,0%,25%)] hover:bg-[hsl(0,0%,88%)]" title="Edit subscriber">
                  <Edit3 className="h-4 w-4" />
                </button>
                <IconButton label="Delete subscriber" onClick={() => deleteNewsletter(subscriber.id)} />
              </div>,
            ])}
          />
        </Panel>
      ) : null}

      {activeTab === "orders" ? (
        <Panel title="Orders">
          <DataTable
            headers={["Order", "Customer", "Total", "Status", "Actions"]}
            rows={orders.map((order) => [
              `#${order.id} - ${formatOrderDate(order.created_at)}`,
              `${order.full_name || "Customer"} | ${order.phone || order.email || "-"}`,
              formatUGX(order.total_amount),
              <select key="status" className={inputClass} value={order.status} onChange={(event) => updateOrderStatus(order.id, event.target.value)}>
                {["pending", "submitted", "processing", "completed", "cancelled"].map((option) => (
                  <option key={option} value={option}>{formatOrderStatus(option)}</option>
                ))}
              </select>,
              <IconButton key="delete" label="Delete order" onClick={() => deleteOrder(order.id)} />,
            ])}
          />
        </Panel>
      ) : null}
        </div>
      </div>
    </section>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[2rem] border border-[hsl(0,0%,92%)] bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-[hsl(0,0%,7%)]">{title}</h2>
      <div className="mt-8">{children}</div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  wide = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "md:col-span-2" : ""}>
      <label className={labelClass}>{label}</label>
      <input value={value} onChange={(event) => onChange(event.target.value)} className={inputClass} />
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input type="number" value={value} onChange={(event) => onChange(Number(event.target.value))} className={inputClass} />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="md:col-span-2">
      <label className={labelClass}>{label}</label>
      <textarea rows={4} value={value} onChange={(event) => onChange(event.target.value)} className={inputClass} />
    </div>
  );
}

function SaveButton({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="mt-8 inline-flex items-center gap-2 rounded-full bg-[hsl(0,0%,7%)] px-7 py-3.5 font-semibold text-white transition hover:bg-[hsl(355,82%,56%)] disabled:cursor-not-allowed disabled:opacity-70"
    >
      <Save className="h-4 w-4" />
      {disabled ? "Saving..." : label}
    </button>
  );
}

function IconButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full bg-red-50 p-2 text-red-700 transition hover:bg-red-100"
      title={label}
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}

function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: ReactNode[][];
}) {
  if (rows.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-dashed border-[hsl(0,0%,84%)] p-8 text-center text-sm text-[hsl(0,0%,45%)]">
        No records yet.
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead>
          <tr className="border-b border-[hsl(0,0%,90%)] text-[hsl(0,0%,42%)]">
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-[hsl(0,0%,94%)]">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-4 align-middle">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
