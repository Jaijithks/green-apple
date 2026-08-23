export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  image: string;
  isPopular?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
}

export const menuCategories: MenuCategory[] = [
  { id: "starters", name: "Starters" },
  { id: "main-course", name: "Main Course" },
  { id: "rice-breads", name: "Rice & Breads" },
  { id: "desserts", name: "Desserts" },
  { id: "beverages", name: "Beverages" },
];

export const menuItemsData: MenuItem[] = [
  // Starters (matching the image design reference)
  {
    id: "m1",
    name: "Veg Spring Rolls",
    description: "Crispy rolls stuffed with fresh vegetables.",
    price: 120,
    currency: "₹",
    category: "starters",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80",
    isPopular: true,
  },
  {
    id: "m2",
    name: "Chicken 65",
    description: "Spicy and crispy chicken nuggets.",
    price: 180,
    currency: "₹",
    category: "starters",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=300&q=80",
    isPopular: true,
  },
  {
    id: "m3",
    name: "Chicken Tikka",
    description: "Marinated chicken cooked to perfection.",
    price: 180,
    currency: "₹",
    category: "starters",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "m4",
    name: "Veg Manchurian",
    description: "Crispy vegetable balls in tangy sauce.",
    price: 140,
    currency: "₹",
    category: "starters",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "m5",
    name: "Paneer Tikka",
    description: "Cottage cheese marinated in spices.",
    price: 150,
    currency: "₹",
    category: "starters",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=300&q=80",
    isPopular: true,
  },
  {
    id: "m6",
    name: "Baby Corn 65",
    description: "Crispy baby corn tossed in spices.",
    price: 150,
    currency: "₹",
    category: "starters",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "m7",
    name: "Fruit Salad",
    description: "Fresh seasonal fruits with a sweet touch.",
    price: 100,
    currency: "₹",
    category: "starters",
    image: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "m8",
    name: "Chicken Lollipop",
    description: "Flavorful chicken lollipops, deep fried.",
    price: 180,
    currency: "₹",
    category: "starters",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=300&q=80",
    isPopular: true,
  },

  // Main Course
  {
    id: "m9",
    name: "Kerala Mutton Roast",
    description: "Slow roasted tender mutton seasoned with authentic Kerala spices.",
    price: 320,
    currency: "₹",
    category: "main-course",
    image: "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=300&q=80",
    isPopular: true,
  },
  {
    id: "m10",
    name: "Butter Chicken Masala",
    description: "Rich tomato-butter gravy with char-grilled succulent chicken.",
    price: 220,
    currency: "₹",
    category: "main-course",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "m11",
    name: "Paneer Butter Masala",
    description: "Soft paneer cubes simmered in aromatic velvet tomato gravy.",
    price: 190,
    currency: "₹",
    category: "main-course",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "m12",
    name: "Fish Moilee",
    description: "Mildly spiced king fish stew cooked with coconut milk & green chilies.",
    price: 280,
    currency: "₹",
    category: "main-course",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=300&q=80",
    isPopular: true,
  },

  // Rice & Breads
  {
    id: "m13",
    name: "Malabar Dum Biryani",
    description: "Fragrant Jeerakasala rice layered with marinated spiced meat.",
    price: 240,
    currency: "₹",
    category: "rice-breads",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80",
    isPopular: true,
  },
  {
    id: "m14",
    name: "Kerala Parotta",
    description: "Flaky, multi-layered flatbread prepared fresh.",
    price: 25,
    currency: "₹",
    category: "rice-breads",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "m15",
    name: "Ghee Rice (Neerachore)",
    description: "Aromatic short-grain rice cooked in pure ghee with roasted cashews.",
    price: 110,
    currency: "₹",
    category: "rice-breads",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "m16",
    name: "Garlic Butter Naan",
    description: "Clay oven baked flatbread topped with garlic and melted butter.",
    price: 45,
    currency: "₹",
    category: "rice-breads",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=300&q=80",
  },

  // Desserts
  {
    id: "m17",
    name: "Payasam Trio",
    description: "Classic Ada Pradhaman, Palada, and Semiya Payasam sampler.",
    price: 120,
    currency: "₹",
    category: "desserts",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=300&q=80",
    isPopular: true,
  },
  {
    id: "m18",
    name: "Tender Coconut Pudding",
    description: "Velvety chilled pudding crafted from fresh tender coconut flesh.",
    price: 130,
    currency: "₹",
    category: "desserts",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "m19",
    name: "Gulab Jamun with Ice Cream",
    description: "Warm syrup-soaked jamuns served alongside vanilla bean ice cream.",
    price: 90,
    currency: "₹",
    category: "desserts",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=300&q=80",
  },

  // Beverages
  {
    id: "m20",
    name: "Mint Lime Kulukki",
    description: "Signature shaken lime punch infused with mint, chili, and basil seeds.",
    price: 60,
    currency: "₹",
    category: "beverages",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80",
    isPopular: true,
  },
  {
    id: "m21",
    name: "Spiced Sambharam",
    description: "Refreshing traditional buttermilk tempered with crushed ginger & curry leaves.",
    price: 40,
    currency: "₹",
    category: "beverages",
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=300&q=80",
  },
];
