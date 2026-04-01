import type { Metadata } from "next";
import FeaturedProducts from "./components/sections/FeaturedProducts";
import Hero from "./components/sections/Hero";
import ServicesPage from "./components/sections/Services";
import TrustSection from "./components/sections/TrustSection";
import { absoluteUrl, buildMetadata, siteConfig } from "../lib/seo";

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

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.ogImage),
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phonePrimary,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.location,
      addressCountry: "UG",
    },
    sameAs: [
      "https://www.instagram.com/ink_n_apparels/",
      "https://www.tiktok.com/@ink_n_apparelsventures",
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
     
     <Hero/>
     <FeaturedProducts/>
     <ServicesPage/>
     <TrustSection/>
   </>
  )
}
