"use client";

import React from "react";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import { UtensilsCrossed, Calendar, ConciergeBell, Heart } from "lucide-react";

export default function WelcomeSection() {
  const featurePills = [
    {
      icon: UtensilsCrossed,
      title: "Delicious Food",
    },
    {
      icon: Calendar,
      title: "Every Occasion",
    },
    {
      icon: ConciergeBell,
      title: "Quality Service",
    },
    {
      icon: Heart,
      title: "Memorable Moments",
    },
  ];

  return (
    <section className="py-20 bg-white text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Ambient Event Table Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-[360px] sm:h-[440px] w-full rounded-2xl overflow-hidden shadow-2xl group border border-emerald-900/10">
              <Image
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
                alt="Green Apple Catering Wedding & Event Table Setup"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            {/* Decorative back element */}
            <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-emerald-600/30 rounded-2xl -z-10 hidden sm:block" />
          </div>

          {/* Right Column: Welcome Content */}
          <div className="lg:col-span-7 space-y-8">
            <SectionHeader
              subtitle="WELCOME TO GREEN APPLE"
              title="Make your moments memorable with"
              titleHighlight="flavours."
              description="We provide delicious food for every occasion. From small gatherings to grand celebrations, we bring flavour to your moments."
              centered={false}
            />

            {/* 4 Feature Circles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-gray-100">
              {featurePills.map((feature, idx) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-emerald-50/50 transition-colors group"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm border border-emerald-200/60 mb-3">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 tracking-tight">
                      {feature.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
