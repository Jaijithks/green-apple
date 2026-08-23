export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
}

export const galleryItemsData: GalleryItem[] = [
  {
    id: "g1",
    title: "Grand Banquet Spread",
    category: "Buffet",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80",
    alt: "Gourmet catering buffet spread with fresh salad and warm entrees",
  },
  {
    id: "g2",
    title: "Artisanal Celebration Cake",
    category: "Birthdays",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80",
    alt: "Tiered chocolate cake lit with candles for special birthday celebration",
  },
  {
    id: "g3",
    title: "Corporate Gala Dining",
    category: "Corporate",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80",
    alt: "Elegantly arranged long corporate event dinner table setting",
  },
  {
    id: "g4",
    title: "Outdoor Evening Reception",
    category: "Weddings",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=600&q=80",
    alt: "Warm fairy light illuminated wedding dinner reception setup",
  },
  {
    id: "g5",
    title: "South Indian Special Feast",
    category: "Traditional",
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80",
    alt: "Authentic multi-course Kerala banana leaf sadya feast",
  },
];
