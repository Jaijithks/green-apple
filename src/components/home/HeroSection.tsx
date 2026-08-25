"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSectionProps {
  onOpenQuote?: () => void;
}

const HERO_SLIDES = [
  {
    id: "slide-weddings",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85",
    alt: "Green Apple Catering Grand Wedding Banquet and Floral Ambiance",
    tag: "KOTHAMANGALAM, KERALA",
    title: "Weddings",
    subtitle: "Bespoke feasts for your once-in-a-lifetime celebration",
  },
  {
    id: "slide-catering",
    url: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=2000&q=85",
    alt: "Green Apple Catering chefs plating artisanal gourmet appetizers on long platters",
    tag: "ARTISANAL FLAVOURS",
    title: "Catering",
    subtitle: "Thoughtfully crafted menus for memorable gatherings",
  },
  {
    id: "slide-celebrations",
    url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2000&q=85",
    alt: "Green Apple Gourmet Hospitality and Celebration Event",
    tag: "SIGNATURE EVENTS",
    title: "Celebrations",
    subtitle: "Unforgettable moments curated with warm Kerala hospitality",
  },
];

export default function HeroSection({ onOpenQuote }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="w-full pt-0 sm:pt-4 px-0 sm:px-4 md:px-7 lg:px-8 max-w-[1536px] mx-auto">
      {/* Tall Grand Editorial Hero Container (Square flush top on mobile, rounded bottom for About card overlap) */}
      <div
        className="relative w-full h-[680px] sm:h-[700px] lg:h-[730px] min-h-[680px] rounded-t-none rounded-b-[32px] sm:rounded-b-none sm:rounded-t-[40px] md:rounded-t-[46px] overflow-hidden shadow-2xl flex flex-col justify-between select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Slide Images with Slow Crossfade */}
        {HERO_SLIDES.map((item, idx) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              idx === currentSlide
                ? "opacity-100 scale-100 z-0"
                : "opacity-0 scale-105 pointer-events-none -z-10"
            }`}
            style={{ transitionProperty: "opacity, transform", transitionDuration: "1400ms" }}
          >
            <Image
              src={item.url}
              alt={item.alt}
              fill
              priority={idx === 0}
              className="object-cover object-[center_36%]"
              sizes="(max-width: 1536px) 100vw, 1536px"
            />
            {/* Soft layered translucent overlay preserving warm lighting and rich floral details */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/60" />
            <div className="absolute inset-0 bg-[#072018]/20 mix-blend-multiply" />
          </div>
        ))}

        {/* Top Editorial Overlaid Navbar */}
        <Navbar onOpenQuote={onOpenQuote} />

        {/* Optically Centered Hero Headline Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto my-auto py-2">
          {/* Tagline / Location */}
          <div className="inline-flex items-center space-x-2 mb-2">
            <span className="w-5 h-[1.5px] bg-[#229938]" />
            <span className="text-[10px] sm:text-[11.5px] uppercase tracking-[0.3em] text-emerald-400 font-semibold drop-shadow-md">
              {slide.tag}
            </span>
            <span className="w-5 h-[1.5px] bg-[#229938]" />
          </div>

          {/* Grand Cursive Script Title */}
          <h1 className="font-script text-[64px] sm:text-8xl md:text-9xl lg:text-[110px] text-white font-normal drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] tracking-normal transform -rotate-1 leading-none py-1 select-none">
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-white/95 tracking-wide max-w-[300px] sm:max-w-xl mx-auto mt-2 sm:mt-1 drop-shadow-md font-light leading-snug">
            {slide.subtitle}
          </p>

          {/* Single Refined Pill CTA */}
          <Link
            href="#events"
            className="w-[215px] sm:w-[235px] py-3 sm:py-3.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] bg-white/10 hover:bg-white/20 text-white border border-white/40 backdrop-blur-md transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg mt-6 sm:mt-7 flex items-center justify-center"
          >
            EXPLORE OUR EVENTS
          </Link>
        </div>

        {/* Left & Right Circular Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-6 top-[50%] -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/25 hover:bg-black/50 border border-white/25 text-white/90 hover:text-white flex items-center justify-center transition-all duration-200 backdrop-blur-xs cursor-pointer active:scale-95"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-6 top-[50%] -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/25 hover:bg-black/50 border border-white/25 text-white/90 hover:text-white flex items-center justify-center transition-all duration-200 backdrop-blur-xs cursor-pointer active:scale-95"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Subtle Bottom Slide Indicator Dots */}
        <div className="relative z-10 pb-20 sm:pb-24 lg:pb-28 flex justify-center items-center space-x-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide
                  ? "w-7 h-1 bg-white shadow-sm"
                  : "w-2.5 h-1 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
