"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Trash2,
  Edit2,
  Video,
  Image as ImageIcon,
  Check,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";
import MediaUploader from "@/components/admin/MediaUploader";

interface GalleryItem {
  _id: string;
  title?: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
  category: string;
  cloudinaryPublicId?: string;
  sortOrder: number;
  isActive: boolean;
}

const GALLERY_CATEGORIES = [
  "All",
  "Weddings",
  "Buffet",
  "Decor",
  "Birthdays",
  "Corporate",
  "Traditional",
];

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "image" as "image" | "video",
    src: "",
    poster: "",
    alt: "",
    category: "Weddings",
    cloudinaryPublicId: "",
    sortOrder: 0,
    isActive: true,
  });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setItems(data.data || []);
    } catch {
      showToast("Failed to load gallery items", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      type: "image",
      src: "",
      poster: "",
      alt: "",
      category: "Weddings",
      cloudinaryPublicId: "",
      sortOrder: items.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      type: item.type || "image",
      src: item.src,
      poster: item.poster || "",
      alt: item.alt || "",
      category: item.category || "Weddings",
      cloudinaryPublicId: item.cloudinaryPublicId || "",
      sortOrder: item.sortOrder || 0,
      isActive: item.isActive,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.src.trim()) {
      showToast("Please upload a media file or provide a media URL", "error");
      return;
    }

    setSaving(true);
    try {
      const url = editingItem
        ? `/api/gallery/${editingItem._id}`
        : "/api/gallery";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save gallery item");

      showToast(
        editingItem ? "Gallery item updated successfully" : "Gallery media uploaded successfully"
      );
      setIsModalOpen(false);
      await fetchGallery();
    } catch (err: any) {
      showToast(err?.message || "Operation failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title?: string) => {
    const label = title || "this gallery item";
    if (!confirm(`Are you sure you want to delete ${label}?`)) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete item");

      showToast("Gallery item deleted successfully");
      await fetchGallery();
    } catch (err: any) {
      showToast(err?.message || "Delete failed", "error");
    }
  };

  const handleClearAllGallery = async () => {
    if (!confirm("Are you sure you want to CLEAR all gallery items from the database? This will leave your gallery clean for your own uploads.")) {
      return;
    }

    try {
      // Delete all items one by one or through clear
      for (const item of items) {
        await fetch(`/api/gallery/${item._id}`, { method: "DELETE" });
      }
      showToast("All gallery media cleared. Ready for your uploads!");
      await fetchGallery();
    } catch (err: any) {
      showToast(err?.message || "Clear failed", "error");
    }
  };

  const handleToggleActive = async (item: GalleryItem) => {
    try {
      const res = await fetch(`/api/gallery/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !item.isActive }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      await fetchGallery();
    } catch (err: any) {
      showToast(err?.message || "Update failed", "error");
    }
  };

  const filteredItems = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="space-y-6">
      {/* Toast alert */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg border text-xs flex items-center space-x-2 ${
            toast.type === "success"
              ? "bg-emerald-50 border-emerald-300 text-emerald-900"
              : "bg-red-50 border-red-300 text-red-900"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600" />
          )}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Gallery Media Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-light mt-0.5">
            Upload photos and videos directly from your device to Cloudinary
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          {items.length > 0 && (
            <button
              onClick={handleClearAllGallery}
              className="px-3.5 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 transition-colors cursor-pointer"
              title="Delete all gallery items"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Gallery</span>
            </button>
          )}

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 bg-[#229938] hover:bg-[#1c822e] text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 shadow-md shadow-emerald-950/20 transition-all hover:scale-102 active:scale-98 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Media</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {GALLERY_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              selectedCategory === cat
                ? "bg-emerald-800 text-white shadow-xs font-semibold"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="p-16 text-center text-gray-500 flex flex-col items-center justify-center space-y-2">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
          <span className="text-xs">Loading media assets...</span>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 text-gray-500 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#229938] flex items-center justify-center mx-auto shadow-xs">
            <ImageIcon className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">No media items in this category</p>
            <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1">
              Click &apos;Upload Media&apos; above to upload photos or videos from your computer or phone directly to Cloudinary.
            </p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#229938] hover:bg-[#1c822e] text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer transition-all hover:scale-102"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Upload First Media</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className={`group relative bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
                !item.isActive ? "opacity-60 bg-gray-50" : ""
              }`}
            >
              {/* Media Thumbnail */}
              <div className="relative h-48 w-full bg-gray-900 overflow-hidden">
                {item.type === "video" ? (
                  <div className="relative w-full h-full bg-black">
                    <video
                      src={item.src}
                      poster={item.poster || undefined}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      autoPlay
                      playsInline
                    />
                    <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                  </div>
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt || "Gallery item"}
                    fill
                    className="object-cover group-hover:scale-104 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                )}

                {/* Media Type Badge */}
                <div className="absolute top-3 left-3 flex items-center space-x-1.5 z-10">
                  <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold flex items-center space-x-1">
                    {item.type === "video" ? (
                      <>
                        <Video className="w-3 h-3 text-emerald-400" />
                        <span>Video</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-3 h-3 text-emerald-400" />
                        <span>Photo</span>
                      </>
                    )}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 backdrop-blur-xs text-emerald-300 text-[10px] font-semibold">
                    {item.category}
                  </span>
                </div>

                {/* Action overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 z-20">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-2 bg-white text-gray-900 hover:bg-emerald-50 rounded-full shadow-md cursor-pointer transition-transform hover:scale-105"
                    title="Edit Item"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id, item.title)}
                    className="p-2 bg-red-600 text-white hover:bg-red-700 rounded-full shadow-md cursor-pointer transition-transform hover:scale-105"
                    title="Delete Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Media Details */}
              <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold text-xs text-gray-900 line-clamp-1">
                    {item.title || item.alt || "Untitled Media"}
                  </h4>
                  <p className="text-[10.5px] text-gray-500 font-light line-clamp-1">
                    {item.alt || "No description provided"}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={() => handleToggleActive(item)}
                    className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-full cursor-pointer transition-colors ${
                      item.isActive
                        ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {item.isActive ? "Active" : "Hidden"}
                  </button>
                  <span className="text-[10px] text-gray-400 font-mono">
                    Order: {item.sortOrder || 0}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Media Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden my-8">
            <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="font-bold text-gray-900 text-base">
                {editingItem ? "Edit Gallery Media" : "Upload Gallery Media"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Wedding Banquet Spread"
                    className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white font-medium"
                  >
                    {GALLERY_CATEGORIES.filter((c) => c !== "All").map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Media Type */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Media Type
                </label>
                <div className="flex space-x-3 text-xs">
                  <label className="inline-flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="mediaType"
                      checked={formData.type === "image"}
                      onChange={() => setFormData({ ...formData, type: "image" })}
                      className="text-emerald-600"
                    />
                    <span className="font-medium text-gray-800">Photo / Image</span>
                  </label>
                  <label className="inline-flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="mediaType"
                      checked={formData.type === "video"}
                      onChange={() => setFormData({ ...formData, type: "video" })}
                      className="text-emerald-600"
                    />
                    <span className="font-medium text-gray-800">Video (MP4 / MOV)</span>
                  </label>
                </div>
              </div>

              {/* Alt description */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Caption / Description
                </label>
                <input
                  type="text"
                  value={formData.alt}
                  onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                  placeholder="e.g. Grand banquet catering spread illuminated under warm chandeliers"
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Direct Media Upload Component */}
              <div className="pt-2">
                <MediaUploader
                  value={formData.src}
                  mediaType={formData.type}
                  poster={formData.poster}
                  onChange={(url, publicId, detectedType) => {
                    setFormData((prev) => ({
                      ...prev,
                      src: url,
                      cloudinaryPublicId: publicId || prev.cloudinaryPublicId,
                      type: detectedType || prev.type,
                    }));
                  }}
                  onPosterChange={(posterUrl) => {
                    setFormData((prev) => ({ ...prev, poster: posterUrl }));
                  }}
                  folder="green-apple/gallery"
                  label={formData.type === "video" ? "Upload Video from Device" : "Upload Photo from Device"}
                />
              </div>

              {/* Active & Sort Order */}
              <div className="flex items-center justify-between pt-2">
                <label className="inline-flex items-center space-x-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="font-semibold text-gray-800">Show on Public Gallery</span>
                </label>

                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-gray-500">Sort Order:</span>
                  <input
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: Number(e.target.value) })}
                    className="w-16 px-2 py-1 border border-gray-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || !formData.src}
                  className="px-6 py-2.5 bg-[#229938] hover:bg-[#1c822e] text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 shadow-md shadow-emerald-950/20 disabled:opacity-50 cursor-pointer"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <span>{editingItem ? "Update Media" : "Save to Gallery"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
