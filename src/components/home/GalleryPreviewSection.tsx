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

// Curated Media matching the two reference images
const GALLERY_MEDIA: GalleryMediaItem[] = [
  // 1. Long Banquet Table with String Lights (Photo)
  {
    id: "gallery-1",
    type: "image",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
    alt: "Outdoor wedding dinner reception banquet under warm glowing string lights",
  },
  // 2. Buffet Bowls & Fresh Salad Spread (Photo)
  {
    id: "gallery-2",
    type: "image",
    src: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=85",
    alt: "Artisanal catering buffet spread with gourmet salads and warm delicacies",
  },
  // 3. Floral Bouquet Close-up (Video)
  {
    id: "gallery-3",
    type: "video",
    src: "https://assets.mixkit.co/videos/preview/mixkit-bride-holding-a-wedding-bouquet-43180-large.mp4",
    poster: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=85",
    alt: "Cinematic bridal wedding floral bouquet presentation",
  },
  // 4. Three-Tier Floral Wedding Cake (Photo - Desktop)
  {
    id: "gallery-4",
    type: "image",
    src: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=800&q=85",
    alt: "Elegant three-tiered wedding cake styled with fresh white roses",
  },
  // 5. Canapés & Pastry Bites on Platter (Photo)
  {
    id: "gallery-5",
    type: "image",
    src: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=85",
    alt: "Gourmet canapés and savory appetizers presented on serving tray",
  },
  // 6. Grand Pavilion Wedding Mandap (Video)
  {
    id: "gallery-6",
    type: "video",
    src: "https://assets.mixkit.co/videos/preview/mixkit-wedding-tables-in-a-hall-decorated-for-a-celebration-43181-large.mp4",
    poster: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=85",
    alt: "Grand wedding pavilion and luxury floral decor setup",
  },
  // 7. Chef Slicing Roast Meat on Wooden Platter (Photo)
  {
    id: "gallery-7",
    type: "image",
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85",
    alt: "Chef carving gourmet roast barbecue meat and appetizers on wooden board",
  },
  // 8. Floral Candelabra Banquet Centerpiece (Photo)
  {
    id: "gallery-8",
    type: "image",
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=85",
    alt: "Grand banquet table centerpiece with fresh roses and crystal glassware",
  },
  // 9. Royal Wedding Canopy Stage with Chandeliers (Video)
  {
    id: "gallery-9",
    type: "video",
    src: "https://assets.mixkit.co/videos/preview/mixkit-wedding-ceremony-decorations-43182-large.mp4",
    poster: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=85",
    alt: "Royal wedding stage styling with floral arches and hanging chandeliers",
  },
  // 10. Glass Cups Dessert / Appetizer Spread (Photo)
  {
    id: "gallery-10",
    type: "image",
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=85",
    alt: "Individual gourmet dessert parfait cups and refreshing starters",
  },
  // 11. Outdoor Garden Lounge Celebration (Video - Mobile Full Width Feature)
  {
    id: "gallery-11",
    type: "video",
    src: "https://assets.mixkit.co/videos/preview/mixkit-people-celebrating-at-a-wedding-reception-43183-large.mp4",
    poster: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=85",
    alt: "Outdoor celebration lounge seating with fairy lights under trees",
  },
];

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

  useEffect(() => {
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
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-[16px] bg-black/40 cursor-pointer ${className}`}
    >
      <video
        ref={videoRef}
        src={item.src}
        poster={item.poster}
        muted={isMuted}
        loop
        playsInline
        autoPlay
        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
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
  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-[16px] bg-[#072018] cursor-pointer ${className}`}
    >
      <Image
        src={item.src}
        alt={item.alt}
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

  const openLightbox = (index: number) => setActiveLightboxIndex(index);
  const closeLightbox = () => setActiveLightboxIndex(null);

  const prevItem = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => (prev! - 1 + GALLERY_MEDIA.length) % GALLERY_MEDIA.length);
  }, [activeLightboxIndex]);

  const nextItem = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => (prev! + 1) % GALLERY_MEDIA.length);
  }, [activeLightboxIndex]);

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

        {/* ========================================================================= */}
        {/* DESKTOP GALLERY MOSAIC (Hidden on Mobile/Tablet, visible on lg and above) */}
        {/* ========================================================================= */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-4 xl:gap-5">
          {/* COLUMN 1 */}
          <div className="flex flex-col space-y-4 xl:space-y-5">
            {/* Top: Long Banquet Table (Photo, tall) */}
            <ImageTile
              item={GALLERY_MEDIA[0]}
              onClick={() => openLightbox(0)}
              className="h-[340px] w-full shadow-sm"
            />
            {/* Bottom: Grand Pavilion Mandap (Video) */}
            <VideoTile
              item={GALLERY_MEDIA[5]}
              onClick={() => openLightbox(5)}
              className="h-[235px] w-full shadow-sm"
            />
          </div>

          {/* COLUMN 2 */}
          <div className="flex flex-col space-y-4 xl:space-y-5">
            {/* Top: Buffet Bowls (Photo) */}
            <ImageTile
              item={GALLERY_MEDIA[1]}
              onClick={() => openLightbox(1)}
              className="h-[160px] w-full shadow-sm"
            />
            {/* Middle: Canapés Platter (Photo) */}
            <ImageTile
              item={GALLERY_MEDIA[4]}
              onClick={() => openLightbox(4)}
              className="h-[160px] w-full shadow-sm"
            />
            {/* Bottom: Chef Slicing Roast Meat (Photo) */}
            <ImageTile
              item={GALLERY_MEDIA[6]}
              onClick={() => openLightbox(6)}
              className="h-[235px] w-full shadow-sm"
            />
          </div>

          {/* COLUMN 3 */}
          <div className="flex flex-col space-y-4 xl:space-y-5">
            {/* Top: Floral Bouquet (Video, tall) */}
            <VideoTile
              item={GALLERY_MEDIA[2]}
              onClick={() => openLightbox(2)}
              className="h-[340px] w-full shadow-sm"
            />
            {/* Bottom: Candelabra Banquet Setting (Photo) */}
            <ImageTile
              item={GALLERY_MEDIA[7]}
              onClick={() => openLightbox(7)}
              className="h-[235px] w-full shadow-sm"
            />
          </div>

          {/* COLUMN 4 */}
          <div className="flex flex-col space-y-4 xl:space-y-5">
            {/* Top: 3-Tier Wedding Cake (Photo) */}
            <ImageTile
              item={GALLERY_MEDIA[3]}
              onClick={() => openLightbox(3)}
              className="h-[260px] w-full shadow-sm"
            />
            {/* Middle: Royal Wedding Stage (Video) */}
            <VideoTile
              item={GALLERY_MEDIA[8]}
              onClick={() => openLightbox(8)}
              className="h-[175px] w-full shadow-sm"
            />
            {/* Bottom: Dessert Glasses (Photo) */}
            <ImageTile
              item={GALLERY_MEDIA[9]}
              onClick={() => openLightbox(9)}
              className="h-[120px] w-full shadow-sm"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE GALLERY MOSAIC (Visible on Mobile/Tablet, hidden on lg and above)  */}
        {/* ========================================================================= */}
        <div className="grid lg:hidden grid-cols-2 gap-3 sm:gap-4">
          {/* Row 1: Left Banquet Photo | Right Buffet Photo */}
          <ImageTile
            item={GALLERY_MEDIA[0]}
            onClick={() => openLightbox(0)}
            className="h-[175px] sm:h-[220px] w-full shadow-sm"
          />
          <ImageTile
            item={GALLERY_MEDIA[1]}
            onClick={() => openLightbox(1)}
            className="h-[175px] sm:h-[220px] w-full shadow-sm"
          />

          {/* Row 2: Left Bouquet Video | Right Canapés Photo */}
          <VideoTile
            item={GALLERY_MEDIA[2]}
            onClick={() => openLightbox(2)}
            className="h-[175px] sm:h-[220px] w-full shadow-sm"
          />
          <ImageTile
            item={GALLERY_MEDIA[4]}
            onClick={() => openLightbox(4)}
            className="h-[175px] sm:h-[220px] w-full shadow-sm"
          />

          {/* Row 3: Left Chef Slicing Photo | Right Royal Canopy Stage Video */}
          <ImageTile
            item={GALLERY_MEDIA[6]}
            onClick={() => openLightbox(6)}
            className="h-[175px] sm:h-[220px] w-full shadow-sm"
          />
          <VideoTile
            item={GALLERY_MEDIA[8]}
            onClick={() => openLightbox(8)}
            className="h-[175px] sm:h-[220px] w-full shadow-sm"
          />

          {/* Row 4: Left Candelabra Photo | Right Dessert Spread Photo */}
          <ImageTile
            item={GALLERY_MEDIA[7]}
            onClick={() => openLightbox(7)}
            className="h-[175px] sm:h-[220px] w-full shadow-sm"
          />
          <ImageTile
            item={GALLERY_MEDIA[9]}
            onClick={() => openLightbox(9)}
            className="h-[175px] sm:h-[220px] w-full shadow-sm"
          />

          {/* Row 5: Full-Width Feature Outdoor Celebration Lounge Video */}
          <div className="col-span-2">
            <VideoTile
              item={GALLERY_MEDIA[10]}
              onClick={() => openLightbox(10)}
              className="h-[200px] sm:h-[260px] w-full shadow-sm"
            />
          </div>
        </div>

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
            {GALLERY_MEDIA[activeLightboxIndex].type === "video" ? (
              <div className="relative w-full h-[70vh] max-h-[600px] flex items-center justify-center rounded-2xl overflow-hidden bg-black shadow-2xl">
                <video
                  src={GALLERY_MEDIA[activeLightboxIndex].src}
                  poster={GALLERY_MEDIA[activeLightboxIndex].poster}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="relative w-full h-[70vh] max-h-[650px]">
                <Image
                  src={GALLERY_MEDIA[activeLightboxIndex].src}
                  alt={GALLERY_MEDIA[activeLightboxIndex].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
            )}

            {/* Bottom Caption & Counter */}
            <div className="mt-4 text-center text-white/80 text-xs sm:text-sm font-light flex items-center space-x-3">
              <span>{GALLERY_MEDIA[activeLightboxIndex].alt}</span>
              <span className="text-white/40">•</span>
              <span className="text-emerald-400 font-medium">
                {activeLightboxIndex + 1} / {GALLERY_MEDIA.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
