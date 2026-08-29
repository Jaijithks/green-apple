import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/siteUrl";
import { siteConfig } from "@/data/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Event Planning & Decoration in Kothamangalam | Green Apple",
  description:
    "Bespoke event planning, stage decoration, and celebration design in Kothamangalam. Weddings, birthday parties, and corporate events across Kerala.",
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: "Event Planning & Decoration in Kothamangalam | Green Apple",
    description:
      "Bespoke event planning, stage decoration, and celebration design in Kothamangalam. Weddings, birthday parties, and corporate events across Kerala.",
    url: `${siteUrl}/events`,
    siteName: siteConfig.fullName,
    images: [
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Event Planning and Decoration in Kothamangalam Kerala by Green Apple",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Event Planning & Decoration in Kothamangalam | Green Apple",
    description:
      "Bespoke event planning, stage decoration, and celebration design in Kothamangalam. Weddings, birthday parties, and corporate events across Kerala.",
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    ],
  },
};

export default function EventsLayout({
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
        name: "Event Planning & Decoration",
        item: `${currentSiteUrl}/events`,
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
