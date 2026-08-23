"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import { menuCategories, menuItemsData } from "@/data/menu";
import { ArrowRight } from "lucide-react";

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("starters");

  const filteredItems = menuItemsData.filter(
    (item) => item.category === activeCategory
  );

  return (
    <section className="py-20 bg-[#09281E] text-white relative overflow-hidden bg-dark-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          subtitle="OUR MENU"
          title="Our Menu"
          description="A perfect blend of taste and quality."
          centered={true}
          theme="dark"
        />

        {/* Category Filter Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
          {menuCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/50 font-semibold"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/10"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid (2 Columns) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group"
            >
              {/* Dish Image Thumbnail */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 border border-emerald-500/20">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Item Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between">
                  <h4 className="font-serif text-base sm:text-lg font-bold text-white tracking-wide truncate group-hover:text-emerald-300 transition-colors">
                    {item.name}
                  </h4>
                  <span className="font-serif text-base sm:text-lg font-bold text-emerald-400 ml-2">
                    {item.currency}
                    {item.price}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 font-light mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Menu CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center justify-center px-7 py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg hover:shadow-emerald-900/60 group"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
