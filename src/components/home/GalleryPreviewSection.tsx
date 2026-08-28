"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Volume2, VolumeX, Play, X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export interface GalleryMediaItem {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
}



// Video Tile Component with Lazy Autoplay & In-tile Mute Toggle
function VideoTile({
  item,
  onClick,
  className = "",
}: {
  item: GalleryMediaItem;
  onClick: () => void;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const isVideo =
    item.type === "video" ||
    (typeof item.src === "string" &&
      (item.src.endsWith(".mp4") ||
        item.src.endsWith(".webm") ||
        item.src.includes("/videos/")));

  useEffect(() => {
    if (!isVideo) return;
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().then(() => setIsPlaying(true)).catch(() => {});
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isVideo]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // If item is not a video, fallback safely to image
  if (!isVideo) {
    return <ImageTile item={item} onClick={onClick} className={className} />;
  }

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-[16px] bg-[#072018] cursor-pointer ${className}`}
    >
      <video
        ref={videoRef}
        src={item.src}
        poster={item.poster}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
      />

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none group-hover:opacity-80 transition-opacity" />

      {/* Play Indicator Button (Frosted Circle) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
          <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white ml-0.5" />
        </div>
      </div>

      {/* Mute/Unmute Toggle Button */}
      <button
        onClick={toggleMute}
        className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/40 hover:bg-black/65 border border-white/25 text-white flex items-center justify-center backdrop-blur-xs transition-all cursor-pointer"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
      </button>
    </div>
  );
}

// Image Tile Component
function ImageTile({
  item,
  onClick,
  className = "",
}: {
  item: GalleryMediaItem;
  onClick: () => void;
  className?: string;
}) {
  const isVideo =
    item.type === "video" ||
    (typeof item.src === "string" &&
      (item.src.endsWith(".mp4") ||
        item.src.endsWith(".webm") ||
        item.src.includes("/videos/")));

  if (isVideo) {
    return <VideoTile item={item} onClick={onClick} className={className} />;
  }

  const validSrc =
    item.src && !item.src.endsWith(".mp4") && !item.src.endsWith(".webm")
      ? item.src
      : item.poster || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85";

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-[16px] bg-[#072018] cursor-pointer ${className}`}
    >
      <Image
        src={validSrc}
        alt={item.alt || "Green Apple Catering"}
        fill
        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        sizes="(max-width: 768px) 50vw, 25vw"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
    </div>
  );
}

interface GalleryPreviewProps {
  onOpenQuote?: () => void;
}

export default function GalleryPreviewSection({ onOpenQuote }: GalleryPreviewProps) {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [galleryMedia, setGalleryMedia] = useState<GalleryMediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gallery?active=true")
      .then((res) => res.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          const mapped = data.data.map((item: any, idx: number) => ({
            id: item._id || `gal-${idx}`,
            type: item.type === "video" ? "video" : "image",
            src: item.src,
            poster: item.poster || undefined,
            alt: item.alt || item.title || "Green Apple Catering gallery showcase",
          }));
          setGalleryMedia(mapped);
        } else {
          setGalleryMedia([]);
        }
      })
      .catch(() => {
        setGalleryMedia([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const openLightbox = (index: number) => setActiveLightboxIndex(index);
  const closeLightbox = () => setActiveLightboxIndex(null);

  const prevItem = useCallback(() => {
    if (activeLightboxIndex === null || galleryMedia.length === 0) return;
    setActiveLightboxIndex((prev) => (prev! - 1 + galleryMedia.length) % galleryMedia.length);
  }, [activeLightboxIndex, galleryMedia.length]);

  const nextItem = useCallback(() => {
    if (activeLightboxIndex === null || galleryMedia.length === 0) return;
    setActiveLightboxIndex((prev) => (prev! + 1) % galleryMedia.length);
  }, [activeLightboxIndex, galleryMedia.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (activeLightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevItem();
      if (e.key === "ArrowRight") nextItem();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIndex, nextItem, prevItem]);

  return (
    <section id="gallery" className="py-16 sm:py-24 lg:py-28 bg-[#F7F5EF] text-gray-900 overflow-hidden scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          {/* Desktop Header: Left title, right description with bottom border */}
          <div className="hidden lg:flex items-end justify-between pb-8 border-b border-gray-200/80">
            <div>
              <div className="flex items-center space-x-2.5 mb-2.5">
                <span className="w-5 h-[1.5px] bg-[#229938]" />
                <span className="text-xs tracking-[0.28em] uppercase text-emerald-800 font-semibold">
                  OUR GALLERY
                </span>
                <span className="w-5 h-[1.5px] bg-[#229938]" />
              </div>
              <h2 className="font-serif text-4xl lg:text-[46px] font-normal text-gray-900 tracking-tight leading-none">
                Moments That Matter
              </h2>
            </div>
            <p className="text-sm text-gray-600 font-light max-w-sm leading-relaxed text-left">
              A collection of beautiful memories we&apos;ve had the honor to be part of.
            </p>
          </div>

          {/* Mobile Header: Centered */}
          <div className="flex lg:hidden flex-col items-center text-center">
            <div className="flex items-center space-x-2.5 mb-2">
              <span className="w-5 h-[1.5px] bg-[#229938]" />
              <span className="text-[10.5px] tracking-[0.28em] uppercase text-emerald-800 font-semibold">
                OUR GALLERY
              </span>
              <span className="w-5 h-[1.5px] bg-[#229938]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-gray-900 tracking-tight">
              Moments That Matter
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-light max-w-xs sm:max-w-sm mt-2 leading-relaxed">
              A collection of beautiful memories we&apos;ve had the honor to be part of.
            </p>
          </div>
        </div>

        {/* Dynamic Gallery Content */}
        {loading ? (
          <div className="py-16 text-center text-gray-400 text-xs">
            Loading gallery showcases...
          </div>
        ) : galleryMedia.length === 0 ? (
          <div className="py-16 px-6 text-center max-w-lg mx-auto bg-white/70 border border-emerald-900/10 rounded-3xl space-y-4 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#229938] flex items-center justify-center mx-auto shadow-xs">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                <circle cx="9" cy="9" r="2"/>
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
              </svg>
            </div>
            <div>
              <h3 className="font-serif text-2xl text-gray-900 font-normal">The gallery is empty</h3>
              <p className="text-xs text-gray-500 font-light mt-1 max-w-sm mx-auto leading-relaxed">
                Photos and video showcases will appear here once added in the CMS admin dashboard.
              </p>
            </div>
            <div className="pt-1">
              <Link
                href="/admin/gallery"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#072018] text-white hover:bg-[#0E362A] transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Add Photos & Videos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* DESKTOP DYNAMIC GALLERY MOSAIC */}
            <div className="hidden lg:grid lg:grid-cols-4 gap-4 xl:gap-5 auto-rows-[160px]">
              {galleryMedia.map((item, idx) => {
                const isTall = idx % 5 === 0 || idx % 7 === 0;
                return (
                  <div
                    key={item.id || idx}
                    className={isTall ? "row-span-2" : "row-span-1"}
                  >
                    {item.type === "video" ? (
                      <VideoTile
                        item={item}
                        onClick={() => openLightbox(idx)}
                        className="w-full h-full shadow-sm min-h-[160px]"
                      />
                    ) : (
                      <ImageTile
                        item={item}
                        onClick={() => openLightbox(idx)}
                        className="w-full h-full shadow-sm min-h-[160px]"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* MOBILE DYNAMIC GALLERY MOSAIC */}
            <div className="grid lg:hidden grid-cols-2 gap-3 sm:gap-4 auto-rows-[170px]">
              {galleryMedia.map((item, idx) => {
                const isFullWidth = idx % 5 === 4;
                return (
                  <div
                    key={item.id || idx}
                    className={isFullWidth ? "col-span-2" : "col-span-1"}
                  >
                    {item.type === "video" ? (
                      <VideoTile
                        item={item}
                        onClick={() => openLightbox(idx)}
                        className="w-full h-full shadow-sm min-h-[170px]"
                      />
                    ) : (
                      <ImageTile
                        item={item}
                        onClick={() => openLightbox(idx)}
                        className="w-full h-full shadow-sm min-h-[170px]"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Bottom CTA Button & Delicate Leaf Divider Ornament */}
        <div className="mt-10 sm:mt-14 flex flex-col items-center text-center">
          {/* Desktop Outlined Pill CTA */}
          <a
            href="https://www.instagram.com/_green_apple_catering_/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800 border border-emerald-800/80 hover:bg-emerald-800 hover:text-white transition-all duration-300 shadow-xs cursor-pointer group"
          >
            <span>VIEW FULL GALLERY</span>
            <ArrowRight className="w-3.5 h-3.5 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Mobile Solid Dark Green Pill CTA */}
          <a
            href="https://www.instagram.com/_green_apple_catering_/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex lg:hidden items-center justify-center w-full max-w-xs px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.18em] bg-[#072018] text-white hover:bg-[#0E362A] transition-all shadow-md active:scale-95 cursor-pointer group"
          >
            <span>VIEW FULL GALLERY</span>
            <ArrowRight className="w-3.5 h-3.5 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Delicate Botanical Leaf Divider Icon */}
          <div className="flex items-center justify-center space-x-3 mt-6 sm:mt-8">
            <div className="w-16 sm:w-24 h-[1px] bg-emerald-800/25" />
            <svg
              className="w-5 h-5 text-emerald-800/60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9a9 9 0 0 1-9-9c0-4.97 4.03-9 9-9z" />
              <path d="M12 6v12M8 10l4-4 4 4" />
            </svg>
            <div className="w-16 sm:w-24 h-[1px] bg-emerald-800/25" />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LIGHTBOX MODAL DIALOG                                                     */}
      {/* ========================================================================= */}
      {activeLightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={prevItem}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
            aria-label="Previous Media"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextItem}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
            aria-label="Next Media"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Media Container */}
          <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center">
            {galleryMedia[activeLightboxIndex]?.type === "video" ? (
              <div className="relative w-full h-[70vh] max-h-[600px] flex items-center justify-center rounded-2xl overflow-hidden bg-black shadow-2xl">
                <video
                  src={galleryMedia[activeLightboxIndex]?.src}
                  poster={galleryMedia[activeLightboxIndex]?.poster}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="relative w-full h-[70vh] max-h-[650px]">
                <Image
                  src={galleryMedia[activeLightboxIndex]?.src || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85"}
                  alt={galleryMedia[activeLightboxIndex]?.alt || "Gallery Image"}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
            )}

            {/* Bottom Caption & Counter */}
            <div className="mt-4 text-center text-white/80 text-xs sm:text-sm font-light flex items-center space-x-3">
              <span>{galleryMedia[activeLightboxIndex]?.alt}</span>
              <span className="text-white/40">•</span>
              <span className="text-emerald-400 font-medium">
                {activeLightboxIndex + 1} / {galleryMedia.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
