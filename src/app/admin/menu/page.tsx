"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Check,
  X,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Tag,
} from "lucide-react";
import { FoodTypeBadge } from "@/components/menu/MenuBuilderModal";
import { FoodTypeId } from "@/data/menuBuilderData";

interface MenuItem {
  _id: string;
  name: string;
  malayalamName?: string;
  slug: string;
  category: string;
  foodType?: FoodTypeId;
  description: string;
  price: number;
  currency: string;
  image?: string;
  cloudinaryPublicId?: string;
  isPopular: boolean;
  isSignature: boolean;
  serviceStyles: string[];
  sortOrder: number;
  isActive: boolean;
}

interface MenuCategory {
  _id: string;
  name: string;
  slug: string;
}

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStyle, setSelectedStyle] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    malayalamName: string;
    category: string;
    foodType: FoodTypeId;
    description: string;
    price: number;
    currency: string;
    image: string;
    cloudinaryPublicId: string;
    isPopular: boolean;
    isSignature: boolean;
    serviceStyles: string[];
    sortOrder: number;
    isActive: boolean;
  }>({
    name: "",
    malayalamName: "",
    category: "",
    foodType: "veg",
    description: "",
    price: 150,
    currency: "₹",
    image: "",
    cloudinaryPublicId: "",
    isPopular: false,
    isSignature: false,
    serviceStyles: ["buffet", "table-service"],
    sortOrder: 0,
    isActive: true,
  });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [itemsRes, catsRes] = await Promise.all([
        fetch("/api/menu/items"),
        fetch("/api/menu/categories"),
      ]);

      const [itemsData, catsData] = await Promise.all([
        itemsRes.json(),
        catsRes.json(),
      ]);

      setItems(itemsData.data || []);
      setCategories(catsData.data || []);
    } catch {
      showToast("Failed to load menu data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      malayalamName: "",
      category: categories[0]?.slug || "welcome-drinks",
      foodType: "veg",
      description: "",
      price: 150,
      currency: "₹",
      image: "",
      cloudinaryPublicId: "",
      isPopular: false,
      isSignature: false,
      serviceStyles: ["buffet", "table-service"],
      sortOrder: items.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      malayalamName: item.malayalamName || "",
      category: item.category,
      foodType: item.foodType || "veg",
      description: item.description || "",
      price: item.price || 0,
      currency: item.currency || "₹",
      image: item.image || "",
      cloudinaryPublicId: item.cloudinaryPublicId || "",
      isPopular: item.isPopular,
      isSignature: item.isSignature,
      serviceStyles: item.serviceStyles || ["buffet"],
      sortOrder: item.sortOrder || 0,
      isActive: item.isActive,
    });
    setIsModalOpen(true);
  };

  const handleToggleStyle = (style: string) => {
    setFormData((prev) => {
      const exists = prev.serviceStyles.includes(style);
      return {
        ...prev,
        serviceStyles: exists
          ? prev.serviceStyles.filter((s) => s !== style)
          : [...prev.serviceStyles, style],
      };
    });
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast("Dish name is required", "error");
      return;
    }

    setSaving(true);
    try {
      const url = editingItem
        ? `/api/menu/items/${editingItem._id}`
        : "/api/menu/items";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save menu item");
      }

      showToast(
        editingItem ? "Menu item updated successfully" : "Menu item added successfully"
      );
      setIsModalOpen(false);
      await fetchData();
    } catch (err: any) {
      showToast(err?.message || "Operation failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteItem = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/menu/items/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete item");

      showToast(`"${name}" deleted successfully`);
      await fetchData();
    } catch (err: any) {
      showToast(err?.message || "Delete failed", "error");
    }
  };

  const handleToggleActive = async (item: MenuItem) => {
    try {
      const res = await fetch(`/api/menu/items/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !item.isActive }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      await fetchData();
    } catch (err: any) {
      showToast(err?.message || "Update failed", "error");
    }
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesStyle =
      selectedStyle === "all" || item.serviceStyles?.includes(selectedStyle);
    const matchesType =
      selectedType === "all" || (item.foodType || "veg") === selectedType;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.malayalamName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStyle && matchesType && matchesSearch;
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

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-gray-200/80 shadow-xs">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-emerald-700 font-bold block">
            MENU MANAGEMENT
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mt-0.5">
            Catering Dishes & Menu Catalog
          </h1>
          <p className="text-xs text-gray-500 font-light mt-1">
            Manage your dishes with dietary indicators (Veg, Non-Veg, Seafood, Beverages, Live Counters) — no images required.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-2.5 bg-[#229938] hover:bg-[#1c822e] text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 shadow-md shadow-emerald-950/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Dish</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-gray-200/80 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes or Malayalam names..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white font-medium capitalize"
            >
              <option value="all">All Categories ({categories.length})</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Food Type Filter */}
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white font-medium capitalize"
            >
              <option value="all">All Food Types</option>
              <option value="veg">Vegetarian (VEG)</option>
              <option value="non-veg">Non-Vegetarian (NON-VEG)</option>
              <option value="seafood">Seafood / Fish</option>
              <option value="beverage">Beverage / Drinks</option>
              <option value="dessert">Desserts & Sweets</option>
              <option value="live">Live Stations</option>
            </select>
          </div>

          {/* Style Filter */}
          <div>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="w-full px-3.5 py-2 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white font-medium capitalize"
            >
              <option value="all">All Service Styles</option>
              <option value="buffet">Buffet</option>
              <option value="table-service">Table Service</option>
              <option value="sadya">Sadya</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100 font-medium">
          <span>
            Showing <strong className="text-gray-900">{filteredItems.length}</strong> of{" "}
            {items.length} items
          </span>
          {(searchQuery || selectedCategory !== "all" || selectedStyle !== "all" || selectedType !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedStyle("all");
                setSelectedType("all");
              }}
              className="text-emerald-700 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Items Table (with Type Badges, no image dependency) */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-600 mb-2" />
            <span className="text-xs">Loading menu items...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-12 text-center text-gray-400 space-y-3">
            <p className="text-xs">No menu items found matching your criteria.</p>
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2 bg-[#229938] text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Create First Item
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/75 border-b border-gray-200 text-gray-600 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Dish & Type Indicator</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Dining Styles</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredItems.map((item) => (
                  <tr
                    key={item._id}
                    className={`hover:bg-emerald-50/20 transition-colors ${
                      !item.isActive ? "opacity-60 bg-gray-50/40" : ""
                    }`}
                  >
                    {/* Dish & Food Type Badge */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <FoodTypeBadge type={item.foodType || "veg"} />
                        <div>
                          <div className="font-semibold text-gray-900 text-xs sm:text-sm flex items-center space-x-1.5 flex-wrap">
                            <span>{item.name}</span>
                            {item.malayalamName && (
                              <span className="text-[11px] text-emerald-700 font-medium">
                                ({item.malayalamName})
                              </span>
                            )}
                            {item.isSignature && (
                              <span className="text-[9.5px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                                Signature
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-gray-500 font-light line-clamp-1 max-w-sm">
                            {item.description || "No description"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-[11px] font-medium capitalize">
                        {item.category.replace(/-/g, " ")}
                      </span>
                    </td>

                    {/* Dining styles badges */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {item.serviceStyles?.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-2 py-0.5 rounded font-medium capitalize"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Status Active toggle */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleToggleActive(item)}
                        className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10.5px] font-semibold cursor-pointer transition-colors ${
                          item.isActive
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                        }`}
                      >
                        {item.isActive ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Hidden</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center space-x-1">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1.5 text-gray-500 hover:text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors cursor-pointer"
                          title="Edit Dish"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item._id, item.name)}
                          className="p-1.5 text-gray-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete Dish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Dish Modal (No Image Upload Required) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden my-8 animate-fadeIn">
            <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div>
                <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                  {editingItem ? `Edit "${editingItem.name}"` : "Add New Menu Item"}
                </h3>
                <span className="text-[11px] text-gray-500">
                  Select the dietary type badge and details — no image required.
                </span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* FOOD TYPE SELECTOR (VEG, NON-VEG, SEAFOOD, DRINK, DESSERT, LIVE) */}
              <div className="space-y-1.5 bg-gray-50/80 p-3.5 rounded-2xl border border-gray-200">
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Select Food Item Type *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                  {[
                    { id: "veg", label: "Vegetarian", desc: "Green Dot" },
                    { id: "non-veg", label: "Non-Veg", desc: "Red Dot" },
                    { id: "seafood", label: "Seafood / Fish", desc: "Cyan Indicator" },
                    { id: "beverage", label: "Live Drink / Beverage", desc: "Drink Badge" },
                    { id: "dessert", label: "Dessert / Sweet", desc: "Dessert Badge" },
                    { id: "live", label: "Live Station / Stall", desc: "Live Badge" },
                  ].map((ft) => {
                    const isCur = formData.foodType === ft.id;
                    return (
                      <button
                        key={ft.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, foodType: ft.id as FoodTypeId })}
                        className={`p-2.5 rounded-xl text-left border flex items-center justify-between cursor-pointer transition-all ${
                          isCur
                            ? "border-emerald-600 bg-white ring-2 ring-emerald-500/30 shadow-xs"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <FoodTypeBadge type={ft.id as FoodTypeId} compact={true} />
                          <div>
                            <span className="text-xs font-bold text-gray-900 block leading-tight">
                              {ft.label}
                            </span>
                          </div>
                        </div>
                        {isCur && <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Dish Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Dish Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Duck Mappas, Beef Peralan"
                    className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Malayalam Name (Optional) */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Malayalam Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.malayalamName}
                    onChange={(e) => setFormData({ ...formData, malayalamName: e.target.value })}
                    placeholder="e.g. ഉപ്പേരി, പാലട പായസം..."
                    className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Category & Sort Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white font-medium capitalize"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Appetizing description for the catering menu..."
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Service Styles Checkboxes */}
              <div className="space-y-2 pt-1">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Available in Dining Styles
                </label>
                <div className="flex flex-wrap gap-3 text-xs">
                  {["buffet", "table-service", "sadya"].map((style) => (
                    <label
                      key={style}
                      className="inline-flex items-center space-x-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 hover:border-emerald-400 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.serviceStyles.includes(style)}
                        onChange={() => handleToggleStyle(style)}
                        className="rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="capitalize font-medium text-gray-800">{style}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Signature & Active Toggles */}
              <div className="flex flex-wrap gap-4 pt-1 text-xs">
                <label className="inline-flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isSignature}
                    onChange={(e) => setFormData({ ...formData, isSignature: e.target.checked })}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="font-semibold text-emerald-800">Signature Dish Badge</span>
                </label>

                <label className="inline-flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="font-semibold text-gray-800">Item is Active on Website</span>
                </label>
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
                  disabled={saving}
                  className="px-6 py-2.5 bg-[#229938] hover:bg-[#1c822e] text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 shadow-md shadow-emerald-950/20 disabled:opacity-50 cursor-pointer"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{editingItem ? "Update Dish" : "Create Dish"}</span>
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
