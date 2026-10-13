"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  ArrowUpDown,
  BookOpen,
  Maximize2,
  RefreshCw,
} from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import { DEFAULT_MENU_CARDS } from "@/data/realMenusData";

interface MenuCardItem {
  _id: string;
  title: string;
  menuNumber?: string;
  image: string;
  cloudinaryPublicId?: string;
  whatsappMessage?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt?: string;
}

export default function AdminMenuCardsPage() {
  const [cards, setCards] = useState<MenuCardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<string>("database");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<MenuCardItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    menuNumber: "",
    image: "",
    cloudinaryPublicId: "",
    whatsappMessage: "",
    sortOrder: 1,
    isActive: true,
  });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchMenuCards = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/menu-cards");
      const data = await res.json();
      setCards(data.data || []);
      setSource(data.source || "database");
    } catch {
      showToast("Failed to load menu cards", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuCards();
  }, []);

  const handleOpenAdd = () => {
    setEditingCard(null);
    const nextNumber = String(cards.length + 1).padStart(2, "0");
    setFormData({
      title: `Menu ${nextNumber}`,
      menuNumber: nextNumber,
      image: "",
      cloudinaryPublicId: "",
      whatsappMessage: `Hello Green Apple Catering! I saw Menu ${nextNumber} on your website and would like to get a quote.`,
      sortOrder: cards.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (card: MenuCardItem) => {
    setEditingCard(card);
    setFormData({
      title: card.title || "",
      menuNumber: card.menuNumber || "",
      image: card.image || "",
      cloudinaryPublicId: card.cloudinaryPublicId || "",
      whatsappMessage: card.whatsappMessage || "",
      sortOrder: card.sortOrder || 1,
      isActive: card.isActive !== false,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image.trim()) {
      showToast("Please upload or provide an image for the menu card", "error");
      return;
    }

    setSaving(true);
    try {
      const url = editingCard ? `/api/menu-cards/${editingCard._id}` : "/api/menu-cards";
      const method = editingCard ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save menu card");
      }

      showToast(
        editingCard ? "Menu card updated successfully!" : "Menu card uploaded successfully!",
        "success"
      );
      setIsModalOpen(false);
      fetchMenuCards();
    } catch (err: any) {
      showToast(err?.message || "An error occurred while saving", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/menu-cards/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete menu card");
      }
      showToast("Menu card deleted successfully", "success");
      setDeleteConfirmId(null);
      fetchMenuCards();
    } catch (err: any) {
      showToast(err?.message || "Failed to delete", "error");
    }
  };

  const handleToggleActive = async (card: MenuCardItem) => {
    try {
      const res = await fetch(`/api/menu-cards/${card._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !card.isActive }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      showToast(
        `Menu ${card.title} is now ${!card.isActive ? "Active (Visible)" : "Hidden"}`,
        "success"
      );
      fetchMenuCards();
    } catch (err: any) {
      showToast(err?.message || "Update failed", "error");
    }
  };

  const handleSeedDefaults = async () => {
    setLoading(true);
    try {
      for (const def of DEFAULT_MENU_CARDS) {
        await fetch("/api/menu-cards", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: def.title,
            menuNumber: def.menuNumber,
            image: def.image,
            whatsappMessage: def.whatsappMessage,
            sortOrder: def.sortOrder,
            isActive: true,
          }),
        });
      }
      showToast("Default Menu 01 and Menu 02 added to database!", "success");
      fetchMenuCards();
    } catch {
      showToast("Failed to seed default menus", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-50 flex items-center space-x-2.5 px-4 py-3 rounded-xl shadow-xl text-xs font-medium text-white transition-all transform animate-in slide-in-from-bottom-2 ${
            toast.type === "success" ? "bg-emerald-700" : "bg-red-700"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-200" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header and Action Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-2xs">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-semibold tracking-wider text-emerald-700 uppercase">
              CMS • Explore Menus Slider
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Event Menu Cards
          </h1>
          <p className="text-xs text-gray-500 font-normal mt-0.5 max-w-xl">
            Upload and manage the official printed menu cards shown in the client &quot;Explore Our Menus&quot; slider. Visitors can slide, zoom, and inquire on WhatsApp.
          </p>
        </div>

        <div className="flex items-center space-x-2.5 w-full sm:w-auto">
          <button
            onClick={fetchMenuCards}
            className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
            title="Refresh Menu Cards"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-emerald-600" : ""}`} />
          </button>

          {cards.length === 0 && (
            <button
              onClick={handleSeedDefaults}
              className="px-4 py-2.5 rounded-xl border border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Add Defaults</span>
            </button>
          )}

          <button
            onClick={handleOpenAdd}
            className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#229938] hover:bg-[#1c822e] text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Menu Card</span>
          </button>
        </div>
      </div>

      {/* Database Source Notice */}
      {source.includes("fallback") && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs text-amber-800">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>
              Database has no custom menu cards yet. The site is currently showing the default Menu 01 and Menu 02. Upload a menu card below to save it to your MongoDB database.
            </span>
          </div>
          <button
            onClick={handleSeedDefaults}
            className="px-3 py-1 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors ml-3 whitespace-nowrap cursor-pointer"
          >
            Import 2 Defaults to Database
          </button>
        </div>
      )}

      {/* Grid of Uploaded Menu Cards */}
      {loading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
          <p className="text-xs text-gray-500">Loading menu cards from database...</p>
        </div>
      ) : cards.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-gray-300 space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto">
            <h3 className="text-base font-semibold text-gray-900">No custom menu cards in database</h3>
            <p className="text-xs text-gray-500 mt-1">
              Upload your event menu card photos (e.g. Menu 01, Menu 02, Menu 03). They will immediately appear in the homepage slider.
            </p>
          </div>
          <div className="flex items-center justify-center space-x-3 pt-2">
            <button
              onClick={handleSeedDefaults}
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 cursor-pointer"
            >
              Seed 2 Default Menus
            </button>
            <button
              onClick={handleOpenAdd}
              className="px-5 py-2 rounded-xl bg-[#229938] text-white text-xs font-semibold hover:bg-[#1c822e] cursor-pointer flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Upload Your First Menu</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {cards.map((card) => (
            <div
              key={card._id}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Image Preview with Aspect Ratio */}
              <div className="relative aspect-[3/4] w-full bg-[#072018] overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-contain transition-transform duration-300 group-hover:scale-102"
                />

                {/* Top Overlay Badges */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-black/75 text-emerald-300 border border-white/20 backdrop-blur-xs">
                    {card.menuNumber ? `MENU ${card.menuNumber}` : card.title}
                  </span>

                  <button
                    onClick={() => handleToggleActive(card)}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase cursor-pointer transition-colors backdrop-blur-xs flex items-center space-x-1 ${
                      card.isActive
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-800 text-gray-300"
                    }`}
                    title={card.isActive ? "Click to Hide" : "Click to Make Active"}
                  >
                    {card.isActive ? (
                      <>
                        <Eye className="w-3 h-3" />
                        <span>Active</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3" />
                        <span>Hidden</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Zoom Icon Button */}
                <button
                  onClick={() => setPreviewImage(card.image)}
                  className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-black/60 hover:bg-[#229938] text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
                  title="View Full Size"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Card Meta & Actions */}
              <div className="p-4 space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-gray-900 truncate">
                      {card.title}
                    </h3>
                    <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                      Order: {card.sortOrder}
                    </span>
                  </div>
                  {card.whatsappMessage && (
                    <p className="text-[11px] text-gray-500 truncate mt-1">
                      {card.whatsappMessage}
                    </p>
                  )}
                </div>

                {/* Actions Bar */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={() => handleOpenEdit(card)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  {deleteConfirmId === card._id ? (
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleDelete(card._id)}
                        className="px-2.5 py-1 rounded-lg bg-red-600 text-white text-[11px] font-semibold hover:bg-red-700 cursor-pointer"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="p-1 rounded text-gray-500 hover:bg-gray-100 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(card._id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete Menu Card"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: UPLOAD / EDIT MENU CARD */}
      {/* ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="px-6 py-4.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  {editingCard ? "Edit Menu Card" : "Upload Event Menu Card"}
                </h3>
                <p className="text-xs text-gray-500">
                  Upload an official menu photo for the client slider.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
              {/* Menu Title & Number */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-gray-700">
                    Menu Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Menu 01 or Grand Wedding Banquet"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">
                    Number Badge
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 01"
                    value={formData.menuNumber}
                    onChange={(e) => setFormData({ ...formData, menuNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Image Uploader Component */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">
                  Menu Card Photo *
                </label>
                <ImageUploader
                  value={formData.image}
                  onChange={(url, publicId) => {
                    setFormData({
                      ...formData,
                      image: url,
                      cloudinaryPublicId: publicId || "",
                    });
                  }}
                  folder="green-apple/menu-cards"
                  label="Menu Card Image"
                />
                <p className="text-[11px] text-gray-400">
                  Upload an image from your device (JPG, PNG, WEBP) or paste an image link.
                </p>
              </div>

              {/* Sort Order & Active Switch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">
                    Display Sort Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.sortOrder}
                    onChange={(e) =>
                      setFormData({ ...formData, sortOrder: Number(e.target.value) || 1 })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center space-x-2.5 p-2.5 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) =>
                        setFormData({ ...formData, isActive: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-xs font-medium text-gray-700">
                      Active (Visible in client slider)
                    </span>
                  </label>
                </div>
              </div>

              {/* WhatsApp Message Template */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">
                  WhatsApp Inquiry Message Template
                </label>
                <textarea
                  rows={2}
                  value={formData.whatsappMessage}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsappMessage: e.target.value })
                  }
                  placeholder="Hello Green Apple Catering! I saw this menu on your website..."
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <p className="text-[11px] text-gray-400">
                  Pre-fills when visitors click &quot;Inquire on WhatsApp&quot; on this card.
                </p>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-gray-200 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#229938] hover:bg-[#1c822e] text-white shadow-xs transition-all flex items-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingCard ? "Save Changes" : "Upload Menu Card"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Fullscreen Quick Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xs"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-2xl max-h-[90vh]">
            <Image
              src={previewImage}
              alt="Preview"
              width={700}
              height={1000}
              className="object-contain max-h-[85vh] w-auto rounded-2xl shadow-2xl"
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
