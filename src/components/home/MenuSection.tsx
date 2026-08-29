"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { SERVICE_STYLES } from "@/data/menuBuilderData";

interface MenuSectionProps {
  onOpenMenuBuilder?: () => void;
  onOpenPresetMenus?: () => void;
  onOpenQuote?: () => void;
}

export default function MenuSection({
  onOpenMenuBuilder,
  onOpenPresetMenus,
}: MenuSectionProps) {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMobileIndex((prev) => (prev === 0 ? SERVICE_STYLES.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMobileIndex((prev) => (prev === SERVICE_STYLES.length - 1 ? 0 : prev + 1));
  };

  const activeStyle = SERVICE_STYLES[activeMobileIndex];

  return (
    <section
      id="menu"
      className="py-12 sm:py-20 lg:py-24 bg-[#09281E] text-white relative overflow-hidden bg-dark-pattern scroll-mt-16 sm:scroll-mt-20"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#09281E]/60 to-[#09281E] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center space-x-2">
            <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
            <span className="text-[10px] sm:text-xs tracking-[0.28em] uppercase text-emerald-400 font-semibold">
              OUR CULINARY REPERTOIRE
            </span>
            <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
            Build Your Perfect Menu
          </h2>

          <p className="text-xs sm:text-sm lg:text-[15px] text-gray-300 font-light max-w-xl mx-auto leading-relaxed px-2">
            Create a catering experience around your event. Choose your service style, counters and dishes — we&apos;ll take care of the rest.
          </p>

          <p className="font-serif italic text-emerald-300/90 text-xs sm:text-sm lg:text-base font-light">
            Your event. Your choices. Your way.
          </p>

          {/* Primary Action Buttons (Vertical on mobile, Row on desktop) */}
          <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <button
              onClick={onOpenMenuBuilder}
              className="w-full sm:w-auto px-7 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] bg-[#229938] hover:bg-[#1c822e] text-white shadow-lg shadow-emerald-950/80 transition-all hover:scale-102 active:scale-95 cursor-pointer flex items-center justify-center space-x-2 group min-h-[44px]"
            >
              <span>BUILD YOUR OWN MENU</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenPresetMenus}
              className="w-full sm:w-auto px-6 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer flex items-center justify-center space-x-2 min-h-[44px]"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>EXPLORE OUR MENUS</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MOBILE VIEW: Single card with arrow navigation */}
        {/* ======================================================== */}
        <div className="block md:hidden max-w-md mx-auto">
          {/* Card Container */}
          <div
            onClick={onOpenMenuBuilder}
            className="group relative rounded-2xl overflow-hidden border border-white/15 bg-white/5 shadow-xl cursor-pointer flex flex-col justify-between transition-all duration-300 active:scale-[0.99]"
          >
            {/* Card Image */}
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={activeStyle.image}
                alt={`${activeStyle.title} catering style - ${activeStyle.subtitle}`}
                fill
                className="object-cover transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09281E] via-black/35 to-transparent" />

              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full text-[9px] font-semibold tracking-wider uppercase bg-black/60 text-emerald-300 border border-white/20 backdrop-blur-md">
                  {activeStyle.badge}
                </span>
              </div>

              {/* Floating Left Arrow */}
              <button
                onClick={handlePrev}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-[#229938] text-white border border-white/25 flex items-center justify-center backdrop-blur-md shadow-lg transition-all cursor-pointer z-20 active:scale-90"
                aria-label="Previous service style"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Floating Right Arrow */}
              <button
                onClick={handleNext}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-[#229938] text-white border border-white/25 flex items-center justify-center backdrop-blur-md shadow-lg transition-all cursor-pointer z-20 active:scale-90"
                aria-label="Next service style"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Card Details */}
            <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl text-white font-normal">
                    {activeStyle.title}
                  </h3>
                  <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold">
                    0{activeMobileIndex + 1} / 0{SERVICE_STYLES.length}
                  </span>
                </div>
                <span className="text-[10.5px] text-emerald-400 font-medium block mt-0.5">
                  {activeStyle.subtitle}
                </span>
                <p className="text-xs text-gray-300 font-light mt-1.5 leading-relaxed">
                  {activeStyle.description}
                </p>
              </div>

              <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-emerald-400">
                <span>Customize {activeStyle.title}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Dots Navigation Bar on Mobile */}
          <div className="flex items-center justify-center space-x-2 pt-3">
            {SERVICE_STYLES.map((st, idx) => {
              const isActive = idx === activeMobileIndex;
              return (
                <button
                  key={st.id}
                  onClick={() => setActiveMobileIndex(idx)}
                  className={`transition-all rounded-full cursor-pointer ${
                    isActive
                      ? "w-6 h-2 bg-[#229938]"
                      : "w-2 h-2 bg-white/25 hover:bg-white/50"
                  }`}
                  aria-label={`Go to ${st.title}`}
                />
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP VIEW: 3-Column Grid */}
        {/* ======================================================== */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {SERVICE_STYLES.map((style) => (
            <div
              key={style.id}
              onClick={onOpenMenuBuilder}
              className="group relative rounded-3xl overflow-hidden border border-white/15 bg-white/5 hover:border-emerald-400/50 shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Card Image */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={style.image}
                  alt={`${style.title} catering style - ${style.subtitle}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09281E] via-black/35 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[9px] font-semibold tracking-wider uppercase bg-black/60 text-emerald-300 border border-white/20 backdrop-blur-md">
                    {style.badge}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 lg:p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-white font-normal group-hover:text-emerald-300 transition-colors">
                    {style.title}
                  </h3>
                  <span className="text-[11px] text-emerald-400 font-medium block mt-0.5">
                    {style.subtitle}
                  </span>
                  <p className="text-xs text-gray-300 font-light mt-1.5 leading-relaxed">
                    {style.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-emerald-400 group-hover:text-emerald-300">
                  <span>Customize {style.title}</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



