export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  iconName: "Utensils" | "Calendar" | "ConciergeBell" | "Users" | "Heart" | "Sparkles";
  slug: string;
  features?: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "weddings",
    title: "Weddings",
    shortDescription: "Make your big day truly unforgettable.",
    fullDescription:
      "Comprehensive wedding catering services tailored to your dream day. From traditional Kerala sadya to multi-cuisine grand buffets and live cooking counters.",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    iconName: "Users",
    slug: "weddings",
    features: [
      "Customized multi-course menus",
      "Live live-action food counters",
      "Elegant buffet table decor",
      "Dedicated event manager & staff",
    ],
  },
  {
    id: "birthdays",
    title: "Birthdays",
    shortDescription: "From small gatherings to grand celebrations.",
    fullDescription:
      "Fun, vibrant, and delicious catering for birthday parties of all ages. Custom snack stalls, live chaat, kid-friendly treats, and gourmet dining.",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
    iconName: "Calendar",
    slug: "birthdays",
    features: [
      "Kid & adult friendly choices",
      "Custom cake pairing & dessert bars",
      "Interactive food stations",
      "Hassle-free setup & service",
    ],
  },
  {
    id: "corporate",
    title: "Corporate Events",
    shortDescription: "Professional service for all your corporate needs.",
    fullDescription:
      "Elevate your corporate conferences, executive board meetings, annual galas, and product launches with punctual, premium catering service.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    iconName: "ConciergeBell",
    slug: "corporate-events",
    features: [
      "Executive packed meals & buffets",
      "Coffee break & high tea services",
      "Strict hygiene & safety protocol",
      "Seamless logistics & timeliness",
    ],
  },
  {
    id: "social",
    title: "Social Gatherings",
    shortDescription: "Delicious food for every social occasion.",
    fullDescription:
      "Warm, hospitable catering for housewarmings, family reunions, anniversaries, and festive celebrations with customized authentic menus.",
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
    iconName: "Utensils",
    slug: "social-gatherings",
    features: [
      "Intimate & large scale options",
      "Traditional & fusion recipes",
      "End-to-end cutlery & setup",
      "Warm attentive hospitality",
    ],
  },
];
