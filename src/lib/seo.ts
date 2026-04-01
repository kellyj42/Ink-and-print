import type { Metadata } from "next";

const fallbackSiteUrl = "http://localhost:3000";

export const siteConfig = {
  name: "Ink & Apparels",
  shortName: "Ink & Apparels",
  description:
    "Ink & Apparels offers custom printing, branded apparel, corporate wear, promotional products, and finishing services for businesses, events, and fashion brands.",
  url: process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl,
  ogImage: "/logoimg.png",
  email: "jamiebanku10@gmail.com",
  phonePrimary: "0704444845",
  phoneSecondary: "0790084845",
  location: "Swift Plaza, SD 148",
  keywords: [
    "custom printing Uganda",
    "apparel branding Uganda",
    "DTF printing",
    "UV printing",
    "vinyl cutting",
    "sublimation printing",
    "custom t-shirts",
    "corporate wear branding",
    "promotional products",
    "Ink and Apparels",
  ],
};

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, siteConfig.url).toString();
}

type PageMetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  noIndex = false,
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: absoluteUrl(siteConfig.ogImage),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl(siteConfig.ogImage)],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
