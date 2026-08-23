"use client";

import React from "react";
import Image from "next/image";
import { UtensilsCrossed, Calendar, ConciergeBell, Heart } from "lucide-react";
import { valuePropsData } from "@/data/process";

export default function ValuePropsSection() {
  const iconMap = {
    Utensils: UtensilsCrossed,
    Calendar,
    ConciergeBell,
    Heart,
  };

  return (
    <section className="py-16 bg-white text-gray-900 border-b border-gray-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 4 Feature Items */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {valuePropsData.map((item, idx) => {
              const IconComponent = iconMap[item.iconName] || UtensilsCrossed;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center p-4 rounded-xl border border-gray-100 bg-[#FBFBF9] hover:bg-emerald-50/40 hover:border-emerald-200 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-100/70 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-all duration-300 mb-3 shadow-xs">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-base font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 font-light leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Dish Feature Image */}
          <div className="lg:col-span-4 relative flex justify-center">
            <div className="relative w-full max-w-[280px] h-[180px] sm:h-[220px] rounded-2xl overflow-hidden shadow-xl border-4 border-white group">
              <Image
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
                alt="Green Apple Catering Fine Dining Dish Plating"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
