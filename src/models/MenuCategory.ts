import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMenuCategory extends Document {
  name: string;
  slug: string;
  shortName?: string;
  number?: string;
  description?: string;
  serviceStyles: ("buffet" | "table-service" | "sadya")[];
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MenuCategorySchema = new Schema<IMenuCategory>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Category slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    shortName: {
      type: String,
      trim: true,
    },
    number: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    serviceStyles: {
      type: [String],
      enum: ["buffet", "table-service", "sadya"],
      default: ["buffet", "table-service", "sadya"],
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

// Indexes
MenuCategorySchema.index({ slug: 1 });
MenuCategorySchema.index({ sortOrder: 1 });
MenuCategorySchema.index({ isActive: 1 });

export const MenuCategory: Model<IMenuCategory> =
  mongoose.models.MenuCategory ||
  mongoose.model<IMenuCategory>("MenuCategory", MenuCategorySchema);
