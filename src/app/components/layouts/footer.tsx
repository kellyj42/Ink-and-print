"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Globe, MapPin, MessageCircle, Phone } from "lucide-react";
import { createSupabaseBrowserClient } from "../../../lib/supabase/client";
import {
  DEFAULT_SITE_SETTINGS,
  rowToSiteSettings,
  toTelHref,
  type SiteSettings,
} from "../../../lib/site-settings";

export default function Footer() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);

  useEffect(() => {
    let ignore = false;

    async function loadSettings() {
      const { data } = await supabase
        .from("site_settings")
        .select(
          "business_name, hero_eyebrow, hero_headline, hero_description, hero_cta_text, about_title, about_description_1, about_description_2, phone, email, location, whatsapp_number",
        )
        .eq("id", 1)
        .maybeSingle();

      if (!ignore && data) {
        setSettings(rowToSiteSettings(data));
      }
    }

    loadSettings();

    return () => {
      ignore = true;
    };
  }, [supabase]);

  return (
    <footer className="bg-[hsl(0,0%,7%)] pt-16 pb-8 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-4">
        <div>
          <h2 className="bg-gradient-to-r from-[hsl(355,82%,56%)] to-[hsl(24,95%,53%)] bg-clip-text text-2xl font-bold text-transparent">
            {settings.businessName}
          </h2>
          <p className="mt-4 text-sm text-[hsl(0,0%,100%,0.7)]">
            {settings.heroDescription}
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Quick Links</h3>
          <ul className="space-y-2 text-sm text-[hsl(0,0%,100%,0.7)]">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white">
                Products
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link href="/order" className="hover:text-white">
                Order
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Our Services</h3>
          <ul className="space-y-2 text-sm text-[hsl(0,0%,100%,0.7)]">
            <li>UV Printing</li>
            <li>DTF Printing</li>
            <li>Vinyl Cutting</li>
            <li>Sublimation</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Contact</h3>
          <ul className="space-y-3 text-sm text-[hsl(0,0%,100%,0.7)]">
            <li className="flex items-center gap-2">
              <Phone size={16} />
              <a href={toTelHref(settings.phone)}>
                WhatsApp/Calls: {settings.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> {settings.location}
            </li>
            <li className="break-all">{settings.email}</li>
          </ul>

          <div className="mt-4 flex gap-4">
            <a
              href="https://www.instagram.com/ink_and_print/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="rounded-full bg-[hsl(0,0%,95%,0.1)] p-2 transition hover:bg-[hsl(355,82%,56%)]"
            >
              <Globe size={18} />
            </a>
            <a
              href="https://www.tiktok.com/@ink_and_print"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="rounded-full bg-[hsl(0,0%,95%,0.1)] p-2 transition hover:bg-[hsl(355,82%,56%)]"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-[hsl(0,0%,95%,0.1)] pt-6 text-center text-sm text-[hsl(0,0%,100%,0.6)]">
        &copy; {new Date().getFullYear()} {settings.businessName}. All rights
        reserved.
      </div>
    </footer>
  );
}
