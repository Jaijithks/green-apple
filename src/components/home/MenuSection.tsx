"use client";

import React from "react";
import { ArrowRight, Utensils } from "lucide-react";
import MenuSlider from "@/components/menu/MenuSlider";

interface MenuSectionProps {
  onOpenMenuBuilder?: () => void;
  onOpenPresetMenus?: () => void;
  onOpenQuote?: () => void;
}

export default function MenuSection({
  onOpenMenuBuilder,
  onOpenQuote,
}: MenuSectionProps) {
  return (
    <section
      id="menu"
      className="py-12 sm:py-18 lg:py-22 bg-[#09281E] text-white relative overflow-hidden bg-dark-pattern scroll-mt-16 sm:scroll-mt-20"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#09281E]/60 to-[#09281E] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 sm:space-y-8">
        {/* Simple Minimal Section Header (No heavy text description) */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-2">
            <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
            <span className="text-[10px] sm:text-xs tracking-[0.28em] uppercase text-emerald-400 font-semibold">
              EXPLORE OUR MENUS
            </span>
            <span className="w-4 sm:w-5 h-[1.5px] bg-[#229938]" />
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
            Explore Our Menus
          </h2>
        </div>

        {/* Clean, Simple Menu Slider (Slide to view different menus) */}
        <MenuSlider onOpenQuote={onOpenQuote} />

        {/* Subtle Custom Builder Option for Users Wanting a Bespoke Plan */}
        {onOpenMenuBuilder && (
          <div className="pt-4 sm:pt-6 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 p-2 sm:p-2.5 sm:px-6 rounded-2xl sm:rounded-full bg-white/5 border border-white/10 backdrop-blur-xs">
              <span className="text-xs text-gray-300 font-light">
                Looking for a customized menu tailored to your preferences?
              </span>
              <button
                onClick={onOpenMenuBuilder}
                className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#229938] hover:bg-[#1c822e] text-white transition-all cursor-pointer flex items-center space-x-1.5 shadow-md active:scale-95"
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Build Your Own Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
