export interface RealMenuCourse {
  title: string;
  items: string[];
  badge?: string;
}

export interface RealMenu {
  id: string;
  menuNumber: string;
  title: string;
  subtitle: string;
  occasion: string;
  location: string;
  serviceStyle: "Buffet & Live Stalls" | "Grand Wedding Buffet" | "Traditional Sadya";
  image: string;
  tagline: string;
  overview: string;
  highlights: string[];
  stats: {
    dishesCount: string;
    liveStationsCount: string;
    beverageCount: string;
  };
  courses: RealMenuCourse[];
  whatsappMessage: string;
}

export const DEFAULT_MENU_CARDS = [
  {
    _id: "default-menu-1",
    id: "menu-1",
    menuNumber: "01",
    title: "Menu 01",
    image: "/menu items/menu1.jpeg",
    whatsappMessage:
      "Hello Green Apple Catering! I saw Menu 01 on your website and would like to get a quote for my event.",
    sortOrder: 1,
    isActive: true,
  },
  {
    _id: "default-menu-2",
    id: "menu-2",
    menuNumber: "02",
    title: "Menu 02",
    image: "/menu items/menu2.jpeg",
    whatsappMessage:
      "Hello Green Apple Catering! I saw Menu 02 on your website and would like to get a quote for my event.",
    sortOrder: 2,
    isActive: true,
  },
];

export const REAL_MENUS_DATA: RealMenu[] = [
  {
    id: "real-menu-1",
    menuNumber: "MENU 01",
    title: "Grand Reception & Live Starters Banquet",
    subtitle: "Paal Kappa & Meen Curry, Live Rumali & Poratta, Dum Biryani & Puddings",
    occasion: "Wedding Reception & Betrothal Feast",
    location: "Kothamangalam, Kerala",
    serviceStyle: "Buffet & Live Stalls",
    image: "/menu items/menu1.jpeg",
    tagline: "Let us be your personal chef for your special occasion",
    overview:
      "A crowd-favorite celebration menu featuring live counter rotis, traditional Paal Kappa with spicy fish curry, Thalassery-style Chicken Dum Biryani, and artisanal tender coconut puddings.",
    highlights: [
      "Live Rumali Roti & Poratta Counters",
      "Traditional Paal Kappa & Fish Curry",
      "Signature Chicken Dum Biryani",
      "Ilaneer (Tender Coconut) & Caramel Puddings",
      "6-Variety Fresh Welcome Drink Bar",
    ],
    stats: {
      dishesCount: "28+ Dishes",
      liveStationsCount: "4 Live Stalls",
      beverageCount: "6 Refreshers",
    },
    courses: [
      {
        title: "Welcome Drinks (Live)",
        badge: "6 Choices",
        items: [
          "Fresh Watermelon Juice",
          "Black Grape Juice",
          "Pineapple Nectar",
          "Mint Lime Refresher",
          "Ginger Lime Cooler",
          "2 Variety Mojito Bar",
        ],
      },
      {
        title: "Snacks & Finger Foods",
        badge: "Crispy Starters",
        items: [
          "Cocktail Vegetable Samosas",
          "Golden Chicken Nuggets",
          "Crispy Chicken Pops",
          "French Fries with Dips",
        ],
      },
      {
        title: "Live Starters & Fresh Breads",
        badge: "Live Action",
        items: [
          "Steamed Paal Kappa & Spicy Fish Curry",
          "Lace Appam & Soft Idiyappam",
          "Rumali Roti (Live Cooking Station)",
          "Kerala Poratta (Live Cooking Station)",
          "Slow-Cooked Nadan Beef Roast",
          "Vegetable Stew in Coconut Milk",
        ],
      },
      {
        title: "Main Course",
        badge: "Centerpiece",
        items: [
          "Special Chicken Dum Biryani",
          "Traditional Lemon & Dates Pickle",
          "Fresh Onion-Cucumber Curd Salad (Raita)",
        ],
      },
      {
        title: "Salads & Entrees",
        badge: "Sides & Accompaniments",
        items: [
          "Full Chicken Fry (Kerala Spiced)",
          "Italian Creamy Pasta Salad",
          "Tossed Garden Green Salad",
          "Uppilittathu (Brined Mangoes, Gooseberry & Chillies)",
        ],
      },
      {
        title: "Pastry & Puddings",
        badge: "Handcrafted",
        items: [
          "Signature Tender Coconut (Ilaneer) Pudding",
          "Velvety Caramel Custard Pudding",
        ],
      },
      {
        title: "Desserts & Finale",
        badge: "Sweet Ending",
        items: [
          "Premium Ice Cream (Vanilla & Strawberry)",
          "Warm Melt-in-Mouth Gulab Jamun",
        ],
      },
    ],
    whatsappMessage:
      "Hello Green Apple Catering team! I saw Menu 01 (Grand Reception & Live Starters Banquet with Paal Kappa, Poratta & Dum Biryani) on your website. I would like to get a quote for my upcoming celebration.",
  },
  {
    id: "real-menu-2",
    menuNumber: "MENU 02",
    title: "Royal Wedding Feast & Live Tea Lounge",
    subtitle: "Fish Moilee, Coin & Bun Poratta, 10-Variety Salad Bar & 5-Verity Tea",
    occasion: "Royal Wedding Banquet & Jubilee Celebration",
    location: "Kothamangalam, Kerala",
    serviceStyle: "Grand Wedding Buffet",
    image: "/menu items/menu2.jpeg",
    tagline: "Make your moments memorable with flavour",
    overview:
      "A grand multi-course banquet served in high-end wedding halls with dedicated buffet pavilions, Fish Moilee in rich coconut milk, Coin and Bun Porattas, 10 types of gourmet salads, and an interactive 5-variety live tea & coffee stall.",
    highlights: [
      "Signature Fish Moilee & Matar Paneer",
      "Coin Poratta & Fluffy Bun Poratta",
      "Triple Rice Selection (Pulao, Fried Rice, Biryani)",
      "10-Variety Gourmet Salad Counter",
      "Live 5-Variety Tea & Filter Coffee Stall",
    ],
    stats: {
      dishesCount: "32+ Dishes",
      liveStationsCount: "5 Live Pavilions",
      beverageCount: "7 Refreshers + Hot Teas",
    },
    courses: [
      {
        title: "Welcome Drinks",
        badge: "Fresh Juices",
        items: [
          "Fresh Watermelon Juice",
          "Grape Juice",
          "Orange Juice",
          "Pineapple Juice",
          "Mint Lime Cooler",
          "Ginger Lime Refresher",
        ],
      },
      {
        title: "Snacks & Starters",
        badge: "Pass-Arounds",
        items: [
          "Cocktail Samosas",
          "Chicken Nuggets",
          "Crispy French Fries",
        ],
      },
      {
        title: "Specialty Breads & Starters",
        badge: "Live Tawa",
        items: [
          "Lace Appam",
          "Steamed Idiyappam",
          "Kerala Coin Poratta",
          "Fluffy Bun Poratta",
        ],
      },
      {
        title: "Curries & Delicacies",
        badge: "Rich Gravies",
        items: [
          "Traditional Fish Molly (Moilee) in Rich Coconut Cream",
          "Vegetable Kuruma",
          "Creamy Matar Paneer",
          "Crispy Chilly Gobi",
        ],
      },
      {
        title: "Main Course Selection",
        badge: "Grand Feasts",
        items: [
          "Aromatic Pulao Rice / Veg Fried Rice",
          "Fragrant Biryani Rice",
          "Signature Slow-Roasted Chicken Roast",
        ],
      },
      {
        title: "Gourmet Salad Bar & Sides",
        badge: "10 Varieties",
        items: [
          "10 Types of Artisanal Salads (Pasta, Russian, Sprout, Coleslaw, Green)",
          "Uppilittathum (Traditional Brined Delights)",
          "Kerala Spiced Pickles",
          "Crispy Colorful Frymes",
        ],
      },
      {
        title: "Desserts & Pastry Section",
        badge: "Confectionery",
        items: [
          "Creamy Ice Cream",
          "Assorted Chilled Puddings",
          "Warm Gulab Jamun",
          "Special Pastry Cake Section",
        ],
      },
      {
        title: "Beverages & Live Tea Stall",
        badge: "Live Lounge",
        items: [
          "Packaged Drinking Water",
          "5-Variety Live Tea Counter (Kattan, Pal Chaya, Masala, Ginger, Sulaimani)",
          "Fresh Brewed Milk Coffee & Black Coffee",
        ],
      },
    ],
    whatsappMessage:
      "Hello Green Apple Catering team! I saw Menu 02 (Royal Wedding Feast & Live Tea Lounge with Fish Moilee, 10-Variety Salad & 5-Variety Tea) on your website. I would like to get a quote for my upcoming celebration.",
  },
];
