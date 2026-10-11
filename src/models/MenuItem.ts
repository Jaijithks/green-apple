import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMenuItem extends Document {
  name: string;
  malayalamName?: string;
  slug: string;
  category: string; // Slug reference to MenuCategory
  foodType: "veg" | "non-veg" | "seafood" | "beverage" | "dessert" | "live";
  description?: string;
  price: number;
  currency: string;
  image?: string;
  cloudinaryPublicId?: string;
  isPopular: boolean;
  isSignature: boolean;
  serviceStyles: ("buffet" | "table-service" | "sadya")[];
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema = new Schema<IMenuItem>(
  {
    name: {
      type: String,
      required: [true, "Dish/Item name is required"],
      trim: true,
    },
    malayalamName: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: [true, "Item category is required"],
      trim: true,
    },
    foodType: {
      type: String,
      enum: ["veg", "non-veg", "seafood", "beverage", "dessert", "live"],
      default: "veg",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
      min: [0, "Price cannot be negative"],
    },
    currency: {
      type: String,
      default: "₹",
      trim: true,
    },
    image: {
      type: String,
      trim: true,
      default: "",
    },
    cloudinaryPublicId: {
      type: String,
      trim: true,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    isSignature: {
      type: Boolean,
      default: false,
    },
    serviceStyles: {
      type: [String],
      enum: ["buffet", "table-service", "sadya"],
      default: ["buffet", "table-service"],
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for high performance querying & filtering
MenuItemSchema.index({ category: 1, isActive: 1 });
MenuItemSchema.index({ sortOrder: 1 });
MenuItemSchema.index({ slug: 1 });

export const MenuItem: Model<IMenuItem> =
  mongoose.models.MenuItem || mongoose.model<IMenuItem>("MenuItem", MenuItemSchema);
