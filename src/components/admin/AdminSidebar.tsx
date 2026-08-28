"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Layers,
  Image as ImageIcon,
  ExternalLink,
  LogOut,
  Database,
} from "lucide-react";

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export default function AdminSidebar({ onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: "Menu Items",
      href: "/admin/menu",
      icon: UtensilsCrossed,
      exact: true,
    },
    {
      label: "Categories",
      href: "/admin/menu/categories",
      icon: Layers,
      exact: true,
    },
    {
      label: "Gallery Media",
      href: "/admin/gallery",
      icon: ImageIcon,
      exact: true,
    },
  ];

  return (
    <aside className="w-64 bg-[#072018] text-white flex flex-col justify-between border-r border-emerald-900/60 min-h-screen">
      {/* Brand Header */}
      <div>
        <div className="p-6 border-b border-emerald-900/60 flex items-center justify-between">
          <Link href="/admin" className="flex items-center space-x-3 group">
            <div className="relative w-36 h-12 flex items-center">
              <Image
                src="/logo/green apple logo vertical.png"
                alt="Green Apple Catering"
                fill
                className="object-contain"
                sizes="144px"
              />
            </div>
          </Link>
        </div>

        <div className="px-4 py-2 mt-1">
          <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-400/90 font-semibold px-3 block">
            CMS Management
          </span>
        </div>

        {/* Navigation links */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all ${
                  isActive
                    ? "bg-[#229938] text-white shadow-md shadow-emerald-950 font-semibold"
                    : "text-gray-300 hover:text-white hover:bg-emerald-900/40"
                }`}
              >
                <Icon className="w-4 h-4 text-emerald-300" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout / Public Link */}
      <div className="p-4 border-t border-emerald-900/60 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-gray-300 hover:text-white hover:bg-emerald-900/30 transition-colors"
        >
          <span className="flex items-center space-x-2">
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            <span>Public Website</span>
          </span>
          <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800/60">
            Live
          </span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs text-red-300 hover:text-red-100 hover:bg-red-950/40 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
