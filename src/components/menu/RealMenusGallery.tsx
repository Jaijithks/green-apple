"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  Phone,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  Utensils,
  Share2,
} from "lucide-react";
import { REAL_MENUS_DATA, RealMenu } from "@/data/realMenusData";
import { siteConfig } from "@/data/site";
import { WhatsAppSolidIcon } from "@/components/ui/Icons";

interface RealMenusGalleryProps {
  onOpenQuote?: () => void;
  onOpenMenuBuilder?: () => void;
  className?: string;
  isModal?: boolean;
}

export default function RealMenusGallery({
  onOpenQuote,
  onOpenMenuBuilder,
  className = "",
  isModal = false,
}: RealMenusGalleryProps) {
  const [selectedMenuIndex, setSelectedMenuIndex] = useState<number>(0);
  const [lightboxMenu, setLightboxMenu] = useState<RealMenu | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [expandedCourses, setExpandedCourses] = useState<{ [key: string]: boolean }>({
    "course-0": true,
    "course-1": true,
    "course-2": true,
  });

  const activeMenu = REAL_MENUS_DATA[selectedMenuIndex];

  const handleOpenLightbox = (menu: RealMenu) => {
    setLightboxMenu(menu);
    setZoomLevel(1);
  };

  const handleCloseLightbox = () => {
    setLightboxMenu(null);
    setZoomLevel(1);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.35, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.35, 0.8));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const toggleCourse = (courseKey: string) => {
    setExpandedCourses((prev) => ({
      ...prev,
      [courseKey]: !prev[courseKey],
    }));
  };

  const handleWhatsAppEnquiry = (menu: RealMenu) => {
    const text = encodeURIComponent(menu.whatsappMessage);
    const url = `https://wa.me/${siteConfig.contact.whatsapp}?text=${text}`;
    window.open(url, "_blank");
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Menu Switcher Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#229938] animate-pulse" />
          <span className="text-xs uppercase tracking-[0.2em] text-emerald-400 font-semibold">
            COMPLETED EVENT MENUS SHOWCASE
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-full w-full sm:w-auto">
          {REAL_MENUS_DATA.map((menu, idx) => {
            const isSelected = selectedMenuIndex === idx;
            return (
              <button
                key={menu.id}
                onClick={() => setSelectedMenuIndex(idx)}
                className={`flex-1 sm:flex-initial px-4 sm:px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-2 ${
                  isSelected
                    ? "bg-[#229938] text-white shadow-lg shadow-emerald-950/60"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{menu.menuNumber}</span>
                <span className="hidden md:inline text-emerald-100 font-light truncate max-w-[140px]">
                  • {menu.title.split("&")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Selected Menu Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: High-Res Printed Menu Card with Zoom Trigger */}
        <div className="lg:col-span-5 space-y-4">
          <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-black/40 border border-white/15 shadow-2xl transition-all">
            {/* Aspect container for the menu flyer/card */}
            <div className="relative aspect-[3/4] w-full cursor-pointer overflow-hidden bg-[#072018]"
                 onClick={() => handleOpenLightbox(activeMenu)}>
              <Image
                src={activeMenu.image}
                alt={`${activeMenu.title} - Green Apple Catering official menu card`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
                className="object-contain sm:object-cover transition-transform duration-700 ease-out group-hover:scale-103"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

              {/* Top Tags */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-black/70 text-emerald-300 border border-white/20 backdrop-blur-md shadow-md">
                  {activeMenu.menuNumber}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-emerald-950/80 text-white border border-emerald-500/40 backdrop-blur-md">
                  {activeMenu.serviceStyle}
                </span>
              </div>

              {/* Hover / Tap Zoom Action Indicator */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/45 backdrop-blur-[2px]">
                <div className="px-5 py-2.5 rounded-full bg-[#229938] text-white text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 shadow-2xl transform scale-95 group-hover:scale-100 transition-transform">
                  <Maximize2 className="w-4 h-4" />
                  <span>Click to Zoom & View Full Card</span>
                </div>
              </div>

              {/* Bottom Card Summary Overlay */}
              <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-black/75 border border-white/15 backdrop-blur-md pointer-events-none">
                <p className="text-[10px] text-emerald-400 font-semibold tracking-widest uppercase">
                  OFFICIAL EVENT MENU CARD
                </p>
                <p className="font-serif text-white text-base sm:text-lg font-normal leading-snug truncate mt-0.5">
                  {activeMenu.title}
                </p>
                <div className="flex items-center space-x-3 text-[11px] text-gray-300 font-light mt-1">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>{activeMenu.location}</span>
                  </span>
                  <span>•</span>
                  <span>{activeMenu.stats.dishesCount}</span>
                </div>
              </div>
            </div>

            {/* Quick Action under the image */}
            <div className="p-3 bg-[#0A261D] border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => handleOpenLightbox(activeMenu)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center space-x-1.5"
              >
                <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zoom Card</span>
              </button>

              <button
                onClick={() => handleWhatsAppEnquiry(activeMenu)}
                className="px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase bg-[#229938] hover:bg-[#1c822e] text-white shadow-md transition-all cursor-pointer flex items-center space-x-2 group"
              >
                <WhatsAppSolidIcon className="w-3.5 h-3.5 text-white" />
                <span>Inquire via WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Highlights Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-emerald-400 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Event Highlights & Special Touches</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeMenu.highlights.map((hl, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs text-gray-200">
                  <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="font-light">{hl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Course-by-Course Breakdown */}
        <div className="lg:col-span-7 space-y-5">
          {/* Menu Title & Meta */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                {activeMenu.occasion}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-white/10 text-gray-300 border border-white/10">
                {activeMenu.stats.liveStationsCount}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-white/10 text-gray-300 border border-white/10">
                {activeMenu.stats.dishesCount}
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-normal leading-tight">
              {activeMenu.title}
            </h3>

            <p className="text-xs sm:text-sm text-emerald-300/90 font-serif italic">
              &ldquo;{activeMenu.tagline}&rdquo;
            </p>

            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed pt-1">
              {activeMenu.overview}
            </p>
          </div>

          {/* Stats Ribbon */}
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div>
              <span className="block text-base sm:text-xl font-serif text-white font-normal">
                {activeMenu.stats.dishesCount}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                Total Dishes
              </span>
            </div>
            <div className="border-x border-white/10">
              <span className="block text-base sm:text-xl font-serif text-emerald-400 font-normal">
                {activeMenu.stats.liveStationsCount}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                Live Counters
              </span>
            </div>
            <div>
              <span className="block text-base sm:text-xl font-serif text-white font-normal">
                {activeMenu.stats.beverageCount}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                Beverages & Juices
              </span>
            </div>
          </div>

          {/* Accordion / Course List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs uppercase tracking-wider text-gray-300 font-semibold">
                FULL COURSE & DISHES BREAKDOWN ({activeMenu.courses.length} SECTIONS)
              </h4>
              <span className="text-[11px] text-gray-400 font-light">
                Served exactly as printed
              </span>
            </div>

            <div className="space-y-2.5">
              {activeMenu.courses.map((course, cIdx) => {
                const courseKey = `course-${cIdx}`;
                const isExpanded = expandedCourses[courseKey] ?? false;

                return (
                  <div
                    key={cIdx}
                    className="rounded-xl border border-white/10 bg-[#0A261D]/70 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => toggleCourse(courseKey)}
                      className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/40 text-[10px] text-emerald-400 font-semibold flex items-center justify-center">
                          0{cIdx + 1}
                        </span>
                        <span className="text-xs sm:text-sm font-serif text-white font-medium">
                          {course.title}
                        </span>
                        {course.badge && (
                          <span className="px-2 py-0.5 rounded-md text-[9.5px] font-semibold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                            {course.badge}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 text-gray-400">
                        <span className="text-[11px] font-light">
                          {course.items.length} items
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-3.5 pt-1 border-t border-white/5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                          {course.items.map((item, iIdx) => (
                            <div
                              key={iIdx}
                              className="px-2.5 py-1.5 rounded-lg bg-black/20 border border-white/5 text-xs text-gray-200 flex items-center space-x-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                              <span className="truncate">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => handleWhatsAppEnquiry(activeMenu)}
              className="flex-1 py-3.5 px-6 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] bg-[#229938] hover:bg-[#1c822e] text-white shadow-xl shadow-emerald-950/80 transition-all cursor-pointer flex items-center justify-center space-x-2 group min-h-[44px]"
            >
              <WhatsAppSolidIcon className="w-4 h-4 text-white" />
              <span>Inquire for This Menu</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>

            {onOpenQuote && (
              <button
                onClick={onOpenQuote}
                className="py-3.5 px-6 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer flex items-center justify-center space-x-2 min-h-[44px]"
              >
                <span>Request Custom Quote</span>
              </button>
            )}

            {onOpenMenuBuilder && (
              <button
                onClick={onOpenMenuBuilder}
                className="py-3.5 px-5 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Build New Menu</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* INTERACTIVE FULLSCREEN / ZOOM LIGHTBOX */}
      {/* ======================================================== */}
      {lightboxMenu && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-2 sm:p-4 animate-in fade-in duration-200"
          onClick={handleCloseLightbox}
        >
          {/* Main Lightbox Container */}
          <div
            className="relative w-full max-w-5xl h-[92vh] bg-[#072018] border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header Bar */}
            <div className="flex-shrink-0 px-4 sm:px-6 py-3.5 bg-[#051812] border-b border-white/10 flex items-center justify-between z-20">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#229938] text-white">
                  {lightboxMenu.menuNumber}
                </span>
                <div>
                  <h3 className="font-serif text-sm sm:text-lg text-white font-normal truncate max-w-[240px] sm:max-w-md">
                    {lightboxMenu.title}
                  </h3>
                  <span className="text-[10px] text-gray-400 block font-light">
                    Actual printed menu card from {lightboxMenu.location}
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-2">
                {/* Zoom Controls */}
                <div className="hidden sm:flex items-center space-x-1 bg-white/10 rounded-lg p-1 border border-white/10">
                  <button
                    onClick={handleZoomOut}
                    className="p-1.5 rounded hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-mono px-2 text-emerald-400">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={handleZoomIn}
                    className="p-1.5 rounded hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleResetZoom}
                    className="p-1.5 rounded hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
                    title="Reset Zoom"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleCloseLightbox}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close menu lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable / Zoomable Card Viewport */}
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-[#030e0a]">
              <div
                className="relative transition-transform duration-200 ease-out flex items-center justify-center max-w-full max-h-full"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: "center center",
                }}
              >
                <div className="relative shadow-2xl rounded-xl overflow-hidden border border-white/15">
                  <Image
                    src={lightboxMenu.image}
                    alt={lightboxMenu.title}
                    width={800}
                    height={1100}
                    priority
                    className="object-contain max-h-[75vh] w-auto rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Lightbox Footer Bar with WhatsApp CTA */}
            <div className="flex-shrink-0 px-4 sm:px-6 py-3 bg-[#051812] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 z-20">
              <div className="text-xs text-gray-300 font-light text-center sm:text-left">
                <span>Want this exact menu setup for your celebration?</span>
                <span className="hidden md:inline text-emerald-400 ml-1">
                  We cater to any guest count across Ernakulam, Idukki & Kottayam.
                </span>
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <button
                  onClick={() => handleWhatsAppEnquiry(lightboxMenu)}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#229938] hover:bg-[#1c822e] text-white shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <WhatsAppSolidIcon className="w-3.5 h-3.5 text-white" />
                  <span>Enquire on WhatsApp</span>
                </button>

                <a
                  href={`tel:${siteConfig.contact.phonePrimary.replace(/[^0-9+]/g, "")}`}
                  className="px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Call Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
