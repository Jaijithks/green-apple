"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSliderControlsProps {
  total: number;
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}

export default function HeroSliderControls({
  total,
  currentIndex,
  onPrev,
  onNext,
  onSelect,
}: HeroSliderControlsProps) {
  const currentFormatted = String(currentIndex + 1).padStart(2, "0");
  const totalFormatted = String(total).padStart(2, "0");

  return (
    <div
      className="flex items-center gap-3 sm:gap-4 select-none pointer-events-auto group/slider"
      role="region"
      aria-label="Hero background slider navigation"
    >
      {/* Subtle Prev Arrow on Hover / Focus */}
      <button
        onClick={onPrev}
        type="button"
        aria-label="Previous slide"
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer focus:outline-hidden focus:ring-1 focus:ring-emerald-400"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Slide Indicator: 01 ────────── 03 */}
      <div className="flex items-center space-x-3 text-sm sm:text-base font-normal tracking-wider text-white">
        <span className="font-serif font-medium text-white/95">{currentFormatted}</span>

        {/* Progress Line Track */}
        <div
          className="relative w-20 sm:w-28 h-[2px] bg-white/25 rounded-full overflow-hidden flex items-center cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const ratio = clickX / rect.width;
            const targetIndex = Math.min(
              total - 1,
              Math.max(0, Math.floor(ratio * total))
            );
            onSelect(targetIndex);
          }}
          role="tablist"
          aria-label="Slider progress bar"
        >
          {/* Active Progress Bar */}
          <div
            className="absolute top-0 bottom-0 bg-white rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(255,255,255,0.7)]"
            style={{
              left: `${(currentIndex / total) * 100}%`,
              width: `${(1 / total) * 100}%`,
            }}
          />
        </div>

        <span className="font-serif font-medium text-white/60">{totalFormatted}</span>
      </div>

      {/* Subtle Next Arrow on Hover / Focus */}
      <button
        onClick={onNext}
        type="button"
        aria-label="Next slide"
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer focus:outline-hidden focus:ring-1 focus:ring-emerald-400"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
