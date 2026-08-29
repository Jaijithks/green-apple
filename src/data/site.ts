export interface SiteConfig {
  name: string;
  fullName: string;
  tagline: string;
  taglineHighlight: string;
  heroTagline: string;
  description: string;
  welcomeHeading: string;
  welcomeText: string;
  availability: string;
  serviceAreas: string[];
  contact: {
    address: string;
    city: string;
    phonePrimary: string;
    phoneSecondary: string;
    fssai: string;
    whatsapp: string;
  };
  social: {
    instagram: string;
    whatsapp: string;
    location: string;
  };
  stats: Array<{
    value: string;
    label: string;
    icon: "ChefHat" | "UsersGroup" | "ServingDish" | "AwardBadge";
  }>;
  navLinks: Array<{ label: string; href: string; hasDropdown?: boolean }>;
}

export const siteConfig: SiteConfig = {
  name: "Green Apple",
  fullName: "Green Apple Catering & Event Company",
  tagline: "Make Your Moments",
  taglineHighlight: "Memorable",
  heroTagline: "EXCEPTIONAL CATERING & MEMORABLE CELEBRATIONS",
  description:
    "Green Apple Catering & Event Company in Kothamangalam, Kerala. Wedding catering, custom menus, event decoration and celebrations across Ernakulam, Idukki & Kottayam.",
  welcomeHeading: "Make your moments memorable with flavours.",
  welcomeText:
    "Green Apple Catering & Event Company provides catering and event services in Kothamangalam and across Ernakulam, Idukki and Kottayam. From weddings and traditional celebrations to corporate gatherings and private events, we create catering and event experiences tailored to each occasion.",
  availability: "Available 24/7 for enquiries",
  serviceAreas: ["Kothamangalam", "Ernakulam", "Idukki", "Kottayam"],
  contact: {
    address: "Near Shobana English Medium Public School, Kothamangalam",
    city: "Kerala 686691",
    phonePrimary: "+91 80860 88913",
    phoneSecondary: "+91 80860 88913",
    fssai: "21322192000446",
    whatsapp: "918086088913",
  },
  social: {
    instagram: "https://www.instagram.com/_green_apple_catering_/",
    whatsapp: "https://wa.me/918086088913",
    location: "https://maps.app.goo.gl/VGahrnGzDFPBsgkz8",
  },
  stats: [],
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/#about" },
    { label: "Services", href: "/#services", hasDropdown: true },
    { label: "Menu", href: "/#menu" },
    { label: "Our Events", href: "/events" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Contact", href: "/#contact" },
  ],
};
