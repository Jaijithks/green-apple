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
    <section className="w-full pt-3 sm:pt-4 px-3 sm:px-6 md:px-7 lg:px-8 max-w-[1536px] mx-auto">
      {/* Tall Grand Editorial Hero Container */}
      <div
        className="relative w-full h-[680px] sm:h-[700px] lg:h-[730px] rounded-t-[32px] sm:rounded-t-[40px] md:rounded-t-[46px] overflow-hidden shadow-2xl flex flex-col justify-between select-none"
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
              className="object-cover object-[center_38%]"
              sizes="(max-width: 1536px) 100vw, 1536px"
            />
            {/* Subtle, soft layered translucent overlay to preserve warm lighting and rich details */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/55" />
            <div className="absolute inset-0 bg-[#072018]/20 mix-blend-multiply" />
          </div>
        ))}

        {/* Top Editorial Overlaid Navbar */}
        <Navbar onOpenQuote={onOpenQuote} />

        {/* Optically Centered Hero Headline Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto my-auto py-4">
          {/* Tagline / Location */}
          <div className="inline-flex items-center space-x-2 mb-2">
            <span className="w-4 h-[1px] bg-emerald-400/80" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-emerald-300 font-medium drop-shadow-md">
              {slide.tag}
            </span>
            <span className="w-4 h-[1px] bg-emerald-400/80" />
          </div>

          {/* Grand Cursive Script Title */}
          <h1 className="font-script text-6xl sm:text-8xl md:text-9xl lg:text-[110px] text-white font-normal drop-shadow-lg tracking-tight transform -rotate-1 leading-none py-1 select-none">
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-white/95 tracking-wide max-w-2xl mt-1 drop-shadow-md font-light">
            {slide.subtitle}
          </p>

          {/* Fine subtle separator line */}
          <div className="w-12 h-[1px] bg-white/40 my-4 sm:my-5" />

          {/* Single Refined Pill CTA */}
          <Link
            href="#events"
            className="px-7 py-2.5 sm:px-8 sm:py-3 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] bg-white/15 hover:bg-white/25 text-white border border-white/40 backdrop-blur-md transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            EXPLORE OUR EVENTS
          </Link>
        </div>

        {/* Subtle, Low-visual-weight Left & Right Slider Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-7 top-[48%] -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/20 hover:bg-black/45 border border-white/20 text-white/85 hover:text-white flex items-center justify-center transition-all duration-200 backdrop-blur-xs cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-7 top-[48%] -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/20 hover:bg-black/45 border border-white/20 text-white/85 hover:text-white flex items-center justify-center transition-all duration-200 backdrop-blur-xs cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Subtle Bottom Slide Indicator Dots */}
        <div className="relative z-10 pb-24 sm:pb-28 flex justify-center space-x-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === currentSlide ? "w-6 bg-white" : "w-2 bg-white/35 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
