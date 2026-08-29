import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/siteUrl";
import { siteConfig } from "@/data/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Catering Services in Kothamangalam | Green Apple",
  description:
    "Artisanal wedding catering, traditional Kerala Sadya, multi-cuisine buffets, and custom menus in Kothamangalam, Ernakulam, Idukki & Kottayam.",
  alternates: {
    canonical: "/catering",
  },
  openGraph: {
    title: "Catering Services in Kothamangalam | Green Apple",
    description:
      "Artisanal wedding catering, traditional Kerala Sadya, multi-cuisine buffets, and custom menus in Kothamangalam, Ernakulam, Idukki & Kottayam.",
    url: `${siteUrl}/catering`,
    siteName: siteConfig.fullName,
    images: [
      {
        url: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Artisanal Catering Services by Green Apple in Kothamangalam Kerala",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Catering Services in Kothamangalam | Green Apple",
    description:
      "Artisanal wedding catering, traditional Kerala Sadya, multi-cuisine buffets, and custom menus in Kothamangalam, Ernakulam, Idukki & Kottayam.",
    images: [
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
    ],
  },
};

export default function CateringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentSiteUrl = getSiteUrl();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${currentSiteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Catering Services",
        item: `${currentSiteUrl}/catering`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
