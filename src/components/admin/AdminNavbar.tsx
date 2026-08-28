"use client";

import React, { useState, useEffect } from "react";
import { Menu, Database, Cloud, RefreshCw, User, ShieldCheck } from "lucide-react";

interface AdminNavbarProps {
  onToggleMobileMenu: () => void;
}

export default function AdminNavbar({ onToggleMobileMenu }: AdminNavbarProps) {
  const [dbStatus, setDbStatus] = useState<{
    isConnected: boolean;
    statusText: string;
    isPlaceholder: boolean;
  }>({
    isConnected: false,
    statusText: "Checking...",
    isPlaceholder: true,
  });
  const [userEmail, setUserEmail] = useState<string>("admin@greenapplecatering.in");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.dbStatus) {
          setDbStatus(data.dbStatus);
        }
        if (data.user?.email) {
          setUserEmail(data.user.email);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
      {/* Left: Mobile menu button & breadcrumbs */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-xs text-gray-500 font-medium">
          <span className="text-gray-900 font-semibold">Green Apple CMS</span>
          <span>/</span>
          <span className="text-emerald-700">Admin Control</span>
        </div>
      </div>

      {/* Right: DB Status Indicator & Admin Info */}
      <div className="flex items-center space-x-3">
        {/* Database Status Badge */}
        <div
          className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-medium border ${
            dbStatus.isConnected
              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
              : "bg-amber-50 text-amber-800 border-amber-300"
          }`}
          title={dbStatus.statusText}
        >
          <Database className={`w-3.5 h-3.5 ${dbStatus.isConnected ? "text-emerald-600" : "text-amber-600"}`} />
          <span className="hidden sm:inline">
            {dbStatus.isConnected ? "MongoDB Connected" : "Local Data Fallback"}
          </span>
        </div>

        {/* User profile */}
        <div className="flex items-center space-x-2 pl-2 border-l border-gray-200 text-xs text-gray-700">
          <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[11px]">
            GA
          </div>
          <span className="hidden md:inline font-medium truncate max-w-[140px]">
            {userEmail}
          </span>
        </div>
      </div>
    </header>
  );
}
