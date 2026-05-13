import { createClient } from "@supabase/supabase-js";

export type SiteSettings = {
  businessName: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroDescription: string;
  heroCtaText: string;
  aboutTitle: string;
  aboutDescription1: string;
  aboutDescription2: string;
  phone: string;
  email: string;
  location: string;
  whatsappNumber: string;
};

type SiteSettingsRow = {
  business_name: string | null;
  hero_eyebrow: string | null;
  hero_headline: string | null;
  hero_description: string | null;
  hero_cta_text: string | null;
  about_title: string | null;
  about_description_1: string | null;
  about_description_2: string | null;
  phone: string | null;
  email: string | null;
  location: string | null;
  whatsapp_number: string | null;
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  businessName: "Ink and Print",
  heroEyebrow: "Custom printing, branding, and product design",
  heroHeadline:
    "Print products, apparel, and branded materials made for your ideas.",
  heroDescription:
    "Ink and Print helps customers create branded apparel, printed products, promotional pieces, and custom designs with clean finishing and practical support.",
  heroCtaText: "Order Now",
  aboutTitle:
    "Custom printing and branding support for businesses, events, teams, and personal projects.",
  aboutDescription1:
    "Ink and Print supports customers with apparel printing, branded products, promotional materials, business items, and selected custom orders.",
  aboutDescription2:
    "The goal is simple: offer clear product choices, clean branding, and reliable finishing so every order looks ready to use, wear, or present.",
  phone: "0704444845",
  email: "jamiebanku10@gmail.com",
  location: "Swift Plaza, SD 148",
  whatsappNumber: "256704444845",
};

const LEGACY_SITE_SETTINGS: SiteSettings = {
  businessName: "Ink & Apparels",
  heroEyebrow: "Custom apparel, branding, and print services in Kampala",
  heroHeadline:
    "Custom prints and branded apparel that help your ideas stand out.",
  heroDescription:
    "Ink & Apparels delivers branded clothing, printing services, workwear, and promotional pieces for businesses, teams, events, and fashion brands with quality finishing and practical guidance.",
  heroCtaText: "Order Now",
  aboutTitle:
    "Custom printing and branded apparel tailored for businesses, teams, events, and personal style.",
  aboutDescription1:
    "Ink & Apparels supports clients with apparel branding, print production, workwear, polos, hoodies, tees, and selected promotional items for both small and bulk orders.",
  aboutDescription2:
    "The goal is simple: offer good product choices, clean branding, and reliable finishing so every order looks professional and feels ready to wear or present.",
  phone: "0704444845",
  email: "jamiebanku10@gmail.com",
  location: "Swift Plaza, SD 148",
  whatsappNumber: "256704444845",
};

export function normalizeSiteSettings(
  value?: Partial<SiteSettings> | null
): SiteSettings {
  const settings = {
    ...DEFAULT_SITE_SETTINGS,
    ...value,
  };

  (Object.keys(DEFAULT_SITE_SETTINGS) as (keyof SiteSettings)[]).forEach(
    (key) => {
      if (settings[key] === LEGACY_SITE_SETTINGS[key]) {
        settings[key] = DEFAULT_SITE_SETTINGS[key];
      }
    }
  );

  return settings;
}

export function rowToSiteSettings(
  row?: Partial<SiteSettingsRow> | null
): SiteSettings {
  return normalizeSiteSettings({
    businessName: row?.business_name ?? undefined,
    heroEyebrow: row?.hero_eyebrow ?? undefined,
    heroHeadline: row?.hero_headline ?? undefined,
    heroDescription: row?.hero_description ?? undefined,
    heroCtaText: row?.hero_cta_text ?? undefined,
    aboutTitle: row?.about_title ?? undefined,
    aboutDescription1: row?.about_description_1 ?? undefined,
    aboutDescription2: row?.about_description_2 ?? undefined,
    phone: row?.phone ?? undefined,
    email: row?.email ?? undefined,
    location: row?.location ?? undefined,
    whatsappNumber: row?.whatsapp_number ?? undefined,
  });
}

export async function getSiteSettings() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return DEFAULT_SITE_SETTINGS;

  const supabase = createClient(url, anonKey);
  const { data, error } = await supabase
    .from("site_settings")
    .select(
      "business_name, hero_eyebrow, hero_headline, hero_description, hero_cta_text, about_title, about_description_1, about_description_2, phone, email, location, whatsapp_number"
    )
    .eq("id", 1)
    .maybeSingle<SiteSettingsRow>();

  if (error || !data) return DEFAULT_SITE_SETTINGS;

  return rowToSiteSettings(data);
}

export function toTelHref(phone: string) {
  const cleaned = phone.replace(/[^\d+]/g, "");
  if (cleaned.startsWith("+")) {
    return `tel:${cleaned}`;
  }
  return `tel:+${cleaned}`;
}

export function toWhatsAppHref(number: string, text?: string) {
  const cleaned = number.replace(/\D/g, "");
  if (!text) {
    return `https://wa.me/${cleaned}`;
  }
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(text)}`;
}
