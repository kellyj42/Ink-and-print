import type { Metadata } from "next";
import FeaturedProducts from "./components/sections/FeaturedProducts";
import Hero from "./components/sections/Hero";
import ServicesPage from "./components/sections/Services";
import TrustSection from "./components/sections/TrustSection";
import { absoluteUrl, buildMetadata, siteConfig } from "../lib/seo";
import { getSiteSettings } from "../lib/site-settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Custom Printing and Branded Apparel",
  description:
    "Shop custom apparel, branded products, and modern printing services from Ink & Apparels. We handle DTF, UV printing, vinyl cutting, sublimation, and branded corporate wear.",
  path: "/",
  keywords: [
    "custom printing Kampala",
    "branded apparel Uganda",
    "custom hoodies and t-shirts",
    "corporate branding services",
  ],
});

export default async function Home() {
  const settings = await getSiteSettings();
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings.businessName,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.ogImage),
    description: settings.heroDescription,
    email: settings.email,
    telephone: settings.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.location,
      addressCountry: "UG",
    },
    sameAs: [
      "https://www.instagram.com/ink_and_print/",
      "https://www.tiktok.com/@ink_and_print",
    ],
    areaServed: "Uganda",
    serviceType: [
      "DTF Printing",
      "UV Printing",
      "Vinyl Cutting",
      "Sublimation Printing",
      "Custom Apparel Branding",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <Hero settings={settings} />
      <FeaturedProducts />
      <ServicesPage />
      <TrustSection />
    </>
  );
}
