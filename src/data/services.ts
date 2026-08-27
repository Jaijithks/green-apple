export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  iconName: "Utensils" | "Calendar" | "ConciergeBell" | "Users" | "Heart" | "Sparkles";
  slug: string;
  linkText: string;
  features?: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "catering",
    title: "Catering",
    category: "SIGNATURE FEASTS",
    shortDescription: "Thoughtfully crafted multi-cuisine menus for memorable celebrations.",
    fullDescription:
      "From traditional Kerala sadyas to contemporary international buffets, live food counters, and royal dining spreads tailored for every celebration.",
    image: "/services/catering.jpg",
    iconName: "Utensils",
    slug: "catering",
    linkText: "EXPLORE CATERING",
    features: [
      "Traditional Kerala Sadya",
      "Multi-Cuisine Grand Buffets",
      "Live Action Food Stations",
      "Gourmet Dessert Tables",
    ],
  },
  {
    id: "events",
    title: "Events",
    category: "EVENTS & EXPERIENCES",
    shortDescription: "End-to-end event planning and execution that bring your vision to life.",
    fullDescription:
      "Comprehensive event design, venue styling, luxury floral arrangements, lighting, and flawless coordination for weddings, corporate galas, and private parties.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85",
    iconName: "Sparkles",
    slug: "events",
    linkText: "EXPLORE EVENTS",
    features: [
      "Wedding Design & Coordination",
      "Corporate Hospitality & Summits",
      "Theme Parties & Family Celebrations",
      "Tablescapes & Floral Installations",
    ],
  },
];

