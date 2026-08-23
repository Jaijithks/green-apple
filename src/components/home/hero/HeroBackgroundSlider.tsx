"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import HeroSlide from "./HeroSlide";
import { HeroSlideData } from "@/data/heroSlides";

interface HeroBackgroundSliderProps {
  slides: HeroSlideData[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export default function HeroBackgroundSlider({
  slides,
  currentIndex,
}: HeroBackgroundSliderProps) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Slides Container */}
      {slides.map((slide, idx) => (
        <HeroSlide
          key={slide.id}
          slide={slide}
          isActive={idx === currentIndex}
          isPriority={idx === 0}
        />
      ))}

      {/* Contrast & Readability Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#072018] via-[#072018]/90 to-transparent lg:w-[65%] z-2" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#072018] via-transparent to-[#072018]/70 z-2" />
    </div>
  );
}
