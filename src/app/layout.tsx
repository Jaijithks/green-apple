import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://greenapplecatering.com"),
  title: {
    default: `${siteConfig.name} Catering & Event Company | Kothamangalam`,
    template: `%s | ${siteConfig.name} Catering & Event Company`,
  },
  description:
    "Exceptional catering & memorable celebrations in Kothamangalam & Ernakulam. Weddings, Catering, Decoration & Events with exquisite menu choices.",
  keywords: [
    "Green Apple Catering",
    "Catering company Kothamangalam",
    "Event management Kothamangalam",
    "Wedding catering Kerala",
    "Corporate catering Ernakulam",
    "Best catering services Kerala",
    "Decoration and catering Kerala",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  openGraph: {
    title: `${siteConfig.name} Catering & Event Company`,
    description:
      "Make Your Moments Memorable with Flavours. Exceptional catering & memorable celebrations.",
    url: "https://greenapplecatering.com",
    siteName: siteConfig.name,
    images: [
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Catering & Event Company`,
      },
    ],
    locale: "en_US",
    type: "website",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: "Green Apple Catering & Event Company",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    "@id": "https://greenapplecatering.com",
    url: "https://greenapplecatering.com",
    telephone: siteConfig.contact.phonePrimary,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      addressLocality: "Kothamangalam",
      addressRegion: "Kerala",
      addressCountry: "IN",
    },
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${dancingScript.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-[#F7F5EF] text-[#1F2937] selection:bg-[#229938] selection:text-white">
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
