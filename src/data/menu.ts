import { MENU_ITEMS, MENU_CATEGORIES } from "./menuBuilderData";

export interface MenuItem {
  id: string;
  name: string;
  malayalamName?: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  foodType: string;
  image?: string;
  isPopular?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
}

export const menuCategories: MenuCategory[] = MENU_CATEGORIES.map((c) => ({
  id: c.id,
  name: c.name,
}));

export const menuItemsData: MenuItem[] = MENU_ITEMS.map((m) => ({
  id: m.id,
  name: m.name,
  malayalamName: m.malayalamName,
  description: m.description || "",
  price: 150,
  currency: "₹",
  category: m.category,
  foodType: m.foodType,
  image: "",
  isPopular: !!m.isSignature,
}));
