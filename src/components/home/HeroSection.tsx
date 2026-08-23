"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { heroSlides } from "@/data/heroSlides";
import HeroBackgroundSlider from "./hero/HeroBackgroundSlider";
import HeroSliderControls from "./hero/HeroSliderControls";
import {
  RingsIcon,
  CateringDishIcon,
  DecorationFlowerIcon,
  EventsCalendarIcon,
  WhatsAppIcon,
  InstagramIcon,
  LocationPinIcon,
} from "@/components/ui/Icons";

const AUTOPLAY_INTERVAL = 4000; // 4 seconds per slide

export default function HeroSection() {
  const activeSlides = heroSlides.filter((slide) => slide.isActive);
  const totalSlides = activeSlides.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  // Clear and reset the 4-second autoplay timer
  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleSelect = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Manual navigation handlers that reset the timer
  const onManualNext = useCallback(() => {
    handleNext();
    resetTimer();
  }, [handleNext, resetTimer]);

  const onManualPrev = useCallback(() => {
    handlePrev();
    resetTimer();
  }, [handlePrev, resetTimer]);

  const onManualSelect = useCallback(
    (index: number) => {
      handleSelect(index);
      resetTimer();
    },
    [handleSelect, resetTimer]
  );

  // Touch Swipe Handlers for mobile UX
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const distance = touchStartXRef.current - touchEndXRef.current;
      const minSwipeDistance = 45; // px

      if (distance > minSwipeDistance) {
        // Swiped Left -> Next
        onManualNext();
      } else if (distance < -minSwipeDistance) {
        // Swiped Right -> Prev
        onManualPrev();
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Autoplay setup with reduced motion check
  useEffect(() => {
    if (totalSlides <= 1 || isPaused) {
      resetTimer();
      return;
    }

    // Respect prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, AUTOPLAY_INTERVAL);

    return () => {
      resetTimer();
    };
  }, [currentIndex, isPaused, totalSlides, resetTimer]);

  const categoryStrip = [
    { label: "WEDDINGS", icon: RingsIcon, href: "/services#weddings" },
    { label: "CATERING", icon: CateringDishIcon, href: "/services#catering" },
    { label: "DECORATION", icon: DecorationFlowerIcon, href: "/services#decoration" },
    { label: "EVENTS", icon: EventsCalendarIcon, href: "/events" },
  ];

  return (
    <section
      className="relative bg-[#072018] text-white min-h-screen flex flex-col justify-center overflow-hidden py-10 sm:py-16 select-none sm:select-auto"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Hero showcase"
    >
      {/* Background Image Carousel Slider */}
      <HeroBackgroundSlider
        slides={activeSlides}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
      />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">
          {/* Left Column: Hero Content & CTAs */}
          <div className="lg:col-span-8 max-w-2xl space-y-6">
            {/* Top Tagline */}
            <div className="inline-flex items-center space-x-2 text-emerald-400 text-xs sm:text-sm tracking-widest uppercase font-semibold">
              <span>{siteConfig.heroTagline}</span>
            </div>

            {/* H1 Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white leading-[1.15]">
              Make Your <br />
              Moments <br />
              <span className="font-script italic text-[#4ade80] font-normal text-5xl sm:text-7xl md:text-8xl inline-block my-1 pr-2">
                Memorable
              </span>{" "}
              <br />
              with Flavours
            </h1>

            {/* Green Accent Line (Mobile reference) */}
            <div className="w-12 h-1 bg-[#229938] rounded-full sm:hidden" />

            {/* Body Description */}
            <p className="text-sm sm:text-base md:text-lg text-gray-300 font-light leading-relaxed max-w-xl">
              {siteConfig.description}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              {/* Plan Your Event -> */}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl sm:rounded-full text-sm font-semibold bg-[#229938] hover:bg-[#1c822e] text-white transition-all shadow-lg shadow-emerald-950/60 group text-center"
              >
                <span>Plan Your Event</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Explore Our Events -> */}
              <Link
                href="/events"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl sm:rounded-full text-sm font-medium bg-white/5 hover:bg-white/15 border border-white/20 text-white transition-all backdrop-blur-xs group text-center"
              >
                <span>Explore Our Events</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Quick Service Categories Bar */}
            <div className="pt-6 sm:pt-8">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-white/10">
                {categoryStrip.map((item, idx) => {
                  const IconComp = item.icon;
                  const isLast = idx === categoryStrip.length - 1;
                  return (
                    <React.Fragment key={item.label}>
                      <Link
                        href={item.href}
                        className="flex items-center space-x-2.5 group hover:opacity-100 opacity-90 transition-opacity"
                      >
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-emerald-500/60 bg-emerald-950/40 text-emerald-400 group-hover:bg-[#229938] group-hover:text-white group-hover:border-[#229938] flex items-center justify-center transition-all shadow-xs">
                          <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold tracking-wider text-gray-200 group-hover:text-white uppercase">
                          {item.label}
                        </span>
                      </Link>

                      {!isLast && (
                        <span className="hidden sm:inline-block text-gray-600 font-light">
                          |
                        </span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column (Desktop): Vertical Social Icons & Slider Controls */}
          <div className="hidden lg:flex lg:col-span-4 flex-col justify-between items-end h-full min-h-[460px] py-4">
            {/* Vertical Social Icons (Exact Outline Style without Border) */}
            <div className="flex flex-col items-center space-y-6 my-auto">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="text-white/85 hover:text-white hover:scale-115 transition-all duration-200 drop-shadow-md"
              >
                <WhatsAppIcon className="w-6 h-6" />
              </a>

              {/* Instagram */}
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on Instagram"
                className="text-white/85 hover:text-white hover:scale-115 transition-all duration-200 drop-shadow-md"
              >
                <InstagramIcon className="w-6 h-6" />
              </a>

              {/* Location Pin */}
              <a
                href={siteConfig.social.location}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Find our Location"
                className="text-white/85 hover:text-white hover:scale-115 transition-all duration-200 drop-shadow-md"
              >
                <LocationPinIcon className="w-6 h-6" />
              </a>
            </div>

            {/* Desktop Hero Slider Indicator (01 ───── 03) */}
            <div className="pt-6">
              <HeroSliderControls
                total={totalSlides}
                currentIndex={currentIndex}
                onPrev={onManualPrev}
                onNext={onManualNext}
                onSelect={onManualSelect}
              />
            </div>
          </div>
        </div>

        {/* Mobile / Tablet: Social Icons & Slider Controls */}
        <div className="flex lg:hidden flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 mt-6">
          {/* Mobile Social Links (Outline Style) */}
          <div className="flex items-center space-x-6">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="text-white/85 hover:text-white active:scale-95 transition-all drop-shadow-sm"
            >
              <WhatsAppIcon className="w-6 h-6" />
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow on Instagram"
              className="text-white/85 hover:text-white active:scale-95 transition-all drop-shadow-sm"
            >
              <InstagramIcon className="w-6 h-6" />
            </a>
            <a
              href={siteConfig.social.location}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Find our Location"
              className="text-white/85 hover:text-white active:scale-95 transition-all drop-shadow-sm"
            >
              <LocationPinIcon className="w-6 h-6" />
            </a>
          </div>

          {/* Mobile Slider Indicator */}
          <HeroSliderControls
            total={totalSlides}
            currentIndex={currentIndex}
            onPrev={onManualPrev}
            onNext={onManualNext}
            onSelect={onManualSelect}
          />
        </div>
      </div>
    </section>
  );
}

