"use client";

import React from "react";
import Image from "next/image";
import { HeroSlideData } from "@/data/heroSlides";

interface HeroSlideProps {
  slide: HeroSlideData;
  isActive: boolean;
  isPriority: boolean;
}

export default function HeroSlide({
  slide,
  isActive,
  isPriority,
}: HeroSlideProps) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
        isActive ? "opacity-100 z-1" : "opacity-0 pointer-events-none z-0"
      }`}
      aria-hidden={!isActive}
    >
      {/* Desktop Hero Image */}
      <div className="hidden sm:block absolute inset-0">
        <Image
          src={slide.desktop}
          alt={slide.alt}
          fill
          priority={isPriority}
          sizes="(min-width: 640px) 100vw, 1px"
          quality={85}
          className="object-cover object-right lg:object-center opacity-45 mix-blend-luminosity scale-105"
        />
      </div>

      {/* Mobile Hero Image (Vertical composition) */}
      <div className="block sm:hidden absolute inset-0">
        <Image
          src={slide.mobile}
          alt={slide.alt}
          fill
          priority={isPriority}
          sizes="(max-width: 639px) 100vw, 1px"
          quality={85}
          className="object-cover object-center opacity-50 mix-blend-luminosity scale-105"
        />
      </div>
    </div>
  );
}
