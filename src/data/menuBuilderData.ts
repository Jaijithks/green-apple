export type ServiceStyleId = "buffet" | "table-service" | "sadya";

export interface ServiceStyle {
  id: ServiceStyleId;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description?: string;
  image?: string;
  serviceStyles?: ServiceStyleId[];
  isSignature?: boolean;
}

export interface MenuCategory {
  id: string;
  number: string;
  name: string;
  shortName: string;
  serviceStyles?: ServiceStyleId[];
  description?: string;
}

export interface PresetMenu {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  serviceStyle: ServiceStyleId;
  idealFor: string;
  itemIds: string[];
  suggestedCounters?: Array<{ name: string; itemIds: string[] }>;
}

export interface CateringCounter {
  id: string;
  name: string;
  itemIds: string[];
}

export interface EventDetails {
  fullName: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  location: string;
  additionalNotes: string;
  preferredTime?: string;
}

export const SERVICE_STYLES: ServiceStyle[] = [
  {
    id: "buffet",
    title: "BUFFET",
    subtitle: "Interactive Multi-Counter Spread",
    description: "Guests walk through beautifully styled catering counters and live action stations at their own pace.",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=85",
    badge: "Most Popular for Receptions & Galas",
  },
  {
    id: "table-service",
    title: "TABLE SERVICE",
    subtitle: "Seated Royal Dining",
    description: "Guests remain seated while each curated course is served directly to tables and refreshed with attentive hospitality.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=85",
    badge: "Ideal for Intimate & VIP Gatherings",
  },
  {
    id: "sadya",
    title: "SADYA",
    subtitle: "Traditional Kerala Feast",
    description: "Guests are seated and authentic dishes are served sequentially on fresh green plantain leaves in time-honored tradition.",
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1000&q=85",
    badge: "Heritage Wedding & Festive Tradition",
  },
];

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "welcome-drinks",
    number: "01",
    name: "WELCOME DRINKS",
    shortName: "Drinks",
    serviceStyles: ["buffet", "table-service"],
    description: "Chilled signature refreshers to welcome your arriving guests.",
  },
  {
    id: "starters",
    number: "02",
    name: "STARTERS & CANAPÉS",
    shortName: "Starters",
    serviceStyles: ["buffet", "table-service"],
    description: "Crispy appetizers, skewers, and passed finger foods.",
  },
  {
    id: "main-course",
    number: "03",
    name: "MAIN COURSE",
    shortName: "Mains",
    serviceStyles: ["buffet", "table-service"],
    description: "Signature meat, seafood, and rich vegetarian curries & roasts.",
  },
  {
    id: "side-dishes",
    number: "04",
    name: "SIDE DISHES & SALADS",
    shortName: "Sides",
    serviceStyles: ["buffet", "table-service"],
    description: "Fresh garden salads, raitas, and accompaniment gravies.",
  },
  {
    id: "rice-biryani",
    number: "05",
    name: "RICE & BIRYANI",
    shortName: "Rice",
    serviceStyles: ["buffet", "table-service"],
    description: "Aromatic Malabar dum biryanis, ghee rice, and steamed staples.",
  },
  {
    id: "breads",
    number: "06",
    name: "BREADS & APPAMS",
    shortName: "Breads",
    serviceStyles: ["buffet", "table-service"],
    description: "Hot flaky Kerala parottas, soft naans, and lace appams.",
  },
  {
    id: "live-counters",
    number: "07",
    name: "LIVE COUNTERS",
    shortName: "Live",
    serviceStyles: ["buffet"],
    description: "Interactive chef stations cooked fresh in front of your guests.",
  },
  {
    id: "desserts",
    number: "08",
    name: "DESSERTS",
    shortName: "Desserts",
    serviceStyles: ["buffet", "table-service", "sadya"],
    description: "Traditional payasams, puddings, ice creams, and sweet delights.",
  },
  {
    id: "beverages",
    number: "09",
    name: "HOT BEVERAGES",
    shortName: "Beverages",
    serviceStyles: ["buffet", "table-service"],
    description: "Freshly brewed filter coffee, spiced chai, and refreshments.",
  },
  // Sadya Specific Categories
  {
    id: "sadya-rice-curries",
    number: "01",
    name: "RICE & GRAVIES",
    shortName: "Rice & Curries",
    serviceStyles: ["sadya"],
    description: "Kerala Matta rice with pure ghee, parippu, sambar, and rasam.",
  },
  {
    id: "sadya-vegetable-dishes",
    number: "02",
    name: "TRADITIONAL SIDES & KOOTTUKARI",
    shortName: "Vegetables",
    serviceStyles: ["sadya"],
    description: "Authentic Avial, Thoran, Kalan, Olan, and Koottukari.",
  },
  {
    id: "sadya-pickles-sides",
    number: "03",
    name: "PICKLES, CHIPS & CRUNCH",
    shortName: "Pickles & Chips",
    serviceStyles: ["sadya"],
    description: "Upperi, Sharkara Varatti, Pappadam, Inji Puli, and mango pickle.",
  },
  {
    id: "sadya-payasam",
    number: "04",
    name: "ROYAL PAYASAM DUO",
    shortName: "Payasams",
    serviceStyles: ["sadya"],
    description: "Traditional Ada Pradhaman, Palada, and Parippu Payasam.",
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // Welcome Drinks
  {
    id: "wd-1",
    name: "Mint Lime Kulukki",
    category: "welcome-drinks",
    description: "Shaken fresh lime punch with muddled mint and basil seeds.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
    isSignature: true,
  },
  {
    id: "wd-2",
    name: "Tender Coconut Punch",
    category: "welcome-drinks",
    description: "Refreshing natural elaneer blend with a hint of cardamom.",
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
    isSignature: true,
  },
  {
    id: "wd-3",
    name: "Spiced Sambharam (Butter Milk)",
    category: "welcome-drinks",
    description: "Traditional tempered buttermilk with crushed ginger & curry leaves.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
  },
  {
    id: "wd-4",
    name: "Blue Lagoon Mocktail",
    category: "welcome-drinks",
    description: "Zesty citrus blue curacao blend topped with sparkling soda.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
  },

  // Starters
  {
    id: "st-1",
    name: "Kerala Chicken 65",
    category: "starters",
    description: "Crispy marinated spicy chicken bites tossed with fried curry leaves.",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
    isSignature: true,
  },
  {
    id: "st-2",
    name: "Chicken Lollipop",
    category: "starters",
    description: "Crispy fried frenched chicken wings served with hot garlic dip.",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
    isSignature: true,
  },
  {
    id: "st-3",
    name: "Tandoori Chicken Tikka",
    category: "starters",
    description: "Smoky clay-oven charred chicken skewers infused with aromatic spices.",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
  },
  {
    id: "st-4",
    name: "Paneer Tikka Skewers",
    category: "starters",
    description: "Marinated cottage cheese and bell peppers grilled to perfection.",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
    isSignature: true,
  },
  {
    id: "st-5",
    name: "Crispy Vegetable Spring Rolls",
    category: "starters",
    description: "Golden rolls stuffed with shredded vegetables and glass noodles.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
  },
  {
    id: "st-6",
    name: "Baby Corn Pepper Fry",
    category: "starters",
    description: "Crunchy tender baby corn sautéed with crushed Malabar black pepper.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
  },
  {
    id: "st-7",
    name: "Fish Finger with Tartar Dip",
    category: "starters",
    description: "Crumb-coated seasoned fish fillets fried golden.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
  },

  // Main Course
  {
    id: "mc-1",
    name: "Kerala Mutton Roast",
    category: "main-course",
    description: "Slow-roasted tender mutton with caramelized shallots and coconut slices.",
    image: "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
    isSignature: true,
  },
  {
    id: "mc-2",
    name: "Traditional Chicken Curry",
    category: "main-course",
    description: "Rich, homestyle Kerala chicken curry simmered with roasted spices.",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
  },
  {
    id: "mc-3",
    name: "Butter Chicken Masala",
    category: "main-course",
    description: "Velvety mild tomato-butter gravy with char-grilled chicken.",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
    isSignature: true,
  },
  {
    id: "mc-4",
    name: "Kerala Fish Moilee",
    category: "main-course",
    description: "Seer fish simmered gently in rich coconut milk with ginger and curry leaves.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
    isSignature: true,
  },
  {
    id: "mc-5",
    name: "Karimeen Pollichathu",
    category: "main-course",
    description: "Pearl spot fish coated in spicy masala and pan-roasted inside banana leaf.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
    isSignature: true,
  },
  {
    id: "mc-6",
    name: "Paneer Butter Masala",
    category: "main-course",
    description: "Creamy cottage cheese cubes in aromatic tomato cream gravy.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
  },
  {
    id: "mc-7",
    name: "Mixed Vegetable Kurma",
    category: "main-course",
    description: "Garden vegetables in a mild coconut-cashew white gravy.",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
  },

  // Side Dishes & Salads
  {
    id: "sd-1",
    name: "Fresh Garden Green Salad",
    category: "side-dishes",
    description: "Crisp cucumber, carrots, tomatoes, and greens with lemon vinaigrette.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
  },
  {
    id: "sd-2",
    name: "Pineapple Cucumber Raita",
    category: "side-dishes",
    description: "Sweet and savory whipped yogurt with crushed roasted cumin.",
    image: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
  },
  {
    id: "sd-3",
    name: "Kerala Date & Lemon Pickle",
    category: "side-dishes",
    description: "Zesty sweet-sour traditional banquet accompaniment.",
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
  },

  // Rice & Biryani
  {
    id: "rb-1",
    name: "Thalassery Chicken Dum Biryani",
    category: "rice-biryani",
    description: "Aromatic Jeerakasala rice dum-cooked with tender spiced chicken.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
    isSignature: true,
  },
  {
    id: "rb-2",
    name: "Malabar Mutton Dum Biryani",
    category: "rice-biryani",
    description: "Fragrant short-grain rice layered with slow-cooked spiced mutton.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
    isSignature: true,
  },
  {
    id: "rb-3",
    name: "Ghee Rice (Neerachore)",
    category: "rice-biryani",
    description: "Fragrant rice tempered in pure desi ghee with golden fried onions and cashews.",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
    isSignature: true,
  },
  {
    id: "rb-4",
    name: "Fragrant Jeera Rice",
    category: "rice-biryani",
    description: "Basmati rice tossed with whole roasted cumin seeds and fresh coriander.",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
  },
  {
    id: "rb-5",
    name: "Steamed Kerala Matta Rice",
    category: "rice-biryani",
    description: "Nutritious traditional parboiled red grain rice.",
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
  },

  // Breads
  {
    id: "br-1",
    name: "Malabar Porotta",
    category: "breads",
    description: "Flaky, multi-layered flatbread prepared hot on the griddle.",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
    isSignature: true,
  },
  {
    id: "br-2",
    name: "Soft Butter Naan & Garlic Naan",
    category: "breads",
    description: "Oven-baked tandoori leavened flatbread brushed with butter.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
  },
  {
    id: "br-3",
    name: "Hot Appam (Vellayappam)",
    category: "breads",
    description: "Soft centered fermented rice pancake with delicate crispy lace edges.",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
    isSignature: true,
  },
  {
    id: "br-4",
    name: "Wheat Chapathi / Phulka",
    category: "breads",
    description: "Soft whole wheat flatbread made fresh.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
  },

  // Live Counters
  {
    id: "lc-1",
    name: "Live Tandoor & Barbeque Station",
    category: "live-counters",
    description: "Live grilled chicken skewers, fish tikkas, and paneer tikkas.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet"],
    isSignature: true,
  },
  {
    id: "lc-2",
    name: "Live Hot Dosa & Appam Station",
    category: "live-counters",
    description: "Crispy ghee roast dosas and fresh hot appams with choice of gravies.",
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet"],
    isSignature: true,
  },
  {
    id: "lc-3",
    name: "Live Pasta & Italian Action Counter",
    category: "live-counters",
    description: "Freshly tossed penne & fusilli in creamy Alfredo, Arrabbiata, or pesto.",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet"],
  },
  {
    id: "lc-4",
    name: "Signature Chaat & Pani Puri Counter",
    category: "live-counters",
    description: "Live interactive street chaats, dahi puris, and flavored pani puris.",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet"],
  },

  // Desserts
  {
    id: "ds-1",
    name: "Palada Pradhaman Payasam",
    category: "desserts",
    description: "Rich pink condensed milk payasam with delicate rice flakes.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service", "sadya"],
    isSignature: true,
  },
  {
    id: "ds-2",
    name: "Ada Pradhaman (Jaggery & Coconut)",
    category: "desserts",
    description: "Classic Kerala dessert cooked in jaggery syrup and thick coconut milk.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service", "sadya"],
    isSignature: true,
  },
  {
    id: "ds-3",
    name: "Tender Coconut Pudding",
    category: "desserts",
    description: "Silky chilled coconut milk pudding garnished with fresh tender pulp.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
    isSignature: true,
  },
  {
    id: "ds-4",
    name: "Gulab Jamun with Ice Cream",
    category: "desserts",
    description: "Warm syrup-soaked jamuns paired with Madagascar vanilla bean ice cream.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
  },
  {
    id: "ds-5",
    name: "Assorted Pastry & Mousse Lounge",
    category: "desserts",
    description: "Mini chocolate eclairs, red velvet pastries, and mango mousse cups.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet"],
  },

  // Beverages
  {
    id: "bv-1",
    name: "Fresh Kerala Filter Coffee",
    category: "beverages",
    description: "Strong frothy decoction coffee served hot in traditional style.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
  },
  {
    id: "bv-2",
    name: "Cardamom & Ginger Spiced Tea",
    category: "beverages",
    description: "Aromatic Malabar milk tea boiled with crushed spices.",
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=500&q=80",
    serviceStyles: ["buffet", "table-service"],
  },

  // Sadya Specific Items
  {
    id: "sy-1",
    name: "Kerala Matta Rice & Pure Desi Ghee",
    category: "sadya-rice-curries",
    description: "Steamed red rice served with hot melted cow ghee.",
    serviceStyles: ["sadya"],
    isSignature: true,
  },
  {
    id: "sy-2",
    name: "Parippu Curry (Tempered Dal)",
    category: "sadya-rice-curries",
    description: "Creamy cooked yellow lentils tempered with cumin, green chilies, and coconut.",
    serviceStyles: ["sadya"],
    isSignature: true,
  },
  {
    id: "sy-3",
    name: "Authentic Kerala Sambar",
    category: "sadya-rice-curries",
    description: "Rich vegetable stew flavored with freshly roasted spices and drumsticks.",
    serviceStyles: ["sadya"],
    isSignature: true,
  },
  {
    id: "sy-4",
    name: "Travancore Rasam & Moru Curry",
    category: "sadya-rice-curries",
    description: "Tangy pepper rasam and spiced seasoned buttermilk.",
    serviceStyles: ["sadya"],
  },
  {
    id: "sy-5",
    name: "Traditional Mixed Vegetable Avial",
    category: "sadya-vegetable-dishes",
    description: "Thick medley of country vegetables cooked in coconut paste and pure coconut oil.",
    serviceStyles: ["sadya"],
    isSignature: true,
  },
  {
    id: "sy-6",
    name: "Cabbage & Carrot Thoran",
    category: "sadya-vegetable-dishes",
    description: "Shredded vegetables stir-fried with mustard seeds and fresh grated coconut.",
    serviceStyles: ["sadya"],
  },
  {
    id: "sy-7",
    name: "Kurukku Kalan & Ash Gourd Olan",
    category: "sadya-vegetable-dishes",
    description: "Thick yogurt curry with raw plantain & ash gourd simmered in coconut milk.",
    serviceStyles: ["sadya"],
    isSignature: true,
  },
  {
    id: "sy-8",
    name: "Koottukari",
    category: "sadya-vegetable-dishes",
    description: "Spicy roasted coconut curry with black chickpeas, raw banana, and yam.",
    serviceStyles: ["sadya"],
  },
  {
    id: "sy-9",
    name: "Beetroot & Pineapple Pachadi",
    category: "sadya-vegetable-dishes",
    description: "Sweet and tangy yogurt relish tempered with mustard seeds.",
    serviceStyles: ["sadya"],
  },
  {
    id: "sy-10",
    name: "Upperi (Banana Chips) & Sharkara Varatti",
    category: "sadya-pickles-sides",
    description: "Crisp coconut-oil fried banana chips and jaggery-coated spiced chips.",
    serviceStyles: ["sadya"],
    isSignature: true,
  },
  {
    id: "sy-11",
    name: "Pappadam Trio",
    category: "sadya-pickles-sides",
    description: "Crispy Kerala pappadams.",
    serviceStyles: ["sadya"],
    isSignature: true,
  },
  {
    id: "sy-12",
    name: "Inji Puli & Mango Pickle",
    category: "sadya-pickles-sides",
    description: "Piquant ginger-tamarind preserve and spicy tender mango pickle.",
    serviceStyles: ["sadya"],
    isSignature: true,
  },
  {
    id: "sy-13",
    name: "Ada Pradhaman Payasam",
    category: "sadya-payasam",
    description: "Classic rich payasam made with rice flakes, dark jaggery, and coconut milk.",
    serviceStyles: ["sadya"],
    isSignature: true,
  },
  {
    id: "sy-14",
    name: "Palada Payasam (Pink Milk Sweet)",
    category: "sadya-payasam",
    description: "Rich, slow-simmered condensed milk payasam.",
    serviceStyles: ["sadya"],
    isSignature: true,
  },
];

export const PRESET_MENUS: PresetMenu[] = [
  {
    id: "royal-wedding",
    name: "Royal Wedding Grand Feast",
    tagline: "The Pinnacle of Celebratory Luxury",
    description: "A sumptuous multi-cuisine spread designed for grand wedding receptions, complete with live counters, signature biryani, tender meats, and artisanal desserts.",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=85",
    serviceStyle: "buffet",
    idealFor: "Wedding Receptions, Engagements & Grand Galas",
    itemIds: [
      "wd-1",
      "wd-2",
      "st-1",
      "st-3",
      "st-4",
      "mc-1",
      "mc-3",
      "mc-4",
      "sd-1",
      "sd-2",
      "rb-1",
      "rb-3",
      "br-1",
      "br-2",
      "lc-1",
      "lc-2",
      "ds-1",
      "ds-3",
      "ds-4",
    ],
    suggestedCounters: [
      { name: "Welcome Drink Lounge", itemIds: ["wd-1", "wd-2"] },
      { name: "Live Tandoor & Grill Station", itemIds: ["lc-1", "st-3", "st-4"] },
      { name: "Grand Biryani & Entrees", itemIds: ["rb-1", "mc-1", "mc-3", "mc-4", "sd-1", "sd-2"] },
      { name: "Hot Breads & Appam Station", itemIds: ["lc-2", "br-1", "br-2"] },
      { name: "Gourmet Dessert Counter", itemIds: ["ds-1", "ds-3", "ds-4"] },
    ],
  },
  {
    id: "traditional-sadya",
    name: "Traditional Kerala Sadya",
    tagline: "Authentic Heritage 24+ Item Feast",
    description: "Time-honored vegetarian banquet served on fresh banana leaves with pure ghee, parippu, sambar, avial, kalan, upperi, and dual royal payasams.",
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1000&q=85",
    serviceStyle: "sadya",
    idealFor: "Traditional Weddings, Housewarmings & Festive Occasions",
    itemIds: [
      "sy-1",
      "sy-2",
      "sy-3",
      "sy-4",
      "sy-5",
      "sy-6",
      "sy-7",
      "sy-8",
      "sy-9",
      "sy-10",
      "sy-11",
      "sy-12",
      "sy-13",
      "sy-14",
    ],
  },
  {
    id: "premium-buffet",
    name: "Signature Multi-Cuisine Buffet",
    tagline: "Curated Flavours for Contemporary Gatherings",
    description: "A balanced selection of Kerala favorites, North Indian tandoori specialties, flaky parottas, and chilled desserts perfect for family milestones and celebrations.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=85",
    serviceStyle: "buffet",
    idealFor: "Anniversaries, Birthday Galas & Social Gatherings",
    itemIds: [
      "wd-1",
      "st-1",
      "st-5",
      "mc-2",
      "mc-6",
      "sd-1",
      "rb-3",
      "br-1",
      "br-3",
      "ds-2",
      "ds-4",
    ],
    suggestedCounters: [
      { name: "Appetizer & Starter Counter", itemIds: ["wd-1", "st-1", "st-5"] },
      { name: "Main Dining & Curry Station", itemIds: ["mc-2", "mc-6", "sd-1", "rb-3", "br-1", "br-3"] },
      { name: "Dessert & Sweet Corner", itemIds: ["ds-2", "ds-4"] },
    ],
  },
  {
    id: "christian-wedding",
    name: "Traditional Syrian Christian Feast",
    tagline: "Heritage Celebratory Syrian Christian Menu",
    description: "Classic celebratory menu featuring hot appams with chicken/mutton stew, fish moilee, fragrant dum biryani, and tender coconut dessert.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=85",
    serviceStyle: "buffet",
    idealFor: "Christian Weddings, Betrothals & Baptisms",
    itemIds: [
      "wd-2",
      "st-2",
      "st-7",
      "mc-1",
      "mc-4",
      "mc-2",
      "sd-1",
      "rb-1",
      "br-1",
      "br-3",
      "ds-3",
      "ds-4",
    ],
    suggestedCounters: [
      { name: "Welcome Drink & Starters", itemIds: ["wd-2", "st-2", "st-7"] },
      { name: "Live Appam & Breads Counter", itemIds: ["br-1", "br-3", "mc-4"] },
      { name: "Dum Biryani & Roast Station", itemIds: ["rb-1", "mc-1", "mc-2", "sd-1"] },
      { name: "Chilled Pudding & Dessert Table", itemIds: ["ds-3", "ds-4"] },
    ],
  },
  {
    id: "corporate-executive",
    name: "Executive Corporate Buffet",
    tagline: "Punctual, Hygienic & Refined Corporate Hospitality",
    description: "Professional multi-course corporate dining featuring energizing welcome drinks, light starters, wholesome mains, rice, fresh breads, and gourmet dessert cups.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=85",
    serviceStyle: "buffet",
    idealFor: "Conferences, Annual Corporate Galas & Summits",
    itemIds: [
      "wd-1",
      "st-4",
      "st-5",
      "mc-3",
      "mc-6",
      "sd-1",
      "rb-4",
      "br-2",
      "ds-3",
      "bv-1",
    ],
    suggestedCounters: [
      { name: "Beverages & Starters", itemIds: ["wd-1", "st-4", "st-5"] },
      { name: "Executive Main Spread", itemIds: ["mc-3", "mc-6", "sd-1", "rb-4", "br-2"] },
      { name: "Dessert & Coffee Bar", itemIds: ["ds-3", "bv-1"] },
    ],
  },
];
