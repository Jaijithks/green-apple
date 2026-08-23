export interface SiteConfig {
  name: string;
  tagline: string;
  taglineHighlight: string;
  heroTagline: string;
  description: string;
  welcomeHeading: string;
  welcomeText: string;
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
  tagline: "Make Your Moments",
  taglineHighlight: "Memorable",
  heroTagline: "EXCEPTIONAL CATERING & MEMORABLE CELEBRATIONS",
  description:
    "From intimate gatherings to grand celebrations, we craft delicious experiences tailored to your special moments.",
  welcomeHeading: "Make your moments memorable with flavours.",
  welcomeText:
    "We provide delicious food for every occasion. From small gatherings to grand celebrations, we bring flavour to your moments.",
  contact: {
    address: "Near Govt Hospital, Kothamangalam",
    city: "Ernakulam, Kerala",
    phonePrimary: "9946061122",
    phoneSecondary: "8086088913",
    fssai: "21322192000446",
    whatsapp: "919946061122",
  },
  social: {
    instagram: "https://instagram.com",
    whatsapp: "https://wa.me/919946061122",
    location: "https://maps.google.com",
  },
  stats: [
    { value: "100+", label: "Events Catered", icon: "ChefHat" },
    { value: "5000+", label: "Happy Clients", icon: "UsersGroup" },
    { value: "50+", label: "Delicious Menus", icon: "ServingDish" },
    { value: "10+", label: "Years of Experience", icon: "AwardBadge" },
  ],
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services", hasDropdown: true },
    { label: "Menu", href: "/menu" },
    { label: "Our Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
};
