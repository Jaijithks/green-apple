"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  UtensilsCrossed,
  Layers,
  Image as ImageIcon,
  Database,
  Cloud,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Plus,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    menuCount: 0,
    categoryCount: 0,
    galleryCount: 0,
    loading: true,
  });

  const [dbStatus, setDbStatus] = useState<{
    isConnected: boolean;
    statusText: string;
    isPlaceholder: boolean;
    database?: string;
  }>({
    isConnected: false,
    statusText: "Checking...",
    isPlaceholder: true,
  });

  const [isSeeding, setIsSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const fetchDashboardData = async () => {
    try {
      const [menuRes, catRes, galRes, authRes] = await Promise.all([
        fetch("/api/menu/items"),
        fetch("/api/menu/categories"),
        fetch("/api/gallery"),
        fetch("/api/auth/me"),
      ]);

      const [menuData, catData, galData, authData] = await Promise.all([
        menuRes.json(),
        catRes.json(),
        galRes.json(),
        authRes.json(),
      ]);

      setStats({
        menuCount: menuData.total || menuData.data?.length || 0,
        categoryCount: catData.data?.length || 0,
        galleryCount: galData.total || galData.data?.length || 0,
        loading: false,
      });

      if (authData.dbStatus) {
        setDbStatus(authData.dbStatus);
      }
    } catch {
      setStats((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleSeedDatabase = async () => {
    if (!confirm("Populate MongoDB with the existing hardcoded website menu & gallery data? This is safe and will not duplicate existing items.")) {
      return;
    }

    setIsSeeding(true);
    setSeedMessage(null);

    try {
      const res = await fetch("/api/seed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ force: false }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.message || "Seeding failed");
      }

      setSeedMessage({
        text: data.message || "Database seeded successfully!",
        type: "success",
      });
      await fetchDashboardData();
    } catch (err: any) {
      setSeedMessage({
        text: err?.message || "Failed to seed database",
        type: "error",
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Page Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Welcome to Green Apple CMS
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-light mt-0.5">
            Manage live Menu items, Categories, and Gallery showcases
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleSeedDatabase}
            disabled={isSeeding}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 shadow-sm transition-all hover:scale-102 active:scale-98 disabled:opacity-50 cursor-pointer"
            title="Seed current static data into MongoDB"
          >
            {isSeeding ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            )}
            <span>{isSeeding ? "Seeding..." : "Seed Initial Data"}</span>
          </button>
        </div>
      </div>

      {/* Seed Notification Alert */}
      {seedMessage && (
        <div
          className={`p-3.5 rounded-xl border text-xs flex items-center space-x-2.5 ${
            seedMessage.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {seedMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          )}
          <span>{seedMessage.text}</span>
        </div>
      )}

      {/* Connection & Architecture Status Banner */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* MongoDB Status */}
        <div className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
              dbStatus.isConnected ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
            }`}
          >
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                MongoDB Database
              </h3>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  dbStatus.isConnected
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {dbStatus.isConnected ? "Active" : "Placeholder Fallback"}
              </span>
            </div>
            <p className="text-xs text-gray-500 font-light mt-1">
              {dbStatus.isConnected
                ? `Connected to database '${dbStatus.database || "green_apple"}'. CRUD operations update live MongoDB collections.`
                : "Using offline fallback data. When you add real MONGODB_URI to .env.local, it connects instantly."}
            </p>
          </div>
        </div>

        {/* Cloudinary Status */}
        <div className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center flex-shrink-0">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Cloudinary Media Storage
              </h3>
              <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-semibold">
                Ready
              </span>
            </div>
            <p className="text-xs text-gray-500 font-light mt-1">
              Media uploads route through server-side Cloudinary service with automatic asset deletion on updates.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {/* Menu Items Card */}
        <Link
          href="/admin/menu"
          className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Menu Items
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#229938] flex items-center justify-center group-hover:bg-[#229938] group-hover:text-white transition-colors">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-gray-900 font-serif">
              {stats.loading ? "..." : stats.menuCount}
            </div>
            <p className="text-xs text-gray-500 font-light mt-1 flex items-center justify-between">
              <span>Dishes & Specialties</span>
              <span className="text-emerald-700 font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center">
                Manage <ArrowRight className="w-3 h-3 ml-1" />
              </span>
            </p>
          </div>
        </Link>

        {/* Categories Card */}
        <Link
          href="/admin/menu/categories"
          className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Categories
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#229938] flex items-center justify-center group-hover:bg-[#229938] group-hover:text-white transition-colors">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-gray-900 font-serif">
              {stats.loading ? "..." : stats.categoryCount}
            </div>
            <p className="text-xs text-gray-500 font-light mt-1 flex items-center justify-between">
              <span>Menu Sections</span>
              <span className="text-emerald-700 font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center">
                Manage <ArrowRight className="w-3 h-3 ml-1" />
              </span>
            </p>
          </div>
        </Link>

        {/* Gallery Card */}
        <Link
          href="/admin/gallery"
          className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Gallery Media
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#229938] flex items-center justify-center group-hover:bg-[#229938] group-hover:text-white transition-colors">
              <ImageIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-gray-900 font-serif">
              {stats.loading ? "..." : stats.galleryCount}
            </div>
            <p className="text-xs text-gray-500 font-light mt-1 flex items-center justify-between">
              <span>Photos & Videos</span>
              <span className="text-emerald-700 font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center">
                Manage <ArrowRight className="w-3 h-3 ml-1" />
              </span>
            </p>
          </div>
        </Link>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/admin/menu?new=true"
            className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50/60 hover:bg-emerald-100/60 border border-emerald-200 text-emerald-900 transition-colors text-xs font-semibold"
          >
            <span className="flex items-center space-x-2">
              <Plus className="w-4 h-4 text-emerald-700" />
              <span>Add New Menu Item</span>
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
          </Link>

          <Link
            href="/admin/menu/categories"
            className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50/60 hover:bg-emerald-100/60 border border-emerald-200 text-emerald-900 transition-colors text-xs font-semibold"
          >
            <span className="flex items-center space-x-2">
              <Plus className="w-4 h-4 text-emerald-700" />
              <span>Add Menu Category</span>
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
          </Link>

          <Link
            href="/admin/gallery"
            className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50/60 hover:bg-emerald-100/60 border border-emerald-200 text-emerald-900 transition-colors text-xs font-semibold"
          >
            <span className="flex items-center space-x-2">
              <Plus className="w-4 h-4 text-emerald-700" />
              <span>Upload Gallery Media</span>
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
          </Link>
        </div>
      </div>
    </div>
  );
}
