"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  Phone,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import { WhatsAppSolidIcon } from "@/components/ui/Icons";

export interface SimpleMenu {
  id: string;
  number: string;
  title: string;
  image: string;
  whatsappMessage: string;
}

export const SIMPLE_MENUS: SimpleMenu[] = [
  {
    id: "menu-1",
    number: "01",
    title: "Menu 01",
    image: "/menu items/menu1.jpeg",
    whatsappMessage:
      "Hello Green Apple Catering! I saw Menu 01 on your website and would like to get a quote for my event.",
  },
  {
    id: "menu-2",
    number: "02",
    title: "Menu 02",
    image: "/menu items/menu2.jpeg",
    whatsappMessage:
      "Hello Green Apple Catering! I saw Menu 02 on your website and would like to get a quote for my event.",
  },
];

interface MenuSliderProps {
  onOpenQuote?: () => void;
  className?: string;
}

export default function MenuSlider({ className = "" }: MenuSliderProps) {
  const [menuList, setMenuList] = useState<SimpleMenu[]>(SIMPLE_MENUS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and handle Escape key when lightbox is open
  useEffect(() => {
    if (!lightboxOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
        setZoomLevel(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen]);

  // Fetch real menu cards uploaded from CMS database
  useEffect(() => {
    fetch("/api/menu-cards?active=true")
      .then((res) => res.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          const mapped: SimpleMenu[] = data.data.map((item: any, idx: number) => ({
            id: item._id || item.id || `card-${idx}`,
            number: item.menuNumber || String(idx + 1).padStart(2, "0"),
            title: item.title || `Menu ${String(idx + 1).padStart(2, "0")}`,
            image: item.image,
            whatsappMessage:
              item.whatsappMessage ||
              `Hello Green Apple Catering! I saw ${item.title || `Menu ${idx + 1}`} on your website and would like to get a quote for my event.`,
          }));
          setMenuList(mapped);
        }
      })
      .catch(() => {
        // Keeps fallback
      });
  }, []);

  // Safe active index calculation
  const totalMenus = menuList.length;
  const safeIndex = totalMenus > 0 ? ((currentIndex % totalMenus) + totalMenus) % totalMenus : 0;
  const activeMenu = menuList[safeIndex] || SIMPLE_MENUS[0];

  // 1-by-1 sliding navigation
  const handleNext = useCallback(() => {
    if (totalMenus <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % totalMenus);
  }, [totalMenus]);

  const handlePrev = useCallback(() => {
    if (totalMenus <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + totalMenus) % totalMenus);
  }, [totalMenus]);

  const handleGoTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Mobile-optimized touch swipe: distinguishes between vertical page scroll and horizontal swipe
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;

    // Trigger only if horizontal swipe dominates vertical scrolling
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Keyboard navigation for slider
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, handleNext, handlePrev]);

  const handleWhatsAppEnquiry = (menu: SimpleMenu) => {
    const url = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
      menu.whatsappMessage
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className={`w-full max-w-4xl mx-auto px-2 sm:px-4 ${className}`}>
      {/* Top Header: Rounded Menu Selection Pills & Counter */}
      <div className="flex items-center justify-between mb-3 sm:mb-6 px-1 gap-2">
        {/* Rounded Menu Selector Pills */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto py-1 scrollbar-none flex-nowrap">
          {menuList.map((menu, idx) => {
            const isActive = idx === safeIndex;
            return (
              <button
                key={menu.id}
                onClick={() => handleGoTo(idx)}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap flex-shrink-0 active:scale-95 ${
                  isActive
                    ? "bg-[#229938] text-white shadow-md shadow-emerald-950/60 scale-102"
                    : "bg-white/10 text-gray-300 hover:text-white hover:bg-white/20"
                }`}
              >
                <span>{menu.title}</span>
              </button>
            );
          })}
        </div>

        {/* Counter & Rounded Arrow Navigation */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          <span className="text-[11px] sm:text-xs font-semibold text-emerald-400 tracking-wider">
            {String(safeIndex + 1).padStart(2, "0")} / {String(totalMenus).padStart(2, "0")}
          </span>

          <div className="flex items-center space-x-1">
            <button
              onClick={handlePrev}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-[#229938] text-white flex items-center justify-center transition-all cursor-pointer active:scale-90 border border-white/15 shadow-sm"
              aria-label="Previous menu"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-[#229938] text-white flex items-center justify-center transition-all cursor-pointer active:scale-90 border border-white/15 shadow-sm"
              aria-label="Next menu"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Rounded Slider Frame - Optimized for touch & mobile screen area */}
      <div
        className="relative overflow-hidden rounded-2xl sm:rounded-4xl bg-[#051812] border border-white/15 shadow-2xl p-2 sm:p-6 lg:p-8 touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slider Track - 1-by-1 horizontal translate */}
        <div
          className="flex transition-transform duration-500 ease-in-out w-full"
          style={{ transform: `translateX(-${safeIndex * 100}%)` }}
        >
          {menuList.map((menu, idx) => (
            <div
              key={menu.id}
              className="w-full flex-shrink-0 flex flex-col items-center justify-center px-0.5 sm:px-4"
            >
              {/* Rounded Card Box */}
              <div
                onClick={() => setLightboxOpen(true)}
                className="group relative w-full max-w-lg mx-auto cursor-pointer rounded-xl sm:rounded-3xl overflow-hidden bg-black/50 shadow-2xl border border-white/15 hover:border-emerald-400/60 transition-all duration-300"
              >
                {/* Menu Card Image Container */}
                <div className="relative w-full aspect-[3/4] xs:aspect-[1/1.28] bg-[#072018] flex items-center justify-center">
                  <Image
                    src={menu.image}
                    alt={`${menu.title} - Green Apple Catering menu card`}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 640px) 95vw, (max-width: 1024px) 500px, 600px"
                    className="object-contain transition-transform duration-500 ease-out group-hover:scale-102"
                  />

                  {/* Tap / Hover Overlay with Zoom Prompt */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                    <div className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#229938] text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 shadow-xl transform scale-95 group-hover:scale-100 transition-transform">
                      <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>Tap to View Full Size</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Bar with Rounded Actions */}
                <div className="p-2.5 sm:p-4 bg-[#082219] border-t border-white/10 flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-2 truncate">
                    <span className="w-2 h-2 rounded-full bg-[#229938] flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-serif text-white font-medium truncate">
                      {menu.title}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxOpen(true);
                      }}
                      className="px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase bg-white/10 hover:bg-white/20 text-gray-200 transition-colors flex items-center space-x-1 cursor-pointer active:scale-95 min-h-[34px]"
                    >
                      <Maximize2 className="w-3 h-3 text-emerald-400" />
                      <span>Zoom</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWhatsAppEnquiry(menu);
                      }}
                      className="px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase bg-[#229938] hover:bg-[#1c822e] text-white shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95 min-h-[34px]"
                    >
                      <WhatsAppSolidIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                      <span>Inquire</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Side Arrows (Visible on both Mobile and Desktop) */}
        <button
          onClick={handlePrev}
          className="absolute left-1.5 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/70 hover:bg-[#229938] text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md border border-white/20 shadow-xl active:scale-90 z-10"
          aria-label="Previous menu card"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-1.5 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/70 hover:bg-[#229938] text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md border border-white/20 shadow-xl active:scale-90 z-10"
          aria-label="Next menu card"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Rounded Pagination Dots */}
      <div className="flex items-center justify-center space-x-2 mt-4 sm:mt-5">
        {menuList.map((menu, idx) => {
          const isActive = idx === safeIndex;
          return (
            <button
              key={menu.id}
              onClick={() => handleGoTo(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                isActive
                  ? "w-7 sm:w-8 h-2 sm:h-2.5 bg-[#229938] shadow-md shadow-emerald-500/50"
                  : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/25 hover:bg-white/50"
              }`}
              aria-label={`Slide to ${menu.title}`}
            />
          );
        })}
      </div>

      {/* Centered Mobile-Friendly WhatsApp Inquiry Button */}
      <div className="flex items-center justify-center mt-5 sm:mt-6 px-2">
        <button
          onClick={() => handleWhatsAppEnquiry(activeMenu)}
          className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] sm:tracking-[0.16em] bg-[#229938] hover:bg-[#1c822e] text-white shadow-xl shadow-emerald-950/80 transition-all cursor-pointer flex items-center justify-center space-x-2 active:scale-95"
        >
          <WhatsAppSolidIcon className="w-4 h-4 text-white" />
          <span>Inquire About {activeMenu.title} on WhatsApp</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* FULLSCREEN LIGHTBOX (Fully mobile optimized & portaled)  */}
      {/* ======================================================== */}
      {mounted && lightboxOpen && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-0 sm:p-4 animate-in fade-in duration-200"
          onClick={() => {
            setLightboxOpen(false);
            setZoomLevel(1);
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeMenu.title} full view`}
        >
          <div
            className="relative w-full max-w-4xl h-[100dvh] sm:h-[92vh] bg-[#072018] border-0 sm:border border-white/20 rounded-none sm:rounded-4xl shadow-2xl flex flex-col overflow-hidden text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header with Mobile Back & Zoom Controls */}
            <div className="flex-shrink-0 px-3 sm:px-6 py-2.5 sm:py-3.5 bg-[#051812] border-b border-white/10 flex items-center justify-between gap-2 z-20">
              {/* Left: Prominent Mobile Back / Close Button */}
              <div className="flex items-center space-x-2 min-w-0">
                <button
                  onClick={() => {
                    setLightboxOpen(false);
                    setZoomLevel(1);
                  }}
                  className="px-2.5 sm:px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all cursor-pointer flex items-center space-x-1.5 flex-shrink-0 border border-white/15"
                  aria-label="Go back to menu list"
                >
                  <ArrowLeft className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold tracking-wider uppercase">Back</span>
                </button>

                <div className="hidden xs:flex items-center space-x-1.5 truncate">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#229938] text-white flex-shrink-0">
                    {activeMenu.title}
                  </span>
                  <span className="text-[11px] text-gray-300 font-light truncate hidden sm:inline">
                    Menu Card
                  </span>
                </div>
              </div>

              {/* Center / Right: Zoom In/Out & X Button */}
              <div className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
                <div className="flex items-center space-x-0.5 sm:space-x-1 bg-white/10 rounded-full p-0.5 sm:p-1 border border-white/10">
                  <button
                    onClick={() => setZoomLevel((prev) => Math.max(prev - 0.35, 0.8))}
                    className="p-1 sm:p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
                    title="Zoom Out"
                    aria-label="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <span className="text-[10px] sm:text-[11px] font-mono px-1 sm:px-2 text-emerald-400 min-w-[36px] text-center">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={() => setZoomLevel((prev) => Math.min(prev + 0.35, 2.5))}
                    className="p-1 sm:p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
                    title="Zoom In"
                    aria-label="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={() => setZoomLevel(1)}
                    className="p-1 sm:p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer hidden sm:inline-flex"
                    title="Reset Zoom"
                    aria-label="Reset Zoom"
                  >
                    <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    setLightboxOpen(false);
                    setZoomLevel(1);
                  }}
                  className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-gray-200 hover:text-white transition-colors cursor-pointer min-w-[34px] min-h-[34px] flex items-center justify-center border border-white/10"
                  aria-label="Close"
                  title="Close"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Image Viewport */}
            <div className="flex-1 overflow-auto p-2 sm:p-4 flex items-center justify-center bg-[#030e0a] touch-pan-x touch-pan-y">
              <div
                className="relative transition-transform duration-200 ease-out flex items-center justify-center max-w-full max-h-full"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: "center center",
                }}
              >
                <div className="relative shadow-2xl rounded-xl sm:rounded-2xl overflow-hidden border border-white/15">
                  <Image
                    src={activeMenu.image}
                    alt={activeMenu.title}
                    width={800}
                    height={1100}
                    priority
                    className="object-contain max-h-[72vh] sm:max-h-[75vh] w-auto rounded-xl sm:rounded-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Mobile-Friendly Lightbox Footer with Dedicated Close / Back Button */}
            <div className="flex-shrink-0 px-3 sm:px-6 py-2.5 sm:py-3 bg-[#051812] border-t border-white/10 flex items-center justify-between gap-2 z-20">
              {/* Back / Close button in footer (one-thumb reach) */}
              <button
                onClick={() => {
                  setLightboxOpen(false);
                  setZoomLevel(1);
                }}
                className="px-3 sm:px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-colors flex items-center justify-center space-x-1.5 flex-shrink-0 border border-white/15 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
                <span>Close</span>
              </button>

              <div className="flex items-center space-x-2 flex-1 sm:flex-initial justify-end">
                <button
                  onClick={() => handleWhatsAppEnquiry(activeMenu)}
                  className="flex-1 sm:flex-initial px-3.5 sm:px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#229938] hover:bg-[#1c822e] active:scale-95 text-white shadow-md transition-all flex items-center justify-center space-x-1.5 cursor-pointer truncate"
                >
                  <WhatsAppSolidIcon className="w-3.5 h-3.5 text-white flex-shrink-0" />
                  <span className="truncate">Enquire on WhatsApp</span>
                </button>

                <a
                  href={`tel:${siteConfig.contact.phonePrimary.replace(/[^0-9+]/g, "")}`}
                  className="px-3 sm:px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-colors flex items-center justify-center space-x-1 flex-shrink-0 border border-white/15"
                  aria-label="Call Green Apple"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden xs:inline">Call</span>
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
