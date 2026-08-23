export interface HeroSlideData {
  id: string;
  desktop: string;
  mobile: string;
  alt: string;
  order: number;
  isActive: boolean;
  // Future CMS extensibility fields
  title?: string;
  highlight?: string;
  description?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryLink?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryLink?: string;
}

export const heroSlides: HeroSlideData[] = [
  {
    id: "hero-slide-1",
    desktop: "/background/hero/back 1.jpeg",
    mobile: "/background/hero/back mob 1.jpeg",
    alt: "Green Apple Catering Grand Wedding Banquet Buffet and Dining Experience",
    order: 1,
    isActive: true,
  },
  {
    id: "hero-slide-2",
    desktop: "/background/hero/back 2.jpeg",
    mobile: "/background/hero/back mob 2.jpeg",
    alt: "Green Apple Catering Artisanal Gourmet Dishes and Festive Catering",
    order: 2,
    isActive: true,
  },
  {
    id: "hero-slide-3",
    desktop: "/background/hero/back 3.jpeg",
    mobile: "/background/hero/back mob 3.jpeg",
    alt: "Green Apple Catering Luxury Event Decoration and Table Setting",
    order: 3,
    isActive: true,
  },
];
