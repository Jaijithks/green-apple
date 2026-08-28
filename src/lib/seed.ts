import bcrypt from "bcryptjs";
import { connectToDatabase } from "./db";
import { MenuCategory } from "@/models/MenuCategory";
import { MenuItem } from "@/models/MenuItem";
import { GalleryItem } from "@/models/GalleryItem";
import { AdminUser } from "@/models/AdminUser";
import { menuCategories as defaultCategories, menuItemsData as defaultMenuItems } from "@/data/menu";
import { MENU_CATEGORIES as builderCategories, MENU_ITEMS as builderItems } from "@/data/menuBuilderData";

const DEFAULT_GALLERY = [
  {
    title: "Outdoor Evening Reception",
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
    alt: "Outdoor wedding dinner reception banquet under warm glowing string lights",
    category: "Weddings",
    sortOrder: 1,
  },
  {
    title: "Artisanal Buffet Spread",
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=85",
    alt: "Artisanal catering buffet spread with gourmet salads and warm delicacies",
    category: "Buffet",
    sortOrder: 2,
  },
  {
    title: "Bridal Bouquet Presentation",
    type: "video" as const,
    src: "https://assets.mixkit.co/videos/preview/mixkit-bride-holding-a-wedding-bouquet-43180-large.mp4",
    poster: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=85",
    alt: "Cinematic bridal wedding floral bouquet presentation",
    category: "Decor",
    sortOrder: 3,
  },
  {
    title: "Three-Tier Floral Wedding Cake",
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=800&q=85",
    alt: "Elegant three-tiered wedding cake styled with fresh white roses",
    category: "Birthdays",
    sortOrder: 4,
  },
  {
    title: "Gourmet Canapés & Starters",
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=85",
    alt: "Gourmet canapés and savory appetizers presented on serving tray",
    category: "Buffet",
    sortOrder: 5,
  },
  {
    title: "Grand Pavilion Decor",
    type: "video" as const,
    src: "https://assets.mixkit.co/videos/preview/mixkit-wedding-tables-in-a-hall-decorated-for-a-celebration-43181-large.mp4",
    poster: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=85",
    alt: "Grand wedding pavilion and luxury floral decor setup",
    category: "Decor",
    sortOrder: 6,
  },
  {
    title: "Live Gourmet Meat Carvery",
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85",
    alt: "Chef carving gourmet roast barbecue meat and appetizers on wooden board",
    category: "Corporate",
    sortOrder: 7,
  },
  {
    title: "South Indian Traditional Feast",
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80",
    alt: "Authentic multi-course Kerala banana leaf sadya feast",
    category: "Traditional",
    sortOrder: 8,
  },
];

export async function seedDatabase(force: boolean = false): Promise<{
  success: boolean;
  message: string;
  counts?: { categories: number; menuItems: number; galleryItems: number };
}> {
  const conn = await connectToDatabase();
  if (!conn) {
    return {
      success: false,
      message: "Database not connected. Please verify MONGODB_URI in environment.",
    };
  }

  try {
    // 1. Seed Categories
    const existingCatsCount = await MenuCategory.countDocuments();
    let seededCats = 0;

    if (existingCatsCount === 0 || force) {
      if (force) await MenuCategory.deleteMany({});

      // Combine builder categories and default categories
      const combinedCategories = [
        ...builderCategories.map((c, idx) => ({
          name: c.name,
          slug: c.id,
          shortName: c.shortName,
          number: c.number,
          description: c.description || "",
          serviceStyles: c.serviceStyles || ["buffet", "table-service", "sadya"],
          sortOrder: idx + 1,
          isActive: true,
        })),
      ];

      // Ensure standard categories exist
      for (const defCat of defaultCategories) {
        if (!combinedCategories.some((c) => c.slug === defCat.id)) {
          combinedCategories.push({
            name: defCat.name,
            slug: defCat.id,
            shortName: defCat.name,
            number: "0",
            description: "",
            serviceStyles: ["buffet", "table-service"],
            sortOrder: combinedCategories.length + 1,
            isActive: true,
          });
        }
      }

      await MenuCategory.insertMany(combinedCategories);
      seededCats = combinedCategories.length;
    }

    // 2. Seed Menu Items
    const existingItemsCount = await MenuItem.countDocuments();
    let seededItems = 0;

    if (existingItemsCount === 0 || force) {
      if (force) await MenuItem.deleteMany({});

      const combinedItemsMap = new Map<string, any>();

      // Load builder items
      for (let i = 0; i < builderItems.length; i++) {
        const item = builderItems[i];
        combinedItemsMap.set(item.name.toLowerCase().trim(), {
          name: item.name,
          slug: item.id || item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          category: item.category,
          description: item.description || "",
          price: 150, // Standard base price
          currency: "₹",
          image: item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
          isPopular: !!item.isSignature,
          isSignature: !!item.isSignature,
          serviceStyles: item.serviceStyles || ["buffet", "table-service"],
          sortOrder: i + 1,
          isActive: true,
        });
      }

      // Merge standard menu items
      for (let j = 0; j < defaultMenuItems.length; j++) {
        const item = defaultMenuItems[j];
        const key = item.name.toLowerCase().trim();
        if (combinedItemsMap.has(key)) {
          const existing = combinedItemsMap.get(key);
          existing.price = item.price;
          existing.description = item.description || existing.description;
          existing.image = item.image || existing.image;
          existing.isPopular = item.isPopular ?? existing.isPopular;
        } else {
          combinedItemsMap.set(key, {
            name: item.name,
            slug: item.id || item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            category: item.category,
            description: item.description || "",
            price: item.price || 150,
            currency: item.currency || "₹",
            image: item.image,
            isPopular: !!item.isPopular,
            isSignature: false,
            serviceStyles: ["buffet", "table-service"],
            sortOrder: combinedItemsMap.size + 1,
            isActive: true,
          });
        }
      }

      const itemsToInsert = Array.from(combinedItemsMap.values());
      await MenuItem.insertMany(itemsToInsert);
      seededItems = itemsToInsert.length;
    }

    // 3. Gallery Items (Left clean for admin direct uploads)
    const existingGalleryCount = await GalleryItem.countDocuments();

    // 4. Seed Default Admin
    const defaultEmail = (process.env.ADMIN_EMAIL || "admin@greenapplecatering.in").toLowerCase();
    const existingAdmin = await AdminUser.findOne({ email: defaultEmail });
    if (!existingAdmin) {
      const password = process.env.ADMIN_INITIAL_PASSWORD || "GreenAppleAdmin@2026!";
      const passwordHash = await bcrypt.hash(password, 10);
      await AdminUser.create({
        email: defaultEmail,
        passwordHash,
        name: "Green Apple Administrator",
        role: "admin",
      });
    }

    return {
      success: true,
      message: "Database seed completed successfully.",
      counts: {
        categories: seededCats || existingCatsCount,
        menuItems: seededItems || existingItemsCount,
        galleryItems: existingGalleryCount,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: `Database seeding failed: ${error?.message || "Unknown error"}`,
    };
  }
}
