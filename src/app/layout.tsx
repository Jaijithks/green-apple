import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site";
import { getSiteUrl } from "@/lib/siteUrl";
import Footer from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Green Apple Catering & Event Company | Kothamangalam, Kerala",
    template: `%s | ${siteConfig.fullName}`,
  },
  description:
    "Green Apple Catering & Event Company in Kothamangalam, Kerala. Wedding catering, custom menus, event decoration and celebrations across Ernakulam, Idukki & Kottayam.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Green Apple Catering",
    "Green Apple Catering & Event Company",
    "Catering Kothamangalam",
    "Wedding catering Kothamangalam",
    "Event management Kothamangalam",
    "Sadya catering Kerala",
    "Catering services Ernakulam",
    "Event decoration Idukki",
    "Catering Kottayam",
  ],
  authors: [{ name: siteConfig.fullName, url: siteUrl }],
  creator: siteConfig.fullName,
  publisher: siteConfig.fullName,
  formatDetection: {
    telephone: true,
    address: true,
    email: false,
  },
  openGraph: {
    title: "Green Apple Catering & Event Company | Kothamangalam, Kerala",
    description:
      "Green Apple Catering & Event Company in Kothamangalam, Kerala. Wedding catering, custom menus, event decoration and celebrations across Ernakulam, Idukki & Kottayam.",
    url: siteUrl,
    siteName: siteConfig.fullName,
    images: [
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Green Apple Catering & Event Company Kothamangalam Kerala",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Green Apple Catering & Event Company | Kothamangalam, Kerala",
    description:
      "Green Apple Catering & Event Company in Kothamangalam, Kerala. Wedding catering, custom menus, event decoration and celebrations across Ernakulam, Idukki & Kottayam.",
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  icons: {
    icon: [
      { url: "/logo/green apple logo.png" },
      { url: "/favicon.png" },
    ],
    shortcut: "/logo/green apple logo.png",
    apple: "/logo/green apple logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentSiteUrl = getSiteUrl();

  const businessJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Caterer", "LocalBusiness"],
        "@id": `${currentSiteUrl}/#business`,
        name: siteConfig.fullName,
        alternateName: siteConfig.name,
        description: siteConfig.description,
        url: currentSiteUrl,
        logo: `${currentSiteUrl}/logo/green%20apple%20logo.png`,
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
        telephone: siteConfig.contact.phonePrimary,
        priceRange: "$$",
        hasMap: siteConfig.social.location,
        sameAs: [
          siteConfig.social.instagram,
          siteConfig.social.location,
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.contact.address,
          addressLocality: "Kothamangalam",
          addressRegion: "Kerala",
          postalCode: "686691",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Kothamangalam" },
          { "@type": "AdministrativeArea", name: "Ernakulam" },
          { "@type": "AdministrativeArea", name: "Idukki" },
          { "@type": "AdministrativeArea", name: "Kottayam" },
        ],
        knowsAbout: [
          "Wedding Catering",
          "Sadya Catering",
          "Multi-cuisine Buffet Catering",
          "Event Planning & Decoration",
          "Stage Decoration",
          "Corporate Catering",
          "Live Food Stalls",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${currentSiteUrl}/#website`,
        url: currentSiteUrl,
        name: siteConfig.fullName,
        description: siteConfig.description,
        publisher: {
          "@id": `${currentSiteUrl}/#business`,
        },
        inLanguage: "en",
      },
      {
        "@type": "Service",
        "@id": `${currentSiteUrl}/#catering-service`,
        name: "Catering Services",
        serviceType: "Catering",
        provider: {
          "@id": `${currentSiteUrl}/#business`,
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Kothamangalam" },
          { "@type": "AdministrativeArea", name: "Ernakulam" },
          { "@type": "AdministrativeArea", name: "Idukki" },
          { "@type": "AdministrativeArea", name: "Kottayam" },
        ],
        description:
          "Artisanal catering services offering authentic Kerala Sadya, multi-cuisine wedding banquets, buffets, live cooking counters, and customized menu planning.",
      },
      {
        "@type": "Service",
        "@id": `${currentSiteUrl}/#event-service`,
        name: "Event Planning & Decoration",
        serviceType: "Event Planning & Decoration",
        provider: {
          "@id": `${currentSiteUrl}/#business`,
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Kothamangalam" },
          { "@type": "AdministrativeArea", name: "Ernakulam" },
          { "@type": "AdministrativeArea", name: "Idukki" },
          { "@type": "AdministrativeArea", name: "Kottayam" },
        ],
        description:
          "End-to-end event planning, stage decoration, theme design, floral arrangements, and celebration management for weddings, birthdays, and corporate galas.",
      },
    ],
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${dancingScript.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-[#F7F5EF] text-[#1F2937] selection:bg-[#229938] selection:text-white">
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
