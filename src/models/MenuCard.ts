import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMenuCard extends Document {
  title: string;
  menuNumber?: string;
  image: string;
  cloudinaryPublicId?: string;
  whatsappMessage?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MenuCardSchema = new Schema<IMenuCard>(
  {
    title: {
      type: String,
      required: [true, "Menu title is required"],
      trim: true,
      default: "Menu Card",
    },
    menuNumber: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      type: String,
      required: [true, "Menu image URL is required"],
      trim: true,
    },
    cloudinaryPublicId: {
      type: String,
      trim: true,
    },
    whatsappMessage: {
      type: String,
      trim: true,
      default: "",
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

MenuCardSchema.index({ isActive: 1, sortOrder: 1 });
MenuCardSchema.index({ sortOrder: 1 });

export const MenuCard: Model<IMenuCard> =
  mongoose.models.MenuCard || mongoose.model<IMenuCard>("MenuCard", MenuCardSchema);
