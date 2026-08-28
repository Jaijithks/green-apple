import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGalleryItem extends Document {
  title?: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
  category: string;
  cloudinaryPublicId?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryItemSchema = new Schema<IGalleryItem>(
  {
    title: {
      type: String,
      trim: true,
      default: "",
    },
    type: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },
    src: {
      type: String,
      required: [true, "Media URL (src) is required"],
      trim: true,
    },
    poster: {
      type: String,
      trim: true,
      default: "",
    },
    alt: {
      type: String,
      required: [true, "Alt text is required for accessibility"],
      trim: true,
      default: "Green Apple Catering & Events showcase",
    },
    category: {
      type: String,
      trim: true,
      default: "All",
    },
    cloudinaryPublicId: {
      type: String,
      trim: true,
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

GalleryItemSchema.index({ category: 1, isActive: 1 });
GalleryItemSchema.index({ sortOrder: 1 });

export const GalleryItem: Model<IGalleryItem> =
  mongoose.models.GalleryItem ||
  mongoose.model<IGalleryItem>("GalleryItem", GalleryItemSchema);
